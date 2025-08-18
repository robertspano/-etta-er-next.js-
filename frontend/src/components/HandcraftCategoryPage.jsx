import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HandcraftCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const handcraftServices = [
    {
      id: 'snekker',
      name: language === 'is' ? 'Trésmíðamaður' : 'Snekker',
      nameNorwegian: 'Snekker',
      description: language === 'is' 
        ? 'Sérsniðnar viðarvörur, húsgögn og burðarvirki af kunnáttumiklum smíðamönnum.'
        : 'Tilpassede trearbeider, møbler og bærekonstruksjoner av dyktige snekkere.',
      professionals: 2200,
      averagePrice: language === 'is' ? '40.000-100.000 kr' : '500-800 kr/time',
      completedJobs: 8200,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Tómmerwerk', 'Innredning', 'Húsgögn', 'Viðhald']
        : ['Tømrerarbeid', 'Innredning', 'Møbler', 'Vedlikehold']
    },
    {
      id: 'murer',
      name: language === 'is' ? 'Múrari' : 'Murer',
      nameNorwegian: 'Murer',
      description: language === 'is'
        ? 'Faglegur múrari fyrir steinsteypuvinnu og byggingarefni.'
        : 'Profesjonell murarbeid for mur, betong og byggematerialer.',
      professionals: 1800,
      averagePrice: language === 'is' ? '35.000-80.000 kr' : '450-700 kr/time',
      completedJobs: 6500,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Múrverk', 'Steinsteypa', 'Viðgerðir', 'Byggingar']
        : ['Murverk', 'Betongarbeid', 'Reparasjoner', 'Byggarbeider']
    },
    {
      id: 'taktekker',
      name: language === 'is' ? 'Þaksmíði' : 'Taktekker',
      nameNorwegian: 'Taktekker',
      description: language === 'is'
        ? 'Þakviðgerðir, uppsetningar og viðhald af reyndum þaksérfræðingum.'
        : 'Takreparasjoner, installasjoner og vedlikehold av erfarne takspesialister.',
      professionals: 1200,
      averagePrice: language === 'is' ? '65.000-250.000 kr' : '600-900 kr/time',
      completedJobs: 4500,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakviðgerðir', 'Þaksteypa', 'Einangrun', 'Viðhald']
        : ['Takreparasjoner', 'Taklegging', 'Isolering', 'Vedlikehold']
    },
    {
      id: 'maler',
      name: language === 'is' ? 'Málari' : 'Maler',
      nameNorwegian: 'Maler',
      description: language === 'is'
        ? 'Fagleg innri og ytri málningarþjónusta með gæða efnivið.'
        : 'Profesjonell innvendig og utvendig malerservice med kvalitetsmaterialer.',
      professionals: 1900,
      averagePrice: language === 'is' ? '25.000-80.000 kr' : '400-650 kr/time',
      completedJobs: 7800,
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Húsmálun', 'Innri málun', 'Veggsparkl', 'Beatles']
        : ['Husmaling', 'Innvendig maling', 'Sparkling', 'Tapetsering']
    },
    {
      id: 'flislegger',
      name: language === 'is' ? 'Flíslagning' : 'Flislegger',
      nameNorwegian: 'Flislegger',
      description: language === 'is'
        ? 'Fagleg flíslagning fyrir baðherbergi, eldhús og önnur rými.'
        : 'Profesjonell flislegging for bad, kjøkken og andre rom.',
      professionals: 1400,
      averagePrice: language === 'is' ? '30.000-90.000 kr' : '500-750 kr/time',
      completedJobs: 5600,
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Baðherbergisflísar', 'Eldhúsflísar', 'Gólfflísar', 'Veggflísar']
        : ['Badromsflis', 'Kjøkkenflis', 'Gulvflis', 'Veggflis']
    },
    {
      id: 'blikkenslager',
      name: language === 'is' ? 'Blikksmíði' : 'Blikkenslager',
      nameNorwegian: 'Blikkenslager',
      description: language === 'is'
        ? 'Sérfræðingar í málmvinnu, þakvinnu og lagnir.'
        : 'Spesialister på metallarbeid, takarbeid og rør.',
      professionals: 800,
      averagePrice: language === 'is' ? '45.000-120.000 kr' : '600-850 kr/time',
      completedJobs: 3200,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakvinna', 'Málmvinna', 'Lagnavinnu', 'Viðgerðir']
        : ['Takarbeid', 'Metallarbeid', 'Rørarbeid', 'Reparasjoner']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Hjem', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'Alle kategorier', href: '/alle-kategorier' },
    { name: language === 'is' ? 'Handverk' : 'Håndverker', href: null }
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
            {language === 'is' ? 'Handverk' : 'Håndverker'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'is'
              ? 'Finndu hæfa handverksmenn fyrir verkefnið þitt. Frá smíðum til málningarvinnu - við höfum fagmennina sem þú þarft.'
              : 'Finn dyktige håndverkere til ditt prosjekt. Fra snekkerarbeid til malerarbeid - vi har fagfolkene du trenger.'
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">9,500+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Skráðir handverksmenn' : 'Registrerte håndverkere'}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">32,000+</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Lokið verkefni' : 'Fullførte prosjekter'}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
            <div className="text-gray-600">
              {language === 'is' ? 'Meðaleinkunn' : 'Gjennomsnittlig vurdering'}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid - Exact mittanbud.no style */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Veldu þjónustu' : 'Velg tjeneste'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {handcraftServices.map(service => (
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
                    <span>👥 {service.professionals.toLocaleString()} {language === 'is' ? 'fagmenn' : 'fagfolk'}</span>
                    <span>✅ {service.completedJobs.toLocaleString()} {language === 'is' ? 'verkefni' : 'jobber'}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'is' ? 'Sérhæfingar:' : 'Spesialiteter:'}
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
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        {language === 'is' ? 'Finn fagmann' : 'Finn fagfolk'}
                      </Link>
                      <Link 
                        to={`/post?category=${service.id}`}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        {language === 'is' ? 'Legg út jobb' : 'Legg ut jobb'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Svona virkar það' : 'Sånn fungerer det'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Lýstu verkefninu' : 'Beskriv prosjektet'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Segðu okkur hvað þú þarft hjálp við og við sendum það til réttra fyrirtækja.'
                  : 'Fortell oss hva du trenger hjelp til, og vi sender ut prosjektet til relevante bedrifter.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Fáðu tilboð' : 'Motta tilbud'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Þú færð fljótt óbindandi tilboð frá fagfólki sem vill aðstoða.'
                  : 'Etter kort tid får du uforpliktende tilbud fra bedrifter og fagfolk som vil hjelpe deg.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Hefstu handa!' : 'Sett i gang!'}
              </h3>
              <p className="text-gray-600">
                {language === 'is'
                  ? 'Farðu yfir tilboðin og veldu rétt fyrirtæki. Eftir verkið geturðu skilið eftir umsögn.'
                  : 'Sjekk tilbudene du har fått, og velg riktig bedrift for jobben.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Tilbúinn að byrja?' : 'Klar til å starte?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'is'
              ? 'Leggðu inn verkefnið þitt og fáðu tilboð frá hæfum handverksmönnum á þínu svæði.'
              : 'Legg ut prosjektet ditt og få tilbud fra kvalifiserte håndverkere i ditt område.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/job-categories"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Legg ut prosjekt'}
            </Link>
            <Link 
              to="/bedriftsok"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {language === 'is' ? 'Finn handverksmenn' : 'Finn håndverkere'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandcraftCategoryPage;