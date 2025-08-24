'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Star, Users, ArrowRight, Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3 } from 'lucide-react';
import Image from 'next/image';

const Hero = ({ translations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const serviceCategories = [
    { 
      key: 'handcraft', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ), 
      name: translations.handcraft 
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
      name: translations.bathroom 
    },
    { 
      key: 'automotive', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ), 
      name: translations.automotive 
    },
    { 
      key: 'majorProjects', 
      icon: (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-2xl lg:text-3xl font-black">XL</span>
        </div>
      ), 
      name: translations.majorProjects 
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
      name: translations.cleaning 
    },
    { 
      key: 'housingAssociations', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"/>
        </svg>
      ), 
      name: translations.housingAssociations 
    },
    { 
      key: 'moving', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ), 
      name: translations.moving 
    },
    { 
      key: 'allCategories', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
        </svg>
      ), 
      name: translations.allCategories 
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search query:', searchQuery);
  };

  const handleCategoryClick = (categoryKey) => {
    // Special routing for specific categories
    if (categoryKey === 'allCategories') {
      router.push('/all-categories');
    } else if (categoryKey === 'majorProjects') {
      router.push('/xl');
    } else if (categoryKey === 'housingAssociations') {
      // Route to housing associations category grid
      router.push('/post/housing-associations');
    } else if (categoryKey === 'cleaning') {
      // Route to cleaning subcategory picker
      router.push('/post/cleaning');
    } else {
      // Navigate to job posting wizard with category in URL path
      router.push(`/post/${categoryKey}`);
    }
  };

  return (
    <section className="relative bg-white py-12 lg:py-16">
      {/* Clean background like Mittanbud */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-slate-50/40"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Clean and focused like Mittanbud */}
          <div className="space-y-8">
            {/* Title - Strong and clear like Mittanbud */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Få jobben gjort!
            </h1>
            
            {/* Subtitle - Direct and clear messaging */}
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
              Beskriv jobben og <strong>motta tilbud fra dyktige fagfolk.</strong> Gratis og uforpliktende.
            </p>

            {/* Search Input - Larger and more prominent like Mittanbud */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Hva trenger du hjelp til?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-6 pr-16 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm bg-white transition-all duration-200 w-full"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-2 top-2 h-10 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Category Grid - Clean 2x4 layout like Mittanbud */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-2xl">
              {serviceCategories.map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => handleCategoryClick(category.key)}
                  className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center min-h-[100px] flex flex-col items-center justify-center gap-2"
                >
                  {/* Icon */}
                  <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Label */}
                  <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 text-center leading-tight transition-colors duration-200">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Professional image like Mittanbud */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Image with subtle styling */}
              <Image 
                src="https://customer-assets.emergentagent.com/job_renovate-hub-2/artifacts/zcg02po8_image.png" 
                alt="Professional Craftsman" 
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;