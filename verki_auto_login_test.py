#!/usr/bin/env python3
"""
Verki Auto-Login Test Suite
Using the auto-login endpoint to test verki@verki.is user
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://movers-platform-1.preview.emergentagent.com/api"

class VerkiAutoLoginTester:
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

    async def test_verki_auto_login(self):
        """Test auto-login with verki@verki.is"""
        print("\n=== Testing Verki Auto-Login ===")
        
        auto_login_data = {
            "email": "verki@verki.is",
            "password": "verki123"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/auto-login",
                json=auto_login_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("success"):
                    user_info = data.get("user", {})
                    self.log_test("Verki Auto-Login", True, f"Auto-login successful: {user_info.get('email')}")
                    
                    # Now try regular login
                    return await self.test_verki_regular_login()
                else:
                    self.log_test("Verki Auto-Login", False, f"Auto-login failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("Verki Auto-Login", False, f"Request failed: {str(e)}")
            return False

    async def test_verki_regular_login(self):
        """Test regular login after auto-login setup"""
        print("\n=== Testing Verki Regular Login ===")
        
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
                        self.log_test("Verki Regular Login", True, "Login successful with session cookie")
                        return True
                    else:
                        self.log_test("Verki Regular Login", False, "Login successful but no auth cookie")
                        return False
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Verki Regular Login", False, f"Login failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("Verki Regular Login", False, f"Request failed: {str(e)}")
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

    async def create_draft_job_with_verki_email(self):
        """Create a draft job with verki@verki.is email"""
        print("\n=== Creating Draft Job with verki@verki.is Email ===")
        
        draft_job_data = {
            "category": "handcraft",
            "title": "Test verkefni fyrir verki user dashboard",
            "description": "Test lýsing á verkefni fyrir verki@verki.is notanda. Þetta á að birtast í dashboard eftir login og linking.",
            "contact_email": "verki@verki.is",
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
                    message = data.get("message", "")
                    self.log_test("Verki Link Draft Jobs", True, f"Linked {linked_count} draft jobs to verki user - {message}")
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
                        print(f"   Job {i+1}: ID={job.get('id')}, Status={job.get('status')}, Title={job.get('title')[:50]}...")
                        print(f"           Customer_ID={job.get('customer_id')}, Contact_Email={job.get('contact_email')}")
                    
                    return data
                else:
                    self.log_test("Verki Customer Dashboard", False, f"Dashboard API failed: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("Verki Customer Dashboard", False, f"Request failed: {str(e)}")
            return []

    async def investigate_all_jobs_for_verki(self):
        """Investigate all jobs to find ones related to verki@verki.is"""
        print("\n=== Investigating All Jobs for Verki Email ===")
        
        if not self.verki_session:
            self.log_test("Investigate All Jobs", False, "No verki session available")
            return []
        
        try:
            cookies = {"buildconnect_auth": self.verki_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    total_jobs = len(data)
                    verki_email_jobs = [job for job in data if job.get("contact_email") == "verki@verki.is"]
                    draft_jobs = [job for job in data if job.get("status") == "draft"]
                    
                    self.log_test("Investigate All Jobs", True, 
                                f"Total jobs: {total_jobs}, With verki email: {len(verki_email_jobs)}, Drafts: {len(draft_jobs)}")
                    
                    # Print details of jobs with verki email
                    for i, job in enumerate(verki_email_jobs):
                        print(f"   Verki job {i+1}: ID={job.get('id')}, Status={job.get('status')}, Customer_ID={job.get('customer_id')}")
                    
                    return verki_email_jobs
                else:
                    self.log_test("Investigate All Jobs", False, f"Failed to get jobs: {response.status}", data)
                    return []
        except Exception as e:
            self.log_test("Investigate All Jobs", False, f"Request failed: {str(e)}")
            return []

    async def run_complete_verki_test(self):
        """Run complete test workflow for verki user"""
        print("🔍 VERKI USER COMPLETE TEST SUITE")
        print("=" * 60)
        
        await self.setup()
        
        try:
            # Step 1: Setup verki user with auto-login
            login_success = await self.test_verki_auto_login()
            
            if not login_success:
                print("❌ Could not setup verki user login")
                return
            
            # Step 2: Check authentication
            user_id = await self.test_verki_auth_me()
            
            # Step 3: Create a draft job with verki email
            new_job_id = await self.create_draft_job_with_verki_email()
            
            # Step 4: Investigate existing jobs
            verki_jobs = await self.investigate_all_jobs_for_verki()
            
            # Step 5: Link draft jobs
            linked_count = await self.test_verki_link_draft_jobs()
            
            # Step 6: Check customer dashboard
            dashboard_jobs = await self.test_verki_customer_dashboard()
            
            # Final analysis
            print("\n" + "=" * 60)
            print("🔍 VERKI USER DASHBOARD ANALYSIS")
            print("=" * 60)
            
            print(f"Verki user ID: {user_id}")
            print(f"Jobs with verki email found: {len(verki_jobs)}")
            print(f"New job created: {'Yes' if new_job_id else 'No'}")
            print(f"Draft jobs linked: {linked_count}")
            print(f"Jobs in dashboard: {len(dashboard_jobs)}")
            
            if len(dashboard_jobs) == 0 and len(verki_jobs) > 0:
                print("\n❌ ISSUE CONFIRMED: Jobs with verki email exist but not showing in dashboard")
                print("\nPossible causes:")
                print("1. Jobs have contact_email='verki@verki.is' but customer_id is None or different")
                print("2. Link-draft-jobs endpoint not finding jobs with correct criteria")
                print("3. Customer_only filter not matching linked jobs")
                
                # Check specific job details
                for job in verki_jobs:
                    customer_id = job.get('customer_id')
                    status = job.get('status')
                    contact_email = job.get('contact_email')
                    print(f"   Job {job.get('id')}: customer_id={customer_id}, status={status}, contact_email={contact_email}")
                    
                    if customer_id != user_id:
                        print(f"   ⚠️ Job customer_id ({customer_id}) doesn't match user_id ({user_id})")
                    if status == "draft":
                        print(f"   ⚠️ Job is still in draft status")
                        
            elif len(dashboard_jobs) > 0:
                print("\n✅ Dashboard working: Jobs are showing correctly")
            else:
                print("\n⚠️ No jobs with verki email found to test with")
            
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
    tester = VerkiAutoLoginTester()
    await tester.run_complete_verki_test()

if __name__ == "__main__":
    asyncio.run(main())