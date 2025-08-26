'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../contexts/TranslationsContext';
import { Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3, TrendingUp, Clock, DollarSign, Wrench } from 'lucide-react';

const PostJobPage = () => {
  const { translations } = useTranslations();
  const router = useRouter();

  const jobCategories = [
    { 
      key: 'handcraft', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ), 
      name: translations.handcraft || 'Handcraft',
      route: '/handcraft'
    },
    { 
      key: 'automotive', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ), 
      name: translations.automotive || 'Automotive',
      route: '/post/automotive'
    },
    { 
      key: 'cleaning', 
      icon: <Sparkles className="w-full h-full" />, 
      name: translations.cleaning || 'Cleaning',
      route: '/post/cleaning' 
    },
    { 
      key: 'bathroom', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M7 7h10v2H7V7zM7 11h10v8c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-8zm2 2v4h6v-4H9z"/>
        </svg>
      ), 
      name: translations.bathroom || 'Bathroom',
      route: '/post'
    },
    { 
      key: 'plumbing', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M18.5 3c-1.79 0-3.43.73-4.61 1.91L12.97 5.83 11.14 4 9.73 5.41l1.83 1.83-.92.92C9.43 6.96 7.79 6.23 6 6.23c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5c1.79 0 3.43-.73 4.61-1.91l.92-.92 1.83 1.83L15.77 15l-1.83-1.83.92-.92c1.21-1.18 1.94-2.82 1.94-4.61C16.8 4.6 17.84 3.5 19.2 3.5c1.36 0 2.4 1.1 2.4 2.64 0 1.79-.73 3.43-1.91 4.61l-.92.92 1.83 1.83 1.41-1.41-1.83-1.83.92-.92C22.27 7.93 23 6.29 23 4.5 23 1.46 20.54-.5 17.5-.5z"/>
        </svg>
      ), 
      name: translations.plumbing || 'Plumbing',
      route: '/post'
    },
    { 
      key: 'moving', 
      icon: <Truck className="w-full h-full" />, 
      name: translations.moving || 'Moving',
      route: '/post/moving'
    },
    { 
      key: 'housingAssociations', 
      icon: <Building className="w-full h-full" />, 
      name: translations.housingAssociations || 'Housing Associations',
      route: '/post/housing-associations'
    },
    { 
      key: 'allCategories', 
      icon: <Grid3X3 className="w-full h-full" />, 
      name: translations.allCategories || 'All Categories',
      route: '/all-categories'
    }
  ];

  const handleCategoryClick = (category) => {
    router.push(category.route);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-20"
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
        {/* Main Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {translations.postJobPageTitle || 'Choose category to post your job'}
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl text-white/90 mb-8">
          {translations.postJobPageSubtitle || 'Completely free'}
        </h2>

        {/* Service Categories Grid - 2 rows x 4 columns, same style as Hero */}
        <div className="inline-block bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Row 1 */}
            {jobCategories.slice(0, 4).map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Properly centered */}
                <div className="w-16 h-16 lg:w-18 lg:h-18 text-[#10B981] mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    {category.icon}
                  </div>
                </div>
                
                {/* Category name - Fixed height */}
                <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Row 2 */}
            {jobCategories.slice(4, 8).map((category, index) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
              >
                {/* Icon - Properly centered */}
                <div className="w-16 h-16 lg:w-18 lg:h-18 text-[#10B981] mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    {category.icon}
                  </div>
                </div>
                
                {/* Category name - Fixed height */}
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

export default PostJobPage;