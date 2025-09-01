#!/usr/bin/env python3
"""
Script to activate verki@verki.is user account
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

# Database configuration
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "test_database"

async def activate_verki_user():
    """Activate verki@verki.is user account"""
    print("🔧 Activating verki@verki.is user account...")
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    users_collection = db.users
    
    try:
        # Update the user to be active and verified
        result = await users_collection.update_one(
            {"email": "verki@verki.is"},
            {"$set": {
                "is_active": True,
                "is_verified": True,
                "updated_at": datetime.utcnow()
            }}
        )
        
        if result.modified_count > 0:
            print("✅ User activated successfully!")
            
            # Verify the update
            user = await users_collection.find_one({"email": "verki@verki.is"})
            print(f"   Is Active: {user.get('is_active')}")
            print(f"   Is Verified: {user.get('is_verified')}")
            
            return True
        else:
            print("❌ No changes made to user record")
            return False
            
    except Exception as e:
        print(f"❌ Error activating user: {str(e)}")
        return False
    finally:
        client.close()

async def main():
    """Main function"""
    print("🚀 Activating verki@verki.is User Account")
    await activate_verki_user()
    print("✅ Activation completed!")

if __name__ == "__main__":
    asyncio.run(main())