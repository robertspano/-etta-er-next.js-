import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Star, Users, CheckCircle } from 'lucide-react';
import apiService from '../services/api';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Search, Star, Users, CheckCircle, Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3 } from 'lucide-react';

const Hero = ({ translations }) => {
  const [searchQuery, setSearchQuery] = useState('');

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
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Content - 60% */}
          <div className="md:col-span-3 space-y-6">
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {translations.heroNewTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {translations.heroNewSubtitle}
            </p>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={translations.heroSearchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </form>

            {/* Service Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {serviceCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryClick(category.key)}
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 hover:border-blue-200"
                  >
                    <IconComponent className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content - 40% - Polaroid Image */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <div className="relative">
              {/* Polaroid Card */}
              <div className="bg-white p-4 rounded-lg shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                {/* Image placeholder */}
                <div className="w-64 h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Trusted Professionals</p>
                  </div>
                </div>
                
                {/* Polaroid bottom text area */}
                <div className="text-center">
                  <div className="flex justify-center items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">15,000+ Happy Customers</p>
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