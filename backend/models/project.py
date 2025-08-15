from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid

class ServiceType(str, Enum):
    PLUMBING = "plumbing"
    ELECTRICAL = "electrical"
    CARPENTRY = "carpentry"
    PAINTING = "painting"
    ROOFING = "roofing"
    HEATING = "heating"
    RENOVATION = "renovation"
    LANDSCAPING = "landscaping"
    CONSTRUCTION = "construction"

class ProjectStatus(str, Enum):
    OPEN = "open"
    QUOTED = "quoted"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class Urgency(str, Enum):
    IMMEDIATE = "immediate"
    WITHIN_WEEK = "within_week"
    WITHIN_MONTH = "within_month"
    FLEXIBLE = "flexible"

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    clientId: str
    title: str
    description: str
    serviceType: ServiceType
    location: str
    budget: Optional[str] = None
    urgency: Urgency = Urgency.FLEXIBLE
    status: ProjectStatus = ProjectStatus.OPEN
    images: List[str] = []
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    serviceType: ServiceType
    location: str
    budget: Optional[str] = None
    urgency: Urgency = Urgency.FLEXIBLE
    images: List[str] = []

class ProjectResponse(BaseModel):
    id: str
    clientId: str
    title: str
    description: str
    serviceType: ServiceType
    location: str
    budget: Optional[str]
    urgency: Urgency
    status: ProjectStatus
    images: List[str]
    createdAt: datetime
    updatedAt: datetime