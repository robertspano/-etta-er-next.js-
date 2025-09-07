'use client';

import React from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';

const ComplaintSuccessPage = () => {
  const { language, translations } = useTranslations();

  const handleSubmit = () => {
    // Navigate to homepage
    window.location.href = '/';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
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

      {/* Main Success Content - Text block centered on page but text left-aligned */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl w-full">
          
          {/* Success Title */}
          <h1 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-6 leading-relaxed">
            {language === 'is' 
              ? 'Takk fyrir endurgjöfina!' 
              : 'Takk for tilbakemeldingen!'}
          </h1>

          {/* Success Subtitle */}
          <p className="text-lg text-gray-600 mb-12">
            {language === 'is'
              ? 'Við metum málið og höldum þér upplýstum.'
              : 'Vi vurderer saken og holder deg oppdatert.'}
          </p>

          {/* Submit Button with Enter instruction */}
          <button
            onClick={handleSubmit}
            onKeyDown={handleKeyDown}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded transition-colors duration-200 flex items-center gap-2 mx-auto"
            autoFocus
          >
            {language === 'is' ? 'Senda inn málið þitt' : 'Send inn saken din'}
            <span className="text-sm opacity-75">
              {language === 'is' ? 'þrykk Enter ↵' : 'Trykk Enter ↵'}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ComplaintSuccessPage;