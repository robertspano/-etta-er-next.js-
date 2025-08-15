from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from services.database import db_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/testimonials", tags=["testimonials"])

# Mock testimonials data for demo (will be replaced with real reviews from database)
MOCK_TESTIMONIALS = [
    {
        "id": 1,
        "clientName": "Sigríður Jónsdóttir",
        "role": "Homeowner",
        "rating": 5,
        "text": "Excellent service! Found a reliable plumber within hours and the work was completed perfectly. Highly recommend this platform.",
        "avatar": "https://images.unsplash.com/photo-1494790108755-2616b64e5d6a?w=150&h=150&fit=crop&crop=face",
        "projectType": "Plumbing",
        "completedDate": "2024-01-20"
    },
    {
        "id": 2,
        "clientName": "Gunnar Þórsson",
        "role": "Business Owner",
        "rating": 5,
        "text": "Used this service for electrical work at my office. Professional, punctual, and fair pricing. Will definitely use again.",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "projectType": "Electrical",
        "completedDate": "2024-01-25"
    },
    {
        "id": 3,
        "clientName": "Anna Kristinsdóttir",
        "role": "Homeowner",
        "rating": 5,
        "text": "Amazing experience with our kitchen renovation. The contractor was skilled, clean, and finished on time. Thank you!",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "projectType": "Carpentry",
        "completedDate": "2024-02-28"
    },
    {
        "id": 4,
        "clientName": "Þórður Sigurðsson",
        "role": "Property Manager",
        "rating": 5,
        "text": "Fantastic platform for finding qualified professionals. The roofing job was done excellently and on budget.",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        "projectType": "Roofing",
        "completedDate": "2024-02-15"
    },
    {
        "id": 5,
        "clientName": "Elísabet Magnúsdóttir",
        "role": "Homeowner",
        "rating": 5,
        "text": "Our heating system installation went smoothly thanks to this service. Great communication and professional work.",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        "projectType": "Heating",
        "completedDate": "2024-03-05"
    },
    {
        "id": 6,
        "clientName": "Kristján Einarsson",
        "role": "Business Owner",
        "rating": 4,
        "text": "Good experience overall. The painting job was completed professionally and the price was fair. Recommended!",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        "projectType": "Painting",
        "completedDate": "2024-02-20"
    }
]

@router.get("/", response_model=List[Dict[str, Any]])
async def get_testimonials(limit: int = 6):
    """Get testimonials/reviews for homepage"""
    try:
        # Try to get real reviews from database
        reviews = await db_service.get_documents("reviews", {"isVerified": True}, limit)
        
        # If no real reviews, return mock data for demo
        if not reviews:
            return MOCK_TESTIMONIALS[:limit]
        
        # Transform reviews to testimonial format
        testimonials = []
        for review in reviews:
            # Get client info (would need to join with users collection in real implementation)
            testimonial = {
                "id": review["id"],
                "clientName": "Anonymous Client",  # Would fetch from users collection
                "role": "Customer",
                "rating": review["rating"],
                "text": review["description"],
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                "projectType": "Service",  # Would fetch from projects collection
                "completedDate": review["createdAt"].strftime("%Y-%m-%d")
            }
            testimonials.append(testimonial)
        
        return testimonials
        
    except Exception as e:
        logger.error(f"Error getting testimonials: {e}")
        # Return mock data as fallback
        return MOCK_TESTIMONIALS[:limit]

@router.get("/featured", response_model=List[Dict[str, Any]])
async def get_featured_testimonials():
    """Get featured testimonials for homepage (top 3)"""
    try:
        testimonials = await get_testimonials(limit=3)
        return testimonials
        
    except Exception as e:
        logger.error(f"Error getting featured testimonials: {e}")
        return MOCK_TESTIMONIALS[:3]