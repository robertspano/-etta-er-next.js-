'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../contexts/TranslationsContext';
import { Home, DoorOpen, Shield, Plus, Droplets, Building2, Wrench, Zap, Building, Warehouse } from 'lucide-react';

const MajorProjectsPage = () => {
  const { translations } = useTranslations();
  const router = useRouter();

  const categories = [
    { 
      key: 'fullRenovation', 
      icon: <Home className="w-full h-full" strokeWidth={1.5} />, 
      translation: translations.xlFullRenovation 
    },
    { 
      key: 'windowsDoors', 
      icon: <DoorOpen className="w-full h-full" strokeWidth={1.5} />, 
      translation: translations.xlWindowsDoors 
    },
    { 
      key: 'facade', 
      icon: <Shield className="w-full h-full" strokeWidth={1.5} />, 
      translation: translations.xlFacade 
    },
    { 
      key: 'extensions', 
      icon: <Plus className="w-full h-full" strokeWidth={1.5} />, 
      translation: translations.xlExtensions 
    },
    { 
      key: 'bathroom', 
      icon: <Droplets className="w-full h-full" strokeWidth={1.5} />, 
      translation: translations.xlBathroom 
    },
    { 
      key: 'loft', 
      icon: <Building2 className="w-full h-full" strokeWidth={1.5} />, 
      translation: translations.xlLoft 
    },
    { 
      key: 'partialRenovation', 
      icon: <Wrench className="w-full h-full" strokeWidth={1.5} />, 
      translation: translations.xlPartialRenovation 
    },
    { 
      key: 'roof', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M3 21h18"/>
          <path d="M5 21V7l8-4v18"/>
          <path d="M19 21V7l-8-4"/>
        </svg>
      ), 
      translation: translations.xlRoof 
    },
    { 
      key: 'housingAssociations', 
      icon: <Building className="w-full h-full" strokeWidth={1.5} />, 
      translation: translations.xlHousingAssociations 
    },
    { 
      key: 'basement', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M3 12h18m-9 4.5V7.5M7.5 21v-9l4.5-4.5 4.5 4.5v9"/>
        </svg>
      ), 
      translation: translations.xlBasement 
    },
    { 
      key: 'garage', 
      icon: <Warehouse className="w-full h-full" strokeWidth={1.5} />, 
      translation: translations.xlGarage 
    },
    { 
      key: 'otherCategories', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"/>
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
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 flex items-center justify-center">
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
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {translations.xlNote}{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              {translations.xlLearnMore}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MajorProjectsPage;