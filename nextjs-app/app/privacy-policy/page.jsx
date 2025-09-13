'use client';

import React from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';
import { 
  Shield, Eye, FileText, Lock, Users, Mail, Phone, 
  CheckCircle, AlertTriangle, Scale, Globe, Clock,
  UserCheck, ShieldCheck, Download, Settings
} from 'lucide-react';

const PrivacyPolicyPage = () => {
  const { language, translations } = useTranslations();

  const dataTypes = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Upplýsingar sem þú gefur okkur",
      description: "t.d. þegar þú hefur samband í gegnum vefsíðu, tölvupóst eða síma"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Samskiptaupplýsingar",
      description: "t.d. pöntunum, reikningum og fyrirspurnum"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Tæknilegar upplýsingar",
      description: "sem geta safnast sjálfkrafa, t.d. IP-tala eða vafrakökur (ef þú samþykkir)"
    }
  ];

  const usagePurposes = [
    {
      icon: <Users className="w-5 h-5" />,
      text: "Til að veita þjónustu okkar, t.d. til að hafa samband við þig vegna verkefna"
    },
    {
      icon: <Scale className="w-5 h-5" />,
      text: "Til að uppfylla lagaskyldur, svo sem bókhaldsskyldu samkvæmt íslenskum lögum"
    },
    {
      icon: <Settings className="w-5 h-5" />,
      text: "Til að bæta þjónustu og samskipti við viðskiptavini"
    }
  ];

  const legalBasis = [
    {
      title: "Samnings",
      description: "þegar þú pantar þjónustu hjá okkur"
    },
    {
      title: "Lagaskyldu",
      description: "t.d. geymsla reikningsgagna skv. bókhaldslögum"
    },
    {
      title: "Samþykkis",
      description: "t.d. ef þú skráir þig á póstlista"
    }
  ];

  const rights = [
    "Fá aðgang að eigin persónuupplýsingum",
    "Krefjast leiðréttingar eða eyðingar",
    "Takmarka vinnslu eða andmæla henni",
    "Fá gögn afhent á stafrænu formi (gagnaportabilitet)"
  ];

  return (
    <div className="min-h-screen bg-light_cyan pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-federal_blue rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Persónuverndarstefna
          </h1>
          <div className="text-lg text-federal_blue font-medium mb-4">
            Verki ehf.
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Verki ehf. leggur áherslu á öryggi og persónuvernd viðskiptavina sinna. Hér útskýrum við hvaða persónuupplýsingar við söfnum, hvernig þær eru notaðar og hvaða réttindi þú hefur.
          </p>
        </div>

        {/* What are personal data */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4">
              <Eye className="w-6 h-6 text-federal_blue" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Hvað eru persónuupplýsingar?
            </h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            Persónuupplýsingar eru allar upplýsingar sem má rekja til einstaklings, svo sem nafn, netfang, símanúmer og IP-tala.
          </p>
        </div>

        {/* What data we collect */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-honolulu_blue-100 rounded-full flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-honolulu_blue" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Hvaða upplýsingar söfnum við?
            </h2>
          </div>
          
          <div className="space-y-6">
            {dataTypes.map((type, index) => (
              <div key={index} className="flex items-start">
                <div className="w-10 h-10 bg-honolulu_blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <div className="text-honolulu_blue">
                    {type.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How we use the data */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-pacific_cyan-100 rounded-full flex items-center justify-center mr-4">
              <Settings className="w-6 h-6 text-pacific_cyan" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Til hvers notum við upplýsingarnar?
            </h2>
          </div>
          
          <div className="space-y-4">
            {usagePurposes.map((purpose, index) => (
              <div key={index} className="flex items-start">
                <div className="text-pacific_cyan mr-3 mt-0.5">
                  {purpose.icon}
                </div>
                <p className="text-gray-700">{purpose.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal basis */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-non_photo_blue-100 rounded-full flex items-center justify-center mr-4">
              <Scale className="w-6 h-6 text-non_photo_blue" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Lagagrundvöllur vinnslu
            </h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Við vinnum með persónuupplýsingar á grundvelli:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {legalBasis.map((basis, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{basis.title}</h3>
                <p className="text-gray-600 text-sm">({basis.description})</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data retention */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-federal_blue" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Hve lengi geymum við gögn?
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">
                Við geymum persónuupplýsingar ekki lengur en nauðsynlegt er.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">
                Bókhaldsgögn eru geymd í samræmi við íslensk lög (a.m.k. 7 ár).
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">
                Aðrar upplýsingar eru geymdar svo lengi sem þörf er á vegna þjónustu eða samskipta.
              </p>
            </div>
          </div>
        </div>

        {/* Data sharing */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-honolulu_blue-100 rounded-full flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-honolulu_blue" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Deiling gagna
            </h2>
          </div>
          
          <div className="bg-honolulu_blue-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 font-medium mb-4">
              Við deilum aldrei persónuupplýsingum með þriðja aðila nema:
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-honolulu_blue mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  Lög krefjist þess (t.d. til skattyfirvalda).
                </p>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-honolulu_blue mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  Nauðsynlegt sé til að veita þjónustu (t.d. hýsingaraðili vefsíðu).
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm">
            Í slíkum tilvikum tryggjum við að öryggi gagna sé varið með samningum.
          </p>
        </div>

        {/* Your rights */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-pacific_cyan-100 rounded-full flex items-center justify-center mr-4">
              <ShieldCheck className="w-6 h-6 text-pacific_cyan" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Réttindi þín
            </h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Samkvæmt persónuverndarlögum (GDPR) átt þú rétt á að:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {rights.map((right, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-pacific_cyan mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{right}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-pacific_cyan-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Ef þú vilt nýta réttindi þín geturðu haft samband við okkur:
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-pacific_cyan mr-2" />
                <a href="mailto:verki@verki.is" className="text-pacific_cyan hover:underline">
                  verki@verki.is
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-pacific_cyan mr-2" />
                <a href="tel:7877887" className="text-pacific_cyan hover:underline">
                  787 7887
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-non_photo_blue-100 rounded-full flex items-center justify-center mr-4">
              <Globe className="w-6 h-6 text-non_photo_blue" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Vafrakökur (Cookies)
            </h2>
          </div>
          
          <p className="text-gray-700">
            Við notum vafrakökur eingöngu til að bæta notendaupplifun á vefsíðunni. Þú getur hafnað eða stillt notkun í vafranum þínum.
          </p>
        </div>

        {/* Complaints */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4">
              <AlertTriangle className="w-6 h-6 text-federal_blue" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Kvartanir
            </h2>
          </div>
          
          <p className="text-gray-700">
            Ef þú telur að vinnsla persónuupplýsinga hjá okkur brjóti í bága við lög, getur þú kvartað til Persónuverndarstofu Íslands{' '}
            <a 
              href="https://www.personuvernd.is" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-federal_blue hover:underline"
            >
              (www.personuvernd.is)
            </a>.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-federal_blue rounded-xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">
              Spurningar um persónuvernd?
            </h3>
          </div>
          
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Ef þú hefur spurningar um persónuverndarstefnu okkar eða vilt fá frekari upplýsingar, hafðu endilega samband.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:verki@verki.is" 
              className="inline-flex items-center bg-white text-federal_blue font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <Mail className="w-5 h-5 mr-3" />
              Senda tölvupóst
            </a>
            <a 
              href="tel:7877887" 
              className="inline-flex items-center bg-white bg-opacity-20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-opacity-30 transition-colors duration-200 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 mr-3" />
              Hringja í okkur
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;