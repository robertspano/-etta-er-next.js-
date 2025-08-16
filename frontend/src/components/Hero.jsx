import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Star, Users, ArrowRight, Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3 } from 'lucide-react';

const Hero = ({ translations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
          <path d="M9 17H7v-7H5v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V7h2v10c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-3h-2v3h-2V7h-2v10H9z"/>
          <circle cx="12" cy="4" r="2"/>
          <path d="M3.5 18.5L5 17l1.5 1.5L5 20L3.5 18.5zM18.5 5.5L20 7l-1.5 1.5L17 7L18.5 5.5z"/>
          <path d="M6 9l1-1 1 1-1 1L6 9zM16 15l1-1 1 1-1 1L16 15z"/>
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
          <path d="M19.36 2.72L20.78 4.14L15.06 9.85C16.13 11.39 16.28 13.24 15.38 14.44L9.06 8.12C10.26 7.22 12.11 7.37 13.65 8.44L19.36 2.72zM5.93 17.57C3.92 15.56 2.69 13.16 2.35 10.92L7.23 8.83L8.12 9.72L9.53 8.31L8.31 7.09L10.92 2.35C13.16 2.69 15.56 3.92 17.57 5.93L5.93 17.57z"/>
          <path d="M15.5 16C15.78 16 16 16.22 16 16.5S15.78 17 15.5 17 15 16.78 15 16.5 15.22 16 15.5 16M17.5 18C17.78 18 18 18.22 18 18.5S17.78 19 17.5 19 17 18.78 17 18.5 17.22 18 17.5 18M19.5 20C19.78 20 20 20.22 20 20.5S19.78 21 19.5 21 19 20.78 19 20.5 19.22 20 19.5 20Z"/>
        </svg>
      ), 
      name: translations.cleaning 
    },
    { 
      key: 'housingAssociations', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M1 11h6V9H1v2zm0 4h6v-2H1v2zm0 4h6v-2H1v2zm8-8h14V9H9v2zm0 4h14v-2H9v2zm0 4h14v-2H9v2zM1 3v4h20V3H1z"/>
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
    // Special routing for Major Projects to XL landing
    if (categoryKey === 'majorProjects') {
      navigate('/xl');
    } else {
      // Navigate to job posting wizard with category in URL path
      navigate(`/post/${categoryKey}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 py-20 lg:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-pattern opacity-40"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/15 to-cyan-400/15 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-16 items-start">
          {/* Left Content - 65% */}
          <div className="md:col-span-3 space-y-10 animate-fade-in-up">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight text-shadow">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                {translations.heroNewTitle}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
              {translations.heroNewSubtitle}
            </p>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="mb-10">
              <div className="relative max-w-lg group">
                <Input
                  type="text"
                  placeholder={translations.heroSearchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-16 pl-7 pr-20 text-lg border-3 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 shadow-lg backdrop-blur-sm bg-white/90 group-hover:shadow-xl transition-all duration-300"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </div>
            </form>

            {/* Service Categories Grid - Clean icon-only style like Mittanbud */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {serviceCategories.map((category, index) => {
                return (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryClick(category.key)}
                    className="group inline-flex flex-col items-center gap-3 p-4 md:p-6 cursor-pointer select-none transition-all duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Icon - larger and navy colored */}
                    <div className="text-[#1B2B5B] group-hover:scale-105 transition-transform duration-200">
                      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                        {category.icon}
                      </div>
                    </div>
                    
                    {/* Label with underline on hover */}
                    <span className="text-sm md:text-base font-medium text-slate-800 group-hover:text-[#1B2B5B] text-center leading-tight transition-all duration-200 relative">
                      {category.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1B2B5B] group-hover:w-full transition-all duration-200"></span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content - 35% - Polaroid Image positioned to the right of ALL left content */}
          <div className="md:col-span-2 flex justify-center md:justify-start mt-12 md:mt-0">
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full shadow-md"></div>
              
              {/* Enhanced Polaroid Card */}
              <div className="bg-white p-7 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 hover:shadow-3xl border border-gray-100">
                {/* Image placeholder */}
                <div className="w-80 h-64 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                  <div className="text-center z-10">
                    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                      <Users className="h-20 w-20 text-blue-600 mx-auto mb-4" />
                      <p className="text-xl font-bold text-gray-700">Trusted Professionals</p>
                    </div>
                  </div>
                </div>
                
                {/* Polaroid bottom text area */}
                <div className="text-center py-3">
                  <div className="flex justify-center items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform duration-200" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 font-bold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text">15,000+ Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;