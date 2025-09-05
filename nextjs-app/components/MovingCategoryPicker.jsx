'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Truck, Package, Trash2, Car, MoreHorizontal, Users, Music, Box, Warehouse, Archive, Plane } from 'lucide-react';

const MovingCategoryPicker = ({ translations, language }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const movingSubcategories = [
    {
      key: 'varetransport',
      icon: <Truck className="w-full h-full" strokeWidth={1.5} />,
      name: translations.varetransport || (language === 'is' ? 'Vöruflutninga' : 'Van Transport')
    },
    {
      key: 'flyttebyra',
      icon: <Package className="w-full h-full" strokeWidth={1.5} />,
      name: translations.flyttebyra || (language === 'is' ? 'Flutningafyrirtæki' : 'Moving Company')
    },
    {
      key: 'avfallshandtering',
      icon: <Trash2 className="w-full h-full" strokeWidth={1.5} />,
      name: translations.avfallshandtering || (language === 'is' ? 'Sorpmeðhöndlun' : 'Waste Management')
    },
    {
      key: 'transportBilBat',
      icon: <Car className="w-full h-full" strokeWidth={1.5} />,
      name: translations.transportBilBat || (language === 'is' ? 'Bíla- og bátaflutningar' : 'Vehicle/Boat Transport')
    },
    {
      key: 'annetFlytting',
      icon: <MoreHorizontal className="w-full h-full" strokeWidth={1.5} />,
      name: translations.annetFlytting || (language === 'is' ? 'Annað (Flutningar)' : 'Other Moving/Transport')
    },
    {
      key: 'persontransport',
      icon: <Users className="w-full h-full" strokeWidth={1.5} />,
      name: translations.persontransport || (language === 'is' ? 'Persónuflutningar' : 'Personal Transport')
    },
    {
      key: 'pianotransport',
      icon: <Music className="w-full h-full" strokeWidth={1.5} />,
      name: translations.pianotransport || (language === 'is' ? 'Píanóflutningar' : 'Piano Moving')
    },
    {
      key: 'godstransport',
      icon: <Box className="w-full h-full" strokeWidth={1.5} />,
      name: translations.godstransport || (language === 'is' ? 'Vöruflutningar' : 'Freight Transport')
    }
  ];

  // Additional categories shown when expanded
  const additionalSubcategories = [
    {
      key: 'massetransport',
      icon: <Warehouse className="w-6 h-6" />,
      name: translations.massetransport || (language === 'is' ? 'Massaflutningar' : 'Bulk Transport')
    },
    {
      key: 'lager',
      icon: <Archive className="w-6 h-6" />,
      name: translations.lager || (language === 'is' ? 'Vörugeymsla' : 'Storage/Warehousing')
    },
    {
      key: 'helikoptertransport',
      icon: <Plane className="w-6 h-6" />,
      name: translations.helikoptertransport || (language === 'is' ? 'Þyrluflutningar' : 'Helicopter Transport')
    }
  ];

  const handleSubcategorySelect = (subcategoryKey) => {
    // Store moving subcategory in localStorage for the wizard
    localStorage.setItem('bc_selected_category', 'moving');
    localStorage.setItem('bc_selected_subcategory', subcategoryKey);
    
    // Navigate to simplified contact info form
    router.push('/post/moving/contact');
  };

  const handleToggleExpansion = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
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
              {/* Progress Steps */}
              <div className="text-sm text-gray-600 font-medium mb-2">
                {language === 'is' ? 'Um verkefnið • Tengiliðaupplýsingar • Lokið' : 'Om jobben • Kontaktinfo • Fullført'}
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
            {translations.movingCategoryTitle || (language === 'is' ? 'Hvers konar flutningsþjónustu þarftu?' : 'What kind of moving service do you need?')}
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
            
            {/* Additional Categories (Expandable) */}
            <div className={`col-span-full grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-200 ${
              expanded 
                ? 'opacity-100 max-h-96' 
                : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              {additionalSubcategories.map((subcategory, index) => (
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
          </div>

          {/* Toggle More Categories Button */}
          <div className="text-center">
            <button
              onClick={handleToggleExpansion}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
              aria-expanded={expanded}
            >
              {expanded 
                ? (language === 'is' ? 'Sýna færri flokka' : 'Vis færre kategorier')
                : (language === 'is' ? 'Sýna fleiri flokka' : 'Vis flere kategorier')
              }
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingCategoryPicker;