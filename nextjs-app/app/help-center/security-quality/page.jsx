'use client';

import React from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';
import { 
  ArrowLeft, Shield, User, Eye, CreditCard, 
  Lock, Award, CheckCircle, Users, FileText
} from 'lucide-react';

const SecurityQualityPage = () => {
  const { language, translations } = useTranslations();

  const securityFeatures = [
    {
      title: language === 'is' ? 'Auðkenni og bakgrunnur' : 'Identity and Background',
      description: language === 'is' 
        ? 'Verktakar skrá fyrirtækjaupplýsingar og tengiliði. Við hvetjum til birtingar á vottunum og tryggingum á prófílsíðu.'
        : 'Contractors register company information and contacts. We encourage displaying certifications and insurance on profile pages.',
      icon: <User className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: language === 'is' ? 'Gagnsæi' : 'Transparency',
      description: language === 'is' 
        ? 'Skilmálar, verð og tímalínur skulu vera skýrar áður en vinna hefst. Verklýsing og samkomulag eru varðveitt á einum stað til að draga úr misskilningi.'
        : 'Terms, prices and timelines should be clear before work begins. Job description and agreement are kept in one place to reduce misunderstandings.',
      icon: <Eye className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      title: language === 'is' ? 'Greiðsluöryggi' : 'Payment Security',
      description: language === 'is' 
        ? 'Haltu öllum samþykktum skilmálum skriflegum. Notaðu áfangagreiðslur til að draga úr áhættu. Geymdu kvittanir og samskipti á einum stað.'
        : 'Keep all agreed terms in writing. Use milestone payments to reduce risk. Keep receipts and communications in one place.',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: language === 'is' ? 'Persónuvernd' : 'Privacy',
      description: language === 'is' 
        ? 'Gögn eru aðeins sýnileg þeim verktökum sem sækja um verkið og þjónustuteymi þegar þörf krefur. Við fylgjum gildandi persónuverndarreglum.'
        : 'Data is only visible to contractors who apply for the project and service team when needed. We follow applicable privacy regulations.',
      icon: <Lock className="w-8 h-8" />,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: language === 'is' ? 'Gæðaviðmið' : 'Quality Standards',
      description: language === 'is' 
        ? 'Verktakar þurfa að halda lágmarkskröfum og geta verið stöðvaðir eða fjarlægðir við endurtekin frávik.'
        : 'Contractors must maintain minimum requirements and can be suspended or removed for repeated violations.',
      icon: <Award className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Back Navigation */}
        <div className="mb-8">
          <a 
            href="/help-center" 
            className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'is' ? 'Til baka í hjálparmiðstöð' : 'Back to Help Center'}
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' ? 'Öryggi og gæðatrygging' : 'Security and Quality Assurance'}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {language === 'is' 
              ? 'Við leggjum áherslu á öryggi, gagnsæi og gæði í öllum verkefnum. Hér geturðu lesið um hvernig við verndum þig og tryggum bestu mögulegu þjónustu.'
              : 'We emphasize security, transparency and quality in all projects. Here you can read about how we protect you and ensure the best possible service.'
            }
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Öruggt' : 'Secure'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Allar upplýsingar eru vel varðar' : 'All information is well protected'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Gagnsæ' : 'Transparent'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Engin falin gjöld eða kostnaður' : 'No hidden fees or costs'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Gæði' : 'Quality'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Aðeins hæfir verktakar' : 'Only qualified contractors'}
              </p>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="space-y-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
              <div className="md:flex">
                {/* Left Side - Icon */}
                <div className={`${feature.bgColor} p-8 md:w-80 flex flex-col items-center justify-center relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-30 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-4 text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                
                {/* Right Side - Content */}
                <div className="flex-1 p-8">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Security Information */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'is' ? 'Þín öryggi er okkar forgangsverkefni' : 'Your Security is Our Priority'}
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {language === 'is' 
                ? 'Við vinnum stöðugt að því að bæta öryggi og gæði okkar þjónustu til að tryggja bestu upplifun fyrir alla notendur.'
                : 'We are constantly working to improve the security and quality of our service to ensure the best experience for all users.'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'is' ? 'Traustir verktakar' : 'Trusted Contractors'}
              </h3>
              <p className="opacity-90">
                {language === 'is' 
                  ? 'Allir verktakar eru skoðaðir og staðfestir'
                  : 'All contractors are vetted and verified'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'is' ? 'Skýr samskipti' : 'Clear Communication'}
              </h3>
              <p className="opacity-90">
                {language === 'is' 
                  ? 'Öll samskipti og samningar á einum stað'
                  : 'All communication and contracts in one place'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'is' ? 'Örugg gögn' : 'Secure Data'}
              </h3>
              <p className="opacity-90">
                {language === 'is' 
                  ? 'Persónuupplýsingar eru vel varðar'
                  : 'Personal information is well protected'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'is' ? 'Spurningar um öryggi?' : 'Questions About Security?'}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === 'is' 
              ? 'Ef þú hefur spurningar um öryggi eða persónuvernd, ekki hika við að hafa samband við okkur.'
              : 'If you have questions about security or privacy, don\'t hesitate to contact us.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:verki@verki.is" 
              className="inline-flex items-center bg-green-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-lg"
            >
              <Shield className="w-5 h-5 mr-3" />
              {language === 'is' ? 'Spyrja um öryggi' : 'Ask About Security'}
            </a>
            <a 
              href="/help-center" 
              className="inline-flex items-center bg-gray-100 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors duration-200"
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

export default SecurityQualityPage;