'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const InteriorRenovationCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const interiorServices = [
    {
      id: 'baderomsrenovering',
      name: language === 'is' ? 'Baðherbergisendurnýjun' : 'Baderomsrenovering',
      nameNorwegian: 'Baderomsrenovering',
      description: language === 'is' 
        ? 'Heildarendurnýjun baðherbergja með nútímalegum búnaði og hönnun.'
        : 'Komplette baderenovasjoner med moderne utstyr og design.',
      professionals: 1400,
      averagePrice: language === 'is' ? '800.000-2.500.000 kr' : '50.000-150.000 kr',
      completedJobs: 5600,
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Flísavinna', 'Pípulagnir', 'Rafmagn', 'Hönnun']
        : ['Flisarbeid', 'Rørlegger', 'Elektriker', 'Design']
    },
    // Add more services...
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'All categories', href: '/alle-kategorier' },
    { name: language === 'is' ? 'Innri endurbætur' : 'Interior Renovation', href: null }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'is' ? 'Innri endurbætur' : 'Interior Renovation'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'is'
              ? 'Umbreyttu heimilinu þínu með faglegum innri endurbótum. Frá baðherbergjum til eldhúsa - við höfum sérfræðingana fyrir þig.'
              : 'Transform your home with professional interior renovations. From bathrooms to kitchens - we have the specialists for you.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">6,600+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Skráðir sérfræðingar' : 'Registered specialists'}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">32,300+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Lokið verkefni' : 'Completed projects'}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Meðaleinkunn' : 'Average rating'}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Veldu þjónustu' : 'Select service'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interiorServices.map(service => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => setSelectedService(service)}
              >
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {service.averagePrice}
                    </span>
                    <div className="flex gap-2">
                      <Link 
                        href={`/bedriftsok?category=${service.id}`}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn sérfræðing' : 'Find specialist'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Tilbúinn að byrja?' : 'Ready to start?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn endurbótaverkefnið þitt og fáðu tilboð frá hæfum sérfræðingum.'
              : 'Post your renovation project and get quotes from qualified specialists.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteriorRenovationCategoryPage;