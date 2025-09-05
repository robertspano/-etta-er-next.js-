'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight, Home, DoorOpen, Building, Square, Package, Droplets, Bath, Zap, TreePine, Wrench, Plug, Paintbrush, Hammer, Sparkles, Truck, Grid3X3 } from 'lucide-react';

const HousingAssociationsGrid = ({ translations, language }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      key: 'roof',
      icon: <Home className="w-full h-full" strokeWidth={1.5} />,
      name: translations.roof || (language === 'is' ? 'Þak' : 'Roof'),
      route: '/post/roof'
    },
    {
      key: 'windowsDoors',
      icon: <DoorOpen className="w-full h-full" strokeWidth={1.5} />,
      name: translations.windowsDoors || (language === 'is' ? 'Gluggar og hurðir' : 'Windows & Doors'), 
      route: '/post/windows-doors'
    },
    {
      key: 'facade',
      icon: <Building className="w-full h-full" strokeWidth={1.5} />,
      name: translations.facade || (language === 'is' ? 'Útveggir' : 'Facade'),
      route: '/post/facade'
    },
    {
      key: 'balcony',
      icon: <Square className="w-full h-full" strokeWidth={1.5} />,
      name: translations.balcony || (language === 'is' ? 'Svalir' : 'Balcony'),
      route: '/post/balcony'
    },
    {
      key: 'masonry',
      icon: <Package className="w-full h-full" strokeWidth={1.5} />,
      name: translations.masonry || (language === 'is' ? 'Múrverk' : 'Masonry'),
      route: '/post/masonry'
    },
    {
      key: 'drainageInsulation',
      icon: <Droplets className="w-full h-full" strokeWidth={1.5} />,
      name: translations.drainageInsulation || (language === 'is' ? 'Frárennsliser og einangrun' : 'Drainage & Insulation'),
      route: '/post/drainage-insulation'
    },
    {
      key: 'bathroomRenovation',
      icon: <Bath className="w-full h-full" strokeWidth={1.5} />,
      name: translations.bathroomRenovation || (language === 'is' ? 'Baðherbergisendurnýjun' : 'Bathroom Renovation'),
      route: '/post/bathroom'
    },
    {
      key: 'evCharger',
      icon: <Zap className="w-full h-full" strokeWidth={1.5} />,
      name: translations.evCharger || (language === 'is' ? 'Rafbílahleðsla' : 'EV Charger'),
      route: '/post/ev-charger'
    },
    {
      key: 'landscaper',
      icon: <TreePine className="w-full h-full" strokeWidth={1.5} />,
      name: translations.landscaper || (language === 'is' ? 'Garðyrkja' : 'Landscaper'),
      route: '/post/landscaping'
    },
    {
      key: 'plumber',
      icon: <Wrench className="w-full h-full" strokeWidth={1.5} />,
      name: translations.plumber || (language === 'is' ? 'Pípulagningamaður' : 'Plumber'),
      route: '/post/plumbing'
    },
    {
      key: 'electrician',
      icon: <Plug className="w-full h-full" strokeWidth={1.5} />,
      name: translations.electrician || (language === 'is' ? 'Rafvirki' : 'Electrician'),
      route: '/post/electrical'
    },
    {
      key: 'painter',
      icon: <Paintbrush className="w-full h-full" strokeWidth={1.5} />,
      name: translations.painter || (language === 'is' ? 'Málari' : 'Painter'),
      route: '/post/painting'
    },
    {
      key: 'carpenter',
      icon: <Hammer className="w-full h-full" strokeWidth={1.5} />,
      name: translations.carpenter || (language === 'is' ? 'Trésmíðamaður' : 'Carpenter'),
      route: '/post/carpentry'
    },
    {
      key: 'cleaning',
      icon: <Sparkles className="w-full h-full" strokeWidth={1.5} />,
      name: translations.cleaning || (language === 'is' ? 'Þrif' : 'Cleaning'),
      route: '/post/cleaning'
    },
    {
      key: 'movingTransport',
      icon: <Truck className="w-full h-full" strokeWidth={1.5} />,
      name: translations.movingTransport || (language === 'is' ? 'Flutningar og vöruflutninga' : 'Moving & Transport'),
      route: '/post/moving'
    },
    {
      key: 'allCategories',
      icon: <Grid3X3 className="w-full h-full" strokeWidth={1.5} />,
      name: translations.allCategories || (language === 'is' ? 'Aðrir flokkar' : 'Other Categories'),
      route: '/all-categories'
    }
  ];

  const handleCategoryClick = (category) => {
    // Special routing for specific categories
    if (category.key === 'cleaning') {
      // Go to cleaning category picker page
      router.push('/post/cleaning');
    } else if (category.key === 'movingTransport') {
      // Go to moving page (when it exists)
      router.push('/post/moving');
    } else if (category.key === 'allCategories') {
      // Go to all categories page
      router.push('/all-categories');
    } else {
      // All other categories go directly to job wizard
      router.push(`/post/housing-associations?subcategory=${category.key}`);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Could implement search functionality here
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            {translations.housingAssociationsTitle || (language === 'is' ? 'Veldu flokk til að leggja inn verkefnið þitt — alveg ókeypis' : 'Choose a category to post your job — completely free')}
          </h1>
        </div>

        {/* Categories Grid - Hero section style */}
        <div className="flex justify-center">
          <div className="inline-block bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Row 1 */}
            {categories.slice(0, 4).map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Same size and style as hero */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - Same typography as hero */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Row 2 */}
            {categories.slice(4, 8).map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Same size and style as hero */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - Same typography as hero */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Row 3 */}
            {categories.slice(8, 12).map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Same size and style as hero */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - Same typography as hero */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Row 4 */}
            {categories.slice(12, 16).map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Same size and style as hero */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - Same typography as hero */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HousingAssociationsGrid;