"""
Sample review data script for testing the reviews system
Run this to add some sample reviews to the database
"""

import asyncio
from datetime import datetime, timedelta
import sys
import os
from pathlib import Path

# Add the backend directory to the path so we can import models
sys.path.append(str(Path(__file__).parent.parent))

from services.database import db_service
from models.review import Review, ReviewStatus
from models.user import User, UserRole
from models.job_request import JobRequest, JobStatus

async def create_sample_data():
    """Create sample users, jobs, and reviews for testing"""
    
    # Connect to database
    await db_service.connect_to_database()
    
    print("Creating sample data for reviews system...")
    
    # Sample customers
    customers = [
        {
            "id": "customer-1",
            "email": "customer1@example.com", 
            "first_name": "Sigríður",
            "last_name": "Jónsdóttir",
            "location": "Reykjavík"
        },
        {
            "id": "customer-2", 
            "email": "customer2@example.com",
            "first_name": "Gunnar",
            "last_name": "Einarsson", 
            "location": "Akureyri"
        },
        {
            "id": "customer-3",
            "email": "customer3@example.com",
            "first_name": "María",
            "last_name": "Helgadóttir",
            "location": "Hafnarfjörður"
        }
    ]
    
    # Sample professionals
    professionals = [
        {
            "id": "professional-1",
            "email": "pro1@example.com",
            "first_name": "Björn",
            "last_name": "Construction", 
            "company_name": "Nordic Construction AS",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            "id": "professional-2",
            "email": "pro2@example.com", 
            "first_name": "Elísabet",
            "last_name": "Renovation",
            "company_name": "Reykjavík Renovations",
            "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
            "id": "professional-3",
            "email": "pro3@example.com",
            "first_name": "Þórður", 
            "last_name": "Plumbing",
            "company_name": "Island Plumbing Services",
            "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    ]
    
    # Create users if they don't exist
    for customer_data in customers:
        existing = await User.find_one(User.id == customer_data["id"])
        if not existing:
            from models.user import UserProfile
            customer = User(
                id=customer_data["id"],
                email=customer_data["email"],
                hashed_password="fake_hash",  # Not used for testing
                role=UserRole.CUSTOMER,
                profile=UserProfile(
                    first_name=customer_data["first_name"],
                    last_name=customer_data["last_name"],
                    location=customer_data["location"]
                ),
                is_active=True
            )
            await customer.insert()
            print(f"Created customer: {customer_data['first_name']} {customer_data['last_name']}")
    
    for pro_data in professionals:
        existing = await User.find_one(User.id == pro_data["id"])
        if not existing:
            from models.user import UserProfile
            professional = User(
                id=pro_data["id"],
                email=pro_data["email"],
                hashed_password="fake_hash",  # Not used for testing
                role=UserRole.PROFESSIONAL,
                profile=UserProfile(
                    first_name=pro_data["first_name"],
                    last_name=pro_data["last_name"],
                    company_name=pro_data["company_name"],
                    avatar=pro_data.get("avatar")
                ),
                is_active=True
            )
            await professional.insert()
            print(f"Created professional: {pro_data['company_name']}")
    
    # Create sample completed job requests
    job_requests = [
        {
            "id": "job-1",
            "customer_id": "customer-1",
            "category": "bathroom",
            "title": "Bathroom renovation in downtown Reykjavík",
            "description": "Complete bathroom renovation including tiles, plumbing, and fixtures",
            "postcode": "101",
            "status": JobStatus.COMPLETED
        },
        {
            "id": "job-2", 
            "customer_id": "customer-2",
            "category": "handcraft",
            "title": "Kitchen cabinet installation",
            "description": "Install new kitchen cabinets and countertops",
            "postcode": "600",
            "status": JobStatus.COMPLETED
        },
        {
            "id": "job-3",
            "customer_id": "customer-3", 
            "category": "majorProjects",
            "title": "House extension project",
            "description": "Add new room extension to existing house",
            "postcode": "220",
            "status": JobStatus.COMPLETED
        }
    ]
    
    for job_data in job_requests:
        existing = await JobRequest.find_one(JobRequest.id == job_data["id"])
        if not existing:
            job = JobRequest(
                id=job_data["id"],
                customer_id=job_data["customer_id"],
                category=job_data["category"],
                title=job_data["title"],
                description=job_data["description"],
                postcode=job_data["postcode"],
                status=job_data["status"],
                posted_at=datetime.utcnow() - timedelta(days=30),
                completed_at=datetime.utcnow() - timedelta(days=7)
            )
            await job.insert()
            print(f"Created job request: {job_data['title']}")
    
    # Create sample reviews
    sample_reviews = [
        {
            "id": "review-1",
            "job_request_id": "job-1",
            "professional_id": "professional-1", 
            "customer_id": "customer-1",
            "rating": 5,
            "title": "Excellent bathroom renovation work",
            "content": "Nordic Construction did an amazing job renovating our bathroom. The work was completed on time, within budget, and to a very high standard. The team was professional, clean, and respectful of our home. Highly recommended for any construction project!",
            "project_category": "bathroom",
            "project_postcode": "101",
            "status": ReviewStatus.APPROVED,
            "created_at": datetime.utcnow() - timedelta(days=5)
        },
        {
            "id": "review-2",
            "job_request_id": "job-2",
            "professional_id": "professional-2",
            "customer_id": "customer-2", 
            "rating": 4,
            "title": "Great kitchen cabinet installation",
            "content": "Elísabet and her team did excellent work installing our new kitchen cabinets. The installation was precise and the finish is beautiful. Only minor delay in the timeline, but overall very satisfied with the results.",
            "project_category": "handcraft",
            "project_postcode": "600",
            "status": ReviewStatus.APPROVED,
            "created_at": datetime.utcnow() - timedelta(days=10)
        },
        {
            "id": "review-3",
            "job_request_id": "job-3",
            "professional_id": "professional-3",
            "customer_id": "customer-3",
            "rating": 5,
            "title": "Outstanding house extension project", 
            "content": "Island Plumbing Services handled all the plumbing work for our house extension. Þórður was knowledgeable, reliable, and delivered quality work. The new plumbing systems work perfectly and everything was installed according to code.",
            "project_category": "majorProjects",
            "project_postcode": "220", 
            "status": ReviewStatus.APPROVED,
            "created_at": datetime.utcnow() - timedelta(days=3)
        },
        {
            "id": "review-4",
            "job_request_id": "job-1",
            "professional_id": "professional-2",
            "customer_id": "customer-1",
            "rating": 4,
            "title": "Professional and reliable service",
            "content": "Reykjavík Renovations provided additional finishing work on our bathroom project. Very professional team with attention to detail. Communication was clear and they cleaned up thoroughly after each day's work.",
            "project_category": "bathroom",
            "project_postcode": "101",
            "status": ReviewStatus.APPROVED,
            "created_at": datetime.utcnow() - timedelta(days=8)
        }
    ]
    
    for review_data in sample_reviews:
        existing = await Review.find_one(Review.id == review_data["id"])
        if not existing:
            review = Review(
                id=review_data["id"],
                job_request_id=review_data["job_request_id"],
                professional_id=review_data["professional_id"],
                customer_id=review_data["customer_id"], 
                rating=review_data["rating"],
                title=review_data["title"],
                content=review_data["content"],
                project_category=review_data["project_category"],
                project_postcode=review_data["project_postcode"],
                status=review_data["status"],
                is_verified=True,
                created_at=review_data["created_at"]
            )
            await review.insert()
            print(f"Created review: {review_data['title']}")
    
    print("\n✅ Sample data creation completed!")
    print(f"Created {len(customers)} customers, {len(professionals)} professionals, {len(job_requests)} job requests, and {len(sample_reviews)} reviews")
    
    # Close database connection
    await db_service.close_database_connection()

if __name__ == "__main__":
    asyncio.run(create_sample_data())