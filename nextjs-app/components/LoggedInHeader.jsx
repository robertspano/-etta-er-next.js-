'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Bell, 
  ChevronDown,
  User,
  Settings,
  LogOut,
  Plus,
  Menu,
  X
} from 'lucide-react';

const LoggedInHeader = ({ language, translations, sidebarOpen, setSidebarOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getUserDisplayName = () => {
    if (user?.profile?.first_name) {
      return user.profile.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="flex items-center justify-between h-full px-4">
        
        {/* Left Section - Logo + Mobile Menu Button */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-3"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Logo */}
          <Link href="/dashboard/customer" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_construction-hub-19/artifacts/k90y66eg_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%281000%20x%201000%20px%29%20%28Logo%29%20%282%29-cropped.svg" 
              alt="Verki Logo" 
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right Section - New Project + Notifications + Profile */}
        <div className="flex items-center space-x-4">
          
          {/* New Project Button */}
          <Link 
            href="/post-job"
            className="hidden sm:inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            {language === 'is' ? 'Nýtt verk' : 'New Project'}
          </Link>

          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                <span className="text-sm font-medium text-gray-700">
                  😊
                </span>
              </div>
              <span className="hidden sm:block font-medium text-gray-900 mr-1">
                {getUserDisplayName()}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setProfileOpen(false)}
                />
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <Link
                    href="/dashboard/customer/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    {language === 'is' ? 'Prófill' : 'Profile'}
                  </Link>
                  <Link
                    href="/dashboard/customer/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    {language === 'is' ? 'Stillingar' : 'Settings'}
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    {language === 'is' ? 'Skrá út' : 'Logout'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoggedInHeader;