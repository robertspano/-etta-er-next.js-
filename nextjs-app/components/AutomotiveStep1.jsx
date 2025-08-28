'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HelpCircle, Zap, Circle, Shield, Droplets } from 'lucide-react';

const AutomotiveStep1 = ({ translations, language }) => {
  const router = useRouter();
  
  const [licensePlate, setLicensePlate] = useState('');
  const [countryCode] = useState('IS'); // Fixed to Iceland
  const [showHelp, setShowHelp] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState(null);

  // Clean and format license plate input - only allow A-Z and 0-9
  const cleanLicensePlate = (input) => {
    // Remove all non-alphanumeric characters and convert to uppercase
    return input.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  };

  // Validate license plate - Iceland format
  const validateLicensePlate = (plate) => {
    if (!plate) return false;
    // Must be 2-8 alphanumeric characters
    const regex = /^[A-Z0-9]{2,8}$/;
    return regex.test(plate);
  };

  // Calculate if form is valid
  const isValid = licensePlate && validateLicensePlate(licensePlate) && !validationError;

  const handlePlateChange = (e) => {
    const cleaned = cleanLicensePlate(e.target.value);
    
    // Limit to 8 characters max
    const limited = cleaned.slice(0, 8);
    setLicensePlate(limited);
    
    if (limited && !validateLicensePlate(limited)) {
      setValidationError(translations.automotivePlateValidationError || (language === 'is' ? 'Skráningarmerki verður að vera 2-8 stafir eða tölur' : 'License plate must be 2-8 alphanumeric characters'));
    } else {
      setValidationError('');
    }
  };

  // Handle paste events to clean input
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    const cleaned = cleanLicensePlate(paste).slice(0, 8);
    setLicensePlate(cleaned);
  };

  // Vehicle lookup function
  const lookupVehicle = async (plate) => {
    if (!plate || !validateLicensePlate(plate)) return null;
    
    setLookupLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://construction-hub-19.preview.emergentagent.com';
      const response = await fetch(`${backendUrl}/api/public/vehicle-lookup?plate=${plate}&country=IS`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return { found: false };
    } catch (error) {
      console.warn('Vehicle lookup failed:', error);
      return { found: false };
    } finally {
      setLookupLoading(false);
    }
  };

  // Auto-trigger form data updates when valid plate is entered
  useEffect(() => {
    if (isValid) {
      // Perform vehicle lookup when plate becomes valid
      const performLookup = async () => {
        const lookup = await lookupVehicle(licensePlate);
        if (lookup && lookup.found) {
          setVehicleInfo(lookup);
        }
      };
      performLookup();
    }
  }, [isValid, licensePlate]);

  const handleNext = async () => {
    if (isValid) {
      try {
        // Send license plate to backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/automotive/create-job`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            license_plate: licensePlate,
            vehicle_type: vehicleInfo?.make || null,
            location: countryCode
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create automotive job');
        }

        const result = await response.json();
        
        // Store job ID and other data locally for next steps
        localStorage.setItem('bc_automotive_job_id', result.job_id);
        localStorage.setItem('bc_automotive_plate', licensePlate);
        localStorage.setItem('bc_automotive_country', countryCode);
        if (vehicleInfo) {
          localStorage.setItem('bc_automotive_vehicle', JSON.stringify(vehicleInfo));
        }

        // Navigate to step 2
        router.push('/post/automotive/contact');
      } catch (error) {
        console.error('Error creating automotive job:', error);
        // Still navigate even if backend fails (for demo purposes)
        localStorage.setItem('bc_automotive_plate', licensePlate);
        localStorage.setItem('bc_automotive_country', countryCode);
        router.push('/post/automotive/contact');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Progress bar */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white text-sm font-medium">
            1
          </div>
          <div className="w-20 h-1 mx-2 bg-gray-200"></div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 text-sm font-medium">
            2
          </div>
          <div className="w-20 h-1 mx-2 bg-gray-200"></div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 text-sm font-medium">
            3
          </div>
        </div>

        {/* Main form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* License plate input */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'is' ? 'Fá tilboð frá fleiri bílverkstæði' : 'Get quotes from multiple workshops'}
            </h2>
            <p className="text-gray-600 mb-8">
              {language === 'is' ? 'Leggðu inn bílnúmerið svo hentar við info um kjöreytið ditt fyrir þig' : 'Enter your license plate so we find info about your vehicle for you'}
            </p>
            
            {/* License plate styled like a real plate */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* License plate container */}
                <div className="bg-white border-4 border-black rounded-lg p-4 shadow-lg" style={{width: '280px', height: '100px'}}>
                  {/* Icelandic flag */}
                  <div className="absolute top-2 left-2 w-8 h-6 rounded-sm overflow-hidden">
                    <div className="w-full h-full bg-blue-600 relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
                      <div className="absolute top-2 left-0 w-full h-1 bg-red-600"></div>
                      <div className="absolute top-4 left-0 w-full h-1 bg-white"></div>
                      <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
                      <div className="absolute top-0 left-2 w-1 h-full bg-red-600"></div>
                      <div className="absolute top-0 left-4 w-1 h-full bg-white"></div>
                    </div>
                    <span className="absolute bottom-0 left-1 text-xs font-bold text-black">IS</span>
                  </div>
                  
                  {/* License plate input */}
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={handlePlateChange}
                    onPaste={handlePaste}
                    placeholder="AB12345"
                    className="w-full h-full bg-transparent border-none outline-none text-center text-3xl font-bold text-black tracking-widest mt-4"
                    maxLength={7}
                    style={{fontFamily: 'monospace'}}
                  />
                </div>
                
                {isValid && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{language === 'is' ? 'Gilt bílnúmer' : 'Valid license plate'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Continue button */}
            <button
              onClick={handleNext}
              disabled={!isValid}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium mb-4"
            >
              {language === 'is' ? 'Halda áfram' : 'Continue'}
            </button>

            {/* Help text link */}
            <div className="text-center">
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                {language === 'is' ? 'Af hverju þurfum við þetta?' : 'Why do we need this?'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomotiveStep1;