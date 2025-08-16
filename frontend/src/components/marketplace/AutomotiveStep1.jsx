import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { HelpCircle } from 'lucide-react';

const AutomotiveStep1 = ({ 
  formData, 
  updateFormData, 
  translations, 
  language,
  onNext, 
  loading,
  error 
}) => {
  const [licensePlate, setLicensePlate] = useState(formData.licensePlate || '');
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
      setValidationError(translations.automotivePlateValidationError || 'Skráningarmerki verður að vera 2-8 stafir eða tölur');
    } else {
      setValidationError('');
    }

    // Update form data
    updateFormData('licensePlate', limited);
    updateFormData('plateCountry', 'IS');
  };

  // Handle paste events to clean input
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    const cleaned = cleanLicensePlate(paste).slice(0, 8);
    setLicensePlate(cleaned);
    updateFormData('licensePlate', cleaned);
  };

  // Vehicle lookup function
  const lookupVehicle = async (plate) => {
    if (!plate || !validateLicensePlate(plate)) return null;
    
    setLookupLoading(true);
    try {
      const response = await fetch(`http://localhost:8001/api/public/vehicle-lookup?plate=${plate}&country=IS`);
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
          updateFormData('vehicleInfo', lookup);
        }
      };
      performLookup();
    }
  }, [isValid, licensePlate]);

  const isValid = licensePlate && validateLicensePlate(licensePlate) && !validationError;

  return (
    <div className="space-y-6">
      {/* Heading matching Mittanbud exactly */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {translations.mittanbudAutomotiveTitle || "Fá tilbud frá fleiri bilverkstæði"}
        </h2>
        <p className="text-gray-600 text-base">
          {translations.mittanbudAutomotiveSubtitle || "Leggðu inn bilnúmer svo við getum veitt þér viðeigandi tilboð"}
        </p>
      </div>
      
      {/* Category badge */}
      {formData.category && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">{translations.category}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <span className="text-blue-800 font-medium">
              {translations.automotive}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* License plate input section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {translations.mittanbudLicensePlateLabel || "Skráningarmerki"} <span className="text-red-500">*</span>
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
                ✓ Ökutæki fundið: {vehicleInfo.make} {vehicleInfo.model} ({vehicleInfo.year})
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
              {translations.mittanbudWhyNeedPlate || "Hvers vegna þurfum við þetta?"}
            </button>
          </div>

          {/* Help text */}
          {showHelp && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3 text-sm text-blue-800">
              <p>
                {translations.mittanbudPlateHelpText || 
                  "Við notum skráningarmerki bílsins þíns til að finna upplýsingar um tegund og gerð og geta þannig tengt þig við viðeigandi verkstæði og fengið betri tilboð."
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Global Error */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AutomotiveStep1;