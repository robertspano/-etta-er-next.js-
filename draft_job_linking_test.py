#!/usr/bin/env python3
"""
Draft Job Linking Debug Test Suite
Specifically tests the draft job linking issue after login for user test@verki.is
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://byggja-verki.preview.emergentagent.com/api"

class DraftJobLinkingTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.user_session = None
        self.user_id = None
        
    async def setup(self):
        """Setup test session"""
        self.session = aiohttp.ClientSession()
        
    async def cleanup(self):
        """Cleanup test session"""
        if self.session:
            await self.session.close()
    
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if response_data and not success:
            print(f"   Response: {response_data}")

    async def step_1_check_draft_jobs_in_database(self):
        """Step 1: Check if draft jobs exist with contact_email: test@verki.is"""
        print("\n=== STEP 1: Checking Draft Jobs in Database ===")
        
        # We'll use the public API to create a draft job first to ensure one exists
        draft_job_data = {
            "category": "handcraft",
            "title": "Test verkefni fyrir draft linking",
            "description": "Þetta er test verkefni til að prófa draft job linking virkni",
            "postcode": "101",
            "address": "Test Address, Reykjavik",
            "priority": "medium"
        }
        
        try:
            # Create a draft job via public API
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=draft_job_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status in [200, 201]:
                    draft_id = data.get("id")
                    self.log_test("Create Draft Job", True, f"Created draft job with ID: {draft_id}")
                    
                    # Now update it with contact email
                    contact_data = {
                        "contact_email": "test@verki.is",
                        "contact_phone": "+354-555-1234",
                        "contact_first_name": "Test",
                        "contact_last_name": "User",
                        "contact_address": "Test Address, Reykjavik",
                        "contact_postcode": "101",
                        "contact_preference": "platform_and_phone"
                    }
                    
                    async with self.session.patch(
                        f"{BACKEND_URL}/public/job-requests/{draft_id}",
                        json=contact_data,
                        headers={"Content-Type": "application/json"}
                    ) as update_response:
                        update_data = await update_response.json()
                        if update_response.status == 200:
                            self.log_test("Update Draft with Contact Email", True, f"Updated draft with contact_email: test@verki.is")
                            return draft_id
                        else:
                            self.log_test("Update Draft with Contact Email", False, f"Failed to update draft: {update_response.status}", update_data)
                            return None
                else:
                    self.log_test("Create Draft Job", False, f"Failed to create draft: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("Create Draft Job", False, f"Request failed: {str(e)}")
            return None

    async def step_2_test_user_authentication(self):
        """Step 2: Test user authentication for test@verki.is"""
        print("\n=== STEP 2: Testing User Authentication ===")
        
        # Use the specific email requested in the debug task
        test_email = "test@verki.is"
        
        # First, try to create/register the user
        user_data = {
            "email": test_email,
            "password": "testpassword123",
            "role": "customer",
            "first_name": "Test",
            "last_name": "User",
            "phone": "+354-555-0000",
            "language": "is"
        }
        
        try:
            # Try to register the user (might already exist)
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=user_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 201:
                    self.log_test("User Registration", True, f"User {test_email} registered successfully")
                    self.user_id = data.get("id")
                elif response.status == 400 and "already exists" in str(data).lower():
                    self.log_test("User Registration", True, f"User {test_email} already exists (expected)")
                else:
                    self.log_test("User Registration", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("User Registration", False, f"Request failed: {str(e)}")
        
        # Try auto-login first (creates/updates user with password)
        auto_login_data = {
            "email": test_email,
            "password": "testpassword123"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/auto-login",
                json=auto_login_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("success"):
                    self.user_id = data.get("user", {}).get("id")
                    self.log_test("Auto Login", True, f"Auto-login successful for {test_email}, User ID: {self.user_id}")
                    
                    # Check if we got a session cookie from auto-login
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        self.user_session = cookies["buildconnect_auth"].value
                        self.log_test("Auto Login Session", True, "Got session cookie from auto-login")
                        await self.get_user_info()
                        return True
                else:
                    self.log_test("Auto Login", False, f"Auto-login failed: {response.status}", data)
        except Exception as e:
            self.log_test("Auto Login", False, f"Auto-login request failed: {str(e)}")
        
        # Try multiple passwords that might work
        passwords_to_try = ["testpassword123", "password", "verki123", "test123"]
        
        for password in passwords_to_try:
            login_data = {
                "username": test_email,
                "password": password
            }
            
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/auth/cookie/login",
                    data=login_data,
                    headers={"Content-Type": "application/x-www-form-urlencoded"}
                ) as response:
                    if response.status == 204:
                        # Successful login
                        cookies = response.cookies
                        if "buildconnect_auth" in cookies:
                            self.user_session = cookies["buildconnect_auth"].value
                            self.log_test("User Login", True, f"Successfully logged in {test_email} with password: {password}")
                            
                            # Get user info to verify
                            await self.get_user_info()
                            return True
                        else:
                            self.log_test("User Login", False, "Login successful but no auth cookie")
                    elif response.status == 400:
                        # Try next password
                        continue
                    else:
                        data = await response.json() if response.content_type == 'application/json' else await response.text()
                        self.log_test("User Login", False, f"Login failed: {response.status}", data)
            except Exception as e:
                continue
        
        # If we get here, none of the passwords worked
        self.log_test("User Login", False, f"All password attempts failed for {test_email}")
        return False

    async def get_user_info(self):
        """Get current user information"""
        if not self.user_session:
            return
            
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    self.user_id = data.get("id")
                    self.log_test("Get User Info", True, f"User ID: {self.user_id}, Email: {data.get('email')}, Role: {data.get('role')}")
                else:
                    self.log_test("Get User Info", False, f"Failed to get user info: {response.status}", data)
        except Exception as e:
            self.log_test("Get User Info", False, f"Request failed: {str(e)}")

    async def step_3_test_draft_job_linking_endpoint(self):
        """Step 3: Test the draft job linking endpoint"""
        print("\n=== STEP 3: Testing Draft Job Linking Endpoint ===")
        
        if not self.user_session:
            self.log_test("Draft Job Linking", False, "No user session available - cannot test linking endpoint")
            
            # Try to test the endpoint without authentication to see what error we get
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/auth/link-draft-jobs",
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 401:
                        self.log_test("Draft Job Linking Endpoint (Unauthenticated)", True, "Endpoint correctly requires authentication")
                    else:
                        self.log_test("Draft Job Linking Endpoint (Unauthenticated)", False, f"Unexpected response: {response.status}", data)
            except Exception as e:
                self.log_test("Draft Job Linking Endpoint (Unauthenticated)", False, f"Request failed: {str(e)}")
            return 0
        
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.post(
                f"{BACKEND_URL}/auth/link-draft-jobs",
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    linked_count = data.get("linked_jobs", 0)
                    self.log_test("Draft Job Linking Endpoint", True, f"Successfully linked {linked_count} draft jobs")
                    return linked_count
                else:
                    self.log_test("Draft Job Linking Endpoint", False, f"Linking failed: {response.status}", data)
                    return 0
        except Exception as e:
            self.log_test("Draft Job Linking Endpoint", False, f"Request failed: {str(e)}")
            return 0

    async def step_4_debug_linking_logic(self):
        """Step 4: Debug the linking logic by checking database directly"""
        print("\n=== STEP 4: Debugging Linking Logic ===")
        
        # First, let's check all open jobs to see if we can find any patterns
        try:
            async with self.session.get(f"{BACKEND_URL}/job-requests") as response:
                data = await response.json()
                if response.status == 200:
                    all_jobs = data
                    draft_jobs = [job for job in all_jobs if job.get("status") == "draft"]
                    open_jobs = [job for job in all_jobs if job.get("status") == "open"]
                    
                    self.log_test("All Jobs Check", True, f"Found {len(all_jobs)} total jobs, {len(draft_jobs)} draft, {len(open_jobs)} open")
                    
                    # Look for jobs with our test email
                    jobs_with_test_email = [job for job in all_jobs if "test@verki.is" in str(job)]
                    self.log_test("Jobs with Test Email", True, f"Found {len(jobs_with_test_email)} jobs containing test@verki.is")
                    
                    # Print details of jobs with our email
                    for job in jobs_with_test_email:
                        job_info = f"ID: {job.get('id')}, Status: {job.get('status')}, Customer ID: {job.get('customer_id')}"
                        self.log_test("Job with Test Email Details", True, job_info)
                else:
                    self.log_test("All Jobs Check", False, f"Failed to get jobs: {response.status}", data)
        except Exception as e:
            self.log_test("All Jobs Check", False, f"Request failed: {str(e)}")
        
        # Check if there are any draft jobs with the email
        try:
            # We can't directly query the database, but we can check via the job-requests endpoint
            # First, let's see all jobs for the user
            if self.user_session:
                cookies = {"buildconnect_auth": self.user_session}
                async with self.session.get(
                    f"{BACKEND_URL}/job-requests?customer_only=true",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        user_jobs = [job for job in data if job.get("customer_id") == self.user_id]
                        draft_jobs = [job for job in user_jobs if job.get("status") == "draft"]
                        open_jobs = [job for job in user_jobs if job.get("status") == "open"]
                        
                        self.log_test("User Jobs Check", True, f"Found {len(user_jobs)} total jobs, {len(draft_jobs)} draft, {len(open_jobs)} open")
                        
                        return len(user_jobs)
                    else:
                        self.log_test("User Jobs Check", False, f"Failed to get user jobs: {response.status}", data)
                        return 0
            else:
                self.log_test("User Jobs Check", False, "No user session available")
                return 0
        except Exception as e:
            self.log_test("User Jobs Check", False, f"Request failed: {str(e)}")
            return 0

    async def step_5_verify_job_retrieval(self):
        """Step 5: Verify job retrieval after linking"""
        print("\n=== STEP 5: Verifying Job Retrieval After Linking ===")
        
        if not self.user_session:
            self.log_test("Job Retrieval Verification", False, "No user session available")
            return
        
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests?customer_only=true",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    linked_jobs = [job for job in data if job.get("customer_id") == self.user_id and job.get("status") == "open"]
                    self.log_test("Linked Jobs Verification", True, f"Found {len(linked_jobs)} linked jobs with status 'open'")
                    
                    # Check job details
                    for job in linked_jobs:
                        job_details = f"ID: {job.get('id')}, Status: {job.get('status')}, Customer ID: {job.get('customer_id')}"
                        self.log_test("Job Details", True, job_details)
                    
                    return len(linked_jobs)
                else:
                    self.log_test("Linked Jobs Verification", False, f"Failed to get jobs: {response.status}", data)
                    return 0
        except Exception as e:
            self.log_test("Linked Jobs Verification", False, f"Request failed: {str(e)}")
            return 0

    async def run_comprehensive_debug_test(self):
        """Run the complete debug test suite"""
        print("🔍 DRAFT JOB LINKING DEBUG TEST SUITE")
        print("=" * 60)
        
        await self.setup()
        
        try:
            # Step 1: Check/Create draft jobs in database
            draft_id = await self.step_1_check_draft_jobs_in_database()
            
            # Step 2: Test user authentication
            auth_success = await self.step_2_test_user_authentication()
            
            # Try to proceed with testing even if authentication partially failed
            # Step 3: Test draft job linking endpoint
            linked_count = await self.step_3_test_draft_job_linking_endpoint()
            
            # Step 4: Debug linking logic
            user_jobs_count = await self.step_4_debug_linking_logic()
            
            # Step 5: Verify job retrieval
            final_linked_count = await self.step_5_verify_job_retrieval()
            
            # Summary
            print("\n" + "=" * 60)
            print("🔍 DEBUG SUMMARY")
            print("=" * 60)
            
            if draft_id:
                print(f"✅ Draft job created with ID: {draft_id}")
            else:
                print("❌ Failed to create draft job")
            
            if self.user_id:
                print(f"✅ User test@verki.is identified successfully")
                print(f"   User ID: {self.user_id}")
            else:
                print("❌ User identification failed")
            
            print(f"📊 Linking Results:")
            print(f"   - Jobs linked by endpoint: {linked_count}")
            print(f"   - Total user jobs found: {user_jobs_count}")
            print(f"   - Final linked jobs count: {final_linked_count}")
            
            if linked_count > 0 and final_linked_count > 0:
                print("✅ Draft job linking appears to be working!")
            else:
                print("❌ Draft job linking issue detected!")
                print("\n🔧 POTENTIAL ISSUES:")
                print("   1. Email matching logic might be case-sensitive")
                print("   2. Draft jobs might not have contact_email field set")
                print("   3. Database query filters might be incorrect")
                print("   4. Status transition from 'draft' to 'open' might be failing")
            
        finally:
            await self.cleanup()
        
        # Print test results summary
        print("\n" + "=" * 60)
        print("📋 DETAILED TEST RESULTS")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Tests Passed: {passed}/{total} ({passed/total*100:.1f}%)")
        print()
        
        for result in self.test_results:
            status = "✅" if result["success"] else "❌"
            print(f"{status} {result['test']}: {result['details']}")

async def main():
    """Main test runner"""
    tester = DraftJobLinkingTester()
    await tester.run_comprehensive_debug_test()

if __name__ == "__main__":
    asyncio.run(main())