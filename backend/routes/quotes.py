from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import List, Optional
from datetime import datetime
from models.quote import Quote, QuoteCreate, QuoteUpdate, QuoteResponse, QuoteStatus
from models.job_request import JobRequest, JobStatus as JobStatus
from models.user import User
from auth.config import current_active_user, get_current_professional, get_current_customer
from services.database import db_service

router = APIRouter(prefix="/quotes", tags=["quotes"])

@router.post("/", response_model=QuoteResponse)
async def create_quote(
    quote_data: QuoteCreate,
    current_user: User = Depends(get_current_professional)
):
    """Create a new quote (professionals only)"""
    try:
        # Get job request to validate and get customer_id
        job_request = await db_service.get_document("job_requests", quote_data.job_request_id)
        if not job_request:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job request not found"
            )
        
        # Check if job is still accepting quotes
        if job_request.get("status") not in ["open", "quoted"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This job is no longer accepting quotes"
            )
        
        # Check if professional already submitted a quote
        existing_quotes = await db_service.get_documents(
            "quotes", 
            {
                "job_request_id": quote_data.job_request_id,
                "professional_id": current_user.id,
                "status": {"$in": ["pending", "accepted"]}
            }
        )
        if existing_quotes:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You have already submitted a quote for this job"
            )
        
        # Check if maximum quotes reached
        max_quotes = job_request.get("max_quotes", 10)
        current_quotes_count = job_request.get("quotes_count", 0)
        if current_quotes_count >= max_quotes:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Maximum number of quotes reached for this job"
            )
        
        # Create quote
        quote = Quote(
            professional_id=current_user.id,
            customer_id=job_request["customer_id"],
            **quote_data.dict()
        )
        
        await quote.save()
        
        # Update job request quote count and status
        update_data = {
            "quotes_count": current_quotes_count + 1,
            "updated_at": datetime.utcnow()
        }
        if job_request.get("status") == "open":
            update_data["status"] = "quoted"
        
        await db_service.update_document("job_requests", quote_data.job_request_id, update_data)
        
        # TODO: Send notification to customer
        
        # Add professional info to response
        quote_response = QuoteResponse(**quote.dict())
        quote_response.professional_name = f"{current_user.profile.first_name} {current_user.profile.last_name}"
        quote_response.professional_company = current_user.profile.company_name
        # TODO: Calculate and add professional_rating
        
        return quote_response
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create quote: {str(e)}"
        )

@router.get("/", response_model=List[QuoteResponse])
async def get_quotes(
    job_request_id: Optional[str] = Query(None, description="Filter by job request"),
    professional_id: Optional[str] = Query(None, description="Filter by professional"),
    customer_id: Optional[str] = Query(None, description="Filter by customer"),
    status: Optional[QuoteStatus] = Query(None, description="Filter by status"),
    my_quotes: bool = Query(False, description="Get only current user's quotes"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    current_user: User = Depends(current_active_user)
):
    """Get quotes with filtering and pagination"""
    try:
        # Build query filter
        query_filter = {}
        
        if job_request_id:
            query_filter["job_request_id"] = job_request_id
        if professional_id:
            query_filter["professional_id"] = professional_id
        if customer_id:
            query_filter["customer_id"] = customer_id
        if status:
            query_filter["status"] = status
            
        # Handle my_quotes filter based on user role
        if my_quotes:
            if current_user.role == "professional":
                query_filter["professional_id"] = current_user.id
            elif current_user.role == "customer":
                query_filter["customer_id"] = current_user.id
            elif current_user.role != "admin":
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Access denied"
                )
        
        # Calculate skip for pagination
        skip = (page - 1) * limit
        
        # Execute query
        quotes = await db_service.get_documents(
            "quotes", 
            filter_dict=query_filter,
            limit=limit,
            skip=skip
        )
        
        # Enhance quotes with professional information
        enhanced_quotes = []
        for quote in quotes:
            professional = await db_service.get_document("users", quote["professional_id"])
            
            quote_response = QuoteResponse(**quote)
            if professional:
                quote_response.professional_name = f"{professional['profile']['first_name']} {professional['profile']['last_name']}"
                quote_response.professional_company = professional['profile'].get('company_name')
                # TODO: Calculate rating
                quote_response.professional_rating = 4.5  # Placeholder
            
            enhanced_quotes.append(quote_response)
        
        return enhanced_quotes
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch quotes: {str(e)}"
        )

@router.get("/{quote_id}", response_model=QuoteResponse)
async def get_quote(
    quote_id: str,
    current_user: User = Depends(current_active_user)
):
    """Get a specific quote by ID"""
    try:
        quote = await db_service.get_document("quotes", quote_id)
        if not quote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote not found"
            )
        
        # Check permissions (customer, professional, or admin)
        if (current_user.id not in [quote["professional_id"], quote["customer_id"]] 
            and current_user.role != "admin"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to view this quote"
            )
        
        # Enhance with professional information
        professional = await db_service.get_document("users", quote["professional_id"])
        
        quote_response = QuoteResponse(**quote)
        if professional:
            quote_response.professional_name = f"{professional['profile']['first_name']} {professional['profile']['last_name']}"
            quote_response.professional_company = professional['profile'].get('company_name')
            quote_response.professional_rating = 4.5  # Placeholder
        
        return quote_response
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch quote: {str(e)}"
        )

@router.put("/{quote_id}", response_model=QuoteResponse)
async def update_quote(
    quote_id: str,
    quote_data: QuoteUpdate,
    current_user: User = Depends(get_current_professional)
):
    """Update a quote (professional owner only)"""
    try:
        quote = await db_service.get_document("quotes", quote_id)
        if not quote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote not found"
            )
        
        # Check ownership
        if quote["professional_id"] != current_user.id and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only update your own quotes"
            )
        
        # Check if quote can be updated
        if quote.get("status") not in ["pending"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot update quote that is not pending"
            )
        
        # Update quote
        update_data = quote_data.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        success = await db_service.update_document("quotes", quote_id, update_data)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update quote"
            )
        
        # Get updated quote
        updated_quote = await db_service.get_document("quotes", quote_id)
        return QuoteResponse(**updated_quote)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update quote: {str(e)}"
        )

@router.post("/{quote_id}/accept")
async def accept_quote(
    quote_id: str,
    current_user: User = Depends(get_current_customer)
):
    """Accept a quote (customer only)"""
    try:
        quote = await db_service.get_document("quotes", quote_id)
        if not quote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote not found"
            )
        
        # Check ownership
        if quote["customer_id"] != current_user.id and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only accept quotes for your own jobs"
            )
        
        # Check quote status
        if quote.get("status") != "pending":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Can only accept pending quotes"
            )
        
        # Check if quote has expired
        if datetime.utcnow() > quote["expires_at"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Quote has expired"
            )
        
        # Accept this quote
        await db_service.update_document("quotes", quote_id, {
            "status": "accepted",
            "accepted_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        })
        
        # Decline all other pending quotes for the same job
        other_quotes = await db_service.get_documents("quotes", {
            "job_request_id": quote["job_request_id"],
            "status": "pending"
        })
        
        for other_quote in other_quotes:
            if other_quote["id"] != quote_id:
                await db_service.update_document("quotes", other_quote["id"], {
                    "status": "declined",
                    "declined_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                })
        
        # Update job request
        await db_service.update_document("job_requests", quote["job_request_id"], {
            "status": "accepted",
            "accepted_quote_id": quote_id,
            "assigned_professional_id": quote["professional_id"],
            "updated_at": datetime.utcnow()
        })
        
        # TODO: Send notifications to professional and other bidders
        
        return {"message": "Quote accepted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to accept quote: {str(e)}"
        )

@router.post("/{quote_id}/decline")
async def decline_quote(
    quote_id: str,
    current_user: User = Depends(get_current_customer)
):
    """Decline a quote (customer only)"""
    try:
        quote = await db_service.get_document("quotes", quote_id)
        if not quote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote not found"
            )
        
        # Check ownership
        if quote["customer_id"] != current_user.id and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only decline quotes for your own jobs"
            )
        
        # Check quote status
        if quote.get("status") != "pending":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Can only decline pending quotes"
            )
        
        # Decline quote
        await db_service.update_document("quotes", quote_id, {
            "status": "declined",
            "declined_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        })
        
        # TODO: Send notification to professional
        
        return {"message": "Quote declined successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to decline quote: {str(e)}"
        )

@router.post("/{quote_id}/withdraw")
async def withdraw_quote(
    quote_id: str,
    current_user: User = Depends(get_current_professional)
):
    """Withdraw a quote (professional only)"""
    try:
        quote = await db_service.get_document("quotes", quote_id)
        if not quote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote not found"
            )
        
        # Check ownership
        if quote["professional_id"] != current_user.id and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only withdraw your own quotes"
            )
        
        # Check quote status
        if quote.get("status") not in ["pending"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Can only withdraw pending quotes"
            )
        
        # Withdraw quote
        await db_service.update_document("quotes", quote_id, {
            "status": "withdrawn",
            "withdrawn_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        })
        
        # Update job request quote count
        job_request = await db_service.get_document("job_requests", quote["job_request_id"])
        if job_request:
            new_count = max(0, job_request.get("quotes_count", 1) - 1)
            await db_service.update_document("job_requests", quote["job_request_id"], {
                "quotes_count": new_count,
                "updated_at": datetime.utcnow()
            })
        
        # TODO: Send notification to customer
        
        return {"message": "Quote withdrawn successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to withdraw quote: {str(e)}"
        )