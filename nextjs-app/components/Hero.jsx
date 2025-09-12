'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, Users, ArrowRight, Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3 } from 'lucide-react';

const Hero = ({ translations, language }) => {
  const router = useRouter();
  const [splineLoaded, setSplineLoaded] = useState(false);

  const serviceCategories = [
    { 
      key: 'handcraft', 
      icon: <Hammer className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.handcraft || 'Handcraft' 
    },
    { 
      key: 'bathroom', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          {/* Shower head - centered */}
          <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="10" cy="10" r="0.5"/>
          <circle cx="12" cy="10" r="0.5"/>
          <circle cx="14" cy="10" r="0.5"/>
          <circle cx="9" cy="12" r="0.5"/>
          <circle cx="11" cy="12" r="0.5"/>
          <circle cx="13" cy="12" r="0.5"/>
          <circle cx="15" cy="12" r="0.5"/>
          <circle cx="10" cy="14" r="0.5"/>
          <circle cx="12" cy="14" r="0.5"/>
          <circle cx="14" cy="14" r="0.5"/>
        </svg>
      ), 
      name: translations.bathroom || 'Bathroom' 
    },
    { 
      key: 'automotive', 
      icon: <Car className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.automotive || 'Automotive' 
    },
    { 
      key: 'majorProjects', 
      icon: (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-3xl font-black text-honolulu_blue">XL</span>
        </div>
      ), 
      name: translations.majorProjects || 'Major Projects' 
    },
    { 
      key: 'cleaning', 
      icon: <Sparkles className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.cleaning || 'Cleaning' 
    },
    { 
      key: 'housingAssociations', 
      icon: <Building className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.housingAssociations || 'Housing' 
    },
    { 
      key: 'moving', 
      icon: <Truck className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.moving || 'Moving' 
    },
    { 
      key: 'allCategories', 
      icon: <Grid3X3 className="w-full h-full" strokeWidth={1.5} />, 
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Video Background with responsive zoom */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover 
                     /* Desktop: normal zoom */ 
                     md:scale-100 
                     /* Mobile: zoom out to show more of the scene */
                     scale-75 
                     /* Smooth transition between sizes */
                     transition-transform duration-500"
          style={{
            transformOrigin: 'center center'
          }}
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => {
            console.log('Video can play');
            setSplineLoaded(true);
          }}
          onError={(e) => {
            console.error('Video loading error:', e);
            setSplineLoaded(true);
          }}
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_movers-platform-1/artifacts/xdyzt278_untitled%20%281%29.mp4" 
            type="video/mp4" 
          />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600"></div>
        </video>
        
        {/* Loading state while video loads */}
        {!splineLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center z-10">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-xl font-medium">Loading 3D Experience...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Background overlay for better text readability - lighter on mobile for better view */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/30 z-5"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        {/* Main Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          {translations.heroNewTitle || 'Fáðu verkið gert!'}
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-cyan-200 mb-8 drop-shadow-2xl">
          {translations.heroNewSubtitle || 'Finndu trausta fagmenn fyrir verkefnið þitt'}
        </h2>
        
        {/* Service Categories Grid - responsive sizing */}
        <div className="inline-block bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Row 1 */}
            {serviceCategories.slice(0, 4).map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category.key)}
                className="group flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[100px] md:w-[140px] lg:w-[180px] h-[90px] md:h-[120px] lg:h-[140px]"
              >
                {/* Icon - responsive size */}
                <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - responsive text */}
                <span className="text-xs md:text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-6 md:h-8 lg:h-10 flex items-center justify-center">
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
                className="group flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 w-[100px] md:w-[140px] lg:w-[180px] h-[90px] md:h-[120px] lg:h-[140px]"
              >
                {/* Icon - responsive size */}
                <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-honolulu_blue mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {category.icon}
                </div>
                
                {/* Category name - responsive text */}
                <span className="text-xs md:text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-6 md:h-8 lg:h-10 flex items-center justify-center">
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