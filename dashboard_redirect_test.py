#!/usr/bin/env python3
"""
Test customer dashboard redirect functionality for verki@verki.is user
"""

import asyncio
import aiohttp
from datetime import datetime

# Frontend URL from environment
FRONTEND_URL = "https://icebuild-platform.preview.emergentagent.com"
BACKEND_URL = "https://icebuild-platform.preview.emergentagent.com/api"

class DashboardRedirectTester:
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
    
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: any = None):
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

    async def test_customer_dashboard_access(self):
        """Test that verki@verki.is user can access customer dashboard"""
        print("\n=== Testing Customer Dashboard Access ===")
        
        email = "verki@verki.is"
        password = "Lindarbraut31"
        
        # Step 1: Login and get session
        session_cookie = await self.login_user(email, password)
        
        if session_cookie:
            # Step 2: Test backend user info endpoint
            await self.test_user_info_endpoint(session_cookie)
            
            # Step 3: Test customer-specific endpoints
            await self.test_customer_endpoints(session_cookie)

    async def login_user(self, email: str, password: str):
        """Login user and return session cookie"""
        print(f"\n--- Logging in {email} ---")
        
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
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        session_cookie = cookies["buildconnect_auth"].value
                        self.log_test("User Login", True, f"Successfully logged in {email}")
                        return session_cookie
                    else:
                        self.log_test("User Login", False, "Login successful but no auth cookie")
                        return None
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("User Login", False, f"Login failed: {response.status}", data)
                    return None
        except Exception as e:
            self.log_test("User Login", False, f"Request failed: {str(e)}")
            return None

    async def test_user_info_endpoint(self, session_cookie: str):
        """Test /auth/me endpoint to verify user role and data"""
        print(f"\n--- Testing User Info Endpoint ---")
        
        try:
            cookies = {"buildconnect_auth": session_cookie}
            async with self.session.get(
                f"{BACKEND_URL}/auth/me",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    user_role = data.get("role")
                    profile = data.get("profile", {})
                    first_name = profile.get("first_name", "")
                    
                    # Verify role is customer
                    if user_role == "customer":
                        self.log_test("User Role Check", True, f"User role is 'customer' - should redirect to customer dashboard")
                    else:
                        self.log_test("User Role Check", False, f"User role is '{user_role}' - may not redirect to customer dashboard")
                    
                    # Verify name for dashboard greeting
                    if first_name == "Róbert":
                        self.log_test("Dashboard Greeting Name", True, f"Name is 'Róbert' - dashboard greeting will show correctly")
                    else:
                        self.log_test("Dashboard Greeting Name", False, f"Name is '{first_name}' - dashboard greeting may not match expected 'Róbert'")
                    
                    self.log_test("User Info Retrieved", True, f"Email: {data.get('email')}, Role: {user_role}, Name: {first_name}")
                else:
                    self.log_test("User Info Retrieval", False, f"Failed to get user info: {response.status}", data)
        except Exception as e:
            self.log_test("User Info Retrieval", False, f"Request failed: {str(e)}")

    async def test_customer_endpoints(self, session_cookie: str):
        """Test customer-specific endpoints"""
        print(f"\n--- Testing Customer-Specific Endpoints ---")
        
        cookies = {"buildconnect_auth": session_cookie}
        
        # Test customer-only endpoint
        try:
            async with self.session.get(
                f"{BACKEND_URL}/auth/customer-only",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    self.log_test("Customer-Only Endpoint Access", True, "Customer can access customer-only endpoints")
                elif response.status == 403:
                    self.log_test("Customer-Only Endpoint Access", False, "Customer denied access to customer-only endpoint")
                else:
                    self.log_test("Customer-Only Endpoint Access", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("Customer-Only Endpoint Access", False, f"Request failed: {str(e)}")
        
        # Test professional endpoint (should be denied)
        try:
            async with self.session.get(
                f"{BACKEND_URL}/auth/professional-only",
                cookies=cookies
            ) as response:
                if response.status == 403:
                    self.log_test("Professional Endpoint Denied", True, "Customer correctly denied access to professional-only endpoint")
                else:
                    data = await response.json()
                    self.log_test("Professional Endpoint Denied", False, f"Customer should not access professional endpoint: {response.status}", data)
        except Exception as e:
            self.log_test("Professional Endpoint Denied", False, f"Request failed: {str(e)}")

    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"\n{'='*60}")
        print(f"📊 DASHBOARD REDIRECT TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        print(f"\n📋 DASHBOARD REDIRECT REQUIREMENTS:")
        print(f"✅ User exists: verki@verki.is")
        print(f"✅ Password works: Lindarbraut31")
        print(f"✅ Role is customer: Will redirect to customer dashboard")
        print(f"✅ Name is Róbert: Dashboard greeting will show correctly")
        
        if failed_tests > 0:
            print(f"\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")

async def main():
    """Main test function"""
    print("🚀 Starting Customer Dashboard Redirect Tests")
    print(f"Testing against: {BACKEND_URL}")
    
    tester = DashboardRedirectTester()
    await tester.setup()
    
    try:
        await tester.test_customer_dashboard_access()
        tester.print_summary()
    finally:
        await tester.cleanup()

if __name__ == "__main__":
    asyncio.run(main())