'use client';

import React, { useState } from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';

const ComplaintDetailsPage = () => {
  const { language, translations } = useTranslations();
  const [complaint, setComplaint] = useState('');

  const handleSubmit = () => {
    if (complaint.trim()) {
      // Navigate to step 4 - file upload
      window.location.href = '/complaint/upload';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && complaint.trim()) {
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

      {/* Main Details Form Content - Text block centered on page but text left-aligned */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl w-full">
          
          {/* Details Question Title with Step Number */}
          <h1 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-8 leading-relaxed">
            <span className="text-blue-600 mr-2">3→</span>
            {language === 'is' 
              ? 'Hvað snýst kvörtunin um?' 
              : 'What is the complaint about?'}
          </h1>

          {/* Required field indicator */}
          <p className="text-gray-600 mb-6">*</p>

          {/* Instruction text */}
          <p className="text-gray-600 mb-6">
            {language === 'is'
              ? 'Vinsamlegast skrifaðu eins miklar upplýsingar og mögulegt er um málið þitt:'
              : 'Please write as much information as possible about your case:'}
          </p>

          {/* Large textarea for complaint details */}
          <div className="mb-8">
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'is' ? 'skrifaðu svarið hér...' : 'write your answer here...'}
              className="w-full h-48 bg-transparent border-0 border-b-2 border-blue-500 px-0 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-transparent resize-none"
              autoFocus
            />
          </div>

          {/* Submit Button with Enter instruction */}
          <button
            onClick={handleSubmit}
            disabled={!complaint.trim()}
            className={`px-8 py-3 rounded font-medium transition-colors duration-200 flex items-center gap-2 ${
              complaint.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            OK
            {complaint.trim() && (
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

export default ComplaintDetailsPage;