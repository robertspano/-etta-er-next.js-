import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HouseGardenCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const houseGardenServices = [
    {
      id: 'landscaping',
      name: language === 'is' ? 'Garðyrkja' : 'Anleggsgartner',
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
      id: 'roofing',
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
      id: 'exterior-walls',
      name: language === 'is' ? 'Fasade' : 'Fasade',
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
      id: 'windows-doors',
      name: language === 'is' ? 'Gluggar og hurðir' : 'Vindu og dør',
      nameNorwegian: 'Vindu og dør',
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
      id: 'drainage',
      name: language === 'is' ? 'Drenering' : 'Drenering',
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
      id: 'excavation',
      name: language === 'is' ? 'Grunnvinna' : 'Grunnarbeid',
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
      id: 'fencing',
      name: language === 'is' ? 'Girðingar og hlið' : 'Gjerde og port',
      nameNorwegian: 'Gjerde og port',
      description: language === 'is'
        ? 'Uppsetning og viðhald girðinga, hlíða og öryggisbúnaðar.'
        : 'Installasjon og vedlikehold av gjerder, porter og sikkerhetsutstyr.',
      professionals: 700,
      averagePrice: language === 'is' ? '20.000-100.000 kr' : '400-700 kr/time',
      completedJobs: 3100,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Viðargirðingar', 'Málmgirðingar', 'Hlið', 'Öryggis']
        : ['Tregjerder', 'Metallgjerder', 'Porter', 'Sikkerhet']
    },
    {
      id: 'terrace-deck',
      name: language === 'is' ? 'Verönd og svalir' : 'Platting og terrasse',
      nameNorwegian: 'Platting og terrasse',  
      description: language === 'is'
        ? 'Byggingar veranda, svala og útiverundumsagna.'
        : 'Bygging av terrasser, balkonger og uteplasser.',
      professionals: 1300,
      averagePrice: language === 'is' ? '60.000-250.000 kr' : '500-900 kr/time',
      completedJobs: 4200,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Viðarverönd', 'Steinplötur', 'Yfirbyggjur', 'Lýsing']
        : ['Teterrasse', 'Steinplater', 'Overbygning', 'Belysning']
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
                  <Link to={crumb.href} className="text-blue-600 hover:text-blue-800">
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
            <div className="text-3xl font-bold text-green-600 mb-2">6,300+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Skráðir sérfræðingar' : 'Registrerte spesialister'}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">26,100+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Lokið verkefni' : 'Fullførte prosjekter'}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Meðaleinkunn' : 'Gjennomsnittlig vurdering'}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-64 mb-16">
        <img 
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=400&fit=crop"
          alt="House and Garden"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'is' ? 'Gera heimilið þitt enn betra' : 'Gjør hjemmet ditt enda bedre'}
            </h2>
            <p className="text-xl opacity-90">
              {language === 'is' 
                ? 'Frá garðyrkju til þakviðgerða'
                : 'Fra hagearbeid til takreparasjoner'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid - Exact mittanbud.no style */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Veldu þjónustu' : 'Velg tjeneste'}
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
                        to={`/bedriftsok?category=${service.id}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn fagmann' : 'Finn fagfolk'}
                      </Link>
                      <Link 
                        to={`/post?category=${service.id}`}
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

      {/* Popular Services Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Vinsælustu þjónusturnar' : 'Mest populære tjenester'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: language === 'is' ? 'Garðyrkja' : 'Hagearbeid', count: '1,200+' },
              { name: language === 'is' ? 'Þakviðgerðir' : 'Takreparasjoner', count: '890+' },
              { name: language === 'is' ? 'Verandasmíði' : 'Terrassebygging', count: '650+' },
              { name: language === 'is' ? 'Girðingasmíði' : 'Gjerdebygging', count: '420+' },
              { name: language === 'is' ? 'Drenering' : 'Drenering', count: '310+' },
              { name: language === 'is' ? 'Fasademálun' : 'Fasademaling', count: '270+' },
              { name: language === 'is' ? 'Gluggaskipti' : 'Vindusbytte', count: '190+' },
              { name: language === 'is' ? 'Grunnvinna' : 'Grunnarbeid', count: '150+' }
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
            {language === 'is' ? 'Tilbúinn að byrja?' : 'Klar til å starte?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn verkefnið þitt og fáðu tilboð frá hæfum sérfræðingum á þínu svæði.'
              : 'Legg ut prosjektet ditt og få tilbud fra kvalifiserte spesialister i ditt område.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/job-categories"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Legg ut prosjekt'}
            </Link>
            <Link 
              to="/bedriftsok"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {language === 'is' ? 'Finn sérfræðinga' : 'Finn spesialister'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseGardenCategoryPage;