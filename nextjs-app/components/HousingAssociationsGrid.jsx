'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Home, DoorOpen, Building, Square, Package, Droplets, Bath, Zap, TreePine, Wrench, Plug, Paintbrush, Hammer, Sparkles, Truck, Grid3X3 } from 'lucide-react';

const HousingAssociationsGrid = ({ translations, language }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      key: 'roof',
      icon: <Home className="w-8 h-8" />,
      name: translations.roof || 'Roof',
      route: '/post/roof'
    },
    {
      key: 'windowsDoors',
      icon: <DoorOpen className="w-8 h-8" />,
      name: translations.windowsDoors || 'Windows & Doors', 
      route: '/post/windows-doors'
    },
    {
      key: 'facade',
      icon: <Building className="w-8 h-8" />,
      name: translations.facade || 'Facade',
      route: '/post/facade'
    },
    {
      key: 'balcony',
      icon: <Square className="w-8 h-8" />,
      name: translations.balcony || 'Balcony',
      route: '/post/balcony'
    },
    {
      key: 'masonry',
      icon: <Package className="w-8 h-8" />,
      name: translations.masonry || 'Masonry',
      route: '/post/masonry'
    },
    {
      key: 'drainageInsulation',
      icon: <Droplets className="w-8 h-8" />,
      name: translations.drainageInsulation || 'Drainage & Insulation',
      route: '/post/drainage-insulation'
    },
    {
      key: 'bathroomRenovation',
      icon: <Bath className="w-8 h-8" />,
      name: translations.bathroomRenovation || 'Bathroom Renovation',
      route: '/post/bathroom'
    },
    {
      key: 'evCharger',
      icon: <Zap className="w-8 h-8" />,
      name: translations.evCharger || 'EV Charger',
      route: '/post/ev-charger'
    },
    {
      key: 'landscaper',
      icon: <TreePine className="w-8 h-8" />,
      name: translations.landscaper || 'Landscaper',
      route: '/post/landscaping'
    },
    {
      key: 'plumber',
      icon: <Wrench className="w-8 h-8" />,
      name: translations.plumber || 'Plumber',
      route: '/post/plumbing'
    },
    {
      key: 'electrician',
      icon: <Plug className="w-8 h-8" />,
      name: translations.electrician || 'Electrician',
      route: '/post/electrical'
    },
    {
      key: 'painter',
      icon: <Paintbrush className="w-8 h-8" />,
      name: translations.painter || 'Painter',
      route: '/post/painting'
    },
    {
      key: 'carpenter',
      icon: <Hammer className="w-8 h-8" />,
      name: translations.carpenter || 'Carpenter',
      route: '/post/carpentry'
    },
    {
      key: 'cleaning',
      icon: <Sparkles className="w-8 h-8" />,
      name: translations.cleaning || 'Cleaning',
      route: '/post/cleaning'
    },
    {
      key: 'movingTransport',
      icon: <Truck className="w-8 h-8" />,
      name: translations.movingTransport || 'Moving & Transport',
      route: '/post/moving'
    },
    {
      key: 'allCategories',
      icon: <Grid3X3 className="w-8 h-8" />,
      name: translations.allCategories || 'Other Categories',
      route: '/all-categories'
    }
  ];

  const handleCategoryClick = (category) => {
    router.push(category.route);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    router.back();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Could implement search functionality here
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {translations.housingAssociationsTitle || "Choose a category to post your job — completely free"}
          </h1>
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={translations.housingAssociationsSearchPlaceholder || "What do you need help with?"}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-14"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Categories Grid - Perfect 4x4 Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {filteredCategories.map((category, index) => (
            <button
              key={category.key}
              onClick={() => handleCategoryClick(category)}
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
    </section>
  );
};

export default HousingAssociationsGrid;