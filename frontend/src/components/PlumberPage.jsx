import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    },
    {
      id: 'heating-systems',
      name: language === 'is' ? 'Hitakerfi' : 'Heating Systems',
      description: language === 'is'
        ? 'Uppsetning og viðhald rörveitukerfa, radíatora og gólfhitunar.'
        : 'Installation and maintenance of piping systems, radiators and underfloor heating.',
      price: language === 'is' ? '14.000-25.000 kr/klst' : '900-1500 kr/hour',
      icon: '🔥'
    },
    {
      id: 'drainage-systems',
      name: language === 'is' ? 'Fráveitukerfi' : 'Drainage Systems',
      description: language === 'is'
        ? 'Uppsetning og viðgerð fráveitupípa og dæla fyrir vatnssafn.'
        : 'Installation and repair of drainage pipes and pumps for water collection.',
      price: language === 'is' ? '16.000-30.000 kr/klst' : '1100-1700 kr/hour',
      icon: '🕳️'
    },
    {
      id: 'water-heaters',
      name: language === 'is' ? 'Heitt vatn' : 'Water Heaters',
      description: language === 'is'
        ? 'Uppsetning og viðhald heitavatnskerfa og tankaskerfa.'
        : 'Installation and maintenance of hot water systems and tank systems.',
      price: language === 'is' ? '18.000-35.000 kr/klst' : '1200-1800 kr/hour',
      icon: '🌡️'
    },
    {
      id: 'kitchen-plumbing',
      name: language === 'is' ? 'Eldhúspípulagnir' : 'Kitchen Plumbing',
      description: language === 'is'
        ? 'Pípulagnaþjónusta fyrir eldhús með uppvaskavélar og ísskápa.'
        : 'Plumbing services for kitchens with dishwashers and refrigerators.',
      price: language === 'is' ? '12.000-20.000 kr/klst' : '800-1300 kr/hour',
      icon: '🍴'
    }
  ];

  const topPlumbers = [
    {
      id: '1',
      name: 'Reykjavik Plumbing Services',
      location: 'Reykjavik',
      rating: 4.8,
      reviewCount: 156,
      completedJobs: 289,
      isVerified: true,
      isInsured: true,
      description: language === 'is' 
        ? 'Heildar pípulagnaþjónusta fyrir höfuðborgarsvæðið. Sólarhringsþjónusta í boði.'
        : 'Complete plumbing services for the capital area. 24-hour emergency service available.',
      services: language === 'is'
        ? ['Pípulagnasetning', 'Neyðarþjónusta', 'Baðherbergisvinnu', 'Hitakerfi']
        : ['Plumbing Installation', 'Emergency Service', 'Bathroom Work', 'Heating Systems'],
      priceRange: language === 'is' ? '12.000-18.000 kr/klst' : '£60-90/hour',
      phoneNumber: '+354 567 8901',
      established: 2008,
      employees: '8-15',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop',
      specializations: language === 'is' 
        ? ['Neyðarþjónusta', 'Baðherbergi', 'Hitakerfi']
        : ['Emergency Service', 'Bathrooms', 'Heating Systems']
    },
    {
      id: '2',
      name: 'Northern Plumbing Ltd',
      location: 'Akureyri',
      rating: 4.9,
      reviewCount: 98,
      completedJobs: 187,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Reyndir pípulagningamenn á norðurlandi með áherslu á gæði og áreiðanleika.'
        : 'Experienced plumbers in northern Iceland with focus on quality and reliability.',
      services: language === 'is'
        ? ['Pípulagnir', 'Viðhald', 'Endurnýjun', 'Ráðgjöf']
        : ['Plumbing', 'Maintenance', 'Renovations', 'Consultation'],
      priceRange: language === 'is' ? '11.000-16.000 kr/klst' : '£55-80/hour',
      phoneNumber: '+354 678 9012',
      established: 2012,
      employees: '5-8',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Viðhald', 'Endurnýjun', 'Ráðgjöf']
        : ['Maintenance', 'Renovations', 'Consultation']
    },
    {
      id: '3',
      name: 'Iceland Water Works',
      location: 'Hafnarfjörður',
      rating: 4.7,
      reviewCount: 123,
      completedJobs: 234,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Sérfræðingar í vatnskerfi og þrýstingskerfi fyrir heimili og fyrirtæki.'
        : 'Specialists in water systems and pressure systems for homes and businesses.',
      services: language === 'is'
        ? ['Vatnskerfi', 'Þrýstingskerfi', 'Sía', 'Viðhald']
        : ['Water Systems', 'Pressure Systems', 'Filtration', 'Maintenance'],
      priceRange: language === 'is' ? '10.500-17.000 kr/klst' : '£52-85/hour',
      phoneNumber: '+354 789 0123',
      established: 2015,
      employees: '6-10',
      image: 'https://images.unsplash.com/photo-1621905252472-e8de73cbce81?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Vatnskerfi', 'Þrýstingskerfi', 'Sía']
        : ['Water Systems', 'Pressure Systems', 'Filtration']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Iðnaður' : 'Handcraft', href: '/haandverker' },
    { name: language === 'is' ? 'Pípulagningamaður' : 'Plumber', href: null }
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
                  to="/bedriftsok?category=roerlegger"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {language === 'is' ? 'Finn pípulagningamann' : 'Find plumber'}
                </Link>
                <Link 
                  to="/post?category=plumbing"
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  {language === 'is' ? 'Legg út verk' : 'Post job'}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plumbingServices.slice(0,4).map(service => (
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {plumbingServices.slice(4).map(service => (
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
          
          {/* Pricing Information */}
          <div className="bg-blue-50 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'is' ? 'Hvað kostar pípulagningamaður?' : 'What does a plumber cost?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">800-1400 kr/hour</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Venjulegur tímagjald pípulagningamanna' : 'Typical plumber hourly rate'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">24,000 kr</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Meðaltal verkefnis á BuildConnect 2025' : 'Average project on BuildConnect 2025'}
                </p>
              </div>
            </div>
          </div>
          
          {/* What can plumbers help with */}
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'is' ? 'Hvað getur pípulagningamaður hjálpað við?' : 'What can a plumber help with?'}
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              {language === 'is'
                ? 'Pípulagningamenn geta hjálpað við allt sem tengist vatni og frárennsliskerfi. Frá einföldum viðgerðum til flókinna uppsetningar.'
                : 'Plumbers can help with everything related to water and drainage systems. From simple repairs to complex installations.'
              }
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'is' ? 'Pípulagningamenn á BuildConnect geta hjálpað þér við:' : 'Plumbers on BuildConnect can help you with:'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { is: 'Skipta eða lagfæra pípulagnir', en: 'Replace or repair pipes' },
                { is: 'Baðherbergisendurnýjun', en: 'Bathroom renovation' },
                { is: 'Eldhúspípulagnir', en: 'Kitchen plumbing' },
                { is: 'Lekageviðgerðir og neyðarþjónustu', en: 'Leak repairs and emergency service' },
                { is: 'Uppsetning heitavatnskerfis', en: 'Install hot water systems' },
                { is: 'Hitakerfi og radíatorar', en: 'Heating systems and radiators' },
                { is: 'Fráveitukerfi og dælur', en: 'Drainage systems and pumps' },
                { is: 'Vatnsþrýstingskerfi', en: 'Water pressure systems' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-700">{language === 'is' ? item.is : item.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Plumbers Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Bestu pípulagningamennirnir' : 'Top Plumbers'}
          </h2>
          
          <div className="space-y-6">
            {topPlumbers.map(plumber => (
              <div key={plumber.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={plumber.image}
                      alt={plumber.name}
                      className="w-full md:w-32 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{plumber.name}</h3>
                          {plumber.isVerified && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Staðfest' : 'Verified'}
                            </span>
                          )}
                          {plumber.isInsured && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Tryggður' : 'Insured'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            {renderStars(plumber.rating)}
                            <span className="ml-1 text-sm text-gray-600">
                              {plumber.rating} ({plumber.reviewCount} {language === 'is' ? 'umsagnir' : 'reviews'})
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {plumber.completedJobs} {language === 'is' ? 'lokið verkefni' : 'completed jobs'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{plumber.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {plumber.specializations.map(spec => (
                            <span key={spec} className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📍 {plumber.location}</span>
                          <span>💰 {plumber.priceRange}</span>
                          <span>🏢 {plumber.employees} {language === 'is' ? 'starfsmenn' : 'employees'}</span>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 mt-4 md:mt-0">
                        <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
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
              to="/bedriftsok?category=roerlegger"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {language === 'is' ? 'Sjá alla pípulagningamenn' : 'See all plumbers'}
            </Link>
          </div>
        </div>
      </div>

      {/* Emergency Service Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Neyðarþjónusta og sérsvið' : 'Emergency Service & Specializations'}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'is' ? '24/7 neyðarþjónusta' : '24/7 Emergency Service'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'is'
                  ? 'Sólarhringsþjónusta fyrir vatnsláka og neyðartilvik. Meðalviðbragðstími innan 30 mínútna.'
                  : '24-hour service for water leaks and emergencies. Average response time within 30 minutes.'
                }
              </p>
              <div className="text-red-600 font-semibold">
                {language === 'is' ? 'Neyðargjald: 1.500-2.200 kr/klst' : 'Emergency rate: 1,500-2,200 kr/hour'}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'is' ? 'Baðherbergisendurnýjun' : 'Bathroom Renovation'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'is'
                  ? 'Sérhæfð þjónusta fyrir baðherbergisverkefni. Frá einföldum viðgerðum til heildarendurnýjunar.'
                  : 'Specialized service for bathroom projects. From simple repairs to complete renovation.'
                }
              </p>
              <div className="text-blue-600 font-semibold">
                {language === 'is' ? 'Verkefnisverð: 150.000-800.000 kr' : 'Project price: 150,000-800,000 kr'}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'is' ? 'Hitakerfi' : 'Heating Systems'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'is'
                  ? 'Uppsetning og viðhald hitakerfa, radíatora og gólfhitunar fyrir öll hús.'
                  : 'Installation and maintenance of heating systems, radiators and underfloor heating for all houses.'
                }
              </p>
              <div className="text-orange-600 font-semibold">
                {language === 'is' ? 'Kerfisverð: 80.000-350.000 kr' : 'System price: 80,000-350,000 kr'}
              </div>
            </div>
          </div>
          
          <div className="bg-blue-100 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
              {language === 'is' ? 'Hvað hefur áhrif á verðið?' : 'What affects the price?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'is' ? 'Helstu verðáhrifaþættir:' : 'Main price factors:'}
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    {language === 'is' ? 'Stærð og umfang verkefnis' : 'Size and scope of project'}
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    {language === 'is' ? 'Efni og búnaður' : 'Materials and equipment'}
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    {language === 'is' ? 'Aðgengi að pípum' : 'Access to pipes'}
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    {language === 'is' ? 'Flækjustig uppsetningar' : 'Installation complexity'}
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'is'
                    ? 'Verð pípulagningamanns fer eftir stærð verkefnis, tíma sem þarf til að vinna verkið og hvaða búnaður þarf. Ef pípulagningamaðurinn þarf að panta íhluti eða búnað sem á að setja upp mun það einnig hækka heildarverðið.'
                    : 'The price of a plumber depends on the size of the project, the time needed to do the work and what equipment is needed. If the plumber needs to order components or equipment to be installed, this will also increase the total price.'
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
            {language === 'is' ? 'Pípulagnaverkefni' : 'Plumbing Projects'}
          </h2>
          <p className="text-gray-600 text-center mb-12">
            {language === 'is' 
              ? 'Á undanförnum 12 mánuðum hefur verið lagt út á BuildConnect:'
              : 'In the past 12 months, posted on BuildConnect:'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">3,640</div>
              <div className="text-xl text-gray-600">
                {language === 'is' ? 'verkefni' : 'projects'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">987</div>
              <div className="text-xl text-gray-600">
                {language === 'is' ? 'umsagnir' : 'reviews'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-xl text-gray-600">
                {language === 'is' ? 'af 5 stjörnum' : 'of 5 stars'}
              </div>
            </div>
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
              to="/post?category=plumbing"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni ókeypis' : 'Post project for free'}
            </Link>
            <Link 
              to="/bedriftsok?category=roerlegger"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {language === 'is' ? 'Finn pípulagningamenn' : 'Find plumbers'}
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm opacity-90">
            <div className="flex items-center justify-center">
              <span className="mr-2">✓</span>
              {language === 'is' ? 'Ókeypis að leggja út verkefni' : 'Free to post projects'}
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">✓</span>
              {language === 'is' ? 'Neyðarþjónusta í boði' : 'Emergency service available'}
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">✓</span>
              {language === 'is' ? 'Löggiltir fagmenn' : 'Licensed professionals'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlumberPage;