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
          <circle cx="12" cy="8" r="0.5"/>
          <circle cx="15" cy="8" r="0.5"/>
          <circle cx="10" cy="10" r="0.5"/>
          <circle cx="12" cy="10" r="0.5"/>
          <circle cx="14" cy="10" r="0.5"/>
          {/* Water drops */}
          <circle cx="10" cy="17" r="0.8"/>
          <circle cx="12" cy="19" r="0.8"/>
          <circle cx="14" cy="17" r="0.8"/>
          <circle cx="9" cy="20" r="0.6"/>
          <circle cx="15" cy="20" r="0.6"/>
        </svg>
      ), 
      name: translations.bathroom || 'Bathroom' 
    },
    { 
      key: 'automotive', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ), 
      name: translations.automotive || 'Automotive' 
    },
    { 
      key: 'majorProjects', 
      icon: (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-2xl lg:text-3xl font-black">XL</span>
        </div>
      ), 
      name: translations.majorProjects || 'Major Projects' 
    },
    { 
      key: 'cleaning', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          {/* Spray bottle body */}
          <path d="M8 8h6v10c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V8z"/>
          {/* Spray bottle neck */}
          <rect x="10" y="6" width="2" height="2"/>
          {/* Trigger */}
          <path d="M6 10c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v-6H6z"/>
          {/* Spray effect */}
          <circle cx="18" cy="8" r="1"/>
          <circle cx="20" cy="10" r="0.8"/>
          <circle cx="19" cy="12" r="0.6"/>
          <circle cx="21" cy="14" r="0.5"/>
          {/* Sparkles */}
          <path d="M17 6l1 1-1 1-1-1z"/>
          <path d="M22 7l0.5 0.5-0.5 0.5-0.5-0.5z"/>
          <path d="M20 4l0.8 0.8-0.8 0.8-0.8-0.8z"/>
        </svg>
      ), 
      name: translations.cleaning || 'Cleaning' 
    },
    { 
      key: 'housingAssociations', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"/>
        </svg>
      ), 
      name: translations.housingAssociations || 'Housing' 
    },
    { 
      key: 'moving', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ), 
      name: translations.moving || 'Moving' 
    },
    { 
      key: 'allCategories', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
        </svg>
      ), 
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
    <section className="relative bg-[#F7F5F3] py-16 lg:py-20 overflow-hidden">
      {/* Background decoration - exactly like original React version */}
      <div className="absolute inset-0 bg-pattern opacity-40"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/15 to-cyan-400/15 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Content - 60% - Exactly like original React */}
          <div className="md:col-span-3 space-y-8 animate-fade-in-up">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1E293B] leading-tight text-shadow">
              <span className="bg-gradient-to-r from-[#1E293B] via-[#4F46E5] to-[#1E293B] bg-clip-text text-transparent whitespace-nowrap">
                {translations.heroNewTitle || 'Get the Job Done!'}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#64748B] leading-relaxed max-w-2xl font-light">
              {translations.heroNewSubtitle || 'Describe your project and get quotes from trusted professionals. Free and without obligation.'}
            </p>

            {/* Service Categories Grid - 4x2 on desktop (4 per row), 2x4 mobile - LARGER icons and text */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 max-w-3xl">
              {serviceCategories.map((category, index) => {
                return (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryClick(category.key)}
                    className="group inline-flex flex-col items-center gap-3 p-3 cursor-pointer select-none transition-all duration-200 animate-fade-in-up hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Icon with larger size */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/90 shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20">
                      <div className="text-[#1E293B] w-12 h-12 md:w-14 md:h-14">
                        {category.icon}
                      </div>
                    </div>
                    
                    {/* Category name with larger text */}
                    <span className="text-sm md:text-lg font-bold text-[#1E293B] text-center leading-tight group-hover:text-[#4F46E5] transition-colors duration-200">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content - 40% - Hero Image - exactly like original */}
          <div className="md:col-span-2 flex justify-center items-center">
            <div className="relative animate-fade-in-up w-full max-w-sm md:max-w-md lg:max-w-lg" style={{ animationDelay: '0.3s' }}>
              {/* Just the Professional Image - completely clean */}
              <img 
                src="https://customer-assets.emergentagent.com/job_renovate-hub-2/artifacts/zcg02po8_image.png" 
                alt="Professional Craftsman" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;