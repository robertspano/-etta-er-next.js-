#!/usr/bin/env python3
"""
Manual Job Linking Script
Links draft jobs to a specific user and changes status to open
"""

import asyncio
from services.database import db_service
from datetime import datetime

async def link_draft_jobs_to_user():
    """Link draft jobs to our test user"""
    await db_service.connect_to_database()
    
    # Our test user ID from the debug test
    test_user_id = "a843822e-1d53-4c15-8530-190af0fbac28"
    test_user_email = "debug_user_1756827167@example.com"
    
    print(f"Linking draft jobs to user: {test_user_id} ({test_user_email})")
    
    # Get all draft jobs
    all_jobs = await db_service.get_documents('job_requests', limit=100)
    draft_jobs = [job for job in all_jobs if job.get('status') == 'draft']
    
    print(f"Found {len(draft_jobs)} draft jobs")
    
    # Find jobs that should be linked (no customer_id or reasonable contact emails)
    jobs_to_link = []
    for job in draft_jobs:
        if (not job.get('customer_id') or 
            job.get('contact_email', '').endswith('@example.com') or
            job.get('contact_email', '').endswith('@verki.is')):
            jobs_to_link.append(job)
    
    print(f"Found {len(jobs_to_link)} jobs that can be linked")
    
    # Link the first 5 jobs to our test user
    linked_count = 0
    for i, job in enumerate(jobs_to_link[:5]):
        job_id = job.get('id')
        title = job.get('title', 'Untitled')
        
        try:
            # Update the job
            update_data = {
                "customer_id": test_user_id,
                "status": "open",
                "contact_email": test_user_email,
                "contact_name": "Debug User",
                "contact_phone": "+354-555-0000",
                "updated_at": datetime.utcnow().isoformat()
            }
            
            success = await db_service.update_document("job_requests", job_id, update_data)
            if success:
                linked_count += 1
                print(f"✅ Linked job {i+1}: {title} (ID: {job_id})")
            else:
                print(f"❌ Failed to link job {i+1}: {title} (ID: {job_id})")
                
        except Exception as e:
            print(f"❌ Error linking job {i+1}: {str(e)}")
    
    print(f"\n🎉 Successfully linked {linked_count} jobs to user {test_user_id}")
    
    # Verify the linked jobs
    print("\n--- Verifying linked jobs ---")
    user_jobs = await db_service.get_documents(
        'job_requests', 
        filter_dict={"customer_id": test_user_id}
    )
    
    print(f"User now has {len(user_jobs)} total jobs:")
    for i, job in enumerate(user_jobs):
        print(f"  {i+1}. {job.get('title', 'Untitled')} - Status: {job.get('status')} (ID: {job.get('id')})")
    
    await db_service.close_database_connection()
    
    return linked_count

if __name__ == "__main__":
    asyncio.run(link_draft_jobs_to_user())