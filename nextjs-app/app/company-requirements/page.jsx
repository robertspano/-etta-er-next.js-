'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../contexts/TranslationsContext';
import { CheckCircle, Shield } from 'lucide-react';

const CompanyRequirementsPage = () => {
  const { translations, language } = useTranslations();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {language === 'is' 
              ? 'Hvaða kröfur gerir BuildConnect til fyrirtækja á þjónustunni?' 
              : 'What requirements does BuildConnect have for companies on the service?'
            }
          </h1>
          
          {/* Introduction Text - Above Image */}
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            {language === 'is' 
              ? 'Þegar þú setur inn verkefni á BuildConnect geturðu treyst því að þú hittir aðeins á traust og löglegt fyrirtæki. Til að tryggja gæði og áreiðanleika setjum við skýrar kröfur til allra fyrirtækja sem skrá sig á þjónustuna.'
              : 'When you post a project on BuildConnect, you can trust that you will only encounter trustworthy and legal companies. To ensure quality and reliability, we set clear requirements for all companies that register on the service.'
            }
          </p>
          
          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src="https://customer-assets.emergentagent.com/job_craft-connect-11/artifacts/czdu1dn3_pexels-freestockpro-12932486.jpg"
              alt="Professional working on laptop" 
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Company Requirements Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' 
                  ? 'Fyrirtæki á BuildConnect verða að:' 
                  : 'Companies on BuildConnect must:'
                }
              </h2>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    {language === 'is' 
                      ? 'Vera skráð í fyrirtækjaskrá þegar viðskiptaskráning er nauðsynleg'
                      : 'Be registered in the company register when business registration is required'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    {language === 'is' 
                      ? 'Hafa öll leyfi og vottanir sem þarf til að reka starfsemina'
                      : 'Have all licenses and certifications required to operate the business'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    {language === 'is' 
                      ? 'Fylgja opinberum lögum og reglum um:'
                      : 'Follow public laws and regulations regarding:'
                    }
                  </span>
                </li>
              </ul>

              <div className="ml-8 space-y-2 mb-8">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    {language === 'is' ? 'Skil á skýrslum' : 'Submission of reports'}
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    {language === 'is' ? 'Greiðslu skatta og gjalda' : 'Payment of taxes and fees'}
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    {language === 'is' ? 'Rétta meðferð vinnuafls' : 'Proper treatment of workforce'}
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    {language === 'is' ? 'Heilbrigði, öryggi og umhverfi' : 'Health, safety and environment'}
                  </span>
                </div>
              </div>
            </section>

            {/* Large Projects Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' 
                  ? 'Stór verkefni krefjast aukinnar vöndunar' 
                  : 'Large projects require increased diligence'
                }
              </h2>
              <p className="leading-relaxed mb-6">
                {language === 'is' 
                  ? 'Fyrir stærri byggingar- og endurbótaverkefni býður BuildConnect upp á XL þjónustu. Þar gilda enn strangari kröfur, svo tryggt sé að aðeins traust og reynd fyrirtæki taki þátt í stærri verkefnum.'
                  : 'For larger construction and renovation projects, BuildConnect offers XL service. Even stricter requirements apply there, to ensure that only trusted and experienced companies participate in larger projects.'
                }
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {language === 'is' 
                  ? 'Fyrirtæki í BuildConnect XL þurfa að:' 
                  : 'Companies in BuildConnect XL must:'
                }
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    {language === 'is' 
                      ? 'Hafa að minnsta kosti 10 ára reynslu og vera skráð sem hlutafélag eða sambærilegt fyrirtækjaform'
                      : 'Have at least 10 years of experience and be registered as a limited company or equivalent corporate form'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    {language === 'is' 
                      ? 'Vera með VSK-skráningu og ábyrgðartryggingu'
                      : 'Have VAT registration and liability insurance'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    {language === 'is' 
                      ? 'Hafa gilt meistara- eða starfsleyfi (t.d. meistarabréf rafvirkja, samþykki frá rafmagnsverkta)'
                      : 'Have valid master\'s or work permits (e.g. electrician\'s master certificate, approval from electrical contractors)'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    {language === 'is' 
                      ? 'Standast lánshæfismat'
                      : 'Pass credit assessment'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    {language === 'is' 
                      ? 'Vera laus við alvarlegar kvartanir eða neikvæða dóma'
                      : 'Be free from serious complaints or negative judgments'
                    }
                  </span>
                </li>
              </ul>
            </section>

            {/* Non-Compliant Companies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' 
                  ? 'Hvað ef fyrirtæki uppfyllir ekki kröfurnar?' 
                  : 'What if companies do not meet the requirements?'
                }
              </h2>
              
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Fyrirtæki sem ekki fylgir reglum BuildConnect getur:'
                  : 'Companies that do not follow BuildConnect rules may:'
                }
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                  <span>
                    {language === 'is' 
                      ? 'Fengið hafnað áskrift'
                      : 'Be rejected subscription'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                  <span>
                    {language === 'is' 
                      ? 'Mist tilgang þjónustunnar'
                      : 'Lose access to the service'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                  <span>
                    {language === 'is' 
                      ? 'Orðið uppsagt úr samningi'
                      : 'Be terminated from the contract'
                    }
                  </span>
                </li>
              </ul>

              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Við áskiljum okkur rétt til að grípa til aðgerða gegn fyrirtækjum ef fram kemur neikvæð saga eða ef þau fylgja ekki íslenskum lögum og reglugerðum. Þannig tryggjum við að aðeins áreiðanleg fyrirtæki séu á BuildConnect.'
                  : 'We reserve the right to take action against companies if negative history emerges or if they do not comply with Icelandic laws and regulations. This way we ensure that only reliable companies are on BuildConnect.'
                }
              </p>
            </section>

            {/* Verified Identity Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' 
                  ? 'Öruggar þjónustur með staðfestri auðkenningu' 
                  : 'Secure services with verified identity'
                }
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Til að tryggja öryggi notenda framkvæmum við ítarlega auðkenningastöðlun á fyrirtækjum. Með þessu tryggjum við að aðeins alvöru aðilar standi að baki skráningum og að þú getir treyst því að fyrirtækið sem þú velur sé traust samstarfsaðili.'
                  : 'To ensure user security, we carry out detailed identity verification of companies. With this we ensure that only genuine parties are behind registrations and that you can trust that the company you choose is a reliable partner.'
                }
              </p>
            </section>

            {/* Documentation Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' 
                  ? 'Fáðu öll verkefni skjalfest í Fasteignamöppu' 
                  : 'Get all projects documented in Property Folder'
                }
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Allt sem tengist verkefninu þínu er hægt að vista á einum stað í Fasteignamöppu BuildConnect. Þar getur þú geymt samninga, ábyrgðir, reikninga og önnur mikilvæg skjöl sem tengjast framkvæmdum og viðhaldi. Þetta auðveldar yfirsýn, tryggir skjalavistun og sparar bæði tíma og fyrirhöfn.'
                  : 'Everything related to your project can be saved in one place in BuildConnect\'s Property Folder. There you can store contracts, warranties, invoices and other important documents related to construction and maintenance. This facilitates overview, ensures document storage and saves both time and effort.'
                }
              </p>
            </section>

            {/* Why Choose BuildConnect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' 
                  ? 'Af hverju að velja BuildConnect?' 
                  : 'Why choose BuildConnect?'
                }
              </h2>
              
              <ul className="space-y-3 mb-6">
                {language === 'is' ? (
                  <>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Öryggi og traust fyrirtæki</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Staðfest auðkenning allra aðila</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Skýr og gagnsæ skráning á kröfum</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Skjöl og samningar á einum stað</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Strangari staðlar fyrir stærri verkefni</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Security and trusted companies</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Verified identity of all parties</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Clear and transparent registration requirements</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Documents and contracts in one place</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span>Stricter standards for larger projects</span>
                    </li>
                  </>
                )}
              </ul>
              
              <p className="leading-relaxed font-medium text-gray-900">
                {language === 'is' 
                  ? 'BuildConnect tryggir að þú getir treyst þjónustunni – hvort sem um er að ræða lítið viðhald eða stórt byggingarverkefni.'
                  : 'BuildConnect ensures that you can trust the service – whether it\'s small maintenance or a large construction project.'
                }
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRequirementsPage;