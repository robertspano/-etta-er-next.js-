from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from datetime import datetime
import uuid

from auth.config import current_active_user
from models.user import User, UserRole
from models.review import Review, ReviewCreate, ReviewResponse, ReviewListResponse, ReviewStatus
from models.job_request import JobRequest
from models.quote import Quote

router = APIRouter(prefix="/reviews", tags=["reviews"])

@router.get("/", response_model=List[ReviewListResponse])
async def get_reviews_for_homepage(
    limit: int = Query(12, ge=1, le=50, description="Number of reviews to return"),
    locale: str = Query("en", description="Language locale for responses")
):
    """Get approved reviews for homepage display"""
    try:
        # Get approved reviews with proper aggregation
        reviews = await Review.find(
            Review.status == ReviewStatus.APPROVED
        ).sort(-Review.created_at).limit(limit).to_list()
        
        # Convert to frontend format
        result = []
        for review in reviews:
            # Get professional info
            try:
                professional = await User.find_one(User.id == review.professional_id)
                if not professional:
                    continue
                    
                # Get customer info  
                customer = await User.find_one(User.id == review.customer_id)
                if not customer:
                    continue
                
                # Create response
                review_response = ReviewListResponse(
                    id=review.id,
                    company={
                        "id": professional.id,
                        "name": professional.profile.company_name or f"{professional.profile.first_name} {professional.profile.last_name}",
                        "logoUrl": professional.profile.avatar or ""
                    },
                    rating=review.rating,
                    excerpt=review.content[:150] + ("..." if len(review.content) > 150 else ""),
                    reviewer={
                        "name": f"{customer.profile.first_name} {customer.profile.last_name}",
                        "initial": customer.profile.first_name[0] if customer.profile.first_name else "A",
                        "location": review.project_postcode
                    },
                    date=review.created_at.isoformat(),
                    url=f"/professional/{professional.id}/reviews/{review.id}"
                )
                result.append(review_response)
                
            except Exception as e:
                # Skip reviews with missing data
                continue
                
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch reviews: {str(e)}")

@router.get("/{review_id}", response_model=ReviewResponse)
async def get_review(review_id: str):
    """Get a specific review by ID"""
    review = await Review.find_one(Review.id == review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    # Get related user info
    professional = await User.find_one(User.id == review.professional_id)
    customer = await User.find_one(User.id == review.customer_id)
    
    return ReviewResponse(
        id=review.id,
        job_request_id=review.job_request_id,
        professional_id=review.professional_id,
        customer_id=review.customer_id,
        rating=review.rating,
        title=review.title,
        content=review.content,
        project_category=review.project_category,
        project_postcode=review.project_postcode,
        images=review.images,
        status=review.status,
        is_verified=review.is_verified,
        created_at=review.created_at,
        professional_name=f"{professional.profile.first_name} {professional.profile.last_name}" if professional else None,
        professional_company_name=professional.profile.company_name if professional else None,
        customer_name=f"{customer.profile.first_name} {customer.profile.last_name}" if customer else None,
        customer_location=customer.profile.location if customer else None
    )

@router.post("/", response_model=ReviewResponse)
async def create_review(
    review_data: ReviewCreate,
    current_user: User = Depends(current_active_user)
):
    """Create a new review (customer only)"""
    # Verify user is a customer
    if current_user.role != UserRole.CUSTOMER:
        raise HTTPException(status_code=403, detail="Only customers can create reviews")
    
    # Verify the job request exists and belongs to the user
    job_request = await JobRequest.find_one(JobRequest.id == review_data.job_request_id)
    if not job_request:
        raise HTTPException(status_code=404, detail="Job request not found")
    
    if job_request.customer_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only review your own completed jobs")
    
    # Verify job is completed
    if job_request.status.value != "completed":
        raise HTTPException(status_code=400, detail="Can only review completed jobs")
    
    # Check if review already exists for this job and professional
    existing_review = await Review.find_one(
        Review.job_request_id == review_data.job_request_id,
        Review.professional_id == review_data.professional_id,
        Review.customer_id == current_user.id
    )
    if existing_review:
        raise HTTPException(status_code=400, detail="Review already exists for this job")
    
    # Verify professional worked on this job
    quote = await Quote.find_one(
        Quote.job_request_id == review_data.job_request_id,
        Quote.professional_id == review_data.professional_id
    )
    if not quote:
        raise HTTPException(status_code=400, detail="Professional did not work on this job")
    
    # Create the review
    review = Review(
        job_request_id=review_data.job_request_id,
        professional_id=review_data.professional_id,
        customer_id=current_user.id,
        rating=review_data.rating,
        title=review_data.title,
        content=review_data.content,
        project_category=job_request.category,
        project_postcode=job_request.postcode,
        images=review_data.images,
        status=ReviewStatus.PENDING,  # Reviews need approval
        is_verified=True  # Verified because linked to completed job
    )
    
    await review.insert()
    
    # Return full review response
    professional = await User.find_one(User.id == review.professional_id)
    
    return ReviewResponse(
        id=review.id,
        job_request_id=review.job_request_id,
        professional_id=review.professional_id,
        customer_id=review.customer_id,
        rating=review.rating,
        title=review.title,
        content=review.content,
        project_category=review.project_category,
        project_postcode=review.project_postcode,
        images=review.images,
        status=review.status,
        is_verified=review.is_verified,
        created_at=review.created_at,
        professional_name=f"{professional.profile.first_name} {professional.profile.last_name}" if professional else None,
        professional_company_name=professional.profile.company_name if professional else None,
        customer_name=f"{current_user.profile.first_name} {current_user.profile.last_name}",
        customer_location=current_user.profile.location
    )

@router.get("/professional/{professional_id}", response_model=List[ReviewResponse])
async def get_professional_reviews(
    professional_id: str,
    limit: int = Query(50, ge=1, le=100),
    status: Optional[ReviewStatus] = None
):
    """Get all reviews for a specific professional"""
    # Build query conditions
    conditions = [Review.professional_id == professional_id]
    
    # Filter by status if provided
    if status:
        conditions.append(Review.status == status)
    else:
        # Default to approved reviews only for public access
        conditions.append(Review.status == ReviewStatus.APPROVED)
    
    # Combine conditions using And
    from beanie.operators import And
    query = And(*conditions)
    
    reviews = await Review.find(query).sort(-Review.created_at).limit(limit).to_list()
    
    result = []
    for review in reviews:
        # Get customer info
        customer = await User.find_one(User.id == review.customer_id)
        professional = await User.find_one(User.id == review.professional_id)
        
        result.append(ReviewResponse(
            id=review.id,
            job_request_id=review.job_request_id,
            professional_id=review.professional_id,
            customer_id=review.customer_id,
            rating=review.rating,
            title=review.title,
            content=review.content,
            project_category=review.project_category,
            project_postcode=review.project_postcode,
            images=review.images,
            status=review.status,
            is_verified=review.is_verified,
            created_at=review.created_at,
            professional_name=f"{professional.profile.first_name} {professional.profile.last_name}" if professional else None,
            professional_company_name=professional.profile.company_name if professional else None,
            customer_name=f"{customer.profile.first_name} {customer.profile.last_name}" if customer else None,
            customer_location=customer.profile.location if customer else None
        ))
    
    return result

# Admin routes for review moderation
@router.put("/{review_id}/moderate", response_model=ReviewResponse)
async def moderate_review(
    review_id: str,
    status: ReviewStatus,
    current_user: User = Depends(current_active_user)
):
    """Moderate a review (admin only)"""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    review = await Review.find_one(Review.id == review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    review.status = status
    review.moderated_at = datetime.utcnow()
    review.moderated_by = current_user.id
    review.updated_at = datetime.utcnow()
    
    await review.save()
    
    # Return updated review
    return await get_review(review_id)