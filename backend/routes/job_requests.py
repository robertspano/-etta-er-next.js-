from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from fastapi import status
from typing import List, Optional
from datetime import datetime
from models.job_request import (
    JobRequest, 
    JobRequestCreate, 
    JobRequestUpdate, 
    JobRequestResponse,
    JobStatus,
    JobPriority
)
from models.user import User
from models.notification import NotificationCreate, NotificationType, NotificationChannel
from auth.config import current_active_user, get_current_customer
from services.database import db_service
import uuid

router = APIRouter(prefix="/job-requests", tags=["job-requests"])

@router.post("/", response_model=JobRequestResponse)
async def create_job_request(
    job_data: JobRequestCreate,
    current_user: User = Depends(get_current_customer)
):
    """Create a new job request (customers only)"""
    try:
        # Create job request
        job_request = JobRequest(
            customer_id=current_user.id,
            **job_data.dict()
        )
        
        await job_request.save()
        
        # TODO: Notify relevant professionals in the area
        # await notify_professionals_in_area(job_request)
        
        return JobRequestResponse(**job_request.dict())
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create job request: {str(e)}"
        )

@router.get("/", response_model=List[JobRequestResponse])
async def get_job_requests(
    category: Optional[str] = Query(None, description="Filter by service category"),
    postcode: Optional[str] = Query(None, description="Filter by postcode"),
    status: Optional[JobStatus] = Query(None, description="Filter by status"),
    priority: Optional[JobPriority] = Query(None, description="Filter by priority"),
    customer_only: bool = Query(False, description="Get only current user's jobs"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    current_user: Optional[User] = Depends(current_active_user)
):
    """Get job requests with filtering and pagination"""
    try:
        # Build query filter
        query_filter = {}
        
        if category:
            query_filter["category"] = category
        if postcode:
            query_filter["postcode"] = postcode
        if status:
            query_filter["status"] = status
        if priority:
            query_filter["priority"] = priority
            
        # If customer_only is requested, filter by current user
        if customer_only and current_user:
            if current_user.role not in ["customer", "admin"]:
                raise HTTPException(
                    status_code=403,
                    detail="Only customers can view their own jobs"
                )
            query_filter["customer_id"] = current_user.id
        
        # For professionals, filter by their service areas if not admin and exclude draft jobs
        elif current_user and current_user.role == "professional":
            # Professionals should not see draft jobs
            query_filter["status"] = {"$ne": "draft"}
            # Get professional's service areas (postcodes)
            service_areas = current_user.profile.service_areas or []
            if service_areas:
                query_filter["postcode"] = {"$in": service_areas}
        
        # If no specific user filters and not authenticated, show only open jobs (no drafts)
        elif not current_user:
            query_filter["status"] = {"$ne": "draft"}
        
        # Calculate skip for pagination
        skip = (page - 1) * limit
        
        # Execute query using db_service
        job_requests = await db_service.get_documents(
            "job_requests", 
            filter_dict=query_filter,
            limit=limit,
            skip=skip
        )
        
        # Increment views for each job (except for owner)
        if current_user:
            for job in job_requests:
                if job.get("customer_id") != current_user.id:
                    await db_service.update_document(
                        "job_requests",
                        job["id"],
                        {"views_count": job.get("views_count", 0) + 1}
                    )
        
        return [JobRequestResponse(**job) for job in job_requests]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch job requests: {str(e)}"
        )

@router.get("/{job_id}", response_model=JobRequestResponse)
async def get_job_request(
    job_id: str,
    current_user: Optional[User] = Depends(current_active_user)
):
    """Get a specific job request by ID"""
    try:
        job_request = await db_service.get_document("job_requests", job_id)
        if not job_request:
            raise HTTPException(
                status_code=404,
                detail="Job request not found"
            )
        
        # Increment view count if viewer is not the owner
        if current_user and job_request.get("customer_id") != current_user.id:
            await db_service.update_document(
                "job_requests",
                job_id,
                {"views_count": job_request.get("views_count", 0) + 1}
            )
            job_request["views_count"] = job_request.get("views_count", 0) + 1
        
        return JobRequestResponse(**job_request)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch job request: {str(e)}"
        )

@router.put("/{job_id}", response_model=JobRequestResponse)
async def update_job_request(
    job_id: str,
    job_data: JobRequestUpdate,
    current_user: User = Depends(get_current_customer)
):
    """Update a job request (owner or admin only)"""
    try:
        job_request = await db_service.get_document("job_requests", job_id)
        if not job_request:
            raise HTTPException(
                status_code=404,
                detail="Job request not found"
            )
        
        # Check ownership or admin
        if job_request["customer_id"] != current_user.id and current_user.role != "admin":
            raise HTTPException(
                status_code=403,
                detail="You can only update your own job requests"
            )
        
        # Update job request
        update_data = job_data.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        success = await db_service.update_document("job_requests", job_id, update_data)
        if not success:
            raise HTTPException(
                status_code=500,
                detail="Failed to update job request"
            )
        
        # Get updated job request
        updated_job = await db_service.get_document("job_requests", job_id)
        return JobRequestResponse(**updated_job)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update job request: {str(e)}"
        )

@router.delete("/{job_id}")
async def delete_job_request(
    job_id: str,
    current_user: User = Depends(get_current_customer)
):
    """Delete a job request (owner or admin only)"""
    try:
        job_request = await db_service.get_document("job_requests", job_id)
        if not job_request:
            raise HTTPException(
                status_code=404,
                detail="Job request not found"
            )
        
        # Check ownership or admin
        if job_request["customer_id"] != current_user.id and current_user.role != "admin":
            raise HTTPException(
                status_code=403,
                detail="You can only delete your own job requests"
            )
        
        # Check if job has active quotes
        quotes = await db_service.get_documents("quotes", {"job_request_id": job_id})
        if quotes and any(q.get("status") == "pending" for q in quotes):
            raise HTTPException(
                status_code=400,
                detail="Cannot delete job with pending quotes. Cancel the job instead."
            )
        
        # Delete job request
        success = await db_service.delete_document("job_requests", job_id)
        if not success:
            raise HTTPException(
                status_code=500,
                detail="Failed to delete job request"
            )
        
        return {"message": "Job request deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete job request: {str(e)}"
        )

@router.post("/{job_id}/photos")
async def upload_job_photo(
    job_id: str,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_customer)
):
    """Upload a photo for a job request"""
    try:
        job_request = await db_service.get_document("job_requests", job_id)
        if not job_request:
            raise HTTPException(
                status_code=404,
                detail="Job request not found"
            )
        
        # Check ownership
        if job_request["customer_id"] != current_user.id and current_user.role != "admin":
            raise HTTPException(
                status_code=403,
                detail="You can only upload photos to your own job requests"
            )
        
        # TODO: Implement file upload logic
        # For now, return a placeholder URL
        photo_url = f"/uploads/jobs/{job_id}/{uuid.uuid4()}.jpg"
        
        # Add photo URL to job request
        current_photos = job_request.get("photos", [])
        current_photos.append(photo_url)
        
        await db_service.update_document(
            "job_requests", 
            job_id, 
            {"photos": current_photos, "updated_at": datetime.utcnow()}
        )
        
        return {"photo_url": photo_url, "message": "Photo uploaded successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload photo: {str(e)}"
        )

@router.put("/{job_id}/status")
async def update_job_status(
    job_id: str,
    new_status: JobStatus,
    current_user: User = Depends(current_active_user)
):
    """Update job status (owner, assigned professional, or admin)"""
    try:
        job_request = await db_service.get_document("job_requests", job_id)
        if not job_request:
            raise HTTPException(
                status_code=404,
                detail="Job request not found"
            )
        
        # Check permissions
        is_owner = job_request["customer_id"] == current_user.id
        is_assigned = job_request.get("assigned_professional_id") == current_user.id
        is_admin = current_user.role == "admin"
        
        if not (is_owner or is_assigned or is_admin):
            raise HTTPException(
                status_code=403,
                detail="You don't have permission to update this job's status"
            )
        
        # Update status
        update_data = {
            "status": new_status,
            "updated_at": datetime.utcnow()
        }
        
        # Add completion timestamp if completing
        if new_status == JobStatus.COMPLETED:
            update_data["completed_at"] = datetime.utcnow()
        elif new_status == JobStatus.CANCELLED:
            update_data["cancelled_at"] = datetime.utcnow()
        
        success = await db_service.update_document("job_requests", job_id, update_data)
        if not success:
            raise HTTPException(
                status_code=500,
                detail="Failed to update job status"
            )
        
        # TODO: Send notifications to relevant parties
        
        return {"message": f"Job status updated to {new_status}"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update job status: {str(e)}"
        )