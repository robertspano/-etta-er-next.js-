'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const AutomotivePage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const automotiveServices = [
    {
      id: 'car-repair',
      name: language === 'is' ? 'Bílaviðgerðir' : 'Car Repairs',
      description: language === 'is' 
        ? 'Fagleg bílaviðgerð og viðhald fyrir öll bílamerki og gerðir.'
        : 'Professional car repair and maintenance for all car brands and models.',
      price: language === 'is' ? '8.000-25.000 kr' : '500-1500 kr/hour',
      icon: '🔧',
      professionals: 450,
      completedJobs: 2800
    },
    {
      id: 'tire-service',
      name: language === 'is' ? 'Dekkjaþjónusta' : 'Tire Service',
      description: language === 'is'
        ? 'Dekkjaskipti, hjólastillingar og dekkjaviðgerðir.'
        : 'Tire changes, wheel alignments and tire repairs.',
      price: language === 'is' ? '3.000-15.000 kr' : '200-800 kr/hour',
      icon: '🛞',
      professionals: 280,
      completedJobs: 4200
    },
    {
      id: 'car-wash',
      name: language === 'is' ? 'Bílaþvottur' : 'Car Wash',
      description: language === 'is'
        ? 'Faglegur bílaþvottur og bílahreinsun innan og utan.'
        : 'Professional car wash and cleaning services inside and out.',
      price: language === 'is' ? '2.500-8.000 kr' : '150-500 kr/hour',
      icon: '🧽',
      professionals: 180,
      completedJobs: 6500
    },
    {
      id: 'car-painting',
      name: language === 'is' ? 'Bílamálun' : 'Car Painting',
      description: language === 'is'
        ? 'Bílamálun, lakkeringar og skemmdarviðgerðir.'
        : 'Car painting, lacquering and damage repairs.',
      price: language === 'is' ? '25.000-150.000 kr' : '1000-2500 kr/hour',
      icon: '🎨',
      professionals: 95,
      completedJobs: 850
    },
    {
      id: 'car-inspection',
      name: language === 'is' ? 'Bílaskoðun' : 'Car Inspection',
      description: language === 'is'
        ? 'Opinber bílaskoðun og bilunargreining.'
        : 'Official car inspection and diagnostics.',
      price: language === 'is' ? '4.000-12.000 kr' : '300-800 kr/hour',
      icon: '📋',
      professionals: 320,
      completedJobs: 8900
    },
    {
      id: 'car-towing',
      name: language === 'is' ? 'Bíladráttarþjónusta' : 'Car Towing',
      description: language === 'is'
        ? 'Bíladráttarþjónusta og neyðarhjálp á vegum.'
        : 'Car towing service and roadside assistance.',
      price: language === 'is' ? '8.000-25.000 kr' : '500-1200 kr/hour',
      icon: '🚛',
      professionals: 150,
      completedJobs: 3200
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'is' ? 'Bílaþjónusta' : 'Automotive Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'is'
              ? 'Finndu hæfa bílasérfræðinga fyrir öll bílaverkefni. Frá viðgerðum til bílaþvotta og skoðunar.'
              : 'Find qualified automotive professionals for all car projects. From repairs to car wash and inspection.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-red-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">1,475+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Bílasérfræðingar' : 'Automotive professionals'}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">26,450+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Lokið verkefni' : 'Completed projects'}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.7</div>
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
            {language === 'is' ? 'Veldu þjónustu' : 'Choose Service'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automotiveServices.map(service => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => setSelectedService(service)}
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>👥 {service.professionals} {language === 'is' ? 'fagmenn' : 'professionals'}</span>
                    <span>✅ {service.completedJobs.toLocaleString()} {language === 'is' ? 'verkefni' : 'jobs'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {service.price}
                    </span>
                    <div className="flex gap-2">
                      <Link 
                        href={`/post?category=automotive&service=${service.id}`}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        {language === 'is' ? 'Legg út jobb' : 'Post job'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Svona virkar það' : 'How It Works'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Lýstu vandamálinu' : 'Describe the problem'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Segðu okkur hvað er að bílnum þínum og við finnum rétta sérfræðinga.'
                  : 'Tell us what\'s wrong with your car and we\'ll find the right specialists.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Fáðu tilboð' : 'Get quotes'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Þú færð fljótt óbindandi tilboð frá hæfum bílasérfræðingum.'
                  : 'You\'ll quickly get non-binding quotes from qualified automotive professionals.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Veldu og byrjaðu!' : 'Choose and start!'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Farðu yfir tilboðin og veldu rétt fyrirtæki fyrir bílinn þinn.'
                  : 'Review the quotes and choose the right company for your car.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu hjálp við bílinn?' : 'Need help with your car?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn verkefnið þitt og fáðu tilboð frá hæfum bílasérfræðingum á þínu svæði.'
              : 'Post your project and get quotes from qualified automotive professionals in your area.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/post?category=automotive"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomotivePage;