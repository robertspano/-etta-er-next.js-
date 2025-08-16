from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from typing import Optional
from datetime import datetime, timedelta
from models.job_request import JobRequest, JobStatus, JobPriority
from models.user import User
from auth.config import current_active_user_optional
from services.database import db_service
from pydantic import BaseModel, validator
import uuid
import time

router = APIRouter(prefix="/public/job-requests", tags=["public-job-requests"])

# Rate limiting storage (in production, use Redis)
rate_limit_storage = {}

class DraftJobRequestCreate(BaseModel):
    """Schema for creating a draft job request (public)"""
    category: str
    title: Optional[str] = None  # Optional for automotive
    description: Optional[str] = None  # Optional for automotive
    postcode: str = "101"  # Default Iceland postcode
    licensePlate: Optional[str] = None  # For automotive category
    plateCountry: Optional[str] = None  # For automotive category
    
    @validator('title')
    def validate_title_length(cls, v, values):
        # Only validate title if not automotive category or if title is provided
        if values.get('category') != 'automotive' and (not v or len(v.strip()) < 10):
            raise ValueError('Title must be at least 10 characters long')
        return v.strip() if v else v
    
    @validator('description')
    def validate_description_length(cls, v, values):
        # Only validate description if not automotive category or if description is provided
        if values.get('category') != 'automotive' and (not v or len(v.strip()) < 30):
            raise ValueError('Description must be at least 30 characters long')
        return v.strip() if v else v
    
    @validator('licensePlate')
    def validate_license_plate(cls, v, values):
        # Validate license plate for automotive category
        if values.get('category') == 'automotive':
            if not v:
                raise ValueError('License plate is required for automotive category')
            if not (2 <= len(v) <= 8):
                raise ValueError('License plate must be 2-8 characters long')
            import re
            if not re.match(r'^[A-Z0-9]+$', v):
                raise ValueError('License plate must contain only letters and numbers')
        return v

class DraftJobRequestUpdate(BaseModel):
    """Schema for updating a draft job request (public)"""
    title: Optional[str] = None
    description: Optional[str] = None
    postcode: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    contactPreference: Optional[str] = None
    licensePlate: Optional[str] = None  # For automotive updates
    plateCountry: Optional[str] = None  # For automotive updates
    
    @validator('title')
    def validate_title_length(cls, v):
        if v is not None and len(v.strip()) < 10:
            raise ValueError('Title must be at least 10 characters long')
        return v.strip() if v else v
    
    @validator('description')
    def validate_description_length(cls, v):
        if v is not None and len(v.strip()) < 30:
            raise ValueError('Description must be at least 30 characters long')
        return v.strip() if v else v
    
    @validator('licensePlate')
    def validate_license_plate(cls, v):
        if v is not None:
            if not (2 <= len(v) <= 8):
                raise ValueError('License plate must be 2-8 characters long')
            import re
            if not re.match(r'^[A-Z0-9]+$', v):
                raise ValueError('License plate must contain only letters and numbers')
        return v

class DraftJobResponse(BaseModel):
    """Response schema for draft job requests"""
    id: str
    category: str
    title: str
    description: str
    postcode: str
    status: str
    created_at: datetime

def get_or_create_guest_id(request: Request, response: Response) -> str:
    """Get existing guest ID from cookie or create new one"""
    guest_id = request.cookies.get('bc_guest_id')
    
    if not guest_id:
        guest_id = str(uuid.uuid4())
        # Set HttpOnly cookie for 180 days
        response.set_cookie(
            key='bc_guest_id',
            value=guest_id,
            max_age=180 * 24 * 60 * 60,  # 180 days in seconds
            httponly=True,
            secure=True,
            samesite='lax'
        )
    
    return guest_id

def check_rate_limit(guest_id: str, limit: int = 10, window_hours: int = 1) -> bool:
    """Simple rate limiting per guest ID"""
    now = time.time()
    window_start = now - (window_hours * 3600)
    
    if guest_id not in rate_limit_storage:
        rate_limit_storage[guest_id] = []
    
    # Remove old entries
    rate_limit_storage[guest_id] = [
        timestamp for timestamp in rate_limit_storage[guest_id] 
        if timestamp > window_start
    ]
    
    # Check if limit exceeded
    if len(rate_limit_storage[guest_id]) >= limit:
        return False
    
    # Add current request
    rate_limit_storage[guest_id].append(now)
    return True

@router.post("/draft", response_model=DraftJobResponse)
async def create_draft_job_request(
    job_data: DraftJobRequestCreate,
    request: Request,
    response: Response,
    current_user: Optional[User] = Depends(current_active_user_optional)
):
    """Create a draft job request (public endpoint)"""
    try:
        # Get or create guest ID for unauthenticated users
        guest_id = None if current_user else get_or_create_guest_id(request, response)
        
        # Rate limiting for guests
        if not current_user and not check_rate_limit(guest_id):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many job posts. Please try again later."
            )
        
        # Create draft job request
        job_request_data = {
            "id": str(uuid.uuid4()),
            "customer_id": current_user.id if current_user else None,
            "guest_id": guest_id,
            "category": job_data.category,
            "title": job_data.title,
            "description": job_data.description,
            "postcode": job_data.postcode,
            "status": JobStatus.DRAFT,
            "posted_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "priority": JobPriority.MEDIUM,
            "budget_currency": "ISK",
            "photos": [],
            "documents": [],
            "quotes_count": 0,
            "max_quotes": 10,
            "views_count": 0,
            "is_featured": False
        }
        
        # Save to database
        success = await db_service.create_document("job_requests", job_request_data)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create draft job request"
            )
        
        return DraftJobResponse(
            id=job_request_data["id"],
            category=job_request_data["category"],
            title=job_request_data["title"],
            description=job_request_data["description"],
            postcode=job_request_data["postcode"],
            status=job_request_data["status"],
            created_at=job_request_data["posted_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create draft job request: {str(e)}"
        )

@router.patch("/{draft_id}")
async def update_draft_job_request(
    draft_id: str,
    update_data: DraftJobRequestUpdate,
    request: Request,
    current_user: Optional[User] = Depends(current_active_user_optional)
):
    """Update a draft job request (public endpoint)"""
    try:
        # Get draft job request
        draft_job = await db_service.get_document("job_requests", draft_id)
        if not draft_job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Draft job request not found"
            )
        
        # Check authorization
        guest_id = request.cookies.get('bc_guest_id')
        if current_user:
            # Authenticated user - check ownership
            if draft_job.get("customer_id") != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You can only update your own job requests"
                )
        else:
            # Guest user - check guest ID
            if not guest_id or draft_job.get("guest_id") != guest_id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You can only update your own job requests"
                )
        
        # Only allow updates to draft status
        if draft_job.get("status") != JobStatus.DRAFT:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Can only update draft job requests"
            )
        
        # Prepare update data
        update_dict = update_data.dict(exclude_unset=True)
        update_dict["updated_at"] = datetime.utcnow()
        
        # Update in database
        success = await db_service.update_document("job_requests", draft_id, update_dict)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update draft job request"
            )
        
        return {"message": "Draft job request updated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update draft job request: {str(e)}"
        )

@router.post("/{draft_id}/submit")
async def submit_draft_job_request(
    draft_id: str,
    request: Request,
    current_user: Optional[User] = Depends(current_active_user_optional)
):
    """Submit a draft job request to make it public (public endpoint)"""
    try:
        # Get draft job request
        draft_job = await db_service.get_document("job_requests", draft_id)
        if not draft_job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Draft job request not found"
            )
        
        # Check authorization
        guest_id = request.cookies.get('bc_guest_id')
        if current_user:
            # Authenticated user - check ownership
            if draft_job.get("customer_id") != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You can only submit your own job requests"
                )
        else:
            # Guest user - check guest ID
            if not guest_id or draft_job.get("guest_id") != guest_id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You can only submit your own job requests"
                )
        
        # Only allow submission of draft status
        if draft_job.get("status") != JobStatus.DRAFT:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Can only submit draft job requests"
            )
        
        # Validate required fields for submission
        required_fields = ['title', 'description', 'postcode']
        for field in required_fields:
            if not draft_job.get(field):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Missing required field: {field}"
                )
        
        # Update status to open
        update_data = {
            "status": JobStatus.OPEN,
            "updated_at": datetime.utcnow()
        }
        
        success = await db_service.update_document("job_requests", draft_id, update_data)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to submit job request"
            )
        
        return {
            "message": "Job request submitted successfully",
            "job_id": draft_id,
            "status": "open"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit job request: {str(e)}"
        )