from beanie import Document
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid

class JobStatus(str, Enum):
    OPEN = "open"
    QUOTED = "quoted"
    ACCEPTED = "accepted"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class JobPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class JobRequest(Document):
    """Job request document for customers posting construction jobs"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: str  # User ID of the customer who posted the job
    
    # Job Details
    category: str  # Service category (plumbing, electrical, etc.)
    title: str
    description: str
    postcode: str
    address: Optional[str] = None
    
    # Budget and Priority
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    budget_currency: str = "ISK"
    priority: JobPriority = JobPriority.MEDIUM
    
    # Media
    photos: List[str] = []  # URLs to uploaded photos
    documents: List[str] = []  # URLs to uploaded documents
    
    # Status and Timing
    status: JobStatus = JobStatus.OPEN
    posted_at: datetime = Field(default_factory=datetime.utcnow)
    deadline: Optional[datetime] = None
    
    # Quote Management
    quote_deadline: Optional[datetime] = None  # When quotes are no longer accepted
    max_quotes: int = 10  # Maximum number of quotes to accept
    quotes_count: int = 0
    
    # Job Assignment
    accepted_quote_id: Optional[str] = None
    assigned_professional_id: Optional[str] = None
    
    # Completion
    completed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None
    cancellation_reason: Optional[str] = None
    
    # Metadata
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_featured: bool = False
    views_count: int = 0
    
    class Settings:
        name = "job_requests"

class JobRequestCreate(BaseModel):
    """Schema for creating a new job request"""
    category: str
    title: str
    description: str
    postcode: str
    address: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    priority: JobPriority = JobPriority.MEDIUM
    deadline: Optional[datetime] = None
    quote_deadline: Optional[datetime] = None

class JobRequestUpdate(BaseModel):
    """Schema for updating a job request"""
    title: Optional[str] = None
    description: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    priority: Optional[JobPriority] = None
    deadline: Optional[datetime] = None
    status: Optional[JobStatus] = None

class JobRequestResponse(BaseModel):
    """Schema for job request responses"""
    id: str
    customer_id: str
    category: str
    title: str
    description: str
    postcode: str
    address: Optional[str]
    budget_min: Optional[float]
    budget_max: Optional[float]
    budget_currency: str
    priority: JobPriority
    status: JobStatus
    posted_at: datetime
    deadline: Optional[datetime]
    quotes_count: int
    photos: List[str]
    is_featured: bool
    views_count: int