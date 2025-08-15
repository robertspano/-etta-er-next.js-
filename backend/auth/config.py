import os
from typing import Optional
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers
from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
    JWTStrategy,
)
from fastapi_users_db_beanie import BeanieUserDatabase
from httpx_oauth.clients.google import GoogleOAuth2
from models.user import User, UserCreate, UserUpdate


class UserManager(BaseUserManager[User, str]):
    """Custom user manager for handling user operations"""
    reset_password_token_secret = os.getenv("SECRET_KEY", "your-secret-key-change-this")
    verification_token_secret = os.getenv("SECRET_KEY", "your-secret-key-change-this")

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.email} has registered.")
        # Update user profile based on creation data
        if hasattr(request, 'json_body'):
            data = request.json_body
            if 'first_name' in data or 'last_name' in data:
                user.profile.first_name = data.get('first_name', '')
                user.profile.last_name = data.get('last_name', '')
                if 'phone' in data:
                    user.profile.phone = data.get('phone')
                if 'company_name' in data:
                    user.profile.company_name = data.get('company_name')
                if 'company_id' in data:
                    user.profile.company_id = data.get('company_id')
                await user.save()

    async def on_after_login(self, user: User, request: Optional[Request] = None, response=None):
        print(f"User {user.email} has logged in.")
        # Update last login timestamp
        from datetime import datetime
        user.updated_at = datetime.utcnow()
        await user.save()

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.email}. Token: {token}")

    async def on_after_verify(self, user: User, request: Optional[Request] = None):
        print(f"User {user.email} has been verified")


async def get_user_db():
    """Dependency to get the user database"""
    yield BeanieUserDatabase(User)


async def get_user_manager(user_db: BeanieUserDatabase = Depends(get_user_db)):
    """Dependency to get the user manager"""
    yield UserManager(user_db)


# Cookie transport for session-based auth
cookie_transport = CookieTransport(
    cookie_name="buildconnect_auth",
    cookie_max_age=3600 * 24 * 7,  # 7 days
    cookie_httponly=True,
    cookie_secure=False,  # Set to True in production with HTTPS
    cookie_samesite="lax"
)

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret=os.getenv("SECRET_KEY", "your-secret-key-change-this"),
        lifetime_seconds=3600 * 24 * 7,  # 7 days
    )

# JWT Authentication
auth_backend = AuthenticationBackend(
    name="cookie",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

# Google OAuth client (will be configured with environment variables)
google_oauth_client = None
if os.getenv("GOOGLE_OAUTH_CLIENT_ID") and os.getenv("GOOGLE_OAUTH_CLIENT_SECRET"):
    google_oauth_client = GoogleOAuth2(
        client_id=os.getenv("GOOGLE_OAUTH_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_OAUTH_CLIENT_SECRET"),
    )

# FastAPI Users instance
fastapi_users = FastAPIUsers[User, str](get_user_manager, [auth_backend])

# Dependencies for authentication
current_active_user = fastapi_users.current_user(active=True)
current_superuser = fastapi_users.current_user(active=True, superuser=True)

# Role-based dependencies
async def get_current_customer(user: User = Depends(current_active_user)):
    """Dependency to get current customer user"""
    if user.role not in ["customer", "admin"]:
        from fastapi import HTTPException, status
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Customer role required."
        )
    return user

async def get_current_professional(user: User = Depends(current_active_user)):
    """Dependency to get current professional user"""
    if user.role not in ["professional", "admin"]:
        from fastapi import HTTPException, status
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Professional role required."
        )
    return user

async def get_current_admin(user: User = Depends(current_active_user)):
    """Dependency to get current admin user"""
    if user.role != "admin":
        from fastapi import HTTPException, status
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Admin role required."
        )
    return user