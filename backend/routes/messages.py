from fastapi import APIRouter, Depends, HTTPException, Query, status, UploadFile, File
from typing import List, Optional
from datetime import datetime
from models.message import JobMessage, MessageCreate, MessageResponse, MessageType, MessageStatus
from models.user import User
from auth.config import current_active_user
from services.database import db_service
import uuid

router = APIRouter(prefix="/messages", tags=["messages"])

@router.post("/", response_model=MessageResponse)
async def send_message(
    message_data: MessageCreate,
    current_user: User = Depends(current_active_user)
):
    """Send a message in a job conversation"""
    try:
        # Verify job request exists
        job_request = await db_service.get_document("job_requests", message_data.job_request_id)
        if not job_request:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job request not found"
            )
        
        # Verify sender has access to this job conversation
        is_customer = job_request["customer_id"] == current_user.id
        is_professional = job_request.get("assigned_professional_id") == current_user.id
        
        # Also allow professionals who have submitted quotes to participate
        if not is_professional and current_user.role == "professional":
            quotes = await db_service.get_documents("quotes", {
                "job_request_id": message_data.job_request_id,
                "professional_id": current_user.id
            })
            is_professional = bool(quotes)
        
        is_admin = current_user.role == "admin"
        
        if not (is_customer or is_professional or is_admin):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this job conversation"
            )
        
        # Verify recipient exists and has access to the job
        recipient = await db_service.get_document("users", message_data.recipient_id)
        if not recipient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipient not found"
            )
        
        # Create message
        message = JobMessage(
            sender_id=current_user.id,
            **message_data.dict()
        )
        
        await message.save()
        
        # TODO: Send notification to recipient
        # TODO: Mark as delivered when recipient is online
        
        # Prepare response with sender information
        message_response = MessageResponse(**message.dict())
        message_response.sender_name = f"{current_user.profile.first_name} {current_user.profile.last_name}"
        message_response.sender_role = current_user.role
        
        return message_response
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send message: {str(e)}"
        )

@router.get("/job/{job_request_id}", response_model=List[MessageResponse])
async def get_job_messages(
    job_request_id: str,
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Messages per page"),
    current_user: User = Depends(current_active_user)
):
    """Get messages for a specific job"""
    try:
        # Verify job request exists and user has access
        job_request = await db_service.get_document("job_requests", job_request_id)
        if not job_request:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job request not found"
            )
        
        # Check access permissions
        is_customer = job_request["customer_id"] == current_user.id
        is_professional = job_request.get("assigned_professional_id") == current_user.id
        
        # Allow professionals who have quotes to see messages
        if not is_professional and current_user.role == "professional":
            quotes = await db_service.get_documents("quotes", {
                "job_request_id": job_request_id,
                "professional_id": current_user.id
            })
            is_professional = bool(quotes)
        
        is_admin = current_user.role == "admin"
        
        if not (is_customer or is_professional or is_admin):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this job conversation"
            )
        
        # Get messages with pagination
        skip = (page - 1) * limit
        messages = await db_service.get_documents(
            "job_messages",
            {"job_request_id": job_request_id},
            limit=limit,
            skip=skip
        )
        
        # Sort by sent_at ascending (oldest first)
        messages.sort(key=lambda x: x.get("sent_at"))
        
        # Mark messages as read by current user
        unread_messages = [
            msg for msg in messages 
            if msg["recipient_id"] == current_user.id and not msg.get("read_at")
        ]
        
        for msg in unread_messages:
            await db_service.update_document("job_messages", msg["id"], {
                "status": "read",
                "read_at": datetime.utcnow()
            })
        
        # Enhance messages with sender information
        enhanced_messages = []
        sender_cache = {}
        
        for message in messages:
            sender_id = message["sender_id"]
            
            # Cache sender info to avoid repeated DB calls
            if sender_id not in sender_cache:
                sender = await db_service.get_document("users", sender_id)
                sender_cache[sender_id] = sender
            
            sender = sender_cache[sender_id]
            
            message_response = MessageResponse(**message)
            if sender:
                message_response.sender_name = f"{sender['profile']['first_name']} {sender['profile']['last_name']}"
                message_response.sender_role = sender["role"]
            
            enhanced_messages.append(message_response)
        
        return enhanced_messages
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch messages: {str(e)}"
        )

@router.get("/conversations")
async def get_user_conversations(
    current_user: User = Depends(current_active_user)
):
    """Get all job conversations for the current user"""
    try:
        # Get jobs where user is involved
        query_filter = {}
        if current_user.role == "customer":
            query_filter["customer_id"] = current_user.id
        elif current_user.role == "professional":
            # Get jobs where user is assigned or has submitted quotes
            assigned_jobs = await db_service.get_documents("job_requests", 
                {"assigned_professional_id": current_user.id})
            
            quoted_jobs = await db_service.get_documents("quotes", 
                {"professional_id": current_user.id})
            quoted_job_ids = [q["job_request_id"] for q in quoted_jobs]
            
            all_job_ids = [j["id"] for j in assigned_jobs] + quoted_job_ids
            all_job_ids = list(set(all_job_ids))  # Remove duplicates
            
            if not all_job_ids:
                return []
            
            query_filter["id"] = {"$in": all_job_ids}
        elif current_user.role == "admin":
            # Admin can see all conversations
            pass
        else:
            return []
        
        jobs = await db_service.get_documents("job_requests", query_filter)
        
        # Get latest message for each job
        conversations = []
        for job in jobs:
            job_id = job["id"]
            
            # Get latest message
            messages = await db_service.get_documents("job_messages", 
                {"job_request_id": job_id}, limit=1)
            
            # Sort to get the latest
            if messages:
                messages.sort(key=lambda x: x.get("sent_at"), reverse=True)
                latest_message = messages[0]
            else:
                latest_message = None
            
            # Count unread messages
            unread_count = len(await db_service.get_documents("job_messages", {
                "job_request_id": job_id,
                "recipient_id": current_user.id,
                "status": {"$in": ["sent", "delivered"]}
            }))
            
            conversation = {
                "job_id": job_id,
                "job_title": job["title"],
                "job_status": job["status"],
                "latest_message": latest_message,
                "unread_count": unread_count,
                "updated_at": latest_message["sent_at"] if latest_message else job["posted_at"]
            }
            
            conversations.append(conversation)
        
        # Sort by latest activity
        conversations.sort(key=lambda x: x["updated_at"], reverse=True)
        
        return conversations
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch conversations: {str(e)}"
        )

@router.post("/upload-attachment")
async def upload_message_attachment(
    file: UploadFile = File(...),
    current_user: User = Depends(current_active_user)
):
    """Upload a file attachment for messages"""
    try:
        # Validate file size and type
        if file.size > 10 * 1024 * 1024:  # 10MB limit
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File size too large. Maximum 10MB allowed."
            )
        
        allowed_types = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'application/pdf', 'text/plain', 
            'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File type not allowed"
            )
        
        # TODO: Implement actual file upload to cloud storage
        # For now, return a placeholder URL
        file_url = f"/uploads/messages/{uuid.uuid4()}_{file.filename}"
        
        return {
            "file_url": file_url,
            "filename": file.filename,
            "content_type": file.content_type,
            "message": "File uploaded successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload file: {str(e)}"
        )

@router.post("/system")
async def send_system_message(
    job_request_id: str,
    event: str,
    message_content: str,
    current_user: User = Depends(current_active_user)
):
    """Send a system message (for automated notifications)"""
    try:
        # This endpoint is typically called internally by the system
        # For security, limit to admin users or system processes
        if current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only admin users can send system messages"
            )
        
        # Get job request
        job_request = await db_service.get_document("job_requests", job_request_id)
        if not job_request:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job request not found"
            )
        
        # Create system message
        message = JobMessage(
            job_request_id=job_request_id,
            sender_id=current_user.id,
            recipient_id=job_request["customer_id"],  # Default to customer
            message_type=MessageType.SYSTEM,
            content=message_content,
            is_system_message=True,
            system_event=event
        )
        
        await message.save()
        
        return {"message": "System message sent successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send system message: {str(e)}"
        )