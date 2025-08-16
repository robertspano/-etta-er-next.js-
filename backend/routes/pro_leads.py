from fastapi import APIRouter, HTTPException
from models.pro_lead import ProLead, ProLeadCreate

router = APIRouter()

@router.post("/public/pro/leads")
async def create_pro_lead(lead_data: ProLeadCreate):
    """Create a new professional lead"""
    try:
        # Check if email already exists
        existing_lead = await ProLead.find_one(ProLead.email == lead_data.email)
        if existing_lead:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new pro lead
        pro_lead = ProLead(
            company_name=lead_data.company_name,
            email=lead_data.email
        )
        
        await pro_lead.insert()
        
        return {
            "id": pro_lead.id,
            "company_name": pro_lead.company_name,
            "email": pro_lead.email,
            "created_at": pro_lead.created_at
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create professional lead: {str(e)}")

@router.get("/public/pro/leads/{lead_id}")
async def get_pro_lead(lead_id: str):
    """Get a professional lead by ID"""
    try:
        pro_lead = await ProLead.find_one(ProLead.id == lead_id)
        if not pro_lead:
            raise HTTPException(status_code=404, detail="Professional lead not found")
        
        return {
            "id": pro_lead.id,
            "company_name": pro_lead.company_name,
            "email": pro_lead.email,
            "created_at": pro_lead.created_at
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get professional lead: {str(e)}")