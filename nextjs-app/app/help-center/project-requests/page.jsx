'use client';

import React from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';
import { 
  ArrowLeft, FileText, Info, Camera, 
  MapPin, CheckCircle, Lightbulb, 
  Target, Clock, DollarSign
} from 'lucide-react';

const ProjectRequestsPage = () => {
  const { language, translations } = useTranslations();

  const requestSections = [
    {
      title: language === 'is' ? 'Grunnupplýsingar' : 'Basic Information',
      description: language === 'is' 
        ? 'Segðu nákvæmlega hvað á að gera, hvar og hvenær. Tilgreindu hvort til standi að útvega efni eða aðeins vinnu.'
        : 'Say exactly what needs to be done, where and when. Specify whether materials are to be provided or just labor.',
      icon: <Info className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      tips: [
        language === 'is' ? 'Vertu nákvæm/ur um staðsetningu' : 'Be precise about location',
        language === 'is' ? 'Tilgreindu tímaramma' : 'Specify timeframe',
        language === 'is' ? 'Skýrðu hvort efni fylgir' : 'Clarify if materials are included'
      ]
    },
    {
      title: language === 'is' ? 'Mælingar og myndir' : 'Measurements and Photos',
      description: language === 'is' 
        ? 'Settu inn flatarmál, lengdir og hæðir þegar það á við. Myndir af núverandi ástandi spara tíma og minnka óvissu.'
        : 'Enter area, lengths and heights when applicable. Photos of current condition save time and reduce uncertainty.',
      icon: <Camera className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      tips: [
        language === 'is' ? 'Taktu myndir af öllu svæðinu' : 'Take photos of entire area',
        language === 'is' ? 'Mældu nákvæmlega' : 'Measure accurately',
        language === 'is' ? 'Sýndu núverandi ástand' : 'Show current condition'
      ]
    },
    {
      title: language === 'is' ? 'Aðstæður á staðnum' : 'Site Conditions',
      description: language === 'is' 
        ? 'Lýstu aðgengi, bílastæðum, reglum um hávaða og ryki og hvort rafmagn og vatn séu aðgengileg. Nefndu sérstakar kröfur um frágang og efnisval.'
        : 'Describe access, parking, noise and dust rules and whether electricity and water are available. Mention special requirements for finishing and material selection.',
      icon: <MapPin className="w-8 h-8" />,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      tips: [
        language === 'is' ? 'Lýstu aðgengi og bílastæðum' : 'Describe access and parking',
        language === 'is' ? 'Nefndu takmarkanir' : 'Mention limitations',
        language === 'is' ? 'Tilgreindu sérstök skilyrði' : 'Specify special conditions'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Back Navigation */}
        <div className="mb-8">
          <a 
            href="/help-center" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'is' ? 'Til baka í hjálparmiðstöð' : 'Back to Help Center'}
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' ? 'Hvernig skrifa ég góða verkbeiðni' : 'How to Write a Good Project Request'}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {language === 'is' 
              ? 'Góð verkbeiðni skilar betri tilboðum. Því skýrari sem þú ert, því nákvæmari verða tilboðin sem þú færð.'
              : 'A good project request results in better quotes. The clearer you are, the more accurate the quotes you receive will be.'
            }
          </p>

          {/* Success Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? '40% fleiri tilboð' : '40% More Quotes'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Með góðri lýsingu' : 'With good description'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? '2x hraðari' : '2x Faster'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Svörun frá verktökum' : 'Response from contractors'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Nákvæmara verð' : 'More Accurate Price'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Færri óvæntar aukakostnaður' : 'Fewer unexpected extra costs'}
              </p>
            </div>
          </div>
        </div>

        {/* Request Sections */}
        <div className="space-y-8 mb-16">
          {requestSections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
              <div className="md:flex">
                {/* Left Side - Icon */}
                <div className={`${section.bgColor} p-8 md:w-80 flex flex-col items-center justify-center relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-30 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${section.color} rounded-full flex items-center justify-center mb-4 text-white shadow-lg`}>
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                </div>
                
                {/* Right Side - Content */}
                <div className="flex-1 p-8">
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {section.description}
                  </p>
                  
                  <h5 className="font-semibold text-gray-900 mb-3">
                    {language === 'is' ? 'Mikilvæg atriði:' : 'Important Points:'}
                  </h5>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Example Section */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8 mb-16 border border-indigo-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'is' ? 'Dæmi um skýra lýsingu' : 'Example of Clear Description'}
            </h2>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <p className="text-gray-800 leading-relaxed italic">
              {language === 'is' 
                ? '"Mála stofu, tuttugu og tveggja fermetra gólf, tveir gluggar og ein hurð. Grunna vegg þar sem blettir eru og mála tvö strók. Verkið má hefjast eftir tíunda október og klárast á einni viku. Vinsamlegast bjóðið bæði með efni og án efnis."'
                : '"Paint living room, twenty-two square meter floor, two windows and one door. Prime wall where stains are and paint two coats. Work may begin after October 10th and complete in one week. Please quote both with and without materials."'
              }
            </p>
          </div>
          
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="flex items-center text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">
                {language === 'is' ? 'Nákvæm stærð' : 'Precise size'}
              </span>
            </div>
            <div className="flex items-center text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">
                {language === 'is' ? 'Skýr tímasetning' : 'Clear timing'}
              </span>
            </div>
            <div className="flex items-center text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">
                {language === 'is' ? 'Efnisvalkostir' : 'Material options'}
              </span>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <Target className="w-5 h-5 text-yellow-600" />
            </div>
            {language === 'is' ? 'Bestu venjur' : 'Best Practices'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {language === 'is' ? 'Gerðu þetta:' : 'Do This:'}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {language === 'is' 
                    ? 'Vertu nákvæm/ur um mál og stærðir'
                    : 'Be precise about measurements and sizes'
                  }
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {language === 'is' 
                    ? 'Bættu við gömlum myndum'
                    : 'Add photos of current state'
                  }
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {language === 'is' 
                    ? 'Tilgreindu tímaramma'
                    : 'Specify timeframe'
                  }
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {language === 'is' 
                    ? 'Lýstu aðgengi og takmörkunum'
                    : 'Describe access and limitations'
                  }
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                {language === 'is' ? 'Forðastu þetta:' : 'Avoid This:'}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {language === 'is' 
                    ? 'Óljósar lýsingar eins og "stór" eða "lítill"'
                    : 'Vague descriptions like "big" or "small"'
                  }
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {language === 'is' 
                    ? 'Að gleyma að nefna takmarkanir'
                    : 'Forgetting to mention limitations'
                  }
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {language === 'is' 
                    ? 'Að biðja um "eitthvað í þá áttina"'
                    : 'Asking for "something like that"'
                  }
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {language === 'is' 
                    ? 'Óskýr tímasetning'
                    : 'Unclear timing'
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Tilbúinn/n að skrifa góða verkbeiðni?' : 'Ready to Write a Good Project Request?'}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {language === 'is' 
              ? 'Notaðu þessa ráð til að skrifa verkbeiðni sem skilar betri tilboðum.'
              : 'Use these tips to write a project request that results in better quotes.'
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

export default ProjectRequestsPage;