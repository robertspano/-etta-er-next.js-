#!/usr/bin/env python3
"""
Focused test for Public Job Posting Wizard functionality
Tests the specific endpoints and scenarios requested
"""

import asyncio
import aiohttp
import json
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://buildconnect-ui-1.preview.emergentagent.com/api"

class PublicWizardTester:
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
    
    async def test_guest_session_flow(self):
        """Test complete guest session flow"""
        print("\n=== Testing Guest Session Flow ===")
        
        # Step 1: Create draft as guest
        draft_data = {
            "category": "plumbing",
            "title": "Emergency Kitchen Sink Repair Needed",
            "description": "My kitchen sink is leaking badly and needs immediate professional attention. The leak is coming from under the sink and water is pooling on the floor.",
            "postcode": "101"
        }
        
        draft_id = None
        guest_cookies = None
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=draft_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                # Check response
                if response.status == 200 and data.get("id"):
                    draft_id = data["id"]
                    
                    # Extract all cookies from response
                    guest_cookies = {}
                    for cookie_name, cookie_obj in response.cookies.items():
                        guest_cookies[cookie_name] = cookie_obj.value
                    
                    # Check if guest cookie was set
                    if "bc_guest_id" in guest_cookies:
                        guest_id = guest_cookies["bc_guest_id"]
                        self.log_test("Create Draft (Guest)", True, f"Draft created: {draft_id}, Guest ID: {guest_id[:8]}...")
                    else:
                        self.log_test("Create Draft (Guest)", True, f"Draft created: {draft_id} (no guest cookie detected)")
                        # Still continue with test
                else:
                    self.log_test("Create Draft (Guest)", False, f"Draft creation failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("Create Draft (Guest)", False, f"Request failed: {str(e)}")
            return
        
        # Step 2: Update draft with contact info
        if draft_id:
            contact_data = {
                "email": "homeowner@example.com",
                "phone": "+354-555-1234",
                "firstName": "Anna",
                "lastName": "Sigurdsdottir",
                "address": "Laugavegur 25, Reykjavik",
                "postcode": "101",
                "contactPreference": "platform_and_phone"
            }
            
            try:
                # Use cookies from previous request
                async with self.session.patch(
                    f"{BACKEND_URL}/public/job-requests/{draft_id}",
                    json=contact_data,
                    cookies=guest_cookies if guest_cookies else {},
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        self.log_test("Update Draft (Guest)", True, "Draft updated with contact info")
                    else:
                        self.log_test("Update Draft (Guest)", False, f"Update failed: {response.status}", data)
            except Exception as e:
                self.log_test("Update Draft (Guest)", False, f"Request failed: {str(e)}")
        
        # Step 3: Submit draft
        if draft_id:
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/public/job-requests/{draft_id}/submit",
                    cookies=guest_cookies if guest_cookies else {}
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("status") == "open":
                        self.log_test("Submit Draft (Guest)", True, f"Draft submitted successfully, status: {data.get('status')}")
                    else:
                        self.log_test("Submit Draft (Guest)", False, f"Submit failed: {response.status}", data)
            except Exception as e:
                self.log_test("Submit Draft (Guest)", False, f"Request failed: {str(e)}")
    
    async def test_validation_scenarios(self):
        """Test validation scenarios"""
        print("\n=== Testing Validation Scenarios ===")
        
        # Test 1: Short title
        short_title_data = {
            "category": "plumbing",
            "title": "Short",  # Only 5 characters
            "description": "This description is long enough to pass validation requirements for the job posting wizard",
            "postcode": "101"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=short_title_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:
                    self.log_test("Validation (Short Title)", True, "Short title correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Validation (Short Title)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Validation (Short Title)", False, f"Request failed: {str(e)}")
        
        # Test 2: Short description
        short_desc_data = {
            "category": "electrical",
            "title": "Electrical Work Needed Urgently",
            "description": "Too short",  # Only 9 characters
            "postcode": "101"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=short_desc_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:
                    self.log_test("Validation (Short Description)", True, "Short description correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Validation (Short Description)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Validation (Short Description)", False, f"Request failed: {str(e)}")
    
    async def test_authorization_scenarios(self):
        """Test authorization scenarios"""
        print("\n=== Testing Authorization Scenarios ===")
        
        # Create draft with first session
        draft_data = {
            "category": "renovation",
            "title": "Bathroom Renovation Project",
            "description": "Complete bathroom renovation including new tiles, fixtures, and plumbing work needed for modern upgrade",
            "postcode": "105"
        }
        
        draft_id = None
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=draft_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    draft_id = data["id"]
                    self.log_test("Authorization Setup", True, f"Draft created: {draft_id}")
                else:
                    self.log_test("Authorization Setup", False, f"Setup failed: {response.status}")
                    return
        except Exception as e:
            self.log_test("Authorization Setup", False, f"Request failed: {str(e)}")
            return
        
        # Try to update with different session (no cookies)
        if draft_id:
            try:
                async with aiohttp.ClientSession() as different_session:
                    update_data = {"title": "Unauthorized Update Attempt"}
                    async with different_session.patch(
                        f"{BACKEND_URL}/public/job-requests/{draft_id}",
                        json=update_data,
                        headers={"Content-Type": "application/json"}
                    ) as response:
                        if response.status == 403:
                            self.log_test("Authorization (Different Guest)", True, "Different guest correctly denied access")
                        else:
                            data = await response.json()
                            self.log_test("Authorization (Different Guest)", False, f"Expected 403, got: {response.status}", data)
            except Exception as e:
                self.log_test("Authorization (Different Guest)", False, f"Request failed: {str(e)}")
    
    async def test_rate_limiting(self):
        """Test rate limiting functionality"""
        print("\n=== Testing Rate Limiting ===")
        
        base_data = {
            "category": "cleaning",
            "title": "House Cleaning Service Required",
            "description": "Professional house cleaning service needed for deep cleaning of entire home including all rooms",
            "postcode": "107"
        }
        
        successful_requests = 0
        rate_limited = False
        
        # Use a single session to maintain guest ID
        async with aiohttp.ClientSession() as rate_test_session:
            for i in range(15):  # Try 15 requests
                try:
                    test_data = base_data.copy()
                    test_data["title"] = f"House Cleaning Service Required #{i+1}"
                    
                    async with rate_test_session.post(
                        f"{BACKEND_URL}/public/job-requests/draft",
                        json=test_data,
                        headers={"Content-Type": "application/json"}
                    ) as response:
                        if response.status == 200:
                            successful_requests += 1
                        elif response.status == 429:
                            rate_limited = True
                            break
                        else:
                            # Other error, continue to see pattern
                            pass
                except Exception as e:
                    break
        
        if rate_limited and successful_requests >= 10:
            self.log_test("Rate Limiting", True, f"Rate limiting working: {successful_requests} successful, then blocked")
        elif successful_requests >= 10 and not rate_limited:
            self.log_test("Rate Limiting", False, f"Rate limiting not enforced: {successful_requests} requests allowed")
        else:
            self.log_test("Rate Limiting", False, f"Unexpected behavior: {successful_requests} successful, rate_limited: {rate_limited}")
    
    async def test_authenticated_user_access(self):
        """Test that authenticated users can use public endpoints"""
        print("\n=== Testing Authenticated User Access ===")
        
        # Create and login user
        import time
        timestamp = str(int(time.time()))
        
        user_data = {
            "email": f"public_wizard_user_{timestamp}@example.com",
            "password": "PublicTest123!",
            "role": "customer",
            "first_name": "Public",
            "last_name": "User",
            "phone": "+354-555-8888",
            "language": "en"
        }
        
        # Register
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=user_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status != 201:
                    self.log_test("Auth User Setup", False, f"Registration failed: {response.status}")
                    return
        except Exception as e:
            self.log_test("Auth User Setup", False, f"Registration failed: {str(e)}")
            return
        
        # Login
        user_cookies = None
        try:
            login_data = {"username": user_data["email"], "password": user_data["password"]}
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    user_cookies = {}
                    for cookie_name, cookie_obj in response.cookies.items():
                        user_cookies[cookie_name] = cookie_obj.value
                    self.log_test("Auth User Login", True, "User logged in successfully")
                else:
                    self.log_test("Auth User Login", False, f"Login failed: {response.status}")
                    return
        except Exception as e:
            self.log_test("Auth User Login", False, f"Login failed: {str(e)}")
            return
        
        # Test public endpoint with authenticated user
        if user_cookies:
            draft_data = {
                "category": "automotive",
                "title": "Car Repair Service Needed",
                "description": "Professional car repair service needed for engine diagnostics and potential repair work on vehicle",
                "postcode": "108"
            }
            
            try:
                async with self.session.post(
                    f"{BACKEND_URL}/public/job-requests/draft",
                    json=draft_data,
                    cookies=user_cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("id"):
                        self.log_test("Public Endpoint (Auth User)", True, f"Authenticated user can use public endpoint: {data.get('id')}")
                    else:
                        self.log_test("Public Endpoint (Auth User)", False, f"Public endpoint failed for auth user: {response.status}", data)
            except Exception as e:
                self.log_test("Public Endpoint (Auth User)", False, f"Request failed: {str(e)}")
    
    async def test_all_categories(self):
        """Test all wizard categories"""
        print("\n=== Testing All Wizard Categories ===")
        
        categories = [
            "handcraft",
            "bathroom", 
            "automotive",
            "majorProjects",
            "cleaning",
            "housingAssociations",
            "moving"
        ]
        
        for category in categories:
            try:
                draft_data = {
                    "category": category,
                    "title": f"Professional {category.title()} Service Required",
                    "description": f"Need professional {category} service for quality work and reliable completion of project requirements",
                    "postcode": "101"
                }
                
                async with self.session.post(
                    f"{BACKEND_URL}/public/job-requests/draft",
                    json=draft_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("category") == category:
                        self.log_test(f"Category ({category})", True, f"Category {category} working correctly")
                    else:
                        self.log_test(f"Category ({category})", False, f"Category {category} failed: {response.status}", data)
            except Exception as e:
                self.log_test(f"Category ({category})", False, f"Request failed: {str(e)}")
    
    async def run_all_tests(self):
        """Run all public wizard tests"""
        print("🚀 Starting Public Job Posting Wizard Tests")
        print(f"Testing against: {BACKEND_URL}")
        
        await self.setup()
        
        try:
            await self.test_guest_session_flow()
            await self.test_validation_scenarios()
            await self.test_authorization_scenarios()
            await self.test_rate_limiting()
            await self.test_authenticated_user_access()
            await self.test_all_categories()
        finally:
            await self.cleanup()
        
        # Print summary
        print("\n" + "="*60)
        print("📊 PUBLIC WIZARD TEST SUMMARY")
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
    tester = PublicWizardTester()
    passed, failed, results = await tester.run_all_tests()
    
    # Save results
    with open("/app/public_wizard_test_results.json", "w") as f:
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
    
    print(f"\n📄 Results saved to: /app/public_wizard_test_results.json")
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)