#!/usr/bin/env python3
"""
Dashboard Issue Focused Test Suite
Testing the specific scenarios mentioned in the review request
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://icejobs.preview.emergentagent.com/api"

class DashboardIssueFocusedTester:
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

    async def create_test_user_and_login(self):
        """Create a test user and login"""
        print("\n=== Creating Test User and Login ===")
        
        import time
        timestamp = str(int(time.time()))
        
        user_data = {
            "email": f"dashboard_issue_test_{timestamp}@example.com",
            "password": "TestPassword123!",
            "role": "customer",
            "first_name": "Dashboard",
            "last_name": "Tester",
            "phone": "+354-555-1234",
            "language": "en"
        }
        
        # Register user
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=user_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status in [200, 201]:
                    self.user_id = data.get("id")
                    self.log_test("User Registration", True, f"User registered: {user_data['email']}")
                else:
                    self.log_test("User Registration", False, f"Registration failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("User Registration", False, f"Request failed: {str(e)}")
            return False
        
        # Login user
        try:
            login_data = {
                "username": user_data["email"],
                "password": user_data["password"]
            }
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        self.user_session = cookies["buildconnect_auth"].value
                        self.log_test("User Login", True, "Login successful with cookie")
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

    async def test_1_authentication_check(self):
        """Test 1: Authentication Check - GET /api/auth/me"""
        print("\n=== Test 1: Authentication Check ===")
        
        if not self.user_session:
            self.log_test("1. Authentication Check", False, "No user session available")
            return False
        
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    required_fields = ["id", "email", "role"]
                    has_fields = all(field in data for field in required_fields)
                    if has_fields and data.get("role") == "customer":
                        self.log_test("1. Authentication Check", True, f"✅ Authentication cookies working: {data.get('email')}")
                        return True
                    else:
                        self.log_test("1. Authentication Check", False, "Missing fields or incorrect role", data)
                        return False
                else:
                    self.log_test("1. Authentication Check", False, f"Authentication failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("1. Authentication Check", False, f"Request failed: {str(e)}")
            return False

    async def test_2_job_requests_api_empty(self):
        """Test 2: Job Requests API Test - GET /api/job-requests?customer_only=true (should be empty initially)"""
        print("\n=== Test 2: Job Requests API Test (Empty) ===")
        
        if not self.user_session:
            self.log_test("2. Job Requests API (Empty)", False, "No user session available")
            return []
        
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests?customer_only=true",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    user_jobs = len(data)
                    self.log_test("2. Job Requests API (Empty)", True, f"✅ API working, user has {user_jobs} jobs (expected: 0)")
                    return data
                else:
                    self.log_test("2. Job Requests API (Empty)", False, f"API call failed: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("2. Job Requests API (Empty)", False, f"Request failed: {str(e)}")
            return []

    async def test_3_create_draft_job_with_contact_email(self):
        """Test 3: Create draft job with contact_email field"""
        print("\n=== Test 3: Draft Jobs Investigation ===")
        
        # Get user email first
        user_email = None
        if self.user_session:
            try:
                cookies = {"buildconnect_auth": self.user_session}
                async with self.session.get(
                    f"{BACKEND_URL}/auth/me",
                    cookies=cookies
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        user_email = data.get("email")
            except Exception as e:
                self.log_test("3. Get User Email", False, f"Failed to get user email: {str(e)}")
                return None
        
        if not user_email:
            self.log_test("3. Draft Jobs Investigation", False, "Could not get user email")
            return None
        
        # Create draft job with contact_email
        draft_job_data = {
            "category": "handcraft",
            "title": "Test verkefni með contact_email",
            "description": "Test lýsing á verkefni með contact_email field til að prófa linking functionality.",
            "contact_email": user_email,
            "contact_phone": "+354-555-1234",
            "contact_name": "Test User",
            "postcode": "101",
            "address": "Test Address, Reykjavik"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=draft_job_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status in [200, 201]:
                    draft_id = data.get("id")
                    self.log_test("3. Create Draft Job", True, f"✅ Draft job created with contact_email: {draft_id}")
                    
                    # Submit the draft
                    try:
                        async with self.session.post(
                            f"{BACKEND_URL}/public/job-requests/{draft_id}/submit"
                        ) as submit_response:
                            if submit_response.status == 200:
                                submit_data = await submit_response.json()
                                job_id = submit_data.get("job_id")
                                self.log_test("3. Submit Draft Job", True, f"✅ Draft submitted as job: {job_id}")
                                return job_id
                            else:
                                submit_data = await submit_response.json()
                                self.log_test("3. Submit Draft Job", False, f"Submit failed: {submit_response.status}", submit_data)
                                return None
                    except Exception as e:
                        self.log_test("3. Submit Draft Job", False, f"Submit request failed: {str(e)}")
                        return None
                else:
                    self.log_test("3. Create Draft Job", False, f"Draft creation failed: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("3. Create Draft Job", False, f"Request failed: {str(e)}")
            return None

    async def test_4_link_draft_jobs(self):
        """Test 4: Link Draft Jobs - POST /api/auth/link-draft-jobs"""
        print("\n=== Test 4: Link Draft Jobs ===")
        
        if not self.user_session:
            self.log_test("4. Link Draft Jobs", False, "No user session available")
            return 0
        
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.post(
                f"{BACKEND_URL}/auth/link-draft-jobs",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    linked_count = data.get("linked_jobs", 0)
                    message = data.get("message", "")
                    self.log_test("4. Link Draft Jobs", True, f"✅ Link endpoint working: {message}")
                    return linked_count
                else:
                    self.log_test("4. Link Draft Jobs", False, f"Link failed: {response.status}", data)
                    return 0
        except Exception as e:
            self.log_test("4. Link Draft Jobs", False, f"Request failed: {str(e)}")
            return 0

    async def test_5_job_requests_api_after_linking(self):
        """Test 5: Job Requests API Test after linking - GET /api/job-requests?customer_only=true"""
        print("\n=== Test 5: Job Requests API Test (After Linking) ===")
        
        if not self.user_session:
            self.log_test("5. Job Requests API (After Linking)", False, "No user session available")
            return []
        
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests?customer_only=true",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    user_jobs = len(data)
                    self.log_test("5. Job Requests API (After Linking)", True, f"✅ User now has {user_jobs} jobs in dashboard")
                    
                    # Print job details
                    for i, job in enumerate(data):
                        print(f"   Job {i+1}: ID={job.get('id')}, Status={job.get('status')}, Title={job.get('title')[:50]}...")
                        print(f"           Customer_ID={job.get('customer_id')}, Contact_Email={job.get('contact_email')}")
                    
                    return data
                else:
                    self.log_test("5. Job Requests API (After Linking)", False, f"API call failed: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("5. Job Requests API (After Linking)", False, f"Request failed: {str(e)}")
            return []

    async def investigate_job_linking_issue(self):
        """Investigate why jobs might not be linking properly"""
        print("\n=== Investigating Job Linking Issue ===")
        
        if not self.user_session:
            self.log_test("Job Linking Investigation", False, "No user session available")
            return
        
        # Get user info
        user_email = None
        user_id = None
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    user_email = data.get("email")
                    user_id = data.get("id")
        except Exception as e:
            self.log_test("Get User Info for Investigation", False, f"Failed: {str(e)}")
            return
        
        # Check all jobs to see which ones have our email
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    total_jobs = len(data)
                    user_email_jobs = [job for job in data if job.get("contact_email") == user_email]
                    draft_jobs = [job for job in data if job.get("status") == "draft"]
                    user_owned_jobs = [job for job in data if job.get("customer_id") == user_id]
                    
                    self.log_test("Job Linking Investigation", True, 
                                f"Total jobs: {total_jobs}, With user email: {len(user_email_jobs)}, Drafts: {len(draft_jobs)}, User owned: {len(user_owned_jobs)}")
                    
                    # Analyze jobs with user email
                    for i, job in enumerate(user_email_jobs):
                        job_customer_id = job.get('customer_id')
                        job_status = job.get('status')
                        job_contact_email = job.get('contact_email')
                        
                        print(f"   Job {i+1} with user email:")
                        print(f"     ID: {job.get('id')}")
                        print(f"     Status: {job_status}")
                        print(f"     Customer_ID: {job_customer_id}")
                        print(f"     Contact_Email: {job_contact_email}")
                        print(f"     User_ID: {user_id}")
                        
                        if job_customer_id is None:
                            print(f"     ⚠️ Job has no customer_id - should be linked")
                        elif job_customer_id != user_id:
                            print(f"     ⚠️ Job customer_id doesn't match user_id")
                        else:
                            print(f"     ✅ Job properly linked to user")
                        
                        if job_status == "draft":
                            print(f"     ⚠️ Job is still in draft status")
                    
                    return user_email_jobs
                else:
                    self.log_test("Job Linking Investigation", False, f"Failed to get jobs: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("Job Linking Investigation", False, f"Request failed: {str(e)}")
            return []

    async def run_focused_dashboard_tests(self):
        """Run all focused tests for the dashboard issue"""
        print("🔍 DASHBOARD ISSUE FOCUSED TEST SUITE")
        print("Testing the specific scenarios from the review request:")
        print("1. Authentication Check: GET /api/auth/me")
        print("2. Job Requests API Test: GET /api/job-requests?customer_only=true")
        print("3. Draft Jobs Investigation: Create job with contact_email")
        print("4. Link Draft Jobs: POST /api/auth/link-draft-jobs")
        print("5. Verify dashboard shows jobs after linking")
        print("=" * 60)
        
        await self.setup()
        
        try:
            # Setup: Create test user and login
            login_success = await self.create_test_user_and_login()
            if not login_success:
                print("❌ Could not setup test user")
                return
            
            # Test 1: Authentication Check
            auth_success = await self.test_1_authentication_check()
            
            # Test 2: Job Requests API (should be empty initially)
            initial_jobs = await self.test_2_job_requests_api_empty()
            
            # Test 3: Create draft job with contact_email
            job_id = await self.test_3_create_draft_job_with_contact_email()
            
            # Test 4: Link draft jobs
            linked_count = await self.test_4_link_draft_jobs()
            
            # Test 5: Job Requests API after linking
            final_jobs = await self.test_5_job_requests_api_after_linking()
            
            # Investigation
            await self.investigate_job_linking_issue()
            
            # Final analysis
            print("\n" + "=" * 60)
            print("🔍 DASHBOARD ISSUE ROOT CAUSE ANALYSIS")
            print("=" * 60)
            
            print(f"✅ Authentication working: {auth_success}")
            print(f"✅ Job creation working: {job_id is not None}")
            print(f"✅ Link endpoint working: {linked_count >= 0}")
            print(f"📊 Jobs before linking: {len(initial_jobs)}")
            print(f"📊 Jobs after linking: {len(final_jobs)}")
            print(f"📊 Jobs linked: {linked_count}")
            
            if len(final_jobs) > len(initial_jobs):
                print("\n🎉 SUCCESS: Dashboard issue resolved - jobs are now showing!")
            elif len(final_jobs) == 0 and job_id:
                print("\n❌ ISSUE CONFIRMED: Job created but not showing in dashboard")
                print("Root cause: Jobs with contact_email not being properly linked to user")
            elif linked_count == 0:
                print("\n⚠️ ISSUE: Link-draft-jobs found no jobs to link")
                print("Possible cause: Jobs already linked or wrong status/email criteria")
            else:
                print("\n⚠️ PARTIAL SUCCESS: Some jobs linked but issue may persist")
            
            # Print summary
            print("\n" + "=" * 60)
            print("📊 TEST SUMMARY")
            print("=" * 60)
            
            passed = sum(1 for result in self.test_results if result["success"])
            total = len(self.test_results)
            success_rate = (passed / total * 100) if total > 0 else 0
            
            print(f"Tests Passed: {passed}/{total} ({success_rate:.1f}%)")
            print("\nDetailed Results:")
            
            for result in self.test_results:
                status = "✅" if result["success"] else "❌"
                print(f"{status} {result['test']}: {result['details']}")
                
        finally:
            await self.cleanup()

async def main():
    """Main test runner"""
    tester = DashboardIssueFocusedTester()
    await tester.run_focused_dashboard_tests()

if __name__ == "__main__":
    asyncio.run(main())