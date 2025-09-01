#!/usr/bin/env python3
"""
Script to update verki@verki.is user with proper name and verify all requirements
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import bcrypt

# Database configuration
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "test_database"

async def update_verki_user():
    """Update verki@verki.is user with proper name"""
    print("🔧 Updating verki@verki.is user record...")
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    users_collection = db.users
    
    try:
        # Find the user
        user = await users_collection.find_one({"email": "verki@verki.is"})
        
        if not user:
            print("❌ User verki@verki.is not found in database")
            return False
        
        print(f"✅ Found user: {user['email']}")
        print(f"   Current role: {user.get('role', 'N/A')}")
        print(f"   Current name: {user.get('profile', {}).get('first_name', 'N/A')}")
        print(f"   Has password: {'Yes' if user.get('hashed_password') else 'No'}")
        
        # Update the user with proper name and ensure role is customer
        update_data = {
            "role": "customer",
            "profile.first_name": "Róbert",
            "profile.last_name": "Verki",
            "updated_at": datetime.utcnow()
        }
        
        # Ensure password is properly hashed if not already
        if not user.get('hashed_password'):
            password = "Lindarbraut31"
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            update_data["hashed_password"] = hashed_password
            print("   Setting hashed password...")
        
        # Update the user
        result = await users_collection.update_one(
            {"email": "verki@verki.is"},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            print("✅ User updated successfully!")
            
            # Verify the update
            updated_user = await users_collection.find_one({"email": "verki@verki.is"})
            print(f"   Updated role: {updated_user.get('role')}")
            print(f"   Updated name: {updated_user.get('profile', {}).get('first_name')}")
            print(f"   Has password: {'Yes' if updated_user.get('hashed_password') else 'No'}")
            
            return True
        else:
            print("❌ No changes made to user record")
            return False
            
    except Exception as e:
        print(f"❌ Error updating user: {str(e)}")
        return False
    finally:
        client.close()

async def verify_user_in_database():
    """Verify the user exists and has correct data"""
    print("\n🔍 Verifying user in database...")
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    users_collection = db.users
    
    try:
        # Find the user
        user = await users_collection.find_one({"email": "verki@verki.is"})
        
        if not user:
            print("❌ User verki@verki.is not found in database")
            return False
        
        print("✅ User verification results:")
        print(f"   Email: {user['email']}")
        print(f"   Role: {user.get('role')}")
        print(f"   First Name: {user.get('profile', {}).get('first_name')}")
        print(f"   Last Name: {user.get('profile', {}).get('last_name')}")
        print(f"   Has Password: {'Yes' if user.get('hashed_password') else 'No'}")
        print(f"   Is Active: {user.get('is_active', False)}")
        print(f"   Is Verified: {user.get('is_verified', False)}")
        print(f"   Created At: {user.get('created_at')}")
        print(f"   Updated At: {user.get('updated_at')}")
        
        # Check requirements
        requirements_met = True
        
        if user.get('role') != 'customer':
            print("❌ Role is not 'customer'")
            requirements_met = False
        else:
            print("✅ Role is 'customer' as required")
        
        if user.get('profile', {}).get('first_name') != 'Róbert':
            print("❌ First name is not 'Róbert'")
            requirements_met = False
        else:
            print("✅ First name is 'Róbert' as required")
        
        if not user.get('hashed_password'):
            print("❌ No hashed password found")
            requirements_met = False
        else:
            print("✅ Hashed password exists")
        
        return requirements_met
        
    except Exception as e:
        print(f"❌ Error verifying user: {str(e)}")
        return False
    finally:
        client.close()

async def main():
    """Main function"""
    print("🚀 Starting verki@verki.is User Database Update")
    
    # Update the user
    success = await update_verki_user()
    
    if success:
        # Verify the changes
        await verify_user_in_database()
    
    print("\n✅ Database update completed!")

if __name__ == "__main__":
    asyncio.run(main())