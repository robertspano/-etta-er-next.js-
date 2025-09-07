#!/usr/bin/env python3
"""
Draft Job Linking Verification Test
Creates a new user and tests the complete draft job linking flow
"""

import asyncio
import aiohttp
import json
import time
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://movers-platform-1.preview.emergentagent.com/api"

class DraftLinkingVerificationTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.user_session = None
        self.user_id = None
        self.test_email = None
        self.draft_id = None
        
    async def setup(self):
        """Setup test session"""
        self.session = aiohttp.ClientSession()
        # Create unique email for this test
        timestamp = str(int(time.time()))
        self.test_email = f"draft_test_{timestamp}@verki.is"
        
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

    async def step_1_create_draft_job(self):
        """Step 1: Create a draft job with contact email"""
        print(f"\n=== STEP 1: Creating Draft Job with Email {self.test_email} ===")
        
        # Create draft job
        draft_job_data = {
            "category": "handcraft",
            "title": "Test verkefni fyrir draft linking verification",
            "description": "Þetta er test verkefni til að prófa að draft job linking virki rétt eftir lagfæringu",
            "postcode": "101",
            "address": "Test Address, Reykjavik",
            "priority": "medium"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=draft_job_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status in [200, 201]:
                    self.draft_id = data.get("id")
                    self.log_test("Create Draft Job", True, f"Created draft job with ID: {self.draft_id}")
                    
                    # Update with contact email
                    contact_data = {
                        "email": self.test_email,
                        "phone": "+354-555-1234",
                        "firstName": "Draft",
                        "lastName": "Test",
                        "address": "Test Address, Reykjavik",
                        "postcode": "101",
                        "contactPreference": "platform_and_phone"
                    }
                    
                    async with self.session.patch(
                        f"{BACKEND_URL}/public/job-requests/{self.draft_id}",
                        json=contact_data,
                        headers={"Content-Type": "application/json"}
                    ) as update_response:
                        update_data = await update_response.json()
                        if update_response.status == 200:
                            self.log_test("Update Draft with Contact Email", True, f"Updated draft with contact_email: {self.test_email}")
                            return True
                        else:
                            self.log_test("Update Draft with Contact Email", False, f"Failed to update draft: {update_response.status}", update_data)
                            return False
                else:
                    self.log_test("Create Draft Job", False, f"Failed to create draft: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("Create Draft Job", False, f"Request failed: {str(e)}")
            return False

    async def step_2_create_and_authenticate_user(self):
        """Step 2: Create and authenticate a new user"""
        print(f"\n=== STEP 2: Creating and Authenticating User {self.test_email} ===")
        
        # Create user
        user_data = {
            "email": self.test_email,
            "password": "testpassword123",
            "role": "customer",
            "first_name": "Draft",
            "last_name": "Test",
            "phone": "+354-555-0000",
            "language": "is"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=user_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 201:
                    self.user_id = data.get("id")
                    self.log_test("User Registration", True, f"User {self.test_email} registered successfully, ID: {self.user_id}")
                else:
                    self.log_test("User Registration", False, f"Registration failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("User Registration", False, f"Request failed: {str(e)}")
            return False
        
        # Login user
        login_data = {
            "username": self.test_email,
            "password": "testpassword123"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        self.user_session = cookies["buildconnect_auth"].value
                        self.log_test("User Login", True, f"Successfully logged in {self.test_email}")
                        return True
                    else:
                        self.log_test("User Login", False, "Login successful but no auth cookie")
                        return False
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("User Login", False, f"Login failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("User Login", False, f"Request failed: {str(e)}")
            return False

    async def step_3_test_draft_job_linking(self):
        """Step 3: Test the draft job linking endpoint"""
        print("\n=== STEP 3: Testing Draft Job Linking ===")
        
        if not self.user_session:
            self.log_test("Draft Job Linking", False, "No user session available")
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

    async def step_4_verify_linked_jobs(self):
        """Step 4: Verify that jobs appear in user's job list"""
        print("\n=== STEP 4: Verifying Linked Jobs ===")
        
        if not self.user_session:
            self.log_test("Job Verification", False, "No user session available")
            return 0
        
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests?customer_only=true",
                cookies=cookies
            ) as response:
                if response.status == 200:
                    data = await response.json()
                elif response.status == 500:
                    # Handle 500 error - try to get text response
                    error_text = await response.text()
                    self.log_test("User Jobs Verification", False, f"Server error (500): {error_text[:200]}")
                    return 0
                else:
                    # Handle other errors
                    try:
                        data = await response.json()
                    except:
                        data = await response.text()
                    self.log_test("User Jobs Verification", False, f"HTTP {response.status}: {data}")
                    return 0
                
                if True:  # Continue with success case
                    user_jobs = [job for job in data if job.get("customer_id") == self.user_id]
                    open_jobs = [job for job in user_jobs if job.get("status") == "open"]
                    
                    self.log_test("User Jobs Verification", True, f"Found {len(user_jobs)} total jobs, {len(open_jobs)} open jobs")
                    
                    # Check if our specific job is there
                    our_job = None
                    for job in user_jobs:
                        if job.get("id") == self.draft_id:
                            our_job = job
                            break
                    
                    if our_job:
                        self.log_test("Specific Job Found", True, f"Draft job {self.draft_id} found with status: {our_job.get('status')}")
                        if our_job.get("status") == "open":
                            self.log_test("Job Status Verification", True, "Job status correctly changed from 'draft' to 'open'")
                        else:
                            self.log_test("Job Status Verification", False, f"Job status is '{our_job.get('status')}', expected 'open'")
                    else:
                        self.log_test("Specific Job Found", False, f"Draft job {self.draft_id} not found in user's jobs")
                    
                    return len(open_jobs)
                else:
                    self.log_test("User Jobs Verification", False, f"Failed to get user jobs: {response.status}", data)
                    return 0
        except Exception as e:
            self.log_test("User Jobs Verification", False, f"Request failed: {str(e)}")
            return 0

    async def run_verification_test(self):
        """Run the complete verification test"""
        print("🔍 DRAFT JOB LINKING VERIFICATION TEST")
        print("=" * 60)
        
        await self.setup()
        
        try:
            # Step 1: Create draft job
            draft_created = await self.step_1_create_draft_job()
            
            if not draft_created:
                print("❌ Cannot proceed without draft job")
                return
            
            # Step 2: Create and authenticate user
            user_authenticated = await self.step_2_create_and_authenticate_user()
            
            if not user_authenticated:
                print("❌ Cannot proceed without authenticated user")
                return
            
            # Step 3: Test draft job linking
            linked_count = await self.step_3_test_draft_job_linking()
            
            # Step 4: Verify linked jobs
            final_jobs_count = await self.step_4_verify_linked_jobs()
            
            # Summary
            print("\n" + "=" * 60)
            print("🔍 VERIFICATION SUMMARY")
            print("=" * 60)
            
            print(f"✅ Test Email: {self.test_email}")
            print(f"✅ User ID: {self.user_id}")
            print(f"✅ Draft Job ID: {self.draft_id}")
            print(f"📊 Results:")
            print(f"   - Jobs linked by endpoint: {linked_count}")
            print(f"   - Final jobs in user account: {final_jobs_count}")
            
            if linked_count > 0 and final_jobs_count > 0:
                print("\n🎉 SUCCESS! Draft job linking is working correctly!")
                print("   ✅ Draft job created with contact email")
                print("   ✅ User registered and authenticated")
                print("   ✅ Draft job successfully linked to user")
                print("   ✅ Job status changed from 'draft' to 'open'")
                print("   ✅ Job appears in user's job list")
            else:
                print("\n❌ FAILURE! Draft job linking is not working properly")
                if linked_count == 0:
                    print("   ❌ No jobs were linked by the endpoint")
                if final_jobs_count == 0:
                    print("   ❌ No jobs found in user's account")
            
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
    tester = DraftLinkingVerificationTester()
    await tester.run_verification_test()

if __name__ == "__main__":
    asyncio.run(main())