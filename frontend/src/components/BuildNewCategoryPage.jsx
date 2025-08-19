import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BuildNewCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const buildNewServices = [
    {
      id: 'husbygging',
      name: language === 'is' ? 'Húsbyggingar' : 'Husbygging',
      nameNorwegian: 'Husbygging',
      description: language === 'is' 
        ? 'Heildarbygging nýrra íbúðarhúsa frá grunni með faglegum verktökum.'
        : 'Komplett bygging av nye bolighus fra grunnen med profesjonelle entreprenører.',
      professionals: 800,
      averagePrice: language === 'is' ? '25.000.000-80.000.000 kr' : '2.500.000-8.000.000 kr',
      completedJobs: 1200,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Skipulagning', 'Byggingarstig', 'Léttbyggingar', 'Fullnaðarvinna']
        : ['Planlegging', 'Byggefaser', 'Lettbygg', 'Ferdigstillelse']
    },
    {
      id: 'tilbygg',
      name: language === 'is' ? 'Viðbyggingar' : 'Tilbygg',
      nameNorwegian: 'Tilbygg',
      description: language === 'is'
        ? 'Stækkun og viðbyggingar við núverandi húsnæði með faglegri framkvæmd.'
        : 'Utvidelser og påbygg til eksisterende eiendom med profesjonell utførelse.',
      professionals: 900,
      averagePrice: language === 'is' ? '3.000.000-15.000.000 kr' : '300.000-1.500.000 kr',
      completedJobs: 2100,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Húsviðbyggingar', 'Nýtt herbergi', 'Risu endurbætur', 'Steypuvinnu']
        : ['Husutvidelser', 'Nye rom', 'Loftsombygging', 'Betongarbeid']
    },
    {
      id: 'garasje',
      name: language === 'is' ? 'Bílskúrsbyggingar' : 'Garasje',
      nameNorwegian: 'Garasje',
      description: language === 'is'
        ? 'Bygging nýrra bílskúra og verkstæða með réttum leyfum og útfærslu.'
        : 'Bygging av nye garasjer og verksteder med riktige tillatelser og utførelse.',
      professionals: 600,
      averagePrice: language === 'is' ? '1.500.000-8.000.000 kr' : '150.000-800.000 kr',
      completedJobs: 1800,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Einstaklingar bílskúrar', 'Tvöfaldur bílskúr', 'Verkstæði', 'Geymsla']
        : ['Enkelgarasjer', 'Doble garasjer', 'Verksteder', 'Lager']
    },
    {
      id: 'naeringsbygg',
      name: language === 'is' ? 'Atvinnuhúsnæði' : 'Næringsbygg',
      nameNorwegian: 'Næringsbygg',
      description: language === 'is'
        ? 'Byggingar skrifstofuhúsnæðis, verslana og iðnaðarbygginga.'
        : 'Bygging av kontorbygg, butikklokaler og industribygg.',
      professionals: 500,
      averagePrice: language === 'is' ? '15.000.000-100.000.000 kr' : '1.500.000-10.000.000 kr',
      completedJobs: 800,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Skrifstofur', 'Verslanir', 'Vöruhús', 'Iðnaður']
        : ['Kontor', 'Butikk', 'Lager', 'Industri']
    },
    {
      id: 'hytte-fritidsbolig',
      name: language === 'is' ? 'Sumarhús og kottar' : 'Hytte/fritidsbolig',
      nameNorwegian: 'Hytte/fritidsbolig',
      description: language === 'is'
        ? 'Bygging sumarhúsa, kotta og helgibústaða í fallegum umhverfi.'
        : 'Bygging av hytter, koier og fritidsboliger i vakre omgivelser.',
      professionals: 400,
      averagePrice: language === 'is' ? '8.000.000-35.000.000 kr' : '800.000-3.500.000 kr',
      completedJobs: 1100,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Sumarhús', 'Kottar', 'Timburhús', 'Íslensk hönnun']
        : ['Sommerhus', 'Koier', 'Trehus', 'Norsk design']
    },
    {
      id: 'carport-utbygning',  
      name: language === 'is' ? 'Bílhlíf og útihús' : 'Carport og utbygning',
      nameNorwegian: 'Carport og utbygning',
      description: language === 'is'
        ? 'Bygging bílhlífa, útihúsa og annarra smærri útbygginga.'
        : 'Bygging av carporter, uthus og andre mindre utbygninger.',
      professionals: 750,
      averagePrice: language === 'is' ? '500.000-3.000.000 kr' : '50.000-300.000 kr',
      completedJobs: 2800,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Bílhlífar', 'Útihús', 'Grill hús', 'Leiksvæði']
        : ['Carporter', 'Uthus', 'Grillhus', 'Lekeplasser']
    },
    {
      id: 'fundament-grunnarbeid',
      name: language === 'is' ? 'Grunnur og steinsteypa' : 'Fundament/grunnarbeid',
      nameNorwegian: 'Fundament/grunnarbeid',
      description: language === 'is'
        ? 'Fagleg grunnvinna, steinsteypa og undirbúningur fyrir byggingarverkefni.'
        : 'Profesjonelt grunnarbeid, betong og forberedelser for byggeprosjekter.',
      professionals: 650,
      averagePrice: language === 'is' ? '2.000.000-12.000.000 kr' : '200.000-1.200.000 kr',
      completedJobs: 1600,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Grunnsteypir', 'Kjallari', 'Drenun', 'Jarðvinna']
        : ['Fundamenter', 'Kjellere', 'Drenering', 'Jordarbeid']
    },
    {
      id: 'tomrer-trearbeid',
      name: language === 'is' ? 'Tré og léttbyggingar' : 'Tømrer/trearbeid',
      nameNorwegian: 'Tømrer/trearbeid',
      description: language === 'is'
        ? 'Trevirki, rammasmíði og léttbyggingar fyrir nýbyggingar.'
        : 'Trevirke, rammeverk og lettbygg for nybygg.',
      professionals: 850,
      averagePrice: language === 'is' ? '1.500.000-8.000.000 kr' : '150.000-800.000 kr',
      completedJobs: 2400,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Rammasmíði', 'Trevirki', 'Takstólar', 'Gólfflokkar']
        : ['Rammeverk', 'Trevirke', 'Takstoler', 'Gulvbjælker']
    },
    {
      id: 'tak-og-tekning',
      name: language === 'is' ? 'Þak og þakmaterial' : 'Tak og tekning',
      nameNorwegian: 'Tak og tekning',
      description: language === 'is'
        ? 'Uppsetning þakefna, einangrunar og takkerfa fyrir nýbyggingar.'
        : 'Installasjon av takmaterialer, isolering og taksystem for nybygg.',
      professionals: 550,
      averagePrice: language === 'is' ? '1.200.000-6.000.000 kr' : '120.000-600.000 kr',
      completedJobs: 1800,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakplötur', 'Einangrun', 'Takrennur', 'Þétting']
        : ['Takplater', 'Isolering', 'Takrenner', 'Tetting']
    },
    {
      id: 'vinduer-dorer-nybygg',
      name: language === 'is' ? 'Gluggar og hurðir' : 'Vinduer/dører nybygg',
      nameNorwegian: 'Vinduer/dører nybygg',
      description: language === 'is'
        ? 'Uppsetning gluggara og hurða í nýbyggingum með nútímalegri tækni.'
        : 'Installasjon av vinduer og dører i nybygg med moderne teknologi.',
      professionals: 700,
      averagePrice: language === 'is' ? '800.000-4.000.000 kr' : '80.000-400.000 kr',
      completedJobs: 2200,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Einingagluggar', 'Garðhurðir', 'Öryggishurðir', 'Smart locks']
        : ['Elementvinduer', 'Hagedører', 'Sikkerhetsdører', 'Smarte låser']
    },
    {
      id: 'radgivning-prosjektledelse',
      name: language === 'is' ? 'Verkefnastjórnun' : 'Rådgivning/prosjektledelse',
      nameNorwegian: 'Rådgivning/prosjektledelse',
      description: language === 'is'
        ? 'Fagleg ráðgjöf og verkefnastjórnun fyrir byggingarverkefni.'
        : 'Profesjonell rådgivning og prosjektledelse for byggeprosjekter.',
      professionals: 350,
      averagePrice: language === 'is' ? '500.000-3.000.000 kr' : '50.000-300.000 kr',
      completedJobs: 1400,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Arkitektar', 'Verkfræðingar', 'Byggingarstjórar', 'Leyfisvinnu']
        : ['Arkitekter', 'Ingeniører', 'Byggeledere', 'Tillatelser']
    },
    {
      id: 'landskap-utomhus',
      name: language === 'is' ? 'Landslag og útaumhverfi' : 'Landskap/utomhus',
      nameNorwegian: 'Landskap/utomhus',
      description: language === 'is'
        ? 'Hönnun og framkvæmd á útirýmum og landslagi í kringum nýbyggingar.'
        : 'Design og utførelse av uteområder og landskap rundt nybygg.',
      professionals: 450,
      averagePrice: language === 'is' ? '800.000-5.000.000 kr' : '80.000-500.000 kr',
      completedJobs: 1000,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Garðhönnun', 'Göngubrautir', 'Bílastæði', 'Úti lýsing']
        : ['Hagedesign', 'Gangveier', 'Parkeringsplasser', 'Utebelysning']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'All categories', href: '/alle-kategorier' },
    { name: language === 'is' ? 'Byggja nýtt' : 'Build New', href: null }
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
            {language === 'is' ? 'Byggja nýtt' : 'Build New'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'is'
              ? 'Frá draumahúsinu til nýrra atvinnuhúsnæða. Við höfum byggingaraðila og verkefnastjóra fyrir öll stór verkefni.'
              : 'From dream homes to new commercial buildings. We have builders and project managers for all major projects.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-orange-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">3,500+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Byggingaraðilar' : 'Construction professionals'}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">8,000+</div>
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
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=400&fit=crop"
          alt="Build New Construction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'is' ? 'Byggjum framtíðina saman' : 'Building the future together'}
            </h2>
            <p className="text-xl opacity-90">
              {language === 'is' 
                ? 'Frá fyrstu hugmynd til lykilafhendingar'
                : 'From initial idea to key handover'
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
            {buildNewServices.map(service => (
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
                    <span>👥 {service.professionals.toLocaleString()} {language === 'is' ? 'fagmenn' : 'professionals'}</span>
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
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn byggingaraðila' : 'Find builder'}
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

      {/* Construction Process Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Byggingarferlið' : 'Construction Process'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Skipulagning' : 'Planning'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is'
                  ? 'Hönnun, leyfi og undirbúningur verkefnis.'
                  : 'Design, permits and project preparation.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Grunnvinna' : 'Foundation Work'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is'
                  ? 'Jarðvinna, grunnur og undirstöður.'
                  : 'Excavation, foundation and structural base.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Byggingaráfangi' : 'Construction Phase'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is'
                  ? 'Stómur, þak og grunnbyggingar.'
                  : 'Frame, roof and core construction.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔑</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Klárgjering' : 'Completion'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is'
                  ? 'Fullnaðarvinna og lykilafhending.'
                  : 'Finishing work and key handover.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Projects Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Vinsælustu verkefnin' : 'Most popular projects'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: language === 'is' ? 'Húsbyggingar' : 'House Construction', count: '1,200+' },
              { name: language === 'is' ? 'Viðbyggingar' : 'Extensions', count: '2,100+' },
              { name: language === 'is' ? 'Bílskúrar' : 'Garages', count: '1,800+' },
              { name: language === 'is' ? 'Sumarhús' : 'Summer Houses', count: '1,100+' },
              { name: language === 'is' ? 'Atvinnuhúsnæði' : 'Commercial', count: '800+' },
              { name: language === 'is' ? 'Verkefnastjórnun' : 'Project Management', count: '900+' },
              { name: language === 'is' ? 'Kottar' : 'Cabins', count: '600+' },
              { name: language === 'is' ? 'Vöruhús' : 'Warehouses', count: '400+' }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">{item.count}</div>
                <div className="text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Tilbúinn að byggja?' : 'Ready to build?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn byggingarverkefnið þitt og fáðu tilboð frá hæfum byggingaraðilum.'
              : 'Post your construction project and get quotes from qualified builders.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/job-categories"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              to="/bedriftsok"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              {language === 'is' ? 'Finn byggingaraðila' : 'Find builders'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildNewCategoryPage;