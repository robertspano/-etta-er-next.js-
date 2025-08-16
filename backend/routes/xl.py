from fastapi import APIRouter, HTTPException
from models.xl_lead import XLLead, XLLeadCreate
from typing import Dict
import logging

router = APIRouter(prefix="/api/xl", tags=["XL"])
logger = logging.getLogger(__name__)

@router.post("/leads")
async def create_xl_lead(lead_data: XLLeadCreate) -> Dict[str, str]:
    """
    Create a new XL lead for major projects
    """
    try:
        # Create XL lead document
        xl_lead = XLLead(**lead_data.dict())
        await xl_lead.insert()
        
        logger.info(f"XL Lead created: {xl_lead.id} - {xl_lead.category} - {xl_lead.name}")
        
        return {
            "message": "XL lead created successfully",
            "id": xl_lead.id
        }
        
    except Exception as e:
        logger.error(f"Error creating XL lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create XL lead")