#!/usr/bin/env python3
"""
Firebase Phone Authentication Regression Test Suite
Tests backend API endpoints to ensure no regressions after Firebase integration
"""

import asyncio
import aiohttp
import json
import time
from datetime import datetime
from typing import Dict, Any, List

# Backend URL from environment
BACKEND_URL = "https://build-connect-9.preview.emergentagent.com/api"

class FirebaseRegressionTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.customer_session = None
        self.professional_session = None
        
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
    
    async def test_core_api_health_check(self):
        """Test GET /api/ and GET /api/health endpoints"""
        print("\n=== 1. Core API Health Check ===")
        
        # Test root endpoint
        try:
            async with self.session.get(f"{BACKEND_URL}/") as response:
                data = await response.json()
                if response.status == 200 and "BuildConnect API" in data.get("message", ""):
                    self.log_test("GET /api/", True, f"Status: {response.status}, Message: {data.get('message')}")
                else:
                    self.log_test("GET /api/", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/", False, f"Request failed: {str(e)}")
        
        # Test health endpoint
        try:
            async with self.session.get(f"{BACKEND_URL}/health") as response:
                data = await response.json()
                if response.status == 200 and data.get("status") == "healthy":
                    self.log_test("GET /api/health", True, f"Status: {response.status}, Health: {data.get('status')}")
                else:
                    self.log_test("GET /api/health", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/health", False, f"Request failed: {str(e)}")
    
    async def test_authentication_system(self):
        """Test existing login/logout endpoints"""
        print("\n=== 2. Authentication System ===")
        
        # Use unique emails for each test run
        timestamp = str(int(time.time()))
        
        # Test user registration - Customer
        customer_data = {
            "email": f"firebase_test_customer_{timestamp}@example.com",
            "password": "FirebaseTest123!",
            "role": "customer",
            "first_name": "Firebase",
            "last_name": "Customer",
            "phone": "+354-555-0123",
            "language": "en"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=customer_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 201:
                    self.log_test("Customer Registration", True, f"Customer registered: {data.get('email')}")
                else:
                    self.log_test("Customer Registration", False, f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("Customer Registration", False, f"Request failed: {str(e)}")
        
        # Test customer login
        try:
            login_data = {
                "username": customer_data["email"],
                "password": customer_data["password"]
            }
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        self.customer_session = cookies["buildconnect_auth"].value
                        self.log_test("Customer Login", True, "Customer login successful with cookie")
                    else:
                        self.log_test("Customer Login", False, "Login successful but no auth cookie")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Customer Login", False, f"Login failed: {response.status}", data)
        except Exception as e:
            self.log_test("Customer Login", False, f"Request failed: {str(e)}")
        
        # Test get current user info
        if self.customer_session:
            try:
                cookies = {"buildconnect_auth": self.customer_session}
                async with self.session.get(
                    f"{BACKEND_URL}/auth/me",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        self.log_test("Get Current User", True, f"User info retrieved: {data.get('email')}")
                    else:
                        self.log_test("Get Current User", False, f"Failed to get user info: {response.status}", data)
            except Exception as e:
                self.log_test("Get Current User", False, f"Request failed: {str(e)}")
        
        # Test logout
        if self.customer_session:
            try:
                cookies = {"buildconnect_auth": self.customer_session}
                async with self.session.post(
                    f"{BACKEND_URL}/auth/cookie/logout",
                    cookies=cookies
                ) as response:
                    if response.status == 204:
                        self.log_test("Customer Logout", True, "Logout successful")
                    else:
                        data = await response.json() if response.content_type == 'application/json' else await response.text()
                        self.log_test("Customer Logout", False, f"Logout failed: {response.status}", data)
            except Exception as e:
                self.log_test("Customer Logout", False, f"Request failed: {str(e)}")
    
    async def test_user_management(self):
        """Test user registration and profile endpoints"""
        print("\n=== 3. User Management ===")
        
        # Create a professional user for testing
        timestamp = str(int(time.time()))
        professional_data = {
            "email": f"firebase_test_pro_{timestamp}@example.com",
            "password": "FirebasePro123!",
            "role": "professional",
            "first_name": "Firebase",
            "last_name": "Professional",
            "phone": "+354-555-0456",
            "company_name": "Firebase Test Construction Ltd",
            "company_id": "KT-123456789",
            "language": "is"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=professional_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 201:
                    self.log_test("Professional Registration", True, f"Professional registered: {data.get('email')}")
                else:
                    self.log_test("Professional Registration", False, f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("Professional Registration", False, f"Request failed: {str(e)}")
        
        # Test professional login and profile update
        try:
            login_data = {
                "username": professional_data["email"],
                "password": professional_data["password"]
            }
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
                        
                        # Test profile update
                        profile_update = {
                            "first_name": "Firebase Updated",
                            "location": "Reykjavik, Iceland",
                            "phone": "+354-555-9999"
                        }
                        cookies_dict = {"buildconnect_auth": self.professional_session}
                        async with self.session.put(
                            f"{BACKEND_URL}/auth/profile",
                            json=profile_update,
                            cookies=cookies_dict,
                            headers={"Content-Type": "application/json"}
                        ) as profile_response:
                            profile_data = await profile_response.json()
                            if profile_response.status == 200:
                                self.log_test("Profile Update", True, "Profile updated successfully")
                            else:
                                self.log_test("Profile Update", False, f"Profile update failed: {profile_response.status}", profile_data)
                    else:
                        self.log_test("Professional Login", False, "Login successful but no auth cookie")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Professional Login", False, f"Login failed: {response.status}", data)
        except Exception as e:
            self.log_test("Professional Login", False, f"Request failed: {str(e)}")
    
    async def test_job_request_apis(self):
        """Test job creation, retrieval, and management"""
        print("\n=== 4. Job Request APIs ===")
        
        if not self.customer_session:
            # Re-login customer for job testing
            await self.relogin_customer()
        
        job_id = None
        if self.customer_session:
            # Test job creation
            job_data = {
                "category": "plumbing",
                "title": "Kitchen Sink Installation",
                "description": "Need professional plumber to install new kitchen sink with proper connections and drainage",
                "postcode": "101",
                "budget": "50000-100000",
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
                    if response.status == 201:
                        job_id = data.get("id")
                        self.log_test("Job Creation", True, f"Job created with ID: {job_id}")
                    else:
                        self.log_test("Job Creation", False, f"Job creation failed: {response.status}", data)
            except Exception as e:
                self.log_test("Job Creation", False, f"Request failed: {str(e)}")
            
            # Test job retrieval by ID
            if job_id:
                try:
                    cookies = {"buildconnect_auth": self.customer_session}
                    async with self.session.get(
                        f"{BACKEND_URL}/job-requests/{job_id}",
                        cookies=cookies
                    ) as response:
                        data = await response.json()
                        if response.status == 200:
                            self.log_test("Job Retrieval by ID", True, f"Retrieved job: {data.get('title')}")
                        else:
                            self.log_test("Job Retrieval by ID", False, f"Job retrieval failed: {response.status}", data)
                except Exception as e:
                    self.log_test("Job Retrieval by ID", False, f"Request failed: {str(e)}")
            
            # Test job update
            if job_id:
                try:
                    update_data = {
                        "title": "Kitchen Sink Installation - Updated",
                        "description": "Updated description for kitchen sink installation with additional requirements"
                    }
                    cookies = {"buildconnect_auth": self.customer_session}
                    async with self.session.put(
                        f"{BACKEND_URL}/job-requests/{job_id}",
                        json=update_data,
                        cookies=cookies,
                        headers={"Content-Type": "application/json"}
                    ) as response:
                        data = await response.json()
                        if response.status == 200:
                            self.log_test("Job Update", True, "Job updated successfully")
                        else:
                            self.log_test("Job Update", False, f"Job update failed: {response.status}", data)
                except Exception as e:
                    self.log_test("Job Update", False, f"Request failed: {str(e)}")
    
    async def test_quote_management(self):
        """Test quote submission and management"""
        print("\n=== 5. Quote Management ===")
        
        if not self.professional_session:
            self.log_test("Quote Management Setup", False, "No professional session available")
            return
        
        # First, get available jobs for quoting
        try:
            cookies = {"buildconnect_auth": self.professional_session}
            async with self.session.get(
                f"{BACKEND_URL}/job-requests/?status=open&limit=1",
                cookies=cookies
            ) as response:
                if response.status == 200:
                    try:
                        data = await response.json()
                        if isinstance(data, list) and len(data) > 0:
                            job_id = data[0].get("id")
                            self.log_test("Get Available Jobs", True, f"Found job for quoting: {job_id}")
                            
                            # Test quote submission
                            quote_data = {
                                "job_request_id": job_id,
                                "amount": 75000,
                                "message": "Professional quote for your project with quality materials and workmanship",
                                "estimated_duration": "2-3 days",
                                "materials_cost": 25000,
                                "labor_cost": 50000,
                                "includes_materials": True
                            }
                            
                            async with self.session.post(
                                f"{BACKEND_URL}/quotes/",
                                json=quote_data,
                                cookies=cookies,
                                headers={"Content-Type": "application/json"}
                            ) as quote_response:
                                quote_result = await quote_response.json()
                                if quote_response.status == 201:
                                    quote_id = quote_result.get("id")
                                    self.log_test("Quote Submission", True, f"Quote submitted: {quote_id}")
                                    
                                    # Test quote retrieval
                                    async with self.session.get(
                                        f"{BACKEND_URL}/quotes/{quote_id}",
                                        cookies=cookies
                                    ) as get_response:
                                        get_data = await get_response.json()
                                        if get_response.status == 200:
                                            self.log_test("Quote Retrieval", True, f"Quote retrieved: {get_data.get('amount')}")
                                        else:
                                            self.log_test("Quote Retrieval", False, f"Quote retrieval failed: {get_response.status}", get_data)
                                else:
                                    self.log_test("Quote Submission", False, f"Quote submission failed: {quote_response.status}", quote_result)
                        else:
                            self.log_test("Get Available Jobs", False, "No jobs available for quoting")
                    except Exception as json_error:
                        # Handle non-JSON response
                        text_data = await response.text()
                        self.log_test("Get Available Jobs", False, f"Non-JSON response: {text_data[:200]}")
                else:
                    data = await response.text()
                    self.log_test("Get Available Jobs", False, f"Failed to get jobs: {response.status}", data[:200])
        except Exception as e:
            self.log_test("Quote Management", False, f"Request failed: {str(e)}")
    
    async def test_reviews_system(self):
        """Test review creation and retrieval"""
        print("\n=== 6. Reviews System ===")
        
        # Test homepage reviews retrieval
        try:
            async with self.session.get(f"{BACKEND_URL}/reviews") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("Homepage Reviews", True, f"Retrieved {len(data)} reviews")
                    
                    # Test individual review retrieval if reviews exist
                    if len(data) > 0:
                        review_id = data[0]["id"]
                        async with self.session.get(f"{BACKEND_URL}/reviews/{review_id}") as review_response:
                            review_data = await review_response.json()
                            if review_response.status == 200:
                                self.log_test("Individual Review", True, f"Retrieved review: {review_data.get('title')}")
                            else:
                                self.log_test("Individual Review", False, f"Review retrieval failed: {review_response.status}", review_data)
                else:
                    self.log_test("Homepage Reviews", False, f"Reviews retrieval failed: {response.status}", data)
        except Exception as e:
            self.log_test("Reviews System", False, f"Request failed: {str(e)}")
        
        # Test professional reviews
        try:
            professional_id = "professional-1"  # From sample data
            async with self.session.get(f"{BACKEND_URL}/reviews/professional/{professional_id}") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("Professional Reviews", True, f"Retrieved {len(data)} professional reviews")
                else:
                    self.log_test("Professional Reviews", False, f"Professional reviews failed: {response.status}", data)
        except Exception as e:
            self.log_test("Professional Reviews", False, f"Request failed: {str(e)}")
    
    async def test_company_registration(self):
        """Test POST /api/auth/register-company"""
        print("\n=== 7. Company Registration ===")
        
        timestamp = str(int(time.time()))
        company_data = {
            "company_id": "1234567890",
            "electronic_id": "5551234",
            "name": "Firebase Test Company Ltd",
            "email": f"firebase_company_{timestamp}@example.is",
            "password": "CompanyPass123!"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register-company",
                json=company_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    data = await response.json()
                    self.log_test("Company Registration", True, f"Company registered: {data.get('email')}")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Company Registration", False, f"Company registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("Company Registration", False, f"Request failed: {str(e)}")
        
        # Test company registration validation
        invalid_company_data = {
            "company_id": "123",  # Too short
            "electronic_id": "555",  # Too short
            "name": "Test",
            "email": "invalid-email",
            "password": "123"  # Too short
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register-company",
                json=invalid_company_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status in [400, 422]:
                    self.log_test("Company Registration Validation", True, "Invalid data correctly rejected")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Company Registration Validation", False, f"Expected validation error, got: {response.status}", data)
        except Exception as e:
            self.log_test("Company Registration Validation", False, f"Request failed: {str(e)}")
    
    async def relogin_customer(self):
        """Re-login customer for testing"""
        timestamp = str(int(time.time()))
        customer_data = {
            "email": f"firebase_test_customer_{timestamp}@example.com",
            "password": "FirebaseTest123!",
            "role": "customer",
            "first_name": "Firebase",
            "last_name": "Customer",
            "phone": "+354-555-0123",
            "language": "en"
        }
        
        # Register customer
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=customer_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    # Login customer
                    login_data = {
                        "username": customer_data["email"],
                        "password": customer_data["password"]
                    }
                    async with self.session.post(
                        f"{BACKEND_URL}/auth/cookie/login",
                        data=login_data,
                        headers={"Content-Type": "application/x-www-form-urlencoded"}
                    ) as login_response:
                        if login_response.status == 204:
                            cookies = login_response.cookies
                            if "buildconnect_auth" in cookies:
                                self.customer_session = cookies["buildconnect_auth"].value
        except Exception as e:
            pass
    
    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        print(f"\n{'='*60}")
        print(f"📊 FIREBASE REGRESSION TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {success_rate:.1f}%")
        
        if failed_tests > 0:
            print(f"\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")
        
        return {
            "total": total_tests,
            "passed": passed_tests,
            "failed": failed_tests,
            "success_rate": success_rate,
            "results": self.test_results
        }

async def main():
    """Main test execution"""
    tester = FirebaseRegressionTester()
    
    try:
        await tester.setup()
        print("🚀 Starting Firebase Phone Authentication Regression Tests")
        print(f"Testing against: {BACKEND_URL}")
        
        # Run all test categories mentioned in the review request
        await tester.test_core_api_health_check()
        await tester.test_authentication_system()
        await tester.test_user_management()
        await tester.test_job_request_apis()
        await tester.test_quote_management()
        await tester.test_reviews_system()
        await tester.test_company_registration()
        
        # Print summary
        summary = tester.print_summary()
        
        # Save detailed results
        with open("/app/firebase_regression_results.json", "w") as f:
            json.dump(summary, f, indent=2, default=str)
        
        print(f"\n📄 Detailed results saved to: /app/firebase_regression_results.json")
        
    finally:
        await tester.cleanup()

if __name__ == "__main__":
    asyncio.run(main())