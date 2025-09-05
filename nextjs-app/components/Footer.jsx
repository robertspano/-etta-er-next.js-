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
            
            {/* Om verki */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Om verki</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-400 bg-blue-100 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors">
                    Kontakt
                  </a>
                </li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Presse</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Karriere</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Vår historie</a></li>
              </ul>
            </div>

            {/* For privatperson */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">For privatperson</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Aktuelt</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Inspirasjon</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hjelpesenter</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Referanser</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Startguide</a></li>
              </ul>
            </div>

            {/* For bedrifter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">For bedrifter</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Registrer bedrift</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Referanser</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Aktuelt</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Startguide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Fordeler</a></li>
              </ul>
            </div>

            {/* Kundeservice */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Kundeservice</h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-sm">09:00 - 16:00 på hverdager. Stengt í helgene</p>
                <p className="text-sm">Send e-post: info@verki.is</p>
                <p className="text-sm">Ring oss: 22 00 09 30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            
            {/* Left side - Logo and Copyright */}
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="flex items-center">
                <img 
                  src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg" 
                  alt="verki Logo" 
                  className="h-8 w-auto object-contain"
                />
                <span className="ml-2 text-xl font-bold text-white">verki</span>
              </div>
              <p className="text-gray-400 text-sm">
                verki Marketplaces AS © {currentYear}
              </p>
            </div>

            {/* Center - Legal Links */}
            <div className="flex flex-wrap justify-center items-center space-x-4 text-sm text-gray-400 my-4 lg:my-0">
              <a href="#" className="hover:text-white transition-colors">Personvernerklæring</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Nettstedskart</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Vilkår</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Cookie innstillinger</a>
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