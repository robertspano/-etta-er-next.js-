'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building, Sparkles, Package, MoreHorizontal } from 'lucide-react';

const CleaningCategoryPicker = ({ translations, language }) => {
  const router = useRouter();

  // Only the 4 specific cleaning subcategories from Mittanbud - Hero section style icons
  const cleaningSubcategories = [
    {
      key: 'facadeCleaning',
      icon: <Building className="w-full h-full" strokeWidth={1.5} />,
      name: translations.facadeCleaning || (language === 'is' ? 'Húsaþrif' : 'Facade Cleaning')
    },
    {
      key: 'cleaningServices',
      icon: <Sparkles className="w-full h-full" strokeWidth={1.5} />,
      name: translations.cleaningServices || (language === 'is' ? 'Þrifaþjónusta' : 'Cleaning Services')
    },
    {
      key: 'moveOutCleaning',
      icon: <Package className="w-full h-full" strokeWidth={1.5} />,
      name: translations.moveOutCleaning || (language === 'is' ? 'Flutningsþrif' : 'Move-out Cleaning')
    },
    {
      key: 'otherCleaning',
      icon: <MoreHorizontal className="w-full h-full" strokeWidth={1.5} />,
      name: translations.otherCleaning || (language === 'is' ? 'Annað (Þrif)' : 'Other (Cleaning)')
    }
  ];

  const handleSubcategorySelect = (subcategoryKey) => {
    // Store cleaning subcategory in localStorage for the wizard
    localStorage.setItem('bc_selected_category', 'cleaning');
    localStorage.setItem('bc_selected_subcategory', subcategoryKey);
    
    // Navigate to simplified contact info form (similar to moving flow)
    router.push('/post/cleaning/contact');
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Link 
              href="/"
              className="mr-4 p-2 rounded-lg hover:bg-white/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex-1 max-w-md">
              {/* Progress Steps - 3 step flow like Mittanbud */}
              <div className="text-sm text-gray-600 font-medium mb-2">
                {translations.cleaningStepHeader || (language === 'is' ? 'Um verkefnið • Tengiliðaupplýsingar • Lokið' : 'About the job • Contact info • Complete')}
              </div>
              {/* Progress Bar - Step 1 of 3 */}
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-600 h-1 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-12">
          
          {/* Title - matching Mittanbud */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            {translations.cleaningCategoryTitle || (language === 'is' ? 'Hvers konar þrifaþjónustu þarftu?' : 'What kind of cleaning service do you need?')}
          </h1>

          {/* Categories Grid - Hero section style with horizontal layout */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {cleaningSubcategories.map((category, index) => (
                  <button
                    key={category.key}
                    onClick={() => handleSubcategorySelect(category.key)}
                    className="group flex items-center justify-start p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 gap-3 border border-slate-200 bg-white shadow-sm hover:shadow-md hover:scale-105 transition-transform"
                  >
                    {/* Icon - Same size and style as hero */}
                    <div className="w-14 h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-0 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 flex items-center justify-center">
                      {category.icon}
                    </div>
                    
                    {/* Category name - Same typography as hero */}
                    <span className="text-sm lg:text-base font-medium text-gray-800 text-left leading-tight flex items-center justify-center">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleaningCategoryPicker;