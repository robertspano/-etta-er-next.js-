from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from services.database import db_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("/", response_model=Dict[str, Any])
async def get_platform_stats():
    """Get platform statistics for homepage"""
    try:
        # Get real stats from database
        db_stats = await db_service.get_platform_stats()
        
        # If database is empty, return mock stats for demo
        if db_stats['totalProjects'] == 0:
            return {
                "totalProjects": 50000,
                "verifiedProfessionals": 15000,
                "customerSatisfaction": 4.8,
                "completionRate": 98,
                "totalUsers": 65000,
                "completedProjects": 49000,
                "averageRating": 4.8,
                "activeProjects": 1000
            }
        
        # Calculate additional stats
        completion_rate = round((db_stats['completedProjects'] / db_stats['totalProjects']) * 100, 1) if db_stats['totalProjects'] > 0 else 0
        
        return {
            "totalProjects": db_stats['totalProjects'],
            "verifiedProfessionals": db_stats['verifiedProfessionals'],
            "customerSatisfaction": db_stats['averageRating'],
            "completionRate": completion_rate,
            "totalUsers": db_stats['totalUsers'],
            "completedProjects": db_stats['completedProjects'],
            "averageRating": db_stats['averageRating'],
            "activeProjects": db_stats['totalProjects'] - db_stats['completedProjects']
        }
        
    except Exception as e:
        logger.error(f"Error getting platform stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to get platform statistics")