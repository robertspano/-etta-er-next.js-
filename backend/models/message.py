from beanie import Document
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid

class MessageType(str, Enum):
    TEXT = "text"
    FILE = "file"
    IMAGE = "image"
    SYSTEM = "system"

class MessageStatus(str, Enum):
    SENT = "sent"
    DELIVERED = "delivered"
    READ = "read"

class JobMessage(Document):
    """Message document for job-specific communications"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_request_id: str  # Reference to JobRequest
    
    # Participants
    sender_id: str  # User ID of sender
    recipient_id: str  # User ID of recipient
    
    # Message Content
    message_type: MessageType = MessageType.TEXT
    content: str
    attachments: List[str] = []  # URLs to uploaded files
    
    # Metadata
    status: MessageStatus = MessageStatus.SENT
    sent_at: datetime = Field(default_factory=datetime.utcnow)
    delivered_at: Optional[datetime] = None
    read_at: Optional[datetime] = None
    
    # System messages (automated notifications)
    is_system_message: bool = False
    system_event: Optional[str] = None  # e.g., "quote_submitted", "job_accepted"
    
    class Settings:
        name = "job_messages"

class MessageCreate(BaseModel):
    """Schema for creating a new message"""
    job_request_id: str
    recipient_id: str
    message_type: MessageType = MessageType.TEXT
    content: str
    attachments: List[str] = []

class MessageResponse(BaseModel):
    """Schema for message responses"""
    id: str
    job_request_id: str
    sender_id: str
    recipient_id: str
    message_type: MessageType
    content: str
    attachments: List[str]
    status: MessageStatus
    sent_at: datetime
    read_at: Optional[datetime]
    is_system_message: bool
    # Sender info will be populated by the API
    sender_name: Optional[str] = None
    sender_role: Optional[str] = None