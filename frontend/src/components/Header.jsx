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

  // Handle drawer close with ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
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

  const handleLogout = async () => {
    setIsDrawerOpen(false);
    await logout();
    navigate('/');
  };

  const handleRegisterCompany = () => {
    setIsDrawerOpen(false);
    if (isAuthenticated()) {
      navigate('/register-professional');
    } else {
      navigate('/register?role=professional');
    }
  };

  const handlePostProject = () => {
    setIsDrawerOpen(false);
    if (isAuthenticated()) {
      navigate('/create-project');
    } else {
      navigate('/login?returnUrl=/create-project');
    }
  };

  const handleLogin = () => {
    setIsDrawerOpen(false);
    navigate('/login');
  };

  const handleDrawerItemClick = (path) => {
    setIsDrawerOpen(false);
    if (path !== '#') {
      navigate(path);
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
            
            {/* Menu Pill - Hamburger | Divider | Avatar */}
            <div className="inline-flex items-center gap-2.5 h-11 px-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1">
              {/* Hamburger Icon */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open menu"
                className="p-0 hover:opacity-70 transition-opacity focus:outline-none focus:opacity-70"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              
              {/* Vertical Divider */}
              <div className="w-px h-6 bg-gray-200"></div>
              
              {/* Profile Avatar */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open profile menu"
                className="p-0 hover:opacity-70 transition-opacity focus:outline-none focus:opacity-70"
              >
                <User className="h-6 w-6 text-gray-600" />
              </button>
            </div>
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="h-full overflow-y-auto">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <Button
                  onClick={() => setIsDrawerOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Drawer Content */}
              <div className="p-4 space-y-2">
                {/* Auth Section */}
                {!loading && (
                  <>
                    {isAuthenticated() ? (
                      <div className="space-y-1 pb-4 border-b">
                        <button
                          onClick={() => handleDrawerItemClick('/profile')}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{translations.profile}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDrawerItemClick('/settings')}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{translations.settings}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg text-red-600"
                        >
                          <span>{translations.logout}</span>
                          <ChevronRight className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    ) : (
                      <div className="pb-4 border-b">
                        <button
                          onClick={handleLogin}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{translations.login}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    )}
                  </>
                )}
                
                {/* Action Buttons */}
                <div className="space-y-1 pb-4 border-b">
                  <button
                    onClick={handlePostProject}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{translations.postProject}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  <button
                    onClick={handleRegisterCompany}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{translations.registerCompany}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                
                {/* Categories Section */}
                <div className="space-y-1">
                  <div className="px-3 py-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {translations.categories}
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{translations.handcraft}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{translations.homeGarden}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{translations.interiorRenovation}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{translations.buildNew}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{translations.services}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">{translations.companySearch}</span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {translations.new}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{translations.majorProjects}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  <button
                    onClick={() => handleDrawerItemClick('#')}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{translations.housingAssociations}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
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