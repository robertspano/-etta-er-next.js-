'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/contexts/TranslationsContext';

const HouseGardenCategoryPage = ({ translations, language }) => {
  const [selectedService, setSelectedService] = useState(null);

  const houseGardenServices = [
    {
      id: 'grunnarbeid',
      name: language === 'is' ? 'Grunnvinna' : 'Foundation Work',
      description: language === 'is' 
        ? 'Fagleg jarðvinna og undirbúningur fyrir öll byggingarverkefni.'
        : 'Professional excavation and preparation for all construction projects.',
      professionalsText: language === 'is' ? 'Reyndir sérfræðingar' : 'Experienced specialists',
      projectsText: language === 'is' ? 'Áreiðanleg þjónusta' : 'Reliable service guaranteed',
      priceText: language === 'is' ? 'Sanngjörn verðlagning' : 'Fair pricing policy',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Uppgröftur', 'Grunnur']
        : ['Excavation', 'Foundation']
    },
    {
      id: 'kledning',
      name: language === 'is' ? 'Klæðning' : 'Cladding',
      description: language === 'is' 
        ? 'Fagleg utanáklæðning húsa með gæðaefnum og fínni handverki.'
        : 'Professional exterior cladding with quality materials and fine craftsmanship.',
      professionalsText: language === 'is' ? 'Hæfir klæðningarsérfræðingar' : 'Skilled cladding specialists',
      projectsText: language === 'is' ? 'Vandað handverk' : 'Meticulous workmanship', 
      priceText: language === 'is' ? 'Gagnsæ kostnaðarmat' : 'Transparent cost estimates',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Viðarklæðning', 'Steinklæðning']
        : ['Wood cladding', 'Stone cladding']
    },
    {
      id: 'vinterhage',
      name: language === 'is' ? 'Vetrarhús' : 'Conservatory',
      description: language === 'is'
        ? 'Sérhæfðir sérfræðingar í vetrarhúsabyggingum og glersamsetningum.'
        : 'Specialized experts in conservatory construction and glass installations.',
      professionalsText: language === 'is' ? 'Sérhæfðir byggingaraðilar' : 'Specialized builders available',
      projectsText: language === 'is' ? 'Persónuleg þjónusta' : 'Personalized service approach',
      priceText: language === 'is' ? 'Ráðgjafarþjónusta innifalin' : 'Consultation included',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Glerveggir', 'Þakgluggar']
        : ['Glass walls', 'Roof windows']
    },
    {
      id: 'belegningsstein',
      name: language === 'is' ? 'Steineggjarvinnsla' : 'Paving Stones',
      description: language === 'is'
        ? 'Fagmenn í steinsetningu með áratuga reynslu og vandaða handverki.'
        : 'Stone laying experts with decades of experience and careful craftsmanship.',
      professionalsText: language === 'is' ? 'Reyndir steinleggingaraðilar' : 'Experienced stone layers',
      projectsText: language === 'is' ? 'Varanlegt handverk' : 'Durable craftsmanship',
      priceText: language === 'is' ? 'Kostnaðarmat í boði' : 'Free cost estimates',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Hellulagnir', 'Steingólf']
        : ['Paving', 'Stone flooring']
    },
    {
      id: 'tak',
      name: language === 'is' ? 'Þakviðgerðir og þaklagnir' : 'Roofing',
      description: language === 'is'
        ? 'Þekkingarmiklir þaksérfræðingar með áherslu á gæði og öryggi.'
        : 'Knowledgeable roofing specialists with emphasis on quality and safety.',
      professionalsText: language === 'is' ? 'Löggiltir þaksérfræðingar' : 'Certified roofing experts',
      projectsText: language === 'is' ? 'Trygging og ábyrgðir' : 'Insurance and warranties',
      priceText: language === 'is' ? 'Ókeypis úttekt í boði' : 'Free assessments available',
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakviðgerðir', 'Þaksteypa']
        : ['Roof repairs', 'Roofing']
    },
    {
      id: 'isolering',
      name: language === 'is' ? 'Einangrun' : 'Insulation',
      description: language === 'is'
        ? 'Orkusparandi einangrunarlausnir frá umhverfisvænum sérfræðingum.'
        : 'Energy-saving insulation solutions from environmentally conscious experts.',
      professionalsText: language === 'is' ? 'Orkusérfræðingar tilbúnir' : 'Energy specialists ready',
      projectsText: language === 'is' ? 'Umhverfisvænar lausnir' : 'Eco-friendly solutions',
      priceText: language === 'is' ? 'Orkusparnaður tryggður' : 'Energy savings guaranteed',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakeinangrun', 'Veggeinangrun']
        : ['Roof insulation', 'Wall insulation']
    },
    {
      id: 'vindu-dor',
      name: language === 'is' ? 'Gluggar og hurðir' : 'Windows & Doors',
      description: language === 'is'
        ? 'Sérfræðingar í gluggum og hurðum með áherslu á orkunýtni.'
        : 'Window and door specialists with focus on energy efficiency.',
      professionalsText: language === 'is' ? 'Gluggasérfræðingar' : 'Window specialists ready',
      projectsText: language === 'is' ? 'Orkunýtin lausnir' : 'Energy efficient solutions', 
      priceText: language === 'is' ? 'Mæling og tilboð ókeypis' : 'Free measuring and quotes',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Gluggaskipti', 'Hurðaskipti']
        : ['Window replacement', 'Door replacement']
    },
    {
      id: 'male-hus',
      name: language === 'is' ? 'Húsamálun' : 'House Painting',
      description: language === 'is'
        ? 'Reyndir málarar með áherslu á gæðaefni og vandaða frágang.'
        : 'Experienced painters with focus on quality materials and meticulous finish.',
      professionalsText: language === 'is' ? 'Fagmálarar tilbúnir' : 'Professional painters ready',
      projectsText: language === 'is' ? 'Gæðamálning tryggð' : 'Quality paint guaranteed',
      priceText: language === 'is' ? 'Ókeypis verðtilboð' : 'Free quotes available',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Utanmálun', 'Innanmálun']
        : ['Exterior painting', 'Interior painting']
    },

    {
      id: 'trefelling',
      name: language === 'is' ? 'Trjáfelling og stubbfræsing' : 'Tree Felling & Stump Grinding',
      description: language === 'is'
        ? 'Öruggar trjáfelling með fullu öryggisvörnum og faglegum búnaði.'
        : 'Safe tree felling with full safety equipment and professional tools.',
      professionalsText: language === 'is' ? 'Löggiltir trjáfellingar' : 'Certified arborists available',
      projectsText: language === 'is' ? 'Öryggi í fyrrúm' : 'Safety first approach',
      priceText: language === 'is' ? 'Tryggingar í lagi' : 'Fully insured service',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Trjáfelling', 'Stubbfræsing']
        : ['Tree felling', 'Stump grinding']
    },

    {
      id: 'uteplanter',
      name: language === 'is' ? 'Útiplöntur' : 'Uteplanter',
      nameNorwegian: 'Uteplanter',
      description: language === 'is'
        ? 'Plöntun, umhirða og hönnun útirýma með blómum og plöntum.'
        : 'Planting, stell og design av uteområder med blomster og planter.',
      professionals: 950,
      averagePrice: language === 'is' ? '20.000-120.000 kr' : '400-700 kr/time',
      completedJobs: 3100,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Blómaplöntun', 'Kjartagarðar', 'Útihönnun', 'Viðhald']
        : ['Blomsterplanting', 'Urter', 'Utedesign', 'Vedlikehold']
    },
    {
      id: 'uteterrasse',
      name: language === 'is' ? 'Verandir og þil' : 'Uteterrasse',
      nameNorwegian: 'Uteterrasse',
      description: language === 'is'
        ? 'Bygging og viðhald á verönd, þilum og útisvæðum.'
        : 'Bygging og vedlikehold av terrasser, dekk og uteområder.',
      professionals: 750,
      averagePrice: language === 'is' ? '80.000-400.000 kr' : '600-1200 kr/time',
      completedJobs: 1800,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Viðarþil', 'Steinverandir', 'Hellulagnir', 'Afgirðingar']
        : ['Tredekk', 'Steinterrasser', 'Flislegging', 'Rekkverk']
    },
    {
      id: 'tak',
      name: language === 'is' ? 'Þakviðgerðir' : 'Roofing',
      description: language === 'is'
        ? 'Þakviðgerðir, uppsetningar og viðhald frá reyndum þaksérfræðingum.'
        : 'Roof repairs, installations and maintenance from experienced roofing specialists.',
      professionals: 1200,
      professionalsText: language === 'is' ? 'Sannreyndir fagmenn' : 'Verified professionals',
      projectsText: language === 'is' ? 'Gæðaverkefni afhent' : 'Quality projects',
      priceText: language === 'is' ? 'Samkeppnishæf verðlagning' : 'Competitive pricing',
      completedJobs: 4500,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þakviðgerðir', 'Þaksteypa', 'Einangrun']
        : ['Roof repairs', 'Roofing', 'Insulation']
    },

    {
      id: 'vindu-dor',
      name: language === 'is' ? 'Gluggar og hurðir' : 'Windows & Doors',
      description: language === 'is'
        ? 'Uppsetning og viðgerð á gluggum og hurðum fyrir heimili.'
        : 'Installation and repair of windows and doors for homes.',
      professionals: 620,
      professionalsText: language === 'is' ? 'Sannreyndir fagmenn' : 'Verified professionals',
      projectsText: language === 'is' ? 'Gæðaverkefni afhent' : 'Quality projects', 
      priceText: language === 'is' ? 'Samkeppnishæf verðlagning' : 'Competitive pricing',
      completedJobs: 1800,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Gluggaskipti', 'Hurðaskipti', 'Viðgerðir']
        : ['Window replacement', 'Door replacement', 'Repairs']
    },
    {
      id: 'hagearbeid',
      name: language === 'is' ? 'Garðyrkja' : 'Garden Work',
      description: language === 'is' 
        ? 'Garðyrkjusérfræðingar sem breyta garðinum þínum í paradís.'
        : 'Garden specialists who transform your garden into a paradise.',
      professionalsText: language === 'is' ? 'Skapandi garðyrkjumenn' : 'Creative gardeners available',
      projectsText: language === 'is' ? 'Fallegir garðar skapaðir' : 'Beautiful gardens created',
      priceText: language === 'is' ? 'Hönnunarráðgjöf innifalin' : 'Design consultation included',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
      specialties: language === 'is' 
        ? ['Garðhönnun', 'Trjáklippingar']
        : ['Garden design', 'Tree trimming']
    },

    {
      id: 'vinduer-dorer',
      name: language === 'is' ? 'Gluggar og hurðir' : 'Vinduer og dører',
      nameNorwegian: 'Vinduer og dører',
      description: language === 'is'
        ? 'Uppsetning, viðgerðir og skipti á gluggum og hurðum.'
        : 'Installasjon, reparasjoner og utskifting av vinduer og dører.',
      professionals: 1100,
      averagePrice: language === 'is' ? '25.000-120.000 kr' : '500-850 kr/time',
      completedJobs: 5200,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Gluggaskipti', 'Hurðaviðgerðir', 'Einangrun', 'Uppsetning']
        : ['Vindusbytte', 'Dørreparasjoner', 'Isolering', 'Installasjon']
    },
    {
      id: 'drenering',
      name: language === 'is' ? 'Drenering og vatnskerfi' : 'Drenering',
      nameNorwegian: 'Drenering',
      description: language === 'is'
        ? 'Vatnskerfi, drenering og vatnsleiðslur fyrir garða og hús.'
        : 'Vannsystem, drenering og vannledninger for hager og hus.',
      professionals: 600,
      averagePrice: language === 'is' ? '50.000-200.000 kr' : '600-900 kr/time',
      completedJobs: 1800,
      image: 'https://images.unsplash.com/photo-1621905252472-e8de73cbce81?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Vatnsleiðslur', 'Drenkerfi', 'Púmpur', 'Viðhald']
        : ['Vannledninger', 'Dreneringssystem', 'Pumper', 'Vedlikehold']
    },
    {
      id: 'grunnarbeid',
      name: language === 'is' ? 'Grunnvinna og jarðvinna' : 'Grunnarbeid',
      nameNorwegian: 'Grunnarbeid',
      description: language === 'is'
        ? 'Jarðvinna, uppgröftur og undirbúningur fyrir byggingarverkefni.'
        : 'Jordarbeid, utgravning og forberedelser for byggeprosjekter.',
      professionals: 900,
      averagePrice: language === 'is' ? '80.000-300.000 kr' : '700-1200 kr/time',
      completedJobs: 2500,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Uppgröftur', 'Grunnur', 'Jarðflutningar', 'Undirbúningur']
        : ['Utgravning', 'Grunnleggende', 'Jordtransport', 'Forberedelser']
    },
    {
      id: 'gjerde-port',
      name: language === 'is' ? 'Girðingar og hlið' : 'Gjerde og port',
      nameNorwegian: 'Gjerde og port',
      description: language === 'is'
        ? 'Girðingar, hlið og afgirðingar fyrir garða og eignir.'
        : 'Gjerder, porter og inngjerding for hager og eiendommer.',
      professionals: 650,
      averagePrice: language === 'is' ? '30.000-120.000 kr' : '400-700 kr/time',
      completedJobs: 2200,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Viðargirðingar', 'Málmgirðingar', 'Hlið', 'Uppsetning']
        : ['Tregjerder', 'Metallgjerder', 'Porter', 'Installasjon']
    },
    {
      id: 'utlys',
      name: language === 'is' ? 'Útiljós' : 'Utelys',
      nameNorwegian: 'Utelys',
      description: language === 'is'
        ? 'Uppsetning og viðhald á útiljósum og garðlýsingu.'
        : 'Installasjon og vedlikehold av utelys og hagelys.',
      professionals: 450,
      averagePrice: language === 'is' ? '25.000-80.000 kr' : '500-800 kr/time',
      completedJobs: 1600,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['LED ljós', 'Garðlýsing', 'Öryggisljós', 'Jólabirta']
        : ['LED-lys', 'Hagelys', 'Sikkerhetslys', 'Julelys']
    },
    {
      id: 'utebad',
      name: language === 'is' ? 'Heitir pottar og sundlaugar' : 'Utebad',
      nameNorwegian: 'Utebad',
      description: language === 'is'
        ? 'Uppsetning og viðhald á heitum pottum, sundlaugum og vellíðunartækjum.'
        : 'Installasjon og vedlikehold av boblebad, basseng og spa-utstyr.',
      professionals: 350,
      averagePrice: language === 'is' ? '100.000-500.000 kr' : '800-1500 kr/time',
      completedJobs: 800,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Heitir pottar', 'Sundlaugar', 'Spa tækni', 'Viðhald']
        : ['Boblebad', 'Svømmebasseng', 'Spa-teknikk', 'Vedlikehold']
    },
    {
      id: 'snorydding',
      name: language === 'is' ? 'Snjómokstur' : 'Snørydding',
      nameNorwegian: 'Snørydding',
      description: language === 'is'
        ? 'Snjómokstur og vetrarverk fyrir heimili og fyrirtæki.'
        : 'Snørydding og vinterarbeid for hjem og bedrifter.',
      professionals: 800,
      averagePrice: language === 'is' ? '10.000-50.000 kr' : '300-600 kr/time',
      completedJobs: 3500,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Snjómokstur', 'Strá', 'Vetrartilbúnaður', 'Bráðaþjónusta']
        : ['Snøfjerning', 'Strøing', 'Vinterutstyr', 'Akuttservice']
    },
    {
      id: 'uteopprydding',
      name: language === 'is' ? 'Garðþrif og þrifþjónusta' : 'Uteopprydding',
      nameNorwegian: 'Uteopprydding',
      description: language === 'is'
        ? 'Þrif og umhirða útirýma, fjarlæging rusl og viðhald.'
        : 'Rengjøring og vedlikehold av uteområder, søppelfjerning og stell.',
      professionals: 600,
      averagePrice: language === 'is' ? '15.000-60.000 kr' : '250-500 kr/time',
      completedJobs: 2800,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      specialties: language === 'is'
        ? ['Þrif', 'Ruslflutningar', 'Þvottur', 'Viðhald']
        : ['Rengjøring', 'Søppelhenting', 'Vask', 'Vedlikehold']
    }
  ];

  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Hjem', href: '/' },
    { name: language === 'is' ? 'Allir flokkar' : 'All Categories', href: '/all-categories' },
    { name: language === 'is' ? 'Hús og garður' : 'Hus og hage', href: null }
  ];

  return (
    <div className="min-h-screen bg-light_cyan">
      {/* Header Section with Background */}
      <div className="bg-gradient-to-br from-light_cyan to-non_photo_blue py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-federal_blue mb-6">
              {language === 'is' ? 'Hús og garður' : 'House & Garden'}
            </h1>
            <p className="text-xl text-honolulu_blue max-w-4xl mx-auto leading-relaxed">
              {language === 'is'
                ? 'Finndu hæfa iðnaðarmenn fyrir verkefnið þitt. Frá garðyrkju til þakviðgerða - við höfum fagmennina sem þú þarft.'
                : 'Find qualified professionals for your project. From gardening to roof repairs - we have the experts you need.'
              }
            </p>
          </div>

          {/* How it works cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-honolulu_blue mb-2">
                {language === 'is' ? 'Sérvaldur fagmenn' : 'Selected professionals'}
              </div>
              <p className="text-federal_blue text-sm">
                {language === 'is'
                  ? 'Sérvaldur handverksmenn tilbúnir að gera drauma þína að veruleika.'
                  : 'Selected craftsmen ready to make your dreams come true.'
                }
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-honolulu_blue mb-2">
                {language === 'is' ? 'Gæði tryggð' : 'Quality assured'}
              </div>
              <p className="text-federal_blue text-sm">
                {language === 'is'
                  ? 'Frá hugmynd til veruleika - við afhendum gæði.'
                  : 'From idea to reality - we deliver quality.'
                }
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-honolulu_blue mb-2">
                {language === 'is' ? 'Traust og áreiðanleiki' : 'Trust and reliability'}
              </div>
              <p className="text-federal_blue text-sm">
                {language === 'is'
                  ? 'Byggjum varanleg sambönd með traustri þjónustu.'
                  : 'Building lasting relationships with reliable service.'
                }
              </p>
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
            {houseGardenServices.map(service => (
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
                      href={`/post/house-garden?category=${service.id}`}
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
              ? 'Leggðu inn garð- eða húsverkefnið þitt og fáðu tilboð frá hæfum sérfræðingum á þínu svæði.'
              : 'Post your garden or house project and get quotes from qualified specialists in your area.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/post/house-garden"
              className="bg-white text-honolulu_blue px-8 py-3 rounded-lg font-semibold hover:bg-light_cyan transition-colors"
            >
              {language === 'is' ? 'Legg inn verkefni' : 'Post project'}
            </Link>
            <Link 
              href="/professionals/house-garden"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-federal_blue transition-colors"
            >
              {language === 'is' ? 'Finn sérfræðinga' : 'Find professionals'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseGardenCategoryPage;