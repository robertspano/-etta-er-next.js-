from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Review(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    projectId: str
    professionalId: str
    clientId: str
    rating: int = Field(ge=1, le=5)
    title: str
    description: str
    images: List[str] = []
    isVerified: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ReviewCreate(BaseModel):
    projectId: str
    professionalId: str
    rating: int = Field(ge=1, le=5)
    title: str
    description: str
    images: List[str] = []

class ReviewResponse(BaseModel):
    id: str
    projectId: str
    professionalId: str
    clientId: str
    rating: int
    title: str
    description: str
    images: List[str]
    isVerified: bool
    createdAt: datetime