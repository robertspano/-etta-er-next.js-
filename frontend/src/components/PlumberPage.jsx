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
      price: language === 'is' ? '12.000-18.000 kr/klst' : '£60-90/hour',
      icon: '🔧'
    },
    {
      id: 'leak-repair',
      name: language === 'is' ? 'Lekageviðgerðir' : 'Leak Repairs',
      description: language === 'is'
        ? 'Fljót og áhrifarík viðgerð á vatnslásum og lekum.'
        : 'Quick and effective repair of water leaks and pipe bursts.',
      price: language === 'is' ? '8.000-15.000 kr/klst' : '£40-75/hour',
      icon: '💧'
    },
    {
      id: 'bathroom-plumbing',
      name: language === 'is' ? 'Baðherbergispípulagnir' : 'Bathroom Plumbing',
      description: language === 'is'
        ? 'Sérhæfð pípulagnaþjónusta fyrir baðherbergisuppbyggingu og endurnýjun.'
        : 'Specialized plumbing services for bathroom construction and renovation.',
      price: language === 'is' ? '15.000-25.000 kr/klst' : '£75-125/hour',
      icon: '🚿'
    },
    {
      id: 'heating-systems',
      name: language === 'is' ? 'Hitakerfi' : 'Heating Systems',
      description: language === 'is'
        ? 'Uppsetning og viðhald rörveitukerfa og radíatora.'
        : 'Installation and maintenance of radiator systems and central heating.',
      price: language === 'is' ? '13.000-20.000 kr/klst' : '£65-100/hour',
      icon: '🔥'
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
                  <div className="text-2xl font-bold text-blue-600 mb-1">1,200+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Pípulagningamenn' : 'Plumbers'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">8,900+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Verkefni' : 'Projects'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Einkunn' : 'Rating'}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Neyðarþjónusta' : 'Emergency Service'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? '24/7 þjónusta' : '24/7 Service'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Sólarhringsþjónusta fyrir vatnsláka og neyðartilvik.'
                  : '24-hour service for water leaks and emergencies.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Fljót viðbrögð' : 'Quick Response'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Meðalviðbragðstími innan 30 mínútna í höfuðborgarsvæðinu.'
                  : 'Average response time within 30 minutes in the capital area.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Löggiltir sérfræðingar' : 'Licensed Professionals'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Allir pípulagningamenn eru löggiltir og tryggðir.'
                  : 'All plumbers are licensed and insured professionals.'
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
            {language === 'is' ? 'Þarftu pípulagningamann?' : 'Need a plumber?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Fáðu tilboð frá löggiltum pípulagningamönnum á þínu svæði.'
              : 'Get quotes from licensed plumbers in your area.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/post?category=plumbing"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              to="/bedriftsok?category=roerlegger"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {language === 'is' ? 'Finn pípulagningamenn' : 'Find plumbers'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlumberPage;