'use client';

import { useTranslations } from '../../contexts/TranslationsContext';

const HowItWorksDetailedPage = () => {
  const { language, translations } = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' ? 'Finndu hæfa fagmenn á verki' : 'Find qualified professionals on verki'}
          </h1>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {language === 'is' 
              ? 'verki gefur þér tækifæri til að finna hæfa handverksmenn og fyrirtæki innan margra sérsviða. Hvort sem þú þarft að endurnýja baðherbergið, gera upp eldhúsið eða ráðast í stærra verkefni tryggir verki að þú fáir tilboð frá viðeigandi og reyndum fagmönnum – bæði fyrir stór og smá verkefni.'
              : 'verki gives you the opportunity to find qualified craftsmen and companies within many specialties. Whether you need to renovate the bathroom, renovate the kitchen or embark on a larger project, verki ensures that you get quotes from relevant and experienced professionals - for both large and small projects.'
              }
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src="https://customer-assets.emergentagent.com/job_craft-connect-11/artifacts/czdu1dn3_pexels-freestockpro-12932486.jpg" 
              alt={language === 'is' ? 'Verkamenn að vinna' : 'Workers at construction site'}
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Get Multiple Quotes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Fáðu mörg tilboð og berðu saman' : 'Get multiple quotes and compare'}
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Einn af stærstu kostum verki er að þú getur fengið tilboð frá mismunandi fyrirtækjum fyrir verkefnið þitt. Þannig verður auðveldara að bera saman verð, kjör og umsagnir áður en ákvörðun er tekin. Ef þú ert óviss um hvaða fyrirtæki hentar best, þá hjálpar verki þér að komast í samband við réttu aðilana.'
                  : 'One of the biggest advantages of verki is that you can get quotes from different companies for your project. This makes it easier to compare prices, terms and reviews before making a decision. If you are unsure about which company is best suited, verki helps you get in touch with the right parties.'
                }
              </p>
            </section>

            {/* Contact Individual Companies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Hafðu samband við einstök fyrirtæki' : 'Contact individual companies'}
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Ef þú ert þegar með hug á tilteknu fyrirtæki eða hefur fengið góða reynslu áður, getur þú haft samband beint við það í gegnum verki. Þú getur líka fundið fyrirtæki með leit og fengið tilboð beint frá þeim sem henta verkefninu best.'
                  : 'If you already have a specific company in mind or have had good experience before, you can contact it directly through verki. You can also find companies by searching and get quotes directly from those that best suit the project.'
                }
              </p>
            </section>

            {/* Choose Right Company */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Veldu rétta fyrirtækið' : 'Choose the right company'}
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Áður en þú tekur ákvörðun geturðu skoðað prófíla fyrirtækjanna, lesið umsagnir frá fyrri viðskiptavinum og séð myndir af unnum verkum. Þannig færðu góða innsýn í gæði og reynslu fyrirtækisins og getur tekið upplýsta ákvörðun.'
                  : 'Before making a decision, you can view company profiles, read reviews from previous customers, and see pictures of completed work. This gives you good insight into the quality and experience of the company and allows you to make an informed decision.'
                }
              </p>
            </section>

            {/* Reviews Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Umsagnir gefa þér öryggi' : 'Reviews give you security'}
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Allar umsagnir í verki eru staðfestar frá raunverulegum notendum. Þær hjálpa þér að velja rétta fyrirtækið og tryggja að ákvörðunin byggi á traustum grunni.'
                  : 'All reviews in verki are verified from real users. They help you choose the right company and ensure that the decision is based on a solid foundation.'
                }
              </p>
            </section>

            {/* Contracts Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Samningar tryggja gott samstarf' : 'Contracts ensure good cooperation'}
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Þegar þú hefur valið fyrirtækið eða handverksmanninn sem hentar best fyrir verkefnið þitt, geturðu gert formlegan samning beint í gegnum verki. Það tryggir skýra verkáætlun, tímamörk og verð – sem eykur öryggi og dregur úr misskilningi.'
                  : 'When you have chosen the company or craftsman that best suits your project, you can make a formal contract directly through verki. This ensures clear work schedules, deadlines and prices - which increases security and reduces misunderstandings.'
                }
              </p>
            </section>

            {/* Larger Projects */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Aðstoð með stærri verkefni' : 'Help with larger projects'}
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Byggir þú á stærra verkefni? Með verki XL þjónustunni færðu sérstaka aðstoð við að finna réttu fyrirtækin, fá tilboð og fylgja verkefninu eftir frá A til Ö.'
                  : 'Are you building on a larger project? With the verki XL service, you get special assistance in finding the right companies, getting quotes and following the project from A to Z.'
                }
              </p>
            </section>

            {/* Documentation */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Verkefnaskjöl á einum stað' : 'Project documents in one place'}
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'Með verki geturðu vistað öll nauðsynleg skjöl – samninga, ábyrgðir og lokareikninga – á einum stað. Þannig heldurðu auðveldlega utan um verkefnið og tryggir góða yfirsýn frá upphafi til enda.'
                  : 'With verki you can store all necessary documents – contracts, warranties and final invoices – in one place. This way you easily keep track of the project and ensure good overview from start to finish.'
                }
              </p>
            </section>

            {/* Why verki */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'is' ? 'Af hverju verki?' : 'Why verki?'}
              </h2>
              <p className="leading-relaxed mb-4">
                {language === 'is' 
                  ? 'verki sameinar alla þessa kosti á einum stað:'
                  : 'verki combines all these benefits in one place:'
                }
              </p>
              
              <ul className="list-disc list-inside space-y-3 ml-4">
                {language === 'is' ? (
                  <>
                    <li>Aðgang að hæfum fagmönnum</li>
                    <li>Margar tilboðstilraunir sem auðvelda samanburð</li>
                    <li>Staðfestar umsagnir notenda</li>
                    <li>Skjalageymslu sem tryggir yfirsýn</li>
                    <li>Öryggi í gegnum formlega samninga</li>
                  </>
                ) : (
                  <>
                    <li>Access to qualified professionals</li>
                    <li>Multiple quote attempts that facilitate comparison</li>
                    <li>Verified user reviews</li>
                    <li>Document storage that ensures overview</li>
                    <li>Security through formal contracts</li>
                  </>
                )}
              </ul>
              
              <p className="leading-relaxed mt-6 font-medium text-gray-900">
                {language === 'is' 
                  ? 'Hraðvirkt, einfalt og öruggt – þess vegna velja þúsundir að nota verki.'
                  : 'Fast, simple and secure – that\'s why thousands choose to use verki.'
                }
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksDetailedPage;