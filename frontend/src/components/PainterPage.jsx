import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PainterPage = ({ translations, language }) => {
  const [selectedPainter, setSelectedPainter] = useState(null);

  const paintingServices = [
    {
      id: 'interior-painting',
      name: language === 'is' ? 'Innri málun' : 'Interior Painting',
      description: language === 'is' 
        ? 'Fagleg innri málun veggjá, lofta og húsgagna með hágæða efnum og fullkomnum frágangi.'
        : 'Professional interior painting of walls, ceilings and furniture with high-quality materials and perfect finish.',
      price: language === 'is' ? '12.000-20.000 kr/klst' : '700-1200 kr/hour',
      icon: '🏠'
    },
    {
      id: 'exterior-painting',
      name: language === 'is' ? 'Ytri málun' : 'Exterior Painting',
      description: language === 'is'
        ? 'Veðurþolinn málning húsveggja og utanhúss með langtímavernd gegn íslenskum veðri.'
        : 'Weather-resistant painting of house walls and exteriors with long-term protection against Icelandic weather.',
      price: language === 'is' ? '15.000-25.000 kr/klst' : '900-1500 kr/hour',
      icon: '🏡'
    },
    {
      id: 'wallpaper-services',
      name: language === 'is' ? 'Veggfóðurþjónusta' : 'Wallpaper Services',
      description: language === 'is'
        ? 'Fagleg uppsetning og fjarlæging veggfóðurs, þar á meðal sérstök mynstur og áferðir.'
        : 'Professional installation and removal of wallpaper, including special patterns and textures.',
      price: language === 'is' ? '10.000-18.000 kr/klst' : '600-1100 kr/hour',
      icon: '📜'
    },
    {
      id: 'surface-preparation',
      name: language === 'is' ? 'Yfirborðsundirbúningur' : 'Surface Preparation',
      description: language === 'is'
        ? 'Sparkling, slípun og fullkominn undirbúningur yfirborða fyrir bestu niðurstöður.'
        : 'Filling, sanding and perfect surface preparation for optimal painting results.',
      price: language === 'is' ? '8.000-14.000 kr/klst' : '500-900 kr/hour',
      icon: '🔨'
    },
    {
      id: 'decorative-painting',
      name: language === 'is' ? 'Skrautmálun' : 'Decorative Painting',
      description: language === 'is'
        ? 'Sérhæfð skrautmálun, faux finish og listrænar áferðir fyrir sérstök verkefni.'
        : 'Specialized decorative painting, faux finishes and artistic textures for special projects.',
      price: language === 'is' ? '18.000-30.000 kr/klst' : '1100-1800 kr/hour',
      icon: '🎨'
    },
    {
      id: 'wood-staining',
      name: language === 'is' ? 'Trébeitsun' : 'Wood Staining',
      description: language === 'is'
        ? 'Fagleg beitsun og vörn viðaryfirborða innandyra og utandyra.'
        : 'Professional staining and protection of wood surfaces both indoor and outdoor.',
      price: language === 'is' ? '14.000-22.000 kr/klst' : '800-1300 kr/hour',
      icon: '🪵'
    },
    {
      id: 'restoration-painting',
      name: language === 'is' ? 'Endurnýjunarmálun' : 'Restoration Painting',
      description: language === 'is'
        ? 'Sérhæfð endurnýjun og viðgerðir á gömlum byggingum og sögulegum húsum.'
        : 'Specialized restoration and repairs on old buildings and historic houses.',
      price: language === 'is' ? '16.000-28.000 kr/klst' : '1000-1600 kr/hour',
      icon: '🏛️'
    }
  ];

  const topPainters = [
    {
      id: '1',
      name: 'Reykjavik Paint Masters',
      location: 'Reykjavik',
      rating: 4.9,
      reviewCount: 187,
      completedJobs: 345,
      isVerified: true,
      isInsured: true,
      description: language === 'is' 
        ? 'Reyndir málarar með sérhæfingu í innri og ytri málningu. Yfir 15 ára reynsla.'
        : 'Experienced painters specializing in interior and exterior painting. Over 15 years of experience.',
      services: language === 'is'
        ? ['Innri málun', 'Ytri málun', 'Veggfóður', 'Sparkling']
        : ['Interior Painting', 'Exterior Painting', 'Wallpaper', 'Surface Prep'],
      priceRange: language === 'is' ? '9.000-15.000 kr/klst' : '£45-75/hour',
      phoneNumber: '+354 456 7890',
      established: 2009,
      employees: '12-20',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop',
      specializations: language === 'is' 
        ? ['Lúxusmálun', 'Húsmálun', 'Viðgerðir']
        : ['Luxury Painting', 'House Painting', 'Repairs']
    },
    {
      id: '2',
      name: 'Iceland Professional Painters',
      location: 'Kópavogur',
      rating: 4.8,
      reviewCount: 142,
      completedJobs: 256,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Sérfræðingar í umhverfisvænni málningu og sérstakri yfirborðsmeðhöndlun.'
        : 'Specialists in eco-friendly painting and special surface treatments.',
      services: language === 'is'
        ? ['Umhverfisvæn málning', 'Sérstök áferð', 'Endurnýjun', 'Ráðgjöf']
        : ['Eco-Friendly Paint', 'Special Textures', 'Restoration', 'Consultation'],
      priceRange: language === 'is' ? '10.000-16.000 kr/klst' : '£50-80/hour',
      phoneNumber: '+354 567 8901',
      established: 2014,
      employees: '8-12',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Umhverfisvæn efni', 'Séráferðir', 'Endurnýjun']
        : ['Eco Materials', 'Custom Textures', 'Restoration']
    },
    {
      id: '3',
      name: 'Arctic Paint Solutions',
      location: 'Akureyri',
      rating: 4.7,
      reviewCount: 89,
      completedJobs: 167,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Norðuríslenskur málningasérfræðingur með áherslu á veðurþol og gæði.'
        : 'Northern Iceland painting specialist with focus on weather resistance and quality.',
      services: language === 'is'
        ? ['Ytri málun', 'Veðurvernd', 'Iðnaðarmálun', 'Viðhald']
        : ['Exterior Painting', 'Weather Protection', 'Industrial Paint', 'Maintenance'],
      priceRange: language === 'is' ? '8.500-14.000 kr/klst' : '£42-70/hour',
      phoneNumber: '+354 678 9012',
      established: 2011,
      employees: '6-10',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=200&fit=crop',
      specializations: language === 'is'
        ? ['Veðurþol', 'Iðnaðarverk', 'Viðhald']
        : ['Weather Resistance', 'Industrial Work', 'Maintenance']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Iðnaður' : 'Handcraft', href: '/haandverker' },
    { name: language === 'is' ? 'Málari' : 'Painter', href: null }
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
      <div className="relative bg-purple-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Málari' : 'Painter'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {language === 'is'
                  ? 'Finndu hæfa málara fyrir öll málningarverkefni. Frá einföldum herbergjum til heillar húsamálningar.'
                  : 'Find qualified painters for all painting projects. From simple rooms to complete house painting.'
                }
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-1">1,400+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Málarar' : 'Painters'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">8,600+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Verkefni 2025' : 'Projects 2025'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-orange-600 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">
                    {language === 'is' ? 'Meðaleinkunn' : 'Average rating'}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  to="/bedriftsok?category=maler"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  {language === 'is' ? 'Finn málara' : 'Find painter'}
                </Link>
                <Link 
                  to="/post?category=painting"
                  className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  {language === 'is' ? 'Legg út verk' : 'Post job'}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop"
                alt="Painter working"
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
            {language === 'is' ? 'Málunarþjónusta' : 'Painting Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {paintingServices.slice(0,4).map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-purple-600 font-medium text-sm">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {paintingServices.slice(4).map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-purple-600 font-medium text-sm">
                  {service.price}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pricing Information */}
          <div className="bg-purple-50 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'is' ? 'Hvað kostar málari?' : 'What does a painter cost?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">700-1500 kr/hour</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Venjulegur tímagjald málara' : 'Typical painter hourly rate'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">22,000 kr</div>
                <p className="text-gray-600">
                  {language === 'is' ? 'Meðaltal verkefnis á BuildConnect 2025' : 'Average project on BuildConnect 2025'}
                </p>
              </div>
            </div>
          </div>
          
          {/* What can painters help with */}
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'is' ? 'Hvað getur málari hjálpað við?' : 'What can a painter help with?'}
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              {language === 'is'
                ? 'Málarar geta hjálpað við allt sem tengist málningu og yfirborðsmeðhöndlun. Frá einfaldri innri málningu til flókinna utanaðkomandi verkefna.'
                : 'Painters can help with everything related to painting and surface treatment. From simple interior painting to complex exterior projects.'
              }
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'is' ? 'Málarar á BuildConnect geta hjálpað þér við:' : 'Painters on BuildConnect can help you with:'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { is: 'Innri málun allra herbergja', en: 'Interior painting of all rooms' },
                { is: 'Ytri málun húsa og bygginga', en: 'Exterior painting of houses and buildings' },
                { is: 'Veggfóður uppsetning og fjarlæging', en: 'Wallpaper installation and removal' },
                { is: 'Sparkling og yfirborðsundirbúning', en: 'Filling and surface preparation' },
                { is: 'Skrautmálun og séráferðir', en: 'Decorative painting and special finishes' },
                { is: 'Trébeitsun og verndun', en: 'Wood staining and protection' },
                { is: 'Endurnýjun og viðgerðir', en: 'Restoration and repairs' },
                { is: 'Litaráðgjöf og þjónusta', en: 'Color consultation and service' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span className="text-gray-700">{language === 'is' ? item.is : item.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Painters Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Bestu málararnirnir' : 'Top Painters'}
          </h2>
          
          <div className="space-y-6">
            {topPainters.map(painter => (
              <div key={painter.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={painter.image}
                      alt={painter.name}
                      className="w-full md:w-32 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{painter.name}</h3>
                          {painter.isVerified && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Staðfest' : 'Verified'}
                            </span>
                          )}
                          {painter.isInsured && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              {language === 'is' ? 'Tryggður' : 'Insured'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            {renderStars(painter.rating)}
                            <span className="ml-1 text-sm text-gray-600">
                              {painter.rating} ({painter.reviewCount} {language === 'is' ? 'umsagnir' : 'reviews'})
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {painter.completedJobs} {language === 'is' ? 'lokið verkefni' : 'completed jobs'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{painter.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {painter.specializations.map(spec => (
                            <span key={spec} className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📍 {painter.location}</span>
                          <span>💰 {painter.priceRange}</span>
                          <span>🏢 {painter.employees} {language === 'is' ? 'starfsmenn' : 'employees'}</span>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 mt-4 md:mt-0">
                        <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
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
              to="/bedriftsok?category=maler"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {language === 'is' ? 'Sjá alla málara' : 'See all painters'}
            </Link>
          </div>
        </div>
      </div>

      {/* Color Selection Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Litaráðgjöf' : 'Color Consultation'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Litaval' : 'Color Selection'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Fagleg ráðgjöf um liti og áferð fyrir heimili þitt.'
                  : 'Professional advice on colors and textures for your home.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🖌️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Gæðaefni' : 'Quality Materials'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Einungis hágæða málning og umhverfisvæn efni.'
                  : 'Only high-quality paint and eco-friendly materials.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Fullkomin árangur' : 'Perfect Results'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Ábyrgð á vinnubrögðum og langtímaarangur.'
                  : 'Guarantee on workmanship and long-term results.'
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
            {language === 'is' ? 'Þarftu málara?' : 'Need a painter?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Fáðu tilboð frá faglegum málurum á þínu svæði.'
              : 'Get quotes from professional painters in your area.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/post?category=painting"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              to="/bedriftsok?category=maler"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {language === 'is' ? 'Finn málara' : 'Find painters'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainterPage;