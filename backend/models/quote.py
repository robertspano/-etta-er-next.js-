from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timedelta
from enum import Enum
import uuid

class QuoteStatus(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    EXPIRED = "expired"

class Quote(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    projectId: str
    professionalId: str
    price: float
    timeline: str
    description: str
    materials: str
    status: QuoteStatus = QuoteStatus.PENDING
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    expiresAt: datetime = Field(default_factory=lambda: datetime.utcnow() + timedelta(days=7))

class QuoteCreate(BaseModel):
    projectId: str
    price: float
    timeline: str
    description: str
    materials: str

class QuoteResponse(BaseModel):
    id: str
    projectId: str
    professionalId: str
    price: float
    timeline: str
    description: str
    materials: str
    status: QuoteStatus
    createdAt: datetime
    expiresAt: datetime