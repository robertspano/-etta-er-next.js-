import React from 'react';
import { useNavigate } from 'react-router-dom';

const XLLanding = ({ translations, language }) => {
  const navigate = useNavigate();

  const categories = [
    { key: 'fullRenovation', icon: '🏠', translation: translations.xlFullRenovation },
    { key: 'windowsDoors', icon: '🪟', translation: translations.xlWindowsDoors },
    { key: 'facade', icon: '🏢', translation: translations.xlFacade },
    { key: 'extensions', icon: '🏗️', translation: translations.xlExtensions },
    { key: 'bathroom', icon: '🛁', translation: translations.xlBathroom },
    { key: 'loft', icon: '🏠', translation: translations.xlLoft },
    { key: 'partialRenovation', icon: '🔨', translation: translations.xlPartialRenovation },
    { key: 'roof', icon: '🏘️', translation: translations.xlRoof },
    { key: 'housingAssociations', icon: '🏘️', translation: translations.xlHousingAssociations },
    { key: 'basement', icon: '⬇️', translation: translations.xlBasement },
    { key: 'garage', icon: '🚗', translation: translations.xlGarage },
    { key: 'otherCategories', icon: '📋', translation: translations.xlOtherCategories }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/xl/start?category=${category.key}`);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header Section */}
      <div className="bg-stone-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl">
            {/* Main Headline */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
              {translations.xlHeadline}{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent font-black">
                  {translations.xlHeadlineEmphasis}
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl">
              {translations.xlSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="group bg-white border border-gray-200 rounded-xl p-6 lg:p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <span className="text-2xl lg:text-3xl text-white">
                    {category.icon}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-sm lg:text-base font-semibold text-gray-900 leading-tight">
                  {category.translation}
                </h3>
              </button>
            ))}
          </div>

          {/* Note */}
          <div className="text-center">
            <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {translations.xlNote}{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                {translations.xlLearnMore}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XLLanding;