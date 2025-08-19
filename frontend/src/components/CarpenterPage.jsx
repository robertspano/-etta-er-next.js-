import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CarpenterPage = ({ translations, language }) => {
  const [selectedCarpenter, setSelectedCarpenter] = useState(null);

  const carpentryServices = [
    {
      id: 'furniture-making',
      name: language === 'is' ? 'Húsgagnasmiða' : 'Furniture Making',
      description: language === 'is' 
        ? 'Handunnin húsgögn og innréttingar eftir þínum þörfum og nákvæmri hönnun.'
        : 'Handcrafted furniture and built-ins according to your needs and precise design.',
      price: language === 'is' ? '15.000-25.000 kr/klst' : '900-1500 kr/hour',
      icon: '🪑'
    },
    {
      id: 'renovation-carpentry',
      name: language === 'is' ? 'Endurbótaviðgerðir' : 'Renovation Carpentry',
      description: language === 'is'
        ? 'Trésmíði fyrir endurbætur, parket, innra klæðning og byggjarbreytingar.'
        : 'Carpentry work for renovations, flooring, interior cladding and structural changes.',
      price: language === 'is' ? '12.000-20.000 kr/klst' : '800-1300 kr/hour',
      icon: '🏠'
    },
    {
      id: 'deck-construction',
      name: language === 'is' ? 'Veranda og útimannvirki' : 'Deck & Outdoor Construction',
      description: language === 'is'
        ? 'Bygging veranda, palla og útimannvirkja úr veðurþolnu gæðatré.'
        : 'Construction of decks, patios and outdoor structures from weather-resistant quality wood.',
      price: language === 'is' ? '16.000-24.000 kr/klst' : '1000-1600 kr/hour',
      icon: '🏗️'
    },
    {
      id: 'kitchen-carpentry',
      name: language === 'is' ? 'Eldhúsinnréttingar' : 'Kitchen Carpentry',
      description: language === 'is'
        ? 'Sérhæfð trésmíði fyrir eldhúsinnréttingar, skápa og vinnuborð.'
        : 'Specialized carpentry for kitchen installations, cabinets and worktops.',
      price: language === 'is' ? '18.000-28.000 kr/klst' : '1100-1700 kr/hour',
      icon: '👨‍🍳'
    },
    {
      id: 'flooring-installation',
      name: language === 'is' ? 'Gólflagning' : 'Flooring Installation',
      description: language === 'is'
        ? 'Fagleg uppsetning parkets, laminats og annarra tréyfirborða.'
        : 'Professional installation of parquet, laminate and other wood surfaces.',
      price: language === 'is' ? '10.000-18.000 kr/klst' : '700-1200 kr/hour',
      icon: '🪵'
    },
    {
      id: 'roofing-carpentry',
      name: language === 'is' ? 'Þaksmíði' : 'Roofing Carpentry',
      description: language === 'is'
        ? 'Þakstólssmíði, kippubyggingar og þakviðgerðir með áratuga reynslu.'
        : 'Roof truss construction, rafter building and roof repairs with decades of experience.',
      price: language === 'is' ? '14.000-22.000 kr/klst' : '900-1400 kr/hour',
      icon: '🏠'
    },
    {
      id: 'repair-restoration',
      name: language === 'is' ? 'Viðgerðir og endurnýjun' : 'Repair & Restoration',
      description: language === 'is'
        ? 'Viðgerð og endurnýjun gamlra húsgagna, trésmíðaverka og sögulegra byggingarhluta.'
        : 'Repair and restoration of old furniture, woodwork and historic building components.',
      price: language === 'is' ? '11.000-19.000 kr/klst' : '700-1300 kr/hour',
      icon: '🔨'
    }
  ];

  const topCarpenters = [
    {
      id: '1',
      name: 'Icelandic Woodworks',
      location: 'Reykjavik',
      rating: 4.9,
      reviewCount: 234,
      completedJobs: 412,
      isVerified: true,
      isInsured: true,
      description: language === 'is' 
        ? 'Sérfræðingar í handunnin húsgögn og sérsniðna innréttingu. Yfir 20 ára reynsla.'
        : 'Specialists in handcrafted furniture and custom built-ins. Over 20 years of experience.',
      services: language === 'is'
        ? ['Húsgögn', 'Innréttingar', 'Endurbætur', 'Hönnun']
        : ['Furniture', 'Built-ins', 'Renovations', 'Design'],
      priceRange: language === 'is' ? '12.000-20.000 kr/klst' : '£60-100/hour',
      phoneNumber: '+354 789 0123',
      established: 2004,
      employees: '15-25',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop',
      specializations: language === 'is' 
        ? ['Sérhúsgögn', 'Lúxusvinna', 'Endurnýjun']
        : ['Custom Furniture', 'Luxury Work', 'Restoration']
    },
    {
      id: '2',
      name: 'Nordic Carpentry Solutions',
      location: 'Hafnarfjörður',
      rating: 4.8,
      reviewCount: 178,
      completedJobs: 298,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Faglegir trésmíðir með áherslu á sjálfbæra og umhverfisvæna byggingaraðferðir.'
        : 'Professional carpenters with focus on sustainable and eco-friendly building methods.',
      services: language === 'is'
        ? ['Sjálfbærni', 'Verandur', 'Parkett', 'Viðhald']
        : ['Sustainability', 'Decks', 'Flooring', 'Maintenance'],
      priceRange: language === 'is' ? '11.000-17.000 kr/klst' : '£55-85/hour',
      phoneNumber: '+354 890 1234',
      established: 2010,
      employees: '10-18',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Sjálfbært tré', 'Verandur', 'Parkett']
        : ['Sustainable Wood', 'Decks', 'Flooring']
    },
    {
      id: '3',
      name: 'Artisan Wood Iceland',
      location: 'Garðabær',
      rating: 4.7,
      reviewCount: 156,
      completedJobs: 223,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Listrænt handverk og sérsniðnar lausnir fyrir heimilið og fyrirtækið.'
        : 'Artistic craftsmanship and custom solutions for homes and businesses.',
      services: language === 'is'
        ? ['Listræn vinna', 'Sérhönnun', 'Viðgerðir', 'Ráðgjöf']
        : ['Artistic Work', 'Custom Design', 'Repairs', 'Consultation'],
      priceRange: language === 'is' ? '13.000-22.000 kr/klst' : '£65-110/hour',
      phoneNumber: '+354 901 2345',
      established: 2012,
      employees: '6-12',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Listrænar lausnir', 'Hönnun', 'Lúxus']
        : ['Artistic Solutions', 'Design', 'Luxury']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Iðnaður' : 'Handcraft', href: '/haandverker' },
    { name: language === 'is' ? 'Trésmíðamaður' : 'Carpenter', href: null }
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
      <div className="relative bg-amber-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Trésmíðamaður' : 'Carpenter'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {language === 'is'
                  ? 'Finndu hæfa trésmíðamenn fyrir öll verkefni úr tré. Frá húsgögnum til stórra byggingarverkefna.'
                  : 'Find qualified carpenters for all wood projects. From furniture to large construction projects.'
                }
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-amber-600 mb-1">2,200+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Trésmíðamenn' : 'Carpenters'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">8,200+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Verkefni' : 'Projects'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-brown-600 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Einkunn' : 'Rating'}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  to="/bedriftsok?category=snekker"
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  {language === 'is' ? 'Finn trésmíðamann' : 'Find carpenter'}
                </Link>
                <Link 
                  to="/post?category=carpentry"
                  className="border border-amber-600 text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
                >
                  {language === 'is' ? 'Legg út verk' : 'Post job'}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
                alt="Carpenter working"
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
            {language === 'is' ? 'Trésmíðaþjónusta' : 'Carpentry Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carpentryServices.map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-amber-600 font-medium text-sm">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Carpenters Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Bestu trésmíðamennirnir' : 'Top Carpenters'}
          </h2>
          
          <div className="space-y-6">
            {topCarpenters.map(carpenter => (
              <div key={carpenter.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={carpenter.image}
                      alt={carpenter.name}
                      className="w-full md:w-32 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{carpenter.name}</h3>
                          {carpenter.isVerified && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Staðfest' : 'Verified'}
                            </span>
                          )}
                          {carpenter.isInsured && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Tryggður' : 'Insured'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            {renderStars(carpenter.rating)}
                            <span className="ml-1 text-sm text-gray-600">
                              {carpenter.rating} ({carpenter.reviewCount} {language === 'is' ? 'umsagnir' : 'reviews'})
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {carpenter.completedJobs} {language === 'is' ? 'lokið verkefni' : 'completed jobs'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{carpenter.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {carpenter.specializations.map(spec => (
                            <span key={spec} className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📍 {carpenter.location}</span>
                          <span>💰 {carpenter.priceRange}</span>
                          <span>🏢 {carpenter.employees} {language === 'is' ? 'starfsmenn' : 'employees'}</span>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 mt-4 md:mt-0">
                        <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                          <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors">
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
              to="/bedriftsok?category=snekker"
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              {language === 'is' ? 'Sjá alla trésmíðamenn' : 'See all carpenters'}
            </Link>
          </div>
        </div>
      </div>

      {/* Wood Types Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Trétegundir og efni' : 'Wood Types & Materials'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌲</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Innlent tré' : 'Local Wood'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Birkitré, furuviður og önnur innlend tré af bestu gæðum.'
                  : 'Birch, pine and other local woods of the highest quality.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Sjálfbært' : 'Sustainable'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Umhverfisvæn og sjálfbær efnisval fyrir framtíðina.'
                  : 'Eco-friendly and sustainable material choices for the future.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Handverk' : 'Craftsmanship'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Hefðbundið handverk með nútímalegri tækni.'
                  : 'Traditional craftsmanship with modern technology.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-amber-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu trésmíðamann?' : 'Need a carpenter?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Fáðu tilboð frá faglegum trésmíðamönnum á þínu svæði.'
              : 'Get quotes from professional carpenters in your area.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/post?category=carpentry"
              className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              to="/bedriftsok?category=snekker"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              {language === 'is' ? 'Finn trésmíðamenn' : 'Find carpenters'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarpenterPage;