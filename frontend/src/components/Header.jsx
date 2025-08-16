import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  const navigate = useNavigate();

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
    navigate('/');
  };

  const handleRegisterCompany = () => {
    closeDrawer();
    if (isAuthenticated()) {
      navigate('/register-professional');
    } else {
      navigate('/register?role=professional');
    }
  };

  const handlePostProject = () => {
    closeDrawer();
    if (isAuthenticated()) {
      navigate('/create-project');
    } else {
      navigate('/login?returnUrl=/create-project');
    }
  };

  const handleLogin = () => {
    closeDrawer();
    navigate('/login');
  };

  const handleDrawerItemClick = (path) => {
    closeDrawer();
    if (path !== '#') {
      navigate(path);
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
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              {translations.siteName}
            </Link>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher - Pill Style */}
            <div className="relative">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-10 px-3 bg-gray-100 hover:bg-gray-200 border-0 rounded-full text-sm font-medium">
                  <Globe className="h-4 w-4 mr-2" />
                  <span>{language.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="is">IS</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Register Company Button - Outline */}
            <Button 
              onClick={handleRegisterCompany}
              variant="outline"
              className="h-10 px-4 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 rounded-xl font-medium"
            >
              {translations.registerCompany}
            </Button>
            
            {/* Post Project Button - Primary */}
            <Button 
              onClick={handlePostProject}
              className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium"
            >
              {translations.postProject}
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
                  <Globe className="h-4 w-4 mr-2" />
                  <span>{language.toUpperCase()}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="is">IS</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Register Company Button */}
              <Button 
                onClick={handleRegisterCompany}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
              >
                {translations.registerCompany}
              </Button>
              
              {!loading && (
                <>
                  {isAuthenticated() ? (
                    <div className="space-y-2 pt-2 border-t">
                      <Link to="/dashboard" className="block">
                        <Button variant="ghost" className="w-full justify-start">
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          {translations.dashboard}
                        </Button>
                      </Link>
                      <Link to="/profile" className="block">
                        <Button variant="ghost" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          {translations.profile}
                        </Button>
                      </Link>
                      <Link to="/settings" className="block">
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
                      <Link to="/login" className="block">
                        <Button variant="ghost" className="w-full justify-start">
                          {translations.signIn}
                        </Button>
                      </Link>
                      <Link to="/register" className="block">
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
      
      {/* Right Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity duration-300"
            onClick={closeDrawer}
          />
          
          {/* Drawer */}
          <div 
            className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
              isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full overflow-y-auto">
              {/* Drawer Header - Clean, X button only */}
              <div className="flex items-center justify-end p-4">
                <button
                  onClick={closeDrawer}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-gray-600" />
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
                        
                        {/* Divider */}
                        <div className="border-t border-gray-200 my-4"></div>
                      </>
                    ) : (
                      <>
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
                        
                        {/* Divider */}
                        <div className="border-t border-gray-200 my-4"></div>
                      </>
                    )}
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
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{translations.handcraft}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{translations.homeGarden}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{translations.interiorRenovation}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{translations.buildNew}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{translations.services}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-700">{translations.companySearch}</span>
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                        {translations.new}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{translations.majorProjects}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-700">{translations.housingAssociations}</span>
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