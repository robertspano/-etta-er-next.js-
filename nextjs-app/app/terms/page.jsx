'use client';

import React from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';
import { 
  FileText, Users, Handshake, CreditCard, ShieldCheck, 
  Shield, Settings, AlertTriangle, CheckCircle, Mail, 
  Phone, Briefcase, UserCheck, Scale, Clock, Edit
} from 'lucide-react';

const TermsPage = () => {
  const { language, translations } = useTranslations();

  const termsSection = [
    {
      number: "1",
      title: "Þjónusta",
      icon: <Briefcase className="w-6 h-6" />,
      color: "federal_blue",
      content: "Verki ehf. býður upp á garð- og hreinsunarþjónustu ásamt tengdum verkefnum. Allar upplýsingar sem birtar eru á vefsíðu okkar eru ætlaðar til upplýsinga og geta breyst án fyrirvara."
    },
    {
      number: "2",
      title: "Ábyrgð notanda",
      icon: <UserCheck className="w-6 h-6" />,
      color: "honolulu_blue",
      content: [
        "Notandi ber ábyrgð á að veita réttar og fullnægjandi upplýsingar þegar hann pantar þjónustu.",
        "Notandi má ekki senda inn eða miðla efni sem er ólöglegt, villandi, meiðandi eða brýtur gegn réttindum annarra.",
        "Ef notandi brýtur gegn þessum skilmálum áskilur Verki sér rétt til að hafna eða stöðva þjónustu."
      ]
    },
    {
      number: "3",
      title: "Samningssamband",
      icon: <Handshake className="w-6 h-6" />,
      color: "pacific_cyan",
      content: [
        "Samningur um framkvæmd verkefna telst aðeins gildur þegar Verki ehf. hefur staðfest pöntun og samkomulag liggur fyrir um verksvið, verð og tíma.",
        "Verki ehf. er ekki ábyrgt fyrir tjóni sem verður vegna rangra upplýsinga frá viðskiptavini eða ef skilmálum samnings er ekki fylgt af hálfu viðskiptavinar."
      ]
    },
    {
      number: "4",
      title: "Greiðslur",
      icon: <CreditCard className="w-6 h-6" />,
      color: "non_photo_blue",
      content: [
        "Greiðslur fyrir þjónustu skulu fara fram samkvæmt þeim samningi sem gerður er við Verki ehf.",
        "Ef greiðsla berst ekki innan umsaminna tímamarka áskilur Verki sér rétt til að innheimta dráttarvexti og kostnað samkvæmt íslenskum lögum."
      ]
    },
    {
      number: "5",
      title: "Takmörkun ábyrgðar",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "federal_blue",
      content: [
        "Verki ehf. leggur sig fram um að veita áreiðanlega þjónustu, en ber ekki ábyrgð á beinu eða óbeinu tjóni sem kann að verða vegna tafa, rangra upplýsinga eða óviðráðanlegra atvika (force majeure).",
        "Tæknilegir annmarkar á vefsíðu (t.d. þjónusturof, villur eða bilun í netkerfum) geta átt sér stað og ber Verki ekki ábyrgð á því."
      ]
    },
    {
      number: "6",
      title: "Persónuvernd",
      icon: <Shield className="w-6 h-6" />,
      color: "honolulu_blue",
      content: "Með því að nýta þjónustu Verki ehf. samþykkir þú að persónuupplýsingar þínar séu unnar í samræmi við persónuverndarstefnu fyrirtækisins."
    },
    {
      number: "7",
      title: "Breytingar á skilmálum",
      icon: <Edit className="w-6 h-6" />,
      color: "pacific_cyan",
      content: "Verki ehf. áskilur sér rétt til að breyta þessum skilmálum hvenær sem er. Breyttir skilmálar taka gildi við birtingu á vefsíðunni."
    }
  ];

  return (
    <div className="min-h-screen bg-light_cyan pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-federal_blue rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Skilmálar
          </h1>
          <div className="text-lg text-federal_blue font-medium mb-4">
            Verki ehf.
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Þessir skilmálar gilda um notkun á vefsíðu og þjónustu Verki ehf. (hér eftir nefnt „Verki"). Með því að hafa samband, panta þjónustu eða nýta vefsíðu okkar samþykkir þú þessa skilmála.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8 mb-16">
          {termsSection.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-${section.color}-100 rounded-full flex items-center justify-center mr-4`}>
                  <div className={`text-${section.color}`}>
                    {section.icon}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 bg-${section.color} text-white rounded-full flex items-center justify-center font-bold text-sm mr-4`}>
                    {section.number}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
              </div>
              
              <div className="ml-16">
                {Array.isArray(section.content) ? (
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <div key={pIndex} className="flex items-start">
                        <CheckCircle className={`w-5 h-5 text-${section.color} mr-3 mt-0.5 flex-shrink-0`} />
                        <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="bg-federal_blue-50 rounded-xl p-8 border border-federal_blue-200 mb-16">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-federal_blue" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mikilvægt að hafa í huga
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    Þessir skilmálar eru til að vernda bæði viðskiptavini og fyrirtækið
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    Vinsamlegast lesið skilmálana vandlega áður en þjónusta er nýtt
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    Hafið samband ef þið hafið spurningar um einhvern hluta skilmálanna
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-16">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-honolulu_blue-100 rounded-full flex items-center justify-center mr-4">
              <Scale className="w-6 h-6 text-honolulu_blue" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Tengdar upplýsingar
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Persónuverndarstefna</h4>
              <p className="text-gray-600 text-sm mb-4">
                Kynntu þér hvernig við meðhöndlum persónuupplýsingar þínar.
              </p>
              <a 
                href="/privacy-policy" 
                className="inline-flex items-center text-honolulu_blue hover:text-federal_blue font-medium transition-colors duration-200"
              >
                Skoða persónuverndarstefnu
                <CheckCircle className="w-4 h-4 ml-2" />
              </a>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Hjálparmiðstöð</h4>
              <p className="text-gray-600 text-sm mb-4">
                Finndu svör við algengum spurningum og fáðu hjálp.
              </p>
              <a 
                href="/help-center" 
                className="inline-flex items-center text-pacific_cyan hover:text-federal_blue font-medium transition-colors duration-200"
              >
                Fara í hjálparmiðstöð
                <CheckCircle className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Effective Date */}
        <div className="bg-light_cyan rounded-xl p-6 border border-gray-200 mb-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-federal_blue mr-2" />
            <span className="font-medium text-gray-900">Síðast uppfært</span>
          </div>
          <p className="text-gray-600">
            Þessir skilmálar voru síðast uppfærðir í september 2025
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-federal_blue rounded-xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">
              Spurningar um skilmála?
            </h3>
          </div>
          
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Ef þú hefur spurningar um skilmála okkar eða þarft frekari skýringar, hafðu endilega samband við okkur.
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

export default TermsPage;