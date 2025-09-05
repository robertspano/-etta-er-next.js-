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
      icon: <Hammer className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.handcraft || 'Handcraft',
      route: '/post/handcraft'
    },
    { 
      key: 'automotive', 
      icon: <Car className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.automotive || 'Automotive',
      route: '/post/automotive'
    },
    { 
      key: 'cleaning', 
      icon: <Sparkles className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.cleaning || 'Cleaning',
      route: '/post/cleaning' 
    },
    { 
      key: 'bathroom', 
      icon: <Droplets className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.bathroom || 'Bathroom',
      route: '/post/bathroom'
    },
    { 
      key: 'plumbing', 
      icon: <Wrench className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.plumbing || 'Plumbing',
      route: '/post/plumbing'
    },
    { 
      key: 'moving', 
      icon: <Truck className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.moving || 'Moving',
      route: '/post/moving'
    },
    { 
      key: 'housingAssociations', 
      icon: <Building className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.housingAssociations || 'Housing Associations',
      route: '/post/housing-associations'
    },
    { 
      key: 'allCategories', 
      icon: <Grid3X3 className="w-full h-full" strokeWidth={1.5} />, 
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
                <div className="w-16 h-16 lg:w-18 lg:h-18 text-honolulu_blue mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 flex items-center justify-center">
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
                <div className="w-16 h-16 lg:w-18 lg:h-18 text-honolulu_blue mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 flex items-center justify-center">
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