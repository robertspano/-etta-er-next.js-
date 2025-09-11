'use client';

import React from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';
import { 
  ArrowLeft, AlertTriangle, MessageCircle, Camera, 
  Clock, DollarSign, HelpCircle, AlertCircle,
  CheckCircle, Phone, FileText
} from 'lucide-react';

const TroubleshootingPage = () => {
  const { language, translations } = useTranslations();

  const troubleshootingSteps = [
    {
      number: 1,
      title: language === 'is' ? 'Hafðu strax samband við verktaka' : 'Contact Contractor Immediately',
      description: language === 'is' 
        ? 'Lýstu vandanum skýrt og biðjið um sameiginlega lausn og uppfærða tímaáætlun ef þarf.'
        : 'Describe the problem clearly and ask for a joint solution and updated timeline if needed.',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      tips: [
        language === 'is' ? 'Vertu kurteisi en skýr/skýr' : 'Be polite but clear',
        language === 'is' ? 'Lýstu vandanum nákvæmlega' : 'Describe the problem precisely',
        language === 'is' ? 'Biddu um tímaáætlun fyrir viðgerð' : 'Ask for repair timeline'
      ]
    },
    {
      number: 2,
      title: language === 'is' ? 'Skjalfestu vandann' : 'Document the Problem',
      description: language === 'is' 
        ? 'Taktu myndir, skráðu dagsetningar og það sem var samið um. Geymdu samskipti á einum stað.'
        : 'Take photos, record dates and what was agreed upon. Keep communications in one place.',
      icon: <Camera className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      tips: [
        language === 'is' ? 'Taktu myndir af vandanum' : 'Take photos of the problem',
        language === 'is' ? 'Skráðu dagsetningar og tíma' : 'Record dates and times',
        language === 'is' ? 'Geymdu öll samskipti' : 'Keep all communications'
      ]
    },
    {
      number: 3,
      title: language === 'is' ? 'Réttur til úrbóta' : 'Right to Remedies',
      description: language === 'is' 
        ? 'Veittu sanngjarna leiðréttingarfresti áður en gripið er til annarra úrræða.'
        : 'Allow reasonable correction time before resorting to other measures.',
      icon: <Clock className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      tips: [
        language === 'is' ? 'Gefðu sanngjarn tíma til viðgerðar' : 'Allow reasonable time for repair',
        language === 'is' ? 'Settu skýra fresti' : 'Set clear deadlines',
        language === 'is' ? 'Skjalfestu allar breytingar' : 'Document all changes'
      ]
    },
    {
      number: 4,
      title: language === 'is' ? 'Endurgreiðslur og afslættir' : 'Refunds and Discounts',
      description: language === 'is' 
        ? 'Ræðið sanngjarna úrlausn miðað við umfang frávika og það sem samið var um.'
        : 'Discuss fair resolution based on scope of deviations and what was agreed upon.',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-purple-500 to-violet-500',
      tips: [
        language === 'is' ? 'Miðaðu við upphaflegan samning' : 'Base on original contract',
        language === 'is' ? 'Vertu sanngjarn/sanngjörn' : 'Be fair',
        language === 'is' ? 'Leitaðu skriflegrar staðfestingar' : 'Seek written confirmation'
      ]
    },
    {
      number: 5,
      title: language === 'is' ? 'Leita aðstoðar' : 'Seek Help',
      description: language === 'is' 
        ? 'Ef málið leysist ekki með samtali getur þjónustuteymi leiðbeint og miðlað upplýsingum. Vísaðu í samning og lögbundin úrræði ef þörf krefur.'
        : 'If the matter is not resolved through conversation, the service team can guide and mediate information. Refer to contract and legal remedies if necessary.',
      icon: <HelpCircle className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-600',
      tips: [
        language === 'is' ? 'Hafðu samband við þjónustuteymi' : 'Contact service team',
        language === 'is' ? 'Skoðaðu samninginn þinn' : 'Review your contract',
        language === 'is' ? 'Leitaðu lögfræðiráðgjafar ef þarf' : 'Seek legal advice if needed'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Back Navigation */}
        <div className="mb-8">
          <a 
            href="/help-center" 
            className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'is' ? 'Til baka í hjálparmiðstöð' : 'Back to Help Center'}
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' ? 'Hvað ef eitthvað fer úrskeiðis' : 'What If Something Goes Wrong'}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {language === 'is' 
              ? 'Þó að flest verkefni gangi vel, geta stundum komið upp vandamál. Hér eru skref til að leysa málið á fyrirmælabundinn hátt.'
              : 'Although most projects go well, problems can sometimes arise. Here are steps to resolve the issue in a systematic manner.'
            }
          </p>

          {/* Warning Banner */}
          <div className="bg-orange-100 border border-orange-300 rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-orange-600 mr-4" />
              <h2 className="text-xl font-bold text-orange-800">
                {language === 'is' ? 'Mikilvægt' : 'Important'}
              </h2>
            </div>
            <p className="text-orange-700 leading-relaxed">
              {language === 'is' 
                ? 'Ekki greiða utan samkomulags án skriflegrar staðfestingar. Forðastu óskýrar munnlegar breytingar á umfangi.'
                : 'Do not pay outside the agreement without written confirmation. Avoid unclear verbal changes to scope.'
              }
            </p>
          </div>
        </div>

        {/* Troubleshooting Steps */}
        <div className="space-y-12 mb-16">
          {troubleshootingSteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < troubleshootingSteps.length - 1 && (
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
                      <h3 className="text-xl font-bold">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Right Side - Content */}
                  <div className="flex-1 p-8">
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {step.description}
                    </p>
                    
                    <h5 className="font-semibold text-gray-900 mb-3">
                      {language === 'is' ? 'Ráð:' : 'Tips:'}
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

        {/* Emergency Contact Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu bráða aðstoð?' : 'Need Immediate Help?'}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {language === 'is' 
              ? 'Ef um alvarlegt vandamál er að ræða eða þú þarft tafarlausa aðstoð, hafðu samband við okkur strax.'
              : 'If it\'s a serious problem or you need immediate assistance, contact us right away.'
            }
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a 
              href="mailto:verki@verki.is" 
              className="bg-white text-red-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg flex items-center justify-center"
            >
              <FileText className="w-5 h-5 mr-3" />
              verki@verki.is
            </a>
            <a 
              href="tel:7877887" 
              className="bg-white bg-opacity-20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-opacity-30 transition-colors duration-200 backdrop-blur-sm flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-3" />
              787 7887
            </a>
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            {language === 'is' ? 'Hvernig á að koma í veg fyrir vandamál' : 'How to Prevent Problems'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Skýr samskipti' : 'Clear Communication'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is' 
                  ? 'Hafðu allt skriflegt og vertu skýr/skýr um væntingar þínar.'
                  : 'Have everything in writing and be clear about your expectations.'
                }
              </p>
            </div>
            
            <div className="border-l-4 border-green-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Reglulegar skoðanir' : 'Regular Inspections'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is' 
                  ? 'Fylgstu með framvindu verksins og talaðu við verktaka reglulega.'
                  : 'Monitor work progress and talk to contractor regularly.'
                }
              </p>
            </div>
            
            <div className="border-l-4 border-purple-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Áfangagreiðslur' : 'Milestone Payments'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is' 
                  ? 'Greiddu aldrei allt fyrirfram, notaðu áfangagreiðslur.'
                  : 'Never pay everything upfront, use milestone payments.'
                }
              </p>
            </div>
            
            <div className="border-l-4 border-orange-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Góð skjöl' : 'Good Documentation'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is' 
                  ? 'Geymdu öll samskipti, myndir og kvittanir á einum stað.'
                  : 'Keep all communications, photos and receipts in one place.'
                }
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TroubleshootingPage;