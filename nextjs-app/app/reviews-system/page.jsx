'use client';

import { useTranslations } from '../../contexts/TranslationsContext';

const ReviewsSystemPage = () => {
  const { language, translations } = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {language === 'is' 
              ? 'Umsagnir á verki' 
              : 'Reviews on verki'
            }
          </h1>
          
          {/* Introduction Text - Above Image */}
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            {language === 'is' 
              ? 'Umsagnir hjálpa þér að velja rétt fyrirtæki. Þær gefa góða innsýn í fyrri reynslu annarra viðskiptavina og gera þér kleift að taka örugga ákvörðun. Til að tryggja að umsagnir séu traustar og áreiðanlegar höfum við þróað strangar reglur og kerfi sem tryggja gæði þeirra.'
              : 'Reviews help you choose the right company. They provide good insight into the previous experience of other customers and enable you to make a safe decision. To ensure that reviews are trustworthy and reliable, we have developed strict rules and systems that guarantee their quality.'
            }
          </p>
          
          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src="https://customer-assets.emergentagent.com/job_craft-connect-11/artifacts/czdu1dn3_pexels-freestockpro-12932486.jpg"
              alt="verki mobile app showing reviews" 
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none space-y-8">
            
            {/* How Reviews Work */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Hvernig virka umsagnir' : 'How reviews work'}
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  {language === 'is' 
                    ? 'Eftir að verkefni er lokið fá viðskiptavinir tækifæri til að skrifa umsögn um þjónustuna. Þessi ferli tryggir að aðeins þeir sem hafa í raun notað þjónustuna geti gefið umsagnir.'
                    : 'After a project is completed, customers get the opportunity to write a review about the service. This process ensures that only those who have actually used the service can give reviews.'
                  }
                </p>
                <p className="leading-relaxed">
                  {language === 'is' 
                    ? 'Við setjum mikla áherslu á að umsagnir séu sanngjarnar og gagnlegar fyrir aðra notendur þjónustunnar.'
                    : 'We place great emphasis on making reviews fair and useful for other users of the service.'
                  }
                </p>
              </div>
            </section>

            {/* Trust and Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Traust og öryggi' : 'Trust and security'}
              </h2>
              <p className="leading-relaxed">
                {language === 'is' 
                  ? 'Allar umsagnir á verki koma frá raunverulegum viðskiptavinum sem hafa lokið verki í gegnum þjónustuna. Við staðfestum þær með auðkenningu og sérstökum öryggiskerfum sem tryggja að aðeins heiðarlegar umsagnir birtist.'
                  : 'All reviews on verki come from real customers who have completed work through the service. We verify them with authentication and special security systems that ensure only honest reviews are published.'
                }
              </p>
            </section>

            {/* Fair Reviews */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Sanngjarnar umsagnir fyrir alla' : 'Fair reviews for everyone'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {language === 'is' ? 'Fyrir viðskiptavini' : 'For customers'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {language === 'is' 
                        ? 'Lesið raungjarnar umsagnir frá öðrum viðskiptavinum'
                        : 'Read genuine reviews from other customers'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {language === 'is' 
                        ? 'Fáið innsýn í gæði þjónustunnar'
                        : 'Get insight into the quality of service'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {language === 'is' 
                        ? 'Takið upplýstar ákvarðanir'
                        : 'Make informed decisions'
                      }
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {language === 'is' ? 'Fyrir fyrirtæki' : 'For companies'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {language === 'is' 
                        ? 'Byggið upp traust og orðspor'
                        : 'Build trust and reputation'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {language === 'is' 
                        ? 'Sýnið fram á gæði þjónustunnar'
                        : 'Demonstrate service quality'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {language === 'is' 
                        ? 'Fáið aðgang að fleiri verkefnum'
                        : 'Get access to more projects'
                      }
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Review Guidelines */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Leiðbeiningar fyrir umsagnir' : 'Review guidelines'}
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">1.</span>
                    <span>
                      {language === 'is' 
                        ? 'Þú getur aðeins skrifað umsögn um verkefni sem hefur verið klárað í gegnum verki.'
                        : 'You can only write a review about a project that has been completed through verki.'
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">2.</span>
                    <span>
                      {language === 'is' 
                        ? 'Umsagnir þurfa að vera heiðarlegar og byggðar á raunverulegri reynslu.'
                        : 'Reviews must be honest and based on real experience.'
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">3.</span>
                    <span>
                      {language === 'is' 
                        ? 'Við viljum heyra bæði það sem gekk vel og það sem mætti bæta.'
                        : 'We want to hear both what went well and what could be improved.'
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">4.</span>
                    <span>
                      {language === 'is' 
                        ? 'Umsagnir mega ekki innihalda óviðeigandi tungumál eða persónuárásir.'
                        : 'Reviews must not contain inappropriate language or personal attacks.'
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">5.</span>
                    <span>
                      {language === 'is' 
                        ? 'Við fáráðleggjum að þú gefir ítarlegar umsagnir sem hjálpa öðrum.'
                        : 'We encourage you to give detailed reviews that help others.'
                      }
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Þín rödd skiptir máli' : 'Your voice matters'}
              </h2>
              <p className="leading-relaxed text-lg">
                {language === 'is' 
                  ? 'Þín umsögn skiptir miklu máli – hún hjálpar öðrum að velja réttan fagmann og stuðlar að því að verki sé örugg og áreiðanleg þjónusta fyrir alla.'
                  : 'Your review matters a lot – it helps others choose the right professional and contributes to verki being a safe and reliable service for everyone.'
                }
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSystemPage;