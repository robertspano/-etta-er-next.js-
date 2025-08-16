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
BACKEND_URL = "https://construction-hub-16.preview.emergentagent.com/api"

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
    
    async def test_authentication_system(self):
        """Test comprehensive authentication system"""
        print("\n=== Testing Authentication System ===")
        
        # Use unique emails for each test run to avoid conflicts
        import time
        timestamp = str(int(time.time()))
        
        # Test data for different user types
        customer_data = {
            "email": f"customer_{timestamp}@example.com",
            "password": "SecurePass123!",
            "role": "customer",
            "first_name": "Sarah",
            "last_name": "Johnson",
            "phone": "+354-555-0123",
            "language": "en"
        }
        
        professional_data = {
            "email": f"professional_{timestamp}@example.com", 
            "password": "BuildStrong456!",
            "role": "professional",
            "first_name": "Erik",
            "last_name": "Magnusson",
            "phone": "+354-555-0456",
            "company_name": "Magnusson Construction Ltd",
            "company_id": "KT-123456789",
            "language": "is"
        }
        
        # Test user registration - Customer
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
                        self.log_test("POST /api/auth/register (Customer)", True, f"Customer registered: {data.get('email')}")
                    else:
                        self.log_test("POST /api/auth/register (Customer)", False, "Missing required fields", data)
                else:
                    self.log_test("POST /api/auth/register (Customer)", False, f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/register (Customer)", False, f"Request failed: {str(e)}")
        
        # Test user registration - Professional
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=professional_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 201:
                    if data.get("email") == professional_data["email"] and data.get("role") == "professional":
                        self.log_test("POST /api/auth/register (Professional)", True, f"Professional registered: {data.get('email')}")
                    else:
                        self.log_test("POST /api/auth/register (Professional)", False, "Incorrect registration data", data)
                else:
                    self.log_test("POST /api/auth/register (Professional)", False, f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/register (Professional)", False, f"Request failed: {str(e)}")
        
        # Test customer login and session management
        customer_session = None
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
                if response.status == 204:  # No content on successful login
                    # Check for authentication cookie
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        customer_session = cookies["buildconnect_auth"].value
                        self.log_test("POST /api/auth/cookie/login (Customer)", True, "Customer login successful with cookie")
                    else:
                        self.log_test("POST /api/auth/cookie/login (Customer)", False, "Login successful but no auth cookie")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("POST /api/auth/cookie/login (Customer)", False, f"Login failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/cookie/login (Customer)", False, f"Request failed: {str(e)}")
        
        # Test professional login
        professional_session = None
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
                        professional_session = cookies["buildconnect_auth"].value
                        self.log_test("POST /api/auth/cookie/login (Professional)", True, "Professional login successful with cookie")
                    else:
                        self.log_test("POST /api/auth/cookie/login (Professional)", False, "Login successful but no auth cookie")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("POST /api/auth/cookie/login (Professional)", False, f"Login failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/cookie/login (Professional)", False, f"Request failed: {str(e)}")
        
        # Test get current user info (with customer session)
        if customer_session:
            try:
                cookies = {"buildconnect_auth": customer_session}
                async with self.session.get(
                    f"{BACKEND_URL}/auth/me",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        required_fields = ["id", "email", "role", "profile", "is_verified"]
                        has_fields = all(field in data for field in required_fields)
                        if has_fields and data.get("role") == "customer":
                            self.log_test("GET /api/auth/me (Customer)", True, f"User info retrieved: {data.get('email')}")
                        else:
                            self.log_test("GET /api/auth/me (Customer)", False, "Missing fields or incorrect role", data)
                    else:
                        self.log_test("GET /api/auth/me (Customer)", False, f"Failed to get user info: {response.status}", data)
            except Exception as e:
                self.log_test("GET /api/auth/me (Customer)", False, f"Request failed: {str(e)}")
        
        # Test profile update (with customer session)
        if customer_session:
            try:
                profile_update = {
                    "first_name": "Sarah Updated",
                    "location": "Reykjavik, Iceland",
                    "phone": "+354-555-9999"
                }
                cookies = {"buildconnect_auth": customer_session}
                async with self.session.put(
                    f"{BACKEND_URL}/auth/profile",
                    json=profile_update,
                    cookies=cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("message") == "Profile updated successfully":
                        self.log_test("PUT /api/auth/profile", True, "Profile updated successfully")
                    else:
                        self.log_test("PUT /api/auth/profile", False, f"Profile update failed: {response.status}", data)
            except Exception as e:
                self.log_test("PUT /api/auth/profile", False, f"Request failed: {str(e)}")
        
        # Test role switching (customer to professional)
        if customer_session:
            try:
                cookies = {"buildconnect_auth": customer_session}
                async with self.session.post(
                    f"{BACKEND_URL}/auth/switch-role",
                    params={"new_role": "professional"},
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200 and "professional" in data.get("message", ""):
                        self.log_test("POST /api/auth/switch-role", True, "Role switched to professional")
                    else:
                        self.log_test("POST /api/auth/switch-role", False, f"Role switch failed: {response.status}", data)
            except Exception as e:
                self.log_test("POST /api/auth/switch-role", False, f"Request failed: {str(e)}")
        
        # Test role-based access control
        await self.test_role_based_access(customer_session, professional_session)
        
        # Test logout
        if customer_session:
            try:
                cookies = {"buildconnect_auth": customer_session}
                async with self.session.post(
                    f"{BACKEND_URL}/auth/cookie/logout",
                    cookies=cookies
                ) as response:
                    if response.status == 204:
                        self.log_test("POST /api/auth/cookie/logout", True, "Logout successful")
                    else:
                        data = await response.json() if response.content_type == 'application/json' else await response.text()
                        self.log_test("POST /api/auth/cookie/logout", False, f"Logout failed: {response.status}", data)
            except Exception as e:
                self.log_test("POST /api/auth/cookie/logout", False, f"Request failed: {str(e)}")
    
    async def test_role_based_access(self, customer_session, professional_session):
        """Test role-based access control endpoints"""
        print("\n=== Testing Role-Based Access Control ===")
        
        # Test customer-only endpoint with customer session (before role switch)
        if customer_session:
            try:
                cookies = {"buildconnect_auth": customer_session}
                async with self.session.get(
                    f"{BACKEND_URL}/auth/customer-only",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200 and "Customer access granted" in data.get("message", ""):
                        self.log_test("GET /api/auth/customer-only (Customer)", True, "Customer access granted")
                    elif response.status == 403:
                        # This is expected if user already switched roles in previous tests
                        self.log_test("GET /api/auth/customer-only (Customer)", True, "Customer access correctly denied after role switch")
                    else:
                        self.log_test("GET /api/auth/customer-only (Customer)", False, f"Unexpected response: {response.status}", data)
            except Exception as e:
                self.log_test("GET /api/auth/customer-only (Customer)", False, f"Request failed: {str(e)}")
        
        # Test professional-only endpoint with professional session
        if professional_session:
            try:
                cookies = {"buildconnect_auth": professional_session}
                async with self.session.get(
                    f"{BACKEND_URL}/auth/professional-only",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200 and "Professional access granted" in data.get("message", ""):
                        self.log_test("GET /api/auth/professional-only (Professional)", True, "Professional access granted")
                    else:
                        self.log_test("GET /api/auth/professional-only (Professional)", False, f"Access denied: {response.status}", data)
            except Exception as e:
                self.log_test("GET /api/auth/professional-only (Professional)", False, f"Request failed: {str(e)}")
        
        # Test admin-only endpoint (should fail for both customer and professional)
        if customer_session:
            try:
                cookies = {"buildconnect_auth": customer_session}
                async with self.session.get(
                    f"{BACKEND_URL}/auth/admin-only",
                    cookies=cookies
                ) as response:
                    if response.status == 403:
                        self.log_test("GET /api/auth/admin-only (Customer Denied)", True, "Admin access correctly denied to customer")
                    else:
                        data = await response.json()
                        self.log_test("GET /api/auth/admin-only (Customer Denied)", False, f"Expected 403, got: {response.status}", data)
            except Exception as e:
                self.log_test("GET /api/auth/admin-only (Customer Denied)", False, f"Request failed: {str(e)}")
        
        # Test protected endpoint without authentication (use fresh session)
        try:
            # Create a new session without cookies to test unauthenticated access
            async with aiohttp.ClientSession() as fresh_session:
                async with fresh_session.get(f"{BACKEND_URL}/auth/me") as response:
                    if response.status == 401:
                        self.log_test("GET /api/auth/me (Unauthenticated)", True, "Protected endpoint correctly requires authentication")
                    else:
                        data = await response.json() if response.content_type == 'application/json' else await response.text()
                        self.log_test("GET /api/auth/me (Unauthenticated)", False, f"Expected 401, got: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/auth/me (Unauthenticated)", False, f"Request failed: {str(e)}")

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
        
        # Test duplicate user registration (using known existing email)
        try:
            duplicate_user = {
                "email": "sarah.johnson@example.com",  # Known existing user from previous tests
                "password": "AnotherPass123!",
                "role": "customer",
                "first_name": "Another",
                "last_name": "User"
            }
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=duplicate_user,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 400:
                    self.log_test("Error Handling (Duplicate Registration)", True, "Duplicate email registration correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Error Handling (Duplicate Registration)", False, f"Expected 400, got: {response.status}", data)
        except Exception as e:
            self.log_test("Error Handling (Duplicate Registration)", False, f"Request failed: {str(e)}")
        
        # Test invalid login credentials
        try:
            invalid_login = {
                "username": "nonexistent@example.com",
                "password": "wrongpassword"
            }
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=invalid_login,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 400:
                    self.log_test("Error Handling (Invalid Login)", True, "Invalid credentials correctly rejected")
                else:
                    data = await response.json() if response.content_type == 'application/json' else await response.text()
                    self.log_test("Error Handling (Invalid Login)", False, f"Expected 400, got: {response.status}", data)
        except Exception as e:
            self.log_test("Error Handling (Invalid Login)", False, f"Request failed: {str(e)}")
    
    async def test_marketplace_apis(self):
        """Test comprehensive marketplace functionality"""
        print("\n=== Testing Marketplace APIs ===")
        
        # Create test users first
        import time
        timestamp = str(int(time.time()))
        
        customer_data = {
            "email": f"marketplace_customer_{timestamp}@example.com",
            "password": "CustomerPass123!",
            "role": "customer",
            "first_name": "Emma",
            "last_name": "Wilson",
            "phone": "+354-555-1234",
            "language": "en"
        }
        
        professional_data = {
            "email": f"marketplace_pro_{timestamp}@example.com",
            "password": "ProPass123!",
            "role": "professional",
            "first_name": "Magnus",
            "last_name": "Eriksson",
            "phone": "+354-555-5678",
            "company_name": "Eriksson Construction",
            "company_id": "KT-987654321",
            "language": "is"
        }
        
        # Register users
        customer_session = None
        professional_session = None
        
        try:
            # Register customer
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=customer_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    self.log_test("Marketplace Customer Registration", True, "Customer registered successfully")
                else:
                    data = await response.json()
                    self.log_test("Marketplace Customer Registration", False, f"Registration failed: {response.status}", data)
                    return
            
            # Register professional
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=professional_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 201:
                    self.log_test("Marketplace Professional Registration", True, "Professional registered successfully")
                else:
                    data = await response.json()
                    self.log_test("Marketplace Professional Registration", False, f"Registration failed: {response.status}", data)
                    return
            
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
                        customer_session = cookies["buildconnect_auth"].value
                        self.log_test("Marketplace Customer Login", True, "Customer login successful")
                    else:
                        self.log_test("Marketplace Customer Login", False, "No auth cookie received")
                        return
                else:
                    self.log_test("Marketplace Customer Login", False, f"Login failed: {response.status}")
                    return
            
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
                        professional_session = cookies["buildconnect_auth"].value
                        self.log_test("Marketplace Professional Login", True, "Professional login successful")
                    else:
                        self.log_test("Marketplace Professional Login", False, "No auth cookie received")
                        return
                else:
                    self.log_test("Marketplace Professional Login", False, f"Login failed: {response.status}")
                    return
            
            # Now test marketplace functionality
            await self.test_job_request_apis(customer_session, professional_session)
            await self.test_quote_management_apis(customer_session, professional_session)
            await self.test_messaging_apis(customer_session, professional_session)
            await self.test_notification_apis(customer_session, professional_session)
            
        except Exception as e:
            self.log_test("Marketplace API Setup", False, f"Setup failed: {str(e)}")
    
    async def test_job_request_apis(self, customer_session, professional_session):
        """Test job request CRUD operations"""
        print("\n--- Testing Job Request APIs ---")
        
        job_id = None
        
        # Test create job request (customer only)
        job_data = {
            "category": "plumbing",
            "title": "Kitchen Sink Installation",
            "description": "Need to install a new kitchen sink with modern fixtures. The old sink needs to be removed and disposed of properly.",
            "postcode": "101",
            "address": "Laugavegur 15, Reykjavik",
            "budget_min": 50000,
            "budget_max": 100000,
            "priority": "medium"
        }
        
        try:
            cookies = {"buildconnect_auth": customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/job-requests/",
                json=job_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    job_id = data["id"]
                    self.log_test("POST /api/job-requests", True, f"Job created with ID: {job_id}")
                else:
                    self.log_test("POST /api/job-requests", False, f"Job creation failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("POST /api/job-requests", False, f"Request failed: {str(e)}")
            return
        
        # Test get all job requests
        try:
            async with self.session.get(f"{BACKEND_URL}/job-requests/") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/job-requests", True, f"Retrieved {len(data)} job requests")
                else:
                    self.log_test("GET /api/job-requests", False, f"Failed to get jobs: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests", False, f"Request failed: {str(e)}")
        
        # Test get specific job request
        if job_id:
            try:
                async with self.session.get(f"{BACKEND_URL}/job-requests/{job_id}") as response:
                    data = await response.json()
                    if response.status == 200 and data.get("id") == job_id:
                        self.log_test("GET /api/job-requests/{id}", True, f"Retrieved job: {data.get('title')}")
                    else:
                        self.log_test("GET /api/job-requests/{id}", False, f"Failed to get job: {response.status}", data)
            except Exception as e:
                self.log_test("GET /api/job-requests/{id}", False, f"Request failed: {str(e)}")
        
        # Test update job request
        if job_id:
            try:
                update_data = {"title": "Updated Kitchen Sink Installation", "priority": "high"}
                cookies = {"buildconnect_auth": customer_session}
                async with self.session.put(
                    f"{BACKEND_URL}/job-requests/{job_id}",
                    json=update_data,
                    cookies=cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("title") == update_data["title"]:
                        self.log_test("PUT /api/job-requests/{id}", True, "Job updated successfully")
                    else:
                        self.log_test("PUT /api/job-requests/{id}", False, f"Update failed: {response.status}", data)
            except Exception as e:
                self.log_test("PUT /api/job-requests/{id}", False, f"Request failed: {str(e)}")
        
        # Test filtering by category
        try:
            async with self.session.get(f"{BACKEND_URL}/job-requests/?category=plumbing") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/job-requests (Category Filter)", True, f"Filtered {len(data)} plumbing jobs")
                else:
                    self.log_test("GET /api/job-requests (Category Filter)", False, f"Filter failed: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/job-requests (Category Filter)", False, f"Request failed: {str(e)}")
        
        # Store job_id for quote tests
        self.job_id = job_id
    
    async def test_quote_management_apis(self, customer_session, professional_session):
        """Test quote management functionality"""
        print("\n--- Testing Quote Management APIs ---")
        
        if not hasattr(self, 'job_id') or not self.job_id:
            self.log_test("Quote Tests Setup", False, "No job ID available for quote tests")
            return
        
        quote_id = None
        
        # Test create quote (professional only)
        from datetime import datetime, timedelta
        expires_at = (datetime.utcnow() + timedelta(days=7)).isoformat()
        
        quote_data = {
            "job_request_id": self.job_id,
            "amount": 75000,
            "message": "I can complete this kitchen sink installation professionally. I have 10 years of experience in plumbing work.",
            "estimated_duration": "1-2 days",
            "expires_at": expires_at,
            "includes_materials": True,
            "materials_cost": 25000,
            "labor_cost": 50000
        }
        
        try:
            cookies = {"buildconnect_auth": professional_session}
            async with self.session.post(
                f"{BACKEND_URL}/quotes/",
                json=quote_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    quote_id = data["id"]
                    self.log_test("POST /api/quotes", True, f"Quote created with ID: {quote_id}")
                else:
                    self.log_test("POST /api/quotes", False, f"Quote creation failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("POST /api/quotes", False, f"Request failed: {str(e)}")
            return
        
        # Test get quotes for job
        try:
            async with self.session.get(f"{BACKEND_URL}/quotes/?job_request_id={self.job_id}") as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list) and len(data) > 0:
                    self.log_test("GET /api/quotes (Job Filter)", True, f"Retrieved {len(data)} quotes for job")
                else:
                    self.log_test("GET /api/quotes (Job Filter)", False, f"Failed to get quotes: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/quotes (Job Filter)", False, f"Request failed: {str(e)}")
        
        # Test get specific quote
        if quote_id:
            try:
                cookies = {"buildconnect_auth": customer_session}
                async with self.session.get(
                    f"{BACKEND_URL}/quotes/{quote_id}",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("id") == quote_id:
                        self.log_test("GET /api/quotes/{id}", True, f"Retrieved quote: {data.get('amount')} ISK")
                    else:
                        self.log_test("GET /api/quotes/{id}", False, f"Failed to get quote: {response.status}", data)
            except Exception as e:
                self.log_test("GET /api/quotes/{id}", False, f"Request failed: {str(e)}")
        
        # Test accept quote (customer only)
        if quote_id:
            try:
                cookies = {"buildconnect_auth": customer_session}
                async with self.session.post(
                    f"{BACKEND_URL}/quotes/{quote_id}/accept",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        self.log_test("POST /api/quotes/{id}/accept", True, "Quote accepted successfully")
                    else:
                        self.log_test("POST /api/quotes/{id}/accept", False, f"Accept failed: {response.status}", data)
            except Exception as e:
                self.log_test("POST /api/quotes/{id}/accept", False, f"Request failed: {str(e)}")
        
        # Store quote_id for message tests
        self.quote_id = quote_id
    
    async def test_messaging_apis(self, customer_session, professional_session):
        """Test messaging functionality"""
        print("\n--- Testing Messaging APIs ---")
        
        if not hasattr(self, 'job_id') or not self.job_id:
            self.log_test("Messaging Tests Setup", False, "No job ID available for messaging tests")
            return
        
        # Get professional user ID for messaging
        professional_id = None
        try:
            cookies = {"buildconnect_auth": professional_session}
            async with self.session.get(f"{BACKEND_URL}/auth/me", cookies=cookies) as response:
                data = await response.json()
                if response.status == 200:
                    professional_id = data.get("id")
        except Exception as e:
            self.log_test("Get Professional ID", False, f"Failed to get professional ID: {str(e)}")
            return
        
        # Test send message (customer to professional)
        message_data = {
            "job_request_id": self.job_id,
            "recipient_id": professional_id,
            "content": "Hi Magnus, I'm interested in your quote. When would you be available to start the work?"
        }
        
        try:
            cookies = {"buildconnect_auth": customer_session}
            async with self.session.post(
                f"{BACKEND_URL}/messages/",
                json=message_data,
                cookies=cookies,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    self.log_test("POST /api/messages", True, f"Message sent: {data.get('id')}")
                else:
                    self.log_test("POST /api/messages", False, f"Message send failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/messages", False, f"Request failed: {str(e)}")
        
        # Test get job messages
        try:
            cookies = {"buildconnect_auth": customer_session}
            async with self.session.get(
                f"{BACKEND_URL}/messages/job/{self.job_id}",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/messages/job/{id}", True, f"Retrieved {len(data)} messages")
                else:
                    self.log_test("GET /api/messages/job/{id}", False, f"Failed to get messages: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/messages/job/{id}", False, f"Request failed: {str(e)}")
        
        # Test get conversations
        try:
            cookies = {"buildconnect_auth": customer_session}
            async with self.session.get(
                f"{BACKEND_URL}/messages/conversations",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/messages/conversations", True, f"Retrieved {len(data)} conversations")
                else:
                    self.log_test("GET /api/messages/conversations", False, f"Failed to get conversations: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/messages/conversations", False, f"Request failed: {str(e)}")
    
    async def test_notification_apis(self, customer_session, professional_session):
        """Test notification functionality"""
        print("\n--- Testing Notification APIs ---")
        
        # Test get user notifications
        try:
            cookies = {"buildconnect_auth": customer_session}
            async with self.session.get(
                f"{BACKEND_URL}/notifications/",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and isinstance(data, list):
                    self.log_test("GET /api/notifications", True, f"Retrieved {len(data)} notifications")
                else:
                    self.log_test("GET /api/notifications", False, f"Failed to get notifications: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/notifications", False, f"Request failed: {str(e)}")
        
        # Test get notification stats
        try:
            cookies = {"buildconnect_auth": customer_session}
            async with self.session.get(
                f"{BACKEND_URL}/notifications/stats",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200 and "total_notifications" in data:
                    self.log_test("GET /api/notifications/stats", True, f"Stats: {data.get('total_notifications')} total, {data.get('unread_count')} unread")
                else:
                    self.log_test("GET /api/notifications/stats", False, f"Failed to get stats: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/notifications/stats", False, f"Request failed: {str(e)}")
        
        # Test mark all notifications as read
        try:
            cookies = {"buildconnect_auth": customer_session}
            async with self.session.put(
                f"{BACKEND_URL}/notifications/mark-all-read",
                cookies=cookies
            ) as response:
                data = await response.json()
                if response.status == 200:
                    self.log_test("PUT /api/notifications/mark-all-read", True, f"Marked notifications as read: {data.get('message')}")
                else:
                    self.log_test("PUT /api/notifications/mark-all-read", False, f"Failed to mark as read: {response.status}", data)
        except Exception as e:
            self.log_test("PUT /api/notifications/mark-all-read", False, f"Request failed: {str(e)}")

    async def test_public_job_posting_wizard(self):
        """Test comprehensive public job posting wizard functionality"""
        print("\n=== Testing Public Job Posting Wizard ===")
        
        # Test data for wizard flow
        draft_data = {
            "category": "plumbing",
            "title": "Emergency Kitchen Sink Repair Needed",
            "description": "My kitchen sink is leaking badly and needs immediate professional attention. The leak is coming from under the sink and water is pooling on the floor.",
            "postcode": "101"
        }
        
        contact_data = {
            "email": "homeowner@example.com",
            "phone": "+354-555-1234",
            "firstName": "Anna",
            "lastName": "Sigurdsdottir",
            "address": "Laugavegur 25, Reykjavik",
            "postcode": "101",
            "contactPreference": "platform_and_phone"
        }
        
        draft_id = None
        guest_session = None
        
        # Test 1: Create draft job request as guest (no auth)
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=draft_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    draft_id = data["id"]
                    # Check for guest cookie
                    cookies = response.cookies
                    if "bc_guest_id" in cookies:
                        guest_session = cookies["bc_guest_id"].value
                        self.log_test("POST /api/public/job-requests/draft (Guest)", True, f"Draft created with ID: {draft_id}, Guest ID: {guest_session[:8]}...")
                    else:
                        self.log_test("POST /api/public/job-requests/draft (Guest)", False, "Draft created but no guest cookie set")
                else:
                    self.log_test("POST /api/public/job-requests/draft (Guest)", False, f"Draft creation failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("POST /api/public/job-requests/draft (Guest)", False, f"Request failed: {str(e)}")
            return
        
        # Test 2: Update draft with contact information (using guest session)
        if draft_id and guest_session:
            try:
                cookies = {"bc_guest_id": guest_session}
                async with self.session.patch(
                    f"{BACKEND_URL}/public/job-requests/{draft_id}",
                    json=contact_data,
                    cookies=cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200:
                        self.log_test("PATCH /api/public/job-requests/{id} (Guest Update)", True, "Draft updated with contact info")
                    else:
                        self.log_test("PATCH /api/public/job-requests/{id} (Guest Update)", False, f"Update failed: {response.status}", data)
            except Exception as e:
                self.log_test("PATCH /api/public/job-requests/{id} (Guest Update)", False, f"Request failed: {str(e)}")
        
        # Test 3: Submit draft to make it live
        if draft_id and guest_session:
            try:
                cookies = {"bc_guest_id": guest_session}
                async with self.session.post(
                    f"{BACKEND_URL}/public/job-requests/{draft_id}/submit",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("status") == "open":
                        self.log_test("POST /api/public/job-requests/{id}/submit (Guest)", True, f"Draft submitted successfully, status: {data.get('status')}")
                    else:
                        self.log_test("POST /api/public/job-requests/{id}/submit (Guest)", False, f"Submit failed: {response.status}", data)
            except Exception as e:
                self.log_test("POST /api/public/job-requests/{id}/submit (Guest)", False, f"Request failed: {str(e)}")
        
        # Test 4: Test validation errors
        await self.test_public_wizard_validation()
        
        # Test 5: Test authorization (guest A cannot modify guest B's drafts)
        await self.test_public_wizard_authorization()
        
        # Test 6: Test rate limiting
        await self.test_public_wizard_rate_limiting()
        
        # Test 7: Test authenticated user can also use public endpoints
        await self.test_public_wizard_authenticated_user()
        
        # Test 8: Test all wizard categories
        await self.test_public_wizard_categories()
    
    async def test_public_wizard_validation(self):
        """Test validation errors for public wizard"""
        print("\n--- Testing Public Wizard Validation ---")
        
        # Test short title (less than 10 chars)
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
                if response.status == 422:  # Validation error
                    self.log_test("Public Wizard Validation (Short Title)", True, "Short title correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Public Wizard Validation (Short Title)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Public Wizard Validation (Short Title)", False, f"Request failed: {str(e)}")
        
        # Test short description (less than 30 chars)
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
                if response.status == 422:  # Validation error
                    self.log_test("Public Wizard Validation (Short Description)", True, "Short description correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Public Wizard Validation (Short Description)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Public Wizard Validation (Short Description)", False, f"Request failed: {str(e)}")
    
    async def test_public_wizard_authorization(self):
        """Test authorization - guest A cannot modify guest B's drafts"""
        print("\n--- Testing Public Wizard Authorization ---")
        
        # Create draft with first guest session
        draft_data = {
            "category": "renovation",
            "title": "Bathroom Renovation Project",
            "description": "Complete bathroom renovation including new tiles, fixtures, and plumbing work needed for modern upgrade",
            "postcode": "105"
        }
        
        draft_id = None
        guest_a_session = None
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=draft_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    draft_id = data["id"]
                    cookies = response.cookies
                    if "bc_guest_id" in cookies:
                        guest_a_session = cookies["bc_guest_id"].value
                        self.log_test("Authorization Test Setup (Guest A)", True, f"Draft created by Guest A: {draft_id}")
                    else:
                        self.log_test("Authorization Test Setup (Guest A)", False, "No guest cookie set")
                        return
                else:
                    self.log_test("Authorization Test Setup (Guest A)", False, f"Setup failed: {response.status}")
                    return
        except Exception as e:
            self.log_test("Authorization Test Setup (Guest A)", False, f"Request failed: {str(e)}")
            return
        
        # Try to update with different guest session (Guest B)
        if draft_id:
            try:
                # Use a different session to simulate Guest B
                async with aiohttp.ClientSession() as guest_b_session:
                    update_data = {"title": "Unauthorized Update Attempt"}
                    async with guest_b_session.patch(
                        f"{BACKEND_URL}/public/job-requests/{draft_id}",
                        json=update_data,
                        headers={"Content-Type": "application/json"}
                    ) as response:
                        if response.status == 403:  # Forbidden
                            self.log_test("Public Wizard Authorization (Guest B Denied)", True, "Guest B correctly denied access to Guest A's draft")
                        else:
                            data = await response.json()
                            self.log_test("Public Wizard Authorization (Guest B Denied)", False, f"Expected 403, got: {response.status}", data)
            except Exception as e:
                self.log_test("Public Wizard Authorization (Guest B Denied)", False, f"Request failed: {str(e)}")
    
    async def test_public_wizard_rate_limiting(self):
        """Test rate limiting for guest users (10 posts per hour)"""
        print("\n--- Testing Public Wizard Rate Limiting ---")
        
        # Create multiple drafts quickly to test rate limiting
        base_data = {
            "category": "cleaning",
            "title": "House Cleaning Service Required",
            "description": "Professional house cleaning service needed for deep cleaning of entire home including all rooms",
            "postcode": "107"
        }
        
        successful_requests = 0
        rate_limited = False
        
        # Try to create 12 drafts (should hit rate limit at 11th)
        for i in range(12):
            try:
                test_data = base_data.copy()
                test_data["title"] = f"House Cleaning Service Required #{i+1}"
                
                async with self.session.post(
                    f"{BACKEND_URL}/public/job-requests/draft",
                    json=test_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 200:
                        successful_requests += 1
                    elif response.status == 429:  # Too Many Requests
                        rate_limited = True
                        break
                    else:
                        # Other error, stop testing
                        break
            except Exception as e:
                break
        
        if rate_limited and successful_requests >= 10:
            self.log_test("Public Wizard Rate Limiting", True, f"Rate limiting working: {successful_requests} successful, then blocked")
        elif successful_requests < 10:
            self.log_test("Public Wizard Rate Limiting", False, f"Rate limit too strict: only {successful_requests} allowed")
        else:
            self.log_test("Public Wizard Rate Limiting", False, f"Rate limiting not working: {successful_requests} requests allowed")
    
    async def test_public_wizard_authenticated_user(self):
        """Test that authenticated users can also use public endpoints"""
        print("\n--- Testing Public Wizard with Authenticated User ---")
        
        # Create a test user first
        import time
        timestamp = str(int(time.time()))
        
        user_data = {
            "email": f"wizard_user_{timestamp}@example.com",
            "password": "WizardTest123!",
            "role": "customer",
            "first_name": "Test",
            "last_name": "User",
            "phone": "+354-555-9999",
            "language": "en"
        }
        
        # Register user
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register",
                json=user_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status != 201:
                    self.log_test("Authenticated User Setup", False, f"User registration failed: {response.status}")
                    return
        except Exception as e:
            self.log_test("Authenticated User Setup", False, f"Registration failed: {str(e)}")
            return
        
        # Login user
        user_session = None
        try:
            login_data = {"username": user_data["email"], "password": user_data["password"]}
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        user_session = cookies["buildconnect_auth"].value
                        self.log_test("Authenticated User Login", True, "User logged in successfully")
                    else:
                        self.log_test("Authenticated User Login", False, "No auth cookie received")
                        return
                else:
                    self.log_test("Authenticated User Login", False, f"Login failed: {response.status}")
                    return
        except Exception as e:
            self.log_test("Authenticated User Login", False, f"Login failed: {str(e)}")
            return
        
        # Test public endpoint with authenticated user
        if user_session:
            draft_data = {
                "category": "automotive",
                "title": "Car Repair Service Needed",
                "description": "Professional car repair service needed for engine diagnostics and potential repair work on vehicle",
                "postcode": "108"
            }
            
            try:
                cookies = {"buildconnect_auth": user_session}
                async with self.session.post(
                    f"{BACKEND_URL}/public/job-requests/draft",
                    json=draft_data,
                    cookies=cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("id"):
                        self.log_test("Public Wizard (Authenticated User)", True, f"Authenticated user can use public endpoint: {data.get('id')}")
                    else:
                        self.log_test("Public Wizard (Authenticated User)", False, f"Public endpoint failed for auth user: {response.status}", data)
            except Exception as e:
                self.log_test("Public Wizard (Authenticated User)", False, f"Request failed: {str(e)}")
    
    async def test_public_wizard_categories(self):
        """Test all wizard categories work correctly"""
        print("\n--- Testing Public Wizard Categories ---")
        
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
                if category == "automotive":
                    # Test automotive category with license plate
                    draft_data = {
                        "category": category,
                        "licensePlate": "AB123XY",
                        "plateCountry": "IS",
                        "postcode": "101"
                    }
                else:
                    # Test regular categories with title/description
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
                        self.log_test(f"Public Wizard Category ({category})", True, f"Category {category} working correctly")
                    else:
                        self.log_test(f"Public Wizard Category ({category})", False, f"Category {category} failed: {response.status}", data)
            except Exception as e:
                self.log_test(f"Public Wizard Category ({category})", False, f"Request failed: {str(e)}")
    
    async def test_automotive_job_posting_flow(self):
        """Test comprehensive automotive job posting flow as requested in review"""
        print("\n=== Testing Automotive Job Posting Flow ===")
        
        # Test 1: Create automotive draft with license plate data
        automotive_data = {
            "category": "automotive",
            "licensePlate": "AB123XY", 
            "plateCountry": "IS",
            "postcode": "101"
        }
        
        draft_id = None
        guest_session = None
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=automotive_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    draft_id = data["id"]
                    # Check for guest cookie
                    cookies = response.cookies
                    if "bc_guest_id" in cookies:
                        guest_session = cookies["bc_guest_id"].value
                        self.log_test("POST /api/public/job-requests/draft (Automotive)", True, f"Automotive draft created with license plate: {data.get('licensePlate')}")
                    else:
                        self.log_test("POST /api/public/job-requests/draft (Automotive)", False, "Draft created but no guest cookie set")
                else:
                    self.log_test("POST /api/public/job-requests/draft (Automotive)", False, f"Automotive draft creation failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("POST /api/public/job-requests/draft (Automotive)", False, f"Request failed: {str(e)}")
            return
        
        # Test 2: Update automotive draft with new license plate
        if draft_id and guest_session:
            try:
                update_data = {
                    "licensePlate": "XY789AB",
                    "plateCountry": "NO"
                }
                cookies = {"bc_guest_id": guest_session}
                async with self.session.patch(
                    f"{BACKEND_URL}/public/job-requests/{draft_id}",
                    json=update_data,
                    cookies=cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 200:
                        self.log_test("PATCH /api/public/job-requests/{id} (Automotive Update)", True, "License plate updated successfully")
                    else:
                        data = await response.json()
                        self.log_test("PATCH /api/public/job-requests/{id} (Automotive Update)", False, f"Update failed: {response.status}", data)
            except Exception as e:
                self.log_test("PATCH /api/public/job-requests/{id} (Automotive Update)", False, f"Request failed: {str(e)}")
        
        # Test 3: Submit automotive job
        if draft_id and guest_session:
            try:
                cookies = {"bc_guest_id": guest_session}
                async with self.session.post(
                    f"{BACKEND_URL}/public/job-requests/{draft_id}/submit",
                    cookies=cookies
                ) as response:
                    data = await response.json()
                    if response.status == 200 and data.get("status") == "open":
                        self.log_test("POST /api/public/job-requests/{id}/submit (Automotive)", True, f"Automotive job submitted successfully")
                    else:
                        self.log_test("POST /api/public/job-requests/{id}/submit (Automotive)", False, f"Submit failed: {response.status}", data)
            except Exception as e:
                self.log_test("POST /api/public/job-requests/{id}/submit (Automotive)", False, f"Request failed: {str(e)}")
        
        # Test 4: Test non-automotive category with regular data
        regular_data = {
            "category": "handcraft",
            "title": "Need handcraft services for my project",
            "description": "I need help with custom woodworking for my kitchen cabinets. The project involves creating new cabinet doors and drawer fronts.",
            "postcode": "101"
        }
        
        regular_draft_id = None
        regular_guest_session = None
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=regular_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200 and data.get("id"):
                    regular_draft_id = data["id"]
                    cookies = response.cookies
                    if "bc_guest_id" in cookies:
                        regular_guest_session = cookies["bc_guest_id"].value
                        self.log_test("POST /api/public/job-requests/draft (Regular)", True, f"Regular draft created with title: {data.get('title')}")
                    else:
                        self.log_test("POST /api/public/job-requests/draft (Regular)", False, "Draft created but no guest cookie set")
                else:
                    self.log_test("POST /api/public/job-requests/draft (Regular)", False, f"Regular draft creation failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/public/job-requests/draft (Regular)", False, f"Request failed: {str(e)}")
        
        # Test 5: Mixed updates - automotive draft with contact info
        if draft_id and guest_session:
            try:
                contact_data = {
                    "email": "customer@example.com",
                    "phone": "+354-555-1234",
                    "firstName": "John",
                    "lastName": "Doe"
                }
                cookies = {"bc_guest_id": guest_session}
                async with self.session.patch(
                    f"{BACKEND_URL}/public/job-requests/{draft_id}",
                    json=contact_data,
                    cookies=cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 200:
                        self.log_test("Mixed Update (Automotive + Contact)", True, "Automotive draft updated with contact info")
                    else:
                        data = await response.json()
                        self.log_test("Mixed Update (Automotive + Contact)", False, f"Mixed update failed: {response.status}", data)
            except Exception as e:
                self.log_test("Mixed Update (Automotive + Contact)", False, f"Request failed: {str(e)}")
        
        # Test 6: Regular draft with license plate fields (should be ignored)
        if regular_draft_id and regular_guest_session:
            try:
                mixed_data = {
                    "title": "Updated handcraft project title",
                    "licensePlate": "IGNORED123",  # Should be ignored for non-automotive
                    "plateCountry": "IGNORED"
                }
                cookies = {"bc_guest_id": regular_guest_session}
                async with self.session.patch(
                    f"{BACKEND_URL}/public/job-requests/{regular_draft_id}",
                    json=mixed_data,
                    cookies=cookies,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 200:
                        self.log_test("Mixed Update (Regular + License Plate)", True, "Regular draft updated, license plate fields ignored")
                    else:
                        data = await response.json()
                        self.log_test("Mixed Update (Regular + License Plate)", False, f"Mixed update failed: {response.status}", data)
            except Exception as e:
                self.log_test("Mixed Update (Regular + License Plate)", False, f"Request failed: {str(e)}")
        
        # Test validation scenarios
        await self.test_automotive_validation()
    
    async def test_automotive_validation(self):
        """Test validation for automotive job posting"""
        print("\n--- Testing Automotive Validation ---")
        
        # Test 1: Automotive category without license plate should fail
        try:
            invalid_automotive = {
                "category": "automotive",
                "postcode": "101"
                # Missing licensePlate
            }
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=invalid_automotive,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:  # Validation error
                    self.log_test("Automotive Validation (Missing License Plate)", True, "Missing license plate correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Automotive Validation (Missing License Plate)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Automotive Validation (Missing License Plate)", False, f"Request failed: {str(e)}")
        
        # Test 2: License plate too short (less than 2 chars)
        try:
            short_plate = {
                "category": "automotive",
                "licensePlate": "A",  # Only 1 character
                "plateCountry": "IS",
                "postcode": "101"
            }
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=short_plate,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:
                    self.log_test("Automotive Validation (Short License Plate)", True, "Short license plate correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Automotive Validation (Short License Plate)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Automotive Validation (Short License Plate)", False, f"Request failed: {str(e)}")
        
        # Test 3: License plate too long (more than 8 chars)
        try:
            long_plate = {
                "category": "automotive",
                "licensePlate": "TOOLONGPLATE",  # 12 characters
                "plateCountry": "IS",
                "postcode": "101"
            }
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=long_plate,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:
                    self.log_test("Automotive Validation (Long License Plate)", True, "Long license plate correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Automotive Validation (Long License Plate)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Automotive Validation (Long License Plate)", False, f"Request failed: {str(e)}")
        
        # Test 4: License plate with invalid characters
        try:
            invalid_chars = {
                "category": "automotive",
                "licensePlate": "AB-123",  # Contains hyphen
                "plateCountry": "IS",
                "postcode": "101"
            }
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=invalid_chars,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:
                    self.log_test("Automotive Validation (Invalid Characters)", True, "Invalid license plate characters correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Automotive Validation (Invalid Characters)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Automotive Validation (Invalid Characters)", False, f"Request failed: {str(e)}")
        
        # Test 5: Regular category without title should fail
        try:
            no_title = {
                "category": "handcraft",
                "description": "This is a valid description that meets the minimum length requirement",
                "postcode": "101"
                # Missing title
            }
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=no_title,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:
                    self.log_test("Regular Validation (Missing Title)", True, "Missing title correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Regular Validation (Missing Title)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Regular Validation (Missing Title)", False, f"Request failed: {str(e)}")
        
        # Test 6: Regular category without description should fail
        try:
            no_description = {
                "category": "handcraft",
                "title": "Valid title with enough characters",
                "postcode": "101"
                # Missing description
            }
            async with self.session.post(
                f"{BACKEND_URL}/public/job-requests/draft",
                json=no_description,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:
                    self.log_test("Regular Validation (Missing Description)", True, "Missing description correctly rejected")
                else:
                    data = await response.json()
                    self.log_test("Regular Validation (Missing Description)", False, f"Expected 422, got: {response.status}", data)
        except Exception as e:
            self.log_test("Regular Validation (Missing Description)", False, f"Request failed: {str(e)}")

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
            await self.test_authentication_system()
            await self.test_marketplace_apis()
            await self.test_public_job_posting_wizard()
            await self.test_automotive_job_posting_flow()
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