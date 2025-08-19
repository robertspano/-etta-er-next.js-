import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const topElectricians = [
    {
      id: '1',
      name: 'ElectroMaster Reykjavik',
      location: 'Reykjavik',
      rating: 4.9,
      reviewCount: 89,
      completedJobs: 156,
      isVerified: true,
      isInsured: true,
      description: language === 'is' 
        ? 'Löggilt rafvirkjafyrirtæki með yfir 20 ára reynslu.'
        : 'Authorized electrical installation company with over 20 years of experience.',
      services: language === 'is'
        ? ['Raflagnasetning', 'Viðhald', 'Ljósleiðari', 'Snjallheimili']
        : ['Electrical Installation', 'Maintenance', 'Fiber Installation', 'Smart Home'],
      priceRange: language === 'is' ? '10.000-15.000 kr/klst' : '£50-75/hour',
      phoneNumber: '+354 987 6543',
      established: 2003,
      employees: '10-20',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop',
      specializations: language === 'is' 
        ? ['Íbúðarhúsnæði', 'Atvinnuhúsnæði', 'Iðnaður']
        : ['Residential', 'Commercial', 'Industrial']
    },
    {
      id: '2',
      name: 'Reykjavik Electric Ltd',
      location: 'Reykjavik',
      rating: 4.8,
      reviewCount: 134,
      completedJobs: 289,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Heildar rafvirkjaþjónusta fyrir höfuðborgarsvæðið. Sólarhringsþjónusta í boði.'
        : 'Complete electrical services for the capital area. 24-hour service available.',
      services: language === 'is'
        ? ['Raflagnasetning', 'Neyðarþjónusta', 'LED-lýsing', 'Hitapúmpur']
        : ['Electrical Installation', 'Emergency Service', 'LED Lighting', 'Heat Pumps'],
      priceRange: language === 'is' ? '9.000-14.000 kr/klst' : '£45-70/hour',
      phoneNumber: '+354 456 7890',
      established: 2010,
      employees: '5-10',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Neyðarþjónusta', 'LED kerfi', 'Hitapúmpur']
        : ['Emergency Services', 'LED Systems', 'Heat Pumps']
    },
    {
      id: '3',
      name: 'Northern Electric Iceland',
      location: 'Akureyri',
      rating: 4.7,
      reviewCount: 76,
      completedJobs: 123,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Reyndir rafvirkjar með áherslu á umhverfisvænar lausnir.'
        : 'Experienced electricians with focus on environmentally friendly solutions.',
      services: language === 'is'
        ? ['Sólarsellur', 'Rafbílahleðslur', 'Orkunýtni', 'Sjálfvirkni']
        : ['Solar Panels', 'EV Charging', 'Energy Optimization', 'Automation'],
      priceRange: language === 'is' ? '9.500-13.000 kr/klst' : '£48-65/hour',
      phoneNumber: '+354 234 5678',
      established: 2015,
      employees: '3-5',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Sólarsellur', 'Rafbílahleðslur', 'Orkunýtni']
        : ['Solar Panels', 'EV Charging', 'Energy Optimization']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Hjem', href: '/' },
    { name: language === 'is' ? 'Handverk' : 'Håndverker', href: '/haandverker' },
    { name: language === 'is' ? 'Rafvirki' : 'Elektriker', href: null }
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
                  <div className="text-2xl font-bold text-yellow-600 mb-1">1,800+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Rafvirkjar' : 'Elektrikere'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">9,500+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Verkefni' : 'Prosjekter'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Einkunn' : 'Vurdering'}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  to="/bedriftsok?category=elektriker"
                  className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                >
                  {language === 'is' ? 'Finn rafvirkja' : 'Finn elektriker'}
                </Link>
                <Link 
                  to="/post?category=electrical"
                  className="border border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
                >
                  {language === 'is' ? 'Legg út verk' : 'Legg ut jobb'}
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
            {language === 'is' ? 'Rafmagnsþjónusta' : 'Elektriske tjenester'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </div>

      {/* Top Electricians Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Bestu rafvirkjarnir' : 'Topp elektrikere'}
          </h2>
          
          <div className="space-y-6">
            {topElectricians.map(electrician => (
              <div key={electrician.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={electrician.image}
                      alt={electrician.name}
                      className="w-full md:w-32 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{electrician.name}</h3>
                          {electrician.isVerified && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Staðfest' : 'Verifisert'}
                            </span>
                          )}
                          {electrician.isInsured && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Tryggður' : 'Forsikret'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            {renderStars(electrician.rating)}
                            <span className="ml-1 text-sm text-gray-600">
                              {electrician.rating} ({electrician.reviewCount} {language === 'is' ? 'umsagnir' : 'reviews'})
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {electrician.completedJobs} {language === 'is' ? 'lokið verkefni' : 'completed jobs'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{electrician.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {electrician.specializations.map(spec => (
                            <span key={spec} className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📍 {electrician.location}</span>
                          <span>💰 {electrician.priceRange}</span>
                          <span>🏢 {electrician.employees} {language === 'is' ? 'starfsmenn' : 'ansatte'}</span>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 mt-4 md:mt-0">
                        <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
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
              to="/bedriftsok?category=elektriker"
              className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              {language === 'is' ? 'Sjá alla rafvirkja' : 'See all electricians'}
            </Link>
          </div>
        </div>
      </div>

      {/* Safety & Quality Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Öryggi og gæði' : 'Sikkerhet og kvalitet'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Löggiltir rafvirkjar' : 'Autoriserte elektrikere'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Allir rafvirkjar okkar eru löggiltir og hafa nauðsynlega vottorð.'
                  : 'Alle våre elektrikere er autoriserte og har nødvendige sertifiseringer.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Regluvarsla' : 'Forskriftsmessig'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Öll vinna er unnin samkvæmt gildandi reglugerðum og stöðlum.'
                  : 'Alt arbeid utføres i henhold til gjeldende forskrifter og standarder.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Öryggisábyrgð' : 'Sikkerhetsgaranti'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Við bjóðum upp á ábyrgð á öllum rafmagnstengdum verkum.'
                  : 'Vi tilbyr garanti på alt elektrisk arbeid som utføres.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu rafvirkja?' : 'Trenger du en elektriker?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Fáðu tilboð frá löggiltum rafvirkjum á þínu svæði.'
              : 'Få tilbud fra autoriserte elektrikere i ditt område.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/post?category=electrical"
              className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Legg ut prosjekt'}
            </Link>
            <Link 
              to="/bedriftsok?category=elektriker"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              {language === 'is' ? 'Finn rafvirkja' : 'Finn elektrikere'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricianPage;