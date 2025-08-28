from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from services.database import db_service
import logging
import uuid

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/automotive", tags=["automotive"])

class AutomotiveJobCreate(BaseModel):
    license_plate: str = Field(..., description="Vehicle license plate number")
    vehicle_type: Optional[str] = Field(None, description="Type of vehicle")
    location: Optional[str] = Field(None, description="Service location")
    phone: Optional[str] = Field(None, description="Contact phone number")
    email: Optional[str] = Field(None, description="Contact email")

class AutomotiveJobResponse(BaseModel):
    success: bool
    message: str
    job_id: str
    next_step: str

@router.post("/create-job", response_model=AutomotiveJobResponse)
async def create_automotive_job(job_data: AutomotiveJobCreate):
    """Create a new automotive job with license plate"""
    try:
        # Generate unique job ID
        job_id = str(uuid.uuid4())
        
        # Create automotive job document
        job_document = {
            "id": job_id,
            "type": "automotive",
            "license_plate": job_data.license_plate,
            "vehicle_type": job_data.vehicle_type,
            "location": job_data.location,
            "phone": job_data.phone,
            "email": job_data.email,
            "step": 1,  # Current step in the process
            "status": "created",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        # Save to database
        await db_service.create_document("automotive_jobs", job_document)
        
        logger.info(f"Created automotive job with license plate: {job_data.license_plate}")
        
        return AutomotiveJobResponse(
            success=True,
            message="License plate registered successfully",
            job_id=job_id,
            next_step="step_2"
        )
        
    except Exception as e:
        logger.error(f"Error creating automotive job: {e}")
        raise HTTPException(status_code=500, detail="Failed to create automotive job")

@router.get("/job/{job_id}")
async def get_automotive_job(job_id: str):
    """Get automotive job by ID"""
    try:
        job = await db_service.get_document("automotive_jobs", job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Automotive job not found")
        
        return {
            "success": True,
            "job": job
        }
        
    except HTTPException:
        # Re-raise HTTP exceptions (like 404) without modification
        raise
    except Exception as e:
        logger.error(f"Error getting automotive job: {e}")
        raise HTTPException(status_code=500, detail="Failed to get automotive job")

@router.put("/job/{job_id}")
async def update_automotive_job(job_id: str, updates: dict):
    """Update automotive job"""
    try:
        updates["updated_at"] = datetime.utcnow()
        
        result = await db_service.update_document("automotive_jobs", {"id": job_id}, updates)
        
        return {
            "success": True,
            "message": "Job updated successfully"
        }
        
    except Exception as e:
        logger.error(f"Error updating automotive job: {e}")
        raise HTTPException(status_code=500, detail="Failed to update automotive job")