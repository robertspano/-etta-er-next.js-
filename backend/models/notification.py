from beanie import Document
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

class NotificationType(str, Enum):
    NEW_JOB_REQUEST = "new_job_request"
    NEW_QUOTE = "new_quote"
    QUOTE_ACCEPTED = "quote_accepted"
    QUOTE_DECLINED = "quote_declined"
    QUOTE_WITHDRAWN = "quote_withdrawn"
    JOB_STARTED = "job_started"
    JOB_COMPLETED = "job_completed"
    JOB_CANCELLED = "job_cancelled"
    MESSAGE_RECEIVED = "message_received"
    PAYMENT_DUE = "payment_due"
    PAYMENT_RECEIVED = "payment_received"

class NotificationChannel(str, Enum):
    IN_APP = "in_app"
    EMAIL = "email"
    SMS = "sms"

class Notification(Document):
    """Notification document for user notifications"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str  # Recipient user ID
    
    # Notification Details
    type: NotificationType
    title: str
    message: str
    
    # Related Entities
    job_request_id: Optional[str] = None
    quote_id: Optional[str] = None
    message_id: Optional[str] = None
    
    # Delivery
    channels: list[NotificationChannel] = [NotificationChannel.IN_APP]
    sent_at: datetime = Field(default_factory=datetime.utcnow)
    read_at: Optional[datetime] = None
    
    # Email/SMS tracking
    email_sent: bool = False
    email_sent_at: Optional[datetime] = None
    sms_sent: bool = False
    sms_sent_at: Optional[datetime] = None
    
    # Metadata
    data: Dict[str, Any] = {}  # Additional context data
    
    class Settings:
        name = "notifications"

class NotificationCreate(BaseModel):
    """Schema for creating a notification"""
    user_id: str
    type: NotificationType
    title: str
    message: str
    job_request_id: Optional[str] = None
    quote_id: Optional[str] = None
    message_id: Optional[str] = None
    channels: list[NotificationChannel] = [NotificationChannel.IN_APP]
    data: Dict[str, Any] = {}

class NotificationResponse(BaseModel):
    """Schema for notification responses"""
    id: str
    type: NotificationType
    title: str
    message: str
    job_request_id: Optional[str]
    quote_id: Optional[str]
    sent_at: datetime
    read_at: Optional[datetime]
    data: Dict[str, Any]