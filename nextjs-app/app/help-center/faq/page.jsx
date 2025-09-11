'use client';

import React, { useState } from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';
import { 
  ArrowLeft, HelpCircle, ChevronDown, ChevronUp,
  DollarSign, FileText, Shield, MessageCircle, 
  CheckCircle, Mail
} from 'lucide-react';

const FAQPage = () => {
  const { language, translations } = useTranslations();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: language === 'is' ? 'Hvað kostar að nota Verki?' : 'What does it cost to use Verki?',
      answer: language === 'is' 
        ? 'Að setja inn verk er án skuldbindingar. Þjónustugjöld geta átt við eftir þeirri þjónustu sem valin er.'
        : 'Submitting projects is without obligation. Service fees may apply based on the service chosen.',
      icon: <DollarSign className="w-6 h-6" />,
      category: language === 'is' ? 'Kostnaður' : 'Cost'
    },
    {
      question: language === 'is' ? 'Hve mörg tilboð fæ ég?' : 'How many quotes do I get?',
      answer: language === 'is' 
        ? 'Yfirleitt tvö til fimm, eftir svæði og tegund verks.'
        : 'Usually two to five, depending on area and type of work.',
      icon: <FileText className="w-6 h-6" />,
      category: language === 'is' ? 'Tilboð' : 'Quotes'
    },
    {
      question: language === 'is' ? 'Er ég skuldbundinn þegar ég set inn verk?' : 'Am I committed when I submit a project?',
      answer: language === 'is' 
        ? 'Nei. Þú velur aðeins ef tilboð hentar.'
        : 'No. You only choose if the quote suits you.',
      icon: <CheckCircle className="w-6 h-6" />,
      category: language === 'is' ? 'Skuldbinding' : 'Commitment'
    },
    {
      question: language === 'is' ? 'Má breyta verkbeiðni eftir birtingu?' : 'Can I change the project request after publishing?',
      answer: language === 'is' 
        ? 'Já, en hafðu samband við verktaka og upplýstu um breytingar.'
        : 'Yes, but contact contractors and inform them about changes.',
      icon: <FileText className="w-6 h-6" />,
      category: language === 'is' ? 'Breytingar' : 'Changes'
    },
    {
      question: language === 'is' ? 'Hver sér gögnin mín?' : 'Who sees my data?',
      answer: language === 'is' 
        ? 'Verktakar sem sækja um verkefnið og þjónustuteymi þegar þörf krefur. Við vinnum eftir persónuverndarreglum.'
        : 'Contractors who apply for the project and service team when needed. We follow privacy regulations.',
      icon: <Shield className="w-6 h-6" />,
      category: language === 'is' ? 'Persónuvernd' : 'Privacy'
    },
    {
      question: language === 'is' ? 'Hvernig loka ég verki?' : 'How do I close a project?',
      answer: language === 'is' 
        ? 'Staðfestu verklok, ljúktu greiðslum samkvæmt samningi og haltu utan um skjöl og kvittanir.'
        : 'Confirm project completion, finish payments according to contract and keep documents and receipts.',
      icon: <CheckCircle className="w-6 h-6" />,
      category: language === 'is' ? 'Verklok' : 'Completion'
    },
    {
      question: language === 'is' ? 'Hvernig fæ ég aðstoð?' : 'How do I get help?',
      answer: language === 'is' 
        ? 'Hafðu samband í netspjalli eða með tölvupósti. Við svörum eins fljótt og auðið er á auglýstum þjónustutíma.'
        : 'Contact us via chat or email. We respond as quickly as possible during advertised service hours.',
      icon: <MessageCircle className="w-6 h-6" />,
      category: language === 'is' ? 'Þjónusta' : 'Support'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Back Navigation */}
        <div className="mb-8">
          <a 
            href="/help-center" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'is' ? 'Til baka í hjálparmiðstöð' : 'Back to Help Center'}
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' ? 'Algengar spurningar' : 'Frequently Asked Questions'}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {language === 'is' 
              ? 'Hér finnur þú svör við algengum spurningum um notkun Verki. Ef þú finnur ekki svarið við spurningunni þinni, hafðu samband við okkur.'
              : 'Here you will find answers to common questions about using Verki. If you can\'t find the answer to your question, contact us.'
            }
          </p>

          {/* Quick Search Info */}
          <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-indigo-700 font-medium">
              {language === 'is' 
                ? '💡 Ábending: Smelltu á spurningu til að sjá svarið'
                : '💡 Tip: Click on a question to see the answer'
              }
            </p>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 text-center border border-gray-100">
              <div className="text-sm font-medium text-gray-700">{category}</div>
              <div className="text-xs text-gray-500 mt-1">
                {faqs.filter(faq => faq.category === category).length} {language === 'is' ? 'spurningar' : 'questions'}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center flex-1">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <div className="text-indigo-600">
                      {faq.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {faq.question}
                    </h3>
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded">
                      {faq.category}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="pl-16">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Fannst þú ekki svarið?' : 'Didn\'t Find the Answer?'}
          </h2>
          
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {language === 'is' 
              ? 'Ekkert mál! Þjónustuteymi okkar er tilbúið að hjálpa þér með hvað sem er.'
              : 'No problem! Our support team is ready to help you with anything.'
            }
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a 
              href="mailto:verki@verki.is" 
              className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-3" />
              verki@verki.is
            </a>
            <div className="bg-white bg-opacity-20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="w-5 h-5 mr-3" />
              {language === 'is' ? 'Netspjall (bráðum)' : 'Live Chat (Soon)'}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm opacity-75">
              {language === 'is' 
                ? 'Þjónustutími: 9:00 - 17:00 á virkum dögum'
                : 'Support hours: 9:00 - 17:00 on weekdays'
              }
            </p>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {language === 'is' ? 'Aðrar gagnlegar síður' : 'Other Helpful Pages'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href="/help-center/how-it-works" 
              className="group bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Hvernig virkar Verki' : 'How Verki Works'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Lærðu grunnin' : 'Learn the basics'}
              </p>
            </a>
            
            <a 
              href="/help-center/project-requests" 
              className="group bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <HelpCircle className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Góðar verkbeiðnir' : 'Good Project Requests'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Fáðu betri tilboð' : 'Get better quotes'}
              </p>
            </a>
            
            <a 
              href="/help-center/security-quality" 
              className="group bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Öryggi og gæði' : 'Security and Quality'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Tryggi þig' : 'Protect yourself'}
              </p>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQPage;