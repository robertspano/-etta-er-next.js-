'use client';

import React from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';
import { 
  Gift, FileText, Clock, Shield, Users, CheckCircle, 
  ArrowRight, Mail, Phone, Settings, Target, Award, 
  Zap, Star, Heart, TrendingUp, Briefcase, FileCheck,
  AlertTriangle, Scale, ShieldCheck, HelpCircle, Sparkles
} from 'lucide-react';

const CompanyBenefitsPage = () => {
  const { language, translations } = useTranslations();

  const whySmartBenefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Skýrari ferla og minna pappírsvesen",
      description: "Stafrænir verkferlar spara tíma og draga úr mistökum"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Betri yfirsýn yfir verkefni, tíma og kostnað",
      description: "Haltu utan um öll verkefni á einum stað"
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Auðveldari skjölun og samræmi við kröfur",
      description: "Uppfylltu reglugerðir án fyrirhafnar"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Aukið traust með faglegri framsetningu",
      description: "Fagleg útfærsla eykur traust viðskiptavina"
    }
  ];

  const benefits = [
    {
      title: "Skjölun og verklok",
      partner: "SmartDocs Pro",
      description: "Gerðu skjölun verka sjálfvirka: vistaðu skýrslur, myndir og vottanir á einum stað og deildu með viðskiptavinum.",
      icon: <FileText className="w-8 h-8" />,
      color: "federal_blue",
      advantages: [
        "Meira traust – allt staðfest og aðgengilegt",
        "Minni skrifvinna – stafrænt öll gögn",
        "Samræmi við reglur – auðveldari ábyrgð og kvartanir",
        "Söguverðmæti – gagnlegt við þjónustu/viðhald síðar"
      ]
    },
    {
      title: "Verkefnastjórnun & tímaskráning",
      partner: "WorkFlow Manager",
      description: "Eitt kerfi fyrir tilboð, verkefni, tíma, reikninga og skýrslur.",
      icon: <Briefcase className="w-8 h-8" />,
      color: "honolulu_blue",
      advantages: [
        "Einfaldari dagur – allt í einu yfirliti",
        "Betri stjórnun – minna tap á tíma og gögnum", 
        "Reglusamræmi – auðveldar að uppfylla kröfur"
      ]
    },
    {
      title: "Lögfræði- og samningsaðstoð",
      partner: "LegalPro Iceland",
      description: "Fáðu fyrirfram sniðin samningssnið, ráðgjöf og vernd þegar á reynir.",
      icon: <Scale className="w-8 h-8" />,
      color: "pacific_cyan",
      advantages: [
        "Fagleg samningsgögn tilbúin til notkunar",
        "Ráðgjöf þegar þú þarft á að halda",
        "Öryggi ef upp kemur ágreiningur"
      ]
    },
    {
      title: "Tryggingar fyrir fyrirtækið",
      partner: "SecureGuard Business",
      description: "Sérsniðnir pakkasamningar með reglulegu yfirliti og aðgengi að þjónustu.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "non_photo_blue",
      advantages: [
        "Rétt vernd fyrir fólk, tæki og verkefni",
        "Reglubundið heildaryfirlit yfir tryggingar",
        "Aukaaðstoð (t.d. læknisráðgjöf / réttaraðstoð eftir samningi)"
      ]
    }
  ];

  const activationSteps = [
    {
      number: "1",
      title: "Skráðu þig inn á fyrirtækjasvæðið",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "2",
      title: "Opnaðu flipann 'Snjöll fríðindi'",
      icon: <Settings className="w-6 h-6" />
    },
    {
      number: "3",
      title: "Veldu fríðindi og virkjaðu þau með einum smelli",
      icon: <Sparkles className="w-6 h-6" />
    }
  ];

  const faqs = [
    {
      question: "Kosta fríðindin eitthvað?",
      answer: "Sum eru innifalin, önnur á sérkjörum. Verð og kjör sjást við virkjun."
    },
    {
      question: "Get ég valið bara sum fríðindi?",
      answer: "Já — þú virkjar aðeins það sem hentar þér."
    },
    {
      question: "Hvernig fæ ég aðstoð?",
      answer: "Hafðu samband við þjónustuver í síma 787 7887 eða sendu tölvupóst á verki@verki.is."
    }
  ];

  return (
    <div className="min-h-screen bg-light_cyan pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative">
            {/* Floating Elements */}
            <div className="absolute -top-4 left-1/4 w-16 h-16 bg-federal_blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -top-8 right-1/3 w-12 h-12 bg-honolulu_blue-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute top-4 right-1/4 w-20 h-20 bg-pacific_cyan-200 rounded-full opacity-25 animate-pulse delay-500"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-federal_blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Gift className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-federal_blue">Snjöll fríðindi</span>
                <span className="block text-3xl md:text-4xl font-medium text-gray-700 mt-2">
                  fyrir fyrirtæki
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Sparaðu tíma og pening með fríðindum sem eru hönnuð fyrir verktaka og þjónustufyrirtæki. Hér finnurðu lausnir sem stytta skriffinnsku, bæta tryggingu og einfalda verkferla — svo þú getir einbeitt þér að vinnunni sjálfri.
              </p>
            </div>
          </div>
        </div>

        {/* Why Smart Benefits */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Af hverju snjöll fríðindi?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Daglegt starf felur oft í sér skipulag, samninga og skjölun sem taka tíma. Með réttum verkfærum verður ferlið hraðara, öruggara og gagnsærra fyrir þig og viðskiptavininn.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Þú færð m.a.:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {whySmartBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-12 h-12 bg-${index % 2 === 0 ? 'federal_blue' : 'honolulu_blue'}-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                    <div className={`text-${index % 2 === 0 ? 'federal_blue' : 'honolulu_blue'}`}>
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-federal_blue-50 rounded-xl p-8 border border-federal_blue-200">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Star className="w-6 h-6 text-federal_blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Aðeins sérsniðin fríðindi
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Við veljum samstarf sem nýtist í raun — þjónustu, vörur og lausnir sem gera vinnudaginn einfaldari og öruggari. Þú virkjar fríðindin á þínum aðgangi og notar það sem hentar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Overview */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kynntu þér fríðindin
            </h2>
            <p className="text-lg text-gray-600">
              Veldu úr úrvali fríðinda sem styðja við daglegt starf þitt
            </p>
          </div>

          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 bg-${benefit.color}-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0`}>
                    <div className={`text-${benefit.color}`}>
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 lg:mb-0">
                        {benefit.title}
                      </h3>
                      <div className={`bg-${benefit.color}-100 text-${benefit.color} px-4 py-2 rounded-full text-sm font-medium`}>
                        ✓ {benefit.partner}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Kostir:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefit.advantages.map((advantage, advIndex) => (
                      <div key={advIndex} className="flex items-start">
                        <CheckCircle className={`w-5 h-5 text-${benefit.color} mr-3 mt-0.5 flex-shrink-0`} />
                        <span className="text-gray-700 text-sm">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What's Next */}
        <div className="mb-16 bg-light_cyan rounded-xl p-8 border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-federal_blue rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hvað er næst?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Við bætum nýjum fríðindum reglulega. Kíktu inn á aðganginn þinn og sjáðu hvað er tilbúið í dag.
            </p>
          </div>
        </div>

        {/* Activation Steps */}
        <div className="mb-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Virkja fríðindi
            </h2>
            <p className="text-gray-600">
              Þrjú einföld skref til að byrja að nýta fríðindin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {activationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="w-12 h-12 bg-federal_blue text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 bg-federal_blue-100 rounded-full flex items-center justify-center text-federal_blue">
                    {step.icon}
                  </div>
                </div>
                <p className="font-medium text-gray-900">{step.title}</p>
                {index < activationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register-company" 
              className="inline-flex items-center justify-center bg-federal_blue text-white font-semibold px-8 py-4 rounded-xl hover:bg-honolulu_blue transition-colors duration-200 shadow-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Skrá fyrirtæki
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center bg-pacific_cyan text-white font-semibold px-8 py-4 rounded-xl hover:bg-honolulu_blue transition-colors duration-200 shadow-lg"
            >
              <Settings className="w-5 h-5 mr-3" />
              Innskrá og virkja fríðindi
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-honolulu_blue-100 rounded-full flex items-center justify-center mr-4">
              <HelpCircle className="w-6 h-6 text-honolulu_blue" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Algengar spurningar
            </h3>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-federal_blue rounded-xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">
              Þarftu frekari upplýsingar?
            </h3>
          </div>
          
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Hafðu samband við okkur til að fá frekari upplýsingar um fríðindin og hvernig þau geta nýst þínu fyrirtæki.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Mail className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">Tölvupóstur</p>
              <p className="text-sm opacity-80">verki@verki.is</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Phone className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">Sími</p>
              <p className="text-sm opacity-80">787 7887</p>
            </div>
          </div>
          
          <a 
            href="mailto:verki@verki.is" 
            className="inline-flex items-center bg-white text-federal_blue font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            <Mail className="w-5 h-5 mr-3" />
            Senda fyrirspurn
          </a>
        </div>

      </div>
    </div>
  );
};

export default CompanyBenefitsPage;