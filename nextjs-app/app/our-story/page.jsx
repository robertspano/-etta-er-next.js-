'use client';

import React from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';
import { Lightbulb, Rocket, Shield, Users, TrendingUp, Heart, Zap } from 'lucide-react';

const OurStoryPage = () => {
  const { language, translations } = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' ? 'Saga Verki' : 'Story of Verki'}
          </h1>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {language === 'is' 
                ? 'Einföld leið til að fá réttan fagmann á sanngjörnu verði með gagnsæi frá fyrstu mínútu.'
                : 'A simple way to get the right professional at a fair price with transparency from the first minute.'
              }
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="mb-12">
            <img 
              src="https://customer-assets.emergentagent.com/job_craft-connect-11/artifacts/czdu1dn3_pexels-freestockpro-12932486.jpg" 
              alt={language === 'is' ? 'Verkamenn að vinna' : 'Workers at construction site'}
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-16">
          
          {/* 2024: The Idea */}
          <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-federal_blue">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6 text-federal_blue" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'is' ? '2024: Hugmyndin kviknar' : '2024: The Idea Sparks'}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {language === 'is' 
                ? 'Ég lenti í því sem margir kannast við: erfitt að fá tilboð, óljóst verð og óvissa um gæði. Ég ákvað að byggja lausn sem tengir fólk beint við trausta verktaka með gagnsæi, umsögnum og einföldu ferli.'
                : 'I experienced what many are familiar with: difficult to get quotes, unclear pricing and uncertainty about quality. I decided to build a solution that connects people directly with trusted contractors with transparency, reviews and a simple process.'
              }
            </p>
          </div>

          {/* 2025: Launch */}
          <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-honolulu_blue">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-honolulu_blue-100 rounded-full flex items-center justify-center mr-4">
                <Rocket className="w-6 h-6 text-honolulu_blue" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'is' ? '2025: Verki fer í loftið' : '2025: Verki Takes Off'}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              {language === 'is' 
                ? 'Ég smíðaði fyrstu útgáfuna og setti Verki í gang á ákveðnu svæði. Markmiðið er skýrt: fólk setur inn verkefni á nokkrum mínútum og fær tvö til fimm tilboð frá staðbundnum fagaðilum með staðfestar tilvísanir.'
                : 'I built the first version and launched Verki in a specific area. The goal is clear: people submit projects in a few minutes and get two to five quotes from local professionals with verified references.'
              }
            </p>
            
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {language === 'is' ? 'Fyrstu verkefnin' : 'First Projects'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'is' 
                    ? 'Smærri verk í algengum iðngreinum.'
                    : 'Smaller projects in common trades.'
                  }
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {language === 'is' ? 'Traust og öryggi' : 'Trust and Security'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'is' 
                    ? 'Auðkenni verktaka, sýnilegar umsagnir og einfaldir samningsskilmálar á einni síðu.'
                    : 'Contractor identification, visible reviews and simple contract terms on one page.'
                  }
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {language === 'is' ? 'Gagnsæi' : 'Transparency'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'is' 
                    ? 'Engin falin gjöld. Notendur sjá þjónustugjald og tímamöt áður en þeir velja.'
                    : 'No hidden fees. Users see service charges and time estimates before they choose.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Now: Building Community */}
          <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-pacific_cyan">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-pacific_cyan-100 rounded-full flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-pacific_cyan" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'is' ? 'Núna: Byggjum upp samfélag gagnsæis' : 'Now: Building a Community of Transparency'}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {language === 'is' 
                ? 'Ég vinn í nánu samtali við bæði viðskiptavini og verktaka. Hver endurgjöf skilar sér beint í vöruþróun. Ferlið verður styttra, tilboðin skýrari og samskiptin betri.'
                : 'I work in close collaboration with both customers and contractors. Every feedback translates directly into product development. The process becomes shorter, quotes clearer and communication better.'
              }
            </p>
          </div>

          {/* Roadmap 2025-2026 */}
          <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-non_photo_blue">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-non_photo_blue-100 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-non_photo_blue" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'is' ? 'Vegvísir 2025 til 2026' : 'Roadmap 2025 to 2026'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-2 border-federal_blue-200 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {language === 'is' ? 'Verki prófílar' : 'Verki Profiles'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'is' 
                      ? 'Vottanir, tryggingar og myndir úr verkum í einu yfirliti.'
                      : 'Certifications, insurance and photos from projects in one overview.'
                    }
                  </p>
                </div>
                
                <div className="border-l-2 border-federal_blue-200 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {language === 'is' ? 'Öruggar greiðslur' : 'Secure Payments'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'is' 
                      ? 'Innborgun er varin þar til verki lýkur og útgreiðsla fer fram þegar báðir aðilar staðfesta verklok.'
                      : 'Deposit is protected until work is completed and payment is made when both parties confirm completion.'
                    }
                  </p>
                </div>
                
                <div className="border-l-2 border-federal_blue-200 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {language === 'is' ? 'Snjallsímaforrit' : 'Mobile App'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'is' 
                      ? 'Tilkynningar, spjall og myndadeiling í beinni.'
                      : 'Notifications, chat and live photo sharing.'
                    }
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-2 border-blue-200 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {language === 'is' ? 'Flokkar í viðbót' : 'Additional Categories'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'is' 
                      ? 'Bætum við þjónustuflokkum eftir eftirspurn.'
                      : 'Adding service categories based on demand.'
                    }
                  </p>
                </div>
                
                <div className="border-l-2 border-blue-200 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {language === 'is' ? 'Gæðaviðmið' : 'Quality Standards'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'is' 
                      ? 'Lágmarkseinkunn til að halda áfram á pallinum og handvaldir samstarfsaðilar í stærri verkum.'
                      : 'Minimum rating to continue on the platform and hand-picked partners for larger projects.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Values Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            {language === 'is' ? 'Gildi okkar' : 'Our Values'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Gagnsæi' : 'Transparency'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Skýr verð og skilmálar.' : 'Clear prices and terms.'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Traust' : 'Trust'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' 
                  ? 'Staðfest gögn, sýnilegar umsagnir og raunveruleg verk.'
                  : 'Verified data, visible reviews and real work.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Hraði' : 'Speed'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' 
                  ? 'Frá verkefni í tilboð á mínútum, ekki vikum.'
                  : 'From project to quote in minutes, not weeks.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Sanngirni' : 'Fairness'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' 
                  ? 'Jafnvægi milli verktaka og viðskiptavina.'
                  : 'Balance between contractors and customers.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            {language === 'is' ? 'Hvernig virkar þetta?' : 'How Does This Work?'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Lýstu verkefninu' : 'Describe the Project'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Myndir hjálpa.' : 'Photos help.'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Berðu saman tilboð' : 'Compare Quotes'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' 
                  ? 'Skoðaðu verð, tíma og umsagnir.'
                  : 'Review prices, time and reviews.'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Veldu og hefjið' : 'Choose and Start'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' 
                  ? 'Greiðsla og samskipti fara fram á öruggum vettvangi.'
                  : 'Payment and communication take place on a secure platform.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-8">
            {language === 'is' 
              ? 'Við birtum reglulega upplýsingar um fjölda innsendra verka, fjölda virkra verktaka og meðaleinkunn þjónustunnar.'
              : 'We regularly publish information about the number of submitted projects, number of active contractors and average service rating.'
            }
          </p>
          
          <a 
            href="/" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
          >
            {language === 'is' ? 'Byrjaðu verkefni' : 'Start a Project'}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
};

export default OurStoryPage;