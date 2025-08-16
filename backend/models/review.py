from beanie import Document
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum
import uuid

class ReviewStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved" 
    REJECTED = "rejected"

class Review(Document):
    """Review document for completed projects"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    
    # Core identifiers
    job_request_id: str  # The completed job request
    professional_id: str  # Professional being reviewed
    customer_id: str  # Customer who wrote the review
    
    # Review content
    rating: int = Field(ge=1, le=5, description="Rating from 1-5 stars")
    title: str = Field(min_length=5, max_length=100, description="Review title/summary")
    content: str = Field(min_length=10, max_length=1000, description="Detailed review content")
    
    # Additional info
    project_category: str  # Category of the completed project
    project_postcode: str  # Location of the project
    images: List[str] = []  # URLs to review photos
    
    # Moderation
    status: ReviewStatus = ReviewStatus.PENDING
    is_verified: bool = False  # Whether the project completion is verified
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    moderated_at: Optional[datetime] = None
    moderated_by: Optional[str] = None  # Admin user ID
    
    class Settings:
        name = "reviews"

class ReviewCreate(BaseModel):
    """Schema for creating a new review"""
    job_request_id: str
    professional_id: str
    rating: int = Field(ge=1, le=5)
    title: str = Field(min_length=5, max_length=100)
    content: str = Field(min_length=10, max_length=1000)
    images: List[str] = []

class ReviewResponse(BaseModel):
    """Schema for review API responses"""
    id: str
    job_request_id: str
    professional_id: str
    customer_id: str
    rating: int
    title: str
    content: str
    project_category: str
    project_postcode: str
    images: List[str]
    status: ReviewStatus
    is_verified: bool
    created_at: datetime
    
    # Populated from related documents
    professional_name: Optional[str] = None
    professional_company_name: Optional[str] = None
    customer_name: Optional[str] = None
    customer_location: Optional[str] = None

class ReviewListResponse(BaseModel):
    """Schema for homepage reviews list (frontend format)"""
    id: str
    company: dict  # {id, name, logoUrl}
    rating: int
    excerpt: str  # shortened content
    reviewer: dict  # {name, initial, location}
    date: str  # ISO string
    url: str  # link to full review