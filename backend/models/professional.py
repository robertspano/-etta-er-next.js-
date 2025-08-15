from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Professional(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str
    specialties: List[str]
    experience: int
    location: str
    priceRange: str
    rating: float = 0.0
    reviewCount: int = 0
    completedJobs: int = 0
    isVerified: bool = False
    isInsured: bool = False
    certifications: List[str] = []
    portfolio: List[str] = []
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ProfessionalCreate(BaseModel):
    specialties: List[str]
    experience: int
    location: str
    priceRange: str
    isInsured: bool = False
    certifications: List[str] = []
    portfolio: List[str] = []

class ProfessionalResponse(BaseModel):
    id: str
    userId: str
    specialties: List[str]
    experience: int
    location: str
    priceRange: str
    rating: float
    reviewCount: int
    completedJobs: int
    isVerified: bool
    isInsured: bool
    certifications: List[str]
    portfolio: List[str]
    createdAt: datetime