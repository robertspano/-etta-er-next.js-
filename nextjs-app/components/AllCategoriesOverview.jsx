'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Wrench, Building, Users, Hammer, Zap, Car } from 'lucide-react';

const AllCategoriesOverview = ({ translations, language }) => {
  const router = useRouter();




  // Main category boxes with all subcategories - exactly like Mittanbud
  const categoryBoxes = [
    {
      key: 'hus-og-hage',
      title: translations.husOgHage || (language === 'is' ? 'Hús og garður' : 'Home & Garden'),
      icon: <Home className="w-8 h-8" />,
      items: [
        // Column 1
        [
          translations.grunnarbeid || (language === 'is' ? 'Grunnarbeid' : 'Foundation Work'),
          translations.vinterhage || (language === 'is' ? 'Vetrarhús' : 'Conservatory'),
          translations.tak || (language === 'is' ? 'Þak' : 'Roof'),
          translations.platting || (language === 'is' ? 'Steinaverk' : 'Paving & Terrace'),
          translations.murOgBetong || (language === 'is' ? 'Mur og steinsteypa' : 'Masonry & Concrete'),
          translations.drenering || (language === 'is' ? 'Frárennsliser' : 'Drainage'),
          translations.fasade || (language === 'is' ? 'Útveggir' : 'Facade'),
          translations.vinduOgDor || (language === 'is' ? 'Gluggar og hurðir' : 'Windows & Doors'),
          translations.asfaltering || (language === 'is' ? 'Asfaltering' : 'Asphalting')
        ],
        // Column 2
        [
          translations.kladning || (language === 'is' ? 'Klæðning' : 'Cladding'),
          translations.beleggningsstein || (language === 'is' ? 'Steingar' : 'Paving Stones'),
          translations.isolering || (language === 'is' ? 'Einangrun' : 'Insulation'),
          translations.riving || (language === 'is' ? 'Riving' : 'Demolition'),
          translations.maleHus || (language === 'is' ? 'Húsamálun' : 'House Painting'),
          translations.vannOgAvlop || (language === 'is' ? 'Vatn og frárennsliser' : 'Water & Drainage'),
          translations.hagearbeid || (language === 'is' ? 'Garðyrkja' : 'Landscaping'),
          translations.trefelling || (language === 'is' ? 'Tréfelling' : 'Tree Felling'),
          translations.gjerde || (language === 'is' ? 'Garðhegningar' : 'Fencing')
        ]
      ]
    },
    {
      key: 'tjenester',
      title: translations.tjenester || (language === 'is' ? 'Þjónusta' : 'Services'),
      icon: <Wrench className="w-8 h-8" />,
      items: [
        // Column 1
        [
          translations.takst || (language === 'is' ? 'Takst' : 'Appraisal'),
          translations.elektrikertjenester || (language === 'is' ? 'Rafvirkjaþjónusta' : 'Electrical Services'),
          translations.installasjon || (language === 'is' ? 'Uppsetning og samsett' : 'Installation & Assembly'),
          translations.utleie || (language === 'is' ? 'Leiga' : 'Rental'),
          translations.solcellepanel || (language === 'is' ? 'Sólarvörur' : 'Solar Panels'),
          translations.transport || (language === 'is' ? 'Flutningar' : 'Transport'),
          translations.euKontroll || (language === 'is' ? 'EU-eftirlit' : 'EU Control'),
          translations.flyttevask || (language === 'is' ? 'Flutningsþrif' : 'Moving Cleaning'),
          translations.avfallshandtering || (language === 'is' ? 'Sorpmeðhöndlun' : 'Waste Management')
        ],
        // Column 2
        [
          translations.mekaniskVerksted || (language === 'is' ? 'Vélvirkjun' : 'Mechanical Workshop'),
          translations.bilOgBilverksted || (language === 'is' ? 'Bílaþjónusta' : 'Car Service'),
          translations.rengjoring || (language === 'is' ? 'Þrif' : 'Cleaning'),
          translations.solskjerming || (language === 'is' ? 'Sólhlífar' : 'Sun Protection'),
          translations.skadedyrkontroll || (language === 'is' ? 'Meindýraeftirlit' : 'Pest Control'),
          translations.alarmSikkerhet || (language === 'is' ? 'Öryggiskerfi' : 'Security & Alarms'),
          translations.elbillader || (language === 'is' ? 'Rafbílahleðslur' : 'EV Chargers'),
          translations.flyttebyra || (language === 'is' ? 'Flutningafyrirtæki' : 'Moving Companies'),
          translations.godstransport || (language === 'is' ? 'Vöruflutningar' : 'Freight Transport')
        ]
      ]
    },
    {
      key: 'innvendig-oppussing',
      title: translations.innvendigOppussing || (language === 'is' ? 'Innri endurnýjun' : 'Interior Renovation'),
      icon: <Building className="w-8 h-8" />,
      items: [
        // Column 1
        [
          translations.gulvbelegg || (language === 'is' ? 'Gólfefni' : 'Flooring'),
          translations.hybelUtleieenhet || (language === 'is' ? 'Íbúðir og leiga' : 'Rental Units'),
          translations.pusseOppLoft || (language === 'is' ? 'Loftviðgerð' : 'Ceiling Repair'),
          translations.pusseVaskerom || (language === 'is' ? 'Þvottaherbergi' : 'Laundry Room'),
          translations.pagingGulv || (language === 'is' ? 'Gólflagning' : 'Floor Installation'),
          translations.trapp || (language === 'is' ? 'Stigi' : 'Stairs'),
          translations.pusseOppBad || (language === 'is' ? 'Baðherbergisviðgerð' : 'Bathroom Repair'),
          translations.membran || (language === 'is' ? 'Þéttingar' : 'Membranes'),
          translations.ventilasjon || (language === 'is' ? 'Loftræsting' : 'Ventilation')
        ],
        // Column 2
        [
          translations.gulv || (language === 'is' ? 'Gólf' : 'Floors'),
          translations.flislegging || (language === 'is' ? 'Flíslagning' : 'Tiling'),
          translations.pusseOppKjokken || (language === 'is' ? 'Eldhúsviðgerð' : 'Kitchen Renovation'),
          translations.pusseOppTelliget || (language === 'is' ? 'Smáviðgerðir' : 'Small Repairs'),
          translations.pusseOppOppholdstom || (language === 'is' ? 'Stofa og svefnherbergi' : 'Living & Bedrooms'),
          translations.interiorsarkitekt || (language === 'is' ? 'Innanhússhönnun' : 'Interior Design'),
          translations.pusseOppKjeller || (language === 'is' ? 'Kjallaraviðgerð' : 'Basement Renovation'),
          translations.maling || (language === 'is' ? 'Málun' : 'Painting'),
          translations.vatromsbygge || (language === 'is' ? 'Blautrými' : 'Wet Rooms')
        ]
      ]
    },
    {
      key: 'bygge-nytt',
      title: translations.byggeNytt || (language === 'is' ? 'Byggja nýtt' : 'Build New'),
      icon: <Building className="w-8 h-8" />,
      items: [
        // Column 1
        [
          translations.byggefirma || (language === 'is' ? 'Byggingarfyrirtæki' : 'Construction Company'),
          translations.prosjektleder || (language === 'is' ? 'Verkefnastjóri' : 'Project Manager'),
          translations.byggesaknod || (language === 'is' ? 'Byggingarleyfi' : 'Building Permits'),
          translations.arkitekt || (language === 'is' ? 'Arkitekt' : 'Architect'),
          translations.byggeHus || (language === 'is' ? 'Húsbygging' : 'House Construction'),
          translations.byggeGarasje || (language === 'is' ? 'Bílskúrsbygging' : 'Garage Construction'),
          translations.ansvarligUtforende || (language === 'is' ? 'Ábyrgðarmaður' : 'Responsible Contractor'),
          translations.ferdigOgFerdighytte || (language === 'is' ? 'Tilbúnar sumarhús' : 'Prefab Cabins')
        ],
        // Column 2
        [
          translations.totalrenovering || (language === 'is' ? 'Heildarendurnýjun' : 'Total Renovation'),
          translations.byggePabygg || (language === 'is' ? 'Viðbygging' : 'Extensions'),
          translations.byggeHytte || (language === 'is' ? 'Sumarhús' : 'Cabin Construction'),
          translations.byggeFilbygg || (language === 'is' ? 'Viðbyggingar' : 'Annexes'),
          translations.ansvarligKontrollerende || (language === 'is' ? 'Eftirlitsmaður' : 'Building Inspector'),
          translations.garasjeport || (language === 'is' ? 'Bílskúrshurðir' : 'Garage Doors'),
          translations.byggingenior || (language === 'is' ? 'Byggingartæknir' : 'Building Engineer')
        ]
      ]
    },
    {
      key: 'borettslag-sameier',
      title: translations.borettslagSameier || (language === 'is' ? 'Íbúðasamfélög' : 'Housing Associations'),
      icon: <Users className="w-8 h-8" />,
      items: [
        // Column 1
        [
          translations.borettslagSameierGeneral || (language === 'is' ? 'Íbúðasamfélög' : 'Housing Associations')
        ]
      ]
    },
    {
      key: 'handverker',
      title: translations.handverker || (language === 'is' ? 'Handverksmenn' : 'Craftsmen'),
      icon: <Hammer className="w-8 h-8" />,
      items: [
        // Column 1
        [
          translations.murer || (language === 'is' ? 'Múrari' : 'Mason'),
          translations.maler || (language === 'is' ? 'Málari' : 'Painter'),
          translations.flislegger || (language === 'is' ? 'Flíslagningamaður' : 'Tiler'),
          translations.elektriker || (language === 'is' ? 'Rafvirki' : 'Electrician'),
          translations.anleggsgartner || (language === 'is' ? 'Garðyrkjumaður' : 'Landscaper'),
          translations.taktekker || (language === 'is' ? 'Þakiðnaðarmaður' : 'Roofer'),
          translations.mobelsnekker || (language === 'is' ? 'Húsgagnasmiður' : 'Furniture Maker')
        ],
        // Column 2
        [
          translations.losesmed || (language === 'is' ? 'Lausnir' : 'Solutions'),
          translations.maskinentreprenar || (language === 'is' ? 'Vélvirkjan' : 'Machine Contractor'),
          translations.rorlegger || (language === 'is' ? 'Pípulagningamaður' : 'Plumber'),
          translations.blikkenslager || (language === 'is' ? 'Blikksmiður' : 'Sheet Metal Worker'),
          translations.snekker || (language === 'is' ? 'Trésmiður' : 'Carpenter'),
          translations.tomrer || (language === 'is' ? 'Húsasmíðamaður' : 'Builder'),
          translations.prosjektledelse || (language === 'is' ? 'Verkefnastjórnun' : 'Project Management')
        ]
      ]
    },
    {
      key: 'mittanbud-xl',
      title: translations.mittanbudXL || (language === 'is' ? 'verki XL' : 'verki XL'),
      icon: <Zap className="w-8 h-8" />,
      items: [
        // Column 1
        [
          translations.mittanbudXLGeneral || (language === 'is' ? 'verki XL' : 'verki XL')
        ]
      ]
    }
  ];

  const handleCategoryClick = (categoryKey) => {
    // Route based on category
    if (categoryKey === 'hus-og-hage') {
      router.push('/post/home-garden');
    } else if (categoryKey === 'tjenester') {
      router.push('/post/services');
    } else if (categoryKey === 'innvendig-oppussing') {
      router.push('/post/interior');
    } else if (categoryKey === 'bygge-nytt') {
      router.push('/xl');
    } else if (categoryKey === 'borettslag-sameier') {
      router.push('/post/housing-associations');
    } else if (categoryKey === 'handverker') {
      router.push('/handcraft');
    } else if (categoryKey === 'mittanbud-xl') {
      router.push('/xl');
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header with tighter spacing */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations.allCategoriesTitle || (language === 'is' ? 'Allir flokkar' : 'All Categories')}
          </h1>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto mb-8">
            {translations.allCategoriesSubtitle || (language === 'is'
              ? 'Hér fyrir neðan finnurðu yfirlit yfir allt sem verki getur hjálpað þér með. Á þessum tenglum finnurðu frekari upplýsingar um mismunandi þjónustu.'
              : 'Below you will find an overview of everything verki can help you with. On these links you will find more information about the different services.'
            )}
          </p>
        </div>

        {/* Main Categories Grid - Like Mittanbud */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categoryBoxes.map((categoryBox) => (
            <div 
              key={categoryBox.key}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Category Header */}
              <div 
                className="p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleCategoryClick(categoryBox.key)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-blue-600">
                    {categoryBox.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {categoryBox.title}
                  </h2>
                </div>
              </div>
              
              {/* Category Items in Columns */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {/* Column 1 */}
                  <div className="space-y-2">
                    {categoryBox.items[0]?.map((item, index) => (
                      <div key={index} className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  {/* Column 2 */}
                  <div className="space-y-2">
                    {categoryBox.items[1]?.map((item, index) => (
                      <div key={index} className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesOverview;