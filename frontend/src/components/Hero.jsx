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
    // Handle category selection
    console.log('Category selected:', categoryKey);
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-16 items-start">
          {/* Left Content - 65% */}
          <div className="md:col-span-3 space-y-8">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {translations.heroNewTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              {translations.heroNewSubtitle}
            </p>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-lg">
                <Input
                  type="text"
                  placeholder={translations.heroSearchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-6 pr-16 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 p-0"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </form>

            {/* Service Categories Grid - 4 columns on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {serviceCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryClick(category.key)}
                    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200 hover:scale-105"
                  >
                    <IconComponent className="h-7 w-7 text-blue-600 mb-3" />
                    <span className="text-sm font-medium text-gray-800 text-center leading-tight">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content - 35% - Polaroid Image positioned to the right of ALL left content */}
          <div className="md:col-span-2 flex justify-center md:justify-start mt-8 md:mt-0">
            <div className="relative">
              {/* Polaroid Card */}
              <div className="bg-white p-6 rounded-xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                {/* Image placeholder */}
                <div className="w-72 h-56 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-16 w-16 text-blue-600 mx-auto mb-3" />
                    <p className="text-lg font-semibold text-gray-700">Trusted Professionals</p>
                  </div>
                </div>
                
                {/* Polaroid bottom text area */}
                <div className="text-center py-2">
                  <div className="flex justify-center items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-base text-gray-700 font-medium">15,000+ Happy Customers</p>
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