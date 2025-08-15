from beanie import Document
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum
import uuid

class QuoteStatus(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    DECLINED = "declined"
    WITHDRAWN = "withdrawn"
    EXPIRED = "expired"

class Quote(Document):
    """Quote document for professionals bidding on jobs"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_request_id: str  # Reference to JobRequest
    professional_id: str  # User ID of the professional
    customer_id: str  # User ID of the customer (for easy querying)
    
    # Quote Details
    amount: float
    currency: str = "ISK"
    message: str  # Professional's message to customer
    
    # Timeline
    estimated_duration: Optional[str] = None  # e.g., "2-3 weeks"
    start_date: Optional[datetime] = None
    completion_date: Optional[datetime] = None
    
    # Status and Validity
    status: QuoteStatus = QuoteStatus.PENDING
    expires_at: datetime  # When this quote expires
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Response handling
    accepted_at: Optional[datetime] = None
    declined_at: Optional[datetime] = None
    withdrawn_at: Optional[datetime] = None
    
    # Additional details
    includes_materials: bool = True
    materials_cost: Optional[float] = None
    labor_cost: Optional[float] = None
    additional_notes: Optional[str] = None
    
    class Settings:
        name = "quotes"

class QuoteCreate(BaseModel):
    """Schema for creating a new quote"""
    job_request_id: str
    amount: float
    message: str
    estimated_duration: Optional[str] = None
    start_date: Optional[datetime] = None
    completion_date: Optional[datetime] = None
    expires_at: datetime
    includes_materials: bool = True
    materials_cost: Optional[float] = None
    labor_cost: Optional[float] = None
    additional_notes: Optional[str] = None

class QuoteUpdate(BaseModel):
    """Schema for updating a quote"""
    amount: Optional[float] = None
    message: Optional[str] = None
    estimated_duration: Optional[str] = None
    start_date: Optional[datetime] = None
    completion_date: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    includes_materials: Optional[bool] = None
    materials_cost: Optional[float] = None
    labor_cost: Optional[float] = None
    additional_notes: Optional[str] = None

class QuoteResponse(BaseModel):
    """Schema for quote responses"""
    id: str
    job_request_id: str
    professional_id: str
    amount: float
    currency: str
    message: str
    estimated_duration: Optional[str]
    start_date: Optional[datetime]
    completion_date: Optional[datetime]
    status: QuoteStatus
    expires_at: datetime
    submitted_at: datetime
    includes_materials: bool
    materials_cost: Optional[float]
    labor_cost: Optional[float]
    # Professional info will be populated by the API
    professional_name: Optional[str] = None
    professional_company: Optional[str] = None
    professional_rating: Optional[float] = None