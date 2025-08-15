from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from models.project import Project, ProjectCreate, ProjectResponse, ProjectStatus, ServiceType
from services.database import db_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("/", response_model=dict)
async def create_project(project_data: ProjectCreate):
    """Create a new project"""
    try:
        # For now, we'll use a mock client ID since we don't have auth yet
        project = Project(
            clientId="mock_client_id",
            **project_data.dict()
        )
        
        project_dict = project.dict()
        await db_service.create_document("projects", project_dict)
        
        logger.info(f"Created project: {project.id}")
        
        return {
            "success": True,
            "message": "Project submitted successfully!",
            "projectId": project.id,
            "estimatedQuotes": "3-5",
            "expectedResponseTime": "2-4 hours"
        }
        
    except Exception as e:
        logger.error(f"Error creating project: {e}")
        raise HTTPException(status_code=500, detail="Failed to create project")

@router.get("/", response_model=List[ProjectResponse])
async def get_projects(
    service_type: Optional[ServiceType] = None,
    location: Optional[str] = None,
    status: Optional[ProjectStatus] = None,
    limit: int = 20,
    skip: int = 0
):
    """Get projects with optional filtering"""
    try:
        filter_dict = {}
        if service_type:
            filter_dict["serviceType"] = service_type
        if location:
            filter_dict["location"] = {"$regex": location, "$options": "i"}
        if status:
            filter_dict["status"] = status
            
        projects = await db_service.get_documents("projects", filter_dict, limit, skip)
        return [ProjectResponse(**project) for project in projects]
        
    except Exception as e:
        logger.error(f"Error getting projects: {e}")
        raise HTTPException(status_code=500, detail="Failed to get projects")

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str):
    """Get specific project by ID"""
    try:
        project = await db_service.get_document("projects", project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return ProjectResponse(**project)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting project {project_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to get project")

@router.put("/{project_id}/status")
async def update_project_status(project_id: str, status: ProjectStatus):
    """Update project status"""
    try:
        updated = await db_service.update_document("projects", project_id, {"status": status})
        if not updated:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return {"success": True, "message": "Project status updated"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating project status: {e}")
        raise HTTPException(status_code=500, detail="Failed to update project status")