from fastapi import APIRouter, HTTPException, status, Request
from services.vehicle_lookup import vehicle_lookup_provider
import re

router = APIRouter(prefix="/public", tags=["public"])

@router.get("/vehicle-lookup")
async def lookup_vehicle(
    plate: str,
    country: str = "IS",
    request: Request = None
):
    """
    Look up vehicle information by license plate (Iceland only)
    
    This endpoint provides basic vehicle information for automotive job requests.
    Rate limited to 10 requests per minute per IP.
    """
    try:
        # Get client IP for rate limiting
        client_ip = request.client.host if request else "unknown"
        
        # Check rate limit
        if not vehicle_lookup_provider.check_rate_limit(client_ip):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Maximum 10 lookups per minute."
            )
        
        # Validate inputs
        if not plate:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="License plate is required"
            )
        
        # Clean and validate plate format
        cleaned_plate = re.sub(r'[^A-Z0-9]', '', plate.upper())
        if not re.match(r'^[A-Z0-9]{2,8}$', cleaned_plate):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid license plate format"
            )
        
        if country != "IS":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only Iceland (IS) is currently supported"
            )
        
        # Perform lookup
        result = await vehicle_lookup_provider.lookup_vehicle(cleaned_plate, country)
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Vehicle lookup failed: {str(e)}"
        )