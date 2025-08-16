import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const MajorProjectsOverview = ({ translations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Category groups with their items
  const categoryGroups = [
    {
      title: translations.houseAndGarden,
      items: [
        { name: 'Garden Maintenance', slug: 'garden-maintenance' },
        { name: 'Landscaping', slug: 'landscaping' },
        { name: 'Exterior Painting', slug: 'exterior-painting' },
        { name: 'Roofing', slug: 'roofing' },
        { name: 'Windows & Doors', slug: 'windows-doors' },
        { name: 'Driveway & Paving', slug: 'driveway-paving' }
      ]
    },
    {
      title: translations.services,
      items: [
        { name: translations.cleaning, slug: 'cleaning' },
        { name: translations.moving, slug: 'moving' },
        { name: 'Security Systems', slug: 'security-systems' },
        { name: 'Solar Installation', slug: 'solar-installation' },
        { name: 'Pool Maintenance', slug: 'pool-maintenance' },
        { name: 'Waste Removal', slug: 'waste-removal' }
      ]
    },
    {
      title: translations.indoorRenovations,
      items: [
        { name: translations.bathroom, slug: 'bathroom' },
        { name: 'Kitchen Renovation', slug: 'kitchen-renovation' },
        { name: 'Flooring', slug: 'flooring' },
        { name: 'Interior Painting', slug: 'interior-painting' },
        { name: 'Electrical Work', slug: 'electrical' },
        { name: 'Plumbing', slug: 'plumbing' }
      ]
    },
    {
      title: translations.buildNew,
      items: [
        { name: 'New Construction', slug: 'new-construction' },
        { name: 'Extensions', slug: 'extensions' },
        { name: 'Garage Construction', slug: 'garage-construction' },
        { name: 'Deck Building', slug: 'deck-building' },
        { name: 'Shed Construction', slug: 'shed-construction' },
        { name: 'Basement Finishing', slug: 'basement-finishing' }
      ]
    },
    {
      title: translations.housingAssociations,
      items: [
        { name: 'Building Management', slug: 'building-management' },
        { name: 'Common Area Maintenance', slug: 'common-area-maintenance' },
        { name: 'Structural Repairs', slug: 'structural-repairs' },
        { name: 'HVAC Systems', slug: 'hvac-systems' },
        { name: 'Fire Safety', slug: 'fire-safety' },
        { name: 'Energy Efficiency', slug: 'energy-efficiency' }
      ]
    },
    {
      title: translations.trades,
      items: [
        { name: translations.handcraft, slug: 'handcraft' },
        { name: translations.automotive, slug: 'automotive' },
        { name: 'Carpentry', slug: 'carpentry' },
        { name: 'Masonry', slug: 'masonry' },
        { name: 'Welding', slug: 'welding' },
        { name: 'HVAC', slug: 'hvac' }
      ]
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search query:', searchQuery);
  };

  const handleCategoryClick = (slug) => {
    // Special routing for automotive
    if (slug === 'automotive') {
      navigate('/post/automotive');
    } else {
      // Navigate to job posting wizard with category
      navigate(`/post/${slug}`);
    }
  };

  const handleMajorProjectsXL = () => {
    // Go to the XL landing page
    navigate('/xl');
  };

  // Filter categories based on search
  const filteredGroups = categoryGroups.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            {translations.majorProjectsTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {translations.majorProjectsSubtitle}
          </p>
          
          {/* Search Input */}
          <form onSubmit={handleSearch}>
            <div className="relative max-w-lg mx-auto group">
              <Input
                type="text"
                placeholder={translations.majorProjectsSearchPlaceholder}
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

        {/* Category Groups */}
        <div className="space-y-12">
          {filteredGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
                {group.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => handleCategoryClick(item.slug)}
                    className="text-left p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200 group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Major Projects XL Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-lg border border-indigo-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {translations.majorProjectsXL}
              </h2>
              <p className="text-gray-600 mb-6">
                For the biggest construction and renovation projects
              </p>
              <Button
                onClick={handleMajorProjectsXL}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Explore XL Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MajorProjectsOverview;