#!/usr/bin/env python3
"""
Dashboard Debug Test
Test exactly what the dashboard API calls return
"""

import asyncio
import aiohttp
import json
from datetime import datetime

BACKEND_URL = "https://icejobs.preview.emergentagent.com/api"

async def debug_dashboard_api():
    """Debug the exact API calls that dashboard makes"""
    
    email = "verki@verki.is"
    password = "Lindarbraut31"
    
    async with aiohttp.ClientSession() as session:
        # Step 1: Login
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
        
        cookies = {"buildconnect_auth": auth_cookie.value}
        
        # Step 2: Test different API calls that dashboard might make
        test_cases = [
            {
                "name": "Dashboard Default Call (customer_only=true)",
                "url": f"{BACKEND_URL}/job-requests/?customer_only=true&page=1&limit=10"
            },
            {
                "name": "Dashboard with status=all",
                "url": f"{BACKEND_URL}/job-requests/?customer_only=true&status=all&page=1&limit=10"
            },
            {
                "name": "Dashboard with status=open",
                "url": f"{BACKEND_URL}/job-requests/?customer_only=true&status=open&page=1&limit=10"
            },
            {
                "name": "Dashboard with status=draft",
                "url": f"{BACKEND_URL}/job-requests/?customer_only=true&status=draft&page=1&limit=10"
            },
            {
                "name": "All user jobs (no filters)",
                "url": f"{BACKEND_URL}/job-requests/?customer_only=true"
            }
        ]
        
        for test_case in test_cases:
            print(f"\n📋 Testing: {test_case['name']}")
            print(f"   URL: {test_case['url']}")
            
            async with session.get(test_case['url'], cookies=cookies) as response:
                if response.status == 200:
                    jobs = await response.json()
                    print(f"   ✅ Status: {response.status}")
                    print(f"   📊 Jobs returned: {len(jobs)}")
                    
                    if len(jobs) > 0:
                        # Analyze statuses
                        statuses = {}
                        for job in jobs:
                            status = job.get("status", "unknown")
                            statuses[status] = statuses.get(status, 0) + 1
                        print(f"   📈 Status breakdown: {statuses}")
                        
                        # Show first job details
                        first_job = jobs[0]
                        print(f"   📝 First job: {first_job.get('title', 'N/A')} (Status: {first_job.get('status')})")
                    else:
                        print(f"   ⚠️ No jobs returned")
                else:
                    error_data = await response.json() if response.content_type == 'application/json' else await response.text()
                    print(f"   ❌ Status: {response.status}")
                    print(f"   ❌ Error: {error_data}")
        
        # Step 3: Test creating a job with "open" status
        print(f"\n➕ Testing job creation with 'open' status...")
        
        job_data = {
            "category": "handcraft",
            "title": "OPEN Status Job for Dashboard Testing",
            "description": "This job is created with open status to test if it appears in dashboard immediately.",
            "postcode": "101",
            "address": "Reykjavik Test Address",
            "priority": "medium",
            "budget_min": 75000,
            "budget_max": 150000
        }
        
        async with session.post(
            f"{BACKEND_URL}/job-requests/",
            json=job_data,
            cookies=cookies,
            headers={"Content-Type": "application/json"}
        ) as response:
            if response.status == 200:
                new_job = await response.json()
                print(f"✅ Created job with status: {new_job.get('status')}")
                
                # Try to update the job status to 'open'
                if new_job.get('status') == 'draft':
                    print(f"🔄 Updating job status from draft to open...")
                    
                    async with session.put(
                        f"{BACKEND_URL}/job-requests/{new_job.get('id')}/status?new_status=open",
                        cookies=cookies
                    ) as update_response:
                        if update_response.status == 200:
                            print(f"✅ Job status updated to open")
                            
                            # Re-test dashboard calls
                            print(f"\n🔄 Re-testing dashboard calls after status update...")
                            async with session.get(
                                f"{BACKEND_URL}/job-requests/?customer_only=true&status=open",
                                cookies=cookies
                            ) as response:
                                if response.status == 200:
                                    open_jobs = await response.json()
                                    print(f"✅ Open jobs now: {len(open_jobs)}")
                                    
                                    # Check if our new job is there
                                    found_new_job = False
                                    for job in open_jobs:
                                        if job.get('id') == new_job.get('id'):
                                            found_new_job = True
                                            print(f"✅ New job found in open jobs list!")
                                            break
                                    
                                    if not found_new_job:
                                        print(f"❌ New job not found in open jobs list")
                        else:
                            update_error = await update_response.json() if update_response.content_type == 'application/json' else await update_response.text()
                            print(f"❌ Failed to update status: {update_response.status}")
                            print(f"   Error: {update_error}")
            else:
                error_data = await response.json() if response.content_type == 'application/json' else await response.text()
                print(f"❌ Failed to create job: {response.status}")
                print(f"   Error: {error_data}")
        
        # Step 4: Check what frontend API service actually calls
        print(f"\n🌐 Testing frontend API service equivalent calls...")
        
        # This simulates what the frontend apiService.getJobRequests() might call
        frontend_calls = [
            {
                "name": "Frontend Default (no status filter)",
                "params": {"customer_only": "true", "page": "1", "limit": "10"}
            },
            {
                "name": "Frontend with status=all",
                "params": {"customer_only": "true", "status": "all", "page": "1", "limit": "10"}
            }
        ]
        
        for call in frontend_calls:
            print(f"\n📱 {call['name']}")
            
            # Build query string
            query_params = "&".join([f"{k}={v}" for k, v in call['params'].items()])
            url = f"{BACKEND_URL}/job-requests/?{query_params}"
            print(f"   URL: {url}")
            
            async with session.get(url, cookies=cookies) as response:
                if response.status == 200:
                    jobs = await response.json()
                    print(f"   ✅ Jobs returned: {len(jobs)}")
                    
                    if len(jobs) > 0:
                        statuses = {}
                        for job in jobs:
                            status = job.get("status", "unknown")
                            statuses[status] = statuses.get(status, 0) + 1
                        print(f"   📈 Status breakdown: {statuses}")
                else:
                    print(f"   ❌ Failed: {response.status}")

if __name__ == "__main__":
    asyncio.run(debug_dashboard_api())