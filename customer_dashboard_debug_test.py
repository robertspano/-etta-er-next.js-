#!/usr/bin/env python3
"""
Customer Dashboard Debug Test Suite
Focused testing for the customer dashboard jobs not displaying issue
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://byggja-verki.preview.emergentagent.com/api"

class CustomerDashboardDebugTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.user_session = None
        self.user_id = None
        self.test_job_id = None
        
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
        """Create a test user and login to get session"""
        print("\n=== Creating Test User and Login ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Test user data
        user_data = {
            "email": f"dashboard_test_{timestamp}@example.com",
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

    async def test_authentication_check(self):
        """Test GET /api/auth/me to verify authentication cookies are working"""
        print("\n=== Testing Authentication Check ===")
        
        if not self.user_session:
            self.log_test("Authentication Check", False, "No user session available")
            return
        
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
                        self.log_test("GET /api/auth/me", True, f"Authentication working: {data.get('email')}")
                        return True
                    else:
                        self.log_test("GET /api/auth/me", False, "Missing fields or incorrect role", data)
                        return False
                else:
                    self.log_test("GET /api/auth/me", False, f"Authentication failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("GET /api/auth/me", False, f"Request failed: {str(e)}")
            return False

    async def create_draft_job_with_contact_email(self):
        """Create a draft job with contact_email field for linking test"""
        print("\n=== Creating Draft Job with Contact Email ===")
        
        if not self.user_session:
            self.log_test("Create Draft Job", False, "No user session available")
            return None
        
        # Get user email from auth/me
        user_email = None
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
            self.log_test("Get User Email", False, f"Failed to get user email: {str(e)}")
            return None
        
        if not user_email:
            self.log_test("Create Draft Job", False, "Could not get user email")
            return None
        
        # Create draft job using public API (simulating guest creation)
        draft_job_data = {
            "category": "handcraft",
            "title": "Test verkefni fyrir dashboard testing",
            "description": "Test lýsing á verkefni fyrir dashboard testing. Þetta er test verkefni til að prófa hvort dashboard sýnir verkefni rétt.",
            "contact_email": user_email,  # This should link to user after login
            "contact_phone": "+354-555-1234",
            "contact_name": "Dashboard Tester",
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
                    self.log_test("Create Draft Job", True, f"Draft job created with ID: {draft_id}")
                    
                    # Submit the draft to make it a real job
                    try:
                        async with self.session.post(
                            f"{BACKEND_URL}/public/job-requests/{draft_id}/submit"
                        ) as submit_response:
                            if submit_response.status == 200:
                                submit_data = await submit_response.json()
                                job_id = submit_data.get("job_id")
                                self.test_job_id = job_id
                                self.log_test("Submit Draft Job", True, f"Draft submitted as job: {job_id}")
                                return job_id
                            else:
                                submit_data = await submit_response.json()
                                self.log_test("Submit Draft Job", False, f"Submit failed: {submit_response.status}", submit_data)
                                return None
                    except Exception as e:
                        self.log_test("Submit Draft Job", False, f"Submit request failed: {str(e)}")
                        return None
                else:
                    self.log_test("Create Draft Job", False, f"Draft creation failed: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("Create Draft Job", False, f"Request failed: {str(e)}")
            return None

    async def test_draft_jobs_investigation(self):
        """Check if there are any draft jobs in the database with contact_email fields"""
        print("\n=== Investigating Draft Jobs in Database ===")
        
        # Since we can't directly access the database, we'll check via API
        # Look for jobs that might be drafts or unlinked
        
        try:
            # Try to get all job requests without authentication to see what's visible
            async with self.session.get(f"{BACKEND_URL}/job-requests") as response:
                data = await response.json()
                if response.status == 200:
                    draft_jobs = [job for job in data if job.get("status") == "draft"]
                    self.log_test("Draft Jobs Investigation (Public)", True, f"Found {len(draft_jobs)} draft jobs visible publicly")
                else:
                    self.log_test("Draft Jobs Investigation (Public)", False, f"Failed to get jobs: {response.status}", data)
        except Exception as e:
            self.log_test("Draft Jobs Investigation (Public)", False, f"Request failed: {str(e)}")
        
        # Check with authentication
        if self.user_session:
            try:
                cookies = {"buildconnect_auth": self.user_session}
                async with self.session.get(
                    f"{BACKEND_URL}/job-requests",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        all_jobs = len(data)
                        draft_jobs = [job for job in data if job.get("status") == "draft"]
                        open_jobs = [job for job in data if job.get("status") == "open"]
                        self.log_test("Draft Jobs Investigation (Authenticated)", True, 
                                    f"Total jobs: {all_jobs}, Draft: {len(draft_jobs)}, Open: {len(open_jobs)}")
                    else:
                        self.log_test("Draft Jobs Investigation (Authenticated)", False, f"Failed to get jobs: {response.status}", data)
            except Exception as e:
                self.log_test("Draft Jobs Investigation (Authenticated)", False, f"Request failed: {str(e)}")

    async def test_link_draft_jobs(self):
        """Test POST /api/auth/link-draft-jobs to link draft jobs to authenticated users"""
        print("\n=== Testing Link Draft Jobs ===")
        
        if not self.user_session:
            self.log_test("Link Draft Jobs", False, "No user session available")
            return
        
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.post(
                f"{BACKEND_URL}/auth/link-draft-jobs",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    linked_count = data.get("linked_jobs", 0)
                    self.log_test("POST /api/auth/link-draft-jobs", True, f"Linked {linked_count} draft jobs to user")
                    return linked_count
                else:
                    self.log_test("POST /api/auth/link-draft-jobs", False, f"Link failed: {response.status}", data)
                    return 0
        except Exception as e:
            self.log_test("POST /api/auth/link-draft-jobs", False, f"Request failed: {str(e)}")
            return 0

    async def test_job_requests_api_customer_only(self):
        """Test GET /api/job-requests with customer_only=true parameter"""
        print("\n=== Testing Job Requests API with customer_only=true ===")
        
        if not self.user_session:
            self.log_test("Job Requests API (customer_only)", False, "No user session available")
            return
        
        try:
            cookies = {"buildconnect_auth": self.user_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests?customer_only=true",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    user_jobs = len(data)
                    self.log_test("GET /api/job-requests?customer_only=true", True, f"Retrieved {user_jobs} user jobs")
                    
                    # Check if our test job is in the results
                    if self.test_job_id:
                        job_found = any(job.get("id") == self.test_job_id for job in data)
                        if job_found:
                            self.log_test("Test Job Found in Results", True, "Created test job found in user's jobs")
                        else:
                            self.log_test("Test Job Found in Results", False, "Created test job NOT found in user's jobs")
                            # Print all job IDs for debugging
                            job_ids = [job.get("id") for job in data]
                            print(f"   Available job IDs: {job_ids}")
                            print(f"   Looking for job ID: {self.test_job_id}")
                    
                    # Check job details
                    for i, job in enumerate(data):
                        print(f"   Job {i+1}: ID={job.get('id')}, Status={job.get('status')}, Customer_ID={job.get('customer_id')}")
                    
                    return data
                else:
                    self.log_test("GET /api/job-requests?customer_only=true", False, f"API call failed: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("GET /api/job-requests?customer_only=true", False, f"Request failed: {str(e)}")
            return []

    async def test_complete_workflow(self):
        """Test the complete workflow from draft creation to dashboard display"""
        print("\n=== Testing Complete Customer Dashboard Workflow ===")
        
        # Step 1: Create test user and login
        login_success = await self.create_test_user_and_login()
        if not login_success:
            self.log_test("Complete Workflow", False, "Failed to create user or login")
            return
        
        # Step 2: Test authentication
        auth_success = await self.test_authentication_check()
        if not auth_success:
            self.log_test("Complete Workflow", False, "Authentication check failed")
            return
        
        # Step 3: Create draft job with contact email
        job_id = await self.create_draft_job_with_contact_email()
        if not job_id:
            self.log_test("Complete Workflow", False, "Failed to create draft job")
            return
        
        # Step 4: Investigate draft jobs
        await self.test_draft_jobs_investigation()
        
        # Step 5: Link draft jobs to user
        linked_count = await self.test_link_draft_jobs()
        
        # Step 6: Test customer dashboard API
        user_jobs = await self.test_job_requests_api_customer_only()
        
        # Final analysis
        if len(user_jobs) > 0:
            self.log_test("Complete Workflow", True, f"SUCCESS: Customer dashboard shows {len(user_jobs)} jobs")
        else:
            self.log_test("Complete Workflow", False, "ISSUE: Customer dashboard shows no jobs despite job creation and linking")

    async def run_debug_tests(self):
        """Run all debug tests for customer dashboard issue"""
        print("🔍 CUSTOMER DASHBOARD DEBUG TEST SUITE")
        print("=" * 60)
        
        await self.setup()
        
        try:
            await self.test_complete_workflow()
            
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
            
            # Specific analysis for the dashboard issue
            print("\n" + "=" * 60)
            print("🔍 DASHBOARD ISSUE ANALYSIS")
            print("=" * 60)
            
            auth_working = any(r["test"] == "GET /api/auth/me" and r["success"] for r in self.test_results)
            jobs_api_working = any(r["test"] == "GET /api/job-requests?customer_only=true" and r["success"] for r in self.test_results)
            job_creation_working = any(r["test"] == "Submit Draft Job" and r["success"] for r in self.test_results)
            
            print(f"Authentication: {'✅ Working' if auth_working else '❌ Failed'}")
            print(f"Job Creation: {'✅ Working' if job_creation_working else '❌ Failed'}")
            print(f"Customer Jobs API: {'✅ Working' if jobs_api_working else '❌ Failed'}")
            
            if auth_working and job_creation_working and jobs_api_working:
                print("\n🎉 All core components working - issue may be in frontend or data linking")
            else:
                print("\n⚠️ Found issues in core backend components")
                
        finally:
            await self.cleanup()

async def main():
    """Main test runner"""
    tester = CustomerDashboardDebugTester()
    await tester.run_debug_tests()

if __name__ == "__main__":
    asyncio.run(main())