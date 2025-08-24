'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

const CallToAction = ({ translations = {} }) => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {translations.ctaTitle || 'Ready to start your project?'}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            {translations.ctaDescription || 'Connect with qualified professionals and get your project done right.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/job-categories">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {translations.postProject || 'Post a Project'}
              </Button>
            </Link>
            <Link href="/all-categories">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {translations.browseServices || 'Browse Services'}
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🆓</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {translations.freeToPost || 'Free to Post'}
              </h3>
              <p className="text-blue-100 text-sm">
                {translations.freeToPostDesc || 'No upfront costs to post your project'}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {translations.quickMatching || 'Quick Matching'}
              </h3>
              <p className="text-blue-100 text-sm">
                {translations.quickMatchingDesc || 'Get matched with professionals in minutes'}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {translations.verified || 'Verified Professionals'}
              </h3>
              <p className="text-blue-100 text-sm">
                {translations.verifiedDesc || 'All professionals are background checked'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;