from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from ..services.database import db_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/services", tags=["services"])

# Static service data with translations
SERVICES_DATA = {
    "en": [
        {
            "id": "plumbing",
            "name": "Plumbing",
            "description": "Complete plumbing solutions from repairs to installations by licensed professionals.",
            "icon": "Droplets",
            "color": "text-blue-600 bg-blue-50",
            "averagePrice": "$150-300",
            "professionals": 2500,
            "completedJobs": 12000
        },
        {
            "id": "electrical",
            "name": "Electrical",
            "description": "Safe and reliable electrical work by certified electricians for homes and businesses.",
            "icon": "Zap",
            "color": "text-yellow-600 bg-yellow-50",
            "averagePrice": "$200-500",
            "professionals": 1800,
            "completedJobs": 9500
        },
        {
            "id": "carpentry",
            "name": "Carpentry",
            "description": "Custom woodwork, furniture, and structural carpentry by skilled craftsmen.",
            "icon": "Hammer",
            "color": "text-amber-600 bg-amber-50",
            "averagePrice": "$300-800",
            "professionals": 2200,
            "completedJobs": 8200
        },
        {
            "id": "painting",
            "name": "Painting",
            "description": "Professional interior and exterior painting services with quality materials.",
            "icon": "Paintbrush",
            "color": "text-purple-600 bg-purple-50",
            "averagePrice": "$200-600",
            "professionals": 1900,
            "completedJobs": 7800
        },
        {
            "id": "roofing",
            "name": "Roofing",
            "description": "Roof repairs, installations, and maintenance by experienced roofing specialists.",
            "icon": "Home",
            "color": "text-red-600 bg-red-50",
            "averagePrice": "$500-2000",
            "professionals": 1200,
            "completedJobs": 4500
        },
        {
            "id": "heating",
            "name": "Heating & Cooling",
            "description": "HVAC installation, repair, and maintenance for optimal comfort year-round.",
            "icon": "Thermometer",
            "color": "text-orange-600 bg-orange-50",
            "averagePrice": "$400-1500",
            "professionals": 1400,
            "completedJobs": 5200
        },
        {
            "id": "renovation",
            "name": "Home Renovation",
            "description": "Complete home renovation services from planning to completion.",
            "icon": "Settings",
            "color": "text-green-600 bg-green-50",
            "averagePrice": "$2000-50000",
            "professionals": 800,
            "completedJobs": 2100
        },
        {
            "id": "landscaping",
            "name": "Landscaping",
            "description": "Garden design, lawn care, and outdoor space transformation services.",
            "icon": "TreePine",
            "color": "text-emerald-600 bg-emerald-50",
            "averagePrice": "$300-3000",
            "professionals": 1600,
            "completedJobs": 3800
        },
        {
            "id": "construction",
            "name": "Construction",
            "description": "New construction and major building projects by licensed contractors.",
            "icon": "Building",
            "color": "text-gray-600 bg-gray-50",
            "averagePrice": "$10000-500000",
            "professionals": 900,
            "completedJobs": 1200
        }
    ],
    "is": [
        {
            "id": "plumbing",
            "name": "Pípulagnir",
            "description": "Heildar pípulagnaþjónusta frá viðgerðum til uppsetninga af löggiltum sérfræðingum.",
            "icon": "Droplets",
            "color": "text-blue-600 bg-blue-50",
            "averagePrice": "20.000-40.000 kr",
            "professionals": 2500,
            "completedJobs": 12000
        },
        {
            "id": "electrical",
            "name": "Rafvirkjun",
            "description": "Örugg og áreiðanleg rafvirkjun af löggiltum rafvirkjum fyrir heimili og fyrirtæki.",
            "icon": "Zap",
            "color": "text-yellow-600 bg-yellow-50",
            "averagePrice": "25.000-65.000 kr",
            "professionals": 1800,
            "completedJobs": 9500
        },
        {
            "id": "carpentry",
            "name": "Smíðir",
            "description": "Sérsniðnar viðarvörur, húsgögn og burðarvirki af kunnáttumiklum smíðamönnum.",
            "icon": "Hammer",
            "color": "text-amber-600 bg-amber-50",
            "averagePrice": "40.000-100.000 kr",
            "professionals": 2200,
            "completedJobs": 8200
        },
        {
            "id": "painting",
            "name": "Málun",
            "description": "Fagleg innri og ytri málningarþjónusta með gæða efnivið.",
            "icon": "Paintbrush",
            "color": "text-purple-600 bg-purple-50",
            "averagePrice": "25.000-80.000 kr",
            "professionals": 1900,
            "completedJobs": 7800
        },
        {
            "id": "roofing",
            "name": "Þaksmíðir",
            "description": "Þakviðgerðir, uppsetningar og viðhald af reyndum þaksérfræðingum.",
            "icon": "Home",
            "color": "text-red-600 bg-red-50",
            "averagePrice": "65.000-250.000 kr",
            "professionals": 1200,
            "completedJobs": 4500
        },
        {
            "id": "heating",
            "name": "Hitun og Kæling",
            "description": "HVAC uppsetning, viðgerðir og viðhald fyrir bestu þægindi allt árið.",
            "icon": "Thermometer",
            "color": "text-orange-600 bg-orange-50",
            "averagePrice": "50.000-190.000 kr",
            "professionals": 1400,
            "completedJobs": 5200
        },
        {
            "id": "renovation",
            "name": "Heimaendurnýjun",
            "description": "Heildar heimaendurnýjunarþjónusta frá skipulagningu til frágangs.",
            "icon": "Settings",
            "color": "text-green-600 bg-green-50",
            "averagePrice": "250.000-6.500.000 kr",
            "professionals": 800,
            "completedJobs": 2100
        },
        {
            "id": "landscaping",
            "name": "Landmótun",
            "description": "Garðhönnun, grasflötuviðhald og þjónusta fyrir útirými.",
            "icon": "TreePine",
            "color": "text-emerald-600 bg-emerald-50",
            "averagePrice": "40.000-400.000 kr",
            "professionals": 1600,
            "completedJobs": 3800
        },
        {
            "id": "construction",
            "name": "Byggingar",
            "description": "Nýbyggingar og stór byggingarverkefni af löggiltum verktökum.",
            "icon": "Building",
            "color": "text-gray-600 bg-gray-50",
            "averagePrice": "1.300.000-65.000.000 kr",
            "professionals": 900,
            "completedJobs": 1200
        }
    ]
}

@router.get("/", response_model=List[Dict[str, Any]])
async def get_services(language: str = "en"):
    """Get all services with localization"""
    try:
        if language not in SERVICES_DATA:
            language = "en"
        
        return SERVICES_DATA[language]
        
    except Exception as e:
        logger.error(f"Error getting services: {e}")
        raise HTTPException(status_code=500, detail="Failed to get services")

@router.get("/{service_id}", response_model=Dict[str, Any])
async def get_service(service_id: str, language: str = "en"):
    """Get specific service by ID"""
    try:
        if language not in SERVICES_DATA:
            language = "en"
        
        services = SERVICES_DATA[language]
        service = next((s for s in services if s["id"] == service_id), None)
        
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        
        return service
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting service {service_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to get service")