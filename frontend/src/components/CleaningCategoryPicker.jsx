import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Sparkles, Package, MoreHorizontal } from 'lucide-react';

const CleaningCategoryPicker = ({ translations }) => {
  const navigate = useNavigate();

  // Only the 4 specific cleaning subcategories from Mittanbud
  const cleaningSubcategories = [
    {
      key: 'facadeCleaning',
      icon: <Building className="w-8 h-8" />,
      name: translations.facadeCleaning || 'Facade Cleaning'
    },
    {
      key: 'cleaningServices',
      icon: <Sparkles className="w-8 h-8" />,
      name: translations.cleaningServices || 'Cleaning Services'
    },
    {
      key: 'moveOutCleaning',
      icon: <Package className="w-8 h-8" />,
      name: translations.moveOutCleaning || 'Move-out Cleaning'
    },
    {
      key: 'otherCleaning',
      icon: <MoreHorizontal className="w-8 h-8" />,
      name: translations.otherCleaning || 'Other (Cleaning)'
    }
  ];

  const handleSubcategorySelect = (subcategoryKey) => {
    // Store cleaning subcategory in localStorage for the wizard
    localStorage.setItem('bc_selected_category', 'cleaning');
    localStorage.setItem('bc_selected_subcategory', subcategoryKey);
    
    // Navigate to simplified contact info form (similar to moving flow)
    navigate('/post/cleaning/contact');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-lg hover:bg-white/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 max-w-md">
              {/* Progress Steps - 3 step flow like Mittanbud */}
              <div className="text-sm text-gray-600 font-medium mb-2">
                {translations.cleaningStepHeader || "About the job • Contact info • Complete"}
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
            {translations.cleaningCategoryTitle || "What kind of cleaning service do you need?"}
          </h1>

          {/* Categories Grid - 2x2 layout exactly like Mittanbud */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {cleaningSubcategories.map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleSubcategorySelect(category.key)}
                className="flex items-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group min-h-[120px]"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
                  <div className="text-[#1B2B5B] group-hover:text-blue-600 transition-colors">
                    {category.icon}
                  </div>
                </div>
                
                {/* Category Name */}
                <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors text-lg">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleaningCategoryPicker;