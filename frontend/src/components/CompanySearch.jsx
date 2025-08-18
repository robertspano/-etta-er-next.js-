import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CompanySearch = ({ translations, language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample professional data matching BuildConnect structure
  const sampleProfessionals = [
    {
      id: '1',
      name: 'Reykjavik Construction Ltd',
      category: language === 'is' ? 'Trésmíðamaður' : 'Carpenter',
      location: 'Reykjavik',
      rating: 4.8,
      reviewCount: 127,
      completedJobs: 89,
      isVerified: true,
      isInsured: true,
      description: language === 'is' 
        ? 'Reyndir trésmíðamenn með sérhæfingu í byggingatimbri og innanhússsmíði.'
        : 'Experienced carpenters with specialization in construction timber and interior carpentry.',
      services: language === 'is' 
        ? ['Trésmíði', 'Innanhússmíði', 'Húsgögn', 'Viðhald']
        : ['Carpentry', 'Interior work', 'Furniture', 'Maintenance'],
      priceRange: language === 'is' ? '8.000-12.000 kr/klst' : '£40-60/hour',
      phoneNumber: '+354 123 4567',
      website: 'www.reykjavik-construction.is',
      established: 2015,
      employees: '5-10',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop'
    },
    {
      id: '2', 
      name: 'ElectroMaster Reykjavik',
      category: language === 'is' ? 'Rafvirki' : 'Electrician',
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
      website: 'www.electromaster-reykjavik.is',
      established: 2003,
      employees: '10-20',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      name: 'Akureyri Plumbing Services',
      category: language === 'is' ? 'Pípulagningamaður' : 'Plumber', 
      location: 'Akureyri',
      rating: 4.7,
      reviewCount: 203,
      completedJobs: 234,
      isVerified: true,
      isInsured: true,
      description: language === 'is'
        ? 'Heildar pípulagnaþjónusta fyrir einstaklinga og fyrirtæki. Sólarhringsþjónusta í boði.'
        : 'Complete plumbing services for individuals and businesses. 24-hour service available.',
      services: language === 'is'
        ? ['Pípulagnir', 'Hitakerfi', 'Hreinlætisstofnanir', 'Lekaleitar']
        : ['Plumbing', 'Heating', 'Sanitary', 'Leak Detection'],
      priceRange: language === 'is' ? '9.000-12.000 kr/klst' : '£45-60/hour',
      phoneNumber: '+354 555 4433',
      website: 'www.akureyri-plumbing.is',
      established: 2010,
      employees: '3-5',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop'
    }
  ];

  const categories = [
    { id: 'snekker', name: language === 'is' ? 'Trésmíðamaður' : 'Snekker' },
    { id: 'elektriker', name: language === 'is' ? 'Rafvirki' : 'Elektriker' }, 
    { id: 'rorlegger', name: language === 'is' ? 'Pípulagningamaður' : 'Rørlegger' },
    { id: 'maler', name: language === 'is' ? 'Málari' : 'Maler' },
    { id: 'murer', name: language === 'is' ? 'Múrari' : 'Murer' },
    { id: 'taktekker', name: language === 'is' ? 'Þaksmíði' : 'Taktekker' },
    { id: 'anleggsgartner', name: language === 'is' ? 'Garðyrkjumaður' : 'Anleggsgartner' },
    { id: 'flyttebyra', name: language === 'is' ? 'Flutningafyrirtæki' : 'Flyttebyrå' }
  ];

  const handleSearch = () => {
    setLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredProfessionals = sampleProfessionals;
      
      if (searchQuery) {
        filteredProfessionals = filteredProfessionals.filter(pro => 
          pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pro.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pro.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      if (locationQuery) {
        filteredProfessionals = filteredProfessionals.filter(pro =>
          pro.location.toLowerCase().includes(locationQuery.toLowerCase())
        );
      }
      
      if (selectedCategory) {
        const categoryName = categories.find(cat => cat.id === selectedCategory)?.name || '';
        filteredProfessionals = filteredProfessionals.filter(pro =>
          pro.category.toLowerCase().includes(categoryName.toLowerCase())
        );
      }
      
      setProfessionals(filteredProfessionals);
      setLoading(false);
    }, 1000);
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section - Exact mittanbud.no style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'is' 
              ? 'Finndu rétta fyrirtækið fyrir verkefnið þitt!' 
              : 'Find the right company for your project!'
            }
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'is'
              ? 'Leitaðu að fyrirtækjum og iðnaðarmönnum á þínu svæði, hafðu samband og fáðu tilboð.'
              : 'Search for companies and craftsmen in your area, contact them and get a quote.'
            }
          </p>

          {/* Search Form - Exact mittanbud.no layout */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'is' ? 'Við hvað þarftu hjálp?' : 'What do you need help with?'}
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'is' ? 't.d. Trésmíðamaður, Rafvirki...' : 'e.g. Carpenter, Electrician...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'is' ? 'Hvar á verkið að fara fram?' : 'Where should the job be done?'}
                </label>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder={language === 'is' ? 't.d. Reykjavík, Akureyri...' : 'e.g. Reykjavik, London...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'is' ? 'Flokkur' : 'Category'}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{language === 'is' ? 'Allir flokkar' : 'All categories'}</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'is' ? 'Leitar...' : 'Searching...'}
                </span>
              ) : (
                language === 'is' ? 'Finna fyrirtæki' : 'Find company'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {hasSearched && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {loading 
                ? (language === 'is' ? 'Leita að fyrirtækjum...' : 'Searching for companies...')
                : `${professionals.length} ${language === 'is' ? 'fyrirtæki fundust' : 'companies found'}`
              }
            </h2>
          </div>
        )}

        {/* Professional Cards - Exact mittanbud.no style */}
        <div className="space-y-6">
          {professionals.map(professional => (
            <div key={professional.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Company Image */}
                <div className="flex-shrink-0">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-full md:w-32 h-24 object-cover rounded-lg"
                  />
                </div>
                
                {/* Company Info */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{professional.name}</h3>
                        {professional.isVerified && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            {language === 'is' ? 'Verifisert' : 'Verifisert'}
                          </span>
                        )}
                        {professional.isInsured && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                            {language === 'is' ? 'Forsikret' : 'Forsikret'}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center">
                          {renderStars(professional.rating)}
                          <span className="ml-1 text-sm text-gray-600">
                            {professional.rating} ({professional.reviewCount} {language === 'is' ? 'anmeldelser' : 'anmeldelser'})
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {professional.completedJobs} {language === 'is' ? 'fullførte jobber' : 'fullførte jobber'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{professional.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {professional.services.slice(0, 4).map(service => (
                          <span key={service} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📍 {professional.location}</span>
                        <span>💰 {professional.priceRange}</span>
                        <span>🏢 {professional.employees} {language === 'is' ? 'ansatte' : 'ansatte'}</span>
                      </div>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="flex-shrink-0 mt-4 md:mt-0">
                      <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          {language === 'is' ? 'Ta kontakt' : 'Ta kontakt'}
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                          {language === 'is' ? 'Se profil' : 'Se profil'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {hasSearched && professionals.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'is' ? 'Ingen bedrifter funnet' : 'Ingen bedrifter funnet'}
            </h3>
            <p className="text-gray-600">
              {language === 'is' 
                ? 'Prøv å endre søkekriteriene dine eller utvidde søkeområdet.'
                : 'Prøv å endre søkekriteriene dine eller utvidde søkeområdet.'
              }
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-32 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="flex-grow">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
                    <div className="flex gap-2 mb-3">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-18"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySearch;