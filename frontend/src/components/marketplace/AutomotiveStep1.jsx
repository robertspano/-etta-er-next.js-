import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
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
  const [countryCode, setCountryCode] = useState(formData.plateCountry || 'IS');
  const [showHelp, setShowHelp] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Format license plate input
  const formatLicensePlate = (input) => {
    // Remove spaces, dashes, and convert to uppercase
    return input.replace(/[\s-]/g, '').toUpperCase();
  };

  // Validate license plate
  const validateLicensePlate = (plate) => {
    if (!plate) return false;
    // Must be 2-8 alphanumeric characters
    const regex = /^[A-Z0-9]{2,8}$/;
    return regex.test(plate);
  };

  const handlePlateChange = (e) => {
    const formatted = formatLicensePlate(e.target.value);
    setLicensePlate(formatted);
    
    if (formatted && !validateLicensePlate(formatted)) {
      setValidationError(translations.automotivePlateValidationError || 'License plate must be 2-8 alphanumeric characters');
    } else {
      setValidationError('');
    }

    // Update form data
    updateFormData('licensePlate', formatted);
  };

  const handleCountryChange = (value) => {
    setCountryCode(value);
    updateFormData('plateCountry', value);
  };

  const handleNext = () => {
    if (!validateLicensePlate(licensePlate)) {
      setValidationError(translations.automotivePlateValidationError || 'License plate must be 2-8 alphanumeric characters');
      return;
    }
    onNext();
  };

  const isValid = licensePlate && validateLicensePlate(licensePlate) && !validationError;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
        {translations.automotiveStepTitle || "Get offers from multiple workshops"}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        {translations.automotiveStepSubtitle || "Enter your vehicle details to get quotes from verified automotive professionals"}
      </p>
      
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

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          {translations.automotiveLicensePlateLabel || "License Plate"} <span className="text-red-500">*</span>
        </label>
        
        <div className="flex gap-3">
          {/* Country Selector */}
          <div className="flex-shrink-0">
            <Select value={countryCode} onValueChange={handleCountryChange}>
              <SelectTrigger className="w-20 h-12 bg-gray-50">
                <SelectValue>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">{countryCode}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IS">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">🇮🇸</span>
                    <span>IS</span>
                  </div>
                </SelectItem>
                <SelectItem value="NO">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">🇳🇴</span>
                    <span>NO</span>
                  </div>
                </SelectItem>
                <SelectItem value="DK">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">🇩🇰</span>
                    <span>DK</span>
                  </div>
                </SelectItem>
                <SelectItem value="SE">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">🇸🇪</span>
                    <span>SE</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* License Plate Input */}
          <div className="flex-1">
            <Input
              value={licensePlate}
              onChange={handlePlateChange}
              placeholder="AB12345"
              className={`h-12 text-lg font-mono tracking-wide ${validationError ? 'border-red-500' : ''}`}
              maxLength={8}
              style={{ textTransform: 'uppercase' }}
            />
          </div>
        </div>

        {/* Validation Error */}
        {validationError && (
          <p className="text-sm text-red-600 mt-1">{validationError}</p>
        )}

        {/* Help Link */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            {translations.automotiveWhyLicensePlate || "Why do we need this?"}
          </button>
        </div>

        {/* Help Modal/Tooltip */}
        {showHelp && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p>
              {translations.automotiveHelpText || 
                "We use your license plate to identify your vehicle's make, model, and year. This helps us connect you with workshops that specialize in your specific vehicle type and provide more accurate quotes."
              }
            </p>
          </div>
        )}
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