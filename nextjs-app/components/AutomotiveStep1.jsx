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
  const [showHelp, setShowHelp] = useState(false);

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
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://byggja-verki.preview.emergentagent.com';
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
        {/* Progress indicators with labels - Mittanbud style */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white text-sm font-medium">
                1
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium">
                2
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium">
                3
              </div>
            </div>
          </div>
          
          {/* Step labels */}
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
            <span className="text-blue-600 font-medium">
              {language === 'is' ? 'Um verkefnið' : 'About the job'}
            </span>
            <span className="mx-2">•</span>
            <span>{language === 'is' ? 'Samskiptaupplýsingar' : 'Contact info'}</span>
            <span className="mx-2">•</span>
            <span>{language === 'is' ? 'Fullkomnað' : 'Complete'}</span>
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
            
            {/* Icelandic License Plate Input */}
            <div className="flex justify-center mb-6">
              <div className="relative max-w-md mx-auto">
                {/* License plate container */}
                <div className="relative h-14 sm:h-16 rounded-lg shadow-sm" style={{borderColor: '#3B5CCC', borderWidth: '2px'}}>
                  {/* Left flag box - fixed width blue cube */}
                  <div className="absolute left-0 top-0 h-full flex flex-col items-center justify-center text-white font-bold" style={{width: '80px', backgroundColor: '#3B5CCC', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem'}}>
                    {/* Icelandic flag */}
                    <div className="w-8 h-5 mb-1 relative border border-white/20 overflow-hidden">
                      {/* Blue background */}
                      <div className="w-full h-full bg-blue-600"></div>
                      
                      {/* White cross - vertical */}
                      <div className="absolute top-0 left-2.5 w-1 h-full bg-white"></div>
                      
                      {/* White cross - horizontal */}
                      <div className="absolute top-1.5 left-0 w-full h-1 bg-white"></div>
                      
                      {/* Red cross - vertical (narrower, centered) */}
                      <div className="absolute top-0 left-2.5 w-0.5 h-full bg-red-600" style={{left: '11px'}}></div>
                      
                      {/* Red cross - horizontal (narrower, centered) */}
                      <div className="absolute left-0 w-full h-0.5 bg-red-600" style={{top: '9px'}}></div>
                    </div>
                    
                    {/* IS text */}
                    <div className="text-xs font-bold">IS</div>
                  </div>
                  
                  {/* License plate input */}
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={handlePlateChange}
                    onPaste={handlePaste}
                    placeholder="AB12345"
                    aria-label="Bílnúmer"
                    aria-invalid={!!validationError}
                    className={`
                      w-full h-full bg-white rounded-lg text-center text-2xl sm:text-3xl font-semibold 
                      tracking-widest uppercase border-0 outline-none pl-24 pr-4
                      focus:ring-2 focus:ring-sky-500/40
                      ${validationError ? 'text-red-600' : 'text-gray-900'}
                    `}
                    style={{
                      borderColor: validationError ? '#EF4444' : '#3B5CCC',
                      borderWidth: '2px',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                    maxLength={7}
                  />
                </div>
                
                {/* Error message */}
                {validationError && (
                  <div className="mt-2 text-sm text-red-600 text-center">
                    {validationError}
                  </div>
                )}
              </div>
            </div>

            {/* Continue button */}
            <button
              onClick={handleNext}
              disabled={!isValid}
              className={`px-6 py-2 rounded font-medium mb-4 transition-colors ${
                isValid 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {!licensePlate ? (language === 'is' ? 'Villa er nauðsynleg' : 'Error is required') : (language === 'is' ? 'Halda áfram' : 'Continue')}
            </button>

            {/* Help text link */}
            <div className="text-center">
              <button 
                onClick={() => setShowHelp(!showHelp)}
                className="text-blue-600 hover:text-blue-700 text-sm underline"
              >
                {language === 'is' ? 'Af hverju þurfum við þetta?' : 'Why do we need this?'}
              </button>
            </div>
            
            {/* Help text expansion */}
            {showHelp && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                {language === 'is' 
                  ? 'Við notum bílnúmerið til að finna upplýsingar um bílinn þinn svo verkstæði geti gefið nákvæmari tilboð.' 
                  : 'We use the license plate to find information about your vehicle so workshops can provide more accurate quotes.'
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomotiveStep1;