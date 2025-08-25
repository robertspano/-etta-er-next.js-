'use client';

import { useRouter } from 'next/navigation';
import { Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3, TrendingUp, Clock } from 'lucide-react';

const PopularProjects = ({ translations }) => {
  const router = useRouter();

  const projectCategories = [
    { 
      key: 'handcraft', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ), 
      name: translations.handcraft || 'Handcraft'
    },
    { 
      key: 'bathroom', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M7 7h10v2H7V7zM7 11h10v8c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-8zm2 2v4h6v-4H9z"/>
        </svg>
      ), 
      name: translations.bathroom || 'Bathroom'
    },
    { 
      key: 'automotive', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ), 
      name: translations.automotive || 'Automotive'
    },
    { 
      key: 'majorProjects', 
      icon: (
        <div className="flex items-center justify-center">
          <span className="text-2xl font-black text-[#1E293B]">XL</span>
        </div>
      ), 
      name: translations.majorProjects || 'Major Projects'
    },
    { 
      key: 'plumbing', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M18.5 3c-1.79 0-3.43.73-4.61 1.91L12.97 5.83 11.14 4 9.73 5.41l1.83 1.83-.92.92C9.43 6.96 7.79 6.23 6 6.23c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5c1.79 0 3.43-.73 4.61-1.91l.92-.92 1.83 1.83L15.77 15l-1.83-1.83.92-.92c1.21-1.18 1.94-2.82 1.94-4.61C16.8 4.6 17.84 3.5 19.2 3.5c1.36 0 2.4 1.1 2.4 2.64 0 1.79-.73 3.43-1.91 4.61l-.92.92 1.83 1.83 1.41-1.41-1.83-1.83.92-.92C22.27 7.93 23 6.29 23 4.5 23 1.46 20.54-.5 17.5-.5z"/>
        </svg>
      ), 
      name: translations.services_plumbing || 'Plumbing'
    },
    { 
      key: 'electrical', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M14.69 2.21L4.33 11.49c-.64.58-.28 1.65.58 1.73L13 14l-3.64 7.21c-.34.65.2 1.44.92 1.44.28 0 .58-.14.78-.43l10.36-9.28c.64-.58.28-1.65-.58-1.73L11 10l3.64-7.21c.34-.65-.2-1.44-.92-1.44-.28 0-.58.14-.78.43z"/>
        </svg>
      ), 
      name: translations.services_electrical || 'Electrical'
    },
    { 
      key: 'painting', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M18.85 10.39l1.06-1.06c.78-.78.78-2.05 0-2.83L18.5 5.09c-.78-.78-2.05-.78-2.83 0L14.61 6.15l4.24 4.24zM2.81 21.19c-.78.78-.78 2.05 0 2.83.39.39.9.58 1.41.58s1.02-.19 1.41-.58L8.1 21.54 2.46 15.9l-2.65 2.65-.65-2.83zM5.44 14.83l7.07-7.07 4.24 4.24-7.07 7.07z"/>
        </svg>
      ), 
      name: translations.services_painting || 'Painting'
    },
    { 
      key: 'carpentry', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ), 
      name: translations.services_carpentry || 'Carpentry'
    },
    { 
      key: 'cleaning', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ), 
      name: translations.cleaning || 'Cleaning'
    },
    { 
      key: 'housingAssociations', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M1 11h6V9H1v2zm0 4h6v-2H1v2zm0 4h6v-2H1v2zm8-8h14V9H9v2zm0 4h14v-2H9v2zm0 4h14v-2H9v2zM1 3v4h20V3H1z"/>
        </svg>
      ), 
      name: translations.housingAssociations || 'Housing Associations'
    },
    { 
      key: 'moving', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ), 
      name: translations.moving || 'Moving'
    },
    { 
      key: 'allCategories', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
        </svg>
      ), 
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
    <section id="popular-projects" className="section-padding bg-[#F7F5F3] relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="heading-lg text-[#1E293B] mb-6 animate-fade-in-up">
            {translations.popularProjectsTitle || 'Popular projects'}
          </h2>
          <p className="body-lg text-[#64748B] max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {translations.popularProjectsSubtitle || 'Whether you\'re starting a major project or a small task? Post your job and get quotes from relevant businesses and craftsmen - or use the search function to find the right company for you!'}
          </p>
        </div>

        {/* Category Grid - 4x3 layout (4 per row, 3 rows) to match original React version */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {projectCategories.map((category, index) => {
            return (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category.key)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:scale-105 p-4 card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative flex flex-col items-center text-center">
                  {/* Icon Container - smaller gap, larger actual icons - exactly like React original */}
                  <div className="w-20 h-20 mb-1 rounded-xl bg-white flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <div className="text-[#1E293B] w-12 h-12">
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Category Name - single line */}
                  <h3 className="font-bold text-xs text-[#1E293B] whitespace-nowrap">
                    {category.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularProjects;