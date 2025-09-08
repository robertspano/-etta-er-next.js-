'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import apiService from '@/services/api';
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
    router.push('/post-job');
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
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <img 
                src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg" 
                alt="Verki Logo" 
                className="h-12 lg:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-lg"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* Language Selector - Dropdown */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px] h-10 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm hover:bg-slate-700 transition-colors">
                <SelectValue placeholder="Language">
                  {language === 'is' ? 'Icelandic' : 'English'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border border-slate-600 shadow-lg">
                <SelectItem value="is" className="text-white hover:bg-slate-700 focus:bg-slate-700">Icelandic</SelectItem>
                <SelectItem value="en" className="text-white hover:bg-slate-700 focus:bg-slate-700">English</SelectItem>
              </SelectContent>
            </Select>

            {/* Register Company Button */}
            <Link href="/register-company">
              <button className="text-blue-800 hover:text-cyan-400 hover:underline px-4 py-2.5 font-medium text-base transition-all duration-200">
                {language === 'is' ? 'Skrá fyrirtæki' : 'Register Company'}
              </button>
            </Link>

            {/* Post Project Button */}
            <Link href="/post-job">
              <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors">
                {language === 'is' ? 'Setja inn verk' : 'Post Project'}
              </button>
            </Link>

            {/* Combined Menu & Profile Button - White rounded pill */}
            <button 
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="flex items-center gap-3 h-10 px-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer transition-colors"
            >
              {/* Menu Icon */}
              <Menu className="h-5 w-5 text-gray-600" />
              
              {/* Profile Avatar */}
              <User className="h-5 w-5 text-gray-600" />
            </button>
          </nav>

          {/* Mobile Menu Button - Single Pill Design */}
          <div className="md:hidden">
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
              className="inline-flex items-center gap-3 h-10 px-3 bg-white border border-[#E2E8F0] rounded-full hover:bg-[#F8FAFC] focus:bg-[#F8FAFC] focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-1 cursor-pointer transition-colors"
            >
              {/* Hamburger Icon */}
              <Menu className="h-5 w-5 text-[#64748B] pointer-events-none" />
              
              {/* Profile Avatar */}
              <User className="h-5 w-5 text-[#64748B] pointer-events-none" />
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
                <SelectTrigger className="w-full bg-slate-800 border border-slate-600 shadow-sm text-white hover:bg-slate-700 transition-colors">
                  <span>{language === 'is' ? 'Icelandic' : 'English'}</span>
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border border-slate-600 shadow-lg">
                  <SelectItem value="is" className="text-white hover:bg-slate-700 focus:bg-slate-700">Icelandic</SelectItem>
                  <SelectItem value="en" className="text-white hover:bg-slate-700 focus:bg-slate-700">English</SelectItem>
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
                  </>
                )}
                
                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>
                
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
                    onClick={() => handleDrawerItemClick('/categories/handcraft')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{language === 'is' ? 'Iðnaður' : 'Handcraft'}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('/categories/house-garden')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{language === 'is' ? 'Hús og garður' : 'House & Garden'}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('/all-categories')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{language === 'is' ? 'Allir flokkar' : 'All categories'}</span>
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