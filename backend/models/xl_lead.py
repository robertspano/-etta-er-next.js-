from beanie import Document
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class XLLead(Document):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    project_title: Optional[str] = None
    description: str
    location: str
    name: str
    email: str
    phone: str
    language: str = "en"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        collection = "xl_leads"

class XLLeadCreate(BaseModel):
    category: str
    project_title: Optional[str] = None
    description: str
    location: str
    name: str
    email: str
    phone: str
    language: str = "en"