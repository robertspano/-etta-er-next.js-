import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Building, Sparkles, Car, Wrench, Trash2, Users, Warehouse, ShowerHead, TreePine, Sofa, Package, Flower, Archive, Brush } from 'lucide-react';

const CleaningCategoryPicker = ({ translations }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const cleaningSubcategories = [
    {
      key: 'houseCleaning',
      icon: <Home className="w-8 h-8" />,
      name: translations.houseCleaning || 'House Cleaning'
    },
    {
      key: 'officeCleaning', 
      icon: <Building className="w-8 h-8" />,
      name: translations.officeCleaning || 'Office Cleaning'
    },
    {
      key: 'deepCleaning',
      icon: <Sparkles className="w-8 h-8" />,
      name: translations.deepCleaning || 'Deep Cleaning'
    },
    {
      key: 'carCleaning',
      icon: <Car className="w-8 h-8" />,
      name: translations.carCleaning || 'Car Cleaning'
    },
    {
      key: 'postConstruction',
      icon: <Wrench className="w-8 h-8" />,
      name: translations.postConstruction || 'Post-Construction Cleaning'
    },
    {
      key: 'wasteRemoval',
      icon: <Trash2 className="w-8 h-8" />,
      name: translations.wasteRemoval || 'Waste Removal'
    },
    {
      key: 'eventCleaning',
      icon: <Users className="w-8 h-8" />,
      name: translations.eventCleaning || 'Event Cleaning'
    },
    {
      key: 'industrialCleaning',
      icon: <Warehouse className="w-8 h-8" />,
      name: translations.industrialCleaning || 'Industrial Cleaning'
    },
    {
      key: 'windowCleaning',
      icon: <ShowerHead className="w-8 h-8" />,
      name: translations.windowCleaning || 'Window Cleaning'
    },
    {
      key: 'gardenCleaning',
      icon: <TreePine className="w-8 h-8" />,
      name: translations.gardenCleaning || 'Garden Cleaning'
    },
    {
      key: 'carpetCleaning',
      icon: <Sofa className="w-8 h-8" />,
      name: translations.carpetCleaning || 'Carpet & Upholstery'
    },
    {
      key: 'movingCleaning',
      icon: <Package className="w-8 h-8" />,
      name: translations.movingCleaning || 'Moving Cleaning'
    },
    {
      key: 'pressureWashing',
      icon: <Flower className="w-8 h-8" />,
      name: translations.pressureWashing || 'Pressure Washing'
    },
    {
      key: 'storageCleaning',
      icon: <Archive className="w-8 h-8" />,
      name: translations.storageCleaning || 'Storage Cleaning'
    },
    {
      key: 'specialized',
      icon: <Brush className="w-8 h-8" />,
      name: translations.specializedCleaning || 'Specialized Cleaning'
    },
    {
      key: 'otherCleaning',
      icon: <Sparkles className="w-8 h-8" />,
      name: translations.otherCleaning || 'Other Cleaning'
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Could implement search functionality here
  };

  const filteredCategories = cleaningSubcategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
              {/* Progress Steps */}
              <div className="text-sm text-gray-600 font-medium mb-2">
                {translations.cleaningStepHeader || "About the job • Contact info • Complete"}
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-600 h-1 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-12">
          
          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6">
            {translations.cleaningCategoryTitle || "Choose a category to post your job — completely free"}
          </h1>
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={translations.cleaningSearchPlaceholder || "What kind of cleaning do you need?"}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-14"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </form>

          {/* Categories Grid - Perfect 4x4 Layout like Mittanbud */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {filteredCategories.map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleSubcategorySelect(category.key)}
                className="bg-white aspect-square p-4 lg:p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-center group flex flex-col justify-center items-center min-h-[140px] lg:min-h-[160px]"
              >
                {/* Icon */}
                <div className="mb-2 lg:mb-3 flex justify-center">
                  <div className="text-[#1B2B5B] group-hover:text-blue-600 transition-colors">
                    {category.icon}
                  </div>
                </div>
                
                {/* Category Name */}
                <h3 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors text-xs lg:text-sm leading-tight">
                  {category.name}
                </h3>
              </button>
            ))}
          </div>

          {/* No results message */}
          {searchQuery && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {translations.noResultsFound || "No categories found matching your search."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CleaningCategoryPicker;