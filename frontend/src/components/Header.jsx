import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

const Header = ({ language, setLanguage, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              {translations.siteName}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
              {translations.services}
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
              {translations.howItWorks}
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              {translations.about}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              {translations.contact}
            </a>
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="is">Íslenska</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              {translations.postProject}
            </Button>
            
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              {translations.signIn}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors px-4">
                {translations.services}
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors px-4">
                {translations.howItWorks}
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors px-4">
                {translations.about}
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors px-4">
                {translations.contact}
              </a>
              <div className="px-4 pt-4 border-t">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full mb-3">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="is">Íslenska</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    {translations.postProject}
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                    {translations.signIn}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;