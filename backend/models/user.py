from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum
from fastapi_users import schemas
import uuid

class UserRole(str, Enum):
    CUSTOMER = "customer"
    PROFESSIONAL = "professional"
    ADMIN = "admin"

class Language(str, Enum):
    ENGLISH = "en"
    ICELANDIC = "is"

class UserProfile(BaseModel):
    first_name: str = ""
    last_name: str = ""
    phone: Optional[str] = None
    location: Optional[str] = None
    avatar: Optional[str] = None
    company_name: Optional[str] = None  # For professionals
    company_id: Optional[str] = None    # KT number for Icelandic companies
    trade_certifications: Optional[list] = []  # For professionals
    service_areas: Optional[list] = []  # Postcodes they serve

class User(Document):
    """User document for MongoDB with fastapi-users integration"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    email: EmailStr = Field(unique=True, index=True)
    hashed_password: str
    role: UserRole = UserRole.CUSTOMER
    profile: UserProfile = Field(default_factory=UserProfile)
    language: Language = Language.ENGLISH
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
    oauth_accounts: list = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "users"
        indexes = [
            "email",
            "role",
            "is_active"
        ]

# FastAPI Users schemas
class UserRead(schemas.BaseUser[str]):
    """Schema for reading user data"""
    id: str
    email: EmailStr
    role: UserRole
    profile: UserProfile
    language: Language
    is_active: bool
    is_superuser: bool
    is_verified: bool
    created_at: datetime

class UserCreate(schemas.BaseUserCreate):
    """Schema for user creation"""
    email: EmailStr
    password: str
    role: UserRole = UserRole.CUSTOMER
    first_name: str
    last_name: str
    phone: Optional[str] = None
    language: Language = Language.ENGLISH
    company_name: Optional[str] = None
    company_id: Optional[str] = None

class UserUpdate(schemas.BaseUserUpdate):
    """Schema for user updates"""
    password: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[UserRole] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    language: Optional[Language] = None
    company_name: Optional[str] = None
    company_id: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_verified: Optional[bool] = None