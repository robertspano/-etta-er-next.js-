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
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main beige panel matching Mittanbud exactly */}
        <div className="bg-yellow-50 rounded-2xl shadow-lg p-8 lg:p-12 relative overflow-hidden">
          {/* Decorative curved arrow - top right */}
          <div className="absolute top-6 right-8 hidden lg:block">
            <svg 
              width="60" 
              height="40" 
              viewBox="0 0 60 40" 
              className="text-blue-600 opacity-80"
              fill="currentColor"
            >
              <path d="M10,30 Q30,10 50,20 L45,15 M50,20 L45,25" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Headlines */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  {translations.findCompanyHeadline || "Finn riktig bedrift til ditt prosjekt!"}
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  {translations.findCompanySubtitle || "Søk etter bedrifter og håndverkere i ditt område, ta kontakt og få et tilbud."}
                </p>
              </div>
            </div>

            {/* Right side - Search form */}
            <div className="w-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Search inputs container */}
                <div className="bg-white rounded-lg shadow-md p-2 space-y-2 lg:space-y-0 lg:flex lg:gap-2">
                  {/* Category input */}
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder={translations.findCompanyWhatHelp || "Hva trenger du hjelp med?"}
                      className="w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0 rounded-md"
                      list="categories-list"
                    />
                    {/* Datalist for category suggestions */}
                    <datalist id="categories-list">
                      {categories.map((cat) => (
                        <option key={cat.key} value={cat.label} />
                      ))}
                    </datalist>
                  </div>

                  {/* Separator line on desktop */}
                  <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2"></div>

                  {/* Location input */}
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={translations.findCompanyWhereJob || "Hvor skal jobben gjøres?"}
                      className="w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0 rounded-md"
                    />
                  </div>
                </div>

                {/* Search button */}
                <Button
                  type="submit"
                  className="w-full lg:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                  size="lg"
                >
                  {translations.findCompanyButton || "Finn bedrift"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindCompanySection;