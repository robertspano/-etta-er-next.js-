'use client';

import React, { useState } from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';

const ComplaintFormPage = () => {
  const { language, translations } = useTranslations();
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const complaintOptions = [
    {
      key: 'company',
      label: language === 'is' ? 'Ég vil kvarta yfir fyrirtæki' : 'I want to complain about a company'
    },
    {
      key: 'customer',
      label: language === 'is' ? 'Ég vil kvarta yfir viðskiptavin' : 'I want to complain about a customer'
    },
    {
      key: 'other',
      label: language === 'is' ? 'Annað' : 'Other'
    }
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option.label);
    setDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (selectedOption && currentStep === 1) {
      // Trigger animation to step 2
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(2);
        setIsAnimating(false);
      }, 300);
    } else if (email && currentStep === 2) {
      // Handle step 2 submission
      console.log('Email submitted:', email);
      // Navigate to next step or complete complaint
    }
  };

  const handleEmailSubmit = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      {/* Logo in top left corner */}
      <div className="absolute top-6 left-6 z-10">
        <img 
          src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg"
          alt="verki Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Step 1 - Question about complaint */}
      <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-transform duration-300 ${
        currentStep === 2 ? '-translate-y-full' : 'translate-y-0'
      } ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
        <div className="text-left max-w-2xl">
          
          {/* Question Title with Step Number */}
          <h1 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-8 leading-relaxed">
            <span className="text-blue-600 mr-2">1→</span>
            {language === 'is' 
              ? 'Hvað snýst kvörtunin um?' 
              : 'What is the complaint about?'}
          </h1>

          {/* Required field indicator */}
          <p className="text-gray-600 mb-6">*</p>

          {/* Custom Dropdown */}
          <div className="relative mb-8">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full max-w-lg bg-white border border-gray-300 rounded px-4 py-3 text-left text-gray-600 hover:border-blue-500 focus:border-blue-500 focus:outline-none flex justify-between items-center"
            >
              <span className={selectedOption ? 'text-gray-800' : 'text-gray-400'}>
                {selectedOption || (language === 'is' ? 'Veldu svar af listanum' : 'Choose an answer from the list')}
              </span>
              <svg 
                className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Options */}
            {dropdownOpen && (
              <div className="absolute z-10 w-full max-w-lg mt-1 bg-white border border-gray-300 rounded shadow-lg">
                {complaintOptions.map((option, index) => (
                  <button
                    key={option.key}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${
                      index !== complaintOptions.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <span className="text-gray-800">{option.label}</span>
                  </button>
                ))}
                <div className="border-t-2 border-dotted border-blue-400 mt-2"></div>
              </div>
            )}
          </div>

          {/* Submit Button - Left aligned within centered block */}
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`px-8 py-3 rounded font-medium transition-colors duration-200 ${
              selectedOption 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            OK
          </button>

        </div>
      </div>

      {/* Step 2 - Email Question */}
      <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-transform duration-300 ${
        currentStep === 2 ? 'translate-y-0' : 'translate-y-full'
      } ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
        <div className="text-left max-w-2xl">
          
          {/* Email Question Title with Step Number */}
          <h1 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-8 leading-relaxed">
            <span className="text-blue-600 mr-2">2→</span>
            {language === 'is' 
              ? 'Hvað er netfangið þitt?' 
              : 'What is your email address?'}
          </h1>

          {/* Required field indicator */}
          <p className="text-gray-600 mb-6">*</p>

          {/* Email Input */}
          <div className="mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEmailSubmit}
              placeholder={language === 'is' ? 'einhver@daemi.is' : 'someone@example.com'}
              className="w-full max-w-lg bg-white border-b-2 border-blue-500 px-0 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Submit Button with Enter instruction */}
          <button
            onClick={handleSubmit}
            disabled={!email}
            className={`px-8 py-3 rounded font-medium transition-colors duration-200 flex items-center gap-2 ${
              email 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            OK
            {email && (
              <span className="text-sm opacity-75">
                {language === 'is' ? 'þrykk Enter ↵' : 'press Enter ↵'}
              </span>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ComplaintFormPage;