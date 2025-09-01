'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const HandcraftCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const handcraftServices = [
    {
      id: 'carpentry',
      name: language === 'is' ? 'Trésmíðamaður' : 'Carpenter',
      description: language === 'is' 
        ? 'Sérsniðnar viðarvörur, húsgögn og burðarvirki af kunnáttumiklum smíðamönnum.'
        : 'Custom woodwork, furniture and structural elements by skilled carpenters.',
      professionalsText: language === 'is' ? 'Sannreyndir fagmenn' : 'Verified professionals',
      projectsText: language === 'is' ? 'Gæðaverkefni afhent' : 'Quality projects delivered',
      priceText: language === 'is' ? 'Samkeppnishæf verðlagning' : 'Competitive rates',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Trésmíði', 'Innréttingar', 'Húsgögn', 'Viðhald']
        : ['Carpentry', 'Built-ins', 'Furniture', 'Maintenance']
    },
    {
      id: 'plumbing',
      name: language === 'is' ? 'Pípulagningamaður' : 'Plumber',
      description: language === 'is'
        ? 'Faglegir pípulagningamenn fyrir vatn, hita og frárennsliskerfi.'
        : 'Professional plumbers for water, heating and drainage systems.',
      professionalsText: language === 'is' ? 'Traustir sérfræðingar' : 'Trusted experts available',
      projectsText: language === 'is' ? 'Sönnuð reynsla' : 'Proven track record',
      priceText: language === 'is' ? 'Sanngjörn verðlagning' : 'Fair pricing guaranteed',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Vatnslagnir', 'Hitunarkerfi', 'Baðherbergi', 'Viðgerðir']
        : ['Water pipes', 'Heating systems', 'Bathrooms', 'Repairs']
    },
    {
      id: 'painting',
      name: language === 'is' ? 'Málari' : 'Painter',
      description: language === 'is'
        ? 'Fagleg innri og ytri málningarþjónusta með gæða efnivið.'
        : 'Professional interior and exterior painting services with quality materials.',
      professionalsText: language === 'is' ? 'Hæfir sérfræðingar tilbúnir' : 'Skilled specialists ready',
      projectsText: language === 'is' ? 'Gæði í hverju verkefni' : 'Excellence in every project',
      priceText: language === 'is' ? 'Gagnsæ verðlagning' : 'Transparent pricing',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Húsmálun', 'Innri málun', 'Veggsparkl', 'Tapetsetning']
        : ['House painting', 'Interior painting', 'Wall preparation', 'Wallpapering']
    },
    {
      id: 'electrical',
      name: language === 'is' ? 'Rafvirkjar' : 'Electrician',
      description: language === 'is'
        ? 'Örugg og áreiðanleg rafvirkjun af löggiltum rafvirkjum fyrir heimili og fyrirtæki.'
        : 'Safe and reliable electrical work by certified electricians for homes and businesses.',
      professionalsText: language === 'is' ? 'Sannreyndir fagmenn' : 'Verified professionals',
      projectsText: language === 'is' ? 'Gæðaverkefni afhent' : 'Quality projects delivered',
      priceText: language === 'is' ? 'Samkeppnishæf verðlagning' : 'Competitive rates',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Rafvirkjun', 'Ljósauppsetning', 'Varmadælukerfi', 'Viðgerðir']
        : ['Electrical work', 'Lighting installation', 'Heat pump systems', 'Repairs']
    },
    {
      id: 'tiling',
      name: language === 'is' ? 'Flísaleggjari' : 'Tile Installer',
      description: language === 'is'
        ? 'Fagleg flísalögn fyrir baðherbergi, eldhús og útisvæði.'
        : 'Professional tile installation for bathrooms, kitchens and outdoor areas.',
      professionalsText: language === 'is' ? 'Traustir sérfræðingar' : 'Trusted experts available',
      projectsText: language === 'is' ? 'Sönnuð reynsla' : 'Proven track record',
      priceText: language === 'is' ? 'Sanngjörn verðlagning' : 'Fair pricing guaranteed',
      image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Baðherbergisflísar', 'Eldhúsflísar', 'Gólfflísar', 'Múrverk']
        : ['Bathroom tiles', 'Kitchen tiles', 'Floor tiles', 'Masonry']
    },
    {
      id: 'roofing',
      name: language === 'is' ? 'Þaktekkari' : 'Roofer',
      description: language === 'is'
        ? 'Sérhæfðir þaktekkarar fyrir þakviðgerðir og nýlagnir.'
        : 'Specialized roofers for roof repairs and new installations.',
      professionalsText: language === 'is' ? 'Hæfir sérfræðingar tilbúnir' : 'Skilled specialists ready',
      projectsText: language === 'is' ? 'Gæði í hverju verkefni' : 'Excellence in every project',
      priceText: language === 'is' ? 'Gagnsæ verðlagning' : 'Transparent pricing',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakviðgerðir', 'Nýtt þak', 'Þakleki', 'Renningar']
        : ['Roof repairs', 'New roofing', 'Roof leaks', 'Gutters']
    },
    {
      id: 'machinery',
      name: language === 'is' ? 'Vélvirkjar' : 'Machine Contractor',
      description: language === 'is'
        ? 'Þungavélaþjónusta fyrir jarðvinnu og stórframkvæmdir.'
        : 'Heavy machinery services for earthwork and large construction projects.',
      professionalsText: language === 'is' ? 'Sannreyndir fagmenn' : 'Verified professionals',
      projectsText: language === 'is' ? 'Gæðaverkefni afhent' : 'Quality projects delivered',
      priceText: language === 'is' ? 'Samkeppnishæf verðlagning' : 'Competitive rates',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Jarðvinna', 'Greftrun', 'Gröftur', 'Þungavélar']
        : ['Earthwork', 'Excavation', 'Trenching', 'Heavy equipment']
    },
    {
      id: 'metalwork',
      name: language === 'is' ? 'Málmsmiður' : 'Sheet Metal Worker',
      description: language === 'is'
        ? 'Fagleg málmvinna og viðgerðir á þökum og rás kerfum.'
        : 'Professional metalwork and repairs on roofs and gutter systems.',
      professionalsText: language === 'is' ? 'Traustir sérfræðingar' : 'Trusted experts available',
      projectsText: language === 'is' ? 'Sönnuð reynsla' : 'Proven track record',
      priceText: language === 'is' ? 'Sanngjörn verðlagning' : 'Fair pricing guaranteed',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Málmþak', 'Renningar', 'Loftræsting', 'Viðgerðir']
        : ['Metal roofing', 'Gutters', 'Ventilation', 'Repairs']
    },
    {
      id: 'landscaping',
      name: language === 'is' ? 'Garðyrkjumaður' : 'Landscape Gardener',
      description: language === 'is'
        ? 'Fagleg garðhönnun og viðhald fyrir heimili og fyrirtæki.'
        : 'Professional garden design and maintenance for homes and businesses.',
      professionalsText: language === 'is' ? 'Hæfir sérfræðingar tilbúnir' : 'Skilled specialists ready',
      projectsText: language === 'is' ? 'Gæði í hverju verkefni' : 'Excellence in every project',
      priceText: language === 'is' ? 'Gagnsæ verðlagning' : 'Transparent pricing',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Garðhönnun', 'Grasflatar', 'Trjáklippingar', 'Blómabeð']
        : ['Garden design', 'Lawn care', 'Tree pruning', 'Flower beds']
    },
    {
      id: 'locksmith',
      name: language === 'is' ? 'Læsasmiður' : 'Locksmith',
      description: language === 'is'
        ? 'Læsaþjónusta og öryggiskerfi fyrir heimili og fyrirtæki.'
        : 'Lock services and security systems for homes and businesses.',
      professionalsText: language === 'is' ? 'Sannreyndir fagmenn' : 'Verified professionals',
      projectsText: language === 'is' ? 'Gæðaverkefni afhent' : 'Quality projects delivered',
      priceText: language === 'is' ? 'Samkeppnishæf verðlagning' : 'Competitive rates',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Læsaskipti', 'Læsaviðgerðir', 'Öryggiskerfi', 'Neyðaraðgangur']
        : ['Lock changes', 'Lock repairs', 'Security systems', 'Emergency access']
    }
  ];

  return (
    <div className="min-h-screen bg-light_cyan pt-20">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-federal_blue mb-4">
            {language === 'is' ? 'Iðnaður og handverk' : 'Handcraft & Artisan Services'}
          </h1>
          <p className="text-xl text-honolulu_blue max-w-3xl mx-auto">
            {language === 'is'
              ? 'Finndu hæfa iðnaðarmenn fyrir verkefnið þitt. Frá trésmíði til málningarvinnu - við höfum fagmennina sem þú þarft.'
              : 'Find skilled craftsmen for your project. From carpentry to painting work - we have the professionals you need.'
            }
          </p>
        </div>

        {/* Professional Promise Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-non_photo_blue rounded-lg p-6">
            <div className="text-lg font-semibold text-federal_blue mb-2">
              {language === 'is' ? 'Sérvaldir fagmenn' : 'Vetted Professionals'}
            </div>
            <div className="text-honolulu_blue">
              {language === 'is' 
                ? 'Sérvaldir handverksmenn tilbúnir að gera drauma þína að veruleika.'
                : 'Vetted craftsmen ready to transform your vision into reality.'
              }
            </div>
          </div>
          <div className="bg-non_photo_blue rounded-lg p-6">
            <div className="text-lg font-semibold text-federal_blue mb-2">
              {language === 'is' ? 'Gæði tryggð' : 'Quality Guaranteed'}
            </div>
            <div className="text-honolulu_blue">
              {language === 'is' 
                ? 'Frá hugmynd til veruleika - við afhendum gæði.'
                : 'From concept to completion - we deliver excellence.'
              }
            </div>
          </div>
          <div className="bg-non_photo_blue rounded-lg p-6">
            <div className="text-lg font-semibold text-federal_blue mb-2">
              {language === 'is' ? 'Traust og áreiðanleiki' : 'Trust & Reliability'}
            </div>
            <div className="text-honolulu_blue">
              {language === 'is' 
                ? 'Byggjum varanleg sambönd með traustri þjónustu.'
                : 'Building lasting relationships through trusted service.'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-federal_blue text-center mb-12">
            {language === 'is' ? 'Veldu þjónustu' : 'Choose Service'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {handcraftServices.map(service => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden border border-non_photo_blue hover:border-honolulu_blue h-fit"
              >
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-federal_blue mb-2 leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-honolulu_blue mb-4 text-sm leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-honolulu_blue mb-4">
                    <span className="flex items-center">👥 {service.professionalsText}</span>
                    <span className="flex items-center">✅ {service.projectsText}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-xs font-medium text-federal_blue mb-2">
                      {language === 'is' ? 'Sérhæfingar:' : 'Specialties:'}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {service.specialties.slice(0, 2).map(specialty => (
                        <span key={specialty} className="bg-light_cyan text-honolulu_blue text-xs px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-federal_blue">
                      {service.priceText}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link 
                      href={`/professionals/${service.id}`}
                      className="flex-1 bg-honolulu_blue text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-federal_blue transition-colors text-center"
                    >
                      {language === 'is' ? 'Finn fagmann' : 'Find professional'}
                    </Link>
                    <Link 
                      href={`/post/handcraft?category=${service.id}`}
                      className="flex-1 border border-honolulu_blue text-honolulu_blue px-3 py-2 rounded-lg text-xs font-medium hover:bg-light_cyan transition-colors text-center"
                    >
                      {language === 'is' ? 'Legg út jobb' : 'Post job'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-honolulu_blue text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Tilbúinn að byrja?' : 'Ready to start?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn verkefnið þitt og fáðu tilboð frá hæfum iðnaðarmönnum á þínu svæði.'
              : 'Post your project and get quotes from qualified craftsmen in your area.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/post/handcraft"
              className="bg-white text-honolulu_blue px-8 py-3 rounded-lg font-semibold hover:bg-light_cyan transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              href="/professionals/handcraft"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-federal_blue transition-colors"
            >
              {language === 'is' ? 'Finn iðnaðarmenn' : 'Find craftsmen'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandcraftCategoryPage;