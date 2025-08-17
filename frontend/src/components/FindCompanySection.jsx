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
          {/* Decorative curved arrow - top right */}
          <div className="absolute top-8 right-8 hidden lg:block">
            <svg 
              width="80" 
              height="60" 
              viewBox="0 0 80 60" 
              className="text-orange-300 opacity-60"
            >
              <path 
                d="M15,45 Q35,15 65,25 L58,18 M65,25 L58,32" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M20,35 Q40,20 60,28" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                opacity="0.6"
              />
            </svg>
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