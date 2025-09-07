#!/usr/bin/env python3
"""
Focused Backend Test for Verki Application
Tests core authentication, email service, and database connectivity as requested
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://movers-platform-1.preview.emergentagent.com/api"

class VerkiBackendTester:
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
    
    async def test_database_connectivity(self):
        """Test MongoDB database connectivity"""
        print("\n=== Testing Database Connectivity ===")
        
        # Test basic API endpoints that require database
        try:
            async with self.session.get(f"{BACKEND_URL}/health") as response:
                data = await response.json()
                if response.status == 200 and data.get("status") == "healthy":
                    self.log_test("Database Health Check", True, "Database connection healthy")
                else:
                    self.log_test("Database Health Check", False, f"Health check failed: {response.status}", data)
        except Exception as e:
            self.log_test("Database Health Check", False, f"Request failed: {str(e)}")
        
        # Test database-dependent endpoint (services)
        try:
            async with self.session.get(f"{BACKEND_URL}/services") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list) and len(data) > 0:
                    self.log_test("Database Services Query", True, f"Retrieved {len(data)} services from database")
                else:
                    self.log_test("Database Services Query", False, f"Services query failed: {response.status}", data)
        except Exception as e:
            self.log_test("Database Services Query", False, f"Request failed: {str(e)}")
        
        # Test database write operation (project creation)
        try:
            project_data = {
                "title": "Database Test Project",
                "description": "Testing database write operations for connectivity verification",
                "serviceType": "testing",
                "location": "Reykjavik, Iceland",
                "budget": "100000-200000 kr",
                "urgency": "within_week"
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/projects/",
                json=project_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("success") is True:
                    project_id = data.get("projectId")
                    self.log_test("Database Write Operation", True, f"Successfully created project: {project_id}")
                else:
                    self.log_test("Database Write Operation", False, f"Project creation failed: {response.status}", data)
        except Exception as e:
            self.log_test("Database Write Operation", False, f"Request failed: {str(e)}")
    
    async def test_passwordless_authentication(self):
        """Test passwordless login flow with email verification"""
        print("\n=== Testing Passwordless Authentication System ===")
        
        # Test 1: Send login link endpoint
        test_email = "test.passwordless@verki.is"
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/send-login-link",
                json={"email": test_email},
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    expected_message = "If an account with this email exists, a login code has been sent"
                    if expected_message in data.get("message", ""):
                        self.log_test("Passwordless Login Link Request", True, f"Login link sent to {test_email}")
                    else:
                        self.log_test("Passwordless Login Link Request", False, "Unexpected response message", data)
                else:
                    self.log_test("Passwordless Login Link Request", False, f"Request failed: {response.status}", data)
        except Exception as e:
            self.log_test("Passwordless Login Link Request", False, f"Request failed: {str(e)}")
        
        # Test 2: Verify endpoint exists for login code verification
        try:
            # This should fail with validation error since we don't have a real code
            async with self.session.post(
                f"{BACKEND_URL}/auth/verify-login-code",
                json={"email": test_email, "code": "123456"},
                headers={"Content-Type": "application/json"}
            ) as response:
                # We expect this to fail, but the endpoint should exist
                if response.status in [400, 401, 422]:  # Expected validation/auth errors
                    self.log_test("Passwordless Code Verification Endpoint", True, "Verification endpoint exists and validates input")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Passwordless Code Verification Endpoint", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("Passwordless Code Verification Endpoint", False, f"Request failed: {str(e)}")
        
        # Test 3: Test with invalid email format
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/send-login-link",
                json={"email": "invalid-email"},
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:  # Validation error expected
                    self.log_test("Passwordless Email Validation", True, "Invalid email format correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Passwordless Email Validation", False, f"Expected validation error, got: {response.status}", data)
        except Exception as e:
            self.log_test("Passwordless Email Validation", False, f"Request failed: {str(e)}")
    
    async def test_auto_registration_system(self):
        """Test auto-registration system for new users"""
        print("\n=== Testing Auto-Registration System ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Test 1: Regular user registration
        user_data = {
            "email": f"autoregister_{timestamp}@verki.is",
            "password": "AutoRegister123!",
            "role": "customer",
            "first_name": "Auto",
            "last_name": "Register",
            "phone": "+354-555-1234",
            "language": "is"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=user_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 201:
                    required_fields = ["id", "email", "role", "is_active"]
                    has_fields = all(field in data for field in required_fields)
                    if has_fields and data.get("email") == user_data["email"]:
                        self.log_test("Auto-Registration (Customer)", True, f"Customer auto-registered: {data.get('email')}")
                    else:
                        self.log_test("Auto-Registration (Customer)", False, "Missing required fields in response", data)
                else:
                    self.log_test("Auto-Registration (Customer)", False, f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("Auto-Registration (Customer)", False, f"Request failed: {str(e)}")
        
        # Test 2: Professional registration
        professional_data = {
            "email": f"autopro_{timestamp}@verki.is",
            "password": "AutoPro123!",
            "role": "professional",
            "first_name": "Auto",
            "last_name": "Professional",
            "phone": "+354-555-5678",
            "company_name": "Auto Construction Ltd",
            "company_id": "KT-987654321",
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
                    if data.get("email") == professional_data["email"] and data.get("role") == "professional":
                        self.log_test("Auto-Registration (Professional)", True, f"Professional auto-registered: {data.get('email')}")
                    else:
                        self.log_test("Auto-Registration (Professional)", False, "Incorrect registration data", data)
                else:
                    self.log_test("Auto-Registration (Professional)", False, f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("Auto-Registration (Professional)", False, f"Request failed: {str(e)}")
        
        # Test 3: Duplicate registration handling
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=user_data,  # Same data as first test
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 400:  # Expected duplicate error
                    self.log_test("Auto-Registration Duplicate Handling", True, "Duplicate registration correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Auto-Registration Duplicate Handling", False, f"Expected 400, got: {response.status}", data)
        except Exception as e:
            self.log_test("Auto-Registration Duplicate Handling", False, f"Request failed: {str(e)}")
    
    async def test_user_management_apis(self):
        """Test basic API endpoints for user management"""
        print("\n=== Testing User Management APIs ===")
        
        # Create a test user first
        import time
        timestamp = str(int(time.time()))
        
        user_data = {
            "email": f"usermgmt_{timestamp}@verki.is",
            "password": "UserMgmt123!",
            "role": "customer",
            "first_name": "User",
            "last_name": "Management",
            "phone": "+354-555-9999",
            "language": "is"
        }
        
        user_session = None
        
        # Register user
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=user_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    self.log_test("User Management Setup", True, "Test user created for management testing")
                else:
                    data = await response.json()
                    self.log_test("User Management Setup", False, f"User creation failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("User Management Setup", False, f"Request failed: {str(e)}")
            return
        
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
                        user_session = cookies["buildconnect_auth"].value
                        self.log_test("User Login for Management", True, "User logged in successfully")
                    else:
                        self.log_test("User Login for Management", False, "Login successful but no auth cookie")
                        return
                else:
                    self.log_test("User Login for Management", False, f"Login failed: {response.status}")
                    return
        except Exception as e:
            self.log_test("User Login for Management", False, f"Request failed: {str(e)}")
            return
        
        # Test get current user info
        if user_session:
            try:
                cookies = {"buildconnect_auth": user_session}
                async with self.session.get(
                    f"{BACKEND_URL}/auth/me",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        required_fields = ["id", "email", "role", "profile", "is_verified"]
                        has_fields = all(field in data for field in required_fields)
                        if has_fields and data.get("email") == user_data["email"]:
                            self.log_test("Get Current User Info", True, f"User info retrieved: {data.get('email')}")
                        else:
                            self.log_test("Get Current User Info", False, "Missing fields or incorrect data", data)
                    else:
                        self.log_test("Get Current User Info", False, f"Failed to get user info: {response.status}", data)
            except Exception as e:
                self.log_test("Get Current User Info", False, f"Request failed: {str(e)}")
        
        # Test profile update
        if user_session:
            try:
                profile_update = {
                    "first_name": "Updated User",
                    "location": "Reykjavik, Iceland",
                    "phone": "+354-555-8888"
                }
                cookies = {"buildconnect_auth": user_session}
                async with self.session.put(
                    f"{BACKEND_URL}/auth/profile",
                    json=profile_update,
                    cookies=cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("message") == "Profile updated successfully":
                        self.log_test("Profile Update", True, "Profile updated successfully")
                    else:
                        self.log_test("Profile Update", False, f"Profile update failed: {response.status}", data)
            except Exception as e:
                self.log_test("Profile Update", False, f"Request failed: {str(e)}")
        
        # Test logout
        if user_session:
            try:
                cookies = {"buildconnect_auth": user_session}
                async with self.session.post(
                    f"{BACKEND_URL}/auth/cookie/logout",
                    cookies=cookies
                ) as response:
                    if response.status == 204:
                        self.log_test("User Logout", True, "Logout successful")
                    else:
                        data = await response.json() if response.content_type == 'application/json' else await response.text()
                        self.log_test("User Logout", False, f"Logout failed: {response.status}", data)
            except Exception as e:
                self.log_test("User Logout", False, f"Request failed: {str(e)}")
    
    async def test_email_service(self):
        """Test email service for sending login codes"""
        print("\n=== Testing Email Service (SMTP Configuration) ===")
        
        # Test 1: Send login link (this should trigger email service)
        test_emails = [
            "verki@verki.is",  # Known user
            "test.email@verki.is",  # Test email
            "nonexistent@verki.is"  # Non-existent user (should still return success for security)
        ]
        
        for email in test_emails:
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/auth/send-login-link",
                    json={"email": email},
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        expected_message = "If an account with this email exists, a login code has been sent"
                        if expected_message in data.get("message", ""):
                            self.log_test(f"Email Service Test ({email})", True, f"Email service processed request for {email}")
                        else:
                            self.log_test(f"Email Service Test ({email})", False, "Unexpected response message", data)
                    else:
                        self.log_test(f"Email Service Test ({email})", False, f"Email service failed: {response.status}", data)
            except Exception as e:
                self.log_test(f"Email Service Test ({email})", False, f"Request failed: {str(e)}")
        
        # Test 2: Email validation
        invalid_emails = ["", "invalid", "@verki.is", "test@", "test..test@verki.is"]
        
        for invalid_email in invalid_emails:
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/auth/send-login-link",
                    json={"email": invalid_email},
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 422:  # Validation error expected
                        self.log_test(f"Email Validation ({invalid_email})", True, f"Invalid email '{invalid_email}' correctly rejected")
                    else:
                        data = await response.json()
                        self.log_test(f"Email Validation ({invalid_email})", False, f"Expected validation error, got: {response.status}", data)
            except Exception as e:
                self.log_test(f"Email Validation ({invalid_email})", False, f"Request failed: {str(e)}")
    
    async def test_verki_user_authentication(self):
        """Test specific verki@verki.is user authentication"""
        print("\n=== Testing verki@verki.is User Authentication ===")
        
        verki_email = "verki@verki.is"
        verki_password = "Lindarbraut31"
        
        # Test 1: Password login
        try:
            login_data = {
                "username": verki_email,
                "password": verki_password
            }
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        self.log_test("Verki User Password Login", True, f"Password login successful for {verki_email}")
                        
                        # Test getting user info
                        try:
                            user_cookies = {"buildconnect_auth": cookies["buildconnect_auth"].value}
                            async with self.session.get(
                                f"{BACKEND_URL}/auth/me",
                                cookies=user_cookies
                            ) as user_response:
                                user_data = await user_response.json()
                                if user_response.status == 200 and user_data.get("email") == verki_email:
                                    self.log_test("Verki User Data Retrieval", True, f"User data retrieved for {verki_email}")
                                else:
                                    self.log_test("Verki User Data Retrieval", False, f"Failed to get user data: {user_response.status}", user_data)
                        except Exception as e:
                            self.log_test("Verki User Data Retrieval", False, f"Request failed: {str(e)}")
                    else:
                        self.log_test("Verki User Password Login", False, "Login successful but no auth cookie")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Verki User Password Login", False, f"Password login failed: {response.status}", data)
        except Exception as e:
            self.log_test("Verki User Password Login", False, f"Request failed: {str(e)}")
        
        # Test 2: Passwordless login still works
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/send-login-link",
                json={"email": verki_email},
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    expected_message = "If an account with this email exists, a login code has been sent"
                    if expected_message in data.get("message", ""):
                        self.log_test("Verki User Passwordless Login", True, f"Passwordless login still works for {verki_email}")
                    else:
                        self.log_test("Verki User Passwordless Login", False, "Unexpected response message", data)
                else:
                    self.log_test("Verki User Passwordless Login", False, f"Passwordless login failed: {response.status}", data)
        except Exception as e:
            self.log_test("Verki User Passwordless Login", False, f"Request failed: {str(e)}")
    
    async def run_all_tests(self):
        """Run all focused tests"""
        print("🚀 Starting Verki Backend Focused Tests")
        print(f"Testing against: {BACKEND_URL}")
        
        await self.setup()
        
        try:
            # Core functionality tests as requested
            await self.test_database_connectivity()
            await self.test_passwordless_authentication()
            await self.test_auto_registration_system()
            await self.test_user_management_apis()
            await self.test_email_service()
            await self.test_verki_user_authentication()
            
        finally:
            await self.cleanup()
        
        # Print summary
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        print(f"\n============================================================")
        print(f"📊 FOCUSED TEST SUMMARY")
        print(f"============================================================")
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {success_rate:.1f}%")
        
        if failed_tests > 0:
            print(f"\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")
        
        return self.test_results

async def main():
    tester = VerkiBackendTester()
    results = await tester.run_all_tests()
    
    # Save results
    with open("/app/focused_test_results.json", "w") as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\n📄 Detailed results saved to: /app/focused_test_results.json")

if __name__ == "__main__":
    asyncio.run(main())