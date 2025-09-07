#!/usr/bin/env python3
"""
Verki Application Login System Test Suite
Tests the authentication endpoints and auto-registration system
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://movers-platform-1.preview.emergentagent.com/api"

class VerkiLoginTester:
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
    
    async def test_auto_login_endpoint(self):
        """Test POST /api/auth/auto-login endpoint"""
        print("\n=== Testing Auto-Login Endpoint ===")
        
        # Test 1: Auto-login with new user (should create user automatically)
        import time
        timestamp = str(int(time.time()))
        new_user_email = f"autouser_{timestamp}@example.com"
        new_user_password = "AutoUser123!"
        
        try:
            auto_login_data = {
                "email": new_user_email,
                "password": new_user_password
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/auth/auto-login",
                json=auto_login_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 200 and data.get("success") is True:
                    user_data = data.get("user", {})
                    if (user_data.get("email") == new_user_email and 
                        user_data.get("id") and 
                        user_data.get("role")):
                        self.log_test("POST /api/auth/auto-login (New User)", True, 
                                    f"Auto-created user: {user_data.get('email')}, ID: {user_data.get('id')}")
                    else:
                        self.log_test("POST /api/auth/auto-login (New User)", False, 
                                    "Missing user data in response", data)
                else:
                    self.log_test("POST /api/auth/auto-login (New User)", False, 
                                f"Auto-login failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/auto-login (New User)", False, f"Request failed: {str(e)}")
        
        # Test 2: Auto-login with existing user (should update password and login)
        try:
            # Use the same user again with different password
            updated_password = "UpdatedPass456!"
            auto_login_data = {
                "email": new_user_email,
                "password": updated_password
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/auth/auto-login",
                json=auto_login_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 200 and data.get("success") is True:
                    user_data = data.get("user", {})
                    if user_data.get("email") == new_user_email:
                        self.log_test("POST /api/auth/auto-login (Existing User)", True, 
                                    f"Updated existing user password: {user_data.get('email')}")
                    else:
                        self.log_test("POST /api/auth/auto-login (Existing User)", False, 
                                    "User data mismatch", data)
                else:
                    self.log_test("POST /api/auth/auto-login (Existing User)", False, 
                                f"Auto-login failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/auto-login (Existing User)", False, f"Request failed: {str(e)}")
        
        # Test 3: Auto-login with invalid email format
        try:
            invalid_data = {
                "email": "invalid-email-format",
                "password": "ValidPass123!"
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/auth/auto-login",
                json=invalid_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:  # Validation error expected
                    self.log_test("POST /api/auth/auto-login (Invalid Email)", True, 
                                "Invalid email format correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("POST /api/auth/auto-login (Invalid Email)", False, 
                                f"Expected validation error, got: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/auto-login (Invalid Email)", False, f"Request failed: {str(e)}")
    
    async def test_traditional_login_flow(self):
        """Test traditional login flow with existing users"""
        print("\n=== Testing Traditional Login Flow ===")
        
        # Test with verki@verki.is user (should exist from test_result.md)
        verki_email = "verki@verki.is"
        verki_password = "Lindarbraut31"
        
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
                if response.status == 204:  # Successful login
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        auth_cookie = cookies["buildconnect_auth"].value
                        self.log_test("POST /api/auth/cookie/login (verki@verki.is)", True, 
                                    "Login successful with authentication cookie")
                        return auth_cookie
                    else:
                        self.log_test("POST /api/auth/cookie/login (verki@verki.is)", False, 
                                    "Login successful but no auth cookie")
                        return None
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("POST /api/auth/cookie/login (verki@verki.is)", False, 
                                f"Login failed: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("POST /api/auth/cookie/login (verki@verki.is)", False, f"Request failed: {str(e)}")
            return None
    
    async def test_session_management(self, auth_cookie: str):
        """Test session management and user info retrieval"""
        print("\n=== Testing Session Management ===")
        
        if not auth_cookie:
            self.log_test("Session Management Test", False, "No auth cookie available for testing")
            return
        
        # Test 1: Get current user info
        try:
            cookies = {"buildconnect_auth": auth_cookie}
            async with self.session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                data = await response.json()
                
                if response.status == 200:
                    required_fields = ["id", "email", "role", "profile", "is_verified"]
                    has_fields = all(field in data for field in required_fields)
                    
                    if has_fields and data.get("email") == "verki@verki.is":
                        self.log_test("GET /api/auth/me (Authenticated)", True, 
                                    f"User info retrieved: {data.get('email')}, Role: {data.get('role')}")
                    else:
                        self.log_test("GET /api/auth/me (Authenticated)", False, 
                                    "Missing required fields or incorrect user", data)
                else:
                    self.log_test("GET /api/auth/me (Authenticated)", False, 
                                f"Failed to get user info: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/auth/me (Authenticated)", False, f"Request failed: {str(e)}")
        
        # Test 2: Test protected endpoint access
        try:
            cookies = {"buildconnect_auth": auth_cookie}
            async with self.session.put(
                f"{BACKEND_URL}/auth/profile",
                json={"first_name": "Verki Updated"},
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 200 and data.get("message") == "Profile updated successfully":
                    self.log_test("PUT /api/auth/profile (Authenticated)", True, 
                                "Profile update successful with valid session")
                else:
                    self.log_test("PUT /api/auth/profile (Authenticated)", False, 
                                f"Profile update failed: {response.status}", data)
        except Exception as e:
            self.log_test("PUT /api/auth/profile (Authenticated)", False, f"Request failed: {str(e)}")
        
        # Test 3: Test logout
        try:
            cookies = {"buildconnect_auth": auth_cookie}
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/logout",
                cookies=cookies
            ) as response:
                if response.status == 204:
                    self.log_test("POST /api/auth/cookie/logout", True, "Logout successful")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("POST /api/auth/cookie/logout", False, 
                                f"Logout failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/cookie/logout", False, f"Request failed: {str(e)}")
    
    async def test_unauthenticated_access(self):
        """Test that protected endpoints require authentication"""
        print("\n=== Testing Unauthenticated Access ===")
        
        # Test accessing protected endpoint without authentication
        try:
            async with self.session.get(f"{BACKEND_URL}/auth/me") as response:
                if response.status == 401:
                    self.log_test("GET /api/auth/me (Unauthenticated)", True, 
                                "Protected endpoint correctly requires authentication")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("GET /api/auth/me (Unauthenticated)", False, 
                                f"Expected 401, got: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/auth/me (Unauthenticated)", False, f"Request failed: {str(e)}")
    
    async def test_user_creation_functionality(self):
        """Test user creation through registration endpoint"""
        print("\n=== Testing User Creation Functionality ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Test customer registration
        customer_data = {
            "email": f"test_customer_{timestamp}@example.com",
            "password": "CustomerPass123!",
            "role": "customer",
            "first_name": "Test",
            "last_name": "Customer",
            "phone": "+354-555-1234",
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
                    required_fields = ["id", "email", "role", "is_active"]
                    has_fields = all(field in data for field in required_fields)
                    
                    if has_fields and data.get("email") == customer_data["email"]:
                        self.log_test("POST /api/auth/register (Customer)", True, 
                                    f"Customer registered: {data.get('email')}")
                    else:
                        self.log_test("POST /api/auth/register (Customer)", False, 
                                    "Missing required fields in response", data)
                else:
                    self.log_test("POST /api/auth/register (Customer)", False, 
                                f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/register (Customer)", False, f"Request failed: {str(e)}")
        
        # Test professional registration
        professional_data = {
            "email": f"test_professional_{timestamp}@example.com",
            "password": "ProfessionalPass123!",
            "role": "professional",
            "first_name": "Test",
            "last_name": "Professional",
            "phone": "+354-555-5678",
            "company_name": "Test Construction Ltd",
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
                    if (data.get("email") == professional_data["email"] and 
                        data.get("role") == "professional"):
                        self.log_test("POST /api/auth/register (Professional)", True, 
                                    f"Professional registered: {data.get('email')}")
                    else:
                        self.log_test("POST /api/auth/register (Professional)", False, 
                                    "Incorrect registration data", data)
                else:
                    self.log_test("POST /api/auth/register (Professional)", False, 
                                f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/register (Professional)", False, f"Request failed: {str(e)}")
    
    async def test_database_connectivity(self):
        """Test database connectivity for user operations"""
        print("\n=== Testing Database Connectivity ===")
        
        # Test basic API connectivity first
        try:
            async with self.session.get(f"{BACKEND_URL}/health") as response:
                data = await response.json()
                
                if response.status == 200 and data.get("status") == "healthy":
                    self.log_test("Database Connectivity (Health Check)", True, 
                                "Backend API is healthy and responding")
                else:
                    self.log_test("Database Connectivity (Health Check)", False, 
                                f"Health check failed: {response.status}", data)
        except Exception as e:
            self.log_test("Database Connectivity (Health Check)", False, f"Request failed: {str(e)}")
        
        # Test user-related database operations by attempting to create and retrieve a user
        import time
        timestamp = str(int(time.time()))
        test_email = f"db_test_{timestamp}@example.com"
        
        try:
            # Create user
            user_data = {
                "email": test_email,
                "password": "DbTest123!",
                "role": "customer",
                "first_name": "Database",
                "last_name": "Test",
                "phone": "+354-555-9999",
                "language": "en"
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=user_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    # Try to login with created user to verify database persistence
                    login_data = {
                        "username": test_email,
                        "password": "DbTest123!"
                    }
                    
                    async with self.session.post(
                        f"{BACKEND_URL}/auth/cookie/login",
                        data=login_data,
                        headers={"Content-Type": "application/x-www-form-urlencoded"}
                    ) as login_response:
                        if login_response.status == 204:
                            self.log_test("Database Connectivity (User Persistence)", True, 
                                        "User creation and retrieval working correctly")
                        else:
                            self.log_test("Database Connectivity (User Persistence)", False, 
                                        f"User created but login failed: {login_response.status}")
                else:
                    data = await response.json()
                    self.log_test("Database Connectivity (User Creation)", False, 
                                f"User creation failed: {response.status}", data)
        except Exception as e:
            self.log_test("Database Connectivity (User Operations)", False, f"Request failed: {str(e)}")
    
    async def test_redirect_behavior(self):
        """Test redirect behavior after successful login"""
        print("\n=== Testing Redirect Behavior ===")
        
        # Note: Since we're testing the backend API directly, we can't test actual redirects
        # But we can verify that login responses are structured correctly for frontend handling
        
        import time
        timestamp = str(int(time.time()))
        test_email = f"redirect_test_{timestamp}@example.com"
        
        try:
            # Create user via auto-login
            auto_login_data = {
                "email": test_email,
                "password": "RedirectTest123!"
            }
            
            async with self.session.post(
                f"{BACKEND_URL}/auth/auto-login",
                json=auto_login_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 200 and data.get("success") is True:
                    user_data = data.get("user", {})
                    
                    # Check if response contains necessary data for frontend redirect logic
                    if (user_data.get("role") and 
                        user_data.get("id") and 
                        user_data.get("email")):
                        self.log_test("Login Response Structure", True, 
                                    f"Login response contains role ({user_data.get('role')}) for redirect logic")
                    else:
                        self.log_test("Login Response Structure", False, 
                                    "Login response missing data needed for redirects", data)
                else:
                    self.log_test("Login Response Structure", False, 
                                f"Auto-login failed: {response.status}", data)
        except Exception as e:
            self.log_test("Login Response Structure", False, f"Request failed: {str(e)}")
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("VERKI LOGIN SYSTEM TEST SUMMARY")
        print("="*60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print(f"\nFAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"❌ {result['test']}: {result['details']}")
        
        print("\n" + "="*60)
        
        return passed_tests, failed_tests, total_tests

async def main():
    """Main test execution"""
    tester = VerkiLoginTester()
    
    try:
        await tester.setup()
        
        print("Starting Verki Login System Tests...")
        print(f"Backend URL: {BACKEND_URL}")
        
        # Test 1: Auto-login endpoint
        await tester.test_auto_login_endpoint()
        
        # Test 2: Traditional login flow
        auth_cookie = await tester.test_traditional_login_flow()
        
        # Test 3: Session management
        await tester.test_session_management(auth_cookie)
        
        # Test 4: Unauthenticated access
        await tester.test_unauthenticated_access()
        
        # Test 5: User creation functionality
        await tester.test_user_creation_functionality()
        
        # Test 6: Database connectivity
        await tester.test_database_connectivity()
        
        # Test 7: Redirect behavior
        await tester.test_redirect_behavior()
        
        # Print summary
        passed, failed, total = tester.print_summary()
        
        return passed, failed, total
        
    finally:
        await tester.cleanup()

if __name__ == "__main__":
    asyncio.run(main())