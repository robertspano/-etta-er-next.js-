'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const BuildNewCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const buildNewServices = [
    {
      id: 'husbygging',
      name: language === 'is' ? 'Húsbyggingar' : 'Husbygging',
      nameNorwegian: 'Husbygging',
      description: language === 'is' 
        ? 'Heildarbygging nýrra íbúðarhúsa frá grunni með faglegum verktökum.'
        : 'Komplett bygging av nye bolighus fra grunnen med profesjonelle entreprenører.',
      professionals: 800,
      averagePrice: language === 'is' ? '25.000.000-80.000.000 kr' : '2.500.000-8.000.000 kr',
      completedJobs: 1200,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Skipulagning', 'Byggingarstig', 'Léttbyggingar', 'Fullnaðarvinna']
        : ['Planlegging', 'Byggefaser', 'Lettbygg', 'Ferdigstillelse']
    },
    // Add more services as needed...
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'All categories', href: '/alle-kategorier' },
    { name: language === 'is' ? 'Byggja nýtt' : 'Build New', href: null }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="text-blue-600 hover:text-blue-800">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-gray-500">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'is' ? 'Byggja nýtt' : 'Build New'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'is'
              ? 'Frá draumahúsinu til nýrra atvinnuhúsnæða. Við höfum byggingaraðila og verkefnastjóra fyrir öll stór verkefni.'
              : 'From dream homes to new commercial buildings. We have builders and project managers for all major projects.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-orange-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">3,500+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Byggingaraðilar' : 'Construction professionals'}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">8,000+</div>
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
            {buildNewServices.map(service => (
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
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>👥 {service.professionals.toLocaleString()} {language === 'is' ? 'fagmenn' : 'professionals'}</span>
                    <span>✅ {service.completedJobs.toLocaleString()} {language === 'is' ? 'verkefni' : 'projects'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {service.averagePrice}
                    </span>
                    <div className="flex gap-2">
                      <Link 
                        href={`/bedriftsok?category=${service.id}`}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn fagmann' : 'Find professional'}
                      </Link>
                      <Link 
                        href={`/post?category=${service.id}`}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        {language === 'is' ? 'Legg út verk' : 'Post job'}
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
      <div className="bg-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Tilbúinn að byrja?' : 'Ready to start?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn byggingarverkefnið þitt og fáðu tilboð frá hæfum byggingaraðilum.'
              : 'Post your construction project and get quotes from qualified builders.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/job-categories"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildNewCategoryPage;