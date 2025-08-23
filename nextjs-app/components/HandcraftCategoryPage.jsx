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
    },
    {
      id: 'murer',
      name: language === 'is' ? 'Múrari' : 'Murer',
      nameNorwegian: 'Murer',
      description: language === 'is'
        ? 'Faglegur múrari fyrir steinsteypuvinnu og byggingarefni.'
        : 'Profesjonell murarbeid for mur, betong og byggematerialer.',
      professionals: 1200,
      averagePrice: language === 'is' ? '35.000-80.000 kr' : '450-700 kr/time',
      completedJobs: 4500,
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Múrverk', 'Steinsteypa', 'Viðgerðir', 'Byggingar']
        : ['Murverk', 'Betongarbeid', 'Reparasjoner', 'Byggarbeider']
    },
    {
      id: 'flislegger',
      name: language === 'is' ? 'Flíslagning' : 'Flislegger',
      nameNorwegian: 'Flislegger',
      description: language === 'is'
        ? 'Fagleg flíslagning fyrir baðherbergi, eldhús og önnur rými.'
        : 'Profesjonell flislegging for bad, kjøkken og andre rom.',
      professionals: 1400,
      averagePrice: language === 'is' ? '30.000-90.000 kr' : '500-750 kr/time',
      completedJobs: 3600,
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Baðherbergisflísar', 'Eldhúsflísar', 'Gólfflísar', 'Veggflísar']
        : ['Badromsflis', 'Kjøkkenflis', 'Gulvflis', 'Veggflis']
    },
    {
      id: 'taktekker',
      name: language === 'is' ? 'Þaksmíði' : 'Taktekker',
      nameNorwegian: 'Taktekker',
      description: language === 'is'
        ? 'Þakviðgerðir, uppsetningar og viðhald af reyndum þaksérfræðingum.'
        : 'Takreparasjoner, installasjoner og vedlikehold av erfarne takspesialister.',
      professionals: 900,
      averagePrice: language === 'is' ? '65.000-250.000 kr' : '600-900 kr/time',
      completedJobs: 2800,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakviðgerðir', 'Þaksteypa', 'Einangrun', 'Viðhald']
        : ['Takreparasjoner', 'Taklegging', 'Isolering', 'Vedlikehold']
    },
    {
      id: 'tomrer',
      name: language === 'is' ? 'Tímamaður' : 'Tømrer',
      nameNorwegian: 'Tømrer',
      description: language === 'is'
        ? 'Burðarvirki, rammasmíði og byggingarvinna af reyndum tímurum.'
        : 'Bærekonstruksjoner, rammeverk og byggearbeider av erfarne tømrere.',
      professionals: 1100,
      averagePrice: language === 'is' ? '40.000-100.000 kr' : '500-800 kr/time',
      completedJobs: 3200,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Rammasmíði', 'Burðarvirki', 'Viðbygging', 'Þaksmíði']
        : ['Rammeverk', 'Bærekonstruksjoner', 'Påbygg', 'Takarbeid']
    },
    {
      id: 'maskinentreprenoer',
      name: language === 'is' ? 'Vélaverktaki' : 'Maskinentreprenør',
      nameNorwegian: 'Maskinentreprenør',
      description: language === 'is'
        ? 'Jarðvégsvinna, útgröftur og vélavinnu með þyngri vélar.'
        : 'Gravearbeider, utgravning og maskinarbeid med tunge maskiner.',
      professionals: 650,
      averagePrice: language === 'is' ? '80.000-200.000 kr' : '800-1200 kr/time',
      completedJobs: 1800,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Jarðvinna', 'Útgröftur', 'Landmótun', 'Vélavinnu']
        : ['Gravearbeid', 'Utgravning', 'Terrengjustering', 'Maskinarbeid']
    },
    {
      id: 'blikkenslager',
      name: language === 'is' ? 'Blikksmíði' : 'Blikkenslager',
      nameNorwegian: 'Blikkenslager',
      description: language === 'is'
        ? 'Sérfræðingar í málmvinnu, þakvinnu og lagnir.'
        : 'Spesialister på metallarbeid, takarbeid og rør.',
      professionals: 800,
      averagePrice: language === 'is' ? '45.000-120.000 kr' : '600-850 kr/time',
      completedJobs: 2400,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakvinna', 'Málmvinna', 'Lagnavinnu', 'Viðgerðir']
        : ['Takarbeid', 'Metallarbeid', 'Rørarbeid', 'Reparasjoner']
    },
    {
      id: 'anleggsgartnere',
      name: language === 'is' ? 'Garðyrkjumenn' : 'Anleggsgartner',
      nameNorwegian: 'Anleggsgartner',
      description: language === 'is'
        ? 'Garðhönnun, grasflötuviðhald og þjónusta fyrir útirými.'
        : 'Hagedesign, gresspleie og service for utendørsområder.',
      professionals: 750,
      averagePrice: language === 'is' ? '25.000-70.000 kr' : '350-600 kr/time',
      completedJobs: 3400,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Garðhönnun', 'Grasflötur', 'Plöntusetning', 'Viðhald']
        : ['Hagedesign', 'Plen', 'Planting', 'Vedlikehold']
    },
    {
      id: 'losemed',
      name: language === 'is' ? 'Lausnir' : 'Løsemed',
      nameNorwegian: 'Løsemed',
      description: language === 'is'
        ? 'Almennar viðgerðir og smærri verkefni á heimilum.'
        : 'Generelle reparasjoner og mindre prosjekter i hjemmet.',
      professionals: 1200,
      averagePrice: language === 'is' ? '15.000-50.000 kr' : '300-500 kr/time',
      completedJobs: 4800,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Smáviðgerðir', 'Heimilisverk', 'Viðhald', 'Uppsetningar']
        : ['Småfiks', 'Hjemmearbeid', 'Vedlikehold', 'Installasjoner']
    },
    {
      id: 'stein-og-betong',
      name: language === 'is' ? 'Stein og steinsteypu' : 'Stein og betong',
      nameNorwegian: 'Stein og betong',
      description: language === 'is'
        ? 'Steinn og steinsteypu vinnu fyrir innri og ytri fleti.'
        : 'Stein- og betongarbeid for innvendige og utvendige flater.',
      professionals: 650,
      averagePrice: language === 'is' ? '50.000-150.000 kr' : '600-900 kr/time',
      completedJobs: 1900,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Steinsteypuvinna', 'Steinkleifun', 'Betónvörur', 'Viðgerðir']
        : ['Betongarbeid', 'Steinlegging', 'Betongprodukter', 'Reparasjoner']
    },
    {
      id: 'glass-og-vinduer',
      name: language === 'is' ? 'Gler og gluggar' : 'Glass og vinduer',
      nameNorwegian: 'Glass og vinduer',
      description: language === 'is'
        ? 'Gluggauppsetning, glerviðgerðir og glerflötuvinna.'
        : 'Vindusinstallasjon, glassreparasjoner og glassflatearbeid.',
      professionals: 450,
      averagePrice: language === 'is' ? '30.000-80.000 kr' : '500-800 kr/time',
      completedJobs: 1400,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Gluggauppsetning', 'Glerviðgerðir', 'Speglasetning', 'Einangrun']
        : ['Vindusmontering', 'Glassreparasjoner', 'Speilmontering', 'Isolering']
    },
    {
      id: 'innredning',
      name: language === 'is' ? 'Innréttingar' : 'Innredning',
      nameNorwegian: 'Innredning',
      description: language === 'is'
        ? 'Sérsmíðaðar innréttingar fyrir eldhús, baðherbergi og geymslu.'
        : 'Skreddersydde innredninger for kjøkken, bad og oppbevaring.',
      professionals: 850,
      averagePrice: language === 'is' ? '60.000-200.000 kr' : '700-1200 kr/time',
      completedJobs: 2100,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Eldhúsinnréttingar', 'Skápar', 'Hillur', 'Sérhönnun']
        : ['Kjøkkeninnredning', 'Skap', 'Hyller', 'Spesialdesign']
    },
    {
      id: 'varme-kulde-luft',
      name: language === 'is' ? 'Hiti, kælir og loftræsting' : 'Varme, kulde og luft',
      nameNorwegian: 'Varme, kulde og luft',
      description: language === 'is'
        ? 'Hitunar-, kæli- og loftræstingarkerfi fyrir heimili og fyrirtæki.'
        : 'Varme-, kjøle- og ventilasjonsanlegg for hjem og bedrifter.',
      professionals: 550,
      averagePrice: language === 'is' ? '70.000-180.000 kr' : '800-1200 kr/time',
      completedJobs: 1600,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Varmadælur', 'Loftræsting', 'Kælikerfi', 'Viðhald']
        : ['Varmepumper', 'Ventilasjon', 'Kjøleanlegg', 'Vedlikehold']
    },
    {
      id: 'sikkerhet',
      name: language === 'is' ? 'Öryggi' : 'Sikkerhet',
      nameNorwegian: 'Sikkerhet',
      description: language === 'is'
        ? 'Öryggiskerfi, vaktir og varnarúrræði fyrir heimili og fyrirtæki.'
        : 'Sikkerhetssystemer, alarmer og beskyttelsestiltak for hjem og bedrifter.',
      professionals: 300,
      averagePrice: language === 'is' ? '40.000-100.000 kr' : '600-900 kr/time',
      completedJobs: 800,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Öryggiskerfi', 'Vaktir', 'Læsasmíði', 'Myndavélar']
        : ['Alarmanlegg', 'Overvåking', 'Låsesmed', 'Kameraer']
    },
    {
      id: 'isolering',
      name: language === 'is' ? 'Einangrun' : 'Isolering',
      nameNorwegian: 'Isolering',
      description: language === 'is'
        ? 'Hitaeinangrun og hljóðeinangrun fyrir heimili og byggingar.'
        : 'Varmeisolering og lydisolering for hjem og bygninger.',
      professionals: 400,
      averagePrice: language === 'is' ? '35.000-90.000 kr' : '450-700 kr/time',
      completedJobs: 1200,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Hitaeinangrun', 'Hljóðeinangrun', 'Þakeinangrun', 'Veggeinangrun']
        : ['Varmeisolering', 'Lydisolering', 'Takisolering', 'Veggisolering']
    },
    {
      id: 'golvlegging',
      name: language === 'is' ? 'Gólflagning' : 'Gulvlegging',
      nameNorwegian: 'Gulvlegging',
      description: language === 'is'
        ? 'Parkettlagning, flísalagning og annars konar gólfefni.'
        : 'Parkettlegging, flislegging og andre gulvtyper.',
      professionals: 750,
      averagePrice: language === 'is' ? '40.000-120.000 kr' : '500-800 kr/time',
      completedJobs: 2800,
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Parkett', 'Vínilgólf', 'Teppalagning', 'Gólfviðgerðir']
        : ['Parkett', 'Vinylgulv', 'Teppelegging', 'Gulvreparasjoner']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Hjem', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'Alle kategorier', href: '/alle-kategorier' },
    { name: language === 'is' ? 'Handverk' : 'Håndverker', href: null }
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

      {/* Services Grid - Exact mittanbud.no style */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Veldu þjónustu' : 'Velg tjeneste'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        href={`/bedriftsok?category=${service.id}`}
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

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Svona virkar það' : 'Sånn fungerer det'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Lýstu verkefninu' : 'Describe the project'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Segðu okkur hvað þú þarft hjálp við og við sendum það til réttra fyrirtækja.'
                  : 'Tell us what you need help with and we\'ll send it to the right companies.'
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
                  ? 'Þú færð fljótt óbindandi tilboð frá fagfólki sem vill aðstoða.'
                  : 'You\'ll quickly get non-binding quotes from professionals who want to help.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Byrjaðu!' : 'Get started!'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Farðu yfir tilboðin og veldu rétt fyrirtæki. Eftir verkið geturðu skilið eftir umsögn.'
                  : 'Review the quotes and choose the right company. After the work, you can leave a review.'
                }
              </p>
            </div>
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
              href="/job-categories"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              href="/bedriftsok"
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