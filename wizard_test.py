#!/usr/bin/env python3
"""
3-Step Job Posting Wizard Backend Integration Test
Tests the complete wizard flow for job posting functionality
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://buildmatch-app.preview.emergentagent.com/api"

class JobPostingWizardTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.customer_session = None
        self.professional_session = None
        self.draft_job_id = None
        
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
        
        # Customer data for wizard testing
        customer_data = {
            "email": f"wizard_customer_{timestamp}@example.com",
            "password": "WizardTest123!",
            "role": "customer",
            "first_name": "Anna",
            "last_name": "Kristinsdottir",
            "phone": "+354-555-7890",
            "language": "is"
        }
        
        # Professional data for testing professional access
        professional_data = {
            "email": f"wizard_pro_{timestamp}@example.com",
            "password": "ProWizard123!",
            "role": "professional",
            "first_name": "Bjorn",
            "last_name": "Thorsson",
            "phone": "+354-555-4567",
            "company_name": "Thorsson Handcraft Ltd",
            "company_id": "KT-456789123",
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
    
    async def test_wizard_step1_job_creation(self):
        """Test Step 1: Create draft job request with title and description"""
        print("\n=== Testing Wizard Step 1: Job Creation ===")
        
        # Test with valid data (handcraft category as specified in requirements)
        step1_data = {
            "category": "handcraft",
            "title": "Custom Kitchen Cabinet Installation",
            "description": "I need custom kitchen cabinets installed in my new home. The kitchen is approximately 15 square meters and requires both upper and lower cabinets with modern design.",
            "postcode": "101"  # Reykjavik postcode
        }
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=step1_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    self.draft_job_id = data["id"]
                    # Verify it's created with draft status
                    if data.get("status") == "draft":
                        self.log_test("Wizard Step 1 - Create Draft Job", True, f"Draft job created with ID: {self.draft_job_id}")
                    else:
                        self.log_test("Wizard Step 1 - Create Draft Job", False, f"Job created but status is {data.get('status')}, expected 'draft'", data)
                else:
                    self.log_test("Wizard Step 1 - Create Draft Job", False, f"Job creation failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("Wizard Step 1 - Create Draft Job", False, f"Request failed: {str(e)}")
            return False
        
        return True
    
    async def test_wizard_step2_contact_info(self):
        """Test Step 2: Update draft job with contact information"""
        print("\n=== Testing Wizard Step 2: Contact Information ===")
        
        if not self.draft_job_id:
            self.log_test("Wizard Step 2 Setup", False, "No draft job ID available")
            return False
        
        # Contact information update (Step 2 of wizard)
        step2_data = {
            "address": "Laugavegur 25, 101 Reykjavik",
            # Note: In real implementation, contact info might be stored in user profile
            # For now, we'll update the job with additional details
            "description": "I need custom kitchen cabinets installed in my new home. The kitchen is approximately 15 square meters and requires both upper and lower cabinets with modern design. Contact: Anna Kristinsdottir, +354-555-7890, prefer platform communication."
        }
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.put(
                f"{BACKEND_URL}/job-requests/{self.draft_job_id}",
                json=step2_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    # Verify it's still in draft status
                    if data.get("status") == "draft":
                        self.log_test("Wizard Step 2 - Update Contact Info", True, "Contact information updated, job still in draft")
                    else:
                        self.log_test("Wizard Step 2 - Update Contact Info", False, f"Job updated but status changed to {data.get('status')}", data)
                else:
                    self.log_test("Wizard Step 2 - Update Contact Info", False, f"Update failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("Wizard Step 2 - Update Contact Info", False, f"Request failed: {str(e)}")
            return False
        
        return True
    
    async def test_wizard_step3_finalize(self):
        """Test Step 3: Finalize job request (change status from draft to open)"""
        print("\n=== Testing Wizard Step 3: Finalize Job ===")
        
        if not self.draft_job_id:
            self.log_test("Wizard Step 3 Setup", False, "No draft job ID available")
            return False
        
        # Finalize the job by changing status to 'open'
        finalize_data = {
            "status": "open"
        }
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.put(
                f"{BACKEND_URL}/job-requests/{self.draft_job_id}",
                json=finalize_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    if data.get("status") == "open":
                        self.log_test("Wizard Step 3 - Finalize Job", True, "Job successfully finalized and set to 'open' status")
                    else:
                        self.log_test("Wizard Step 3 - Finalize Job", False, f"Job updated but status is {data.get('status')}, expected 'open'", data)
                else:
                    self.log_test("Wizard Step 3 - Finalize Job", False, f"Finalization failed: {response.status}", data)
                    return False
        except Exception as e:
            self.log_test("Wizard Step 3 - Finalize Job", False, f"Request failed: {str(e)}")
            return False
        
        return True
    
    async def test_category_filtering(self):
        """Test category filtering with wizard-specific categories"""
        print("\n=== Testing Category Filtering ===")
        
        # Test categories mentioned in requirements
        test_categories = ["handcraft", "bathroom", "automotive", "majorProjects", "cleaning", "housingAssociations", "moving"]
        
        for category in test_categories:
            try:
                async with self.session.get(f"{BACKEND_URL}/job-requests/?category={category}") as response:
                    data = await response.json()
                    if response.status == 200 and isinstance(data, list):
                        self.log_test(f"Category Filter - {category}", True, f"Retrieved {len(data)} jobs for category '{category}'")
                    else:
                        self.log_test(f"Category Filter - {category}", False, f"Filter failed: {response.status}", data)
            except Exception as e:
                self.log_test(f"Category Filter - {category}", False, f"Request failed: {str(e)}")
    
    async def test_validation_requirements(self):
        """Test validation requirements (title min 10 chars, description min 30 chars)"""
        print("\n=== Testing Validation Requirements ===")
        
        # Test title too short (less than 10 characters)
        short_title_data = {
            "category": "handcraft",
            "title": "Short",  # Only 5 characters
            "description": "This is a valid description that is longer than 30 characters to meet requirements",
            "postcode": "101"
        }
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=short_title_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:  # Validation error expected
                    self.log_test("Validation - Short Title", True, "Short title correctly rejected with validation error")
                else:
                    data = await response.json()
                    self.log_test("Validation - Short Title", False, f"Expected validation error, got: {response.status}", data)
        except Exception as e:
            self.log_test("Validation - Short Title", False, f"Request failed: {str(e)}")
        
        # Test description too short (less than 30 characters)
        short_desc_data = {
            "category": "handcraft",
            "title": "Valid Title That Is Long Enough",
            "description": "Too short",  # Only 9 characters
            "postcode": "101"
        }
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=short_desc_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:  # Validation error expected
                    self.log_test("Validation - Short Description", True, "Short description correctly rejected with validation error")
                else:
                    data = await response.json()
                    self.log_test("Validation - Short Description", False, f"Expected validation error, got: {response.status}", data)
        except Exception as e:
            self.log_test("Validation - Short Description", False, f"Request failed: {str(e)}")
        
        # Test valid data (both title and description meet requirements)
        valid_data = {
            "category": "bathroom",
            "title": "Bathroom Renovation Project",  # 27 characters
            "description": "Complete bathroom renovation including new tiles, fixtures, and plumbing work needed",  # 85 characters
            "postcode": "105"
        }
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=valid_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    self.log_test("Validation - Valid Data", True, f"Valid job created successfully: {data.get('id')}")
                else:
                    self.log_test("Validation - Valid Data", False, f"Valid job creation failed: {response.status}", data)
        except Exception as e:
            self.log_test("Validation - Valid Data", False, f"Request failed: {str(e)}")
    
    async def test_authentication_requirements(self):
        """Test that job request creation requires valid authenticated customer user"""
        print("\n=== Testing Authentication Requirements ===")
        
        # Test without authentication
        job_data = {
            "category": "automotive",
            "title": "Car Repair Service Needed",
            "description": "My car needs brake repair and general maintenance service from qualified mechanic",
            "postcode": "102"
        }
        
        try:
            # No cookies = no authentication
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=job_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 401:  # Unauthorized expected
                    self.log_test("Auth - Unauthenticated Access", True, "Unauthenticated access correctly denied")
                else:
                    data = await response.json()
                    self.log_test("Auth - Unauthenticated Access", False, f"Expected 401, got: {response.status}", data)
        except Exception as e:
            self.log_test("Auth - Unauthenticated Access", False, f"Request failed: {str(e)}")
        
        # Test with professional authentication (should be denied for customer-only endpoint)
        try:
            cookies = {"buildconnect_auth": self.professional_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=job_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 403:  # Forbidden expected
                    self.log_test("Auth - Professional Access Denied", True, "Professional access to customer-only endpoint correctly denied")
                else:
                    data = await response.json()
                    self.log_test("Auth - Professional Access Denied", False, f"Expected 403, got: {response.status}", data)
        except Exception as e:
            self.log_test("Auth - Professional Access Denied", False, f"Request failed: {str(e)}")
        
        # Test with valid customer authentication
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
                    self.log_test("Auth - Customer Access Granted", True, f"Customer access granted, job created: {data.get('id')}")
                else:
                    self.log_test("Auth - Customer Access Granted", False, f"Customer access failed: {response.status}", data)
        except Exception as e:
            self.log_test("Auth - Customer Access Granted", False, f"Request failed: {str(e)}")
    
    async def test_data_persistence(self):
        """Test that job request data persists correctly between wizard steps"""
        print("\n=== Testing Data Persistence ===")
        
        # Create a new draft job for persistence testing
        initial_data = {
            "category": "majorProjects",
            "title": "House Extension Project",
            "description": "Planning to extend my house with a new room and need professional construction services",
            "postcode": "107"
        }
        
        persistence_job_id = None
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=initial_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    persistence_job_id = data["id"]
                    self.log_test("Persistence - Initial Creation", True, f"Initial job created: {persistence_job_id}")
                else:
                    self.log_test("Persistence - Initial Creation", False, f"Initial creation failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("Persistence - Initial Creation", False, f"Request failed: {str(e)}")
            return
        
        # Update with additional information (simulating wizard step 2)
        update_data = {
            "address": "Miklabraut 50, 107 Reykjavik",
            "budget_min": 2000000,
            "budget_max": 5000000,
            "priority": "high"
        }
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.put(
                f"{BACKEND_URL}/job-requests/{persistence_job_id}",
                json=update_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    self.log_test("Persistence - Update Step", True, "Job updated with additional information")
                else:
                    self.log_test("Persistence - Update Step", False, f"Update failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("Persistence - Update Step", False, f"Request failed: {str(e)}")
            return
        
        # Retrieve the job and verify all data persisted
        try:
            async with self.session.get(f"{BACKEND_URL}/job-requests/{persistence_job_id}") as response:
                data = await response.json()
                if response.status == 200:
                    # Check that all data persisted correctly
                    checks = [
                        data.get("category") == initial_data["category"],
                        data.get("title") == initial_data["title"],
                        data.get("description") == initial_data["description"],
                        data.get("postcode") == initial_data["postcode"],
                        data.get("address") == update_data["address"],
                        data.get("budget_min") == update_data["budget_min"],
                        data.get("budget_max") == update_data["budget_max"],
                        data.get("priority") == update_data["priority"]
                    ]
                    
                    if all(checks):
                        self.log_test("Persistence - Data Verification", True, "All data persisted correctly between wizard steps")
                    else:
                        self.log_test("Persistence - Data Verification", False, "Some data was lost during updates", data)
                else:
                    self.log_test("Persistence - Data Verification", False, f"Failed to retrieve job: {response.status}", data)
        except Exception as e:
            self.log_test("Persistence - Data Verification", False, f"Request failed: {str(e)}")
    
    async def test_draft_status_management(self):
        """Test draft status management throughout wizard flow"""
        print("\n=== Testing Draft Status Management ===")
        
        # Create job in draft status
        draft_data = {
            "category": "cleaning",
            "title": "Office Cleaning Service",
            "description": "Regular office cleaning service needed for small business premises",
            "postcode": "108"
        }
        
        draft_job_id = None
        
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=draft_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("status") == "draft":
                    draft_job_id = data["id"]
                    self.log_test("Draft Status - Creation", True, f"Job created in draft status: {draft_job_id}")
                else:
                    self.log_test("Draft Status - Creation", False, f"Job not created in draft status: {data.get('status')}", data)
                    return
        except Exception as e:
            self.log_test("Draft Status - Creation", False, f"Request failed: {str(e)}")
            return
        
        # Verify draft jobs are not visible to professionals by default
        try:
            cookies = {"buildconnect_auth": self.professional_session}
            async with self.session.get(f"{BACKEND_URL}/job-requests/") as response:
                data = await response.json()
                if response.status == 200:
                    # Check if our draft job is in the list
                    draft_visible = any(job.get("id") == draft_job_id for job in data)
                    if not draft_visible:
                        self.log_test("Draft Status - Professional Visibility", True, "Draft jobs correctly hidden from professionals")
                    else:
                        self.log_test("Draft Status - Professional Visibility", False, "Draft job visible to professionals (should be hidden)")
                else:
                    self.log_test("Draft Status - Professional Visibility", False, f"Failed to get jobs: {response.status}", data)
        except Exception as e:
            self.log_test("Draft Status - Professional Visibility", False, f"Request failed: {str(e)}")
        
        # Change status from draft to open
        try:
            cookies = {"buildconnect_auth": self.customer_session}
            async with self.session.put(
                f"{BACKEND_URL}/job-requests/{draft_job_id}",
                json={"status": "open"},
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("status") == "open":
                    self.log_test("Draft Status - Change to Open", True, "Job status successfully changed from draft to open")
                else:
                    self.log_test("Draft Status - Change to Open", False, f"Status change failed: {data.get('status')}", data)
        except Exception as e:
            self.log_test("Draft Status - Change to Open", False, f"Request failed: {str(e)}")
    
    async def run_wizard_tests(self):
        """Run all wizard-specific tests"""
        print("🧙‍♂️ Starting 3-Step Job Posting Wizard Backend Tests")
        print(f"Testing against: {BACKEND_URL}")
        
        await self.setup()
        
        try:
            # Setup test users
            if not await self.setup_test_users():
                print("❌ Failed to setup test users, aborting tests")
                return
            
            # Run wizard flow tests
            await self.test_wizard_step1_job_creation()
            await self.test_wizard_step2_contact_info()
            await self.test_wizard_step3_finalize()
            
            # Run supporting functionality tests
            await self.test_category_filtering()
            await self.test_validation_requirements()
            await self.test_authentication_requirements()
            await self.test_data_persistence()
            await self.test_draft_status_management()
            
        finally:
            await self.cleanup()
        
        # Print summary
        print("\n" + "="*60)
        print("📊 WIZARD TEST SUMMARY")
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
    tester = JobPostingWizardTester()
    passed, failed, results = await tester.run_wizard_tests()
    
    # Save detailed results to file
    with open("/app/wizard_test_results.json", "w") as f:
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
    
    print(f"\n📄 Detailed results saved to: /app/wizard_test_results.json")
    
    # Return exit code based on test results
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)