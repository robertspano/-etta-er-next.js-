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
            {language === 'is' ? 'Rafmagnsþjónusta' : 'Electrical Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
          
          {/* Pricing Information */}
          <div className="bg-yellow-50 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'is' ? 'Hvað kostar rafvirki?' : 'What does an electrician cost?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">890-1200 kr/hour</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Venjulegur tímagjald rafvirkja' : 'Typical electrician hourly rate'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">28,000 kr</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Meðaltal verkefnis á BuildConnect 2025' : 'Average project on BuildConnect 2025'}
                </p>
              </div>
            </div>
          </div>
          
          {/* What can electricians help with */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'is' ? 'Hvað getur rafvirki hjálpað við?' : 'What can an electrician help with?'}
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              {language === 'is'
                ? 'Stutt svar: Ef það tengist rafmagni, þá getur rafvirki hjálpað. Allt frá því að leggja víra og setja upp úttök til að setja inn ljósaspottur.'
                : 'Short answer: If it\'s related to electricity, an electrician can help. Everything from laying wires and installing outlets to putting in spotlights.'
              }
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'is' ? 'Rafvirkjar á BuildConnect geta hjálpað þér við:' : 'Electricians on BuildConnect can help you with:'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { is: 'Setja upp eða skipta rafskáp', en: 'Install or replace fuse box' },
                { is: 'Setja upp, kanna eða skipta rafkerfi', en: 'Install, inspect or replace electrical system' },
                { is: 'Setja upp rafbílahleðslu', en: 'Install EV charging station' },
                { is: 'Setja upp eða flytja úttök', en: 'Install or move outlets' },
                { is: 'Setja upp gólfhitun', en: 'Install underfloor heating' },
                { is: 'Setja upp ljósaspotta og aðra lýsingu', en: 'Install spotlights and other lighting' },
                { is: 'Ýmis viðgerðarþjónusta', en: 'Various repair services' },
                { is: 'Neyðarþjónusta sólarhringslega', en: '24-hour emergency service' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-yellow-500 mr-2">✓</span>
                  <span className="text-gray-700">{language === 'is' ? item.is : item.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* When do you need an electrician */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Hvenær þarftu rafvirkja?' : 'When do you need an electrician?'}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'is' ? 'Endurnýja eldhús' : 'Kitchen Renovation'}
              </h3>
              <p className="text-gray-600">
                {language === 'is' 
                  ? 'Þegar þú ert að endurnýja eldhúsið þarftu rafvirkja fyrir nýja lýsingu, úttök og rafmagnstæki. Stór tæki þurfa sérstaka rafrás.'
                  : 'When renovating the kitchen you need an electrician for new lighting, outlets and electrical appliances. Large appliances need dedicated circuits.'
                }
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🚿</div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'is' ? 'Endurnýja baðherbergi' : 'Bathroom Renovation'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Við endurnýjun baðherbergis þarftu rafvirkja fyrir hitakaðla, nýja lýsingu, úttök og hitastýringu. Vatn og rafmagn krefjast sérstakrar varúðar.'
                  : 'For bathroom renovation you need an electrician for heating cables, new lighting, outlets and temperature control. Water and electricity require special precautions.'
                }
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'is' ? 'Skipta rafskáp' : 'Replace Fuse Box'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Ef þú býrð í gamlri íbúð með gömul öryggisrofa getur verið skynsamlegt að uppfæra rafskápinn, sérstaklega ef hann vantar jarðveiturofar.'
                  : 'If you live in an old apartment with old fuses it might be wise to upgrade the fuse box, especially if it lacks ground fault circuit breakers.'
                }
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              {language === 'is'
                ? 'Þú mátt framkvæma smá rafmagnsvinnu sjálfur, eins og að skipta um dekslið á úttökum og tengja frístæða eða festar ljósastæður með úttaki.'
                : 'You may perform minor electrical work yourself, such as changing outlet covers and connecting freestanding or fixed light fixtures with outlets.'
              }
            </p>
            <div className="bg-yellow-100 p-6 rounded-lg">
              <p className="text-gray-800 font-medium">
                {language === 'is'
                  ? '⚠️ En ef þú átt að tengja sykurjabita, leggja víra eða meira ættir þú að nota rafvirkja. Ef þú velur að framkvæma slík störf sjálfur áttu á hættu að tryggingafélagið hjálpi ekki ef eitthvað fer úrskeiðis.'
                  : '⚠️ But if you need to connect junction boxes, lay wires or more you should use an electrician. If you choose to perform such work yourself you risk that the insurance company won\'t help if something goes wrong.'
                }
              </p>
            </div>
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

      {/* How to choose the right electrician */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Hvernig á að velja réttan rafvirkja' : 'How to choose the right electrician'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {language === 'is' ? 'Fáðu mörg tilboð' : 'Get multiple quotes'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Auðveldasta leiðin til að finna réttan rafvirkja er að fá mörg tilboð og bera þau saman. Notaðu þjónustu eins og BuildConnect.'
                  : 'The easiest way to find the right electrician is to get multiple quotes and compare them. Use a service like BuildConnect.'
                }
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {language === 'is' ? 'Bjóðu á skoðun' : 'Invite for inspection'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Þú ættir að bjóða viðeigandi rafvirkjafyrirtækjum á skoðun áður en þú samþykkir tilboð. Ræddu mögulegar lausnir fyrir verkefnið þitt.'
                  : 'You should invite relevant electrician companies for an inspection before accepting a quote. Discuss possible solutions for your project.'
                }
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {language === 'is' ? 'Athugaðu umsagnir' : 'Check reviews'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Þegar þú velur rafvirkjafyrirtæki er mikilvægt að kanna mat fyrri viðskiptavina. Lestu umsagnir rafvirkjans til að fá góða innsýn.'
                  : 'When choosing an electrician company, it\'s important to check previous customers\' ratings. Read the electrician\'s reviews to get good insight.'
                }
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {language === 'is' ? 'Krefjist samnings' : 'Demand a contract'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Allir alvörugir iðnaðarmenn munu biðja um að skrifa samning við viðskiptavininn fyrir verkefnið sem á að framkvæma.'
                  : 'All serious craftsmen will ask to write a contract with the customer for the project to be performed.'
                }
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {language === 'is' ? 'Greiddu alltaf hvítt' : 'Always pay white'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Þú ættir alltaf að greiða hvítt þegar þú kaupir iðnaðarþjónustu. Ef þú greiðir svart getur þú misst ábyrgð og kvörtunarrétt.'
                  : 'You should always pay white when buying craftsman services. If you pay black you can lose warranty and complaint rights.'
                }
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {language === 'is' ? 'Athugaðu fjármál' : 'Check finances'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Athugaðu fjárhagsleg heilbrigði fyrirtækisins. Þú getur fundið þessar upplýsingar á síðum eins og creditinfo.is eða rsk.is.'
                  : 'Check the company\'s financial health. You can find this information on sites like creditinfo.is or rsk.is.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Nýleg verkefni á BuildConnect' : 'Recent projects on BuildConnect'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: language === 'is' ? 'Flytja rafbílahleðslu' : 'Move EV charging station',
                location: language === 'is' ? 'Reykjavík' : 'Reykjavik',
                description: language === 'is' 
                  ? 'Ég óska eftir tilboði í að flytja hleðslukassa. Ef mögulegt er, vil ég forðast að draga alveg nýjan kapal.'
                  : 'I want a quote for moving the charging box. If possible, I want to avoid pulling a completely new cable.'
              },
              {
                title: language === 'is' ? 'Hengja upp ljós' : 'Hang up lights',
                location: language === 'is' ? 'Kópavogur' : 'Kopavogur', 
                description: language === 'is'
                  ? 'Hengja upp ljós í gangi. Hér þarf að leggja festing í loft og tengja ljósatengju.'
                  : 'Hang up light in hallway. Here needs to put fixture in ceiling and connect light socket.'
              },
              {
                title: language === 'is' ? 'Setja upp 4 ný takljós' : 'Install 4 new ceiling lights',
                location: language === 'is' ? 'Hafnarfjörður' : 'Hafnarfjordur',
                description: language === 'is'
                  ? 'Setja upp 4 ný takljós og ýmislegt. Treng hjálp við að setja upp 4 ný takljós og gera við 1 tengi.'
                  : 'Install 4 new ceiling lights and miscellaneous. Need help installing 4 new ceiling lights and fix 1 connection.'
              }
            ].map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm text-yellow-600 mb-3">📍 {project.location}</p>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/post?category=electrical"
              className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              {language === 'is' ? 'Legg út þitt verkefni' : 'Post your project'}
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