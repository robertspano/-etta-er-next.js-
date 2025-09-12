#!/usr/bin/env python3
"""
Test script specifically for verki@verki.is password login functionality
"""

import asyncio
import aiohttp
import json

BACKEND_URL = "https://icebuild-platform.preview.emergentagent.com/api"

async def test_verki_password_login():
    """Test password login functionality for verki@verki.is"""
    print("🔐 Testing Password Login for verki@verki.is")
    print("=" * 50)
    
    async with aiohttp.ClientSession() as session:
        
        # Test 1: Password login with correct credentials
        print("\n1. Testing password login with 'Lindarbraut31'...")
        login_data = {
            'username': 'verki@verki.is',
            'password': 'Lindarbraut31'
        }
        
        async with session.post(
            f"{BACKEND_URL}/auth/cookie/login",
            data=login_data,
            headers={'Content-Type': 'application/x-www-form-urlencoded'}
        ) as response:
            if response.status == 204:
                print("✅ Password login successful!")
                cookies = response.cookies
                if 'buildconnect_auth' in cookies:
                    auth_cookie = cookies['buildconnect_auth'].value
                    print("✅ Authentication cookie received")
                    
                    # Test 2: Get user data with session
                    print("\n2. Testing user data retrieval...")
                    async with session.get(
                        f"{BACKEND_URL}/auth/me",
                        cookies={'buildconnect_auth': auth_cookie}
                    ) as me_response:
                        if me_response.status == 200:
                            user_data = await me_response.json()
                            print("✅ User data retrieved successfully:")
                            print(f"   - Email: {user_data.get('email')}")
                            print(f"   - Role: {user_data.get('role')}")
                            print(f"   - Active: {user_data.get('is_active')}")
                            print(f"   - Verified: {user_data.get('is_verified')}")
                            print(f"   - Language: {user_data.get('language')}")
                        else:
                            print(f"❌ Failed to get user data: {me_response.status}")
                    
                    # Test 3: Test logout
                    print("\n3. Testing logout...")
                    async with session.post(
                        f"{BACKEND_URL}/auth/cookie/logout",
                        cookies={'buildconnect_auth': auth_cookie}
                    ) as logout_response:
                        if logout_response.status == 204:
                            print("✅ Logout successful")
                        else:
                            print(f"❌ Logout failed: {logout_response.status}")
                else:
                    print("❌ No authentication cookie received")
            else:
                try:
                    error_data = await response.json()
                    print(f"❌ Password login failed: {error_data}")
                except:
                    error_text = await response.text()
                    print(f"❌ Password login failed: {error_text}")
        
        # Test 4: Test with wrong password
        print("\n4. Testing with wrong password...")
        wrong_login_data = {
            'username': 'verki@verki.is',
            'password': 'wrongpassword'
        }
        
        async with session.post(
            f"{BACKEND_URL}/auth/cookie/login",
            data=wrong_login_data,
            headers={'Content-Type': 'application/x-www-form-urlencoded'}
        ) as response:
            if response.status == 400:
                print("✅ Wrong password correctly rejected")
            else:
                print(f"❌ Unexpected response for wrong password: {response.status}")
        
        # Test 5: Test passwordless login still works
        print("\n5. Testing passwordless login still works...")
        async with session.post(
            f"{BACKEND_URL}/auth/send-login-link",
            json={'email': 'verki@verki.is'},
            headers={'Content-Type': 'application/json'}
        ) as response:
            if response.status == 200:
                data = await response.json()
                if data.get('email') == 'verki@verki.is':
                    print("✅ Passwordless login code sent successfully")
                else:
                    print("❌ Passwordless login response invalid")
            else:
                print(f"❌ Passwordless login failed: {response.status}")

if __name__ == "__main__":
    asyncio.run(test_verki_password_login())