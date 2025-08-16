import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3, TrendingUp, Clock } from 'lucide-react';

const PopularProjects = ({ translations }) => {
  const navigate = useNavigate();

  const projectCategories = [
    { 
      key: 'handcraft', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ), 
      name: translations.handcraft
    },
    { 
      key: 'bathroom', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M7 7h10v2H7V7zM7 11h10v8c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-8zm2 2v4h6v-4H9z"/>
        </svg>
      ), 
      name: translations.bathroom
    },
    { 
      key: 'automotive', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ), 
      name: translations.automotive
    },
    { 
      key: 'majorProjects', 
      icon: (
        <div className="flex items-center justify-center">
          <span className="text-2xl font-black">XL</span>
        </div>
      ), 
      name: translations.majorProjects
    },
    { 
      key: 'cleaning', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ), 
      name: translations.cleaning
    },
    { 
      key: 'housingAssociations', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M1 11h6V9H1v2zm0 4h6v-2H1v2zm0 4h6v-2H1v2zm8-8h14V9H9v2zm0 4h14v-2H9v2zm0 4h14v-2H9v2zM1 3v4h20V3H1z"/>
        </svg>
      ), 
      name: translations.housingAssociations
    },
    { 
      key: 'moving', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ), 
      name: translations.moving
    },
    { 
      key: 'allCategories', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
        </svg>
      ), 
      name: translations.allCategories
    }
  ];

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
    <section id="popular-projects" className="section-padding bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-br from-purple-200/15 to-pink-200/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/15 to-indigo-200/15 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full mb-6 animate-fade-in-up">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Most Popular</span>
          </div>
          
          <h2 className="heading-lg text-gray-900 mb-6 animate-fade-in-up text-shadow">
            {translations.popularProjectsTitle}
          </h2>
          <p className="body-lg text-gray-600 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {translations.popularProjectsSubtitle}
          </p>
        </div>

        {/* Enhanced Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {projectCategories.map((category, index) => {
            return (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category.key)}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:scale-105 p-6 card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popularity indicator */}
                {category.popularity === 'High' && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    🔥 Hot
                  </div>
                )}
                
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative flex flex-col items-center text-center">
                  {/* Enhanced Icon Container */}
                  <div className={`w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Category Name */}
                  <h3 className={`font-bold text-base ${category.textColor} group-hover:text-gray-900 mb-2 transition-colors duration-300`}>
                    {category.name}
                  </h3>
                  
                  {/* Call to action hint */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/80 px-3 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      <span>Start now</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Additional CTA section */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Don't see your project type?</h3>
            <p className="text-gray-600 mb-6">We work with professionals across all categories. Post your project and find the right expert!</p>
            <button 
              onClick={() => handleCategoryClick('allCategories')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
              </svg>
              View All Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProjects;