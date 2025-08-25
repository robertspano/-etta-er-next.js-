'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, Users, ArrowRight, Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3 } from 'lucide-react';

const Hero = ({ translations, language }) => {
  const router = useRouter();

  const serviceCategories = [
    { 
      key: 'handcraft', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ), 
      name: translations.handcraft || 'Handcraft' 
    },
    { 
      key: 'bathroom', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          {/* Shower head */}
          <circle cx="12" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="10" cy="6" r="0.5"/>
          <circle cx="12" cy="6" r="0.5"/>
          <circle cx="14" cy="6" r="0.5"/>
          <circle cx="9" cy="8" r="0.5"/>
          <circle cx="11" cy="8" r="0.5"/>
          <circle cx="13" cy="8" r="0.5"/>
          <circle cx="15" cy="8" r="0.5"/>
          <circle cx="10" cy="10" r="0.5"/>
          <circle cx="12" cy="10" r="0.5"/>
          <circle cx="14" cy="10" r="0.5"/>
        </svg>
      ), 
      name: translations.bathroom || 'Bathroom' 
    },
    { 
      key: 'automotive', 
      icon: <Car className="w-full h-full" />, 
      name: translations.automotive || 'Automotive' 
    },
    { 
      key: 'majorProjects', 
      icon: (
        <div className="text-3xl font-black text-[#10B981]">XL</div>
      ), 
      name: translations.majorProjects || 'Major Projects' 
    },
    { 
      key: 'cleaning', 
      icon: <Sparkles className="w-full h-full" />, 
      name: translations.cleaning || 'Cleaning' 
    },
    { 
      key: 'housingAssociations', 
      icon: <Building className="w-full h-full" />, 
      name: translations.housingAssociations || 'Housing' 
    },
    { 
      key: 'moving', 
      icon: <Truck className="w-full h-full" />, 
      name: translations.moving || 'Moving' 
    },
    { 
      key: 'allCategories', 
      icon: <Grid3X3 className="w-full h-full" />, 
      name: translations.allCategories || 'All Categories' 
    }
  ];

  const handleCategoryClick = (categoryKey) => {
    // Route to specialized pages like mittanbud.no
    if (categoryKey === 'allCategories') {
      router.push('/all-categories');
    } else if (categoryKey === 'majorProjects') {
      router.push('/major-projects');
    } else if (categoryKey === 'housingAssociations') {
      // Housing associations grid page
      router.push('/post/housing-associations');
    } else if (categoryKey === 'cleaning') {
      // Cleaning category picker
      router.push('/post/cleaning');
    } else if (categoryKey === 'moving') {
      // Moving category picker  
      router.push('/post/moving');
    } else if (categoryKey === 'automotive') {
      // Automotive specialized page with license plate input
      router.push('/post/automotive');
    } else {
      // For other categories like handcraft, electrical, plumbing - go to job posting wizard
      router.push(`/post/${categoryKey}`);
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://customer-assets.emergentagent.com/job_craft-connect-11/artifacts/czdu1dn3_pexels-freestockpro-12932486.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Main Headline - exactly like byggstart */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {translations.heroNewTitle || 'Get the Job Done!'}
        </h1>
        
        {/* Subtitle with highlighted text - like byggstart's green text */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#10B981] mb-8">
          {translations.heroNewSubtitle || 'Find trusted professionals for your project'}
        </h2>
        
        {/* Additional subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Choose category below and get 3 price quotes: Free, simple and non-binding
        </p>

        {/* Service Categories Grid - 2 rows x 4 columns, FIXED size boxes */}
        <div className="inline-block bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Row 1 */}
            {serviceCategories.slice(0, 4).map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category.key)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Fixed size */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-[#10B981] mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - Fixed height with text wrapping */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Row 2 */}
            {serviceCategories.slice(4, 8).map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category.key)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Fixed size */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 text-[#10B981] mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - Fixed height with text wrapping */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
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

export default Hero;