import React, { useState } from 'react';
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
import { Menu, X, Globe, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';

const Header = ({ language, setLanguage, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handlePostProject = () => {
    if (isAuthenticated()) {
      // Redirect to project creation page
      navigate('/create-project');
    } else {
      // Redirect to login with return URL
      navigate('/login?returnUrl=/create-project');
    }
  };

  const getUserDisplayName = () => {
    if (user?.profile?.first_name) {
      return user.profile.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              {translations.siteName}
            </Link>
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
            
            <Button 
              onClick={handlePostProject}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {translations.postProject}
            </Button>
            
            {!loading && (
              <>
                {isAuthenticated() ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <User className="h-4 w-4 mr-2" />
                        {getUserDisplayName()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5 text-sm font-medium text-gray-700">
                        {user?.email}
                      </div>
                      <div className="px-2 py-1.5 text-xs text-gray-500 capitalize">
                        {user?.role}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center">
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          {translations.dashboard}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          {translations.profile}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        {translations.logout}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login">
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        {translations.signIn}
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        {translations.signUp}
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
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
                  <Button 
                    onClick={handlePostProject}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {translations.postProject}
                  </Button>
                  
                  {!loading && (
                    <>
                      {isAuthenticated() ? (
                        <div className="space-y-2">
                          <Link to="/dashboard" className="block">
                            <Button variant="outline" className="w-full">
                              <LayoutDashboard className="h-4 w-4 mr-2" />
                              {translations.dashboard}
                            </Button>
                          </Link>
                          <Link to="/profile" className="block">
                            <Button variant="outline" className="w-full">
                              <Settings className="h-4 w-4 mr-2" />
                              {translations.profile}
                            </Button>
                          </Link>
                          <Button 
                            onClick={handleLogout}
                            variant="outline" 
                            className="w-full text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            {translations.logout}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Link to="/login" className="block">
                            <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                              {translations.signIn}
                            </Button>
                          </Link>
                          <Link to="/register" className="block">
                            <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              {translations.signUp}
                            </Button>
                          </Link>
                        </div>
                      )}
                    </>
                  )}
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