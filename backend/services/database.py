from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import os
from typing import List, Optional, Dict, Any
import logging
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

class DatabaseService:
    def __init__(self):
        self.client = None
        self.db = None
    
    async def connect_to_database(self):
        """Create database connection and initialize Beanie"""
        try:
            mongo_url = os.environ.get('MONGO_URL')
            db_name = os.environ.get('DB_NAME', 'buildconnect')
            
            self.client = AsyncIOMotorClient(mongo_url)
            self.db = self.client[db_name]
            
            # Test connection
            await self.client.admin.command('ping')
            logger.info("Successfully connected to MongoDB")
            
            # Initialize Beanie with all models
            from models.user import User
            from models.job_request import JobRequest
            from models.quote import Quote
            from models.message import JobMessage
            from models.notification import Notification
            from models.review import Review
            from models.xl_lead import XLLead
            
            await init_beanie(database=self.db, document_models=[
                User, JobRequest, Quote, JobMessage, Notification, Review, XLLead
            ])
            logger.info("Initialized Beanie with all marketplace models")
            
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise
    
    async def close_database_connection(self):
        """Close database connection"""
        if self.client:
            self.client.close()
            logger.info("Closed MongoDB connection")
    
    # Generic CRUD operations
    async def create_document(self, collection: str, document: dict) -> str:
        """Create a new document"""
        result = await self.db[collection].insert_one(document)
        return str(result.inserted_id)
    
    async def get_document(self, collection: str, document_id: str) -> Optional[dict]:
        """Get document by ID"""
        # Try both _id and id fields for compatibility
        document = await self.db[collection].find_one({"_id": document_id})
        if not document:
            document = await self.db[collection].find_one({"id": document_id})
        if document:
            # Ensure we have an id field for API responses
            if '_id' in document and 'id' not in document:
                document['id'] = document['_id']
            document.pop('_id', None)
        return document
    
    async def get_documents(self, collection: str, filter_dict: dict = None, limit: int = 100, skip: int = 0) -> List[dict]:
        """Get multiple documents with optional filtering"""
        filter_dict = filter_dict or {}
        cursor = self.db[collection].find(filter_dict).skip(skip).limit(limit)
        documents = []
        async for document in cursor:
            # Ensure we have an id field for API responses
            if '_id' in document and 'id' not in document:
                document['id'] = document['_id']
            document.pop('_id', None)
            documents.append(document)
        return documents
    
    async def update_document(self, collection: str, document_id: str, update_dict: dict) -> bool:
        """Update document by ID"""
        # Try both _id and id fields for compatibility
        result = await self.db[collection].update_one(
            {"_id": document_id}, 
            {"$set": update_dict}
        )
        if result.modified_count == 0:
            result = await self.db[collection].update_one(
                {"id": document_id}, 
                {"$set": update_dict}
            )
        return result.modified_count > 0
    
    async def delete_document(self, collection: str, document_id: str) -> bool:
        """Delete document by ID"""
        # Try both _id and id fields for compatibility
        result = await self.db[collection].delete_one({"_id": document_id})
        if result.deleted_count == 0:
            result = await self.db[collection].delete_one({"id": document_id})
        return result.deleted_count > 0
    
    async def count_documents(self, collection: str, filter_dict: dict = None) -> int:
        """Count documents in collection"""
        filter_dict = filter_dict or {}
        return await self.db[collection].count_documents(filter_dict)
    
    # Specialized queries
    async def get_user_by_email(self, email: str) -> Optional[dict]:
        """Get user by email"""
        document = await self.db['users'].find_one({"email": email})
        if document:
            document.pop('_id', None)
        return document
    
    async def get_professional_by_user_id(self, user_id: str) -> Optional[dict]:
        """Get professional profile by user ID"""
        document = await self.db['professionals'].find_one({"userId": user_id})
        if document:
            document.pop('_id', None)
        return document
    
    async def get_projects_by_client_id(self, client_id: str) -> List[dict]:
        """Get projects by client ID"""
        return await self.get_documents('projects', {"clientId": client_id})
    
    async def get_quotes_by_project_id(self, project_id: str) -> List[dict]:
        """Get quotes for a project"""
        return await self.get_documents('quotes', {"projectId": project_id})
    
    async def get_reviews_by_professional_id(self, professional_id: str) -> List[dict]:
        """Get reviews for a professional"""
        return await self.get_documents('reviews', {"professionalId": professional_id})
    
    async def get_platform_stats(self) -> dict:
        """Get platform statistics"""
        stats = {}
        stats['totalProjects'] = await self.count_documents('projects')
        stats['verifiedProfessionals'] = await self.count_documents('professionals', {"isVerified": True})
        stats['totalUsers'] = await self.count_documents('users')
        stats['completedProjects'] = await self.count_documents('projects', {"status": "completed"})
        
        # Calculate average rating
        pipeline = [
            {"$group": {"_id": None, "avgRating": {"$avg": "$rating"}}}
        ]
        result = await self.db['reviews'].aggregate(pipeline).to_list(1)
        stats['averageRating'] = round(result[0]['avgRating'], 1) if result else 4.8
        
        return stats

# Global database instance
db_service = DatabaseService()