#!/usr/bin/env python3
"""
BuildConnect Backend API Test Suite
Tests all core endpoints and functionality for the construction services marketplace
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://rental-translate.preview.emergentagent.com/api"

class BuildConnectAPITester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.project_id = None
        
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
    
    async def test_basic_endpoints(self):
        """Test basic API endpoints"""
        print("\n=== Testing Basic Endpoints ===")
        
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
    
    async def test_services_endpoints(self):
        """Test services endpoints with language support"""
        print("\n=== Testing Services Endpoints ===")
        
        # Test services in English
        try:
            async with self.session.get(f"{BACKEND_URL}/services?language=en") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list) and len(data) > 0:
                    # Check if first service has expected fields
                    first_service = data[0]
                    required_fields = ["id", "name", "description", "icon", "color", "averagePrice", "professionals", "completedJobs"]
                    has_all_fields = all(field in first_service for field in required_fields)
                    
                    if has_all_fields and first_service.get("name") == "Plumbing":
                        self.log_test("GET /api/services (English)", True, f"Retrieved {len(data)} services in English")
                    else:
                        self.log_test("GET /api/services (English)", False, "Missing required fields or incorrect data", first_service)
                else:
                    self.log_test("GET /api/services (English)", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/services (English)", False, f"Request failed: {str(e)}")
        
        # Test services in Icelandic
        try:
            async with self.session.get(f"{BACKEND_URL}/services?language=is") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list) and len(data) > 0:
                    first_service = data[0]
                    if first_service.get("name") == "Pípulagnir" and "kr" in first_service.get("averagePrice", ""):
                        self.log_test("GET /api/services (Icelandic)", True, f"Retrieved {len(data)} services in Icelandic")
                    else:
                        self.log_test("GET /api/services (Icelandic)", False, "Incorrect Icelandic translation", first_service)
                else:
                    self.log_test("GET /api/services (Icelandic)", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/services (Icelandic)", False, f"Request failed: {str(e)}")
        
        # Test default language fallback
        try:
            async with self.session.get(f"{BACKEND_URL}/services") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list) and len(data) > 0:
                    first_service = data[0]
                    if first_service.get("name") == "Plumbing":
                        self.log_test("GET /api/services (Default)", True, "Default language fallback works (English)")
                    else:
                        self.log_test("GET /api/services (Default)", False, "Default language not English", first_service)
                else:
                    self.log_test("GET /api/services (Default)", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/services (Default)", False, f"Request failed: {str(e)}")
    
    async def test_project_creation(self):
        """Test project creation endpoint"""
        print("\n=== Testing Project Creation ===")
        
        # Valid project data
        project_data = {
            "title": "Kitchen Renovation Project",
            "description": "Complete kitchen renovation including new cabinets, countertops, and appliances. Looking for experienced contractors.",
            "serviceType": "renovation",
            "location": "Reykjavik, Iceland",
            "budget": "500000-1000000 kr",
            "urgency": "within_month"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/projects/",
                json=project_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 200 and data.get("success") is True:
                    self.project_id = data.get("projectId")
                    expected_fields = ["success", "message", "projectId", "estimatedQuotes", "expectedResponseTime"]
                    has_all_fields = all(field in data for field in expected_fields)
                    
                    if has_all_fields and self.project_id:
                        self.log_test("POST /api/projects (Valid)", True, f"Project created with ID: {self.project_id}")
                    else:
                        self.log_test("POST /api/projects (Valid)", False, "Missing response fields", data)
                else:
                    self.log_test("POST /api/projects (Valid)", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/projects (Valid)", False, f"Request failed: {str(e)}")
        
        # Test with missing required fields
        invalid_project_data = {
            "title": "Incomplete Project",
            "serviceType": "plumbing"
            # Missing description and location
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/projects/",
                json=invalid_project_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:  # Validation error expected
                    self.log_test("POST /api/projects (Invalid)", True, "Validation error returned as expected")
                else:
                    data = await response.json()
                    self.log_test("POST /api/projects (Invalid)", False, f"Expected validation error, got: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/projects (Invalid)", False, f"Request failed: {str(e)}")
    
    async def test_projects_retrieval(self):
        """Test project retrieval endpoints"""
        print("\n=== Testing Project Retrieval ===")
        
        # Test get all projects
        try:
            async with self.session.get(f"{BACKEND_URL}/projects/") as response:
                data = await response.json()
                
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/projects", True, f"Retrieved {len(data)} projects")
                    
                    # If we have projects, test filtering
                    if len(data) > 0:
                        # Test filtering by service type
                        async with self.session.get(f"{BACKEND_URL}/projects/?service_type=renovation") as filter_response:
                            filter_data = await filter_response.json()
                            if filter_response.status == 200:
                                self.log_test("GET /api/projects (Filtered)", True, f"Filtered projects: {len(filter_data)}")
                            else:
                                self.log_test("GET /api/projects (Filtered)", False, f"Filter failed: {filter_response.status}")
                else:
                    self.log_test("GET /api/projects", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/projects", False, f"Request failed: {str(e)}")
        
        # Test get specific project if we have a project ID
        if self.project_id:
            try:
                async with self.session.get(f"{BACKEND_URL}/projects/{self.project_id}") as response:
                    data = await response.json()
                    
                    if response.status == 200 and data.get("id") == self.project_id:
                        self.log_test("GET /api/projects/{id}", True, f"Retrieved project: {data.get('title')}")
                    else:
                        self.log_test("GET /api/projects/{id}", False, f"Unexpected response: {response.status}", data)
            except Exception as e:
                self.log_test("GET /api/projects/{id}", False, f"Request failed: {str(e)}")
    
    async def test_stats_endpoint(self):
        """Test platform statistics endpoint"""
        print("\n=== Testing Stats Endpoint ===")
        
        try:
            async with self.session.get(f"{BACKEND_URL}/stats/") as response:
                data = await response.json()
                
                if response.status == 200:
                    required_fields = [
                        "totalProjects", "verifiedProfessionals", "customerSatisfaction",
                        "completionRate", "totalUsers", "completedProjects", "averageRating", "activeProjects"
                    ]
                    has_all_fields = all(field in data for field in required_fields)
                    
                    # Check data types and reasonable values
                    valid_data = (
                        isinstance(data.get("totalProjects"), int) and
                        isinstance(data.get("verifiedProfessionals"), int) and
                        isinstance(data.get("customerSatisfaction"), (int, float)) and
                        isinstance(data.get("completionRate"), (int, float)) and
                        data.get("customerSatisfaction", 0) <= 5.0 and
                        data.get("completionRate", 0) <= 100
                    )
                    
                    if has_all_fields and valid_data:
                        self.log_test("GET /api/stats", True, f"Stats retrieved: {data.get('totalProjects')} projects, {data.get('verifiedProfessionals')} professionals")
                    else:
                        self.log_test("GET /api/stats", False, "Invalid stats data structure or values", data)
                else:
                    self.log_test("GET /api/stats", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/stats", False, f"Request failed: {str(e)}")
    
    async def test_testimonials_endpoints(self):
        """Test testimonials endpoints"""
        print("\n=== Testing Testimonials Endpoints ===")
        
        # Test get all testimonials
        try:
            async with self.session.get(f"{BACKEND_URL}/testimonials/") as response:
                data = await response.json()
                
                if response.status == 200 and isinstance(data, list):
                    if len(data) > 0:
                        first_testimonial = data[0]
                        required_fields = ["id", "clientName", "role", "rating", "text", "projectType"]
                        has_all_fields = all(field in first_testimonial for field in required_fields)
                        
                        valid_rating = isinstance(first_testimonial.get("rating"), int) and 1 <= first_testimonial.get("rating", 0) <= 5
                        
                        if has_all_fields and valid_rating:
                            self.log_test("GET /api/testimonials", True, f"Retrieved {len(data)} testimonials")
                        else:
                            self.log_test("GET /api/testimonials", False, "Invalid testimonial structure", first_testimonial)
                    else:
                        self.log_test("GET /api/testimonials", True, "No testimonials found (empty list)")
                else:
                    self.log_test("GET /api/testimonials", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/testimonials", False, f"Request failed: {str(e)}")
        
        # Test get featured testimonials
        try:
            async with self.session.get(f"{BACKEND_URL}/testimonials/featured") as response:
                data = await response.json()
                
                if response.status == 200 and isinstance(data, list):
                    if len(data) <= 3:  # Should return max 3 featured testimonials
                        self.log_test("GET /api/testimonials/featured", True, f"Retrieved {len(data)} featured testimonials")
                    else:
                        self.log_test("GET /api/testimonials/featured", False, f"Too many featured testimonials: {len(data)}")
                else:
                    self.log_test("GET /api/testimonials/featured", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/testimonials/featured", False, f"Request failed: {str(e)}")
    
    async def test_error_handling(self):
        """Test error handling for various scenarios"""
        print("\n=== Testing Error Handling ===")
        
        # Test non-existent project
        try:
            async with self.session.get(f"{BACKEND_URL}/projects/non-existent-id") as response:
                if response.status == 404:
                    self.log_test("Error Handling (404)", True, "Non-existent project returns 404")
                else:
                    data = await response.json()
                    self.log_test("Error Handling (404)", False, f"Expected 404, got: {response.status}", data)
        except Exception as e:
            self.log_test("Error Handling (404)", False, f"Request failed: {str(e)}")
        
        # Test invalid service language
        try:
            async with self.session.get(f"{BACKEND_URL}/services?language=invalid") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list) and len(data) > 0:
                    # Should fallback to English
                    first_service = data[0]
                    if first_service.get("name") == "Plumbing":
                        self.log_test("Error Handling (Language Fallback)", True, "Invalid language falls back to English")
                    else:
                        self.log_test("Error Handling (Language Fallback)", False, "Language fallback failed", first_service)
                else:
                    self.log_test("Error Handling (Language Fallback)", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("Error Handling (Language Fallback)", False, f"Request failed: {str(e)}")
    
    async def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting BuildConnect Backend API Tests")
        print(f"Testing against: {BACKEND_URL}")
        
        await self.setup()
        
        try:
            await self.test_basic_endpoints()
            await self.test_services_endpoints()
            await self.test_project_creation()
            await self.test_projects_retrieval()
            await self.test_stats_endpoint()
            await self.test_testimonials_endpoints()
            await self.test_error_handling()
        finally:
            await self.cleanup()
        
        # Print summary
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
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
    tester = BuildConnectAPITester()
    passed, failed, results = await tester.run_all_tests()
    
    # Save detailed results to file
    with open("/app/test_results_detailed.json", "w") as f:
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
    
    print(f"\n📄 Detailed results saved to: /app/test_results_detailed.json")
    
    # Return exit code based on test results
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)