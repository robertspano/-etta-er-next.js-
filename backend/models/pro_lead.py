from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from beanie import Document
import uuid

class ProLeadCreate(BaseModel):
    company_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr

class ProLead(Document):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_name: str
    email: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        collection = "pro_leads"