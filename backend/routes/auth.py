from fastapi import APIRouter, Depends, Request, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi_users import FastAPIUsers
from models.user import User, UserCreate, UserRead, UserUpdate, UserRole, UserProfile
from auth.config import (
    auth_backend,
    fastapi_users,
    google_oauth_client,
    current_active_user,
    get_current_customer,
    get_current_professional,
    get_current_admin,
    get_user_manager,
)
from typing import Optional
from pydantic import BaseModel, EmailStr
from services.email_service import email_service
import random
import redis
from datetime import datetime, timedelta
import json
import bcrypt

# For demo purposes, we'll use a simple in-memory store
# In production, use Redis or database
login_codes_store = {}

# Login Link Schema
class LoginLinkRequest(BaseModel):
    email: EmailStr

class LoginLinkResponse(BaseModel):
    message: str
    email: str

class LoginCodeRequest(BaseModel):
    email: EmailStr
    code: str

class LoginCodeResponse(BaseModel):
    message: str
    user_id: str

class AutoLoginRequest(BaseModel):
    email: EmailStr
    password: str

router = APIRouter()

# Company Registration Schema
class CompanyRegistrationRequest(BaseModel):
    company_id: str  # Icelandic kennitala
    electronic_id: str  # Phone number for electronic identification
    name: str
    email: EmailStr
    password: str

class CompanyRegistrationResponse(BaseModel):
    message: str
    user_id: str
    email: str

# Include auth routes from fastapi-users
auth_router = fastapi_users.get_auth_router(auth_backend)
register_router = fastapi_users.get_register_router(UserRead, UserCreate)
reset_password_router = fastapi_users.get_reset_password_router()
verify_router = fastapi_users.get_verify_router(UserRead)
users_router = fastapi_users.get_users_router(UserRead, UserUpdate)

# Add all the fastapi-users routes
router.include_router(auth_router, prefix="/auth/cookie", tags=["auth"])
router.include_router(register_router, prefix="/auth", tags=["auth"])
router.include_router(reset_password_router, prefix="/auth", tags=["auth"])
router.include_router(verify_router, prefix="/auth", tags=["auth"])
router.include_router(users_router, prefix="/users", tags=["users"])

# Google OAuth routes (if configured)
if google_oauth_client:
    oauth_router = fastapi_users.get_oauth_router(
        google_oauth_client,
        auth_backend,
        "your-secret-key-change-this",  # Should match SECRET_KEY
    )
    router.include_router(oauth_router, prefix="/auth/google", tags=["oauth"])

# Auto-registration endpoint for password login
@router.post("/auth/auto-login")
async def auto_login(
    request: AutoLoginRequest,
    user_manager=Depends(get_user_manager)
):
    """Auto-create user if not exists, then login"""
    try:
        # Extract name from email (before @)
        name = request.email.split('@')[0]
        
        # Check if user exists
        user = None
        try:
            user = await user_manager.get_by_email(request.email)
        except:
            pass  # User doesn't exist, will create below
            
        if user:
            # User exists - update password to allow login
            user.hashed_password = user_manager.password_helper.hash(request.password)
            try:
                # Try to update using user manager
                updated_user = await user_manager.user_db.update(user.id, {"hashed_password": user.hashed_password})
                print(f"✅ Updated password for existing user: {request.email}")
                user = updated_user or user
            except Exception as update_error:
                print(f"⚠️ Could not update user password: {update_error}")
                # Use existing user anyway
        else:
            # User doesn't exist - create new user
            user_create = UserCreate(
                email=request.email,
                password=request.password,
                first_name=name,  # Use email prefix as first name
                last_name="User",  # Default last name
                is_verified=True  # Auto-verify new users
            )
            
            # Create the user
            user = await user_manager.create(user_create, safe=False)
            print(f"✅ Auto-created new user: {request.email}")
        
        # Return success with user data
        return {
            "success": True,
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": getattr(user, 'name', user.email.split('@')[0]),
                "role": user.role
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"❌ Auto-login error: {str(e)}")
        print(f"❌ Full traceback: {error_details}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"LOGIN_FAILED: {str(e)}"
        )

# Custom company registration endpoint
@router.post("/auth/register-company", response_model=CompanyRegistrationResponse)
async def register_company(
    request: CompanyRegistrationRequest,
    user_manager=Depends(get_user_manager)
):
    """Register a new company/professional user"""
    try:
        # Validate Icelandic kennitala format (10 digits)
        if not request.company_id.isdigit() or len(request.company_id) != 10:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Company ID must be exactly 10 digits"
            )
        
        # Validate electronic ID format (7-8 digits for Iceland)
        if not request.electronic_id.isdigit() or not (7 <= len(request.electronic_id) <= 8):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Electronic ID must be 7-8 digits"
            )
        
        # Check if user already exists
        existing_user = await user_manager.get_by_email(request.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )
        
        # Create user with PROFESSIONAL role
        user_create = UserCreate(
            email=request.email,
            password=request.password,
            role=UserRole.PROFESSIONAL,
            is_verified=True  # Auto-verify company registrations
        )
        
        # Create the user
        user = await user_manager.create(user_create, safe=False)
        
        # Create additional profile information
        profile_data = {
            "company_id": request.company_id,
            "electronic_id": request.electronic_id,
            "name": request.name,
            "user_id": str(user.id)
        }
        
        # Store profile data (you'd save this to a profiles collection)
        # For now, we'll just return success
        
        return CompanyRegistrationResponse(
            message="Company registered successfully",
            user_id=str(user.id),
            email=user.email
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to register company: {str(e)}"
        )

# Send passwordless login link endpoint
@router.post("/auth/send-login-link", response_model=LoginLinkResponse)
async def send_login_link(
    request: LoginLinkRequest,
    user_manager=Depends(get_user_manager)
):
    """Send a passwordless login code to the user's email"""
    try:
        # Check if user exists
        user = await user_manager.get_by_email(request.email)
        if not user:
            # For security, don't reveal if user doesn't exist
            return LoginLinkResponse(
                message="If an account with this email exists, a login code has been sent",
                email=request.email
            )
        
        # Generate 6-digit code
        code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        
        # Store code with expiry time (15 minutes)
        expiry_time = datetime.now() + timedelta(minutes=15)
        login_codes_store[request.email] = {
            'code': code,
            'expiry': expiry_time,
            'user_id': str(user.id)
        }
        
        # Send email with login code using real SMTP
        language = 'is'  # Default to Icelandic for verki users
        try:
            email_sent = email_service.send_login_code_email(
                email=request.email,
                code=code,
                language=language
            )
            
            if email_sent:
                print(f"✅ Login code email sent successfully to {request.email}")
            else:
                print(f"❌ Failed to send login code email to {request.email}")
                
        except Exception as email_error:
            print(f"❌ Email service error: {str(email_error)}")
            # Continue anyway for security reasons
        
        # Always return success for security
        return LoginLinkResponse(
            message="If an account with this email exists, a login code has been sent",
            email=request.email
        )
        
    except Exception as e:
        print(f"Error in send_login_link: {str(e)}")
        # Return generic success message for security
        return LoginLinkResponse(
            message="If an account with this email exists, a login code has been sent",
            email=request.email
        )

# Verify login code endpoint
@router.post("/auth/verify-login-code", response_model=LoginCodeResponse)
async def verify_login_code(
    request: LoginCodeRequest,
    user_manager=Depends(get_user_manager)
):
    """Verify the login code and authenticate user"""
    try:
        # Check if user exists
        user = await user_manager.get_by_email(request.email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email or code"
            )
        
        # Verify code format
        if len(request.code) != 6 or not request.code.isdigit():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid code format"
            )
        
        # Check if code exists and hasn't expired
        stored_data = login_codes_store.get(request.email)
        if not stored_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired code"
            )
        
        # Check if code matches
        if stored_data['code'] != request.code:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid code"
            )
        
        # Check if code hasn't expired
        if datetime.now() > stored_data['expiry']:
            # Remove expired code
            del login_codes_store[request.email]
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Code has expired"
            )
        
        # Code is valid, remove it from store (one-time use)
        del login_codes_store[request.email]
        
        # In a real implementation, you would create a session/JWT token here
        
        return LoginCodeResponse(
            message="Login successful",
            user_id=str(user.id)
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to verify login code: {str(e)}"
        )

# Custom authentication endpoints
@router.post("/auth/magic-link")
async def request_magic_link(email: str):
    """Request a magic link for passwordless login"""
    # TODO: Implement magic link functionality
    return {"message": "Magic link functionality coming soon"}

@router.get("/auth/me")
async def get_current_user_info(user: User = Depends(current_active_user)):
    """Get current authenticated user information"""
    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "profile": user.profile,
        "language": user.language,
        "is_verified": user.is_verified,
        "created_at": user.created_at
    }

@router.put("/auth/profile")
async def update_profile(
    profile_data: dict,
    user: User = Depends(current_active_user)
):
    """Update user profile information"""
    # Update profile fields
    if "first_name" in profile_data:
        user.profile.first_name = profile_data["first_name"]
    if "last_name" in profile_data:
        user.profile.last_name = profile_data["last_name"]
    if "phone" in profile_data:
        user.profile.phone = profile_data["phone"]
    if "location" in profile_data:
        user.profile.location = profile_data["location"]
    if "avatar" in profile_data:
        user.profile.avatar = profile_data["avatar"]
    if "company_name" in profile_data and user.role == "professional":
        user.profile.company_name = profile_data["company_name"]
    if "company_id" in profile_data and user.role == "professional":
        user.profile.company_id = profile_data["company_id"]
    if "trade_certifications" in profile_data and user.role == "professional":
        user.profile.trade_certifications = profile_data["trade_certifications"]
    if "service_areas" in profile_data and user.role == "professional":
        user.profile.service_areas = profile_data["service_areas"]
    if "language" in profile_data:
        user.language = profile_data["language"]
    
    from datetime import datetime
    user.updated_at = datetime.utcnow()
    await user.save()
    
    return {"message": "Profile updated successfully"}

@router.post("/auth/switch-role")
async def switch_user_role(
    new_role: str,
    user: User = Depends(current_active_user)
):
    """Switch user role (admin only for now, or self-upgrade to professional)"""
    from models.user import UserRole
    
    if new_role not in [role.value for role in UserRole]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role"
        )
    
    # Allow users to upgrade to professional, but admin needed for other changes
    if new_role != "professional" and user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin role required to change to this role"
        )
    
    user.role = new_role
    from datetime import datetime
    user.updated_at = datetime.utcnow()
    await user.save()
    
    return {"message": f"Role changed to {new_role}"}

# Role-specific test endpoints
@router.get("/auth/customer-only")
async def customer_only_endpoint(user: User = Depends(get_current_customer)):
    """Test endpoint for customer access"""
    return {"message": "Customer access granted", "user_id": user.id}

@router.get("/auth/professional-only")
async def professional_only_endpoint(user: User = Depends(get_current_professional)):
    """Test endpoint for professional access"""
    return {"message": "Professional access granted", "user_id": user.id}

@router.get("/auth/admin-only")
async def admin_only_endpoint(user: User = Depends(get_current_admin)):
    """Test endpoint for admin access"""
    return {"message": "Admin access granted", "user_id": user.id}

@router.post("/auth/link-draft-jobs")
async def link_draft_jobs_to_user(user: User = Depends(current_active_user)):
    """Link any draft jobs with matching email to authenticated user"""
    from services.db_service import db_service
    
    try:
        # Find draft jobs with matching email
        draft_jobs = await db_service.get_documents(
            "job_requests",
            filter_dict={
                "contact_email": user.email,
                "status": "draft",
                "customer_id": None  # Only unlinked drafts
            }
        )
        
        linked_count = 0
        for job in draft_jobs:
            # Link job to user
            await db_service.update_document(
                "job_requests",
                job["id"],
                {
                    "customer_id": user.id,
                    "status": "open",  # Change from draft to open
                    "updated_at": datetime.utcnow()
                }
            )
            linked_count += 1
        
        return {
            "message": f"Successfully linked {linked_count} draft jobs to your account",
            "linked_jobs": linked_count
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to link draft jobs: {str(e)}"
        )