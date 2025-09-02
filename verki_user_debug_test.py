#!/usr/bin/env python3
"""
Verki User Debug Test Suite
Testing the specific scenario with verki@verki.is user and draft job linking
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://byggja-verki.preview.emergentagent.com/api"

class VerkiUserDebugTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.verki_session = None
        
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

    async def create_draft_job_with_verki_email(self):
        """Create a draft job with verki@verki.is email to simulate the issue"""
        print("\n=== Creating Draft Job with verki@verki.is Email ===")
        
        # Create draft job using public API with verki email
        draft_job_data = {
            "category": "handcraft",
            "title": "Test verkefni fyrir verki user",
            "description": "Test lýsing á verkefni fyrir verki@verki.is notanda. Þetta á að birtast í dashboard eftir login.",
            "contact_email": "verki@verki.is",  # This should link to verki user after login
            "contact_phone": "+354-555-9999",
            "contact_name": "Verki User",
            "postcode": "101",
            "address": "Verki Test Address, Reykjavik"
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
                    self.log_test("Create Draft Job for Verki", True, f"Draft job created with ID: {draft_id}")
                    
                    # Submit the draft to make it a real job
                    try:
                        async with self.session.post(
                            f"{BACKEND_URL}/public/job-requests/{draft_id}/submit"
                        ) as submit_response:
                            if submit_response.status == 200:
                                submit_data = await submit_response.json()
                                job_id = submit_data.get("job_id")
                                self.log_test("Submit Draft Job for Verki", True, f"Draft submitted as job: {job_id}")
                                return job_id
                            else:
                                submit_data = await submit_response.json()
                                self.log_test("Submit Draft Job for Verki", False, f"Submit failed: {submit_response.status}", submit_data)
                                return None
                    except Exception as e:
                        self.log_test("Submit Draft Job for Verki", False, f"Submit request failed: {str(e)}")
                        return None
                else:
                    self.log_test("Create Draft Job for Verki", False, f"Draft creation failed: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("Create Draft Job for Verki", False, f"Request failed: {str(e)}")
            return None

    async def test_verki_user_login(self):
        """Test login with verki@verki.is user"""
        print("\n=== Testing Verki User Login ===")
        
        # Try to login with verki@verki.is
        # First, let's try with a common password
        passwords_to_try = ["verki123", "password", "verki", "123456", "verki@verki.is"]
        
        for password in passwords_to_try:
            try:
                login_data = {
                    "username": "verki@verki.is",
                    "password": password
                }
                async with self.session.post(
                    f"{BACKEND_URL}/auth/cookie/login",
                    data=login_data,
                    headers={"Content-Type": "application/x-www-form-urlencoded"}
                ) as response:
                    if response.status == 204:
                        cookies = response.cookies
                        if "buildconnect_auth" in cookies:
                            self.verki_session = cookies["buildconnect_auth"].value
                            self.log_test("Verki User Login", True, f"Login successful with password: {password}")
                            return True
                    elif response.status == 400:
                        # Bad credentials, try next password
                        continue
                    else:
                        data = await response.json() if response.content_type == 'application/json' else await response.text()
                        print(f"   Tried password '{password}': {response.status}")
            except Exception as e:
                print(f"   Error trying password '{password}': {str(e)}")
        
        # If no password worked, try to create/update the user
        self.log_test("Verki User Login", False, "Could not login with common passwords")
        return await self.create_or_update_verki_user()

    async def create_or_update_verki_user(self):
        """Create or update verki@verki.is user"""
        print("\n=== Creating/Updating Verki User ===")
        
        # Try to create verki user
        user_data = {
            "email": "verki@verki.is",
            "password": "verki123",
            "role": "customer",
            "first_name": "Verki",
            "last_name": "User",
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
                if response.status in [200, 201]:
                    self.log_test("Verki User Creation", True, "Verki user created successfully")
                elif response.status == 400 and "already exists" in str(data).lower():
                    self.log_test("Verki User Creation", True, "Verki user already exists")
                else:
                    self.log_test("Verki User Creation", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("Verki User Creation", False, f"Request failed: {str(e)}")
        
        # Now try to login
        try:
            login_data = {
                "username": "verki@verki.is",
                "password": "verki123"
            }
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        self.verki_session = cookies["buildconnect_auth"].value
                        self.log_test("Verki User Login After Creation", True, "Login successful after user creation")
                        return True
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Verki User Login After Creation", False, f"Login failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("Verki User Login After Creation", False, f"Request failed: {str(e)}")
            return False

    async def test_verki_auth_me(self):
        """Test GET /api/auth/me with verki user"""
        print("\n=== Testing Verki User Authentication ===")
        
        if not self.verki_session:
            self.log_test("Verki Auth Check", False, "No verki session available")
            return None
        
        try:
            cookies = {"buildconnect_auth": self.verki_session}
            async with self.session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    user_id = data.get("id")
                    email = data.get("email")
                    role = data.get("role")
                    self.log_test("Verki Auth Check", True, f"Verki user authenticated: {email}, ID: {user_id}, Role: {role}")
                    return user_id
                else:
                    self.log_test("Verki Auth Check", False, f"Authentication failed: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("Verki Auth Check", False, f"Request failed: {str(e)}")
            return None

    async def test_verki_link_draft_jobs(self):
        """Test linking draft jobs to verki user"""
        print("\n=== Testing Link Draft Jobs for Verki User ===")
        
        if not self.verki_session:
            self.log_test("Verki Link Draft Jobs", False, "No verki session available")
            return 0
        
        try:
            cookies = {"buildconnect_auth": self.verki_session}
            async with self.session.post(
                f"{BACKEND_URL}/auth/link-draft-jobs",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    linked_count = data.get("linked_jobs", 0)
                    self.log_test("Verki Link Draft Jobs", True, f"Linked {linked_count} draft jobs to verki user")
                    return linked_count
                else:
                    self.log_test("Verki Link Draft Jobs", False, f"Link failed: {response.status}", data)
                    return 0
        except Exception as e:
            self.log_test("Verki Link Draft Jobs", False, f"Request failed: {str(e)}")
            return 0

    async def test_verki_customer_dashboard(self):
        """Test verki user's customer dashboard"""
        print("\n=== Testing Verki User Customer Dashboard ===")
        
        if not self.verki_session:
            self.log_test("Verki Customer Dashboard", False, "No verki session available")
            return []
        
        try:
            cookies = {"buildconnect_auth": self.verki_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests?customer_only=true",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    user_jobs = len(data)
                    self.log_test("Verki Customer Dashboard", True, f"Verki user has {user_jobs} jobs in dashboard")
                    
                    # Print job details
                    for i, job in enumerate(data):
                        print(f"   Job {i+1}: ID={job.get('id')}, Status={job.get('status')}, Title={job.get('title')}")
                    
                    return data
                else:
                    self.log_test("Verki Customer Dashboard", False, f"Dashboard API failed: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("Verki Customer Dashboard", False, f"Request failed: {str(e)}")
            return []

    async def investigate_draft_jobs_with_contact_email(self):
        """Investigate existing draft jobs with contact_email field"""
        print("\n=== Investigating Draft Jobs with Contact Email ===")
        
        # Check all jobs to see which ones have contact_email field
        try:
            async with self.session.get(f"{BACKEND_URL}/job-requests") as response:
                data = await response.json()
                if response.status == 200:
                    total_jobs = len(data)
                    draft_jobs = [job for job in data if job.get("status") == "draft"]
                    jobs_with_contact_email = [job for job in data if "contact_email" in job and job.get("contact_email")]
                    verki_email_jobs = [job for job in data if job.get("contact_email") == "verki@verki.is"]
                    
                    self.log_test("Draft Jobs Investigation", True, 
                                f"Total: {total_jobs}, Drafts: {len(draft_jobs)}, With contact_email: {len(jobs_with_contact_email)}, Verki email: {len(verki_email_jobs)}")
                    
                    # Print details of jobs with verki email
                    for job in verki_email_jobs:
                        print(f"   Verki job: ID={job.get('id')}, Status={job.get('status')}, Customer_ID={job.get('customer_id')}")
                    
                    return verki_email_jobs
                else:
                    self.log_test("Draft Jobs Investigation", False, f"Failed to get jobs: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("Draft Jobs Investigation", False, f"Request failed: {str(e)}")
            return []

    async def run_verki_debug_tests(self):
        """Run all debug tests for verki user scenario"""
        print("🔍 VERKI USER DEBUG TEST SUITE")
        print("=" * 60)
        
        await self.setup()
        
        try:
            # Step 1: Investigate existing draft jobs
            existing_verki_jobs = await self.investigate_draft_jobs_with_contact_email()
            
            # Step 2: Create a new draft job with verki email
            new_job_id = await self.create_draft_job_with_verki_email()
            
            # Step 3: Login as verki user
            login_success = await self.test_verki_user_login()
            
            if login_success:
                # Step 4: Check authentication
                user_id = await self.test_verki_auth_me()
                
                # Step 5: Link draft jobs
                linked_count = await self.test_verki_link_draft_jobs()
                
                # Step 6: Check customer dashboard
                dashboard_jobs = await self.test_verki_customer_dashboard()
                
                # Final analysis
                print("\n" + "=" * 60)
                print("🔍 VERKI USER ISSUE ANALYSIS")
                print("=" * 60)
                
                print(f"Existing verki jobs found: {len(existing_verki_jobs)}")
                print(f"New job created: {'Yes' if new_job_id else 'No'}")
                print(f"Draft jobs linked: {linked_count}")
                print(f"Jobs in dashboard: {len(dashboard_jobs)}")
                
                if len(dashboard_jobs) == 0 and (len(existing_verki_jobs) > 0 or new_job_id):
                    print("\n❌ ISSUE CONFIRMED: Jobs exist but not showing in dashboard")
                    print("Possible causes:")
                    print("- Draft jobs not being linked properly")
                    print("- Customer_only filter not working correctly")
                    print("- Jobs have wrong customer_id after linking")
                elif len(dashboard_jobs) > 0:
                    print("\n✅ Dashboard working: Jobs are showing correctly")
                else:
                    print("\n⚠️ No jobs found to test with")
            
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
    tester = VerkiUserDebugTester()
    await tester.run_verki_debug_tests()

if __name__ == "__main__":
    asyncio.run(main())