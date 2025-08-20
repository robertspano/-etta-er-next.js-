'use client';

import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ translations }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">
              {translations.siteName}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {translations.footerDescription}
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.quickLinks}</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">{translations.services}</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">{translations.howItWorks}</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">{translations.about}</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">{translations.contact}</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.categories}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{translations.services_plumbing}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{translations.services_electrical}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{translations.services_carpentry}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{translations.services_painting}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.support}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{translations.helpCenter}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{translations.safety}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{translations.terms}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{translations.privacy}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {translations.siteName}. {translations.allRightsReserved}
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-gray-400">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              info@buildconnect.is
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              +354 555 0123
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;