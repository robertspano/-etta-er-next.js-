import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InteriorRenovationCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const interiorServices = [
    {
      id: 'bathroom-renovation',
      name: language === 'is' ? 'Baðherbergisendurnýjun' : 'Bathroom Renovation',
      nameEnglish: 'Bathroom Renovation',
      description: language === 'is' 
        ? 'Heildarendurnýjun baðherbergja með nútímalegum búnaði og hönnun.'
        : 'Complete bathroom renovations with modern fixtures and design.',
      professionals: 1400,
      averagePrice: language === 'is' ? '800.000-2.500.000 kr' : '£4,000-12,500',
      completedJobs: 5600,
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Flísavinna', 'Pípulagnir', 'Rafmagn', 'Hönnun']
        : ['Tiling', 'Plumbing', 'Electrical', 'Design']
    },
    {
      id: 'kitchen-renovation',
      name: language === 'is' ? 'Eldhúsendurnýjun' : 'Kitchen Renovation',
      nameEnglish: 'Kitchen Renovation',
      description: language === 'is'
        ? 'Sérsniðin eldhús með nýjustu tækjum og innréttingum.'
        : 'Custom kitchens with the latest appliances and built-ins.',
      professionals: 1200,
      averagePrice: language === 'is' ? '1.200.000-4.000.000 kr' : '£6,000-20,000',
      completedJobs: 4200,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Innréttingar', 'Tæki', 'Hönnun', 'Skipulag']
        : ['Built-ins', 'Appliances', 'Design', 'Layout']
    },
    {
      id: 'flooring',
      name: language === 'is' ? 'Gólfefni' : 'Flooring',
      nameEnglish: 'Flooring',
      description: language === 'is'
        ? 'Uppsetning og endurnýjun gólfa - parkett, flísar, dúkar og meira.'
        : 'Installation and renovation of floors - hardwood, tiles, carpets and more.',
      professionals: 900,
      averagePrice: language === 'is' ? '150.000-600.000 kr' : '£750-3,000',
      completedJobs: 7800,
      image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Parkett', 'Flísar', 'Dúkar', 'Viðhald']
        : ['Hardwood', 'Tiles', 'Carpet', 'Maintenance']
    },
    {
      id: 'interior-painting',
      name: language === 'is' ? 'Innri málun' : 'Interior Painting',
      nameEnglish: 'Interior Painting',
      description: language === 'is'
        ? 'Fagleg málning innanhúss með gæða efnum og litaráðgjöf.'
        : 'Professional interior painting with quality materials and color consultation.',
      professionals: 1600,
      averagePrice: language === 'is' ? '80.000-300.000 kr' : '£400-1,500',
      completedJobs: 9200,
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Litaráðgjöf', 'Séráferðir', 'Veggfóður', 'Viðhald']
        : ['Color Consultation', 'Special Textures', 'Wallpaper', 'Maintenance']
    },
    {
      id: 'living-room-renovation',
      name: language === 'is' ? 'Stofa og uppholdsstofur' : 'Living Room Renovation',
      nameEnglish: 'Living Room Renovation',
      description: language === 'is'
        ? 'Endurnýjun og hönnun á stofum og félagslegum rýmum heimilisins.'
        : 'Renovation and design of living rooms and social spaces in the home.',
      professionals: 800,
      averagePrice: language === 'is' ? '400.000-1.500.000 kr' : '£2,000-7,500',
      completedJobs: 3400,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Húsgögn', 'Lýsing', 'Skipulag', 'Innréttingar']
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