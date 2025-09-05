#!/usr/bin/env python3
"""
Dashboard Issue Corrected Test Suite
Testing with the correct field names for the API
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://icejobs.preview.emergentagent.com/api"

class DashboardIssueCorrectedTester:
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
            "email": f"corrected_test_{timestamp}@example.com",
            "password": "TestPassword123!",
            "role": "customer",
            "first_name": "Corrected",
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
                    return False, None
        except Exception as e:
            self.log_test("User Registration", False, f"Request failed: {str(e)}")
            return False, None
        
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
                        return True, user_data["email"]
                    else:
                        self.log_test("User Login", False, "Login successful but no auth cookie")
                        return False, None
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("User Login", False, f"Login failed: {response.status}", data)
                    return False, None
        except Exception as e:
            self.log_test("User Login", False, f"Request failed: {str(e)}")
            return False, None

    async def create_draft_job_with_correct_email_field(self, user_email):
        """Create draft job with correct email field name"""
        print("\n=== Creating Draft Job with Correct Email Field ===")
        
        # Create draft job with email field (not contact_email)
        draft_job_data = {
            "category": "handcraft",
            "title": "Test verkefni með email field",
            "description": "Test lýsing á verkefni með email field til að prófa linking functionality. Þetta ætti að virka rétt.",
            "email": user_email,  # Correct field name
            "phone": "+354-555-1234",
            "first_name": "Test",
            "last_name": "User",
            "postcode": "101"
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
                    self.log_test("Create Draft Job (Correct)", True, f"✅ Draft job created with email field: {draft_id}")
                    
                    # Submit the draft
                    try:
                        async with self.session.post(
                            f"{BACKEND_URL}/public/job-requests/{draft_id}/submit"
                        ) as submit_response:
                            if submit_response.status == 200:
                                submit_data = await submit_response.json()
                                job_id = submit_data.get("job_id")
                                self.log_test("Submit Draft Job (Correct)", True, f"✅ Draft submitted as job: {job_id}")
                                return job_id
                            else:
                                submit_data = await submit_response.json()
                                self.log_test("Submit Draft Job (Correct)", False, f"Submit failed: {submit_response.status}", submit_data)
                                return None
                    except Exception as e:
                        self.log_test("Submit Draft Job (Correct)", False, f"Submit request failed: {str(e)}")
                        return None
                else:
                    self.log_test("Create Draft Job (Correct)", False, f"Draft creation failed: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("Create Draft Job (Correct)", False, f"Request failed: {str(e)}")
            return None

    async def test_dashboard_before_linking(self):
        """Test dashboard before linking"""
        print("\n=== Testing Dashboard Before Linking ===")
        
        if not self.user_session:
            self.log_test("Dashboard Before Linking", False, "No user session available")
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
                    self.log_test("Dashboard Before Linking", True, f"User has {user_jobs} jobs before linking")
                    return data
                else:
                    self.log_test("Dashboard Before Linking", False, f"API call failed: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("Dashboard Before Linking", False, f"Request failed: {str(e)}")
            return []

    async def test_link_draft_jobs(self):
        """Test linking draft jobs"""
        print("\n=== Testing Link Draft Jobs ===")
        
        if not self.user_session:
            self.log_test("Link Draft Jobs", False, "No user session available")
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
                    self.log_test("Link Draft Jobs", True, f"✅ Linked {linked_count} jobs: {message}")
                    return linked_count
                else:
                    self.log_test("Link Draft Jobs", False, f"Link failed: {response.status}", data)
                    return 0
        except Exception as e:
            self.log_test("Link Draft Jobs", False, f"Request failed: {str(e)}")
            return 0

    async def test_dashboard_after_linking(self):
        """Test dashboard after linking"""
        print("\n=== Testing Dashboard After Linking ===")
        
        if not self.user_session:
            self.log_test("Dashboard After Linking", False, "No user session available")
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
                    self.log_test("Dashboard After Linking", True, f"✅ User has {user_jobs} jobs after linking")
                    
                    # Print job details
                    for i, job in enumerate(data):
                        print(f"   Job {i+1}: ID={job.get('id')}, Status={job.get('status')}")
                        print(f"           Title={job.get('title')[:50]}...")
                        print(f"           Customer_ID={job.get('customer_id')}")
                        print(f"           Contact_Email={job.get('contact_email')}")
                    
                    return data
                else:
                    self.log_test("Dashboard After Linking", False, f"API call failed: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("Dashboard After Linking", False, f"Request failed: {str(e)}")
            return []

    async def investigate_jobs_with_user_email(self, user_email):
        """Investigate all jobs to find ones with user email"""
        print("\n=== Investigating Jobs with User Email ===")
        
        if not self.user_session:
            self.log_test("Investigate Jobs", False, "No user session available")
            return []
        
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
                    
                    self.log_test("Investigate Jobs", True, 
                                f"Total: {total_jobs}, With user email: {len(user_email_jobs)}, Drafts: {len(draft_jobs)}")
                    
                    # Print details of jobs with user email
                    for i, job in enumerate(user_email_jobs):
                        print(f"   Job {i+1} with user email:")
                        print(f"     ID: {job.get('id')}")
                        print(f"     Status: {job.get('status')}")
                        print(f"     Customer_ID: {job.get('customer_id')}")
                        print(f"     Contact_Email: {job.get('contact_email')}")
                        
                        if job.get('customer_id') is None:
                            print(f"     ⚠️ Job has no customer_id - eligible for linking")
                        elif job.get('customer_id') == self.user_id:
                            print(f"     ✅ Job properly linked to user")
                        else:
                            print(f"     ⚠️ Job linked to different user")
                    
                    return user_email_jobs
                else:
                    self.log_test("Investigate Jobs", False, f"Failed to get jobs: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("Investigate Jobs", False, f"Request failed: {str(e)}")
            return []

    async def run_corrected_dashboard_tests(self):
        """Run corrected tests for the dashboard issue"""
        print("🔍 DASHBOARD ISSUE CORRECTED TEST SUITE")
        print("Testing with correct API field names")
        print("=" * 60)
        
        await self.setup()
        
        try:
            # Setup: Create test user and login
            login_success, user_email = await self.create_test_user_and_login()
            if not login_success:
                print("❌ Could not setup test user")
                return
            
            # Test dashboard before creating any jobs
            jobs_before = await self.test_dashboard_before_linking()
            
            # Create draft job with correct email field
            job_id = await self.create_draft_job_with_correct_email_field(user_email)
            
            # Investigate jobs with user email
            user_email_jobs = await self.investigate_jobs_with_user_email(user_email)
            
            # Test linking
            linked_count = await self.test_link_draft_jobs()
            
            # Test dashboard after linking
            jobs_after = await self.test_dashboard_after_linking()
            
            # Final analysis
            print("\n" + "=" * 60)
            print("🔍 CORRECTED TEST ANALYSIS")
            print("=" * 60)
            
            print(f"User Email: {user_email}")
            print(f"User ID: {self.user_id}")
            print(f"Job Created: {'Yes' if job_id else 'No'}")
            print(f"Jobs with user email found: {len(user_email_jobs)}")
            print(f"Jobs before linking: {len(jobs_before)}")
            print(f"Jobs linked: {linked_count}")
            print(f"Jobs after linking: {len(jobs_after)}")
            
            if len(jobs_after) > len(jobs_before):
                print("\n🎉 SUCCESS: Jobs successfully linked and showing in dashboard!")
                print("The customer dashboard issue is resolved.")
            elif len(user_email_jobs) > 0 and linked_count == 0:
                print("\n⚠️ ISSUE: Jobs with user email exist but were not linked")
                print("Possible causes:")
                print("- Jobs already have customer_id set")
                print("- Jobs are not in draft status")
                print("- Link-draft-jobs criteria not matching")
            elif len(user_email_jobs) == 0:
                print("\n⚠️ ISSUE: No jobs found with user email")
                print("The contact_email field may not be stored correctly")
            else:
                print("\n⚠️ PARTIAL SUCCESS: Some linking occurred but results unclear")
            
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
    tester = DashboardIssueCorrectedTester()
    await tester.run_corrected_dashboard_tests()

if __name__ == "__main__":
    asyncio.run(main())