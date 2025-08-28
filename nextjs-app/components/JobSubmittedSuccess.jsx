'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ThumbsUp, Share2, Facebook, Download } from 'lucide-react';
import { translations } from '@/data/translations';

const JobSubmittedSuccess = ({ language = 'en', setLanguage }) => {
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = translations[language];

  useEffect(() => {
    // Get email from URL params or localStorage
    const email = searchParams.get('email') || localStorage.getItem('submittedJobEmail') || 'your.email@example.com';
    setUserEmail(email);
  }, [searchParams]);

  const toggleLanguage = () => {
    if (setLanguage) {
      setLanguage(language === 'en' ? 'is' : 'en');
    }
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent(language === 'is' ? 'Ég sendi inn verkefni á verki!' : 'I posted a job on verki!');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const handleShareGeneral = () => {
    if (navigator.share) {
      navigator.share({
        title: language === 'is' ? 'verki - Verkefni sent inn' : 'verki - Job Posted',
        text: language === 'is' ? 'Ég sendi inn verkefni á verki!' : 'I posted a job on verki!',
        url: window.location.origin,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.origin);
      alert(language === 'is' ? 'Slóð afrituð!' : 'URL copied!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Success Icon and Message */}
        <div className="text-center mb-12">
          {/* Success Icon - Bigger like mittanbud */}
          <div className="relative inline-block mb-8">
            <div className="relative">
              {/* Thumbs up icon - bigger like mittanbud */}
              <div className="w-40 h-40 mx-auto relative">
                {/* Thumb base */}
                <div className="absolute bottom-0 left-10 w-20 h-24 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-3xl shadow-lg transform rotate-12">
                  {/* Thumb shape */}
                  <div className="absolute top-2 left-2 w-20 h-20 bg-gradient-to-br from-white to-blue-100 rounded-full shadow-inner"></div>
                  <div className="absolute bottom-0 left-8 w-10 h-14 bg-gradient-to-r from-blue-300 to-blue-500 rounded-b-full"></div>
                </div>
              </div>
              {/* Green checkmark overlay - bigger */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Combined Job Registered + App Download Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Job Registered Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              {language === 'is' ? 'Verkefni skráð!' : 'Job registered!'}
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-8 text-lg leading-relaxed text-center max-w-2xl mx-auto">
              {language === 'is' 
                ? `Við höfum búið til prófíl fyrir þig með því að nota netfangið ${userEmail}. Til að sjá eða breyta verkefninu þínu geturðu skráð þig inn á verki.`
                : `We have created a profile for you using the email ${userEmail}. To view or edit your job, you can log in to verki.`}
            </p>

            {/* View Job Button - Longer like mittanbud */}
            <div className="text-center mb-8">
              <Link
                href="/login-passwordless"
                className="inline-block px-20 py-4 bg-honolulu_blue text-white rounded-lg hover:bg-federal_blue transition-colors font-semibold text-lg shadow-lg w-80"
              >
                {language === 'is' ? 'Sjá verkefnið þitt' : 'View your job'}
              </Link>
            </div>

            {/* Separator line like mittanbud */}
            <div className="border-t border-gray-200 mb-8"></div>

            {/* App Download Section - Horizontal Layout like Mittanbud */}
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Left Side - Text and App Store Buttons - Smaller */}
              <div className="flex-1 lg:pr-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {language === 'is' ? 'Fá tilboð rett í lomma' : 'Get quotes right in your pocket'}
                </h2>
                <p className="text-gray-600 mb-4 text-base">
                  {language === 'is' 
                    ? 'Last ned appen og fá einkel oversikt over tilbudene fra bedriftene.'
                    : 'Download the app and get a simple overview of quotes from companies.'}
                </p>
                
                {/* App Store Buttons - Smaller */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="block"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on App Store"
                      className="h-10"
                    />
                  </a>
                  
                  <a
                    href="#"
                    className="block"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      alt="Get it on Google Play"
                      className="h-10"
                    />
                  </a>
                </div>
              </div>

              {/* Right Side - Phone Mockup */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-48 h-72 bg-gray-900 rounded-3xl p-1 shadow-2xl">
                    {/* Screen */}
                    <div className="w-full h-full bg-white rounded-3xl overflow-hidden relative">
                      {/* Status bar */}
                      <div className="h-4 bg-gray-100 flex items-center justify-between px-3 text-xs">
                        <span>9:41</span>
                        <div className="flex space-x-1">
                          <div className="w-3 h-1 bg-gray-400 rounded-sm"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-4 h-1 bg-green-500 rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* App Header */}
                      <div className="bg-honolulu_blue text-white p-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm">verki</h3>
                          <div className="w-5 h-5 bg-white/20 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="p-2 space-y-2">
                        <div className="bg-light_cyan p-2 rounded border-l-2 border-honolulu_blue">
                          <div className="text-xs font-semibold text-federal_blue">
                            {language === 'is' ? 'Nýtt tilboð' : 'New quote'}
                          </div>
                          <div className="text-xs text-honolulu_blue">
                            {language === 'is' ? 'Frá XYZ' : 'From XYZ'}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="text-xs font-medium text-gray-700">
                            {language === 'is' ? 'Í vinnslu' : 'In progress'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {language === 'is' ? '2 tilboð' : '2 quotes'}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="text-xs font-medium text-gray-700">
                            {language === 'is' ? 'Lokið' : 'Completed'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {language === 'is' ? 'Umsögn' : 'Review'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSubmittedSuccess;