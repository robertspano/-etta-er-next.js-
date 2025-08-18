import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BuildNewCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const buildNewServices = [
    {
      id: 'house-construction',
      name: language === 'is' ? 'Húsbyggingar' : 'House Construction',
      nameEnglish: 'House Construction',
      description: language === 'is' 
        ? 'Heildarbygging nýrra íbúðarhúsa frá grunni með faglegum verktökum.'
        : 'Complete construction of new residential homes from foundation with professional contractors.',
      professionals: 800,
      averagePrice: language === 'is' ? '25.000.000-80.000.000 kr' : '£125,000-400,000',
      completedJobs: 1200,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Skipulagning', 'Byggingarstig', 'Léttbyggingar', 'Fullnaðarvinna']
        : ['Planning', 'Construction Phases', 'Light Construction', 'Finishing Work']
    },
    {
      id: 'extension-construction',
      name: language === 'is' ? 'Viðbyggingar' : 'Extension Construction',
      nameEnglish: 'Extension Construction',
      description: language === 'is'
        ? 'Stækkun og viðbyggingar við núverandi húsnæði með faglegri framkvæmd.'
        : 'Extensions and additions to existing properties with professional execution.',
      professionals: 900,
      averagePrice: language === 'is' ? '3.000.000-15.000.000 kr' : '£15,000-75,000',
      completedJobs: 2100,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Húsviðbyggingar', 'Nýtt herbergi', 'Risukur', 'Steypuvinnu']
        : ['House Extensions', 'New Rooms', 'Attic Conversions', 'Concrete Work']
    },
    {
      id: 'garage-construction',
      name: language === 'is' ? 'Bílskúrsbyggingar' : 'Garage Construction',
      nameEnglish: 'Garage Construction',
      description: language === 'is'
        ? 'Bygging nýrra bílskúra og verkstæða með réttum leyfum og útfærslu.'
        : 'Construction of new garages and workshops with proper permits and execution.',
      professionals: 600,
      averagePrice: language === 'is' ? '1.500.000-8.000.000 kr' : '£7,500-40,000',
      completedJobs: 1800,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Einstaklegar bílskúr', 'Tvöfaldur bílskúr', 'Verkstæði', 'Geymslu']
        : ['Single Garages', 'Double Garages', 'Workshops', 'Storage']
    },
    {
      id: 'commercial-construction',
      name: language === 'is' ? 'Atvinnuhúsnæði' : 'Commercial Construction',
      nameEnglish: 'Commercial Construction',
      description: language === 'is'
        ? 'Byggingar skrifstofuhúsnæðis, verslana og iðnaðarbygginga.'
        : 'Construction of office buildings, retail spaces and industrial buildings.',
      professionals: 500,
      averagePrice: language === 'is' ? '15.000.000-100.000.000 kr' : '£75,000-500,000',
      completedJobs: 800,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Skrifstofur', 'Verslanir', 'Vöruhús', 'Iðnaður']
        : ['Offices', 'Retail', 'Warehouses', 'Industrial']
    },
    {
      id: 'summer-house',
      name: language === 'is' ? 'Sumarhús og kottar' : 'Summer Houses & Cabins',
      nameEnglish: 'Summer Houses & Cabins',
      description: language === 'is'
        ? 'Bygging sumarhúsa, kotta og helgibústaða í fallegum umhverfi.'
        : 'Construction of summer houses, cabins and holiday homes in beautiful environments.',
      professionals: 400,
      averagePrice: language === 'is' ? '8.000.000-35.000.000 kr' : '£40,000-175,000',
      completedJobs: 1100,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Sumarhús', 'Kottar', 'Timburhús', 'Íslensk hönnun']
        : ['Summer Houses', 'Cabins', 'Log Houses', 'Icelandic Design']
    },
    {
      id: 'project-management',
      name: language === 'is' ? 'Verkefnastjórnun' : 'Project Management',
      nameEnglish: 'Project Management',
      description: language === 'is'
        ? 'Heildarstjórnun byggingarverkefna frá skipulagningu til afhendingar.'
        : 'Complete management of construction projects from planning to delivery.',
      professionals: 300,
      averagePrice: language === 'is' ? '500.000-5.000.000 kr' : '£2,500-25,000',
      completedJobs: 900,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Skipulagning', 'Umsjón', 'Tímasetning', 'Kostnaðarstjórnun']
        : ['Planning', 'Supervision', 'Scheduling', 'Cost Management']
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