'use client';

import React from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';
import { ArrowLeft, Mail, Phone, Clock, MapPin, MessageSquare, AlertTriangle, Shield, Hammer, Brush, Droplets } from 'lucide-react';
import Link from 'next/link';

const ContactPage = () => {
  const { language, translations } = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Page Header */}
        <div className="text-center mb-16 mt-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' 
              ? 'Þarftu að komast í samband við verki?' 
              : 'Need to get in touch with verki?'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'is'
              ? 'Finndu opnunartíma fyrir þjónustuver og tengiliðsupplýsingar til verki.'
              : 'Find opening hours for customer service and contact information for verki.'}
          </p>
        </div>

        {/* Logo and Services Icons */}
        <div className="bg-gray-100 rounded-lg p-12 mb-16">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg"
                alt="verki Logo"
                className="h-16 w-auto mx-auto mb-4"
              />
            </div>

            {/* Service Icons */}
            <div className="flex justify-center items-center space-x-8">
              <div className="text-gray-600">
                <Hammer className="w-12 h-12 mx-auto" />
              </div>
              <div className="text-gray-600">
                <MessageSquare className="w-12 h-12 mx-auto" />
              </div>
              <div className="text-gray-600">
                <Brush className="w-12 h-12 mx-auto" />
              </div>
              <div className="text-gray-600">
                <Droplets className="w-12 h-12 mx-auto" />
              </div>
              <div className="text-gray-600">
                <Shield className="w-12 h-12 mx-auto" />
              </div>
              <div className="text-gray-600">
                <AlertTriangle className="w-12 h-12 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-12">
          
          {/* Email */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700 font-medium">E-post:</span>
            </div>
            <a href="mailto:verki@verki.is" className="text-2xl text-blue-600 hover:text-blue-700 font-medium">
              verki@verki.is
            </a>
          </div>

          {/* Phone */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Phone className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700 font-medium">
                {language === 'is' ? 'Sími:' : 'Phone:'}
              </span>
            </div>
            <a href="tel:+3547877887" className="text-2xl text-blue-600 hover:text-blue-700 font-medium">
              +354 787 7887
            </a>
          </div>

          {/* Opening Hours */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'is' ? 'Opnunartímar þjónustuvers' : 'Customer service hours'}
              </h3>
            </div>
            <div className="space-y-2 text-lg text-gray-700">
              <p>
                <span className="font-medium">
                  {language === 'is' ? 'Virka dagar:' : 'Weekdays:'}
                </span> 09:00 - 16:00
              </p>
              <p>
                <span className="font-medium">
                  {language === 'is' ? 'Laugardagar:' : 'Saturdays:'}
                </span> {language === 'is' ? 'Lokað' : 'Closed'}
              </p>
              <p>
                <span className="font-medium">
                  {language === 'is' ? 'Sunnudagar:' : 'Sundays:'}
                </span> {language === 'is' ? 'Lokað' : 'Closed'}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'is' ? 'Heimilisfang' : 'Address'}
              </h3>
            </div>
            <div className="space-y-1 text-lg text-gray-700">
              <p className="font-medium">verki Marketplaces AS</p>
              <p>Háaleitisbraut 68</p>
              <p>108 Reykjavík</p>
            </div>
          </div>

        </div>

        {/* Fraud Warning Section */}
        <div className="mt-16 bg-yellow-100 border border-yellow-300 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'is' 
              ? 'Hefur þú orðið fyrir svindli eða öðrum alvarlegum atburðum?' 
              : 'Have you experienced fraud or other serious incidents?'}
          </h3>
          
          <div className="space-y-4 text-gray-700 mb-6">
            <p>
              {language === 'is'
                ? 'Flestir eru ærlegir og góðir þegar þeir nýta sér örugga þjónustu þegar þeir þurfa á stafrænni þjónustu að halda. En eins og í öllum öðrum greinum er ákveðin hætta á að verða lurt eða að misskilningur eigi sér stað.'
                : 'Most people are honest and good when using secure services when they need digital services. But as in all other industries, there is a certain risk of being deceived or misunderstandings occurring.'}
            </p>
            
            <p>
              {language === 'is'
                ? 'Við bjóðum upp á örugg kerfi til að tryggja örugga upplifun fyrir bæði fyrirtæki og einstaklinga á verki. Því viljum við gjarna heyra frá þér ef þú hefur orðið fyrir einhverju í þjónustunni sem þú vilt kvarta yfir.'
                : 'We offer secure systems to ensure a safe experience for both businesses and individuals on verki. Therefore, we would like to hear from you if you have experienced something in the service that you want to complain about.'}
            </p>
          </div>

          <Link 
            href="/contact" 
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            {language === 'is' 
              ? 'Smelltu hér til að senda inn kvörtun' 
              : 'Click here to submit a complaint'}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;