'use client';

import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer = ({ translations = {}, language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Main Footer Section */}
      <div className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Um verki / About verki */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {language === 'is' ? 'Um verki' : 'About verki'}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/contact" className="text-blue-400 bg-blue-100 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors">
                    {language === 'is' ? 'Tengiliður' : 'Contact'}
                  </a>
                </li>

                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'is' ? 'Starfsmöguleikar' : 'Careers'}
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'is' ? 'Saga okkar' : 'Our story'}
                </a></li>
              </ul>
            </div>

            {/* Fyrir einstaklinga / For individuals */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {language === 'is' ? 'Fyrir einstaklinga' : 'For individuals'}
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'is' ? 'Hugmyndir' : 'Inspiration'}
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'is' ? 'Hjálparmiðstöð' : 'Help center'}
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'is' ? 'Byrjendahandbók' : 'Getting started'}
                </a></li>
              </ul>
            </div>

            {/* Fyrir fyrirtæki / For businesses */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {language === 'is' ? 'Fyrir fyrirtæki' : 'For businesses'}
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'is' ? 'Skrá fyrirtæki' : 'Register business'}
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'is' ? 'Byrjendahandbók' : 'Getting started'}
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'is' ? 'Kostir' : 'Benefits'}
                </a></li>
              </ul>
            </div>

            {/* Þjónustuver / Customer service */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {language === 'is' ? 'Þjónustuver' : 'Customer service'}
              </h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-sm">
                  {language === 'is' ? 'Sendu tölvupóst: verki@verki.is' : 'Send email: verki@verki.is'}
                </p>
                <p className="text-sm">
                  {language === 'is' ? 'Hringdu í okkur: 787 7887' : 'Call us: 787 7887'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            
            {/* Left side - Logo, Copyright, and Legal Links stacked */}
            <div className="flex flex-col space-y-4">
              {/* Logo */}
              <div className="flex items-center">
                <img 
                  src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg" 
                  alt="verki Logo" 
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              </div>
              
              {/* Copyright */}
              <p className="text-gray-400 text-sm">
                verki Marketplaces AS © {currentYear}
              </p>
              
              {/* Legal Links */}
              <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'is' ? 'Persónuverndarstefna' : 'Privacy policy'}
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'is' ? 'Síðukort' : 'Sitemap'}
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'is' ? 'Skilmálar' : 'Terms'}
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'is' ? 'Vafrakökustillingar' : 'Cookie settings'}
                </a>
              </div>
            </div>

            {/* Right side - Social Media */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;