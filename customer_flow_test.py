#!/usr/bin/env python3
"""
Customer Flow Backend API Test Suite
Tests specific customer dashboard functionality and APIs for Phase 1 implementation
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime, timedelta
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://verki-rebrand.preview.emergentagent.com/api"

class CustomerFlowTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.customer_session = None
        self.professional_session = None
        self.job_id = None
        self.quote_id = None
        
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
        """Create and authenticate test users"""
        print("\n=== Setting up Test Users ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Customer data
        customer_data = {
            "email": f"customer_flow_{timestamp}@example.com",
            "password": "CustomerFlow123!",
            "role": "customer",
            "first_name": "Sarah",
            "last_name": "Mitchell",
            "phone": "+354-555-1111",
            "language": "en"
        }
        
        # Professional data
        professional_data = {
            "email": f"professional_flow_{timestamp}@example.com",
            "password": "ProfessionalFlow123!",
            "role": "professional",
            "first_name": "Erik",
            "last_name": "Johansson",
            "phone": "+354-555-2222",
            "company_name": "Johansson Construction",
            "company_id": "KT-111222333",
            "language": "is"
        }
        
        try:
            # Register customer
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=customer_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    self.log_test("Customer Registration", True, "Customer registered successfully")
                else:
                    data = await response.json()
                    self.log_test("Customer Registration", False, f"Registration failed: {response.status}", data)
                    return False
            
            # Register professional
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=professional_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    self.log_test("Professional Registration", True, "Professional registered successfully")
                else:
                    data = await response.json()
                    self.log_test("Professional Registration", False, f"Registration failed: {response.status}", data)
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
                        self.log_test("Customer Login", False, "No auth cookie received")
                        return False
                else:
                    self.log_test("Customer Login", False, f"Login failed: {response.status}")
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
                        self.log_test("Professional Login", False, "No auth cookie received")
                        return False
                else:
                    self.log_test("Professional Login", False, f"Login failed: {response.status}")
                    return False
            
            return True
            
        except Exception as e:
            self.log_test("User Setup", False, f"Setup failed: {str(e)}")
            return False
    
    async def test_job_request_customer_flow(self):
        """Test job request APIs focusing on customer dashboard functionality"""
        print("\n=== Testing Job Request Customer Flow ===")
        
        # Test 1: Create job request as customer
        job_data = {
            "category": "electrical",
            "title": "Bathroom Light Installation",
            "description": "Need to install new LED lights in the bathroom. Includes 3 ceiling lights and 1 mirror light. All wiring is already in place.",
            "postcode": "101",
            "address": "Austurstræti 12, Reykjavik",
            "budget_min": 30000,
            "budget_max": 60000,
            "priority": "medium"
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
                    self.job_id = data["id"]
                    self.log_test("POST /api/job-requests (Customer)", True, f"Job created: {self.job_id}")
                else:
                    self.log_test("POST /api/job-requests (Customer)", False, f"Job creation failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("POST /api/job-requests (Customer)", False, f"Request failed: {str(e)}")
            return
        
        # Test 2: Get job requests with customer_only=true
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?customer_only=true",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    customer_jobs = [job for job in data if job.get("title") == job_data["title"]]
                    if customer_jobs:
                        self.log_test("GET /api/job-requests (customer_only=true)", True, f"Retrieved {len(data)} customer jobs")
                    else:
                        self.log_test("GET /api/job-requests (customer_only=true)", False, "Created job not found in customer jobs")
                else:
                    self.log_test("GET /api/job-requests (customer_only=true)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (customer_only=true)", False, f"Request failed: {str(e)}")
        
        # Test 3: Get job requests with pagination
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?customer_only=true&page=1&limit=10",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/job-requests (Pagination)", True, f"Retrieved {len(data)} jobs with pagination")
                else:
                    self.log_test("GET /api/job-requests (Pagination)", False, f"Pagination failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (Pagination)", False, f"Request failed: {str(e)}")
        
        # Test 4: Get specific job request details
        if self.job_id:
            try:
                async with self.session.get(f"{BACKEND_URL}/job-requests/{self.job_id}") as response:
                    data = await response.json()
                    if response.status == 200 and data.get("id") == self.job_id:
                        required_fields = ["id", "title", "description", "category", "postcode", "budget_min", "budget_max", "status"]
                        has_all_fields = all(field in data for field in required_fields)
                        if has_all_fields:
                            self.log_test("GET /api/job-requests/{id}", True, f"Job details retrieved: {data.get('title')}")
                        else:
                            self.log_test("GET /api/job-requests/{id}", False, "Missing required fields", data)
                    else:
                        self.log_test("GET /api/job-requests/{id}", False, f"Failed: {response.status}", data)
            except Exception as e:
                self.log_test("GET /api/job-requests/{id}", False, f"Request failed: {str(e)}")
        
        # Test 5: Update job status (customer cancellation)
        if self.job_id:
            try:
                cookies = {"buildconnect_auth": self.customer_session}
                async with self.session.put(
                    f"{BACKEND_URL}/job-requests/{self.job_id}/status?new_status=cancelled",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        self.log_test("PUT /api/job-requests/{id}/status", True, "Job status updated to cancelled")
                    else:
                        self.log_test("PUT /api/job-requests/{id}/status", False, f"Status update failed: {response.status}", data)
            except Exception as e:
                self.log_test("PUT /api/job-requests/{id}/status", False, f"Request failed: {str(e)}")
    
    async def test_quote_management_customer_flow(self):
        """Test quote management APIs focusing on customer dashboard functionality"""
        print("\n=== Testing Quote Management Customer Flow ===")
        
        # First, create a new job for quote testing (since previous one was cancelled)
        job_data = {
            "category": "plumbing",
            "title": "Kitchen Faucet Replacement",
            "description": "Replace old kitchen faucet with a new modern one. Need professional installation.",
            "postcode": "101",
            "address": "Laugavegur 25, Reykjavik",
            "budget_min": 20000,
            "budget_max": 40000,
            "priority": "high"
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
                    self.job_id = data["id"]
                    self.log_test("Create Job for Quote Testing", True, f"Job created: {self.job_id}")
                else:
                    self.log_test("Create Job for Quote Testing", False, f"Failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("Create Job for Quote Testing", False, f"Request failed: {str(e)}")
            return
        
        # Professional creates a quote
        expires_at = (datetime.utcnow() + timedelta(days=7)).isoformat()
        quote_data = {
            "job_request_id": self.job_id,
            "amount": 35000,
            "message": "I can replace your kitchen faucet professionally. I have 8 years of plumbing experience.",
            "estimated_duration": "2-3 hours",
            "expires_at": expires_at,
            "includes_materials": True,
            "materials_cost": 15000,
            "labor_cost": 20000
        }
        
        try:
            cookies = {"buildconnect_auth": self.professional_session}
            async with self.session.post(
                f"{BACKEND_URL}/quotes/",
                json=quote_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    self.quote_id = data["id"]
                    self.log_test("Professional Creates Quote", True, f"Quote created: {self.quote_id}")
                else:
                    self.log_test("Professional Creates Quote", False, f"Failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("Professional Creates Quote", False, f"Request failed: {str(e)}")
            return
        
        # Test 1: Get quotes with my_quotes=true filter (customer perspective)
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.get(
                f"{BACKEND_URL}/quotes/?my_quotes=true",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    customer_quotes = [q for q in data if q.get("job_request_id") == self.job_id]
                    if customer_quotes:
                        self.log_test("GET /api/quotes (my_quotes=true)", True, f"Retrieved {len(data)} customer quotes")
                    else:
                        self.log_test("GET /api/quotes (my_quotes=true)", False, "Created quote not found in customer quotes")
                else:
                    self.log_test("GET /api/quotes (my_quotes=true)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/quotes (my_quotes=true)", False, f"Request failed: {str(e)}")
        
        # Test 2: Get specific quote details
        if self.quote_id:
            try:
                cookies = {"buildconnect_auth": self.customer_session}
                async with self.session.get(
                    f"{BACKEND_URL}/quotes/{self.quote_id}",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("id") == self.quote_id:
                        required_fields = ["id", "amount", "message", "expires_at", "professional_name"]
                        has_all_fields = all(field in data for field in required_fields)
                        if has_all_fields:
                            self.log_test("GET /api/quotes/{id}", True, f"Quote details: {data.get('amount')} ISK from {data.get('professional_name')}")
                        else:
                            self.log_test("GET /api/quotes/{id}", False, "Missing required fields", data)
                    else:
                        self.log_test("GET /api/quotes/{id}", False, f"Failed: {response.status}", data)
            except Exception as e:
                self.log_test("GET /api/quotes/{id}", False, f"Request failed: {str(e)}")
        
        # Test 3: Accept quote functionality
        if self.quote_id:
            try:
                cookies = {"buildconnect_auth": self.customer_session}
                async with self.session.post(
                    f"{BACKEND_URL}/quotes/{self.quote_id}/accept",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        self.log_test("POST /api/quotes/{id}/accept", True, "Quote accepted successfully")
                    else:
                        self.log_test("POST /api/quotes/{id}/accept", False, f"Accept failed: {response.status}", data)
            except Exception as e:
                self.log_test("POST /api/quotes/{id}/accept", False, f"Request failed: {str(e)}")
        
        # Test 4: Try to decline an already accepted quote (should fail)
        if self.quote_id:
            try:
                cookies = {"buildconnect_auth": self.customer_session}
                async with self.session.post(
                    f"{BACKEND_URL}/quotes/{self.quote_id}/decline",
                    cookies=cookies
                ) as response:
                    if response.status == 400:
                        self.log_test("POST /api/quotes/{id}/decline (Already Accepted)", True, "Correctly prevented declining accepted quote")
                    else:
                        data = await response.json()
                        self.log_test("POST /api/quotes/{id}/decline (Already Accepted)", False, f"Should have failed: {response.status}", data)
            except Exception as e:
                self.log_test("POST /api/quotes/{id}/decline (Already Accepted)", False, f"Request failed: {str(e)}")
    
    async def test_messaging_customer_flow(self):
        """Test messaging APIs focusing on customer dashboard functionality"""
        print("\n=== Testing Messaging Customer Flow ===")
        
        if not self.job_id:
            self.log_test("Messaging Setup", False, "No job ID available for messaging tests")
            return
        
        # Get professional user ID for messaging
        professional_id = None
        try:
            cookies = {"buildconnect_auth": self.professional_session}
            async with self.session.get(f"{BACKEND_URL}/auth/me", cookies=cookies) as response:
                data = await response.json()
                if response.status == 200:
                    professional_id = data.get("id")
                    self.log_test("Get Professional ID", True, f"Professional ID: {professional_id}")
                else:
                    self.log_test("Get Professional ID", False, f"Failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("Get Professional ID", False, f"Request failed: {str(e)}")
            return
        
        # Test 1: Send message from customer to professional
        message_data = {
            "job_request_id": self.job_id,
            "recipient_id": professional_id,
            "content": "Hi Erik, thank you for accepting the quote. When can you start the work? I'm available most weekdays."
        }
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/messages/",
                json=message_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    self.log_test("POST /api/messages (Customer to Professional)", True, f"Message sent: {data.get('id')}")
                else:
                    self.log_test("POST /api/messages (Customer to Professional)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/messages (Customer to Professional)", False, f"Request failed: {str(e)}")
        
        # Test 2: Get job-specific messages
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.get(
                f"{BACKEND_URL}/messages/job/{self.job_id}",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/messages/job/{id}", True, f"Retrieved {len(data)} job messages")
                else:
                    self.log_test("GET /api/messages/job/{id}", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/messages/job/{id}", False, f"Request failed: {str(e)}")
        
        # Test 3: Get customer conversations
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.get(
                f"{BACKEND_URL}/messages/conversations",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    job_conversations = [conv for conv in data if conv.get("job_id") == self.job_id]
                    if job_conversations:
                        self.log_test("GET /api/messages/conversations", True, f"Retrieved {len(data)} conversations")
                    else:
                        self.log_test("GET /api/messages/conversations", False, "Job conversation not found")
                else:
                    self.log_test("GET /api/messages/conversations", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/messages/conversations", False, f"Request failed: {str(e)}")
        
        # Test 4: Professional replies to customer
        reply_data = {
            "job_request_id": self.job_id,
            "recipient_id": await self.get_customer_id(),
            "content": "Hi Sarah, I can start tomorrow morning at 9 AM. The work should take about 2-3 hours as estimated."
        }
        
        try:
            cookies = {"buildconnect_auth": self.professional_session}
            async with self.session.post(
                f"{BACKEND_URL}/messages/",
                json=reply_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    self.log_test("POST /api/messages (Professional Reply)", True, f"Reply sent: {data.get('id')}")
                else:
                    self.log_test("POST /api/messages (Professional Reply)", False, f"Failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/messages (Professional Reply)", False, f"Request failed: {str(e)}")
        
        # Test 5: Test file attachment upload
        try:
            # Create a simple test file
            test_content = b"This is a test file for message attachment"
            
            # Use aiohttp FormData for file upload
            from aiohttp import FormData
            data = FormData()
            data.add_field('file', test_content, filename='test_document.txt', content_type='text/plain')
            
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/messages/upload-attachment",
                data=data,
                cookies=cookies
            ) as response:
                response_data = await response.json()
                if response.status == 200 and response_data.get("file_url"):
                    self.log_test("POST /api/messages/upload-attachment", True, f"File uploaded: {response_data.get('filename')}")
                else:
                    self.log_test("POST /api/messages/upload-attachment", False, f"Upload failed: {response.status}", response_data)
        except Exception as e:
            self.log_test("POST /api/messages/upload-attachment", False, f"Request failed: {str(e)}")
    
    async def get_customer_id(self):
        """Helper method to get customer ID"""
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.get(f"{BACKEND_URL}/auth/me", cookies=cookies) as response:
                data = await response.json()
                if response.status == 200:
                    return data.get("id")
        except Exception:
            pass
        return None
    
    async def test_authentication_and_authorization(self):
        """Test authentication and authorization for customer flow"""
        print("\n=== Testing Authentication & Authorization ===")
        
        # Test 1: Access protected endpoint without authentication
        try:
            async with aiohttp.ClientSession() as fresh_session:
                async with fresh_session.get(f"{BACKEND_URL}/job-requests/?customer_only=true") as response:
                    if response.status == 401:
                        self.log_test("Protected Endpoint (Unauthenticated)", True, "Correctly requires authentication")
                    else:
                        data = await response.json() if response.content_type == 'application/json' else await response.text()
                        self.log_test("Protected Endpoint (Unauthenticated)", False, f"Expected 401, got: {response.status}", data)
        except Exception as e:
            self.log_test("Protected Endpoint (Unauthenticated)", False, f"Request failed: {str(e)}")
        
        # Test 2: Customer trying to create quote (should fail)
        if self.job_id:
            quote_data = {
                "job_request_id": self.job_id,
                "amount": 25000,
                "message": "Customer trying to create quote",
                "estimated_duration": "1 hour",
                "expires_at": (datetime.utcnow() + timedelta(days=7)).isoformat()
            }
            
            try:
                cookies = {"buildconnect_auth": self.customer_session}
                async with self.session.post(
                    f"{BACKEND_URL}/quotes/",
                    json=quote_data,
                    cookies=cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 403:
                        self.log_test("Role-Based Access (Customer Create Quote)", True, "Correctly denied customer quote creation")
                    else:
                        data = await response.json()
                        self.log_test("Role-Based Access (Customer Create Quote)", False, f"Should have failed: {response.status}", data)
            except Exception as e:
                self.log_test("Role-Based Access (Customer Create Quote)", False, f"Request failed: {str(e)}")
        
        # Test 3: Professional trying to access customer-only jobs
        try:
            cookies = {"buildconnect_auth": self.professional_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?customer_only=true",
                cookies=cookies
            ) as response:
                if response.status == 403:
                    self.log_test("Role-Based Access (Professional Customer Jobs)", True, "Correctly denied professional access to customer-only jobs")
                else:
                    data = await response.json()
                    self.log_test("Role-Based Access (Professional Customer Jobs)", False, f"Should have failed: {response.status}", data)
        except Exception as e:
            self.log_test("Role-Based Access (Professional Customer Jobs)", False, f"Request failed: {str(e)}")
        
        # Test 4: Verify customer can access their own job details
        if self.job_id:
            try:
                cookies = {"buildconnect_auth": self.customer_session}
                async with self.session.get(
                    f"{BACKEND_URL}/job-requests/{self.job_id}",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("id") == self.job_id:
                        self.log_test("Customer Access Own Job", True, "Customer can access their own job details")
                    else:
                        self.log_test("Customer Access Own Job", False, f"Access denied: {response.status}", data)
            except Exception as e:
                self.log_test("Customer Access Own Job", False, f"Request failed: {str(e)}")
    
    async def run_customer_flow_tests(self):
        """Run all customer flow tests"""
        print("🚀 Starting Customer Flow Backend API Tests")
        print(f"Testing against: {BACKEND_URL}")
        
        await self.setup()
        
        try:
            # Setup test users
            if not await self.setup_test_users():
                print("❌ Failed to setup test users. Aborting tests.")
                return 0, len(self.test_results), self.test_results
            
            # Run customer flow tests
            await self.test_job_request_customer_flow()
            await self.test_quote_management_customer_flow()
            await self.test_messaging_customer_flow()
            await self.test_authentication_and_authorization()
            
        finally:
            await self.cleanup()
        
        # Print summary
        print("\n" + "="*60)
        print("📊 CUSTOMER FLOW TEST SUMMARY")
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
    tester = CustomerFlowTester()
    passed, failed, results = await tester.run_customer_flow_tests()
    
    # Save detailed results to file
    with open("/app/customer_flow_test_results.json", "w") as f:
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
    
    print(f"\n📄 Detailed results saved to: /app/customer_flow_test_results.json")
    
    # Return exit code based on test results
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)