import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Package, Trash2, Car, MoreHorizontal, Users, Music, Box } from 'lucide-react';

const MovingCategoryPicker = ({ translations }) => {
  const navigate = useNavigate();

  const movingSubcategories = [
    {
      key: 'varetransport',
      icon: <Truck className="w-6 h-6" />,
      name: translations.varetransport
    },
    {
      key: 'flyttebyra',
      icon: <Package className="w-6 h-6" />,
      name: translations.flyttebyra
    },
    {
      key: 'avfallshandtering',
      icon: <Trash2 className="w-6 h-6" />,
      name: translations.avfallshandtering
    },
    {
      key: 'transportBilBat',
      icon: <Car className="w-6 h-6" />,
      name: translations.transportBilBat
    },
    {
      key: 'annetFlytting',
      icon: <MoreHorizontal className="w-6 h-6" />,
      name: translations.annetFlytting
    },
    {
      key: 'persontransport',
      icon: <Users className="w-6 h-6" />,
      name: translations.persontransport
    },
    {
      key: 'pianotransport',
      icon: <Music className="w-6 h-6" />,
      name: translations.pianotransport
    },
    {
      key: 'godstransport',
      icon: <Box className="w-6 h-6" />,
      name: translations.godstransport
    }
  ];

  const handleSubcategorySelect = (subcategoryKey) => {
    // Store moving subcategory in localStorage for the wizard
    localStorage.setItem('bc_selected_category', 'moving');
    localStorage.setItem('bc_selected_subcategory', subcategoryKey);
    
    // Navigate to simplified contact info form
    navigate('/post/moving/contact');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleShowMoreCategories = () => {
    navigate('/all-categories');
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
              {/* Progress Steps */}
              <div className="text-sm text-gray-600 font-medium mb-2">
                {translations.movingStepHeader}
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
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
            {translations.movingCategoryTitle}
          </h1>

          {/* Subcategories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {movingSubcategories.map((subcategory, index) => (
              <button
                key={subcategory.key}
                onClick={() => handleSubcategorySelect(subcategory.key)}
                className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
                  <div className="text-[#1B2B5B] group-hover:text-blue-600 transition-colors">
                    {subcategory.icon}
                  </div>
                </div>
                
                {/* Name */}
                <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                  {subcategory.name}
                </span>
              </button>
            ))}
          </div>

          {/* Show More Categories Link */}
          <div className="text-center">
            <button
              onClick={handleShowMoreCategories}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              {translations.showMoreCategories}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingCategoryPicker;