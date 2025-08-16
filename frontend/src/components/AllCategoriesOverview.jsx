import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const AllCategoriesOverview = ({ translations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Category groups exactly like Mittanbud
  const categoryGroups = [
    {
      title: "House & Garden",
      titleIS: "Hús og Garður",
      items: [
        { name: 'Garden Maintenance', nameIS: 'Garðviðhald', slug: 'garden-maintenance' },
        { name: 'Landscaping', nameIS: 'Landslagsarkitektúr', slug: 'landscaping' },
        { name: 'Exterior Painting', nameIS: 'Utanmálun', slug: 'exterior-painting' },  
        { name: 'Roofing', nameIS: 'Þakvinnu', slug: 'roofing' },
        { name: 'Windows & Doors', nameIS: 'Gluggar og Hurðir', slug: 'windows-doors' },
        { name: 'Driveway & Paving', nameIS: 'Innkeyrsla og Hellulagnir', slug: 'driveway-paving' },
        { name: 'Fencing', nameIS: 'Girðingavinna', slug: 'fencing' },
        { name: 'Outdoor Structures', nameIS: 'Utanhúsmannvirki', slug: 'outdoor-structures' }
      ]
    },
    {
      title: "Services",
      titleIS: "Þjónustur", 
      items: [
        { name: translations.cleaning, nameIS: translations.cleaning, slug: 'cleaning' },
        { name: translations.moving, nameIS: translations.moving, slug: 'moving' },
        { name: 'Security Systems', nameIS: 'Öryggiskerfi', slug: 'security-systems' },
        { name: 'Solar Installation', nameIS: 'Sólarkerfi', slug: 'solar-installation' },
        { name: 'Pool Maintenance', nameIS: 'Sundlaugaviðhald', slug: 'pool-maintenance' },
        { name: 'Waste Removal', nameIS: 'Ruslaflutningur', slug: 'waste-removal' },
        { name: 'Event Planning', nameIS: 'Viðburðaskipulag', slug: 'event-planning' },
        { name: 'Pet Services', nameIS: 'Gæludýraþjónusta', slug: 'pet-services' }
      ]
    },
    {
      title: "Indoor Renovations",
      titleIS: "Innandyra Endurbætur",
      items: [
        { name: translations.bathroom, nameIS: translations.bathroom, slug: 'bathroom' },
        { name: 'Kitchen Renovation', nameIS: 'Eldhúsuppgerð', slug: 'kitchen-renovation' },
        { name: 'Flooring', nameIS: 'Gólfefni', slug: 'flooring' },
        { name: 'Interior Painting', nameIS: 'Innimálun', slug: 'interior-painting' },
        { name: 'Electrical Work', nameIS: 'Rafmagnsvinnu', slug: 'electrical' },
        { name: 'Plumbing', nameIS: 'Pípulagningar', slug: 'plumbing' },
        { name: 'Tile Work', nameIS: 'Flísavinnu', slug: 'tile-work' },
        { name: 'Ceiling Work', nameIS: 'Loftavinnu', slug: 'ceiling-work' }
      ]
    },
    {
      title: "Build New",
      titleIS: "Byggja Nýtt",
      items: [
        { name: 'New Construction', nameIS: 'Nýbygging', slug: 'new-construction' },
        { name: 'Extensions', nameIS: 'Viðbyggingar', slug: 'extensions' },
        { name: 'Garage Construction', nameIS: 'Bílskúrsbygging', slug: 'garage-construction' },
        { name: 'Deck Building', nameIS: 'Verandubygging', slug: 'deck-building' },
        { name: 'Shed Construction', nameIS: 'Geymsluhúsabygging', slug: 'shed-construction' },
        { name: 'Basement Finishing', nameIS: 'Kjallararvinnu', slug: 'basement-finishing' },
        { name: 'Attic Conversion', nameIS: 'Risuppgerð', slug: 'attic-conversion' },
        { name: 'Custom Carpentry', nameIS: 'Sérhannað Trésmíði', slug: 'custom-carpentry' }
      ]
    },
    {
      title: translations.housingAssociations,
      titleIS: translations.housingAssociations,
      items: [
        { name: 'Building Management', nameIS: 'Hússtjórnun', slug: 'building-management' },
        { name: 'Common Area Maintenance', nameIS: 'Sameignarviðhald', slug: 'common-area-maintenance' },
        { name: 'Structural Repairs', nameIS: 'Burðarvirki Viðgerðir', slug: 'structural-repairs' },
        { name: 'HVAC Systems', nameIS: 'Loftræstikerfi', slug: 'hvac-systems' },
        { name: 'Fire Safety', nameIS: 'Brunarvarnir', slug: 'fire-safety' },
        { name: 'Energy Efficiency', nameIS: 'Orkunýtni', slug: 'energy-efficiency' },
        { name: 'Elevator Maintenance', nameIS: 'Lyftuviðhald', slug: 'elevator-maintenance' },
        { name: 'Snow Removal', nameIS: 'Snjómokstri', slug: 'snow-removal' }
      ]
    },
    {
      title: "Trades",
      titleIS: "Handverk",
      items: [
        { name: translations.handcraft, nameIS: translations.handcraft, slug: 'handcraft' },
        { name: translations.automotive, nameIS: translations.automotive, slug: 'automotive' },
        { name: 'Carpentry', nameIS: 'Trésmíði', slug: 'carpentry' },
        { name: 'Masonry', nameIS: 'Múrvinnu', slug: 'masonry' },
        { name: 'Welding', nameIS: 'Suðuvinnu', slug: 'welding' },
        { name: 'HVAC', nameIS: 'Loftræsting', slug: 'hvac' },
        { name: 'Locksmith', nameIS: 'Lásmíði', slug: 'locksmith' },
        { name: 'Glazing', nameIS: 'Glervinnu', slug: 'glazing' }
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
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameIS.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            {translations.allCategories}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find the right professional for any project
          </p>
          
          {/* Search Input */}
          <form onSubmit={handleSearch}>
            <div className="relative max-w-lg mx-auto group">
              <Input
                type="text"
                placeholder="Search for a category..."
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
                {group.titleIS}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => handleCategoryClick(item.slug)}
                    className="text-left p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200 group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                      {item.nameIS}
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
                {translations.majorProjects}
              </h2>
              <p className="text-gray-600 mb-6">
                Fyrir stærstu byggingarverkefnin og endurbætur
              </p>
              <Button
                onClick={handleMajorProjectsXL}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Skoða XL Verkefni
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllCategoriesOverview;