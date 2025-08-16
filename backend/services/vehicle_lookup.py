from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
import httpx
import asyncio
from datetime import datetime, timedelta
import json
import hashlib

class VehicleLookupProvider(ABC):
    """Abstract base class for vehicle lookup providers"""
    
    @abstractmethod
    async def lookup_vehicle(self, plate: str, country: str) -> Dict[str, Any]:
        """
        Lookup vehicle information by license plate
        
        Returns:
            {
                "found": bool,
                "make": str (optional),
                "model": str (optional),
                "year": int (optional),
                "vin": str (optional),
                "color": str (optional),
                "error": str (optional)
            }
        """
        pass


class IcelandSamgongustofaProvider(VehicleLookupProvider):
    """Iceland vehicle registry lookup provider"""
    
    def __init__(self):
        # In-memory cache for demo (in production, use Redis)
        self._cache = {}
        self._cache_ttl = timedelta(hours=24)
        
        # Rate limiting storage (in production, use Redis)
        self._rate_limits = {}
        self._rate_limit_window = timedelta(minutes=1)
        self._rate_limit_max = 10
    
    def _get_cache_key(self, plate: str, country: str) -> str:
        """Generate cache key for plate lookup"""
        return hashlib.md5(f"{country}:{plate}".encode()).hexdigest()
    
    def _is_cached(self, cache_key: str) -> bool:
        """Check if result is cached and not expired"""
        if cache_key not in self._cache:
            return False
        
        cached_time, _ = self._cache[cache_key]
        return datetime.now() - cached_time < self._cache_ttl
    
    def _get_cached(self, cache_key: str) -> Optional[Dict[str, Any]]:
        """Get cached result if available"""
        if self._is_cached(cache_key):
            _, result = self._cache[cache_key]
            return result
        return None
    
    def _set_cache(self, cache_key: str, result: Dict[str, Any]):
        """Cache the lookup result"""
        self._cache[cache_key] = (datetime.now(), result)
    
    def _check_rate_limit(self, ip: str) -> bool:
        """Check if IP is within rate limits"""
        now = datetime.now()
        
        if ip not in self._rate_limits:
            self._rate_limits[ip] = []
        
        # Clean old requests
        self._rate_limits[ip] = [
            req_time for req_time in self._rate_limits[ip]
            if now - req_time < self._rate_limit_window
        ]
        
        # Check limit
        if len(self._rate_limits[ip]) >= self._rate_limit_max:
            return False
        
        # Add current request
        self._rate_limits[ip].append(now)
        return True
    
    async def lookup_vehicle(self, plate: str, country: str) -> Dict[str, Any]:
        """
        Lookup vehicle in Iceland's Samgöngustofa registry
        
        Note: This is a stub implementation as the actual API would require
        proper authentication and legal agreements with Samgöngustofa.
        """
        
        # Validate input
        if not plate or len(plate) < 2 or len(plate) > 8:
            return {"found": False, "error": "Invalid license plate format"}
        
        if country != "IS":
            return {"found": False, "error": "Only Iceland (IS) is supported"}
        
        # Check cache first
        cache_key = self._get_cache_key(plate, country)
        cached_result = self._get_cached(cache_key)
        if cached_result:
            return cached_result
        
        # For demo purposes, simulate some known vehicles
        # In production, this would call the actual Samgöngustofa API
        demo_vehicles = {
            "ABC123": {
                "found": True,
                "make": "Toyota",
                "model": "Corolla",
                "year": 2019,
                "color": "Hvítur",
                "vin": "JT***************"  # Partially hidden for privacy
            },
            "XYZ789": {
                "found": True,
                "make": "Volkswagen", 
                "model": "Golf",
                "year": 2021,
                "color": "Blár",
                "vin": "WVW**************"
            },
            "TEST123": {
                "found": True,
                "make": "Tesla",
                "model": "Model 3",
                "year": 2022,
                "color": "Svartur",
                "vin": "5YJ**************"
            }
        }
        
        # Simulate API delay
        await asyncio.sleep(0.5)
        
        # Check if vehicle exists in our demo data
        result = demo_vehicles.get(plate.upper(), {"found": False})
        
        # Cache the result
        self._set_cache(cache_key, result)
        
        return result
    
    def check_rate_limit(self, ip: str) -> bool:
        """Public method to check rate limits"""
        return self._check_rate_limit(ip)


# Global instance
vehicle_lookup_provider = IcelandSamgongustofaProvider()