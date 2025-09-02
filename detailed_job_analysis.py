#!/usr/bin/env python3
"""
Detailed Job Analysis for verki@verki.is user
Analyze what jobs exist and why dashboard might be empty
"""

import asyncio
import aiohttp
import json
from datetime import datetime

BACKEND_URL = "https://byggja-verki.preview.emergentagent.com/api"

async def analyze_user_jobs():
    """Analyze jobs for verki@verki.is user"""
    
    email = "verki@verki.is"
    password = "Lindarbraut31"
    
    async with aiohttp.ClientSession() as session:
        # Step 1: Login to get auth cookie
        print("🔐 Logging in...")
        login_data = {
            "username": email,
            "password": password
        }
        
        async with session.post(
            f"{BACKEND_URL}/auth/cookie/login",
            data=login_data,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        ) as response:
            if response.status != 204:
                print("❌ Login failed")
                return
            
            auth_cookie = response.cookies.get("buildconnect_auth")
            if not auth_cookie:
                print("❌ No auth cookie received")
                return
            
            print("✅ Login successful")
        
        # Step 2: Get user info
        print("\n👤 Getting user info...")
        cookies = {"buildconnect_auth": auth_cookie.value}
        
        async with session.get(f"{BACKEND_URL}/auth/me", cookies=cookies) as response:
            if response.status != 200:
                print("❌ Failed to get user info")
                return
            
            user_data = await response.json()
            user_id = user_data.get("id")
            print(f"✅ User ID: {user_id}")
            print(f"   Email: {user_data.get('email')}")
            print(f"   Role: {user_data.get('role')}")
        
        # Step 3: Get user's jobs with customer_only=true
        print(f"\n📋 Getting jobs for user (customer_only=true)...")
        
        async with session.get(
            f"{BACKEND_URL}/job-requests?customer_only=true",
            cookies=cookies
        ) as response:
            if response.status != 200:
                print(f"❌ Failed to get user jobs: {response.status}")
                return
            
            user_jobs = await response.json()
            print(f"✅ Found {len(user_jobs)} jobs for user")
            
            if len(user_jobs) > 0:
                print(f"\n📊 Job Analysis:")
                
                # Analyze job statuses
                statuses = {}
                categories = {}
                for job in user_jobs:
                    status = job.get("status", "unknown")
                    category = job.get("category", "unknown")
                    statuses[status] = statuses.get(status, 0) + 1
                    categories[category] = categories.get(category, 0) + 1
                
                print(f"   Status breakdown: {statuses}")
                print(f"   Category breakdown: {categories}")
                
                # Show first few jobs in detail
                print(f"\n📝 First 3 jobs details:")
                for i, job in enumerate(user_jobs[:3]):
                    print(f"   Job {i+1}:")
                    print(f"     ID: {job.get('id')}")
                    print(f"     Category: {job.get('category')}")
                    print(f"     Title: {job.get('title', 'N/A')}")
                    print(f"     Status: {job.get('status')}")
                    print(f"     Customer ID: {job.get('customer_id')}")
                    print(f"     Posted: {job.get('posted_at')}")
                    print(f"     Contact Email: {job.get('contact_email', 'N/A')}")
                    print()
        
        # Step 4: Get all jobs and check for any with matching email
        print(f"\n🔍 Searching all jobs for contact email {email}...")
        
        async with session.get(f"{BACKEND_URL}/job-requests") as response:
            if response.status != 200:
                print(f"❌ Failed to get all jobs: {response.status}")
                return
            
            all_jobs = await response.json()
            print(f"✅ Retrieved {len(all_jobs)} total jobs")
            
            # Find jobs with matching contact email
            matching_email_jobs = []
            for job in all_jobs:
                if job.get("contact_email") == email:
                    matching_email_jobs.append(job)
            
            print(f"📧 Jobs with contact email {email}: {len(matching_email_jobs)}")
            
            if len(matching_email_jobs) > 0:
                print(f"\n📝 Jobs with matching email:")
                for i, job in enumerate(matching_email_jobs):
                    print(f"   Job {i+1}:")
                    print(f"     ID: {job.get('id')}")
                    print(f"     Category: {job.get('category')}")
                    print(f"     Title: {job.get('title', 'N/A')}")
                    print(f"     Status: {job.get('status')}")
                    print(f"     Customer ID: {job.get('customer_id', 'N/A')}")
                    print(f"     Contact Email: {job.get('contact_email')}")
                    print()
        
        # Step 5: Test creating a new job
        print(f"\n➕ Testing job creation...")
        
        job_data = {
            "category": "handcraft",
            "title": "Dashboard Test Job - Please Show in Dashboard",
            "description": "This is a test job created to verify dashboard functionality. It should appear in the user's dashboard.",
            "postcode": "101",
            "address": "Reykjavik Test Address",
            "priority": "medium",
            "budget_min": 50000,
            "budget_max": 100000
        }
        
        async with session.post(
            f"{BACKEND_URL}/job-requests/",  # Add trailing slash to avoid redirect
            json=job_data,
            cookies=cookies,
            headers={"Content-Type": "application/json"}
        ) as response:
            if response.status == 200:
                new_job = await response.json()
                # Handle both single job and list responses due to redirect issues
                if isinstance(new_job, list):
                    print(f"⚠️ Got list response instead of single job (redirect issue)")
                    if len(new_job) > 0:
                        # Find the most recent job (likely the one we just created)
                        new_job = max(new_job, key=lambda x: x.get('posted_at', ''))
                        print(f"✅ Using most recent job: {new_job.get('id')}")
                    else:
                        print(f"❌ Empty list returned")
                        return
                else:
                    print(f"✅ Created new job: {new_job.get('id')}")
                
                print(f"   Title: {new_job.get('title')}")
                print(f"   Status: {new_job.get('status')}")
                print(f"   Customer ID: {new_job.get('customer_id')}")
                
                # Verify it appears in user's jobs
                print(f"\n🔄 Re-checking user jobs after creation...")
                async with session.get(
                    f"{BACKEND_URL}/job-requests?customer_only=true",
                    cookies=cookies
                ) as response:
                    if response.status == 200:
                        updated_jobs = await response.json()
                        print(f"✅ User now has {len(updated_jobs)} jobs")
                        
                        # Find the new job
                        new_job_found = False
                        for job in updated_jobs:
                            if job.get('id') == new_job.get('id'):
                                new_job_found = True
                                print(f"✅ New job found in user's job list")
                                break
                        
                        if not new_job_found:
                            print(f"❌ New job NOT found in user's job list")
                    else:
                        print(f"❌ Failed to re-check user jobs")
            else:
                error_data = await response.json()
                print(f"❌ Failed to create job: {response.status}")
                print(f"   Error: {error_data}")

if __name__ == "__main__":
    asyncio.run(analyze_user_jobs())