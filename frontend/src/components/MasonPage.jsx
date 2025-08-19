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
                  <div className="text-2xl font-bold text-stone-600 mb-1">1,800+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Múrarar' : 'Masons'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">6,500+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Verkefni' : 'Projects'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-orange-600 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Einkunn' : 'Rating'}
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
            {language === 'is' ? 'Múraraþjónusta' : 'Masonry Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {masonryServices.map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-stone-600 font-medium text-sm">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Masons Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Bestu múrararnir' : 'Top Masons'}
          </h2>
          
          <div className="space-y-6">
            {topMasons.map(mason => (
              <div key={mason.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={mason.image}
                      alt={mason.name}
                      className="w-full md:w-32 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{mason.name}</h3>
                          {mason.isVerified && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Staðfest' : 'Verified'}
                            </span>
                          )}
                          {mason.isInsured && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Tryggður' : 'Insured'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            {renderStars(mason.rating)}
                            <span className="ml-1 text-sm text-gray-600">
                              {mason.rating} ({mason.reviewCount} {language === 'is' ? 'umsagnir' : 'reviews'})
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {mason.completedJobs} {language === 'is' ? 'lokið verkefni' : 'completed jobs'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{mason.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {mason.specializations.map(spec => (
                            <span key={spec} className="bg-stone-100 text-stone-700 text-sm px-3 py-1 rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📍 {mason.location}</span>
                          <span>💰 {mason.priceRange}</span>
                          <span>🏢 {mason.employees} {language === 'is' ? 'starfsmenn' : 'employees'}</span>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 mt-4 md:mt-0">
                        <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                          <button className="bg-stone-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-stone-700 transition-colors">
                            {language === 'is' ? 'Hafa samband' : 'Contact us'}
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            {language === 'is' ? 'Skoða prófíl' : 'View profile'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/bedriftsok?category=murer"
              className="bg-stone-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-stone-700 transition-colors"
            >
              {language === 'is' ? 'Sjá alla múrara' : 'See all masons'}
            </Link>
          </div>
        </div>
      </div>

      {/* Materials Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Byggingarefni og steinar' : 'Building Materials & Stones'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Íslenskur steinn' : 'Icelandic Stone'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Eldfjallassteinn og önnur innlend byggingarefni af bestu gæðum.'
                  : 'Volcanic stone and other local building materials of the highest quality.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Múrsteinar' : 'Bricks'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Gæða múrsteinar fyrir alla tegund múrverka.'
                  : 'Quality bricks for all types of masonry work.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚒️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Steinsteypa' : 'Concrete'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Hágæða steinsteypa fyrir alla byggingarþörf.'
                  : 'High-quality concrete for all construction needs.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-stone-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu múrara?' : 'Need a mason?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Fáðu tilboð frá faglegum múrurum á þínu svæði.'
              : 'Get quotes from professional masons in your area.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/post?category=masonry"
              className="bg-white text-stone-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              to="/bedriftsok?category=murer"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-stone-700 transition-colors"
            >
              {language === 'is' ? 'Finn múrara' : 'Find masons'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasonPage;