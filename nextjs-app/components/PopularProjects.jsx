'use client';

import { useRouter } from 'next/navigation';
import { Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3, TrendingUp, Clock, Zap, Users } from 'lucide-react';

const PopularProjects = ({ translations }) => {
  const router = useRouter();

  const projectCategories = [
    { 
      key: 'handcraft', 
      icon: <Hammer className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.handcraft || 'Handcraft'
    },
    { 
      key: 'bathroom', 
      icon: <Droplets className="w-full h-full" strokeWidth={1.5} />, 
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
          <span className="text-2xl lg:text-3xl font-black text-honolulu_blue">XL</span>
        </div>
      ), 
      name: translations.majorProjects || 'Major Projects'
    },
    { 
      key: 'plumbing', 
      icon: <Droplets className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.services_plumbing || 'Plumbing'
    },
    { 
      key: 'electrical', 
      icon: <Zap className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.services_electrical || 'Electrical'
    },
    { 
      key: 'painting', 
      icon: <Users className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.services_painting || 'Painting'
    },
    { 
      key: 'carpentry', 
      icon: <Hammer className="w-full h-full" strokeWidth={1.5} />, 
      name: translations.services_carpentry || 'Carpentry'
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
    // Special routing for All Categories to full category overview - same as React version
    if (categoryKey === 'allCategories') {
      router.push('/all-categories');
    } else if (categoryKey === 'majorProjects') {
      router.push('/major-projects');
    } else if (categoryKey === 'housingAssociations') {
      router.push('/post/housing-associations');
    } else if (categoryKey === 'moving') {
      router.push('/post/moving');
    } else {
      // Navigate to job posting wizard with category in URL path
      router.push(`/post/${categoryKey}`);
    }
  };

  return (
    <section id="popular-projects" className="section-padding bg-non_photo_blue relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="heading-lg text-federal_blue mb-6 animate-fade-in-up">
            {translations.popularProjectsTitle || 'Popular projects'}
          </h2>
          <p className="body-lg text-honolulu_blue max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {translations.popularProjectsSubtitle || 'Whether you\'re starting a major project or a small task? Post your job and get quotes from relevant businesses and craftsmen - or use the search function to find the right company for you!'}
          </p>
        </div>

        {/* Category Grid - Same style as Hero section with touching boxes - SLIGHTLY LARGER */}
        <div className="flex justify-center">
          <div className="inline-block bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Row 1 - First 4 categories */}
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              {projectCategories.slice(0, 4).map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => handleCategoryClick(category.key)}
                  className="group flex flex-col items-center justify-center p-7 lg:p-9 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[150px] lg:w-[190px] h-[130px] lg:h-[150px]"
                >
                  {/* Icon - Properly centered and sized */}
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
            
            {/* Row 2 - Next 4 categories */}
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              {projectCategories.slice(4, 8).map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => handleCategoryClick(category.key)}
                  className="group flex flex-col items-center justify-center p-7 lg:p-9 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[150px] lg:w-[190px] h-[130px] lg:h-[150px]"
                >
                  {/* Icon - Properly centered and sized */}
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
            
            {/* Row 3 - Last 4 categories */}
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              {projectCategories.slice(8, 12).map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => handleCategoryClick(category.key)}
                  className="group flex flex-col items-center justify-center p-7 lg:p-9 hover:bg-gray-50 transition-colors duration-200 w-[150px] lg:w-[190px] h-[130px] lg:h-[150px]"
                >
                  {/* Icon - Properly centered and sized */}
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
      </div>
    </section>
  );
};

export default PopularProjects;