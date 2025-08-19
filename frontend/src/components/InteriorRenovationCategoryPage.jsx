import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    {
      id: 'kjokkenrenovering',
      name: language === 'is' ? 'Eldhúsendurnýjun' : 'Kjøkkenrenovering',
      nameNorwegian: 'Kjøkkenrenovering',
      description: language === 'is'
        ? 'Sérsniðin eldhús með nýjustu tækjum og innréttingum.'
        : 'Skreddersydde kjøkken med nyeste utstyr og innredninger.',
      professionals: 1200,
      averagePrice: language === 'is' ? '1.200.000-4.000.000 kr' : '80.000-300.000 kr',
      completedJobs: 4200,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Innréttingar', 'Tæki', 'Hönnun', 'Skipulag']
        : ['Innredning', 'Hvitevarer', 'Design', 'Planløsning']
    },
    {
      id: 'maling-innvendig',
      name: language === 'is' ? 'Innri málning' : 'Maling innvendig',
      nameNorwegian: 'Maling innvendig',
      description: language === 'is'
        ? 'Fagleg málning innanhúss með gæða efnum og litaráðgjöf.'
        : 'Profesjonell innvendig maling med kvalitetsmaterialer og fargerådgivning.',
      professionals: 1600,
      averagePrice: language === 'is' ? '80.000-300.000 kr' : '15.000-80.000 kr',
      completedJobs: 9200,
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Litaráðgjöf', 'Séráferðir', 'Veggfóður', 'Viðhald']
        : ['Fargerådgivning', 'Spesialteknikker', 'Tapet', 'Vedlikehold']
    },
    {
      id: 'gulv',
      name: language === 'is' ? 'Gólfefni' : 'Gulv',
      nameNorwegian: 'Gulv',
      description: language === 'is'
        ? 'Uppsetning og endurnýjun gólfa - parkett, flísar, dúkar og meira.'
        : 'Installasjon og renovering av gulv - parkett, flis, vinylgulv og mer.',
      professionals: 900,
      averagePrice: language === 'is' ? '150.000-600.000 kr' : '25.000-120.000 kr',
      completedJobs: 7800,
      image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Parkett', 'Flísar', 'Vínilgólf', 'Viðhald']
        : ['Parkett', 'Flis', 'Vinylgulv', 'Vedlikehold']
    },
    {
      id: 'flis',
      name: language === 'is' ? 'Flísalagning' : 'Flis',
      nameNorwegian: 'Flis',
      description: language === 'is'
        ? 'Fagleg flíslagning fyrir baðherbergi, eldhús og önnur rými.'
        : 'Profesjonell flislegging for bad, kjøkken og andre rom.',
      professionals: 1100,
      averagePrice: language === 'is' ? '200.000-800.000 kr' : '35.000-150.000 kr',
      completedJobs: 6400,
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Baðherbergisflísar', 'Eldhúsflísar', 'Gólfflísar', 'Veggflísar']
        : ['Badromsflis', 'Kjøkkenflis', 'Gulvflis', 'Veggflis']
    },
    {
      id: 'innredning',
      name: language === 'is' ? 'Innréttingar' : 'Innredning',
      nameNorwegian: 'Innredning',
      description: language === 'is'
        ? 'Sérsmíðaðar innréttingar fyrir eldhús, baðherbergi og geymslu.'
        : 'Skreddersydde innredninger for kjøkken, bad og oppbevaring.',
      professionals: 850,
      averagePrice: language === 'is' ? '300.000-1.200.000 kr' : '50.000-250.000 kr',
      completedJobs: 3800,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Eldhúsinnréttingar', 'Skápar', 'Hillur', 'Sérhönnun']
        : ['Kjøkkeninnredning', 'Skap', 'Hyller', 'Spesialdesign']
    },
    {
      id: 'belysning',
      name: language === 'is' ? 'Ljósauppsetning' : 'Belysning',
      nameNorwegian: 'Belysning',
      description: language === 'is'
        ? 'Uppsetning og hönnun ljósakerfa fyrir heimili og vinnustaði.'
        : 'Installasjon og design av belysningssystemer for hjem og arbeidsplasser.',
      professionals: 650,
      averagePrice: language === 'is' ? '120.000-500.000 kr' : '20.000-100.000 kr',
      completedJobs: 4200,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['LED ljós', 'Takljós', 'Veggljós', 'Smart ljós']
        : ['LED-lys', 'Taklys', 'Vegglys', 'Smart belysning']
    },
    {
      id: 'vegger',
      name: language === 'is' ? 'Veggir og skilrúm' : 'Vegger',
      nameNorwegian: 'Vegger',
      description: language === 'is'
        ? 'Byggið nýja veggi, skilrúm og endurskipulagð rými.'
        : 'Bygging av nye vegger, skillevegger og omorganisering av rom.',
      professionals: 750,
      averagePrice: language === 'is' ? '100.000-400.000 kr' : '15.000-80.000 kr',
      completedJobs: 3600,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Gipsplötur', 'Skilrúm', 'Steinull', 'Málning']
        : ['Gipsplater', 'Skillevegger', 'Isolering', 'Maling']
    },
    {
      id: 'tak-loft',
      name: language === 'is' ? 'Loft og hangloft' : 'Tak/loft',
      nameNorwegian: 'Tak/loft',
      description: language === 'is'
        ? 'Uppsetning og endurbætur á loftum og hangloftum.'
        : 'Installasjon og forbedringer av tak og hengetak.',
      professionals: 550,
      averagePrice: language === 'is' ? '80.000-350.000 kr' : '12.000-70.000 kr',
      completedJobs: 2800,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Hangloft', 'Akústikloft', 'LED ljós', 'Einangrun']
        : ['Hengetak', 'Akustikktak', 'LED-belysning', 'Isolering']
    },
    {
      id: 'oppussing-generell',
      name: language === 'is' ? 'Almenn endurnýjun' : 'Oppussing generell',
      nameNorwegian: 'Oppussing generell',
      description: language === 'is'
        ? 'Heildarendurnýjun og uppfærsla á heimilum og íbúðum.'
        : 'Totalrenovering og oppgradering av hjem og leiligheter.',
      professionals: 1300,
      averagePrice: language === 'is' ? '500.000-3.000.000 kr' : '80.000-500.000 kr',
      completedJobs: 2400,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Verkefnastjórnun', 'Hönnun', 'Byggingarleyfi', 'Tímaáætlun']
        : ['Prosjektledelse', 'Design', 'Byggetillatelser', 'Tidsplan']
    },
    {
      id: 'soverom',
      name: language === 'is' ? 'Svefnherbergi' : 'Soverom',
      nameNorwegian: 'Soverom',
      description: language === 'is'
        ? 'Endurnýjun og hönnun svefnherbergja fyrir best hvíld.'
        : 'Renovering og design av soverom for optimal hvile.',
      professionals: 700,
      averagePrice: language === 'is' ? '200.000-800.000 kr' : '30.000-150.000 kr',
      completedJobs: 3200,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Skápar', 'Ljósahönnun', 'Litaval', 'Gólfefni']
        : ['Garderobeskap', 'Lysdesign', 'Fargevalg', 'Gulvbelegg']
    },
    {
      id: 'kjoller-bod',
      name: language === 'is' ? 'Kjallari og geymslur' : 'Kjeller/bod',
      nameNorwegian: 'Kjeller/bod',
      description: language === 'is'
        ? 'Endurbætur á kjöllurum og geymslurýmum til nýtingar.'
        : 'Forbedring av kjellere og lagerrom for bedre utnyttelse.',
      professionals: 450,
      averagePrice: language === 'is' ? '300.000-1.200.000 kr' : '50.000-250.000 kr',
      completedJobs: 1600,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Rakaskortur', 'Einangrun', 'Ljósauppsetning', 'Gólf']
        : ['Fuktsperre', 'Isolering', 'Belysning', 'Gulvbelegg']
    },
    {
      id: 'vinduer-dorer-innvendig',
      name: language === 'is' ? 'Innri gluggar og hurðir' : 'Vinduer/dører innvendig',
      nameNorwegian: 'Vinduer/dører innvendig',
      description: language === 'is'
        ? 'Uppsetning og endurnýjun innri gluggara og hurða.'
        : 'Installasjon og renovering av innvendige vinduer og dører.',
      professionals: 800,
      averagePrice: language === 'is' ? '80.000-300.000 kr' : '15.000-60.000 kr',
      completedJobs: 4800,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Hurðaskipti', 'Gluggar', 'Karmar', 'Læsingar']
        : ['Dørskifte', 'Vinduer', 'Karmer', 'Låsesmed']
    },
    {
      id: 'varme-ventilasjon',
      name: language === 'is' ? 'Hiti og loftræsting' : 'Varme/ventilasjon',
      nameNorwegian: 'Varme/ventilasjon',
      description: language === 'is'
        ? 'Uppsetning og endurbætur á hitunar- og loftræstikerfum.'
        : 'Installasjon og forbedring av varme- og ventilasjonsanlegg.',
      professionals: 600,
      averagePrice: language === 'is' ? '200.000-800.000 kr' : '40.000-180.000 kr',
      completedJobs: 2200,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Varmadælur', 'Loftræsting', 'Gólfhitun', 'Kælikerfi']
        : ['Varmepumper', 'Ventilasjon', 'Gulvvarme', 'Kjøling']
    }
  ];
        : ['Furniture', 'Lighting', 'Layout', 'Built-ins']
    },
    {
      id: 'basement-renovation',
      name: language === 'is' ? 'Kjallara- og rísendurnýjun' : 'Basement Renovation',
      nameEnglish: 'Basement Renovation',
      description: language === 'is'
        ? 'Umbreytingar á kjöllurum í nothæf og þægileg rými.'
        : 'Transforming basements into functional and comfortable spaces.',
      professionals: 600,
      averagePrice: language === 'is' ? '600.000-2.000.000 kr' : '£3,000-10,000',
      completedJobs: 2100,
      image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Rakavörn', 'Einangrun', 'Lýsing', 'Loftun']
        : ['Waterproofing', 'Insulation', 'Lighting', 'Ventilation']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'All categories', href: '/alle-kategorier' },
    { name: language === 'is' ? 'Innri endurbætur' : 'Interior Renovation', href: null }
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

      {/* Hero Image Section */}
      <div className="relative h-64 mb-16">
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=400&fit=crop"
          alt="Interior Renovation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'is' ? 'Gera heimilið þitt enn betra' : 'Make your home even better'}
            </h2>
            <p className="text-xl opacity-90">
              {language === 'is' 
                ? 'Frá smáum breytingum til heildar endurnýjunar'
                : 'From small changes to complete renovations'
              }
            </p>
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
                        to={`/bedriftsok?category=${service.id}`}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn sérfræðing' : 'Find specialist'}
                      </Link>
                      <Link 
                        to={`/post?category=${service.id}`}
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

      {/* Popular Renovations Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Vinsælustu endurbæturnar' : 'Most popular renovations'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: language === 'is' ? 'Baðherbergi' : 'Bathrooms', count: '2,100+' },
              { name: language === 'is' ? 'Eldhús' : 'Kitchens', count: '1,800+' },
              { name: language === 'is' ? 'Málning' : 'Painting', count: '3,200+' },
              { name: language === 'is' ? 'Gólfefni' : 'Flooring', count: '2,900+' },
              { name: language === 'is' ? 'Stofur' : 'Living Rooms', count: '1,200+' },
              { name: language === 'is' ? 'Svefnherbergi' : 'Bedrooms', count: '1,600+' },
              { name: language === 'is' ? 'Kjallarar' : 'Basements', count: '800+' },
              { name: language === 'is' ? 'Loft' : 'Attics', count: '600+' }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">{item.count}</div>
                <div className="text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Svona virkar það' : 'How it works'}
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
                  ? 'Segðu okkur um endurbótaáætlanir þínar og við sendum það til rétta sérfræðinga.'
                  : 'Tell us about your renovation plans and we\'ll send it to the right specialists.'
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
                  ? 'Þú færð fljótt óbindandi tilboð frá reyndum sérfræðingum.'
                  : 'You\'ll quickly get non-binding quotes from experienced specialists.'
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
                  ? 'Veldu besta tilboðið og byrjaðu að breyta heimilinu þínu.'
                  : 'Choose the best quote and start transforming your home.'
                }
              </p>
            </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/job-categories"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              to="/bedriftsok"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {language === 'is' ? 'Finn sérfræðinga' : 'Find specialists'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteriorRenovationCategoryPage;