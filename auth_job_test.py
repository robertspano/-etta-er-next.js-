#!/usr/bin/env python3
"""
Authentication and Job Requests API Test
Focused testing for the dashboard job display issue with verki@verki.is user
"""

import asyncio
import aiohttp
import json
from datetime import datetime
from typing import Dict, Any, Optional

# Get backend URL from environment
BACKEND_URL = "https://byggja-verki.preview.emergentagent.com/api"

class AuthJobTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.auth_cookie = None
        self.user_data = None
        
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

    async def test_auto_login_api(self, email: str, password: str):
        """Test the auto-login API endpoint"""
        print(f"\n=== Testing Auto-Login API for {email} ===")
        
        login_data = {
            "email": email,
            "password": password
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/auto-login",
                json=login_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 200 and data.get("success") is True:
                    user_info = data.get("user", {})
                    self.user_data = user_info
                    self.log_test("POST /api/auth/auto-login", True, 
                                f"Auto-login successful for {email}, User ID: {user_info.get('id')}")
                    return True
                else:
                    self.log_test("POST /api/auth/auto-login", False, 
                                f"Auto-login failed: {response.status}", data)
                    return False
                    
        except Exception as e:
            self.log_test("POST /api/auth/auto-login", False, f"Request failed: {str(e)}")
            return False

    async def test_cookie_login_api(self, email: str, password: str):
        """Test the cookie-based login API endpoint"""
        print(f"\n=== Testing Cookie Login API for {email} ===")
        
        login_data = {
            "username": email,
            "password": password
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                
                if response.status == 204:
                    # Successful login - check for cookies
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        self.auth_cookie = cookies["buildconnect_auth"].value
                        self.log_test("POST /api/auth/cookie/login", True, 
                                    f"Cookie login successful for {email}, Auth cookie received")
                        return True
                    else:
                        self.log_test("POST /api/auth/cookie/login", False, 
                                    "Login successful but no auth cookie received")
                        return False
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("POST /api/auth/cookie/login", False, 
                                f"Cookie login failed: {response.status}", data)
                    return False
                    
        except Exception as e:
            self.log_test("POST /api/auth/cookie/login", False, f"Request failed: {str(e)}")
            return False

    async def test_get_current_user(self):
        """Test getting current user info with authentication"""
        print(f"\n=== Testing Get Current User Info ===")
        
        if not self.auth_cookie:
            self.log_test("GET /api/auth/me", False, "No auth cookie available")
            return False
            
        try:
            cookies = {"buildconnect_auth": self.auth_cookie}
            async with self.session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                data = await response.json()
                
                if response.status == 200:
                    required_fields = ["id", "email", "role"]
                    has_fields = all(field in data for field in required_fields)
                    if has_fields:
                        self.user_data = data
                        self.log_test("GET /api/auth/me", True, 
                                    f"User info retrieved: {data.get('email')}, Role: {data.get('role')}")
                        return True
                    else:
                        self.log_test("GET /api/auth/me", False, "Missing required fields", data)
                        return False
                else:
                    self.log_test("GET /api/auth/me", False, 
                                f"Failed to get user info: {response.status}", data)
                    return False
                    
        except Exception as e:
            self.log_test("GET /api/auth/me", False, f"Request failed: {str(e)}")
            return False

    async def test_job_requests_api_authenticated(self):
        """Test job requests API with authentication"""
        print(f"\n=== Testing Job Requests API with Authentication ===")
        
        if not self.auth_cookie:
            self.log_test("GET /api/job-requests (Authenticated)", False, "No auth cookie available")
            return False
            
        try:
            cookies = {"buildconnect_auth": self.auth_cookie}
            
            # Test 1: Get all job requests for current user
            async with self.session.get(
                f"{BACKEND_URL}/job-requests?customer_only=true",
                cookies=cookies
            ) as response:
                data = await response.json()
                
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/job-requests (customer_only=true)", True, 
                                f"Retrieved {len(data)} job requests for authenticated user")
                    
                    # Check if jobs have required fields for dashboard
                    if len(data) > 0:
                        first_job = data[0]
                        required_fields = ["id", "customer_id", "category", "title", "description", 
                                         "postcode", "status", "posted_at"]
                        has_all_fields = all(field in first_job for field in required_fields)
                        
                        if has_all_fields:
                            self.log_test("Job Data Structure Validation", True, 
                                        "Jobs have all required fields for dashboard display")
                            
                            # Check if jobs are linked to current user
                            user_id = self.user_data.get("id") if self.user_data else None
                            if user_id and first_job.get("customer_id") == user_id:
                                self.log_test("Job User Linking", True, 
                                            "Jobs are correctly linked to authenticated user")
                            else:
                                self.log_test("Job User Linking", False, 
                                            f"Job customer_id ({first_job.get('customer_id')}) doesn't match user ID ({user_id})")
                        else:
                            missing_fields = [f for f in required_fields if f not in first_job]
                            self.log_test("Job Data Structure Validation", False, 
                                        f"Missing required fields: {missing_fields}", first_job)
                    else:
                        self.log_test("User Jobs Found", False, 
                                    "No jobs found for authenticated user - this may be the dashboard issue")
                    
                    return True
                else:
                    self.log_test("GET /api/job-requests (customer_only=true)", False, 
                                f"Unexpected response: {response.status}", data)
                    return False
                    
        except Exception as e:
            self.log_test("GET /api/job-requests (Authenticated)", False, f"Request failed: {str(e)}")
            return False

    async def test_job_requests_api_unauthenticated(self):
        """Test job requests API without authentication"""
        print(f"\n=== Testing Job Requests API without Authentication ===")
        
        try:
            # Test without cookies
            async with self.session.get(f"{BACKEND_URL}/job-requests") as response:
                data = await response.json()
                
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/job-requests (Unauthenticated)", True, 
                                f"Retrieved {len(data)} public job requests")
                    return True
                else:
                    self.log_test("GET /api/job-requests (Unauthenticated)", False, 
                                f"Unexpected response: {response.status}", data)
                    return False
                    
        except Exception as e:
            self.log_test("GET /api/job-requests (Unauthenticated)", False, f"Request failed: {str(e)}")
            return False

    async def check_jobs_for_user_email(self, email: str):
        """Check what jobs exist for the specific user email"""
        print(f"\n=== Checking Jobs for User Email: {email} ===")
        
        try:
            # Get all jobs and check for ones with matching email
            async with self.session.get(f"{BACKEND_URL}/job-requests") as response:
                data = await response.json()
                
                if response.status == 200 and isinstance(data, list):
                    # Look for jobs that might belong to this user
                    user_jobs = []
                    for job in data:
                        # Check if job has contact_email matching our user
                        if job.get("contact_email") == email:
                            user_jobs.append(job)
                        # Also check if customer_id matches (if we have user data)
                        elif self.user_data and job.get("customer_id") == self.user_data.get("id"):
                            user_jobs.append(job)
                    
                    if user_jobs:
                        self.log_test("Jobs Found for User Email", True, 
                                    f"Found {len(user_jobs)} jobs potentially belonging to {email}")
                        
                        # Check job statuses
                        statuses = [job.get("status") for job in user_jobs]
                        open_jobs = [job for job in user_jobs if job.get("status") == "open"]
                        draft_jobs = [job for job in user_jobs if job.get("status") == "draft"]
                        
                        self.log_test("Job Status Analysis", True, 
                                    f"Job statuses: {statuses}, Open: {len(open_jobs)}, Draft: {len(draft_jobs)}")
                        
                        return user_jobs
                    else:
                        self.log_test("Jobs Found for User Email", False, 
                                    f"No jobs found for email {email} in database")
                        return []
                else:
                    self.log_test("Jobs Database Check", False, 
                                f"Failed to retrieve jobs: {response.status}", data)
                    return []
                    
        except Exception as e:
            self.log_test("Jobs Database Check", False, f"Request failed: {str(e)}")
            return []

    async def test_create_test_job(self):
        """Create a test job for the authenticated user"""
        print(f"\n=== Creating Test Job for Authenticated User ===")
        
        if not self.auth_cookie:
            self.log_test("Create Test Job", False, "No auth cookie available")
            return False
            
        job_data = {
            "category": "handcraft",
            "title": "Test verkefni fyrir dashboard testing",
            "description": "Test lýsing á verkefni til að prófa dashboard virkni. Þetta er test verkefni sem á að birtast í dashboard.",
            "postcode": "101",
            "address": "Reykjavik Test Address",
            "priority": "medium",
            "budget_min": 50000,
            "budget_max": 100000
        }
        
        try:
            cookies = {"buildconnect_auth": self.auth_cookie}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests",
                json=job_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 200:
                    job_id = data.get("id")
                    self.log_test("Create Test Job", True, 
                                f"Test job created successfully with ID: {job_id}")
                    return job_id
                else:
                    self.log_test("Create Test Job", False, 
                                f"Failed to create test job: {response.status}", data)
                    return None
                    
        except Exception as e:
            self.log_test("Create Test Job", False, f"Request failed: {str(e)}")
            return None

    async def run_comprehensive_auth_job_test(self):
        """Run comprehensive authentication and job requests testing"""
        print("🔍 AUTHENTICATION & JOB REQUESTS API TESTING")
        print("=" * 60)
        
        email = "verki@verki.is"
        password = "Lindarbraut31"
        
        await self.setup()
        
        try:
            # Step 1: Test Auto-Login API
            auto_login_success = await self.test_auto_login_api(email, password)
            
            # Step 2: Test Cookie-Based Login API
            cookie_login_success = await self.test_cookie_login_api(email, password)
            
            # Step 3: Test Get Current User Info
            if cookie_login_success:
                user_info_success = await self.test_get_current_user()
            else:
                user_info_success = False
            
            # Step 4: Test Job Requests API with Authentication
            if cookie_login_success:
                auth_jobs_success = await self.test_job_requests_api_authenticated()
            else:
                auth_jobs_success = False
            
            # Step 5: Test Job Requests API without Authentication
            unauth_jobs_success = await self.test_job_requests_api_unauthenticated()
            
            # Step 6: Check Jobs for User Email
            user_jobs = await self.check_jobs_for_user_email(email)
            
            # Step 7: Create Test Job if authenticated
            if cookie_login_success:
                test_job_id = await self.test_create_test_job()
                
                # Step 8: Re-test job retrieval after creating test job
                if test_job_id:
                    print(f"\n=== Re-testing Job Retrieval After Creating Test Job ===")
                    await self.test_job_requests_api_authenticated()
            
            # Summary
            print(f"\n{'='*60}")
            print("🔍 AUTHENTICATION & JOB REQUESTS TEST SUMMARY")
            print(f"{'='*60}")
            
            total_tests = len(self.test_results)
            passed_tests = sum(1 for result in self.test_results if result["success"])
            success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
            
            print(f"Total Tests: {total_tests}")
            print(f"Passed: {passed_tests}")
            print(f"Failed: {total_tests - passed_tests}")
            print(f"Success Rate: {success_rate:.1f}%")
            
            print(f"\n🔑 AUTHENTICATION RESULTS:")
            print(f"   Auto-Login API: {'✅ Working' if auto_login_success else '❌ Failed'}")
            print(f"   Cookie Login API: {'✅ Working' if cookie_login_success else '❌ Failed'}")
            print(f"   User Info Retrieval: {'✅ Working' if user_info_success else '❌ Failed'}")
            
            print(f"\n📋 JOB REQUESTS RESULTS:")
            print(f"   Authenticated Job Requests: {'✅ Working' if auth_jobs_success else '❌ Failed'}")
            print(f"   Unauthenticated Job Requests: {'✅ Working' if unauth_jobs_success else '❌ Failed'}")
            print(f"   Jobs Found for {email}: {len(user_jobs) if user_jobs else 0}")
            
            # Identify potential issues
            print(f"\n🚨 POTENTIAL DASHBOARD ISSUES:")
            if not cookie_login_success:
                print("   ❌ Cookie-based authentication not working - dashboard can't authenticate user")
            if not auth_jobs_success:
                print("   ❌ Authenticated job requests API not working - dashboard can't fetch user jobs")
            if cookie_login_success and auth_jobs_success and len(user_jobs) == 0:
                print("   ❌ No jobs found for user - dashboard will be empty")
            if cookie_login_success and auth_jobs_success and len(user_jobs) > 0:
                print("   ✅ Authentication and job retrieval working - dashboard should show jobs")
            
        finally:
            await self.cleanup()

async def main():
    """Main test execution"""
    tester = AuthJobTester()
    await tester.run_comprehensive_auth_job_test()

if __name__ == "__main__":
    asyncio.run(main())