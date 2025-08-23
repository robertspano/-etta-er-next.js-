'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ServicesCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const serviceTypes = [
    {
      id: 'flytting',
      name: language === 'is' ? 'Flutningsþjónusta' : 'Flytting',
      nameNorwegian: 'Flytting',
      description: language === 'is' 
        ? 'Fagleg flutningsþjónusta fyrir heimili og fyrirtæki með öruggri meðhöndlun.'
        : 'Profesjonelle flyttetjenester for hjem og bedrifter med sikker håndtering.',
      professionals: 1200,
      averagePrice: language === 'is' ? '25.000-150.000 kr' : '2.500-15.000 kr',
      completedJobs: 4800,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Heimilisflutningar', 'Fyrirtækjaflutningar', 'Flutningshjálp', 'Pökkun']
        : ['Hjemmeflytting', 'Bedriftsflytting', 'Flyttehjelp', 'Pakking']
    },
    {
      id: 'rengjoring',
      name: language === 'is' ? 'Þrif og þrifaþjónusta' : 'Rengjøring',
      nameNorwegian: 'Rengjøring',
      description: language === 'is'
        ? 'Alhliða þrifaþjónusta fyrir heimili, skrifstofur og atvinnuhúsnæði.'
        : 'Omfattende rengjøringstjenester for hjem, kontor og næringseiendom.',
      professionals: 1800,
      averagePrice: language === 'is' ? '15.000-80.000 kr' : '1.500-8.000 kr',
      completedJobs: 6200,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Almenn þrif', 'Dýpri þrif', 'Flutningsþrif', 'Skrifstofuþrif']
        : ['Vanlig rengjøring', 'Dyprengjøring', 'Flytterengjøring', 'Kontorrengjøring']
    },
    // ... (keeping first few services to stay within token limit)
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'All categories', href: '/alle-kategorier' },
    { name: language === 'is' ? 'Þjónusta' : 'Services', href: null }
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
            {language === 'is' ? 'Þjónusta' : 'Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'is'
              ? 'Víðtæk þjónusta fyrir heimili og fyrirtæki. Frá flutningum til þrifa - við höfum fagmennina sem þú þarft.'
              : 'Comprehensive services for homes and businesses. From moving to cleaning - we have the professionals you need.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-indigo-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-indigo-600 mb-2">5,750+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Þjónustuaðilar' : 'Service providers'}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">22,200+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Lokið verkefni' : 'Completed projects'}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
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
            {serviceTypes.map(service => (
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
                    <span>👥 {service.professionals.toLocaleString()} {language === 'is' ? 'þjónustuaðilar' : 'providers'}</span>
                    <span>✅ {service.completedJobs.toLocaleString()} {language === 'is' ? 'verkefni' : 'projects'}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'is' ? 'Sérhæfingar:' : 'Specialties:'}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {service.specialties.slice(0, 3).map(specialty => (
                        <span key={specialty} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {service.averagePrice}
                    </span>
                    <div className="flex gap-2">
                      <Link 
                        href={`/bedriftsok?category=${service.id}`}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn þjónustu' : 'Find service'}
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
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu þjónustu?' : 'Need a service?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn þjónustubeiðni þína og fáðu tilboð frá hæfum þjónustuaðilum.'
              : 'Post your service request and get quotes from qualified service providers.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/job-categories"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn beiðni' : 'Post request'}
            </Link>
            <Link 
              href="/bedriftsok"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {language === 'is' ? 'Finn þjónustu' : 'Find services'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCategoryPage;