'use client';

import React, { useEffect } from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';
import { CheckCircle } from 'lucide-react';

const ComplaintSuccessPage = () => {
  const { language, translations } = useTranslations();

  // Auto-redirect to homepage after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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

      {/* Main Success Content - Text block centered on page */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl w-full">
          
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Title */}
          <h1 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-6 leading-relaxed">
            {language === 'is' 
              ? 'Takk fyrir endurgjöfina!' 
              : 'Takk for tilbakemeldingen!'}
          </h1>

          {/* Success Subtitle */}
          <p className="text-lg text-gray-600 mb-8">
            {language === 'is'
              ? 'Við metum málið og höldum þér upplýstum.'
              : 'Vi vurderer saken og holder deg oppdatert.'}
          </p>

          {/* Auto-redirect notification */}
          <p className="text-sm text-gray-500">
            {language === 'is'
              ? 'Þú verður vísað á aðalsíðuna eftir nokkrar sekúndur...'
              : 'Du blir omdirigert til hovedsiden om noen sekunder...'}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ComplaintSuccessPage;