'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const HouseGardenCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const houseGardenServices = [
    {
      id: 'anleggsgartner',
      name: language === 'is' ? 'Garðyrkjumenn' : 'Anleggsgartner',
      nameNorwegian: 'Anleggsgartner',
      description: language === 'is' 
        ? 'Garðhönnun, grasflötuviðhald og þjónusta fyrir útirými.'
        : 'Hagedesign, plenvedlikehold og tjenester for uteplasser.',
      professionals: 1600,
      averagePrice: language === 'is' ? '40.000-400.000 kr' : '400-800 kr/time',
      completedJobs: 3800,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Garðhönnun', 'Trjáklippingar', 'Grasfletir', 'Útiplöntun']
        : ['Hagedesign', 'Trefelling', 'Plen', 'Uteplanting']
    },
    {
      id: 'trefelling',
      name: language === 'is' ? 'Trjáfelling' : 'Trefelling',
      nameNorwegian: 'Trefelling',
      description: language === 'is'
        ? 'Fagleg trjáfelling, klipping og viðhald á trjám og runnum.'
        : 'Profesjonell trefelling, beskjæring og vedlikehold av trær og busker.',
      professionals: 850,
      averagePrice: language === 'is' ? '25.000-150.000 kr' : '500-1000 kr/time',
      completedJobs: 2400,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Trjáfelling', 'Klipping', 'Stubbfræsing', 'Öryggisfelling']
        : ['Trefelling', 'Beskjæring', 'Stubbfresing', 'Sikkerhetsfelling']
    },
    {
      id: 'plen',
      name: language === 'is' ? 'Grassláttur og viðhald' : 'Plen',
      nameNorwegian: 'Plen',
      description: language === 'is'
        ? 'Grasflötuviðhald, sláttur og umhirða grasflatna.'
        : 'Plenvedlikehold, klipping og pleie av gressplener.',
      professionals: 1200,
      averagePrice: language === 'is' ? '15.000-80.000 kr' : '300-600 kr/time',
      completedJobs: 4200,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Grassláttur', 'Fræsowing', 'Áburðargjöf', 'Viðhald']
        : ['Plenklipping', 'Såing', 'Gjødsling', 'Vedlikehold']
    },
    {
      id: 'uteplanter',
      name: language === 'is' ? 'Útiplöntur' : 'Uteplanter',
      nameNorwegian: 'Uteplanter',
      description: language === 'is'
        ? 'Plöntun, umhirða og hönnun útirýma með blómum og plöntum.'
        : 'Planting, stell og design av uteområder med blomster og planter.',
      professionals: 950,
      averagePrice: language === 'is' ? '20.000-120.000 kr' : '400-700 kr/time',
      completedJobs: 3100,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Blómaplöntun', 'Kjartagarðar', 'Útihönnun', 'Viðhald']
        : ['Blomsterplanting', 'Urter', 'Utedesign', 'Vedlikehold']
    },
    {
      id: 'uteterrasse',
      name: language === 'is' ? 'Verandir og þil' : 'Uteterrasse',
      nameNorwegian: 'Uteterrasse',
      description: language === 'is'
        ? 'Bygging og viðhald á verönd, þilum og útisvæðum.'
        : 'Bygging og vedlikehold av terrasser, dekk og uteområder.',
      professionals: 750,
      averagePrice: language === 'is' ? '80.000-400.000 kr' : '600-1200 kr/time',
      completedJobs: 1800,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Viðarþil', 'Steinverandir', 'Hellulagnir', 'Afgirðingar']
        : ['Tredekk', 'Steinterrasser', 'Flislegging', 'Rekkverk']
    },
    {
      id: 'tak',
      name: language === 'is' ? 'Þak' : 'Tak',
      nameNorwegian: 'Tak',
      description: language === 'is'
        ? 'Þakviðgerðir, uppsetningar og viðhald af reyndum þaksérfræðingum.'
        : 'Takreparasjoner, installasjoner og vedlikehold av erfarne takspesialister.',
      professionals: 1200,
      averagePrice: language === 'is' ? '65.000-250.000 kr' : '600-1000 kr/time',
      completedJobs: 4500,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakviðgerðir', 'Þaksteypa', 'Einangrun', 'Takrennur']
        : ['Takreparasjoner', 'Taklegging', 'Isolering', 'Takrenner']
    },
    {
      id: 'fasade',
      name: language === 'is' ? 'Útveggir og fasade' : 'Fasade',
      nameNorwegian: 'Fasade',
      description: language === 'is'
        ? 'Fasadeviðgerðir, málun og endurnýjun húsveggja.'
        : 'Fasadereparasjoner, maling og renovering av husvegger.',
      professionals: 800,
      averagePrice: language === 'is' ? '30.000-150.000 kr' : '450-750 kr/time',
      completedJobs: 2100,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Fasademálun', 'Klæðning', 'Einangrun', 'Viðhald']
        : ['Fasademaling', 'Kledning', 'Isolering', 'Vedlikehold']
    },
    {
      id: 'vinduer-dorer',
      name: language === 'is' ? 'Gluggar og hurðir' : 'Vinduer og dører',
      nameNorwegian: 'Vinduer og dører',
      description: language === 'is'
        ? 'Uppsetning, viðgerðir og skipti á gluggum og hurðum.'
        : 'Installasjon, reparasjoner og utskifting av vinduer og dører.',
      professionals: 1100,
      averagePrice: language === 'is' ? '25.000-120.000 kr' : '500-850 kr/time',
      completedJobs: 5200,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Gluggaskipti', 'Hurðaviðgerðir', 'Einangrun', 'Uppsetning']
        : ['Vindusbytte', 'Dørreparasjoner', 'Isolering', 'Installasjon']
    },
    {
      id: 'drenering',
      name: language === 'is' ? 'Drenering og vatnskerfi' : 'Drenering',
      nameNorwegian: 'Drenering',
      description: language === 'is'
        ? 'Vatnskerfi, drenering og vatnsleiðslur fyrir garða og hús.'
        : 'Vannsystem, drenering og vannledninger for hager og hus.',
      professionals: 600,
      averagePrice: language === 'is' ? '50.000-200.000 kr' : '600-900 kr/time',
      completedJobs: 1800,
      image: 'https://images.unsplash.com/photo-1621905252472-e8de73cbce81?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Vatnsleiðslur', 'Drenkerfi', 'Púmpur', 'Viðhald']
        : ['Vannledninger', 'Dreneringssystem', 'Pumper', 'Vedlikehold']
    },
    {
      id: 'grunnarbeid',
      name: language === 'is' ? 'Grunnvinna og jarðvinna' : 'Grunnarbeid',
      nameNorwegian: 'Grunnarbeid',
      description: language === 'is'
        ? 'Jarðvinna, uppgröftur og undirbúningur fyrir byggingarverkefni.'
        : 'Jordarbeid, utgravning og forberedelser for byggeprosjekter.',
      professionals: 900,
      averagePrice: language === 'is' ? '80.000-300.000 kr' : '700-1200 kr/time',
      completedJobs: 2500,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Uppgröftur', 'Grunnur', 'Jarðflutningar', 'Undirbúningur']
        : ['Utgravning', 'Grunnleggende', 'Jordtransport', 'Forberedelser']
    },
    {
      id: 'gjerde-port',
      name: language === 'is' ? 'Girðingar og hlið' : 'Gjerde og port',
      nameNorwegian: 'Gjerde og port',
      description: language === 'is'
        ? 'Girðingar, hlið og afgirðingar fyrir garða og eignir.'
        : 'Gjerder, porter og inngjerding for hager og eiendommer.',
      professionals: 650,
      averagePrice: language === 'is' ? '30.000-120.000 kr' : '400-700 kr/time',
      completedJobs: 2200,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Viðargirðingar', 'Málmgirðingar', 'Hlið', 'Uppsetning']
        : ['Tregjerder', 'Metallgjerder', 'Porter', 'Installasjon']
    },
    {
      id: 'utlys',
      name: language === 'is' ? 'Útiljós' : 'Utelys',
      nameNorwegian: 'Utelys',
      description: language === 'is'
        ? 'Uppsetning og viðhald á útiljósum og garðlýsingu.'
        : 'Installasjon og vedlikehold av utelys og hagelys.',
      professionals: 450,
      averagePrice: language === 'is' ? '25.000-80.000 kr' : '500-800 kr/time',
      completedJobs: 1600,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['LED ljós', 'Garðlýsing', 'Öryggisljós', 'Jólabirta']
        : ['LED-lys', 'Hagelys', 'Sikkerhetslys', 'Julelys']
    },
    {
      id: 'utebad',
      name: language === 'is' ? 'Heitir pottar og sundlaugar' : 'Utebad',
      nameNorwegian: 'Utebad',
      description: language === 'is'
        ? 'Uppsetning og viðhald á heitum pottum, sundlaugum og vellíðunartækjum.'
        : 'Installasjon og vedlikehold av boblebad, basseng og spa-utstyr.',
      professionals: 350,
      averagePrice: language === 'is' ? '100.000-500.000 kr' : '800-1500 kr/time',
      completedJobs: 800,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Heitir pottar', 'Sundlaugar', 'Spa tækni', 'Viðhald']
        : ['Boblebad', 'Svømmebasseng', 'Spa-teknikk', 'Vedlikehold']
    },
    {
      id: 'snorydding',
      name: language === 'is' ? 'Snjómokstur' : 'Snørydding',
      nameNorwegian: 'Snørydding',
      description: language === 'is'
        ? 'Snjómokstur og vetrarverk fyrir heimili og fyrirtæki.'
        : 'Snørydding og vinterarbeid for hjem og bedrifter.',
      professionals: 800,
      averagePrice: language === 'is' ? '10.000-50.000 kr' : '300-600 kr/time',
      completedJobs: 3500,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Snjómokstur', 'Strá', 'Vetrartilbúnaður', 'Bráðaþjónusta']
        : ['Snøfjerning', 'Strøing', 'Vinterutstyr', 'Akuttservice']
    },
    {
      id: 'uteopprydding',
      name: language === 'is' ? 'Garðþrif og þrifþjónusta' : 'Uteopprydding',
      nameNorwegian: 'Uteopprydding',
      description: language === 'is'
        ? 'Þrif og umhirða útirýma, fjarlæging rusl og viðhald.'
        : 'Rengjøring og vedlikehold av uteområder, søppelfjerning og stell.',
      professionals: 600,
      averagePrice: language === 'is' ? '15.000-60.000 kr' : '250-500 kr/time',
      completedJobs: 2800,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þrif', 'Ruslflutningar', 'Þvottur', 'Viðhald']
        : ['Rengjøring', 'Søppelhenting', 'Vask', 'Vedlikehold']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Hjem', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'Alle kategorier', href: '/alle-kategorier' },
    { name: language === 'is' ? 'Hús og garður' : 'Hus og hage', href: null }
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
            {language === 'is' ? 'Hús og garður' : 'Hus og hage'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'is'
              ? 'Allt fyrir heimilið þitt og garðinn. Frá þaki til grunns - við höfum sérfræðinga fyrir öll útiverkefni.'
              : 'Everything for your home and garden. From roof to foundation - we have specialists for all outdoor projects.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">8,750+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Sérfræðingar í garði og húsum' : 'Garden and house specialists'}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">38,200+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Lokið verkefni' : 'Completed projects'}
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
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
            {houseGardenServices.map(service => (
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
                    <span>👥 {service.professionals.toLocaleString()} {language === 'is' ? 'sérfræðingar' : 'specialists'}</span>
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
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn sérfræðing' : 'Find specialist'}
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

      {/* Popular Projects Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Vinsælustu verkefnin' : 'Most popular projects'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: language === 'is' ? 'Garðyrkja' : 'Gardening', count: '2,800+' },
              { name: language === 'is' ? 'Þakviðgerðir' : 'Roof Repairs', count: '2,100+' },
              { name: language === 'is' ? 'Gluggaskipti' : 'Window Replacement', count: '1,900+' },
              { name: language === 'is' ? 'Fasademálun' : 'Facade Painting', count: '1,600+' },
              { name: language === 'is' ? 'Girðingar' : 'Fencing', count: '1,400+' },
              { name: language === 'is' ? 'Þil og verandir' : 'Decks & Patios', count: '1,200+' },
              { name: language === 'is' ? 'Drenering' : 'Drainage', count: '900+' },
              { name: language === 'is' ? 'Útiljós' : 'Outdoor Lighting', count: '800+' }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">{item.count}</div>
                <div className="text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Tilbúinn að byrja?' : 'Ready to start?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn garð- eða húsverkefnið þitt og fáðu tilboð frá hæfum sérfræðingum.'
              : 'Post your garden or house project and get quotes from qualified specialists.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/job-categories"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              href="/bedriftsok"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {language === 'is' ? 'Finn sérfræðinga' : 'Find specialists'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseGardenCategoryPage;