import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hammer, Droplets, Car, Building, Sparkles, Home, Truck, Grid3X3 } from 'lucide-react';

const PopularProjects = ({ translations }) => {
  const navigate = useNavigate();

  // Using the same categories as Hero but without the "All Categories" for the main grid
  const projectCategories = [
    { key: 'handcraft', icon: Hammer, name: translations.handcraft },
    { key: 'bathroom', icon: Droplets, name: translations.bathroom },
    { key: 'automotive', icon: Car, name: translations.automotive },
    { key: 'majorProjects', icon: Building, name: translations.majorProjects },
    { key: 'cleaning', icon: Sparkles, name: translations.cleaning },
    { key: 'housingAssociations', icon: Home, name: translations.housingAssociations },
    { key: 'moving', icon: Truck, name: translations.moving },
    { key: 'allCategories', icon: Grid3X3, name: translations.allCategories }
  ];

  const handleCategoryClick = (categoryKey) => {
    // Navigate to job posting wizard with category in URL path
    navigate(`/post/${categoryKey}`);
  };

  return (
    <section id="popular-projects" className="py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {translations.popularProjectsTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {translations.popularProjectsSubtitle}
          </p>
        </div>

        {/* Category Grid - Desktop: 4 columns, Tablet: 3 columns, Mobile: 2 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {projectCategories.map((category) => {
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
    </section>
  );
};

export default PopularProjects;