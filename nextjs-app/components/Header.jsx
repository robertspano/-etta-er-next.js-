'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Menu, X, Globe, User, Settings, LogOut, LayoutDashboard, ChevronDown, ChevronRight } from 'lucide-react';

const Header = ({ language, setLanguage, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logout, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Handle drawer close with ESC key and focus management
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Body scroll lock
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // Restore focus to the pill button
    setTimeout(() => {
      const pill = document.querySelector('button[aria-label="Open menu"]');
      if (pill) pill.focus();
    }, 100);
  };

  const handleLogout = async () => {
    closeDrawer();
    await logout();
    router.push('/');
  };

  const handleRegisterCompany = () => {
    closeDrawer();
    router.push('/register-company');
  };

  const handlePostProject = () => {
    closeDrawer();
    // Always go to job category selection page, no login required
    router.push('/job-categories');
  };

  const handleLogin = () => {
    closeDrawer();
    router.push('/login');
  };

  const handleDrawerItemClick = (path) => {
    closeDrawer();
    if (path !== '#') {
      router.push(path);
    }
  };

  const handlePillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsDrawerOpen(true);
    }
  };

  const getUserDisplayName = () => {
    if (user?.profile?.first_name) {
      return user.profile.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#1a202c] hover:text-[#4f46e5] transition-colors">
              BuildConnect
            </Link>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher - Text Style */}
            <div className="relative">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-10 px-3 bg-transparent hover:bg-gray-50 border-0 text-sm font-medium">
                  <span>{language === 'is' ? 'Icelandic' : 'English'}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="is">Icelandic</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Register Company - Text with Hover Underline */}
            <button 
              onClick={handleRegisterCompany}
              className="text-[#1a202c] hover:text-[#4f46e5] font-medium transition-colors border-b-2 border-transparent hover:border-[#4f46e5]"
            >
              Register Company
            </button>
            
            {/* Post Project Button - Primary */}
            <Button 
              onClick={handlePostProject}
              className="h-10 px-4 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-lg font-medium"
            >
              Post project
            </Button>
            
            {/* Menu Pill - Single Interactive Element */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
              className="inline-flex items-center gap-3 h-11 px-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer transition-colors"
            >
              {/* Hamburger Icon */}
              <Menu className="h-6 w-6 text-gray-600 pointer-events-none" />
              
              {/* Profile Avatar */}
              <User className="h-6 w-6 text-gray-600 pointer-events-none" />
            </button>
          </div>

          {/* Mobile Menu Button - Single Pill Design */}
          <div className="md:hidden">
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
              className="inline-flex items-center gap-3 h-10 px-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer transition-colors"
            >
              {/* Hamburger Icon */}
              <Menu className="h-5 w-5 text-gray-600 pointer-events-none" />
              
              {/* Profile Avatar */}
              <User className="h-5 w-5 text-gray-600 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="flex flex-col space-y-4 px-4">
              {/* Primary Post Project Button */}
              <Button 
                onClick={handlePostProject}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium"
              >
                {translations.postProject}
              </Button>
              
              {/* Language Switcher */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <span>{language === 'is' ? 'Icelandic' : 'English'}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="is">Icelandic</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Register Company - Text Style */}
              <button 
                onClick={handleRegisterCompany}
                className="w-full text-left text-gray-700 hover:text-blue-700 font-medium transition-colors py-2 border-b-2 border-transparent hover:border-blue-700"
              >
                {translations.registerCompany}
              </button>
              
              {!loading && (
                <>
                  {isAuthenticated() ? (
                    <div className="space-y-2 pt-2 border-t">
                      <Link href="/dashboard" className="block">
                        <Button variant="ghost" className="w-full justify-start">
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          {translations.dashboard}
                        </Button>
                      </Link>
                      <Link href="/profile" className="block">
                        <Button variant="ghost" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          {translations.profile}
                        </Button>
                      </Link>
                      <Link href="/settings" className="block">
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          {translations.settings}
                        </Button>
                      </Link>
                      <Button 
                        onClick={handleLogout}
                        variant="ghost" 
                        className="w-full justify-start text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        {translations.logout}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-2 border-t">
                      <Link href="/login" className="block">
                        <Button variant="ghost" className="w-full justify-start">
                          {translations.signIn}
                        </Button>
                      </Link>
                      <Link href="/register" className="block">
                        <Button variant="ghost" className="w-full justify-start">
                          {translations.signUp}
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Right Drawer - Mittanbud Video Match */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black z-40 transition-opacity"
            style={{
              opacity: isDrawerOpen ? 0.2 : 0,
              transitionDuration: '300ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
            }}
            onClick={closeDrawer}
          />
          
          {/* Drawer */}
          <div 
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50"
            style={{
              transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
              transitionProperty: 'transform',
              transitionDuration: '300ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
            }}
          >
            <div className="h-full overflow-y-auto">
              {/* Clean Header - X button only */}
              <div className="flex items-center justify-end p-4">
                <button
                  onClick={closeDrawer}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              
              {/* Drawer Content */}
              <div className="px-4 pb-4">
                {/* Login/Profile Section - First Row with Avatar Icon */}
                {!loading && (
                  <>
                    {isAuthenticated() ? (
                      <>
                        <button
                          onClick={() => handleDrawerItemClick('/profile')}
                          className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center">
                            <User className="h-6 w-6 text-gray-400 mr-3" />
                            <span className="text-gray-800 font-medium">{translations.profile}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDrawerItemClick('/settings')}
                          className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center">
                            <Settings className="h-6 w-6 text-gray-400 mr-3" />
                            <span className="text-gray-800 font-medium">{translations.settings}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center">
                            <LogOut className="h-6 w-6 text-red-400 mr-3" />
                            <span className="text-red-600 font-medium">{translations.logout}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-red-400 group-hover:text-red-600" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center">
                          <User className="h-6 w-6 text-gray-400 mr-3" />
                          <span className="text-gray-800 font-medium">{translations.login}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                      </button>
                    )}
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>
                  </>
                )}
                
                {/* Action Buttons */}
                <button
                  onClick={handlePostProject}
                  className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <span className="text-blue-600 font-semibold">{translations.postProject}</span>
                  <ChevronRight className="h-5 w-5 text-blue-400 group-hover:text-blue-600" />
                </button>
                
                <button
                  onClick={handleRegisterCompany}
                  className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <span className="text-gray-600 font-medium">{translations.registerCompany}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                </button>
                
                {/* Categories Section */}
                <div className="border-t border-gray-200 my-4"></div>
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
                    {translations.categories}
                  </h3>
                </div>
                
                <div className="space-y-1">
                  <button
                    onClick={() => handleDrawerItemClick('/haandverker')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{language === 'is' ? 'Iðnaður' : 'Handcraft'}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('/hus-og-hage')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{language === 'is' ? 'Hús og garður' : 'House & Garden'}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('/alle-kategorier')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{language === 'is' ? 'Allir flokkar' : 'All categories'}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                </div>
                
                {/* Support Links */}
                <div className="border-t border-gray-200 my-4"></div>
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
                    {language === 'is' ? 'Upplýsingar' : 'Information'}
                  </h3>
                </div>
                
                <div className="space-y-1">
                  <button
                    onClick={() => handleDrawerItemClick('/vilkar')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{language === 'is' ? 'Þjónustuskilmálar' : 'Terms of Service'}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('/personvern')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{language === 'is' ? 'Persónuverndarstefna' : 'Privacy Policy'}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;