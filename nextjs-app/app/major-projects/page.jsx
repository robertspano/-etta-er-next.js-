'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../contexts/TranslationsContext';

const MajorProjectsPage = () => {
  const { translations } = useTranslations();
  const router = useRouter();

  const categories = [
    { 
      key: 'fullRenovation', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ), 
      translation: translations.xlFullRenovation 
    },
    { 
      key: 'windowsDoors', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M2 3h20v18H2V3zm2 2v14h16V5H4zm2 2h12v10H6V7zm2 2v6h8V9H8z"/>
        </svg>
      ), 
      translation: translations.xlWindowsDoors 
    },
    { 
      key: 'facade', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.34-.21 2.61-.63 3.78-1.25C19.16 24.65 22 21.05 22 17V7l-10-5zM12 4.15L20 8.18v8.82c0 3.26-2.18 6.34-5 7.14V12h-6v12.14c-2.82-.8-5-3.88-5-7.14V8.18L12 4.15z"/>
        </svg>
      ), 
      translation: translations.xlFacade 
    },
    { 
      key: 'extensions', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ), 
      translation: translations.xlExtensions 
    },
    { 
      key: 'bathroom', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M7 7h10v2H7V7zM7 11h10v8c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-8zm2 2v4h6v-4H9z"/>
        </svg>
      ), 
      translation: translations.xlBathroom 
    },
    { 
      key: 'loft', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5zm2-8h0v6h0v-6z"/>
        </svg>
      ), 
      translation: translations.xlLoft 
    },
    { 
      key: 'partialRenovation', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ), 
      translation: translations.xlPartialRenovation 
    },
    { 
      key: 'roof', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.84L18.16 12H16v6H8v-6H5.84L12 5.84z"/>
        </svg>
      ), 
      translation: translations.xlRoof 
    },
    { 
      key: 'housingAssociations', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M1 11h6V9H1v2zm0 4h6v-2H1v2zm0 4h6v-2H1v2zm8-8h14V9H9v2zm0 4h14v-2H9v2zm0 4h14v-2H9v2zM1 3v4h20V3H1z"/>
        </svg>
      ), 
      translation: translations.xlHousingAssociations 
    },
    { 
      key: 'basement', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h-2v2h2v-2zm0-8h-2v6h2V8z"/>
        </svg>
      ), 
      translation: translations.xlBasement 
    },
    { 
      key: 'garage', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M19 11h-8v2h8v-2zm0 4h-8v2h8v-2zm0-8H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/>
        </svg>
      ), 
      translation: translations.xlGarage 
    },
    { 
      key: 'otherCategories', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
        </svg>
      ), 
      translation: translations.xlOtherCategories 
    }
  ];

  const handleCategoryClick = (category) => {
    router.push(`/major-projects/start?category=${category.key}`);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center pt-20"
    >
      
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          {translations.xlHeadline}
        </h1>
        
        {/* Subtitle with highlighted text */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-8">
          {translations.xlHeadlineEmphasis}
        </h2>
        
        {/* Subtitle description */}
        <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
          {translations.xlSubtitle}
        </p>

        {/* Categories Grid - Same style as hero section */}
        <div className="inline-block bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Row 1 - 4 categories */}
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {categories.slice(0, 4).map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Fixed size, same style as hero */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - Fixed height with text wrapping */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                  {category.translation}
                </span>
              </button>
            ))}
          </div>
          
          {/* Row 2 - 4 categories */}
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {categories.slice(4, 8).map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Fixed size, same style as hero */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - Fixed height with text wrapping */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                  {category.translation}
                </span>
              </button>
            ))}
          </div>
          
          {/* Row 3 - 4 categories */}
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {categories.slice(8, 12).map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Fixed size, same style as hero */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - Fixed height with text wrapping */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                  {category.translation}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
            {translations.xlNote}{' '}
            <a href="#" className="text-pacific_cyan hover:text-white underline">
              {translations.xlLearnMore}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MajorProjectsPage;