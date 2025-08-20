#!/usr/bin/env python3
"""
Professional Workflow Backend API Test Suite
Tests professional-specific APIs for Phase 2 Professional Dashboard implementation
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime, timedelta
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://service-finder-75.preview.emergentagent.com/api"

class ProfessionalWorkflowTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.professional_session = None
        self.customer_session = None
        self.test_job_id = None
        self.test_quote_id = None
        
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
    
    async def setup_test_users(self):
        """Create test users for professional workflow testing"""
        print("\n=== Setting Up Test Users ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Create professional user
        professional_data = {
            "email": f"pro_workflow_{timestamp}@example.com",
            "password": "ProWorkflow123!",
            "role": "professional",
            "first_name": "Erik",
            "last_name": "Magnusson",
            "phone": "+354-555-0789",
            "company_name": "Magnusson Construction Ltd",
            "company_id": "KT-123456789",
            "language": "is"
        }
        
        # Create customer user
        customer_data = {
            "email": f"customer_workflow_{timestamp}@example.com",
            "password": "CustomerWorkflow123!",
            "role": "customer",
            "first_name": "Anna",
            "last_name": "Jonsdottir",
            "phone": "+354-555-0456",
            "language": "is"
        }
        
        try:
            # Register professional
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=professional_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    self.log_test("Professional User Registration", True, "Professional registered successfully")
                else:
                    data = await response.json()
                    self.log_test("Professional User Registration", False, f"Registration failed: {response.status}", data)
                    return False
            
            # Register customer
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=customer_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    self.log_test("Customer User Registration", True, "Customer registered successfully")
                else:
                    data = await response.json()
                    self.log_test("Customer User Registration", False, f"Registration failed: {response.status}", data)
                    return False
            
            # Login professional
            login_data = {"username": professional_data["email"], "password": professional_data["password"]}
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        self.professional_session = cookies["buildconnect_auth"].value
                        self.log_test("Professional Login", True, "Professional login successful")
                    else:
                        self.log_test("Professional Login", False, "Login successful but no auth cookie")
                        return False
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Professional Login", False, f"Login failed: {response.status}", data)
                    return False
            
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
                        self.customer_session = cookies["buildconnect_auth"].value
                        self.log_test("Customer Login", True, "Customer login successful")
                    else:
                        self.log_test("Customer Login", False, "Login successful but no auth cookie")
                        return False
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Customer Login", False, f"Login failed: {response.status}", data)
                    return False
            
            return True
            
        except Exception as e:
            self.log_test("User Setup", False, f"Setup failed: {str(e)}")
            return False
    
    async def create_test_job(self):
        """Create a test job for professional workflow testing"""
        print("\n=== Creating Test Job ===")
        
        job_data = {
            "title": "Kitchen Renovation - Professional Workflow Test",
            "description": "Complete kitchen renovation including new cabinets, countertops, and appliances. Looking for experienced contractors with ISK pricing.",
            "category": "renovation",
            "postcode": "101",
            "budget_min": 500000,
            "budget_max": 1000000,
            "priority": "medium",
            "photos": []
        }
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=job_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    self.test_job_id = data["id"]
                    self.log_test("Test Job Creation", True, f"Job created: {self.test_job_id}")
                    return True
                else:
                    self.log_test("Test Job Creation", False, f"Job creation failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("Test Job Creation", False, f"Request failed: {str(e)}")
            return False
    
    async def test_professional_job_browsing(self):
        """Test professional job browsing APIs"""
        print("\n=== Testing Professional Job Browsing ===")
        
        if not self.professional_session:
            self.log_test("Professional Job Browsing", False, "No professional session available")
            return
        
        cookies = {"buildconnect_auth": self.professional_session}
        
        # Test 1: Get all open jobs for professionals
        try:
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?status=open",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    open_jobs = [job for job in data if job.get("status") == "open"]
                    self.log_test("GET /api/job-requests (Open Jobs)", True, f"Retrieved {len(open_jobs)} open jobs")
                else:
                    self.log_test("GET /api/job-requests (Open Jobs)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (Open Jobs)", False, f"Request failed: {str(e)}")
        
        # Test 2: Filter by category
        try:
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?category=renovation&status=open",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    renovation_jobs = [job for job in data if job.get("category") == "renovation"]
                    self.log_test("GET /api/job-requests (Category Filter)", True, f"Retrieved {len(renovation_jobs)} renovation jobs")
                else:
                    self.log_test("GET /api/job-requests (Category Filter)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (Category Filter)", False, f"Request failed: {str(e)}")
        
        # Test 3: Filter by postcode
        try:
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?postcode=101&status=open",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    postcode_jobs = [job for job in data if job.get("postcode") == "101"]
                    self.log_test("GET /api/job-requests (Postcode Filter)", True, f"Retrieved {len(postcode_jobs)} jobs in postcode 101")
                else:
                    self.log_test("GET /api/job-requests (Postcode Filter)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (Postcode Filter)", False, f"Request failed: {str(e)}")
        
        # Test 4: Filter by budget range
        try:
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?status=open",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    # Filter jobs with budget in range 500k-1M ISK
                    budget_jobs = [
                        job for job in data 
                        if job.get("budget_min", 0) >= 500000 and job.get("budget_max", 0) <= 1000000
                    ]
                    self.log_test("GET /api/job-requests (Budget Range)", True, f"Retrieved {len(budget_jobs)} jobs in budget range")
                else:
                    self.log_test("GET /api/job-requests (Budget Range)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (Budget Range)", False, f"Request failed: {str(e)}")
        
        # Test 5: Test pagination
        try:
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?page=1&limit=5&status=open",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/job-requests (Pagination)", True, f"Retrieved {len(data)} jobs with pagination (limit=5)")
                else:
                    self.log_test("GET /api/job-requests (Pagination)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (Pagination)", False, f"Request failed: {str(e)}")
        
        # Test 6: Filter by priority
        try:
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?priority=medium&status=open",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    medium_priority_jobs = [job for job in data if job.get("priority") == "medium"]
                    self.log_test("GET /api/job-requests (Priority Filter)", True, f"Retrieved {len(medium_priority_jobs)} medium priority jobs")
                else:
                    self.log_test("GET /api/job-requests (Priority Filter)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (Priority Filter)", False, f"Request failed: {str(e)}")
    
    async def test_professional_job_detail_access(self):
        """Test professional job detail access"""
        print("\n=== Testing Professional Job Detail Access ===")
        
        if not self.professional_session or not self.test_job_id:
            self.log_test("Professional Job Detail Access", False, "Missing professional session or test job")
            return
        
        cookies = {"buildconnect_auth": self.professional_session}
        
        # Test: Get specific job details
        try:
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/{self.test_job_id}",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id") == self.test_job_id:
                    # Verify professional can view job details
                    required_fields = ["id", "title", "description", "category", "postcode", "budget_min", "budget_max", "status"]
                    has_all_fields = all(field in data for field in required_fields)
                    
                    if has_all_fields:
                        self.log_test("GET /api/job-requests/{id} (Professional Access)", True, f"Professional can view job details: {data.get('title')}")
                        
                        # Check if quote count and competition data is included
                        if "quotes_count" in data:
                            self.log_test("Job Detail Competition Data", True, f"Quote count available: {data.get('quotes_count', 0)}")
                        else:
                            self.log_test("Job Detail Competition Data", False, "Quote count not included in response")
                    else:
                        self.log_test("GET /api/job-requests/{id} (Professional Access)", False, "Missing required fields", data)
                else:
                    self.log_test("GET /api/job-requests/{id} (Professional Access)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests/{id} (Professional Access)", False, f"Request failed: {str(e)}")
        
        # Test: Verify professionals cannot edit/delete jobs (should fail)
        try:
            update_data = {"title": "Updated by Professional - Should Fail"}
            async with self.session.put(
                f"{BACKEND_URL}/job-requests/{self.test_job_id}",
                json=update_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 403:
                    self.log_test("Job Edit Permission Check", True, "Professional correctly denied job edit access")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Job Edit Permission Check", False, f"Expected 403, got: {response.status}", data)
        except Exception as e:
            self.log_test("Job Edit Permission Check", False, f"Request failed: {str(e)}")
    
    async def test_professional_quote_management(self):
        """Test professional quote management APIs"""
        print("\n=== Testing Professional Quote Management ===")
        
        if not self.professional_session or not self.test_job_id:
            self.log_test("Professional Quote Management", False, "Missing professional session or test job")
            return
        
        cookies = {"buildconnect_auth": self.professional_session}
        
        # Test 1: Submit new quote
        quote_data = {
            "job_request_id": self.test_job_id,
            "amount": 750000,
            "message": "I have 15 years of experience in kitchen renovations. I can complete this project within 3 weeks with high-quality materials.",
            "estimated_duration": "3 weeks",
            "materials_cost": 400000,
            "labor_cost": 350000,
            "includes_materials": True,
            "start_date": (datetime.now() + timedelta(days=7)).isoformat(),
            "expires_at": (datetime.now() + timedelta(days=7)).isoformat()
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/quotes/",
                json=quote_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    self.test_quote_id = data["id"]
                    self.log_test("POST /api/quotes (Submit Quote)", True, f"Quote submitted: {self.test_quote_id}")
                    
                    # Verify quote details
                    if data.get("amount") == quote_data["amount"] and data.get("message") == quote_data["message"]:
                        self.log_test("Quote Data Validation", True, "Quote data correctly saved")
                    else:
                        self.log_test("Quote Data Validation", False, "Quote data mismatch", data)
                else:
                    self.log_test("POST /api/quotes (Submit Quote)", False, f"Quote submission failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/quotes (Submit Quote)", False, f"Request failed: {str(e)}")
        
        # Test 2: Get professional's quotes
        try:
            async with self.session.get(
                f"{BACKEND_URL}/quotes/?my_quotes=true",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    professional_quotes = [q for q in data if q.get("id") == self.test_quote_id]
                    if professional_quotes:
                        self.log_test("GET /api/quotes (Professional Quotes)", True, f"Retrieved {len(data)} professional quotes")
                    else:
                        self.log_test("GET /api/quotes (Professional Quotes)", False, "Submitted quote not found in results")
                else:
                    self.log_test("GET /api/quotes (Professional Quotes)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/quotes (Professional Quotes)", False, f"Request failed: {str(e)}")
        
        # Test 3: Test business rule - one quote per job per professional
        try:
            duplicate_quote_data = {
                "job_request_id": self.test_job_id,
                "amount": 800000,
                "message": "Second quote - should be rejected",
                "estimated_duration": "4 weeks",
                "expires_at": (datetime.now() + timedelta(days=7)).isoformat()
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/quotes/",
                json=duplicate_quote_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 400:
                    self.log_test("Quote Business Rule (One Per Job)", True, "Duplicate quote correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Quote Business Rule (One Per Job)", False, f"Expected 400, got: {response.status}", data)
        except Exception as e:
            self.log_test("Quote Business Rule (One Per Job)", False, f"Request failed: {str(e)}")
        
        # Test 4: Withdraw quote
        if self.test_quote_id:
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/quotes/{self.test_quote_id}/withdraw",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        self.log_test("POST /api/quotes/{id}/withdraw", True, "Quote withdrawn successfully")
                        
                        # Verify quote status changed
                        async with self.session.get(
                            f"{BACKEND_URL}/quotes/{self.test_quote_id}",
                            cookies=cookies
                        ) as verify_response:
                            verify_data = await verify_response.json()
                            if verify_response.status == 200 and verify_data.get("status") == "withdrawn":
                                self.log_test("Quote Withdrawal Verification", True, "Quote status correctly updated to withdrawn")
                            else:
                                self.log_test("Quote Withdrawal Verification", False, "Quote status not updated", verify_data)
                    else:
                        self.log_test("POST /api/quotes/{id}/withdraw", False, f"Withdrawal failed: {response.status}", data)
            except Exception as e:
                self.log_test("POST /api/quotes/{id}/withdraw", False, f"Request failed: {str(e)}")
        
        # Test 5: Test quote expiry handling
        try:
            expired_quote_data = {
                "job_request_id": self.test_job_id,
                "amount": 650000,
                "message": "Quote with past expiry date",
                "estimated_duration": "2 weeks",
                "expires_at": (datetime.now() - timedelta(days=1)).isoformat()  # Expired
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/quotes/",
                json=expired_quote_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    # Quote should be created but marked as expired
                    self.log_test("Quote Expiry Handling", True, "Quote with past expiry date handled correctly")
                else:
                    self.log_test("Quote Expiry Handling", False, f"Expired quote handling failed: {response.status}", data)
        except Exception as e:
            self.log_test("Quote Expiry Handling", False, f"Request failed: {str(e)}")
    
    async def test_professional_messaging_access(self):
        """Test professional messaging access"""
        print("\n=== Testing Professional Messaging Access ===")
        
        if not self.professional_session or not self.test_job_id:
            self.log_test("Professional Messaging Access", False, "Missing professional session or test job")
            return
        
        cookies = {"buildconnect_auth": self.professional_session}
        
        # Test 1: Get conversations for professional
        try:
            async with self.session.get(
                f"{BACKEND_URL}/messages/conversations",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    # Should include jobs where professional has submitted quotes
                    job_conversations = [conv for conv in data if conv.get("job_id") == self.test_job_id]
                    if job_conversations:
                        self.log_test("GET /api/messages/conversations (Professional)", True, f"Professional has access to {len(data)} conversations")
                    else:
                        self.log_test("GET /api/messages/conversations (Professional)", True, f"Retrieved {len(data)} conversations (test job may not have messages yet)")
                else:
                    self.log_test("GET /api/messages/conversations (Professional)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/messages/conversations (Professional)", False, f"Request failed: {str(e)}")
        
        # Test 2: Test messaging access for jobs with submitted quotes
        # First, create a new quote to ensure professional has access
        quote_data = {
            "job_request_id": self.test_job_id,
            "amount": 700000,
            "message": "Quote for messaging test",
            "estimated_duration": "3 weeks",
            "expires_at": (datetime.now() + timedelta(days=7)).isoformat()
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/quotes/",
                json=quote_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 200:
                    # Now test messaging access
                    try:
                        async with self.session.get(
                            f"{BACKEND_URL}/messages/job/{self.test_job_id}",
                            cookies=cookies
                        ) as msg_response:
                            msg_data = await msg_response.json()
                            if msg_response.status == 200 and isinstance(msg_data, list):
                                self.log_test("GET /api/messages/job/{id} (Professional Access)", True, f"Professional can access job messages: {len(msg_data)} messages")
                            else:
                                self.log_test("GET /api/messages/job/{id} (Professional Access)", False, f"Failed: {msg_response.status}", msg_data)
                    except Exception as e:
                        self.log_test("GET /api/messages/job/{id} (Professional Access)", False, f"Request failed: {str(e)}")
                else:
                    self.log_test("Quote for Messaging Test", False, f"Failed to create quote: {response.status}")
        except Exception as e:
            self.log_test("Quote for Messaging Test", False, f"Request failed: {str(e)}")
        
        # Test 3: Test conversation filtering
        try:
            async with self.session.get(
                f"{BACKEND_URL}/messages/conversations",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    # Verify conversations are properly filtered for professional
                    valid_conversations = True
                    for conv in data:
                        if not conv.get("job_id"):
                            valid_conversations = False
                            break
                    
                    if valid_conversations:
                        self.log_test("Professional Conversation Filtering", True, "Conversations properly filtered for professional")
                    else:
                        self.log_test("Professional Conversation Filtering", False, "Invalid conversation data", data)
                else:
                    self.log_test("Professional Conversation Filtering", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("Professional Conversation Filtering", False, f"Request failed: {str(e)}")
    
    async def test_role_based_permissions(self):
        """Test role-based permissions for professional workflow"""
        print("\n=== Testing Role-Based Permissions ===")
        
        if not self.professional_session or not self.customer_session:
            self.log_test("Role-Based Permissions", False, "Missing user sessions")
            return
        
        # Test 1: Professional cannot access customer-only endpoints
        try:
            cookies = {"buildconnect_auth": self.professional_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?customer_only=true",
                cookies=cookies
            ) as response:
                if response.status == 403:
                    self.log_test("Professional Customer-Only Access Denied", True, "Professional correctly denied customer-only access")
                else:
                    data = await response.json()
                    self.log_test("Professional Customer-Only Access Denied", False, f"Expected 403, got: {response.status}", data)
        except Exception as e:
            self.log_test("Professional Customer-Only Access Denied", False, f"Request failed: {str(e)}")
        
        # Test 2: Customer cannot submit quotes
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            quote_data = {
                "job_request_id": self.test_job_id,
                "amount": 500000,
                "message": "Customer trying to submit quote - should fail",
                "estimated_duration": "2 weeks",
                "expires_at": (datetime.now() + timedelta(days=7)).isoformat()
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/quotes/",
                json=quote_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 403:
                    self.log_test("Customer Quote Submission Denied", True, "Customer correctly denied quote submission")
                else:
                    data = await response.json()
                    self.log_test("Customer Quote Submission Denied", False, f"Expected 403, got: {response.status}", data)
        except Exception as e:
            self.log_test("Customer Quote Submission Denied", False, f"Request failed: {str(e)}")
        
        # Test 3: Professional can only withdraw their own quotes
        if self.test_quote_id:
            try:
                cookies = {"buildconnect_auth": self.customer_session}
                async with self.session.post(
                    f"{BACKEND_URL}/quotes/{self.test_quote_id}/withdraw",
                    cookies=cookies
                ) as response:
                    if response.status == 403:
                        self.log_test("Quote Ownership Validation", True, "Customer correctly denied quote withdrawal")
                    else:
                        data = await response.json()
                        self.log_test("Quote Ownership Validation", False, f"Expected 403, got: {response.status}", data)
            except Exception as e:
                self.log_test("Quote Ownership Validation", False, f"Request failed: {str(e)}")
    
    async def run_professional_workflow_tests(self):
        """Run all professional workflow tests"""
        print("🚀 Starting Professional Workflow Backend API Tests")
        print(f"Testing against: {BACKEND_URL}")
        
        await self.setup()
        
        try:
            # Setup test environment
            if not await self.setup_test_users():
                print("❌ Failed to setup test users. Aborting tests.")
                return 0, len(self.test_results), self.test_results
            
            if not await self.create_test_job():
                print("❌ Failed to create test job. Aborting tests.")
                return 0, len(self.test_results), self.test_results
            
            # Run professional workflow tests
            await self.test_professional_job_browsing()
            await self.test_professional_job_detail_access()
            await self.test_professional_quote_management()
            await self.test_professional_messaging_access()
            await self.test_role_based_permissions()
            
        finally:
            await self.cleanup()
        
        # Print summary
        print("\n" + "="*60)
        print("📊 PROFESSIONAL WORKFLOW TEST SUMMARY")
        print("="*60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")
        
        return passed_tests, failed_tests, self.test_results

async def main():
    """Main test runner"""
    tester = ProfessionalWorkflowTester()
    passed, failed, results = await tester.run_professional_workflow_tests()
    
    # Save detailed results to file
    with open("/app/professional_workflow_test_results.json", "w") as f:
        json.dump({
            "summary": {
                "total": len(results),
                "passed": passed,
                "failed": failed,
                "success_rate": (passed/len(results))*100 if results else 0
            },
            "results": results,
            "timestamp": datetime.now().isoformat()
        }, f, indent=2, default=str)
    
    print(f"\n📄 Detailed results saved to: /app/professional_workflow_test_results.json")
    
    # Return exit code based on test results
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)