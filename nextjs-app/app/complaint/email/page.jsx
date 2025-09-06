'use client';

import React, { useState } from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';

const ComplaintEmailPage = () => {
  const { language, translations } = useTranslations();
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      // Navigate to details step
      window.location.href = '/complaint/details';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && email) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Logo in top left corner */}
      <div className="absolute top-6 left-6">
        <img 
          src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg"
          alt="verki Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Main Email Form Content - Text block centered on page but text left-aligned */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
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

          {/* Email Input with underline style */}
          <div className="mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'is' ? 'einhver@daemi.is' : 'someone@example.com'}
              className="w-full max-w-lg bg-transparent border-0 border-b-2 border-blue-500 px-0 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-transparent"
              autoFocus
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

export default ComplaintEmailPage;