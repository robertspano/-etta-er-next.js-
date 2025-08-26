'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PlumberPage = ({ translations, language }) => {
  const [selectedPlumber, setSelectedPlumber] = useState(null);

  const plumbingServices = [
    {
      id: 'plumbing-installation',
      name: language === 'is' ? 'Pípulagnasetning' : 'Plumbing Installation',
      description: language === 'is' 
        ? 'Uppsetning og viðhald vatns- og fráveitukerfa í heimilum og fyrirtækjum.'
        : 'Installation and maintenance of water and drainage systems in homes and businesses.',
      price: language === 'is' ? '12.000-22.000 kr/klst' : '800-1400 kr/hour',
      icon: '🔧'
    },
    {
      id: 'leak-repair',
      name: language === 'is' ? 'Lekageviðgerðir' : 'Leak Repairs',
      description: language === 'is'
        ? 'Fljót og áhrifarík viðgerð á vatnslásum og lekum. Neyðarþjónusta í boði.'
        : 'Quick and effective repair of water leaks and pipe bursts. Emergency service available.',
      price: language === 'is' ? '10.000-18.000 kr/klst' : '700-1200 kr/hour',
      icon: '💧'
    },
    {
      id: 'bathroom-plumbing',
      name: language === 'is' ? 'Baðherbergispípulagnir' : 'Bathroom Plumbing',
      description: language === 'is'
        ? 'Sérhæfð pípulagnaþjónusta fyrir baðherbergisuppbyggingu og endurnýjun.'
        : 'Specialized plumbing services for bathroom construction and renovation.',
      price: language === 'is' ? '15.000-28.000 kr/klst' : '1000-1600 kr/hour',
      icon: '🚿'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Pípulagningamaður' : 'Plumber'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {language === 'is'
                  ? 'Finndu hæfa pípulagningamenn fyrir öll vatns- og hitakerfiverkefni. Frá einföldum viðgerðum til heildar uppsetningar.'
                  : 'Find qualified plumbers for all water and heating system projects. From simple repairs to complete installations.'
                }
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">1,600+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Pípulagningamenn' : 'Plumbers'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">9,200+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Verkefni 2025' : 'Projects 2025'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Meðaleinkunn' : 'Average rating'}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  href="/post?category=plumbing"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {language === 'is' ? 'Legg út verk' : 'Post job'}
                </Link>
                <Link 
                  href="/handcraft"
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  {language === 'is' ? 'Sjá fleiri' : 'See more'}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop"
                alt="Plumber working"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Pípulagnaþjónusta' : 'Plumbing Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {plumbingServices.map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-blue-600 font-medium text-sm">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu pípulagningamann?' : 'Need a plumber?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Fáðu tilboð frá faglegum pípulagningamönnum á þínu svæði. Ókeypis og án skuldbindinga.'
              : 'Get quotes from professional plumbers in your area. Free and without obligation.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/post?category=plumbing"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni ókeypis' : 'Post project for free'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlumberPage;