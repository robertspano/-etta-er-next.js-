'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, HelpCircle } from 'lucide-react';

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
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://craft-connect-11.preview.emergentagent.com';
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

  const handleNext = () => {
    if (isValid) {
      // Store data and navigate to next step
      localStorage.setItem('bc_automotive_plate', licensePlate);
      localStorage.setItem('bc_automotive_country', countryCode);
      if (vehicleInfo) {
        localStorage.setItem('bc_automotive_vehicle', JSON.stringify(vehicleInfo));
      }
      router.push('/post/automotive/contact');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4" />
              {language === 'is' ? 'Til baka' : 'Back'}
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {language === 'is' ? 'Leggja inn verkefni' : 'Post project'}
              </h1>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Bílar' : 'Automotive'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
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

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Heading matching Mittanbud exactly */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {translations.mittanbudAutomotiveTitle || (language === 'is' ? 'Fá tilboð frá fleiri bílaverkstæðum' : 'Get quotes from multiple workshops')}
            </h2>
            <p className="text-gray-600 text-base">
              {translations.mittanbudAutomotiveSubtitle || (language === 'is' ? 'Leggðu inn bílnúmer svo við getum veitt þér viðeigandi tilboð' : 'Enter your vehicle registration to get relevant quotes')}
            </p>
          </div>
          
          {/* License plate input section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {translations.mittanbudLicensePlateLabel || (language === 'is' ? 'Skráningarmerki' : 'License Plate')} <span className="text-red-500">*</span>
              </label>
              
              {/* License plate component matching Mittanbud layout */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm" style={{width: '280px', height: '60px'}}>
                  {/* IS flag section - left side */}
                  <div className="flex items-center bg-blue-600 text-white px-3 h-full" style={{width: '60px'}}>
                    <div className="text-center">
                      <div className="text-white text-xs font-bold">🇮🇸</div>
                      <div className="text-white text-xs font-bold mt-1">IS</div>
                    </div>
                  </div>
                  
                  {/* License plate input - right side */}
                  <div className="flex-1 h-full">
                    <input
                      type="text"
                      value={licensePlate}
                      onChange={handlePlateChange}
                      onPaste={handlePaste}
                      placeholder="AB12345"
                      className="w-full h-full px-4 text-2xl font-mono font-bold text-gray-900 bg-white border-0 focus:outline-none focus:ring-0 text-center tracking-wider"
                      maxLength={8}
                      style={{ 
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Validation error */}
              {validationError && (
                <p className="text-sm text-red-600 text-center mt-2">{validationError}</p>
              )}

              {/* Vehicle info display if lookup successful */}
              {vehicleInfo && vehicleInfo.found && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                  <p className="text-green-800 text-sm font-medium">
                    ✓ {language === 'is' ? 'Ökutæki fundið' : 'Vehicle found'}: {vehicleInfo.make} {vehicleInfo.model} ({vehicleInfo.year})
                  </p>
                </div>
              )}

              {/* Help link */}
              <div className="flex items-center justify-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors underline"
                >
                  <HelpCircle className="h-4 w-4" />
                  {translations.mittanbudWhyNeedPlate || (language === 'is' ? 'Hvers vegna þurfum við þetta?' : 'Why do we need this?')}
                </button>
              </div>

              {/* Help text */}
              {showHelp && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3 text-sm text-blue-800">
                  <p>
                    {translations.mittanbudPlateHelpText || (language === 'is' 
                      ? 'Við notum skráningarmerki bílsins þíns til að finna upplýsingar um tegund og gerð og geta þannig tengt þig við viðeigandi verkstæði og fengið betri tilboð.'
                      : 'We use your vehicle\'s registration number to find information about the type and model and can thus connect you with appropriate workshops and get better quotes.'
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Link
              href="/"
              className="px-6 py-2 text-gray-600 hover:text-gray-700"
            >
              {language === 'is' ? 'Til baka' : 'Back'}
            </Link>
            
            <button
              onClick={handleNext}
              disabled={!isValid || lookupLoading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {lookupLoading ? (language === 'is' ? 'Hleður...' : 'Loading...') : (language === 'is' ? 'Næsta' : 'Next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomotiveStep1;