import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3, TrendingUp, Clock } from 'lucide-react';

const PopularProjects = ({ translations }) => {
  const navigate = useNavigate();

  // Enhanced categories with additional metadata
  const projectCategories = [
    { 
      key: 'handcraft', 
      icon: Hammer, 
      name: translations.handcraft,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
      textColor: 'text-amber-700',
      popularity: 'High'
    },
    { 
      key: 'bathroom', 
      icon: Droplets, 
      name: translations.bathroom,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-700',
      popularity: 'High'
    },
    { 
      key: 'automotive', 
      icon: Car, 
      name: translations.automotive,
      color: 'from-gray-600 to-gray-700',
      bgColor: 'from-gray-50 to-slate-50',
      textColor: 'text-gray-700',
      popularity: 'Medium'
    },
    { 
      key: 'majorProjects', 
      icon: Building, 
      name: translations.majorProjects,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-50',
      textColor: 'text-indigo-700',
      popularity: 'Medium'
    },
    { 
      key: 'cleaning', 
      icon: Sparkles, 
      name: translations.cleaning,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      textColor: 'text-green-700',
      popularity: 'High'
    },
    { 
      key: 'housingAssociations', 
      icon: Home, 
      name: translations.housingAssociations,
      color: 'from-rose-500 to-pink-500',
      bgColor: 'from-rose-50 to-pink-50',
      textColor: 'text-rose-700',
      popularity: 'Low'
    },
    { 
      key: 'moving', 
      icon: Truck, 
      name: translations.moving,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'from-violet-50 to-purple-50',
      textColor: 'text-violet-700',
      popularity: 'Medium'
    },
    { 
      key: 'allCategories', 
      icon: Grid3X3, 
      name: translations.allCategories,
      color: 'from-slate-600 to-gray-600',
      bgColor: 'from-slate-50 to-gray-50',
      textColor: 'text-slate-700',
      popularity: 'All'
    }
  ];

  const handleCategoryClick = (categoryKey) => {
    // Navigate to job posting wizard with category in URL path
    navigate(`/post/${categoryKey}`);
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
            const IconComponent = category.icon;
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
                    <IconComponent className="h-8 w-8 text-white" />
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
              <Grid3X3 className="h-5 w-5" />
              View All Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProjects;