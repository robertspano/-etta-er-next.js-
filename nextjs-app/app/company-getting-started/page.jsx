'use client';

import React from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';
import { 
  BookOpen, Smartphone, User, MessageSquare, Star, 
  CheckCircle, ArrowRight, Mail, Phone, Users, 
  FileText, Shield, Settings, Target, Award, 
  Zap, Clock, Download, ExternalLink
} from 'lucide-react';

const CompanyGettingStartedPage = () => {
  const { language, translations } = useTranslations();

  const mainSteps = [
    {
      number: "1",
      title: "Sækja appið",
      description: "Fáðu tilkynningar um ný verkefni og haltu utan um samtöl",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      number: "2", 
      title: "Klára prófílinn",
      description: "Gerðu frábæra prófílsíðu sem sýnir þjónustu þína",
      icon: <User className="w-6 h-6" />
    },
    {
      number: "3",
      title: "Svara verkefnum",
      description: "Svaraðu verkefnum faglega og vinndu þau til enda",
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      number: "4",
      title: "Safna umsögnum",
      description: "Byggðu upp áreiðanleika með góðum umsögnum",
      icon: <Star className="w-6 h-6" />
    }
  ];

  const quickChecklist = [
    "Appið sótt og tilkynningar virkar",
    "Prófilinn 100% útfylltur (mynd/logo, vottanir, svæði)",
    "Vistaðar leitir fyrir þínar þjónustur", 
    "Sniðmát fyrir svör/tilboð tilbúin",
    "Ferli fyrir umsagnabeiðnir eftir verklok"
  ];

  const profileTips = [
    "Stutta kynningu: Hvað gerir þig/eik lið þitt sérstakt?",
    "Myndir úr verkum: 'Fyrir & eftir' virkar vel",
    "Verkþekking og vottanir: Skráðu réttindi og öryggisvottanir",
    "Tryggingar og skírteini: Eykur traust",
    "Þjónustusvæði og opnunartíma"
  ];

  const appTips = [
    "Leitaðu að verkefnum sem passa þjónustuna þína og vistaðu leitir",
    "Kveiktu á tilkynningum svo þú sért fyrst/ur til að svara",
    "Haltu samskiptum innan appsins til að hafa allt skráð"
  ];

  const responseTips = [
    "Vísa í nákvæma þætti verkefnisins (ekki bara sniðmát)",
    "Spyrja skýrandi spurninga ef eitthvað vantar (m², teikningar, aðgengi o.s.frv.)",
    "Leggja til næstu skref (símtal, heimsókn, myndir)",
    "Hafa stuttan kynningareiningu um reynslu í sambærilegum verkum"
  ];

  const faqs = [
    {
      question: "Hvað kostar að nota þjónustuna?",
      answer: "Grunnnotkun er ókeypis. Aukin þjónusta og verkfæri eru í boði með áskrift."
    },
    {
      question: "Má ég skoða verkefni áður en ég skuldbindi mig?",
      answer: "Já, þú getur skoðað öll verkefni og ákveðið hvort þú vilt svara hverju um sig."
    },
    {
      question: "Hvernig get ég sýnt tryggingar og vottanir?",
      answer: "Þú getur hlaðið upp skjölum beint í prófílinn þinn til að sýna vottanir og tryggingar."
    }
  ];

  return (
    <div className="min-h-screen bg-light_cyan pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-federal_blue rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Byrjunarleiðbeiningar fyrir ný fyrirtæki
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Velkomin! Hér finnur þú hraða leið til að hefja störf, finna verkefni og vinna þau faglega frá upphafi til enda.
          </p>
        </div>

        {/* Main Steps Overview */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Helstu skrefin
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Fylgdu þessum fjórum skrefum til að komast vel af stað
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="w-12 h-12 bg-federal_blue text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 bg-federal_blue-100 rounded-full flex items-center justify-center text-federal_blue">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-16">
          
          {/* Step 1: App Download */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-honolulu_blue-100 rounded-full flex items-center justify-center mr-4">
                <Smartphone className="w-6 h-6 text-honolulu_blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                1) Sæktu appið fyrir fyrirtæki
              </h3>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Appið er vinnuverkfærið þitt á ferðinni – þú færð tilkynningar um ný verkefni, heldur utan um samtöl og sérð stöðu mála á einum stað.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Gott að gera strax:</h4>
              <ul className="space-y-3">
                {appTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-honolulu_blue mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a 
                href="#" 
                className="inline-flex items-center justify-center bg-federal_blue text-white font-medium px-6 py-3 rounded-lg hover:bg-honolulu_blue transition-colors duration-200"
              >
                <Download className="w-5 h-5 mr-2" />
                Sækja fyrir iPhone
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center bg-pacific_cyan text-white font-medium px-6 py-3 rounded-lg hover:bg-honolulu_blue transition-colors duration-200"
              >
                <Download className="w-5 h-5 mr-2" />
                Sækja fyrir Android
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* Step 2: Profile Setup */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-pacific_cyan-100 rounded-full flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-pacific_cyan" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                2) Gerðu frábæra prófílsíðu
              </h3>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Prófíllinn er fyrsta innsýnin í fyrirtækið þitt og hjálpar viðskiptavinum að velja rétt.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Settu inn:</h4>
              <ul className="space-y-3">
                {profileTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pacific_cyan mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-federal_blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Target className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-federal_blue mb-1">Ábending:</p>
                  <p className="text-gray-700 text-sm">Vel útfyllt prófílsíða fær oftar boð í vettvangsskoðun og tilboð.</p>
                </div>
              </div>
            </div>

            <a 
              href="#" 
              className="inline-flex items-center text-federal_blue hover:text-honolulu_blue font-medium transition-colors duration-200"
            >
              Lesa fleiri ráð um góða prófílsíðu
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Step 3: Responding to Projects */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-non_photo_blue-100 rounded-full flex items-center justify-center mr-4">
                <MessageSquare className="w-6 h-6 text-non_photo_blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                3) Svara verkefnum – þannig vinnurðu þau
              </h3>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Þegar kemur nýtt verkefni sem passar: lestu lýsinguna vel og svaraðu fljótt.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Svarið þitt ætti að:</h4>
              <ul className="space-y-3">
                {responseTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-non_photo_blue mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a 
              href="#" 
              className="inline-flex items-center text-federal_blue hover:text-honolulu_blue font-medium transition-colors duration-200"
            >
              Hvernig á að skrifa svör sem skara fram úr
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Step 4: After Project Completion */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-federal_blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Þegar þú vinnur verkið – hvað næst?
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Merktu verkefnið sem unnið</h4>
                <p className="text-gray-700 leading-relaxed">
                  Ljúktu því að merkja verkefnið „valið/unnið" þegar samningur liggur fyrir og staðfestu verklok þegar búið er. Þannig helst ferlið skýrt fyrir þig og viðskiptavininn.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Biddu um umsögn</h4>
                <p className="text-gray-700 leading-relaxed">
                  Eftir verklok: biddu kurteislega um umsögn. Stutt skilaboð duga – umsagnir byggja upp áreiðanleika og hjálpa þér að vinna næstu verk.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a 
                href="#" 
                className="inline-flex items-center text-federal_blue hover:text-honolulu_blue font-medium transition-colors duration-200"
              >
                Af hverju umsagnir skipta máli
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

        </div>

        {/* Quick Checklist */}
        <div className="mt-20 bg-light_cyan rounded-xl p-8 border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-federal_blue" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Fljótleg gátlisti
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {quickChecklist.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="w-5 h-5 border-2 border-federal_blue rounded mr-3 mt-0.5 flex-shrink-0"></div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-honolulu_blue-100 rounded-full flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-honolulu_blue" />
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

        {/* Help & Contact Section */}
        <div className="mt-16 bg-federal_blue rounded-xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">
              Hjálp & samskipti
            </h3>
          </div>
          
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Ef þú þarft aðstoð við að koma í gang eða hefur spurningar um þjónustuna, ekki hika við að hafa samband.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Mail className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">Netspjall</p>
              <p className="text-sm opacity-80">verki@verki.is</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Phone className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">Sími</p>
              <p className="text-sm opacity-80">787 7887</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">Opið</p>
              <p className="text-sm opacity-80">9-17 virka daga</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register-company" 
              className="inline-flex items-center bg-white text-federal_blue font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Skrá fyrirtæki
            </a>
            <a 
              href="#" 
              className="inline-flex items-center bg-white bg-opacity-20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-opacity-30 transition-colors duration-200 backdrop-blur-sm"
            >
              <Smartphone className="w-5 h-5 mr-3" />
              Sækja appið
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyGettingStartedPage;