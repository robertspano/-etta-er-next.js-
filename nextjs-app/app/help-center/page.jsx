'use client';

import React from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';
import { 
  LifeBuoy, Settings, Shield, AlertTriangle, 
  FileText, HelpCircle, ArrowRight, Users, 
  CheckCircle, Clock, Target
} from 'lucide-react';

const HelpCenterPage = () => {
  const { language, translations } = useTranslations();

  const helpTopics = [
    {
      title: language === 'is' ? 'Hvernig virkar Verki' : 'How Verki Works',
      description: language === 'is' 
        ? 'Lærðu skref-fyrir-skref hvernig þú notar Verki til að finna rétta verktaka'
        : 'Learn step-by-step how to use Verki to find the right contractor',
      icon: <Settings className="w-8 h-8" />,
      color: 'blue',
      link: '/help-center/how-it-works',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: language === 'is' ? 'Öryggi og gæðatrygging' : 'Security and Quality Assurance',
      description: language === 'is' 
        ? 'Uppgötvaðu hvernig við tryggum öryggi og gæði í öllum verkefnum'
        : 'Discover how we ensure security and quality in all projects',
      icon: <Shield className="w-8 h-8" />,
      color: 'green',
      link: '/help-center/security-quality',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: language === 'is' ? 'Hvað ef eitthvað fer úrskeiðis' : 'What If Something Goes Wrong',
      description: language === 'is' 
        ? 'Leiðbeiningar um hvernig á að leysa vandamál og fá hjálp þegar þörf krefur'
        : 'Instructions on how to solve problems and get help when needed',
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'orange',
      link: '/help-center/troubleshooting',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: language === 'is' ? 'Hvernig skrifa ég góða verkbeiðni' : 'How to Write a Good Project Request',
      description: language === 'is' 
        ? 'Ráð og leiðbeiningar til að skrifa skýrar verkbeiðnir sem fá betri tilboð'
        : 'Tips and guidance for writing clear project requests that get better quotes',
      icon: <FileText className="w-8 h-8" />,
      color: 'purple',
      link: '/help-center/project-requests',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      title: language === 'is' ? 'Algengar spurningar' : 'Frequently Asked Questions',
      description: language === 'is' 
        ? 'Svör við algengum spurningum um notkun Verki og þjónustuna'
        : 'Answers to common questions about using Verki and the service',
      icon: <HelpCircle className="w-8 h-8" />,
      color: 'indigo',
      link: '/help-center/faq',
      gradient: 'from-indigo-500 to-blue-600'
    }
  ];

  const quickStats = [
    {
      icon: <Users className="w-6 h-6" />,
      label: language === 'is' ? 'Virkir notendur' : 'Active Users',
      value: '2,500+',
      color: 'text-blue-600'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      label: language === 'is' ? 'Lokið verkefni' : 'Completed Projects',
      value: '1,200+',
      color: 'text-green-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: language === 'is' ? 'Meðalsvörunartími' : 'Average Response Time',
      value: language === 'is' ? '< 2 klst' : '< 2 hrs',
      color: 'text-orange-600'
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: language === 'is' ? 'Ánægja viðskiptavina' : 'Customer Satisfaction',
      value: '4.8/5',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-light_cyan pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative">
            {/* Floating Elements */}
            <div className="absolute -top-4 left-1/4 w-20 h-20 bg-federal_blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -top-8 right-1/3 w-16 h-16 bg-honolulu_blue-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute top-4 right-1/4 w-12 h-12 bg-pacific_cyan-200 rounded-full opacity-25 animate-pulse delay-500"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-federal_blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <LifeBuoy className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-federal_blue">
                  Help Center
                </span>
                <span className="block text-3xl md:text-4xl font-medium text-gray-700 mt-2">
                  {language === 'is' ? 'Einstaklingar' : 'Individuals'}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {language === 'is' 
                  ? 'Velkomin í hjálparmiðstöð Verki fyrir einstaklinga. Hér finnur þú skýrar leiðbeiningar um hvernig Verki virkar, öryggi og gæði, hvað þú gerir ef eitthvað fer úrskeiðis, hvernig á að skrifa góða verkbeiðni og svör við algengum spurningum.'
                  : 'Welcome to Verki\'s help center for individuals. Here you will find clear instructions on how Verki works, security and quality, what to do if something goes wrong, how to write a good project request and answers to frequently asked questions.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Help Topics Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            {language === 'is' ? 'Tenglar á greinar' : 'Article Links'}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {language === 'is' 
              ? 'Veldu þá grein sem þú þarft hjálp með til að fara beint í nákvæmar leiðbeiningar'
              : 'Choose the article you need help with to go directly to detailed instructions'
            }
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpTopics.map((topic, index) => (
              <a 
                key={index}
                href={topic.link}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${topic.gradient} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      {topic.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-gray-100 transition-colors">
                        {topic.title}
                      </h3>
                    </div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {topic.description}
                  </p>
                  
                  <div className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors">
                    <span className="text-sm font-medium">
                      {language === 'is' ? 'Lesa meira' : 'Read more'}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'is' ? 'Þarftu frekari aðstoð?' : 'Need Further Assistance?'}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {language === 'is' 
              ? 'Ef þú finnur ekki svarið við spurningunni þinni hér, ekki hika við að hafa samband við okkur.'
              : 'If you can\'t find the answer to your question here, don\'t hesitate to contact us.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:verki@verki.is" 
              className="inline-flex items-center bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <LifeBuoy className="w-5 h-5 mr-3" />
              {language === 'is' ? 'Senda tölvupóst' : 'Send Email'}
            </a>
            <a 
              href="/" 
              className="inline-flex items-center bg-white bg-opacity-20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-opacity-30 transition-colors duration-200 backdrop-blur-sm"
            >
              <Target className="w-5 h-5 mr-3" />
              {language === 'is' ? 'Byrja verkefni' : 'Start Project'}
            </a>
          </div>
        </div>

        {/* Popular Articles Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <CheckCircle className="w-5 h-5 text-yellow-600" />
            </div>
            {language === 'is' ? 'Vinsælustu leiðbeiningarnar' : 'Most Popular Guides'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Skref-fyrir-skref ferli' : 'Step-by-step Process'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is' 
                  ? 'Lærðu hvernig á að setja inn verkefni og fá bestu tilboðin.'
                  : 'Learn how to submit projects and get the best quotes.'
                }
              </p>
            </div>
            
            <div className="border-l-4 border-green-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Öryggi og traust' : 'Security and Trust'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is' 
                  ? 'Uppgötvaðu hvernig við verndum þig og tryggum gæði.'
                  : 'Discover how we protect you and ensure quality.'
                }
              </p>
            </div>
            
            <div className="border-l-4 border-purple-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Betri verkbeiðnir' : 'Better Project Requests'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is' 
                  ? 'Ráð til að skrifa verkbeiðnir sem fá fleiri og betri tilboð.'
                  : 'Tips for writing project requests that get more and better quotes.'
                }
              </p>
            </div>
            
            <div className="border-l-4 border-orange-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'is' ? 'Lausn á vandamálum' : 'Problem Solving'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'is' 
                  ? 'Hvað á að gera ef eitthvað fer ekki eins og áætlað var.'
                  : 'What to do if something doesn\'t go as planned.'
                }
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpCenterPage;