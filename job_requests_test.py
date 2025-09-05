#!/usr/bin/env python3
"""
Job-Requests API Test Suite
Focused testing for job-requests endpoints as requested in the review
"""

import asyncio
import aiohttp
import json
import time
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://icejobs.preview.emergentagent.com/api"

class JobRequestsAPITester:
    def __init__(self):
        self.session = None
        self.test_results = []
        
    async def setup(self):
        """Setup test session"""
        self.session = aiohttp.ClientSession()
        
    async def cleanup(self):
        """Cleanup test session"""
        if self.session:
            await self.session.close()
    
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: any = None):
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
    
    async def test_job_requests_api_endpoints(self):
        """Test job-requests API endpoints for authentication, creation, and fetching"""
        print("\n=== Testing Job-Requests API Endpoints ===")
        
        # Create test user for authentication
        timestamp = str(int(time.time()))
        
        customer_data = {
            "email": f"job_test_customer_{timestamp}@example.com",
            "password": "JobTestCustomer123!",
            "role": "customer",
            "first_name": "Test",
            "last_name": "Customer",
            "phone": "+354-555-1234",
            "language": "en"
        }
        
        # Register and login customer
        customer_session = None
        try:
            # Register customer
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=customer_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    self.log_test("Job Test Customer Registration", True, "Customer registered for job testing")
                else:
                    data = await response.json()
                    self.log_test("Job Test Customer Registration", False, f"Registration failed: {response.status}", data)
                    return
            
            # Login customer
            login_data = {"username": customer_data["email"], "password": customer_data["password"]}
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        customer_session = cookies["buildconnect_auth"].value
                        self.log_test("Job Test Customer Login", True, "Customer logged in for job testing")
                    else:
                        self.log_test("Job Test Customer Login", False, "Login successful but no auth cookie")
                        return
                else:
                    self.log_test("Job Test Customer Login", False, f"Login failed: {response.status}")
                    return
        
        except Exception as e:
            self.log_test("Job Test User Setup", False, f"User setup failed: {str(e)}")
            return
        
        # Test 1: Authentication Check - Verify API requires authentication
        await self.test_job_requests_authentication_check()
        
        # Test 2: Create Job Request - Test POST /api/job-requests
        job_id = await self.test_create_job_request(customer_session)
        
        # Test 3: Fetch User Jobs - Test GET /api/job-requests
        await self.test_fetch_user_jobs(customer_session, job_id)
        
        # Test 4: Verify Job Data and User Linkage
        await self.test_verify_job_data_and_linkage(customer_session, job_id)
        
        # Test 5: Status Check - Verify job has correct default status
        await self.test_job_status_check(customer_session, job_id)
    
    async def test_job_requests_authentication_check(self):
        """Test that job-requests endpoints require authentication"""
        print("\n--- Testing Job-Requests Authentication Requirements ---")
        
        # Test POST /api/job-requests without authentication
        job_data = {
            "category": "handcraft",
            "title": "Test verkefni fyrir handcraft testing",
            "description": "Test lýsing á verkefni sem þarf að vera lengri en 30 stafir til að standast validation reglur",
            "postcode": "101",
            "address": "Reykjavik",
            "priority": "medium"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=job_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 401:
                    self.log_test("POST /api/job-requests (Unauthenticated)", True, "Job creation correctly requires authentication")
                else:
                    try:
                        data = await response.json()
                    except:
                        data = await response.text()
                    self.log_test("POST /api/job-requests (Unauthenticated)", False, f"Expected 401, got: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/job-requests (Unauthenticated)", False, f"Request failed: {str(e)}")
        
        # Test GET /api/job-requests without authentication (should work but with limited access)
        try:
            async with self.session.get(f"{BACKEND_URL}/job-requests/") as response:
                if response.status == 200:
                    try:
                        data = await response.json()
                        self.log_test("GET /api/job-requests (Unauthenticated)", True, f"Public job listing works: {len(data)} jobs returned")
                    except:
                        # If we can't parse JSON, it might be HTML or other content
                        content_type = response.headers.get('content-type', '')
                        self.log_test("GET /api/job-requests (Unauthenticated)", False, f"Response not JSON: {content_type}")
                else:
                    try:
                        data = await response.json()
                    except:
                        data = await response.text()
                    self.log_test("GET /api/job-requests (Unauthenticated)", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (Unauthenticated)", False, f"Request failed: {str(e)}")
    
    async def test_create_job_request(self, customer_session):
        """Test POST /api/job-requests with sample job data"""
        print("\n--- Testing Job Request Creation ---")
        
        if not customer_session:
            self.log_test("Job Creation Test", False, "No customer session available")
            return None
        
        # Sample job data as specified in the request (with proper validation lengths)
        job_data = {
            "category": "handcraft",
            "title": "Test verkefni fyrir handcraft testing",
            "description": "Test lýsing á verkefni sem þarf að vera lengri en 30 stafir til að standast validation reglur",
            "postcode": "101",
            "address": "Reykjavik",
            "priority": "medium"
        }
        
        try:
            cookies = {"buildconnect_auth": customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=job_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                try:
                    data = await response.json()
                except:
                    data = await response.text()
                
                if response.status == 200:
                    # Verify response structure
                    required_fields = ["id", "customer_id", "category", "title", "description", "postcode", "address", "priority", "status"]
                    has_all_fields = all(field in data for field in required_fields)
                    
                    # Verify data matches what we sent
                    data_matches = (
                        data.get("category") == job_data["category"] and
                        data.get("title") == job_data["title"] and
                        data.get("description") == job_data["description"] and
                        data.get("postcode") == job_data["postcode"] and
                        data.get("address") == job_data["address"] and
                        data.get("priority") == job_data["priority"]
                    )
                    
                    if has_all_fields and data_matches:
                        job_id = data.get("id")
                        self.log_test("POST /api/job-requests (Valid Data)", True, f"Job created successfully with ID: {job_id}")
                        return job_id
                    else:
                        self.log_test("POST /api/job-requests (Valid Data)", False, "Response missing fields or data mismatch", data)
                        return None
                else:
                    self.log_test("POST /api/job-requests (Valid Data)", False, f"Job creation failed: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("POST /api/job-requests (Valid Data)", False, f"Request failed: {str(e)}")
            return None
    
    async def test_fetch_user_jobs(self, customer_session, job_id):
        """Test GET /api/job-requests to retrieve user's jobs"""
        print("\n--- Testing User Jobs Retrieval ---")
        
        if not customer_session:
            self.log_test("User Jobs Retrieval Test", False, "No customer session available")
            return
        
        try:
            cookies = {"buildconnect_auth": customer_session}
            
            # Test getting all jobs for the user
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?customer_only=true",
                cookies=cookies
            ) as response:
                try:
                    data = await response.json()
                except:
                    content_type = response.headers.get('content-type', '')
                    self.log_test("GET /api/job-requests (User Jobs)", False, f"Response not JSON: {content_type}, Status: {response.status}")
                    return
                
                if response.status == 200 and isinstance(data, list):
                    # Check if our created job is in the list
                    job_found = False
                    if job_id:
                        job_found = any(job.get("id") == job_id for job in data)
                    
                    if job_found or len(data) > 0:
                        self.log_test("GET /api/job-requests (User Jobs)", True, f"Retrieved {len(data)} user jobs, created job found: {job_found}")
                    else:
                        self.log_test("GET /api/job-requests (User Jobs)", False, f"No jobs found for user, expected at least 1")
                else:
                    self.log_test("GET /api/job-requests (User Jobs)", False, f"Failed to get user jobs: {response.status}", data)
            
            # Test getting all jobs (public view)
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/",
                cookies=cookies
            ) as response:
                try:
                    data = await response.json()
                    if response.status == 200 and isinstance(data, list):
                        self.log_test("GET /api/job-requests (All Jobs)", True, f"Retrieved {len(data)} total jobs")
                    else:
                        self.log_test("GET /api/job-requests (All Jobs)", False, f"Failed to get all jobs: {response.status}", data)
                except:
                    content_type = response.headers.get('content-type', '')
                    self.log_test("GET /api/job-requests (All Jobs)", False, f"Response not JSON: {content_type}, Status: {response.status}")
        
        except Exception as e:
            self.log_test("User Jobs Retrieval Test", False, f"Request failed: {str(e)}")
    
    async def test_verify_job_data_and_linkage(self, customer_session, job_id):
        """Test that job is properly linked to authenticated user"""
        print("\n--- Testing Job Data and User Linkage ---")
        
        if not customer_session or not job_id:
            self.log_test("Job Data Verification Test", False, "No customer session or job ID available")
            return
        
        try:
            cookies = {"buildconnect_auth": customer_session}
            
            # Get current user info to verify customer_id
            async with self.session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                user_data = await response.json()
                if response.status != 200:
                    self.log_test("Get Current User", False, f"Failed to get user info: {response.status}")
                    return
                
                user_id = user_data.get("id")
                if not user_id:
                    self.log_test("Get Current User", False, "No user ID in response")
                    return
            
            # Get the specific job and verify linkage
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/{job_id}",
                cookies=cookies
            ) as response:
                job_data = await response.json()
                
                if response.status == 200:
                    # Verify job is linked to current user
                    job_customer_id = job_data.get("customer_id")
                    
                    # Verify all required fields for dashboard display
                    required_fields = ["id", "customer_id", "category", "title", "description", "postcode", "status", "posted_at", "priority"]
                    has_all_fields = all(field in job_data for field in required_fields)
                    
                    if job_customer_id == user_id and has_all_fields:
                        self.log_test("Job User Linkage Verification", True, f"Job correctly linked to user {user_id}")
                        self.log_test("Job Dashboard Fields", True, "Job has all required fields for dashboard display")
                    elif job_customer_id != user_id:
                        self.log_test("Job User Linkage Verification", False, f"Job customer_id {job_customer_id} doesn't match user_id {user_id}")
                    else:
                        self.log_test("Job Dashboard Fields", False, "Job missing required fields for dashboard", job_data)
                else:
                    self.log_test("Job Data Verification", False, f"Failed to get job data: {response.status}", job_data)
        
        except Exception as e:
            self.log_test("Job Data Verification Test", False, f"Request failed: {str(e)}")
    
    async def test_job_status_check(self, customer_session, job_id):
        """Test that job has correct default status"""
        print("\n--- Testing Job Status Check ---")
        
        if not customer_session or not job_id:
            self.log_test("Job Status Check Test", False, "No customer session or job ID available")
            return
        
        try:
            cookies = {"buildconnect_auth": customer_session}
            
            # Get the job and check its status
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/{job_id}",
                cookies=cookies
            ) as response:
                job_data = await response.json()
                
                if response.status == 200:
                    job_status = job_data.get("status")
                    
                    # Check if status is either "draft" or "open" as expected
                    if job_status in ["draft", "open"]:
                        self.log_test("Job Default Status Check", True, f"Job has correct default status: {job_status}")
                        
                        # Additional validation: check if status makes sense for the creation method
                        if job_status == "draft":
                            self.log_test("Job Status Logic", True, "Job created with 'draft' status (normal for incomplete jobs)")
                        elif job_status == "open":
                            self.log_test("Job Status Logic", True, "Job created with 'open' status (ready for quotes)")
                    else:
                        self.log_test("Job Default Status Check", False, f"Unexpected job status: {job_status}, expected 'draft' or 'open'")
                    
                    # Verify other status-related fields
                    posted_at = job_data.get("posted_at")
                    if posted_at:
                        self.log_test("Job Posted Timestamp", True, f"Job has posted_at timestamp: {posted_at}")
                    else:
                        self.log_test("Job Posted Timestamp", False, "Job missing posted_at timestamp")
                else:
                    self.log_test("Job Status Check", False, f"Failed to get job for status check: {response.status}", job_data)
        
        except Exception as e:
            self.log_test("Job Status Check Test", False, f"Request failed: {str(e)}")

    async def run_tests(self):
        """Run all job-requests tests"""
        print("🚀 Starting Job-Requests API Test Suite")
        print(f"Backend URL: {BACKEND_URL}")
        print("=" * 80)
        
        await self.setup()
        
        try:
            await self.test_job_requests_api_endpoints()
            
            # Print summary
            self.print_test_summary()
            
        finally:
            await self.cleanup()
    
    def print_test_summary(self):
        """Print test results summary"""
        print("\n" + "=" * 80)
        print("📊 JOB-REQUESTS API TEST RESULTS SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   ❌ {result['test']}: {result['details']}")
        
        print("\n" + "=" * 80)
        
        return passed_tests, failed_tests, self.test_results

if __name__ == "__main__":
    async def main():
        tester = JobRequestsAPITester()
        await tester.run_tests()
    
    asyncio.run(main())