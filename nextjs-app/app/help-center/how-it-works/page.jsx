'use client';

import React from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';
import { 
  ArrowLeft, FileText, Search, UserCheck, 
  FileSignature, CreditCard, CheckCircle, 
  Users, Clock, Shield, Target
} from 'lucide-react';

const HowItWorksPage = () => {
  const { language, translations } = useTranslations();

  const steps = [
    {
      number: 1,
      title: language === 'is' ? 'Búðu til verk' : 'Create Project',
      description: language === 'is' 
        ? 'Lýstu því sem á að gera, hvar og hvenær. Settu inn myndir og mælingar ef hægt er. Skýr lýsing skilar betri tilboðum.'
        : 'Describe what needs to be done, where and when. Add photos and measurements if possible. Clear description results in better quotes.',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      tips: [
        language === 'is' ? 'Vertu nákvæm/ur í lýsingunni' : 'Be precise in the description',
        language === 'is' ? 'Bættu við myndum ef mögulegt' : 'Add photos if possible',
        language === 'is' ? 'Tilgreindu tímaramma verkefnisins' : 'Specify project timeframe'
      ]
    },
    {
      number: 2,
      title: language === 'is' ? 'Fáðu tilboð' : 'Get Quotes',
      description: language === 'is' 
        ? 'Staðbundnir verktakar skoða verkið og senda tilboð. Yfirleitt berast tvö til fimm tilboð eftir svæði og tegund verks.'
        : 'Local contractors review the project and send quotes. Usually two to five quotes are received depending on area and type of work.',
      icon: <Search className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      tips: [
        language === 'is' ? 'Bíddu eftir mörgum tilboðum' : 'Wait for multiple quotes',
        language === 'is' ? 'Skoðaðu prófíla verktaka' : 'Review contractor profiles',
        language === 'is' ? 'Lestu umsagnir vandlega' : 'Read reviews carefully'
      ]
    },
    {
      number: 3,
      title: language === 'is' ? 'Berðu saman og veldu' : 'Compare and Choose',
      description: language === 'is' 
        ? 'Skoðaðu verð, hvað er innifalið, áætlaðan tíma, vottanir, tryggingar og samskiptahraða.'
        : 'Review price, what is included, estimated time, certifications, insurance and communication speed.',
      icon: <UserCheck className="w-8 h-8" />,
      color: 'from-purple-500 to-violet-500',
      tips: [
        language === 'is' ? 'Berðu saman heildarverð' : 'Compare total prices',
        language === 'is' ? 'Athugaðu hvað er innifalið' : 'Check what is included',
        language === 'is' ? 'Skoðaðu tryggingar verktaka' : 'Review contractor insurance'
      ]
    },
    {
      number: 4,
      title: language === 'is' ? 'Gera samning og hefja vinnu' : 'Make Contract and Start Work',
      description: language === 'is' 
        ? 'Staðfestu umfang, verð og tímaáætlun skriflega. Skráðu allar breytingar.'
        : 'Confirm scope, price and timeline in writing. Record all changes.',
      icon: <FileSignature className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      tips: [
        language === 'is' ? 'Hafðu allt skriflegt' : 'Have everything in writing',
        language === 'is' ? 'Skráðu breytingar strax' : 'Record changes immediately',
        language === 'is' ? 'Skilgreindu greiðsluáætlun' : 'Define payment schedule'
      ]
    },
    {
      number: 5,
      title: language === 'is' ? 'Greiðslur' : 'Payments',
      description: language === 'is' 
        ? 'Notaðu áfangagreiðslur eftir stærð verks. Ekki greiða allt fyrirfram. Lokagreiðsla fer fram þegar verki er formlega lokið.'
        : 'Use milestone payments based on project size. Don\'t pay everything upfront. Final payment is made when work is formally completed.',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      tips: [
        language === 'is' ? 'Aldrei greiða allt fyrirfram' : 'Never pay everything upfront',
        language === 'is' ? 'Notaðu áfangagreiðslur' : 'Use milestone payments',
        language === 'is' ? 'Geymdu kvittanir' : 'Keep receipts'
      ]
    },
    {
      number: 6,
      title: language === 'is' ? 'Verklok og afhending' : 'Completion and Handover',
      description: language === 'is' 
        ? 'Staðfestu lok verks, taktu við afhendingu og geymdu skjöl, myndir og kvittanir á einum stað.'
        : 'Confirm work completion, accept handover and keep documents, photos and receipts in one place.',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'from-green-500 to-blue-500',
      tips: [
        language === 'is' ? 'Skoðaðu vinnuna vandlega' : 'Inspect work carefully',
        language === 'is' ? 'Geymdu öll skjöl' : 'Keep all documents',
        language === 'is' ? 'Skrifaðu umsögn' : 'Write a review'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Back Navigation */}
        <div className="mb-8">
          <a 
            href="/help-center" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'is' ? 'Til baka í hjálparmiðstöð' : 'Back to Help Center'}
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' ? 'Hvernig virkar Verki' : 'How Verki Works'}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {language === 'is' 
              ? 'Verki tengir einstaklinga við trausta verktaka. Þú lýsir verkefni, færð tilboð, berð saman valkosti og velur. Greiðslur og samskipti halda áfram á öruggan og gagnsæjan hátt þar til verki lýkur.'
              : 'Verki connects individuals with trusted contractors. You describe the project, get quotes, compare options and choose. Payments and communication continue in a secure and transparent manner until work is completed.'
            }
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-1">6</div>
              <div className="text-sm text-gray-600">
                {language === 'is' ? 'Einföld skref' : 'Simple Steps'}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-1">2-5</div>
              <div className="text-sm text-gray-600">
                {language === 'is' ? 'Tilboð að jafnaði' : 'Quotes on Average'}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-1">24h</div>
              <div className="text-sm text-gray-600">
                {language === 'is' ? 'Fyrstu tilboð' : 'First Quotes'}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">
                {language === 'is' ? 'Ókeypis að byrja' : 'Free to Start'}
              </div>
            </div>
          </div>
        </div>

        {/* Steps Process */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-16 top-32 w-0.5 h-24 bg-gradient-to-b from-gray-300 to-transparent hidden md:block"></div>
              )}
              
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
                <div className="md:flex">
                  {/* Left Side - Icon and Number */}
                  <div className={`bg-gradient-to-br ${step.color} p-8 md:w-80 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                        {step.icon}
                      </div>
                      <div className="text-5xl font-bold mb-2 opacity-80">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Right Side - Content */}
                  <div className="flex-1 p-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      {language === 'is' ? 'Yfirlit' : 'Overview'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    
                    <h5 className="font-semibold text-gray-900 mb-3">
                      {language === 'is' ? 'Lykilatriði:' : 'Key Points:'}
                    </h5>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Tilbúinn/n að byrja?' : 'Ready to Start?'}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {language === 'is' 
              ? 'Nú þegar þú veist hvernig Verki virkar, geturðu byrjað að setja inn fyrsta verkefnið þitt.'
              : 'Now that you know how Verki works, you can start submitting your first project.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <FileText className="w-5 h-5 mr-3" />
              {language === 'is' ? 'Búa til verkefni' : 'Create Project'}
            </a>
            <a 
              href="/help-center" 
              className="inline-flex items-center bg-white bg-opacity-20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-opacity-30 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              {language === 'is' ? 'Til baka í hjálp' : 'Back to Help'}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorksPage;