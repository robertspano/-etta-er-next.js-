'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const HandcraftCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const handcraftServices = [
    {
      id: 'snekker',
      name: language === 'is' ? 'Trésmíðamaður' : 'Snekker',
      nameNorwegian: 'Snekker',
      description: language === 'is' 
        ? 'Sérsniðnar viðarvörur, húsgögn og burðarvirki af kunnáttumiklum smíðamönnum.'
        : 'Tilpassede trearbeider, møbler og bærekonstruksjoner av dyktige snekkere.',
      professionals: 2200,
      averagePrice: language === 'is' ? '40.000-100.000 kr' : '500-800 kr/time',
      completedJobs: 8200,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Tómmerwerk', 'Innredning', 'Húsgögn', 'Viðhald']
        : ['Tømrerarbeid', 'Innredning', 'Møbler', 'Vedlikehold']
    },
    {
      id: 'roerlegger',
      name: language === 'is' ? 'Pípulagningamaður' : 'Rørlegger',
      nameNorwegian: 'Rørlegger',
      description: language === 'is'
        ? 'Faglegir pípulagningamenn fyrir vatn, hita og frárennsliskerfi.'
        : 'Profesjonelle rørleggere for vann-, varme- og avløpssystemer.',
      professionals: 1800,
      averagePrice: language === 'is' ? '45.000-90.000 kr' : '600-900 kr/time',
      completedJobs: 6500,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Vatnslagnir', 'Hitunarkerfi', 'Baðherbergi', 'Viðgerðir']
        : ['Vannrør', 'Oppvarmingssystem', 'Baderom', 'Reparasjoner']
    },
    {
      id: 'maler',
      name: language === 'is' ? 'Málari' : 'Maler',
      nameNorwegian: 'Maler',
      description: language === 'is'
        ? 'Fagleg innri og ytri málningarþjónusta með gæða efnivið.'
        : 'Profesjonell innvendig og utvendig malerservice med kvalitetsmaterialer.',
      professionals: 1900,
      averagePrice: language === 'is' ? '25.000-80.000 kr' : '400-650 kr/time',
      completedJobs: 7800,
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Húsmálun', 'Innri málun', 'Veggsparkl', 'Tapetsetning']
        : ['Husmaling', 'Innvendig maling', 'Sparkling', 'Tapetsering']
    },
    {
      id: 'elektriker',
      name: language === 'is' ? 'Rafvirkjar' : 'Elektriker',
      nameNorwegian: 'Elektriker',
      description: language === 'is'
        ? 'Örugg og áreiðanleg rafvirkjun af löggiltum rafvirkjum fyrir heimili og fyrirtæki.'
        : 'Sikker og pålitelig elektrikerarbeid av autoriserte elektrikere for hjem og bedrifter.',
      professionals: 1600,
      averagePrice: language === 'is' ? '50.000-120.000 kr' : '700-1000 kr/time',
      completedJobs: 5400,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Rafvirkjun', 'Ljósauppsetning', 'Varmadælukerfi', 'Viðgerðir']
        : ['Elektrikerarbeid', 'Belysning', 'Varmepumper', 'Reparasjoner']
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'is' ? 'Handverk' : 'Håndverker'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'is'
              ? 'Finndu hæfa iðnaðarmenn fyrir verkefnið þitt. Frá trésmíði til málningarvinnu - við höfum fagmennina sem þú þarft.'
              : 'Find skilled craftsmen for your project. From carpentry to painting work - we have the professionals you need.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">9,500+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Skráðir iðnaðarmenn' : 'Registered craftsmen'}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">32,000+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Lokið verkefni' : 'Completed projects'}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
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
            {language === 'is' ? 'Veldu þjónustu' : 'Velg tjeneste'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {handcraftServices.map(service => (
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
                    <span>👥 {service.professionals.toLocaleString()} {language === 'is' ? 'fagmenn' : 'fagfolk'}</span>
                    <span>✅ {service.completedJobs.toLocaleString()} {language === 'is' ? 'verkefni' : 'jobber'}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'is' ? 'Sérhæfingar:' : 'Spesialiteter:'}
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
                        href={service.id === 'elektriker' ? '/professionals/electrician' : service.id === 'roerlegger' ? '/professionals/plumber' : `/professionals/${service.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn fagmann' : 'Finn fagfolk'}
                      </Link>
                      <Link 
                        href={`/post?category=${service.id}`}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        {language === 'is' ? 'Legg út jobb' : 'Legg ut jobb'}
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
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Tilbúinn að byrja?' : 'Ready to start?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn verkefnið þitt og fáðu tilboð frá hæfum iðnaðarmönnum á þínu svæði.'
              : 'Post your project and get quotes from qualified craftsmen in your area.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/post"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              href="/handcraft"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {language === 'is' ? 'Finn iðnaðarmenn' : 'Find craftsmen'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandcraftCategoryPage;