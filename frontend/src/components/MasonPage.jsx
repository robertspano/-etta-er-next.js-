import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MasonPage = ({ translations, language }) => {
  const [selectedMason, setSelectedMason] = useState(null);

  const masonryServices = [
    {
      id: 'brickwork',
      name: language === 'is' ? 'Múrverk' : 'Brickwork',
      description: language === 'is' 
        ? 'Fagleg múrvinna úr steini, múrsteinum og öðrum byggingarefnum með áratuga reynslu.'
        : 'Professional masonry work with stone, bricks and other building materials with decades of experience.',
      price: language === 'is' ? '18.000-28.000 kr/klst' : '1200-1800 kr/hour',
      icon: '🧱'
    },
    {
      id: 'concrete-work',
      name: language === 'is' ? 'Steinsteypa og grunnar' : 'Concrete Work & Foundations',
      description: language === 'is'
        ? 'Steinsteypa fyrir grunna, veggi og aðrar framkvæmdir með nákvæmni og gæðum.'
        : 'Concrete work for foundations, walls and other construction projects with precision and quality.',
      price: language === 'is' ? '15.000-25.000 kr/klst' : '1000-1600 kr/hour',
      icon: '⚒️'
    },
    {
      id: 'stone-walls',
      name: language === 'is' ? 'Náttúrusteinveggir' : 'Natural Stone Walls',
      description: language === 'is'
        ? 'Bygging náttúrusteina veggja, stuðningsveggja og íslenskra garðveggja.'
        : 'Construction of natural stone walls, retaining walls and Icelandic garden walls.',
      price: language === 'is' ? '22.000-35.000 kr/klst' : '1400-2200 kr/hour',
      icon: '🪨'
    },
    {
      id: 'chimney-construction',
      name: language === 'is' ? 'Reykháfasmíði' : 'Chimney Construction',
      description: language === 'is'
        ? 'Bygging og viðgerð reykháfa, eldavéla og eldstæða með öryggisstaðlum.'
        : 'Construction and repair of chimneys, fireplaces and hearths with safety standards.',
      price: language === 'is' ? '20.000-30.000 kr/klst' : '1300-1900 kr/hour',
      icon: '🏠'
    },
    {
      id: 'paving-stonework',
      name: language === 'is' ? 'Hellulagnir' : 'Paving & Stonework',
      description: language === 'is'
        ? 'Fagleg hellulagnir, garðstéttir og útiflötur með þolnum efnum.'
        : 'Professional paving, garden paths and outdoor surfaces with durable materials.',
      price: language === 'is' ? '16.000-26.000 kr/klst' : '1100-1700 kr/hour',
      icon: '🪨'
    },
    {
      id: 'waterproofing',
      name: language === 'is' ? 'Vatnsþétting' : 'Waterproofing',
      description: language === 'is'
        ? 'Vatnsþétting kjallarveggja, grunna og annarra steinbygginga gegn rakka.'
        : 'Waterproofing of basement walls, foundations and other stone structures against moisture.',
      price: language === 'is' ? '14.000-22.000 kr/klst' : '900-1400 kr/hour',
      icon: '💧'
    },
    {
      id: 'repair-restoration',
      name: language === 'is' ? 'Viðgerðir og endurnýjun' : 'Repair & Restoration',
      description: language === 'is'
        ? 'Viðgerð og endurnýjun gamalla múrverka, steinbygginga og sögulegra mannvirkja.'
        : 'Repair and restoration of old masonry, stone buildings and historic structures.',
      price: language === 'is' ? '19.000-32.000 kr/klst' : '1200-2000 kr/hour',
      icon: '🔨'
    }
  ];

  const topMasons = [
    {
      id: '1',
      name: 'Iceland Stone Masters',
      location: 'Reykjavik',
      rating: 4.9,
      reviewCount: 156,
      completedJobs: 234,
      isVerified: true,
      isInsured: true,
      description: language === 'is' 
        ? 'Sérfræðingar í steinvinnu og múrverki með yfir 25 ára reynslu á Íslandi.'
        : 'Specialists in stonework and masonry with over 25 years of experience in Iceland.',
      services: language === 'is'
        ? ['Múrverk', 'Steinveggir', 'Steinsteypa', 'Endurnýjun']
        : ['Masonry', 'Stone Walls', 'Concrete Work', 'Restoration'],
      priceRange: language === 'is' ? '15.000-25.000 kr/klst' : '£75-125/hour',
      phoneNumber: '+354 567 8901',
      established: 1998,
      employees: '12-18',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
      specializations: language === 'is' 
        ? ['Íslenskur steinn', 'Endurnýjun', 'Stuðningsveggir']
        : ['Icelandic Stone', 'Restoration', 'Retaining Walls']
    },
    {
      id: '2',
      name: 'Nordic Masonry Works',
      location: 'Hafnarfjörður',
      rating: 4.8,
      reviewCount: 123,
      completedJobs: 189,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Faglegt múrafyrirtæki sem sérhæfir sig í nútíma byggingaraðferðum og hefðbundnu handverki.'
        : 'Professional masonry company specializing in modern building methods and traditional craftsmanship.',
      services: language === 'is'
        ? ['Nútíma múrverk', 'Steinsteypa', 'Garðveggir', 'Viðhald']
        : ['Modern Masonry', 'Concrete Work', 'Garden Walls', 'Maintenance'],
      priceRange: language === 'is' ? '14.000-22.000 kr/klst' : '£70-110/hour',
      phoneNumber: '+354 678 9012',
      established: 2005,
      employees: '8-15',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Nútíma aðferðir', 'Garðveggir', 'Viðhald']
        : ['Modern Methods', 'Garden Walls', 'Maintenance']
    },
    {
      id: '3',
      name: 'Westman Islands Stone Co.',
      location: 'Vestmannaeyjar',
      rating: 4.7,
      reviewCount: 89,
      completedJobs: 145,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Sérfræðingar í eldfjallassteini og sérstökum byggingarefnum frá Vestmannaeyjum.'
        : 'Specialists in volcanic stone and unique building materials from Westman Islands.',
      services: language === 'is'
        ? ['Eldfjallassteinn', 'Sérstakir steinar', 'Listræn vinna', 'Ráðgjöf']
        : ['Volcanic Stone', 'Specialty Stones', 'Artistic Work', 'Consultation'],
      priceRange: language === 'is' ? '18.000-30.000 kr/klst' : '£90-150/hour',
      phoneNumber: '+354 789 0123',
      established: 2010,
      employees: '6-12',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Eldfjallassteinn', 'Listrænar lausnir', 'Sérstakt efni']
        : ['Volcanic Stone', 'Artistic Solutions', 'Specialty Materials']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Iðnaður' : 'Handcraft', href: '/haandverker' },
    { name: language === 'is' ? 'Múrari' : 'Mason', href: null }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

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

      {/* Hero Section */}
      <div className="relative bg-stone-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Múrari' : 'Mason'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {language === 'is'
                  ? 'Finndu hæfa múrara fyrir öll steinvinnuverkefni. Frá múrveggum til steinsteypu og endurnýjunar.'
                  : 'Find qualified masons for all stonework projects. From brick walls to concrete work and restoration.'
                }
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-red-600 mb-1">650+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Múrarar' : 'Masons'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">2,800+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Verkefni 2025' : 'Projects 2025'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">4.9</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Meðaleinkunn' : 'Average rating'}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  to="/bedriftsok?category=murer"
                  className="bg-stone-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-stone-700 transition-colors"
                >
                  {language === 'is' ? 'Finn múrara' : 'Find mason'}
                </Link>
                <Link 
                  to="/post?category=masonry"
                  className="border border-stone-600 text-stone-600 px-6 py-3 rounded-lg font-semibold hover:bg-stone-50 transition-colors"
                >
                  {language === 'is' ? 'Legg út verk' : 'Post job'}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop"
                alt="Mason working"
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
            {language === 'is' ? 'Múrvinaþjónusta' : 'Masonry Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {masonryServices.slice(0,4).map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-red-600 font-medium text-sm">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {masonryServices.slice(4).map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-red-600 font-medium text-sm">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pricing Information */}
          <div className="bg-red-50 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'is' ? 'Hvað kostar múrari?' : 'What does a mason cost?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">1000-2200 kr/hour</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Venjulegur tímagjald múrara' : 'Typical mason hourly rate'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">45,000 kr</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Meðaltal verkefnis á BuildConnect 2025' : 'Average project on BuildConnect 2025'}
                </p>
              </div>
            </div>
          </div>
          
          {/* What can masons help with */}
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'is' ? 'Hvað getur múrari hjálpað við?' : 'What can a mason help with?'}
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              {language === 'is'
                ? 'Múrarar eru sérfræðingar í steinvinnu og múrverki. Þeir geta hjálpað við allt frá grunngjafarvinnu til flókinna endurnýjunarverkefna.'
                : 'Masons are specialists in stonework and masonry. They can help with everything from foundation work to complex restoration projects.'
              }
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'is' ? 'Múrarar á BuildConnect geta hjálpað þér við:' : 'Masons on BuildConnect can help you with:'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { is: 'Múrverk og steinlagnir', en: 'Brickwork and stone laying' },
                { is: 'Steinsteypu og grunnvinnu', en: 'Concrete work and foundations' },
                { is: 'Náttúrusteina veggi og garðveggir', en: 'Natural stone walls and garden walls' },
                { is: 'Reykháfa og eldavélabyggingar', en: 'Chimney and fireplace construction' },
                { is: 'Hellulagnir og útiflötur', en: 'Paving and outdoor surfaces' },
                { is: 'Vatnsþéttingu og rakavörn', en: 'Waterproofing and moisture protection' },
                { is: 'Viðgerðir á gömlum byggingum', en: 'Repairs on old buildings' },
                { is: 'Endurnýjun sögulegra mannvirkja', en: 'Restoration of historic structures' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-red-500 mr-2">✓</span>
                  <span className="text-gray-700">{language === 'is' ? item.is : item.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* When do you need a mason */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Hvenær þarftu múrara?' : 'When do you need a mason?'}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'is' ? 'Nýbyggingar og grunnar' : 'New Construction & Foundations'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'is' 
                  ? 'Þegar þú ert að byggja nýtt hús eða þarft faglega grunngjöf og steinsteypu fyrir mannvirki.'
                  : 'When you\'re building a new house or need professional foundation and concrete work for structures.'
                }
              </p>
              <div className="text-red-600 font-semibold">
                {language === 'is' ? 'Verkefnisverð: 300.000-2.000.000 kr' : 'Project price: 300,000-2,000,000 kr'}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🪨</div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'is' ? 'Garðveggjir og útiumhverfi' : 'Garden Walls & Outdoor Features'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'is'
                  ? 'Fyrir steinveggi í garði, stuðningsveggi, hellulagnir og aðrar útiaðgerðir.'
                  : 'For stone walls in gardens, retaining walls, paving and other outdoor improvements.'
                }
              </p>
              <div className="text-green-600 font-semibold">
                {language === 'is' ? 'Verkefnisverð: 150.000-800.000 kr' : 'Project price: 150,000-800,000 kr'}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'is' ? 'Viðgerðir og endurnýjun' : 'Repairs & Restoration'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'is'
                  ? 'Viðgerð gamlra steinbygginga, endurnýjun sögulegra mannvirkja eða vatnsþétting kjallarveggja.'
                  : 'Repair of old stone buildings, restoration of historic structures or waterproofing basement walls.'
                }
              </p>
              <div className="text-blue-600 font-semibold">
                {language === 'is' ? 'Verkefnisverð: 100.000-1.200.000 kr' : 'Project price: 100,000-1,200,000 kr'}
              </div>
            </div>
          </div>
          
          <div className="bg-red-100 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
              {language === 'is' ? 'Hvað hefur áhrif á verð múrara?' : 'What affects mason pricing?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'is' ? 'Helstu verðáhrifaþættir:' : 'Main pricing factors:'}
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    {language === 'is' ? 'Gerð og gæði steinefna' : 'Type and quality of stone materials'}
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    {language === 'is' ? 'Flækjustig hönnunar og múrverks' : 'Design complexity and masonry work'}
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    {language === 'is' ? 'Aðgengi að verkstaðnum' : 'Access to the work site'}
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    {language === 'is' ? 'Sérhæfðir verkfæri og tækni' : 'Specialized tools and techniques'}
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'is'
                    ? 'Verð múrara fer eftir gerð steinefna, flækjustigi verkefnis og aðgengi að verkstaðnum. Náttúrusteinn kostar meira en venjulegur múrsteinn. Endurnýjunarverkefni krefjast oft sérhæfðrar reynslu og eru þar af leiðandi dýrari.'
                    : 'Mason prices depend on the type of stone materials, project complexity and site access. Natural stone costs more than regular brick. Restoration projects often require specialized experience and are therefore more expensive.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            {language === 'is' ? 'Múrvinaverkefni' : 'Masonry Projects'}
          </h2>
          <p className="text-gray-600 text-center mb-12">
            {language === 'is' 
              ? 'Á undanförnum 12 mánuðum hefur verið lagt út á BuildConnect:'
              : 'In the past 12 months, posted on BuildConnect:'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">1,420</div>
              <div className="text-xl text-gray-600">
                {language === 'is' ? 'verkefni' : 'projects'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">412</div>
              <div className="text-xl text-gray-600">
                {language === 'is' ? 'umsagnir' : 'reviews'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">4.9</div>
              <div className="text-xl text-gray-600">
                {language === 'is' ? 'af 5 stjörnum' : 'of 5 stars'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu múrara?' : 'Need a mason?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Fáðu tilboð frá reyndum múrurum á þínu svæði. Ókeypis og án skuldbindinga.'
              : 'Get quotes from experienced masons in your area. Free and without obligation.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/post?category=masonry"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni ókeypis' : 'Post project for free'}
            </Link>
            <Link 
              to="/bedriftsok?category=murverk"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              {language === 'is' ? 'Finn múrara' : 'Find masons'}
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm opacity-90">
            <div className="flex items-center justify-center">
              <span className="mr-2">✓</span>
              {language === 'is' ? 'Ókeypis að leggja út verkefni' : 'Free to post projects'}
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">✓</span>
              {language === 'is' ? 'Sérhæfðir steinvinnu-sérfræðingar' : 'Specialized stonework experts'}
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">✓</span>
              {language === 'is' ? 'Gæði og ending' : 'Quality and durability'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasonPage;