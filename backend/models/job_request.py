from beanie import Document
from pydantic import BaseModel, Field, field_validator, ValidationInfo
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid
import re

class JobStatus(str, Enum):
    DRAFT = "draft"
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
    customer_id: Optional[str] = None  # User ID of the customer who posted the job (null for guests)
    guest_id: Optional[str] = None  # Guest ID for unauthenticated users
    
    # Job Details
    category: str  # Service category (plumbing, electrical, etc.)
    title: Optional[str] = None  # Made optional for automotive category
    description: Optional[str] = None  # Made optional for automotive category
    postcode: str
    address: Optional[str] = None
    
    # Automotive-specific fields
    license_plate: Optional[str] = None  # License plate for automotive category
    plate_country: Optional[str] = None  # Country code for license plate
    
    # Budget and Priority
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    budget_currency: str = "ISK"
    priority: JobPriority = JobPriority.MEDIUM
    
    # Media
    photos: List[str] = []  # URLs to uploaded photos
    documents: List[str] = []  # URLs to uploaded documents
    
    # Status and Timing
    status: JobStatus = JobStatus.DRAFT
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
    title: Optional[str] = None  # Optional for automotive
    description: Optional[str] = None  # Optional for automotive
    postcode: str
    address: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    priority: JobPriority = JobPriority.MEDIUM
    deadline: Optional[datetime] = None
    quote_deadline: Optional[datetime] = None
    license_plate: Optional[str] = None  # For automotive category
    plate_country: Optional[str] = None  # For automotive category
    
    @field_validator('title', mode='before')
    @classmethod
    def validate_title_length(cls, v: Optional[str], info: ValidationInfo) -> Optional[str]:
        # Only validate title if not automotive category or if title is provided
        category = info.data.get('category') if info.data else None
        if category != 'automotive' and (not v or len(v.strip()) < 10):
            raise ValueError('Title must be at least 10 characters long')
        return v.strip() if v else v
    
    @field_validator('description', mode='before')
    @classmethod
    def validate_description_length(cls, v: Optional[str], info: ValidationInfo) -> Optional[str]:
        # Only validate description if not automotive category or if description is provided
        category = info.data.get('category') if info.data else None
        if category != 'automotive' and (not v or len(v.strip()) < 30):
            raise ValueError('Description must be at least 30 characters long')
        return v.strip() if v else v
    
    @field_validator('license_plate')
    @classmethod
    def validate_license_plate(cls, v: Optional[str], info: ValidationInfo) -> Optional[str]:
        # Validate license plate for automotive category
        category = info.data.get('category') if info.data else None
        if category == 'automotive':
            if not v:
                raise ValueError('License plate is required for automotive category')
            if not (2 <= len(v) <= 8):
                raise ValueError('License plate must be 2-8 characters long')
            if not re.match(r'^[A-Z0-9]+$', v):
                raise ValueError('License plate must contain only letters and numbers')
        return v

class JobRequestUpdate(BaseModel):
    """Schema for updating a job request"""
    title: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    priority: Optional[JobPriority] = None
    deadline: Optional[datetime] = None
    status: Optional[JobStatus] = None
    license_plate: Optional[str] = None  # For automotive updates
    plate_country: Optional[str] = None  # For automotive updates
    
    @field_validator('title')
    @classmethod
    def validate_title_length(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and len(v.strip()) < 10:
            raise ValueError('Title must be at least 10 characters long')
        return v.strip() if v else v
    
    @field_validator('description')
    @classmethod
    def validate_description_length(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and len(v.strip()) < 30:
            raise ValueError('Description must be at least 30 characters long')
        return v.strip() if v else v
    
    @field_validator('license_plate')
    @classmethod
    def validate_license_plate(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            if not (2 <= len(v) <= 8):
                raise ValueError('License plate must be 2-8 characters long')
            if not re.match(r'^[A-Z0-9]+$', v):
                raise ValueError('License plate must contain only letters and numbers')
        return v

class JobRequestResponse(BaseModel):
    """Schema for job request responses"""
    id: str
    customer_id: str
    category: str
    title: Optional[str]  # Optional for automotive
    description: Optional[str]  # Optional for automotive
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
    license_plate: Optional[str] = None  # For automotive
    plate_country: Optional[str] = None  # For automotive