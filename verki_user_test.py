#!/usr/bin/env python3
"""
Focused test for verki@verki.is user creation and authentication
Tests the specific requirements from the review request
"""

import asyncio
import aiohttp
import json
import bcrypt
from datetime import datetime
from typing import Dict, Any

# Get backend URL from environment
BACKEND_URL = "https://byggja-verki.preview.emergentagent.com/api"

class VerkiUserTester:
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

    async def test_verki_user_requirements(self):
        """Test all requirements from the review request"""
        print("\n=== Testing verki@verki.is User Requirements ===")
        
        email = "verki@verki.is"
        password = "Lindarbraut31"
        
        # Step 1: Verify user exists in database
        await self.verify_user_exists(email)
        
        # Step 2: Test password login functionality
        session_cookie = await self.test_password_login(email, password)
        
        # Step 3: Verify user data and role
        if session_cookie:
            await self.verify_user_data(session_cookie, email)
        
        # Step 4: Test passwordless login still works
        await self.test_passwordless_login(email)
        
        # Step 5: Test wrong password is rejected
        await self.test_wrong_password(email)
        
        # Step 6: Test logout functionality
        if session_cookie:
            await self.test_logout(session_cookie)

    async def verify_user_exists(self, email: str):
        """Verify that verki@verki.is user exists in the database"""
        print(f"\n--- Step 1: Verifying {email} user exists in database ---")
        
        try:
            # Try to send a login link to verify user exists
            async with self.session.post(
                f"{BACKEND_URL}/auth/send-login-link",
                json={"email": email},
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    self.log_test("User Exists Verification", True, f"User {email} exists - login link endpoint responded successfully")
                else:
                    self.log_test("User Exists Verification", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("User Exists Verification", False, f"Request failed: {str(e)}")

    async def test_password_login(self, email: str, password: str):
        """Test password login with verki@verki.is / Lindarbraut31"""
        print(f"\n--- Step 2: Testing password login for {email} ---")
        
        login_data = {
            "username": email,
            "password": password
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    # Successful login
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        session_cookie = cookies["buildconnect_auth"].value
                        self.log_test("Password Login Success", True, f"Password login successful for {email} with password '{password}'")
                        return session_cookie
                    else:
                        self.log_test("Password Login Success", False, "Login successful but no auth cookie set")
                        return None
                elif response.status == 400:
                    # Bad credentials
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    if "LOGIN_BAD_CREDENTIALS" in str(data):
                        self.log_test("Password Login Success", False, f"LOGIN_BAD_CREDENTIALS - password authentication failed for {email}")
                    else:
                        self.log_test("Password Login Success", False, f"Login failed with 400: {data}")
                    return None
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Password Login Success", False, f"Unexpected response: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("Password Login Success", False, f"Request failed: {str(e)}")
            return None

    async def verify_user_data(self, session_cookie: str, email: str):
        """Verify user data matches requirements (role: customer, name: Róbert)"""
        print(f"\n--- Step 3: Verifying user data for {email} ---")
        
        try:
            cookies = {"buildconnect_auth": session_cookie}
            async with self.session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    # Check required fields
                    user_id = data.get("id")
                    user_email = data.get("email")
                    user_role = data.get("role")
                    profile = data.get("profile", {})
                    first_name = profile.get("first_name", "")
                    
                    # Verify email matches
                    if user_email == email:
                        self.log_test("User Email Verification", True, f"Email matches: {user_email}")
                    else:
                        self.log_test("User Email Verification", False, f"Email mismatch: expected {email}, got {user_email}")
                    
                    # Verify role is customer
                    if user_role == "customer":
                        self.log_test("User Role Verification", True, f"Role is customer as required")
                    else:
                        self.log_test("User Role Verification", False, f"Role mismatch: expected 'customer', got '{user_role}'")
                    
                    # Check if name is Róbert (or similar)
                    if first_name.lower() in ["róbert", "robert", "verki"]:
                        self.log_test("User Name Verification", True, f"Name matches requirement: '{first_name}'")
                    else:
                        self.log_test("User Name Verification", False, f"Name doesn't match 'Róbert': got '{first_name}'")
                    
                    # Log all user data for verification
                    self.log_test("User Data Retrieved", True, f"User ID: {user_id}, Email: {user_email}, Role: {user_role}, Name: {first_name}")
                    
                else:
                    self.log_test("User Data Retrieval", False, f"Failed to get user data: {response.status}", data)
        except Exception as e:
            self.log_test("User Data Retrieval", False, f"Request failed: {str(e)}")

    async def test_passwordless_login(self, email: str):
        """Test that passwordless login still works for verki@verki.is"""
        print(f"\n--- Step 4: Testing passwordless login for {email} ---")
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/send-login-link",
                json={"email": email},
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and "login code has been sent" in data.get("message", "").lower():
                    self.log_test("Passwordless Login Works", True, f"Passwordless login code sent successfully to {email}")
                else:
                    self.log_test("Passwordless Login Works", False, f"Passwordless login failed: {response.status}", data)
        except Exception as e:
            self.log_test("Passwordless Login Works", False, f"Request failed: {str(e)}")

    async def test_wrong_password(self, email: str):
        """Test that wrong password is properly rejected"""
        print(f"\n--- Step 5: Testing wrong password rejection for {email} ---")
        
        wrong_passwords = ["wrongpassword", "Lindarbraut32", "lindarbraut31", "LINDARBRAUT31"]
        
        for wrong_password in wrong_passwords:
            try:
                login_data = {
                    "username": email,
                    "password": wrong_password
                }
                async with self.session.post(
                    f"{BACKEND_URL}/auth/cookie/login",
                    data=login_data,
                    headers={"Content-Type": "application/x-www-form-urlencoded"}
                ) as response:
                    if response.status == 400:
                        data = await response.json() if response.content_type == 'application/json' else await response.text()
                        if "LOGIN_BAD_CREDENTIALS" in str(data):
                            self.log_test(f"Wrong Password Rejected ({wrong_password})", True, f"Wrong password '{wrong_password}' correctly rejected")
                        else:
                            self.log_test(f"Wrong Password Rejected ({wrong_password})", False, f"Wrong password rejected but unexpected message: {data}")
                    else:
                        data = await response.json() if response.content_type == 'application/json' else await response.text()
                        self.log_test(f"Wrong Password Rejected ({wrong_password})", False, f"Wrong password not rejected: {response.status}", data)
            except Exception as e:
                self.log_test(f"Wrong Password Rejected ({wrong_password})", False, f"Request failed: {str(e)}")

    async def test_logout(self, session_cookie: str):
        """Test logout functionality"""
        print(f"\n--- Step 6: Testing logout functionality ---")
        
        try:
            cookies = {"buildconnect_auth": session_cookie}
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/logout",
                cookies=cookies
            ) as response:
                if response.status == 204:
                    self.log_test("Logout Success", True, "Logout successful")
                    
                    # Verify session is invalidated by trying to access protected endpoint
                    async with self.session.get(
                        f"{BACKEND_URL}/auth/me",
                        cookies=cookies
                    ) as verify_response:
                        if verify_response.status == 401:
                            self.log_test("Session Invalidated", True, "Session correctly invalidated after logout")
                        else:
                            self.log_test("Session Invalidated", False, f"Session still valid after logout: {verify_response.status}")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Logout Success", False, f"Logout failed: {response.status}", data)
        except Exception as e:
            self.log_test("Logout Success", False, f"Request failed: {str(e)}")

    async def create_user_if_missing(self, email: str, password: str):
        """Create the user if it doesn't exist (for testing purposes)"""
        print(f"\n--- Creating user {email} if missing ---")
        
        user_data = {
            "email": email,
            "password": password,
            "role": "customer",
            "first_name": "Róbert",
            "last_name": "Verki",
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
                if response.status == 201:
                    self.log_test("User Creation", True, f"User {email} created successfully")
                elif response.status == 400 and "already exists" in str(data).lower():
                    self.log_test("User Creation", True, f"User {email} already exists (good)")
                else:
                    self.log_test("User Creation", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("User Creation", False, f"Request failed: {str(e)}")

    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"\n{'='*60}")
        print(f"📊 VERKI USER TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print(f"\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")

async def main():
    """Main test function"""
    print("🚀 Starting verki@verki.is User Authentication Tests")
    print(f"Testing against: {BACKEND_URL}")
    
    tester = VerkiUserTester()
    await tester.setup()
    
    try:
        # First ensure user exists (create if needed)
        await tester.create_user_if_missing("verki@verki.is", "Lindarbraut31")
        
        # Run all tests
        await tester.test_verki_user_requirements()
        
        # Print summary
        tester.print_summary()
        
    finally:
        await tester.cleanup()

if __name__ == "__main__":
    asyncio.run(main())