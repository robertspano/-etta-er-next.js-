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

          {/* Mobile Menu Button - Separate Click Areas */}
          <div className="md:hidden">
            <div className="inline-flex items-center gap-3 h-10 px-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              {/* Hamburger Icon - Opens Menu Drawer */}
              <button
                onClick={handleMenuClick}
                aria-label="Open menu"
                className="p-0 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Profile Avatar - Opens Login Page */}
              <button
                onClick={handleAvatarClick}
                aria-label={isAuthenticated() ? "Open profile" : "Login"}
                className="p-0 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>
            </div>
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
      
      {/* Login Page Slide-in */}
      {isLoginPageOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity duration-300"
            onClick={closeLoginPage}
          />
          
          {/* Login Page */}
          <div 
            className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
              isLoginPageOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full overflow-y-auto">
              {/* Login Page Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{translations.login}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'is' ? 'Skráðu þig inn á þinn aðgang' : 'Sign in to your account'}
                  </p>
                </div>
                <button
                  onClick={closeLoginPage}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close login"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              
              {/* Login Form */}
              <div className="p-6">
                <form className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder={language === 'is' ? 'Sláðu inn netfang þitt' : 'Enter your email'}
                    />
                  </div>
                  
                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.password}
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder={language === 'is' ? 'Sláðu inn lykilorð þitt' : 'Enter your password'}
                    />
                  </div>
                  
                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {language === 'is' ? 'Muna eftir mér' : 'Remember me'}
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {translations.forgotPassword}
                    </button>
                  </div>
                  
                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    {translations.loginButton}
                  </button>
                  
                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        {language === 'is' ? 'eða' : 'or'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Google Login Button */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {language === 'is' ? 'Halda áfram með Google' : 'Continue with Google'}
                  </button>
                  
                  {/* Sign Up Link */}
                  <div className="text-center pt-4">
                    <span className="text-sm text-gray-600">
                      {translations.dontHaveAccount}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        closeLoginPage();
                        navigate('/register');
                      }}
                      className="ml-2 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                    >
                      {translations.signUp}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;