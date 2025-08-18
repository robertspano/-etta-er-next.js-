import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ServicesCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const serviceTypes = [
    {
      id: 'moving-services',
      name: language === 'is' ? 'Flutningsþjónusta' : 'Moving Services',
      nameEnglish: 'Moving Services',
      description: language === 'is' 
        ? 'Fagleg flutningsþjónusta fyrir heimili og fyrirtæki með öruggri meðhöndlun.'
        : 'Professional moving services for homes and businesses with safe handling.',
      professionals: 1200,
      averagePrice: language === 'is' ? '25.000-150.000 kr' : '£125-750',
      completedJobs: 4800,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Heimilisflutningar', 'Fyrirtækjaflutningar', 'Flutningshjálp', 'Pökkun']
        : ['Home Moving', 'Business Moving', 'Moving Help', 'Packing']
    },
    {
      id: 'cleaning-services',
      name: language === 'is' ? 'Þrif og þrifaþjónusta' : 'Cleaning Services',
      nameEnglish: 'Cleaning Services',
      description: language === 'is'
        ? 'Alhliða þrifaþjónusta fyrir heimili, skrifstofur og atvinnuhúsnæði.'
        : 'Comprehensive cleaning services for homes, offices and commercial properties.',
      professionals: 1800,
      averagePrice: language === 'is' ? '15.000-80.000 kr' : '£75-400',
      completedJobs: 6200,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Almenn þrif', 'Dýpri þrif', 'Flutningsþrif', 'Skrifstofuþrif']
        : ['General Cleaning', 'Deep Cleaning', 'Move-out Cleaning', 'Office Cleaning']
    },
    {
      id: 'automotive-services',
      name: language === 'is' ? 'Bílaþjónusta' : 'Automotive Services',
      nameEnglish: 'Automotive Services',
      description: language === 'is'
        ? 'Heildarþjónusta fyrir ökutæki - viðgerðir, viðhald og skoðanir.'
        : 'Complete vehicle services - repairs, maintenance and inspections.',
      professionals: 900,
      averagePrice: language === 'is' ? '20.000-200.000 kr' : '£100-1,000',
      completedJobs: 3400,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Viðgerðir', 'Viðhald', 'Dekkjaþjónusta', 'Skoðanir']
        : ['Repairs', 'Maintenance', 'Tire Service', 'Inspections']
    },
    {
      id: 'security-services',
      name: language === 'is' ? 'Öryggisþjónusta' : 'Security Services',
      nameEnglish: 'Security Services',
      description: language === 'is'
        ? 'Uppsetnig öryggiskerfa, vaktþjónusta og öryggisráðgjöf.'
        : 'Security system installation, guard services and security consulting.',
      professionals: 400,
      averagePrice: language === 'is' ? '50.000-500.000 kr' : '£250-2,500',
      completedJobs: 1600,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Öryggiskerfi', 'Myndavélar', 'Viðvörunarkerfi', 'Vaktþjónusta']
        : ['Security Systems', 'CCTV', 'Alarm Systems', 'Guard Services']
    },
    {
      id: 'solar-energy',
      name: language === 'is' ? 'Sólarorka' : 'Solar Energy',
      nameEnglish: 'Solar Energy',
      description: language === 'is'
        ? 'Uppsetnig sólarsellukerfa og umhverfisvænar orkualausnir.'
        : 'Installation of solar panel systems and eco-friendly energy solutions.',
      professionals: 300,
      averagePrice: language === 'is' ? '800.000-3.000.000 kr' : '£4,000-15,000',
      completedJobs: 800,
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Sólarsellur', 'Orkugeymsla', 'Nettengingar', 'Ráðgjöf']
        : ['Solar Panels', 'Energy Storage', 'Grid Connection', 'Consultation']
    },
    {
      id: 'pest-control',
      name: language === 'is' ? 'Skaðdýravörn' : 'Pest Control',
      nameEnglish: 'Pest Control',
      description: language === 'is'
        ? 'Fagleg skaðdýravörn fyrir heimili og fyrirtæki með öruggum aðferðum.'
        : 'Professional pest control for homes and businesses with safe methods.',
      professionals: 200,
      averagePrice: language === 'is' ? '15.000-60.000 kr' : '£75-300',
      completedJobs: 1200,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Músgæsla', 'Skordýravörn', 'Fuglvörn', 'Forvarnir']
        : ['Rodent Control', 'Insect Control', 'Bird Control', 'Prevention']
    },
    {
      id: 'appraisal-services',
      name: language === 'is' ? 'Fasteignamat' : 'Property Appraisal',
      nameEnglish: 'Property Appraisal',
      description: language === 'is'
        ? 'Fagleg fasteignamat og verðmat fyrir sölu, kaup og tryggingar.'
        : 'Professional property valuation and appraisal for sales, purchases and insurance.',
      professionals: 150,
      averagePrice: language === 'is' ? '80.000-300.000 kr' : '£400-1,500',
      completedJobs: 900,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Íbúðamat', 'Atvinnuhúsnæðismat', 'Tryggingamat', 'Ráðgjöf']
        : ['Residential Appraisal', 'Commercial Appraisal', 'Insurance Appraisal', 'Consultation']
    },
    {
      id: 'installation-services',
      name: language === 'is' ? 'Uppsetningarþjónusta' : 'Installation Services',
      nameEnglish: 'Installation Services',
      description: language === 'is'
        ? 'Uppsetnig á tækjum, húsgögnum og búnaði af fagmönnum.'
        : 'Installation of appliances, furniture and equipment by professionals.',
      professionals: 800,
      averagePrice: language === 'is' ? '10.000-80.000 kr' : '£50-400',
      completedJobs: 3200,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Húsgagnasamsetnig', 'Tækjauppsetning', 'Lýsing', 'Sjónvarp']
        : ['Furniture Assembly', 'Appliance Installation', 'Lighting', 'TV Mounting']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Home', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'All categories', href: '/alle-kategorier' },
    { name: language === 'is' ? 'Þjónusta' : 'Services', href: null }
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
            {language === 'is' ? 'Þjónusta' : 'Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'is'
              ? 'Víðtæk þjónusta fyrir heimili og fyrirtæki. Frá flutningum til þrifa - við höfum fagmennina sem þú þarft.'
              : 'Comprehensive services for homes and businesses. From moving to cleaning - we have the professionals you need.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-indigo-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-indigo-600 mb-2">5,750+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Þjónustuaðilar' : 'Service providers'}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">22,200+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Lokið verkefni' : 'Completed projects'}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Meðaleinkunn' : 'Average rating'}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-64 mb-16">
        <img 
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=400&fit=crop"
          alt="Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'is' ? 'Þjónusta þegar þú þarft hana' : 'Service when you need it'}
            </h2>
            <p className="text-xl opacity-90">
              {language === 'is' 
                ? 'Áreiðanleg og fagleg þjónusta fyrir öll verkefni'
                : 'Reliable and professional service for all projects'
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
            {serviceTypes.map(service => (
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
                    <span>👥 {service.professionals.toLocaleString()} {language === 'is' ? 'þjónustuaðilar' : 'providers'}</span>
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
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn þjónustu' : 'Find service'}
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

      {/* Most Popular Services */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Vinsælustu þjónusturnar' : 'Most popular services'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: language === 'is' ? 'Flutningar' : 'Moving', count: '4,800+' },
              { name: language === 'is' ? 'Þrif' : 'Cleaning', count: '6,200+' },
              { name: language === 'is' ? 'Bílaþjónusta' : 'Auto Service', count: '3,400+' },
              { name: language === 'is' ? 'Uppsetning' : 'Installation', count: '3,200+' },
              { name: language === 'is' ? 'Öryggi' : 'Security', count: '1,600+' },
              { name: language === 'is' ? 'Skaðdýravörn' : 'Pest Control', count: '1,200+' },
              { name: language === 'is' ? 'Fasteignamat' : 'Appraisal', count: '900+' },
              { name: language === 'is' ? 'Sólarorka' : 'Solar Energy', count: '800+' }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 mb-1">{item.count}</div>
                <div className="text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Af hverju að velja okkur?' : 'Why choose us?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Fljót þjónusta' : 'Fast Service'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Fáðu tilboð fljótt og byrjaðu verkefnið þitt án tafa.'
                  : 'Get quotes quickly and start your project without delay.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Tryggður gæði' : 'Quality Guaranteed'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Allir þjónustuaðilar eru yfirfarnir og tryggðir.'
                  : 'All service providers are vetted and insured.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Samkeppnishæf verð' : 'Competitive Prices'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Berðu saman tilboð og veldu besta verðið.'
                  : 'Compare quotes and choose the best price.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu þjónustu?' : 'Need a service?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn þjónustubeiðni þína og fáðu tilboð frá hæfum þjónustuaðilum.'
              : 'Post your service request and get quotes from qualified service providers.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/job-categories"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn beiðni' : 'Post request'}
            </Link>
            <Link 
              to="/bedriftsok"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {language === 'is' ? 'Finn þjónustu' : 'Find services'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCategoryPage;