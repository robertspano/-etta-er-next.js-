#!/usr/bin/env python3
"""
Moving Category Subcategory Field Integration Test
Focused testing for the specific requirements in the review request
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://renovate-hub-2.preview.emergentagent.com/api"

class MovingSubcategoryTester:
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

    async def test_moving_draft_creation_with_subcategory(self):
        """Test POST /api/public/job-requests/draft with moving category and subcategory data"""
        print("\n=== Testing Moving Category Draft Creation with Subcategory ===")
        
        # Test case 1: varetransport subcategory
        test_data_1 = {
            "category": "moving",
            "subcategory": "varetransport",
            "title": "Van Transport Service",
            "description": "I need help with van transport.",
            "postcode": "101"
        }
        
        draft_id_1 = None
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=test_data_1,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    draft_id_1 = data["id"]
                    # Verify subcategory field is in response
                    if data.get("subcategory") == "varetransport":
                        self.log_test("Moving Draft Creation (varetransport)", True, f"Draft created with subcategory in response: {data.get('subcategory')}")
                    else:
                        self.log_test("Moving Draft Creation (varetransport)", False, f"Subcategory missing from response", data)
                else:
                    self.log_test("Moving Draft Creation (varetransport)", False, f"Draft creation failed: {response.status}", data)
        except Exception as e:
            self.log_test("Moving Draft Creation (varetransport)", False, f"Request failed: {str(e)}")
        
        # Test case 2: pianotransport subcategory
        test_data_2 = {
            "category": "moving",
            "subcategory": "pianotransport",
            "title": "Piano Moving Service",
            "description": "I need help with piano moving.",
            "postcode": "101"
        }
        
        draft_id_2 = None
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=test_data_2,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    draft_id_2 = data["id"]
                    # Verify subcategory field is in response
                    if data.get("subcategory") == "pianotransport":
                        self.log_test("Moving Draft Creation (pianotransport)", True, f"Draft created with subcategory in response: {data.get('subcategory')}")
                    else:
                        self.log_test("Moving Draft Creation (pianotransport)", False, f"Subcategory missing from response", data)
                else:
                    self.log_test("Moving Draft Creation (pianotransport)", False, f"Draft creation failed: {response.status}", data)
        except Exception as e:
            self.log_test("Moving Draft Creation (pianotransport)", False, f"Request failed: {str(e)}")
        
        return draft_id_1, draft_id_2

    async def test_subcategory_field_persistence(self, draft_id: str):
        """Test that subcategory field persists through all steps"""
        print("\n=== Testing Subcategory Field Persistence ===")
        
        if not draft_id:
            self.log_test("Subcategory Persistence Setup", False, "No draft ID available")
            return
        
        # Step 1: Update draft with contact info
        contact_data = {
            "email": "moving.customer@example.com",
            "phone": "+354-555-1234",
            "firstName": "Magnus",
            "lastName": "Movingsson",
            "address": "123 Moving Street",
            "postcode": "101",
            "contactPreference": "platform_and_phone"
        }
        
        try:
            async with self.session.patch(
                f"{BACKEND_URL}/public/job-requests/{draft_id}",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 200:
                    self.log_test("Moving Draft Update with Contact Info", True, "Draft updated successfully")
                else:
                    data = await response.json()
                    self.log_test("Moving Draft Update with Contact Info", False, f"Update failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("Moving Draft Update with Contact Info", False, f"Request failed: {str(e)}")
            return
        
        # Step 2: Submit draft to final job
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/{draft_id}/submit",
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("status") == "open":
                    self.log_test("Moving Draft Submission", True, f"Draft submitted successfully, status: {data.get('status')}")
                    return draft_id  # Return the job ID for database verification
                else:
                    self.log_test("Moving Draft Submission", False, f"Submit failed: {response.status}", data)
        except Exception as e:
            self.log_test("Moving Draft Submission", False, f"Request failed: {str(e)}")
        
        return None

    async def test_database_storage_verification(self, job_id: str):
        """Verify subcategory field is stored in database by checking job retrieval"""
        print("\n=== Testing Database Storage Verification ===")
        
        if not job_id:
            self.log_test("Database Storage Verification Setup", False, "No job ID available")
            return
        
        # Try to retrieve the job through various endpoints to verify subcategory storage
        
        # Test 1: Try to get job through job-requests endpoint (if available)
        try:
            async with self.session.get(f"{BACKEND_URL}/job-requests/{job_id}") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("subcategory"):
                        self.log_test("Database Storage (Job Requests API)", True, f"Subcategory found in job data: {data.get('subcategory')}")
                    else:
                        self.log_test("Database Storage (Job Requests API)", False, f"Subcategory missing from job data", data)
                elif response.status == 404:
                    self.log_test("Database Storage (Job Requests API)", False, "Job not found - may be draft-only endpoint")
                else:
                    self.log_test("Database Storage (Job Requests API)", False, f"Failed to retrieve job: {response.status}")
        except Exception as e:
            self.log_test("Database Storage (Job Requests API)", False, f"Request failed: {str(e)}")
        
        # Test 2: Try to get jobs list and look for our job
        try:
            async with self.session.get(f"{BACKEND_URL}/job-requests/?category=moving") as response:
                if response.status == 200:
                    data = await response.json()
                    if isinstance(data, list):
                        # Look for our job in the list
                        our_job = None
                        for job in data:
                            if job.get("id") == job_id:
                                our_job = job
                                break
                        
                        if our_job:
                            if our_job.get("subcategory"):
                                self.log_test("Database Storage (Jobs List)", True, f"Subcategory found in jobs list: {our_job.get('subcategory')}")
                            else:
                                self.log_test("Database Storage (Jobs List)", False, f"Subcategory missing from jobs list", our_job)
                        else:
                            self.log_test("Database Storage (Jobs List)", False, f"Job {job_id} not found in jobs list")
                    else:
                        self.log_test("Database Storage (Jobs List)", False, f"Unexpected response format", data)
                else:
                    self.log_test("Database Storage (Jobs List)", False, f"Failed to get jobs list: {response.status}")
        except Exception as e:
            self.log_test("Database Storage (Jobs List)", False, f"Request failed: {str(e)}")

    async def test_response_schema_validation(self):
        """Test that all API responses include subcategory field when present"""
        print("\n=== Testing Response Schema Validation ===")
        
        # Test 1: Create moving job with subcategory and verify response schema
        moving_data = {
            "category": "moving",
            "subcategory": "flyttebyra",
            "title": "Moving Company Service",
            "description": "I need a professional moving company for my relocation.",
            "postcode": "101"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=moving_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    # Check DraftJobResponse schema
                    required_fields = ["id", "category", "subcategory", "title", "description", "postcode", "status", "created_at"]
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if not missing_fields and data.get("subcategory") == "flyttebyra":
                        self.log_test("Response Schema (DraftJobResponse)", True, f"All required fields present, subcategory: {data.get('subcategory')}")
                    else:
                        self.log_test("Response Schema (DraftJobResponse)", False, f"Missing fields: {missing_fields} or incorrect subcategory", data)
                else:
                    self.log_test("Response Schema (DraftJobResponse)", False, f"Request failed: {response.status}", data)
        except Exception as e:
            self.log_test("Response Schema (DraftJobResponse)", False, f"Request failed: {str(e)}")
        
        # Test 2: Create non-moving job and verify subcategory=null
        non_moving_data = {
            "category": "handcraft",
            "title": "Handcraft Service Needed",
            "description": "I need professional handcraft services for my project requirements.",
            "postcode": "101"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=non_moving_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    # Check that subcategory is null or not present for non-moving categories
                    subcategory = data.get("subcategory")
                    if subcategory is None:
                        self.log_test("Response Schema (Non-Moving Subcategory)", True, "Subcategory correctly null for non-moving category")
                    else:
                        self.log_test("Response Schema (Non-Moving Subcategory)", False, f"Subcategory should be null, got: {subcategory}", data)
                else:
                    self.log_test("Response Schema (Non-Moving Subcategory)", False, f"Request failed: {response.status}", data)
        except Exception as e:
            self.log_test("Response Schema (Non-Moving Subcategory)", False, f"Request failed: {str(e)}")

    async def test_backward_compatibility(self):
        """Test that existing jobs without subcategory field still work"""
        print("\n=== Testing Backward Compatibility ===")
        
        # Test 1: Create moving job without subcategory field
        moving_without_subcategory = {
            "category": "moving",
            "title": "Moving Service Without Subcategory",
            "description": "I need moving services but don't specify a subcategory.",
            "postcode": "101"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=moving_without_subcategory,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    self.log_test("Backward Compatibility (Moving without Subcategory)", True, f"Moving job created without subcategory: {data.get('id')}")
                else:
                    self.log_test("Backward Compatibility (Moving without Subcategory)", False, f"Failed to create moving job without subcategory: {response.status}", data)
        except Exception as e:
            self.log_test("Backward Compatibility (Moving without Subcategory)", False, f"Request failed: {str(e)}")
        
        # Test 2: Verify non-moving categories work without subcategory
        non_moving_categories = ["handcraft", "bathroom", "cleaning"]
        
        for category in non_moving_categories:
            try:
                category_data = {
                    "category": category,
                    "title": f"Professional {category.title()} Service Required",
                    "description": f"I need professional {category} service for quality work and reliable completion.",
                    "postcode": "101"
                }
                
                async with self.session.post(
                    f"{BACKEND_URL}/public/job-requests/draft",
                    json=category_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("id"):
                        self.log_test(f"Backward Compatibility ({category})", True, f"Category {category} works without subcategory")
                    else:
                        self.log_test(f"Backward Compatibility ({category})", False, f"Category {category} failed: {response.status}", data)
            except Exception as e:
                self.log_test(f"Backward Compatibility ({category})", False, f"Request failed: {str(e)}")

    async def run_all_tests(self):
        """Run all moving subcategory tests"""
        print("🚀 Starting Moving Category Subcategory Integration Tests")
        print(f"Testing against: {BACKEND_URL}")
        
        await self.setup()
        
        try:
            # Priority Test 1: Moving Category Draft Creation with Subcategory
            draft_id_1, draft_id_2 = await self.test_moving_draft_creation_with_subcategory()
            
            # Priority Test 2: Subcategory Field Persistence
            if draft_id_1:
                job_id = await self.test_subcategory_field_persistence(draft_id_1)
                
                # Priority Test 3: Database Storage Verification
                if job_id:
                    await self.test_database_storage_verification(job_id)
            
            # Priority Test 4: Response Schema Validation
            await self.test_response_schema_validation()
            
            # Priority Test 5: Backward Compatibility
            await self.test_backward_compatibility()
            
        finally:
            await self.cleanup()
        
        # Print summary
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        print("\n" + "="*60)
        print("📊 MOVING SUBCATEGORY TEST SUMMARY")
        print("="*60)
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {success_rate:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")
        
        return self.test_results

async def main():
    """Main test runner"""
    tester = MovingSubcategoryTester()
    results = await tester.run_all_tests()
    
    # Save detailed results
    with open("/app/moving_subcategory_test_results.json", "w") as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\n📄 Detailed results saved to: /app/moving_subcategory_test_results.json")

if __name__ == "__main__":
    asyncio.run(main())