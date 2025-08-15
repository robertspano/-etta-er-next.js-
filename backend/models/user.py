from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid

class UserType(str, Enum):
    CLIENT = "client"
    PROFESSIONAL = "professional"

class Language(str, Enum):
    ENGLISH = "en"
    ICELANDIC = "is"

class UserProfile(BaseModel):
    firstName: str
    lastName: str
    phone: Optional[str] = None
    location: Optional[str] = None
    avatar: Optional[str] = None

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    passwordHash: str
    userType: UserType
    profile: UserProfile
    language: Language = Language.ENGLISH
    isVerified: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    userType: UserType
    firstName: str
    lastName: str
    phone: Optional[str] = None
    language: Language = Language.ENGLISH

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    userType: UserType
    profile: UserProfile
    language: Language
    isVerified: bool
    createdAt: datetime