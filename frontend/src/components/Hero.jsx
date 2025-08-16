import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Star, Users, ArrowRight, Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3 } from 'lucide-react';

const Hero = ({ translations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const serviceCategories = [
    { key: 'handcraft', icon: Hammer, name: translations.handcraft },
    { key: 'bathroom', icon: Droplets, name: translations.bathroom },
    { key: 'automotive', icon: Car, name: translations.automotive },
    { key: 'majorProjects', icon: Building, name: translations.majorProjects },
    { key: 'cleaning', icon: Sparkles, name: translations.cleaning },
    { key: 'housingAssociations', icon: Home, name: translations.housingAssociations },
    { key: 'moving', icon: Truck, name: translations.moving },
    { key: 'allCategories', icon: Grid3X3, name: translations.allCategories }
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

            {/* Service Categories Grid - 4 columns on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {serviceCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryClick(category.key)}
                    className="group flex flex-col items-center p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:scale-105 hover:bg-white animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-4 group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 text-center leading-tight group-hover:text-gray-900">
                      {category.name}
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