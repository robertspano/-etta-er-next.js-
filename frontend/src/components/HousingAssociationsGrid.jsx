import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Home, DoorOpen, Building, Balcony, Brick, Droplets, Bath, Zap, TreePine, Wrench, Plug, Paintbrush, Hammer, Sparkles, Truck, Grid3X3 } from 'lucide-react';

const HousingAssociationsGrid = ({ translations, language }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      key: 'roof',
      icon: <Home className="w-8 h-8" />,
      name: 'Tak',
      route: '/post/roof'
    },
    {
      key: 'windowsDoors',
      icon: <DoorOpen className="w-8 h-8" />,
      name: 'Vindu og dør', 
      route: '/post/windows-doors'
    },
    {
      key: 'facade',
      icon: <Building className="w-8 h-8" />,
      name: 'Fasade',
      route: '/post/facade'
    },
    {
      key: 'balcony',
      icon: <Balcony className="w-8 h-8" />,
      name: 'Balkong',
      route: '/post/balcony'
    },
    {
      key: 'masonry',
      icon: <Brick className="w-8 h-8" />,
      name: 'Murer',
      route: '/post/masonry'
    },
    {
      key: 'drainageInsulation',
      icon: <Droplets className="w-8 h-8" />,
      name: 'Drenering og isolering',
      route: '/post/drainage-insulation'
    },
    {
      key: 'bathroomRenovation',
      icon: <Bath className="w-8 h-8" />,
      name: 'Pusse opp bad',
      route: '/post/bathroom'
    },
    {
      key: 'evCharger',
      icon: <Zap className="w-8 h-8" />,
      name: 'Elbillader',
      route: '/post/ev-charger'
    },
    {
      key: 'landscaper',
      icon: <TreePine className="w-8 h-8" />,
      name: 'Anleggsgartner',
      route: '/post/landscaping'
    },
    {
      key: 'plumber',
      icon: <Wrench className="w-8 h-8" />,
      name: 'Rørlegger',
      route: '/post/plumbing'
    },
    {
      key: 'electrician',
      icon: <Plug className="w-8 h-8" />,
      name: 'Elektriker',
      route: '/post/electrical'
    },
    {
      key: 'painter',
      icon: <Paintbrush className="w-8 h-8" />,
      name: 'Maler',
      route: '/post/painting'
    },
    {
      key: 'carpenter',
      icon: <Hammer className="w-8 h-8" />,
      name: 'Snekker',
      route: '/post/carpentry'
    },
    {
      key: 'cleaning',
      icon: <Sparkles className="w-8 h-8" />,
      name: 'Rengjøring',
      route: '/post/cleaning'
    },
    {
      key: 'movingTransport',
      icon: <Truck className="w-8 h-8" />,
      name: 'Flytting og transport',
      route: '/post/moving'
    },
    {
      key: 'allCategories',
      icon: <Grid3X3 className="w-8 h-8" />,
      name: 'Andre kategorier',
      route: '/all-categories'
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(category.route);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Could implement search functionality here
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {translations.housingAssociationsTitle || "Choose a category to post your job — completely free"}
          </h1>
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={translations.housingAssociationsSearchPlaceholder || "What do you need help with?"}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-14"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredCategories.map((category, index) => (
            <button
              key={category.key}
              onClick={() => handleCategoryClick(category)}
              className="bg-white p-6 lg:p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-center group"
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className="text-[#1B2B5B] group-hover:text-blue-600 transition-colors">
                  {category.icon}
                </div>
              </div>
              
              {/* Category Name */}
              <h3 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors text-sm lg:text-base">
                {category.name}
              </h3>
            </button>
          ))}
        </div>

        {/* No results message */}
        {searchQuery && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {translations.noResultsFound || "No categories found matching your search."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HousingAssociationsGrid;