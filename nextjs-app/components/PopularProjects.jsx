'use client';

import React from 'react';
import Link from 'next/link';

const PopularProjects = ({ translations }) => {
  // Popular project buttons that match Mittanbud's style
  const popularProjects = [
    { name: 'Plumber', href: '/categories/handcraft', count: '2,800+' },
    { name: 'Electrician', href: '/categories/handcraft', count: '2,100+' },
    { name: 'Auto Shop', href: '/categories/services', count: '1,900+' },
    { name: 'Contractors', href: '/categories/build-new', count: '1,600+' },
    { name: 'Painter', href: '/categories/handcraft', count: '1,400+' },
    { name: 'Moving Company', href: '/post/moving', count: '1,200+' },
    { name: 'Carpenter', href: '/categories/handcraft', count: '900+' },
    { name: 'Cleaning', href: '/post/cleaning', count: '800+' },
    { name: 'Bathroom Renovation', href: '/categories/interior-renovation', count: '750+' },
    { name: 'Housing Associations', href: '/post/housing-associations', count: '600+' },
    { name: 'Major Projects', href: '/xl', count: '450+' },
    { name: 'All Categories', href: '/all-categories', count: '' }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popular projects
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Whether you're starting a major project or a small task? Post your job and get quotes from relevant businesses and craftsmen - or use the search function to find the right company for you!
          </p>
        </div>

        {/* Popular project buttons - Mittanbud style */}
        <div className="flex flex-wrap gap-3 justify-center">
          {popularProjects.map((project, index) => (
            <Link
              key={index}
              href={project.href}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {project.name}
              {project.count && (
                <span className="text-gray-500">({project.count})</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProjects;