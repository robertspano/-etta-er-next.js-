#!/usr/bin/env python3
"""
Company Registration Backend API Test Suite
Focused testing for the company registration endpoint as requested
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from environment
BACKEND_URL = "https://verki-rebrand.preview.emergentagent.com/api"

class CompanyRegistrationTester:
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

    async def test_company_registration_endpoint(self):
        """Test POST /api/auth/register-company endpoint with valid Icelandic company data"""
        print("\n=== Testing Company Registration Endpoint ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Test data as specified in the review request
        valid_company_data = {
            "company_id": "1234567890",  # 10-digit Icelandic kennitala
            "electronic_id": "5551234",  # 7-digit phone
            "name": "Test Company Ltd",
            "email": f"test@company.{timestamp}.is",
            "password": "securepass123"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register-company",
                json=valid_company_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    # Check response format matches CompanyRegistrationResponse schema
                    required_fields = ["message", "user_id", "email"]
                    has_all_fields = all(field in data for field in required_fields)
                    
                    if (has_all_fields and 
                        data.get("email") == valid_company_data["email"] and
                        "successfully" in data.get("message", "").lower()):
                        self.log_test("POST /api/auth/register-company (Valid Data)", True, 
                                    f"Company registered successfully: {data.get('email')}")
                        
                        # Store user_id for database verification
                        self.company_user_id = data.get("user_id")
                        return data.get("user_id")
                    else:
                        self.log_test("POST /api/auth/register-company (Valid Data)", False, 
                                    "Invalid response format", data)
                else:
                    self.log_test("POST /api/auth/register-company (Valid Data)", False, 
                                f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/auth/register-company (Valid Data)", False, 
                        f"Request failed: {str(e)}")
        
        return None

    async def test_database_storage_verification(self, user_id: str, test_data: dict):
        """Test that company data is properly saved to the database"""
        print("\n=== Testing Database Storage Verification ===")
        
        # Login with the created user to verify data persistence
        try:
            login_data = {
                "username": test_data["email"],
                "password": test_data["password"]
            }
            async with self.session.post(
                f"{BACKEND_URL}/auth/cookie/login",
                data=login_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            ) as response:
                if response.status == 204:
                    cookies = response.cookies
                    if "buildconnect_auth" in cookies:
                        auth_cookie = cookies["buildconnect_auth"].value
                        
                        # Get user profile to verify data storage
                        cookies_dict = {"buildconnect_auth": auth_cookie}
                        async with self.session.get(
                            f"{BACKEND_URL}/auth/me",
                            cookies=cookies_dict
                        ) as profile_response:
                            profile_data = await profile_response.json()
                            if profile_response.status == 200:
                                self.log_test("Database Storage - User Login", True, 
                                            "User can login with registered credentials")
                                
                                # Verify all company data is stored correctly
                                profile = profile_data.get("profile", {})
                                
                                # Check company_id storage
                                if profile.get("company_id") == test_data["company_id"]:
                                    self.log_test("Database Storage - Company ID", True, 
                                                f"Company ID correctly stored: {profile.get('company_id')}")
                                else:
                                    self.log_test("Database Storage - Company ID", False, 
                                                f"Expected: {test_data['company_id']}, Got: {profile.get('company_id')}")
                                
                                # Check phone storage
                                if profile.get("phone") == test_data["electronic_id"]:
                                    self.log_test("Database Storage - Phone", True, 
                                                f"Phone correctly stored: {profile.get('phone')}")
                                else:
                                    self.log_test("Database Storage - Phone", False, 
                                                f"Expected: {test_data['electronic_id']}, Got: {profile.get('phone')}")
                                
                                # Check email storage
                                if profile_data.get("email") == test_data["email"]:
                                    self.log_test("Database Storage - Email", True, 
                                                f"Email correctly stored: {profile_data.get('email')}")
                                else:
                                    self.log_test("Database Storage - Email", False, 
                                                f"Expected: {test_data['email']}, Got: {profile_data.get('email')}")
                                
                                # Check professional role
                                if profile_data.get("role") == "professional":
                                    self.log_test("Database Storage - Professional Role", True, 
                                                "User created with PROFESSIONAL role")
                                else:
                                    self.log_test("Database Storage - Professional Role", False, 
                                                f"Expected: professional, Got: {profile_data.get('role')}")
                                
                                # Check name parsing
                                expected_first_name = "Test"
                                expected_last_name = "Company Ltd"
                                if (profile.get("first_name") == expected_first_name and 
                                    profile.get("last_name") == expected_last_name):
                                    self.log_test("Database Storage - Name Parsing", True, 
                                                f"Name correctly parsed: '{expected_first_name}' / '{expected_last_name}'")
                                else:
                                    self.log_test("Database Storage - Name Parsing", False, 
                                                f"Expected: '{expected_first_name}' / '{expected_last_name}', Got: '{profile.get('first_name')}' / '{profile.get('last_name')}'")
                            else:
                                self.log_test("Database Storage - Profile Retrieval", False, 
                                            f"Failed to retrieve user profile: {profile_response.status}")
                    else:
                        self.log_test("Database Storage - User Login", False, 
                                    "Login successful but no auth cookie received")
                else:
                    self.log_test("Database Storage - User Login", False, 
                                f"Login failed: {response.status}")
        except Exception as e:
            self.log_test("Database Storage - User Login", False, f"Login test failed: {str(e)}")

    async def test_company_id_validation(self):
        """Test validation for Company ID (kennitala - 10 digits)"""
        print("\n=== Testing Company ID Validation ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Test cases for company ID validation
        test_cases = [
            ("123456789", "9 digits - too short"),
            ("12345678901", "11 digits - too long"),
            ("123456789a", "contains letter"),
            ("123-456-789", "9 digits with dashes"),
            ("", "empty company ID"),
            ("abcdefghij", "all letters"),
            ("123 456 789", "9 digits with spaces")
        ]
        
        for company_id, description in test_cases:
            try:
                invalid_data = {
                    "company_id": company_id,
                    "electronic_id": "5551234",
                    "name": "Test Company",
                    "email": f"test.companyid.{timestamp}.{len(company_id)}@example.is",
                    "password": "securepass123"
                }
                
                async with self.session.post(
                    f"{BACKEND_URL}/auth/register-company",
                    json=invalid_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 400:
                        data = await response.json()
                        if "company id" in data.get("detail", "").lower() or "kennitala" in data.get("detail", "").lower():
                            self.log_test(f"Company ID Validation ({description})", True, 
                                        "Invalid company ID correctly rejected")
                        else:
                            self.log_test(f"Company ID Validation ({description})", False, 
                                        f"Wrong error message: {data.get('detail')}")
                    else:
                        data = await response.json()
                        self.log_test(f"Company ID Validation ({description})", False, 
                                    f"Expected 400, got: {response.status}", data)
            except Exception as e:
                self.log_test(f"Company ID Validation ({description})", False, f"Request failed: {str(e)}")

    async def test_electronic_id_validation(self):
        """Test validation for Electronic ID/Phone (7-8 digits)"""
        print("\n=== Testing Electronic ID/Phone Validation ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Test cases for electronic ID validation
        test_cases = [
            ("123456", "6 digits - too short"),
            ("123456789", "9 digits - too long"),
            ("12345a7", "contains letter"),
            ("", "empty electronic ID"),
            ("abcdefg", "all letters"),
            ("123-456", "6 digits with dash")
        ]
        
        for electronic_id, description in test_cases:
            try:
                invalid_data = {
                    "company_id": "1234567890",
                    "electronic_id": electronic_id,
                    "name": "Test Company",
                    "email": f"test.phone.{timestamp}.{len(electronic_id)}@example.is",
                    "password": "securepass123"
                }
                
                async with self.session.post(
                    f"{BACKEND_URL}/auth/register-company",
                    json=invalid_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 400:
                        data = await response.json()
                        if "phone" in data.get("detail", "").lower() or "electronic" in data.get("detail", "").lower():
                            self.log_test(f"Electronic ID Validation ({description})", True, 
                                        "Invalid electronic ID correctly rejected")
                        else:
                            self.log_test(f"Electronic ID Validation ({description})", False, 
                                        f"Wrong error message: {data.get('detail')}")
                    else:
                        data = await response.json()
                        self.log_test(f"Electronic ID Validation ({description})", False, 
                                    f"Expected 400, got: {response.status}", data)
            except Exception as e:
                self.log_test(f"Electronic ID Validation ({description})", False, f"Request failed: {str(e)}")
        
        # Test valid 7-digit and 8-digit phone numbers
        valid_cases = [
            ("5551234", "7-digit phone"),
            ("55512345", "8-digit phone")
        ]
        
        for electronic_id, description in valid_cases:
            try:
                valid_data = {
                    "company_id": f"123456789{len(electronic_id)}",
                    "electronic_id": electronic_id,
                    "name": "Valid Test Company",
                    "email": f"test.valid.phone.{timestamp}.{len(electronic_id)}@example.is",
                    "password": "securepass123"
                }
                
                async with self.session.post(
                    f"{BACKEND_URL}/auth/register-company",
                    json=valid_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 200:
                        self.log_test(f"Electronic ID Validation ({description})", True, 
                                    f"Valid {description} accepted")
                    else:
                        data = await response.json()
                        self.log_test(f"Electronic ID Validation ({description})", False, 
                                    f"Valid {description} rejected: {response.status}", data)
            except Exception as e:
                self.log_test(f"Electronic ID Validation ({description})", False, f"Request failed: {str(e)}")

    async def test_email_validation(self):
        """Test email validation"""
        print("\n=== Testing Email Validation ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Test cases for email validation
        test_cases = [
            ("invalid-email", "missing @ symbol"),
            ("test@", "missing domain"),
            ("@example.com", "missing local part"),
            ("", "empty email"),
            ("test..test@example.com", "double dots"),
            ("test@", "incomplete domain")
        ]
        
        for email, description in test_cases:
            try:
                invalid_data = {
                    "company_id": "1234567890",
                    "electronic_id": "5551234",
                    "name": "Test Company",
                    "email": email,
                    "password": "securepass123"
                }
                
                async with self.session.post(
                    f"{BACKEND_URL}/auth/register-company",
                    json=invalid_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status in [400, 422]:
                        self.log_test(f"Email Validation ({description})", True, 
                                    "Invalid email correctly rejected")
                    else:
                        data = await response.json()
                        self.log_test(f"Email Validation ({description})", False, 
                                    f"Expected 400/422, got: {response.status}", data)
            except Exception as e:
                self.log_test(f"Email Validation ({description})", False, f"Request failed: {str(e)}")

    async def test_password_validation(self):
        """Test password validation"""
        print("\n=== Testing Password Validation ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # Test cases for password validation
        test_cases = [
            ("", "empty password"),
            ("123", "too short - 3 chars"),
            ("12345", "too short - 5 chars"),
            ("1234567", "too short - 7 chars")
        ]
        
        for password, description in test_cases:
            try:
                invalid_data = {
                    "company_id": "1234567890",
                    "electronic_id": "5551234",
                    "name": "Test Company",
                    "email": f"test.pwd.{timestamp}.{len(password)}@example.is",
                    "password": password
                }
                
                async with self.session.post(
                    f"{BACKEND_URL}/auth/register-company",
                    json=invalid_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status in [400, 422]:
                        self.log_test(f"Password Validation ({description})", True, 
                                    "Invalid password correctly rejected")
                    else:
                        data = await response.json()
                        self.log_test(f"Password Validation ({description})", False, 
                                    f"Expected 400/422, got: {response.status}", data)
            except Exception as e:
                self.log_test(f"Password Validation ({description})", False, f"Request failed: {str(e)}")

    async def test_duplicate_email_handling(self):
        """Test error handling for duplicate emails"""
        print("\n=== Testing Duplicate Email Handling ===")
        
        import time
        timestamp = str(int(time.time()))
        
        # First registration
        first_registration = {
            "company_id": "1111111111",
            "electronic_id": "5551111",
            "name": "First Company",
            "email": f"duplicate.test.{timestamp}@example.is",
            "password": "firstpass123"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register-company",
                json=first_registration,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 200:
                    self.log_test("First Registration (Duplicate Test)", True, 
                                "First registration successful")
                else:
                    data = await response.json()
                    self.log_test("First Registration (Duplicate Test)", False, 
                                f"First registration failed: {response.status}", data)
                    return
        except Exception as e:
            self.log_test("First Registration (Duplicate Test)", False, f"Request failed: {str(e)}")
            return
        
        # Second registration with same email
        second_registration = {
            "company_id": "2222222222",
            "electronic_id": "5552222",
            "name": "Second Company",
            "email": f"duplicate.test.{timestamp}@example.is",  # Same email
            "password": "secondpass123"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register-company",
                json=second_registration,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 400:
                    data = await response.json()
                    if "email" in data.get("detail", "").lower():
                        self.log_test("Duplicate Email Handling", True, 
                                    "Duplicate email correctly rejected")
                    else:
                        self.log_test("Duplicate Email Handling", False, 
                                    f"Wrong error message: {data.get('detail')}")
                else:
                    data = await response.json()
                    self.log_test("Duplicate Email Handling", False, 
                                f"Expected 400, got: {response.status}", data)
        except Exception as e:
            self.log_test("Duplicate Email Handling", False, f"Request failed: {str(e)}")

    async def test_api_response_format(self):
        """Test that API response format matches CompanyRegistrationResponse schema"""
        print("\n=== Testing API Response Format ===")
        
        import time
        timestamp = str(int(time.time()))
        
        test_data = {
            "company_id": "9999999999",
            "electronic_id": "5559999",
            "name": "Response Format Test Company",
            "email": f"response.format.{timestamp}@example.is",
            "password": "responsepass123"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/auth/register-company",
                json=test_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                if response.status == 200:
                    # Check CompanyRegistrationResponse schema
                    required_fields = ["message", "user_id", "email"]
                    has_all_fields = all(field in data for field in required_fields)
                    
                    if has_all_fields:
                        self.log_test("API Response Format - Required Fields", True, 
                                    "All required fields present in response")
                        
                        # Check field types
                        if (isinstance(data.get("message"), str) and 
                            isinstance(data.get("user_id"), str) and 
                            isinstance(data.get("email"), str)):
                            self.log_test("API Response Format - Field Types", True, 
                                        "All fields have correct types")
                        else:
                            self.log_test("API Response Format - Field Types", False, 
                                        f"Incorrect field types: {data}")
                        
                        # Check message content
                        if "success" in data.get("message", "").lower():
                            self.log_test("API Response Format - Success Message", True, 
                                        f"Success message: {data.get('message')}")
                        else:
                            self.log_test("API Response Format - Success Message", False, 
                                        f"Unexpected message: {data.get('message')}")
                        
                        # Check email matches input
                        if data.get("email") == test_data["email"]:
                            self.log_test("API Response Format - Email Match", True, 
                                        "Response email matches input")
                        else:
                            self.log_test("API Response Format - Email Match", False, 
                                        f"Email mismatch: expected {test_data['email']}, got {data.get('email')}")
                    else:
                        missing_fields = [field for field in required_fields if field not in data]
                        self.log_test("API Response Format - Required Fields", False, 
                                    f"Missing fields: {missing_fields}")
                else:
                    self.log_test("API Response Format", False, 
                                f"Registration failed: {response.status}", data)
        except Exception as e:
            self.log_test("API Response Format", False, f"Request failed: {str(e)}")

    async def run_complete_test_suite(self):
        """Run the complete company registration test suite"""
        print("🚀 Starting Company Registration Backend API Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print("=" * 80)
        
        await self.setup()
        
        try:
            # Test 1: Basic endpoint functionality with valid data
            user_id = await self.test_company_registration_endpoint()
            
            # Test 2: Database storage verification
            if user_id:
                test_data = {
                    "company_id": "1234567890",
                    "electronic_id": "5551234",
                    "name": "Test Company Ltd",
                    "email": f"test@company.{int(datetime.now().timestamp())}.is",
                    "password": "securepass123"
                }
                await self.test_database_storage_verification(user_id, test_data)
            
            # Test 3: Company ID validation (kennitala - 10 digits)
            await self.test_company_id_validation()
            
            # Test 4: Electronic ID/Phone validation (7-8 digits)
            await self.test_electronic_id_validation()
            
            # Test 5: Email validation
            await self.test_email_validation()
            
            # Test 6: Password validation
            await self.test_password_validation()
            
            # Test 7: Duplicate email handling
            await self.test_duplicate_email_handling()
            
            # Test 8: API response format verification
            await self.test_api_response_format()
            
            # Print summary
            self.print_test_summary()
            
        finally:
            await self.cleanup()

    def print_test_summary(self):
        """Print test results summary"""
        print("\n" + "=" * 80)
        print("🏁 COMPANY REGISTRATION TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"📊 Success Rate: {success_rate:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   • {result['test']}: {result['details']}")
        
        print("\n" + "=" * 80)
        
        # Summary for main agent
        print("\n📋 SUMMARY FOR MAIN AGENT:")
        if success_rate >= 90:
            print("✅ Company registration backend API is working properly!")
        elif success_rate >= 70:
            print("⚠️  Company registration backend API has minor issues that need attention.")
        else:
            print("❌ Company registration backend API has significant issues that need fixing.")
        
        print(f"\nKey findings:")
        print(f"- POST /api/auth/register-company endpoint: {'✅ Working' if any(r['success'] and 'Valid Data' in r['test'] for r in self.test_results) else '❌ Not working'}")
        print(f"- Database storage: {'✅ Working' if any(r['success'] and 'Database Storage' in r['test'] for r in self.test_results) else '❌ Not working'}")
        print(f"- Validation rules: {'✅ Working' if any(r['success'] and 'Validation' in r['test'] for r in self.test_results) else '❌ Not working'}")
        print(f"- Professional role creation: {'✅ Working' if any(r['success'] and 'Professional Role' in r['test'] for r in self.test_results) else '❌ Not working'}")
        print(f"- Response format: {'✅ Working' if any(r['success'] and 'Response Format' in r['test'] for r in self.test_results) else '❌ Not working'}")

if __name__ == "__main__":
    async def main():
        tester = CompanyRegistrationTester()
        await tester.run_complete_test_suite()
    
    asyncio.run(main())