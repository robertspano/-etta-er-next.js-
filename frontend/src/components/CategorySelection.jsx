import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const CategorySelection = ({ translations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = [
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
          <span className="text-2xl font-black text-[#1B2B5B]">XL</span>
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
    // Special routing for Major Projects to category overview
    if (categoryKey === 'majorProjects') {
      navigate('/major-projects');
    } else {
      // Navigate to job posting wizard with category in URL path
      navigate(`/post/${categoryKey}`);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-8">
            {translations.categorySelectionTitle}
          </h1>
          
          {/* Search Input */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="relative max-w-lg mx-auto group">
              <Input
                type="text"
                placeholder={translations.categorySelectionSearchPlaceholder}
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
        </div>

        {/* Category Grid - 2 rows × 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => {
            return (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category.key)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:scale-105 p-6 cursor-pointer select-none animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className="w-16 h-16 mb-4 rounded-xl bg-white flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <div className="text-[#1B2B5B] w-10 h-10">
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Category Name */}
                  <h3 className="font-bold text-sm text-[#1B2B5B] whitespace-nowrap">
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

export default CategorySelection;