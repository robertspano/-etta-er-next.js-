from fastapi import APIRouter, Depends, Request, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi_users import FastAPIUsers
from models.user import User, UserCreate, UserRead, UserUpdate
from auth.config import (
    auth_backend,
    fastapi_users,
    google_oauth_client,
    current_active_user,
    get_current_customer,
    get_current_professional,
    get_current_admin,
)
from typing import Optional

router = APIRouter()

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