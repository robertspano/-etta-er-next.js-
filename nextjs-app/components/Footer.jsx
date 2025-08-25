'use client';

import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ translations = {}, language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E293B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-[#4F46E5] mb-4">
              {translations.siteName || 'BuildConnect'}
            </div>
            <p className="text-[#94A3B8] mb-6 leading-relaxed">
              {translations.footerDescription || 'Find qualified professionals for your construction projects.'}
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-[#64748B] hover:text-white p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-[#64748B] hover:text-white p-2">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-[#64748B] hover:text-white p-2">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.quickLinks || 'Quick Links'}</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-[#94A3B8] hover:text-white transition-colors">{translations.services || 'Services'}</a></li>
              <li><a href="#how-it-works" className="text-[#94A3B8] hover:text-white transition-colors">{translations.howItWorks || 'How It Works'}</a></li>
              <li><a href="#about" className="text-[#94A3B8] hover:text-white transition-colors">{translations.about || 'About'}</a></li>
              <li><a href="#contact" className="text-[#94A3B8] hover:text-white transition-colors">{translations.contact || 'Contact'}</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.categories || 'Categories'}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#94A3B8] hover:text-white transition-colors">{translations.services_plumbing || 'Plumbing'}</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-white transition-colors">{translations.services_electrical || 'Electrical'}</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-white transition-colors">{translations.services_carpentry || 'Carpentry'}</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-white transition-colors">{translations.services_painting || 'Painting'}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.support || 'Support'}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#94A3B8] hover:text-white transition-colors">{translations.helpCenter || 'Help Center'}</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-white transition-colors">{translations.safety || 'Safety'}</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-white transition-colors">{translations.terms || 'Terms'}</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-white transition-colors">{translations.privacy || 'Privacy'}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#334155] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#64748B] text-sm">
            © {currentYear} {translations.siteName || 'BuildConnect'}. {translations.allRightsReserved || 'All rights reserved'}.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-[#64748B]">
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