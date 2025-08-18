import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Wrench, Building, Construction, Users, Hammer, Square } from 'lucide-react';

const AllCategoriesOverview = ({ translations }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubcategoryClick = (categoryKey, subcategoryKey = null) => {
    if (categoryKey === 'cleaning') {
      navigate('/post/cleaning');
    } else if (categoryKey === 'housingAssociations') {
      navigate('/post/housing-associations');
    } else if (categoryKey === 'moving') {
      navigate('/post/moving');
    } else if (categoryKey === 'xl') {
      navigate('/xl');
    } else {
      navigate(`/post/${categoryKey}`);
    }
  };

  // Mittanbud-style category structure with 2-column subcategory layout
  const categoryGroups = [
    // Row 1
    [
      {
        key: 'housegarden',
        title: 'Hus og hage',
        titleEnglish: 'House and Garden',
        icon: <Home className="w-6 h-6" />,
        subcategories: [
          // Left column
          [
            'Grunnarbeid',
            'Vinterhage', 
            'Tak',
            'Platting og terrasse',
            'Mur og betong',
            'Drenering',
            'Fasade',
            'Vindu og dør',
            'Asfaltering',
            'Trefelling og stubbefres',
            'Gjerde og port',
            'Pipe og skorstein',
            'Betongaging',
            'Glassarbeid',
            'Veranda og balkong'
          ],
          // Right column
          [
            'Kledning',
            'Belegningsstein',
            'Isolering',
            'Riving',
            'Male hus',
            'Fasadevask',
            'Vann og avløp',
            'Hagearbeid',
            'Drivhus, pergola og hagestue',
            'Varmepumpe',
            'Landskapsarkitekt',
            'Kjøkkenrenovering',
            'Rive murvegg',
            'Sprengning',
            'Avfallshåndtering'
          ]
        ]
      },
      {
        key: 'services',
        title: 'Tjenester',
        titleEnglish: 'Services',
        icon: <Wrench className="w-6 h-6" />,
        subcategories: [
          // Left column
          [
            'Takst',
            'Elektrikertjenester',
            'Installasjon og montering',
            'Utleie',
            'Solcellepanel',
            'Transport',
            'EU-kontroll',
            'Flyttevask',
            'Avfallshåndtering',
            'Bilpleie',
            'Alarm og lås',
            'Vaskehjelp',
            'Persontransport',
            'Malermester',
            'Eksoservice'
          ],
          // Right column
          [
            'Mekanisk verksted',
            'Bil og bilverksted',
            'Rengjøring',
            'Solskjerming',
            'Skadedyrkontroll',
            'Alarm og sikkerhet',
            'Elbillader',
            'Flyttebyrå',
            'Godstransport',
            'Pianotransport',
            'Solskjerming, persiener og markiser',
            'Rustbehandling',
            'Energirådgiver',
            'Massetransport',
            'Klimaservice (A/C)'
          ]
        ]
      }
    ],
    // Row 2  
    [
      {
        key: 'interior',
        title: 'Innvendig oppussing',
        titleEnglish: 'Interior Renovation',
        icon: <Building className="w-6 h-6" />,
        subcategories: [
          // Left column
          [
            'Gulvbelegg',
            'Hybel og utleieenhet',
            'Pusse opp loft',
            'Pusse opp vaskerom',
            'Paging av gulv',
            'Trapp',
            'Pusse opp bad',
            'Membran',
            'Ventilasjon',
            'Sparkling',
            'Vedovn',
            'Mikrosement',
            'Montering av kjøkken',
            'Vannbåren varme',
            'VVS og kjøling'
          ],
          // Right column
          [
            'Gulv',
            'Pusse opp kjøkken',
            'Flislegging',
            'Pusse opp leilighet',
            'Interiørarkitekt',
            'Pusse opp kjeller',
            'Måling, tapetsering, overflater',
            'Gulvslipping',
            'Varmekabler',
            'Peis og peisovn',
            'Varmtvannsberefer',
            'Gulvvaraffing'
          ]
        ]
      },
      {
        key: 'construction',
        title: 'Bygge nytt',
        titleEnglish: 'New Construction',
        icon: <Construction className="w-6 h-6" />,
        subcategories: [
          // Left column
          [
            'Byggefirma',
            'Prosjektleder',
            'Byggessknad',
            'Arkitekt',
            'Bygge hus',
            'Bygge garasje',
            'Ansvarlig kontrollerende',
            'Fergighus og fertigbytte',
            'Byggingeniør'
          ],
          // Right column
          [
            'Totalrenovering av bolig',
            'Bygge påbygg',
            'Entreprenør',
            'Bygge hytte',
            'Bygge tilbygg',
            'Ansvarlig utførende',
            'Garasjeport'
          ]
        ]
      }
    ],
    // Row 3
    [
      {
        key: 'housing',
        title: 'Borettslag og sameier',
        titleEnglish: 'Housing Associations',
        icon: <Users className="w-6 h-6" />,
        subcategories: [
          // Single column (fewer items)
          [
            'Borettslag og sameier'
          ],
          []
        ]
      },
      {
        key: 'craftsmen',
        title: 'Håndverker',
        titleEnglish: 'Craftsmen',
        icon: <Hammer className="w-6 h-6" />,
        subcategories: [
          // Left column
          [
            'Murer',
            'Maler',
            'Flislegger',
            'Elektriker',
            'Anleggsgarntner',
            'Taktekker',
            'Møbelsnekker'
          ],
          // Right column
          [
            'Låsesmed',
            'Maskinentreprenør',
            'Rørlegger',
            'Blikkenslager',
            'Snekker',
            'Tømrer',
            'Prosjektledelse og byggekontroll'
          ]
        ]
      }
    ]
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Back Button */}
        <div className="flex items-center mb-12">
          <button 
            onClick={handleBack}
            className="mr-4 p-2 rounded-lg hover:bg-white/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Alle kategorier
            </h1>
          </div>
        </div>

        {/* Category Groups - Mittanbud 2-column layout */}
        <div className="space-y-8">
          {categoryGroups.map((row, rowIndex) => (
            <div key={rowIndex} className={`grid gap-8 ${row.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
              {row.map((category) => (
                <div key={category.key} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  
                  {/* Category Header */}
                  <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                      <div className="text-blue-600">
                        {category.icon}
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {category.title}
                    </h2>
                  </div>

                  {/* Subcategories in 2-column layout */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {/* Left column */}
                    <div className="space-y-2">
                      {category.subcategories[0].map((subcategory, index) => (
                        <button
                          key={index}
                          onClick={() => handleSubcategoryClick(category.key, subcategory)}
                          className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors py-1"
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                    
                    {/* Right column */}
                    <div className="space-y-2">
                      {category.subcategories[1].map((subcategory, index) => (
                        <button
                          key={index}
                          onClick={() => handleSubcategoryClick(category.key, subcategory)}
                          className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors py-1"
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Mittanbud XL - Single centered box */}
          <div className="grid grid-cols-1 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              
              {/* XL Header */}
              <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                  <div className="text-blue-600">
                    <Square className="w-6 h-6" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Mittanbud XL
                </h2>
              </div>

              {/* XL Content */}
              <div className="text-center">
                <button
                  onClick={() => handleSubcategoryClick('xl')}
                  className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                >
                  Mittanbud XL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllCategoriesOverview;