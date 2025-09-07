#!/usr/bin/env python3
"""
Guest Job Linking Test Suite
Testing the specific scenario of guest creating job then logging in and linking
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://movers-platform-1.preview.emergentagent.com/api"

class GuestJobLinkingTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.user_session = None
        self.user_id = None
        self.user_email = None
        
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

    async def step_1_create_guest_job(self):
        """Step 1: Create job as guest (no authentication)"""
        print("\n=== Step 1: Creating Job as Guest ===")
        
        import time
        timestamp = str(int(time.time()))
        self.user_email = f"guest_test_{timestamp}@example.com"
        
        # Create draft job as guest with email
        draft_job_data = {
            "category": "handcraft",
            "title": "Guest verkefni fyrir linking test",
            "description": "Test lýsing á verkefni sem guest býr til og á síðan að linkast við notanda eftir login.",
            "email": self.user_email,
            "phone": "+354-555-9999",
            "first_name": "Guest",
            "last_name": "User",
            "postcode": "101"
        }
        
        try:
            # Create new session without authentication
            async with aiohttp.ClientSession() as guest_session:
                async with guest_session.post(
                    f"{BACKEND_URL}/public/job-requests/draft",
                    json=draft_job_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status in [200, 201]:
                        draft_id = data.get("id")
                        self.log_test("Create Guest Draft Job", True, f"✅ Guest draft job created: {draft_id}")
                        
                        # Submit the draft as guest
                        try:
                            async with guest_session.post(
                                f"{BACKEND_URL}/public/job-requests/{draft_id}/submit"
                            ) as submit_response:
                                if submit_response.status == 200:
                                    submit_data = await submit_response.json()
                                    job_id = submit_data.get("job_id")
                                    self.log_test("Submit Guest Job", True, f"✅ Guest job submitted: {job_id}")
                                    return job_id
                                else:
                                    submit_data = await submit_response.json()
                                    self.log_test("Submit Guest Job", False, f"Submit failed: {submit_response.status}", submit_data)
                                    return None
                        except Exception as e:
                            self.log_test("Submit Guest Job", False, f"Submit request failed: {str(e)}")
                            return None
                    else:
                        self.log_test("Create Guest Draft Job", False, f"Draft creation failed: {response.status}", data)
                        return None
        except Exception as e:
            self.log_test("Create Guest Draft Job", False, f"Request failed: {str(e)}")
            return None

    async def step_2_register_and_login_user(self):
        """Step 2: Register user with same email and login"""
        print("\n=== Step 2: Registering User with Same Email ===")
        
        if not self.user_email:
            self.log_test("User Registration", False, "No user email available")
            return False
        
        user_data = {
            "email": self.user_email,
            "password": "TestPassword123!",
            "role": "customer",
            "first_name": "Guest",
            "last_name": "User",
            "phone": "+354-555-9999",
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
                    self.log_test("User Registration", True, f"User registered: {self.user_email}")
                else:
                    self.log_test("User Registration", False, f"Registration failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("User Registration", False, f"Request failed: {str(e)}")
            return False
        
        # Login user
        try:
            login_data = {
                "username": self.user_email,
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

    async def step_3_check_dashboard_before_linking(self):
        """Step 3: Check dashboard before linking"""
        print("\n=== Step 3: Checking Dashboard Before Linking ===")
        
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

    async def step_4_investigate_jobs_with_email(self):
        """Step 4: Investigate jobs with user email"""
        print("\n=== Step 4: Investigating Jobs with User Email ===")
        
        if not self.user_session:
            self.log_test("Investigate Jobs with Email", False, "No user session available")
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
                    user_email_jobs = [job for job in data if job.get("contact_email") == self.user_email]
                    draft_jobs = [job for job in data if job.get("status") == "draft"]
                    unlinked_jobs = [job for job in data if job.get("customer_id") is None]
                    
                    self.log_test("Investigate Jobs with Email", True, 
                                f"Total: {total_jobs}, With user email: {len(user_email_jobs)}, Drafts: {len(draft_jobs)}, Unlinked: {len(unlinked_jobs)}")
                    
                    # Print details of jobs with user email
                    for i, job in enumerate(user_email_jobs):
                        print(f"   Job {i+1} with user email:")
                        print(f"     ID: {job.get('id')}")
                        print(f"     Status: {job.get('status')}")
                        print(f"     Customer_ID: {job.get('customer_id')}")
                        print(f"     Contact_Email: {job.get('contact_email')}")
                        
                        if job.get('customer_id') is None and job.get('status') == 'draft':
                            print(f"     ✅ Job eligible for linking (draft + no customer_id)")
                        elif job.get('customer_id') is None:
                            print(f"     ⚠️ Job has no customer_id but not draft status")
                        else:
                            print(f"     ⚠️ Job already has customer_id")
                    
                    return user_email_jobs
                else:
                    self.log_test("Investigate Jobs with Email", False, f"Failed to get jobs: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("Investigate Jobs with Email", False, f"Request failed: {str(e)}")
            return []

    async def step_5_link_draft_jobs(self):
        """Step 5: Link draft jobs"""
        print("\n=== Step 5: Linking Draft Jobs ===")
        
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

    async def step_6_check_dashboard_after_linking(self):
        """Step 6: Check dashboard after linking"""
        print("\n=== Step 6: Checking Dashboard After Linking ===")
        
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

    async def run_guest_job_linking_tests(self):
        """Run complete guest job linking test workflow"""
        print("🔍 GUEST JOB LINKING TEST SUITE")
        print("Testing the complete workflow:")
        print("1. Guest creates job with email")
        print("2. User registers with same email")
        print("3. User logs in")
        print("4. Check if jobs exist with contact_email")
        print("5. Link draft jobs")
        print("6. Verify jobs show in dashboard")
        print("=" * 60)
        
        await self.setup()
        
        try:
            # Step 1: Create job as guest
            job_id = await self.step_1_create_guest_job()
            
            # Step 2: Register and login user
            login_success = await self.step_2_register_and_login_user()
            
            if not login_success:
                print("❌ Could not register/login user")
                return
            
            # Step 3: Check dashboard before linking
            jobs_before = await self.step_3_check_dashboard_before_linking()
            
            # Step 4: Investigate jobs with user email
            user_email_jobs = await self.step_4_investigate_jobs_with_email()
            
            # Step 5: Link draft jobs
            linked_count = await self.step_5_link_draft_jobs()
            
            # Step 6: Check dashboard after linking
            jobs_after = await self.step_6_check_dashboard_after_linking()
            
            # Final analysis
            print("\n" + "=" * 60)
            print("🔍 GUEST JOB LINKING ANALYSIS")
            print("=" * 60)
            
            print(f"User Email: {self.user_email}")
            print(f"User ID: {self.user_id}")
            print(f"Guest Job Created: {'Yes' if job_id else 'No'}")
            print(f"Jobs with user email found: {len(user_email_jobs)}")
            print(f"Jobs before linking: {len(jobs_before)}")
            print(f"Jobs linked: {linked_count}")
            print(f"Jobs after linking: {len(jobs_after)}")
            
            if len(user_email_jobs) > 0 and linked_count > 0:
                print("\n🎉 SUCCESS: Guest job linking workflow working correctly!")
                print("Jobs created by guest are properly linked to user after registration.")
            elif len(user_email_jobs) > 0 and linked_count == 0:
                print("\n⚠️ ISSUE: Jobs with user email found but not linked")
                print("Possible causes:")
                print("- Jobs not in draft status")
                print("- Jobs already have customer_id")
                print("- Link criteria not matching")
            elif len(user_email_jobs) == 0 and job_id:
                print("\n❌ ISSUE: Job created but contact_email not stored")
                print("The contact_email field is not being preserved in the database")
            elif len(jobs_after) > len(jobs_before):
                print("\n🎉 PARTIAL SUCCESS: Jobs showing in dashboard")
                print("Jobs are appearing but may not be through the linking mechanism")
            else:
                print("\n❌ ISSUE: Guest job linking not working")
                print("Jobs created by guest are not appearing in user dashboard")
            
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
    tester = GuestJobLinkingTester()
    await tester.run_guest_job_linking_tests()

if __name__ == "__main__":
    asyncio.run(main())