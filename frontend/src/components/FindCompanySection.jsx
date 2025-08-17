import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Wrench } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const FindCompanySection = ({ translations, language }) => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  // List of available categories for search suggestions
  const categories = [
    { key: 'plumbing', label: translations.plumbing || 'Plumbing' },
    { key: 'electrical', label: translations.electrical || 'Electrical' },
    { key: 'handcraft', label: translations.handcraft || 'Handcraft' },
    { key: 'bathroom', label: translations.bathroom || 'Bathroom' },
    { key: 'kitchen', label: translations.kitchen || 'Kitchen' },
    { key: 'painting', label: translations.painting || 'Painting' },
    { key: 'flooring', label: translations.flooring || 'Flooring' },
    { key: 'roofing', label: translations.roofing || 'Roofing' },
    { key: 'landscaping', label: translations.landscaping || 'Landscaping' },
    { key: 'cleaning', label: translations.cleaning || 'Cleaning' },
    { key: 'automotive', label: translations.automotive || 'Automotive' },
    { key: 'carpentry', label: translations.carpentry || 'Carpentry' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Navigate to professionals/search page with query parameters
    const searchParams = new URLSearchParams();
    if (category.trim()) {
      searchParams.set('q', category.trim());
    }
    if (location.trim()) {
      searchParams.set('location', location.trim());
    }
    
    // For now, we'll navigate to the professionals dashboard or create a search results page
    // Since we don't have a dedicated search page yet, we'll log the search and show a placeholder
    console.log('Searching for:', { category, location });
    
    // You can implement this to navigate to a search results page
    // navigate(`/professionals/search?${searchParams.toString()}`);
    
    // For now, let's navigate to the main page with search params (can be enhanced later)
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Main beige panel matching Mittanbud exactly */}
        <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 rounded-3xl shadow-lg overflow-hidden">
          {/* Enhanced decorative elements matching Mittanbud */}
          <div className="absolute top-6 right-6 hidden lg:block">
            {/* Curved arrow decoration */}
            <svg 
              width="100" 
              height="80" 
              viewBox="0 0 100 80" 
              className="text-orange-300 opacity-40"
            >
              <path 
                d="M20,55 Q45,25 80,35 L72,28 M80,35 L72,42" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M25,45 Q50,30 75,38" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Abstract background pattern */}
          <div className="absolute bottom-0 right-0 opacity-20">
            <svg width="200" height="120" viewBox="0 0 200 120" className="text-green-400">
              <path d="M0,120 Q50,80 100,90 Q150,100 200,75 L200,120 Z" fill="currentColor" />
            </svg>
          </div>
          
          {/* Small decorative dots */}
          <div className="absolute top-12 left-12 opacity-30">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
          <div className="absolute top-20 left-20 opacity-20">
            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
          </div>
          <div className="absolute bottom-12 left-16 opacity-25">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center p-8 lg:p-16">
            {/* Left side - Headlines */}
            <div className="space-y-6 lg:pr-8">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  {translations.findCompanyHeadline || "Find the right company for your project!"}
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  {translations.findCompanySubtitle || "Search for businesses and craftsmen in your area, make contact and get a quote."}
                </p>
              </div>
            </div>

            {/* Right side - Search form */}
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                {/* Single row with inputs and button - Mittanbud style */}
                <div className="bg-white rounded-xl shadow-md p-2 lg:p-3">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-3 items-center">
                    {/* Category input - takes 4 columns */}
                    <div className="relative lg:col-span-4">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Wrench className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder={translations.findCompanyWhatHelp || "What do you need help with?"}
                        className="w-full pl-10 pr-3 py-3 lg:py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-sm lg:text-base"
                        list="categories-list"
                      />
                      {/* Datalist for category suggestions */}
                      <datalist id="categories-list">
                        {categories.map((cat) => (
                          <option key={cat.key} value={cat.label} />
                        ))}
                      </datalist>
                    </div>

                    {/* Location input - takes 4 columns */}
                    <div className="relative lg:col-span-4">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={translations.findCompanyWhereJob || "Where should the job be done?"}
                        className="w-full pl-10 pr-3 py-3 lg:py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-sm lg:text-base"
                      />
                    </div>

                    {/* Search button - takes 4 columns */}
                    <div className="lg:col-span-4">
                      <Button
                        type="submit"
                        className="w-full px-4 lg:px-6 py-3 lg:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-sm lg:text-base"
                        size="lg"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        {translations.findCompanyButton || "Find company"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindCompanySection;