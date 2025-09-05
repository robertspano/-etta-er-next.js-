#!/usr/bin/env python3
"""
Simple Dashboard Test
Test if the linked jobs appear in the user's dashboard
"""

import asyncio
import aiohttp
import json

BACKEND_URL = "https://icejobs.preview.emergentagent.com/api"

async def test_user_dashboard():
    """Test if user can see their jobs in dashboard"""
    
    # Use the user we just linked jobs to
    user_email = "debug_user_1756827294@example.com"
    user_password = "DebugTest123!"
    
    async with aiohttp.ClientSession() as session:
        print("🔍 Testing User Dashboard Access")
        print("=" * 40)
        
        # Step 1: Login
        print("Step 1: Logging in...")
        try:
            login_data = {
                "username": user_email,
                "password": user_password
            }
            async with session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        auth_cookie = cookies["buildconnect_auth"].value
                        print("✅ Login successful")
                    else:
                        print("❌ Login successful but no auth cookie")
                        return
                else:
                    print(f"❌ Login failed: {response.status}")
                    return
        except Exception as e:
            print(f"❌ Login error: {e}")
            return
        
        # Step 2: Get user info
        print("Step 2: Getting user info...")
        try:
            cookies = {"buildconnect_auth": auth_cookie}
            async with session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                if response.status == 200:
                    user_data = await response.json()
                    user_id = user_data.get("id")
                    print(f"✅ User ID: {user_id}")
                    print(f"   Email: {user_data.get('email')}")
                    print(f"   Role: {user_data.get('role')}")
                else:
                    print(f"❌ Failed to get user info: {response.status}")
                    return
        except Exception as e:
            print(f"❌ User info error: {e}")
            return
        
        # Step 3: Get user's jobs
        print("Step 3: Getting user's jobs...")
        try:
            cookies = {"buildconnect_auth": auth_cookie}
            async with session.get(
                f"{BACKEND_URL}/job-requests?customer_only=true",
                cookies=cookies
            ) as response:
                if response.status == 200:
                    jobs = await response.json()
                    print(f"✅ Found {len(jobs)} jobs for user")
                    
                    if len(jobs) > 0:
                        print("\n📋 User's Jobs:")
                        for i, job in enumerate(jobs):
                            status_badge = "🟠" if job.get('status') == 'open' else "🔵"
                            print(f"   {i+1}. {status_badge} {job.get('title', 'Untitled')}")
                            print(f"      Status: {job.get('status')} | Category: {job.get('category', 'N/A')}")
                            print(f"      ID: {job.get('id')}")
                            print()
                        
                        # Check for open jobs (should show as "Væntar samþykktar")
                        open_jobs = [job for job in jobs if job.get('status') == 'open']
                        if open_jobs:
                            print(f"🎉 SUCCESS: {len(open_jobs)} job(s) with 'open' status found!")
                            print("   These should appear in 'Mín verkefni' dashboard with 'Væntar samþykktar' (orange badge)")
                            return True
                        else:
                            print("❌ No jobs with 'open' status found")
                            return False
                    else:
                        print("❌ No jobs found for user")
                        return False
                else:
                    print(f"❌ Failed to get jobs: {response.status}")
                    text = await response.text()
                    print(f"   Response: {text[:200]}")
                    return False
        except Exception as e:
            print(f"❌ Jobs retrieval error: {e}")
            return False

async def main():
    success = await test_user_dashboard()
    if success:
        print("\n🎉 DASHBOARD TEST PASSED!")
        print("The user should now see jobs in their 'Mín verkefni' dashboard.")
    else:
        print("\n❌ DASHBOARD TEST FAILED!")
        print("Jobs are not appearing in the user's dashboard.")

if __name__ == "__main__":
    asyncio.run(main())