'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';

const ComplaintPage = () => {
  const { language, translations } = useTranslations();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 3 seconds, then show main content
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    // Loading Screen - Only gray background and logo
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <img 
            src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg"
            alt="verki Logo"
            className="h-16 w-auto mx-auto mb-4"
          />
          <div className="w-32 h-1 bg-gray-300 rounded mx-auto overflow-hidden">
            <div className="h-1 bg-blue-600 rounded animate-loading-bar" style={{ width: '30%' }}></div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes loading-bar {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(400%);
            }
          }
          
          .animate-loading-bar {
            animation: loading-bar 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Main Complaint Form Page - Only gray background and content
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Logo in top right corner */}
      <div className="absolute top-6 right-6">
        <img 
          src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg"
          alt="verki Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-left max-w-2xl">
          
          {/* Main Title */}
          <h1 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-8 leading-relaxed">
            {language === 'is' 
              ? 'Við biðjumst afsökunar á því að þú hafir upplifað óþægilega reynslu á verki, og þökkum þér að hafa samband við okkur.'
              : 'We apologize that you have had an unpleasant experience on verki, and appreciate that you contact us.'}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-12">
            {language === 'is'
              ? 'Í þessu formi munum við biðja þig um að deila nokkrum smáatriðum um atburðinn.'
              : 'In this form we will ask you to share some details about the incident.'}
          </p>

          {/* Start Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-8 py-4 rounded transition-colors duration-200">
            {language === 'is' ? 'Byrja' : 'Start'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;