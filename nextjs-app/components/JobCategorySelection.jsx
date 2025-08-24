'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Hammer, Car, Building, Sparkles, DollarSign, Truck, Home, Grid3X3 } from 'lucide-react';

const JobCategorySelection = ({ translations, language }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Exactly 8 categories as specified, matching Mittanbud
  const jobCategories = [
    {
      key: 'handcraft',
      icon: <Hammer className="w-8 h-8" />,
      icelandicName: 'Handverk',
      englishName: 'Handcraft'
    },
    {
      key: 'automotive',
      icon: <Car className="w-8 h-8" />,
      icelandicName: 'Bílavarðstæði',
      englishName: 'Car Workshop'
    },
    {
      key: 'terrace',
      icon: <Building className="w-8 h-8" />,
      icelandicName: 'Pallur / Verönd',
      englishName: 'Terrace/Decking'
    },
    {
      key: 'cleaning',
      icon: <Sparkles className="w-8 h-8" />,
      icelandicName: 'Þrif',
      englishName: 'Cleaning'
    },
    {
      key: 'finance',
      icon: <DollarSign className="w-8 h-8" />,
      icelandicName: 'Fjármál',
      englishName: 'Economy/Finance'
    },
    {
      key: 'transport',
      icon: <Truck className="w-8 h-8" />,
      icelandicName: 'Flutningur',
      englishName: 'Transport'
    },
    {
      key: 'housingAssociations',
      icon: <Home className="w-8 h-8" />,
      icelandicName: 'Húsfélög',
      englishName: 'Housing Associations'
    },
    {
      key: 'otherCategories',
      icon: <Grid3X3 className="w-8 h-8" />,
      icelandicName: 'Aðrir flokkar',
      englishName: 'Other categories'
    }
  ];

  const handleCategorySelect = (categoryKey) => {
    // Handle special routing for specific categories
    if (categoryKey === 'cleaning') {
      router.push('/post/cleaning');
    } else if (categoryKey === 'housingAssociations') {
      router.push('/post/housing-associations');
    } else if (categoryKey === 'transport') {
      router.push('/post/moving'); // Moving category for transport
    } else if (categoryKey === 'otherCategories') {
      router.push('/all-categories');
    } else {
      // Navigate to job posting wizard for other categories
      router.push(`/post/${categoryKey}`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Search query:', searchQuery);
    // Could implement search logic or redirect to a search results page
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Back Button */}
        <div className="flex items-center mb-12">
          <button 
            onClick={handleBack}
            className="mr-4 p-2 rounded-lg hover:bg-white/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {language === 'is' ? 'Velg kategori' : 'Choose Category'}
            </h1>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-12">
          
          {/* Title */}
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 text-center mb-8">
            {language === 'is' 
              ? 'Velg kategori for å legge ut jobben din - helt gratis'
              : 'Choose a category to post your job — completely free'
            }
          </h2>

          {/* Search Bar - Matching Mittanbud exactly */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'is' ? 'Hvað þarftu hjálp við?' : 'What do you need help with?'}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-16 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors shadow-sm"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Categories Grid - Exactly 2x4 layout like Mittanbud */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {jobCategories.map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategorySelect(category.key)}
                className="flex flex-col items-center p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 group min-h-[140px] md:min-h-[160px]"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                  <div className="text-[#1B2B5B] group-hover:text-blue-600 transition-colors">
                    {category.icon}
                  </div>
                </div>
                
                {/* Category Names - Icelandic primary, English subtitle */}
                <div className="text-center">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-sm lg:text-base mb-1">
                    {category.icelandicName}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                    ({category.englishName})
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobCategorySelection;