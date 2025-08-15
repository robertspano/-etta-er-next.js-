from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import List, Optional
from datetime import datetime, timedelta
from models.notification import (
    Notification, 
    NotificationCreate, 
    NotificationResponse, 
    NotificationType,
    NotificationChannel
)
from models.user import User
from auth.config import current_active_user, get_current_admin
from services.database import db_service

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.post("/", response_model=NotificationResponse)
async def create_notification(
    notification_data: NotificationCreate,
    current_user: User = Depends(get_current_admin)
):
    """Create a new notification (admin only)"""
    try:
        notification = Notification(**notification_data.dict())
        await notification.save()
        
        # TODO: Send email/SMS if requested
        # await send_notification_via_channels(notification)
        
        return NotificationResponse(**notification.dict())
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create notification: {str(e)}"
        )

@router.get("/", response_model=List[NotificationResponse])
async def get_user_notifications(
    unread_only: bool = Query(False, description="Get only unread notifications"),
    type_filter: Optional[NotificationType] = Query(None, description="Filter by type"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    current_user: User = Depends(current_active_user)
):
    """Get notifications for the current user"""
    try:
        # Build query filter
        query_filter = {"user_id": current_user.id}
        
        if unread_only:
            query_filter["read_at"] = None
        
        if type_filter:
            query_filter["type"] = type_filter
        
        # Calculate skip for pagination
        skip = (page - 1) * limit
        
        # Get notifications, sorted by most recent first
        notifications = await db_service.get_documents(
            "notifications",
            filter_dict=query_filter,
            limit=limit,
            skip=skip
        )
        
        # Sort by sent_at descending
        notifications.sort(key=lambda x: x.get("sent_at"), reverse=True)
        
        return [NotificationResponse(**notif) for notif in notifications]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch notifications: {str(e)}"
        )

@router.put("/{notification_id}/read")
async def mark_notification_read(
    notification_id: str,
    current_user: User = Depends(current_active_user)
):
    """Mark a notification as read"""
    try:
        notification = await db_service.get_document("notifications", notification_id)
        if not notification:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found"
            )
        
        # Check ownership
        if notification["user_id"] != current_user.id and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only mark your own notifications as read"
            )
        
        # Mark as read
        success = await db_service.update_document("notifications", notification_id, {
            "read_at": datetime.utcnow()
        })
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update notification"
            )
        
        return {"message": "Notification marked as read"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to mark notification as read: {str(e)}"
        )

@router.put("/mark-all-read")
async def mark_all_notifications_read(
    current_user: User = Depends(current_active_user)
):
    """Mark all notifications as read for the current user"""
    try:
        # Find all unread notifications for the user
        unread_notifications = await db_service.get_documents("notifications", {
            "user_id": current_user.id,
            "read_at": None
        })
        
        # Mark them all as read
        read_time = datetime.utcnow()
        for notification in unread_notifications:
            await db_service.update_document("notifications", notification["id"], {
                "read_at": read_time
            })
        
        return {"message": f"Marked {len(unread_notifications)} notifications as read"}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to mark notifications as read: {str(e)}"
        )

@router.delete("/{notification_id}")
async def delete_notification(
    notification_id: str,
    current_user: User = Depends(current_active_user)
):
    """Delete a notification"""
    try:
        notification = await db_service.get_document("notifications", notification_id)
        if not notification:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found"
            )
        
        # Check ownership
        if notification["user_id"] != current_user.id and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only delete your own notifications"
            )
        
        # Delete notification
        success = await db_service.delete_document("notifications", notification_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete notification"
            )
        
        return {"message": "Notification deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete notification: {str(e)}"
        )

@router.get("/stats")
async def get_notification_stats(
    current_user: User = Depends(current_active_user)
):
    """Get notification statistics for the current user"""
    try:
        # Get counts for different notification states
        all_notifications = await db_service.get_documents("notifications", {
            "user_id": current_user.id
        })
        
        total_count = len(all_notifications)
        unread_count = len([n for n in all_notifications if not n.get("read_at")])
        
        # Get counts by type for unread notifications
        unread_by_type = {}
        for notification in all_notifications:
            if not notification.get("read_at"):
                notif_type = notification["type"]
                unread_by_type[notif_type] = unread_by_type.get(notif_type, 0) + 1
        
        # Get recent notifications (last 7 days)
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        recent_count = len([
            n for n in all_notifications 
            if n.get("sent_at") and n["sent_at"] >= seven_days_ago
        ])
        
        return {
            "total_notifications": total_count,
            "unread_count": unread_count,
            "recent_count": recent_count,
            "unread_by_type": unread_by_type
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch notification stats: {str(e)}"
        )

# Helper functions for creating common notifications
async def create_job_notification(
    job_request_id: str,
    notification_type: NotificationType,
    user_id: str,
    title: str,
    message: str,
    additional_data: dict = None
):
    """Helper function to create job-related notifications"""
    try:
        notification = Notification(
            user_id=user_id,
            type=notification_type,
            title=title,
            message=message,
            job_request_id=job_request_id,
            channels=[NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            data=additional_data or {}
        )
        
        await notification.save()
        return notification
        
    except Exception as e:
        print(f"Failed to create notification: {str(e)}")
        return None

async def create_quote_notification(
    quote_id: str,
    job_request_id: str,
    notification_type: NotificationType,
    user_id: str,
    title: str,
    message: str,
    additional_data: dict = None
):
    """Helper function to create quote-related notifications"""
    try:
        notification = Notification(
            user_id=user_id,
            type=notification_type,
            title=title,
            message=message,
            job_request_id=job_request_id,
            quote_id=quote_id,
            channels=[NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            data=additional_data or {}
        )
        
        await notification.save()
        return notification
        
    except Exception as e:
        print(f"Failed to create notification: {str(e)}")
        return None