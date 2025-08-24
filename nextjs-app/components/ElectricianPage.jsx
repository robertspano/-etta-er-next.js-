'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ElectricianPage = ({ translations, language }) => {
  const [selectedElectrician, setSelectedElectrician] = useState(null);

  const electricianServices = [
    {
      id: 'electrical-installation',
      name: language === 'is' ? 'Raflagnasetning' : 'Electrical Installation',
      description: language === 'is' 
        ? 'Uppsetning og viðhald raflagna í heimilum og fyrirtækjum. Frá einföldum úttökum til flókinna kerfa.'
        : 'Installation and maintenance of electrical systems in homes and businesses. From simple outlets to complex systems.',
      price: language === 'is' ? '15.000-40.000 kr/verkefni' : '890-1200 kr/hour',
      icon: '⚡'
    },
    {
      id: 'fuse-box',
      name: language === 'is' ? 'Rafskápasetning' : 'Fuse Box Installation',
      description: language === 'is'
        ? 'Setja upp eða skipta út rafskápum og öryggisrofa fyrir örugga rafmagnsdreifingu.'
        : 'Install or replace fuse boxes and circuit breakers for safe electrical distribution.',
      price: language === 'is' ? '18.000-35.000 kr' : '1000-1400 kr/hour',
      icon: '🔌'
    },
    {
      id: 'ev-charging',
      name: language === 'is' ? 'Rafbílahleðslur' : 'EV Charging Installation',
      description: language === 'is'
        ? 'Uppsetning hleðslustöðva fyrir rafbíla með öryggisráðstöfunum og vottun.'
        : 'Installation of EV charging stations with safety measures and certification.',
      price: language === 'is' ? '25.000-60.000 kr' : '1200-1600 kr/hour',
      icon: '🔋'
    },
    {
      id: 'lighting-systems',
      name: language === 'is' ? 'Ljósakerfi' : 'Lighting Systems',
      description: language === 'is'
        ? 'Uppsetning ljósabúnaðar, LED-kerfa og snjallljósakerfa innandyra og utandyra.'
        : 'Installation of lighting equipment, LED systems and smart lighting for indoor and outdoor use.',
      price: language === 'is' ? '8.000-25.000 kr' : '700-1100 kr/hour',
      icon: '💡'
    },
    {
      id: 'underfloor-heating',
      name: language === 'is' ? 'Gólfhitun' : 'Underfloor Heating',
      description: language === 'is'
        ? 'Uppsetning rafmagnshitunarkerfa undir gólfefni með hitastýringu.'
        : 'Installation of electric heating systems under flooring with temperature control.',
      price: language === 'is' ? '12.000-30.000 kr' : '800-1200 kr/hour',
      icon: '🔥'
    },
    {
      id: 'electrical-inspection',
      name: language === 'is' ? 'Rafkerfi skoðun' : 'Electrical Inspection',
      description: language === 'is'
        ? 'Skoðun og vottun rafkerfa samkvæmt reglugerðum og öryggisstaðlum.'
        : 'Inspection and certification of electrical systems according to regulations and safety standards.',
      price: language === 'is' ? '15.000-35.000 kr' : '900-1300 kr/hour',
      icon: '📋'
    },
    {
      id: 'emergency-service',
      name: language === 'is' ? 'Neyðarþjónusta' : 'Emergency Service',
      description: language === 'is'
        ? 'Sólarhringsþjónusta fyrir rafmagnsbilanir og neyðaraðstæður.'
        : '24-hour service for electrical failures and emergency situations.',
      price: language === 'is' ? '18.000-45.000 kr' : '1200-1800 kr/hour',
      icon: '🚨'
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Hjem', href: '/' },
    { name: language === 'is' ? 'Handverk' : 'Håndverker', href: '/categories/handcraft' },
    { name: language === 'is' ? 'Rafvirki' : 'Elektriker', href: null }
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

      {/* Hero Section */}
      <div className="relative bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Rafvirki' : 'Elektriker'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {language === 'is'
                  ? 'Finndu hæfa rafvirkja fyrir öll rafmagnsverkefni. Frá einföldum viðgerðum til flókinna uppsetningar.'
                  : 'Find qualified electricians for all electrical projects. From simple repairs to complex installations.'
                }
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">2,400+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Rafvirkjar' : 'Electricians'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">12,800+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Verkefni 2025' : 'Projects 2025'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Meðaleinkunn' : 'Average rating'}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  href="/bedriftsok?category=elektriker"
                  className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                >
                  {language === 'is' ? 'Finn rafvirkja' : 'Find electrician'}
                </Link>
                <Link 
                  href="/post?category=electrical"
                  className="border border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
                >
                  {language === 'is' ? 'Legg út verk' : 'Post job'}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop"
                alt="Electrician working"
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
            {language === 'is' ? 'Rafmagnsþjónusta' : 'Electrical Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {electricianServices.map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-yellow-600 font-medium text-sm">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pricing Information */}
          <div className="bg-yellow-50 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'is' ? 'Hvað kostar rafvirki?' : 'What does an electrician cost?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">890-1200 kr/hour</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Venjulegur tímagjald rafvirkja' : 'Typical electrician hourly rate'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">28,000 kr</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Meðaltal verkefnis á BuildConnect 2025' : 'Average project on BuildConnect 2025'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu rafvirkja?' : 'Need an electrician?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Fáðu tilboð frá faglegum rafvirkjum á þínu svæði. Ókeypis og án skuldbindinga.'
              : 'Get quotes from professional electricians in your area. Free and without obligation.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/post?category=electrical"
              className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni ókeypis' : 'Post project for free'}
            </Link>
            <Link 
              href="/bedriftsok?category=elektriker"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              {language === 'is' ? 'Finn rafvirkja' : 'Find electricians'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricianPage;