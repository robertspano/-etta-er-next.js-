'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  ChevronDown,
  User,
  Settings,
  LogOut,
  Plus,
  Menu,
  X,
  Home,
  FolderOpen,
  Zap,
  Hammer,
  Wrench,
  Building,
  Sparkles,
  Car,
  Truck,
  Grid3X3,
  ChevronRight,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useTranslations } from '../../../contexts/TranslationsContext';

export default function CustomerDashboardPage() {
  const { language, translations } = useTranslations();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const router = useRouter();
  const notificationRef = useRef(null);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };

    if (notificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationOpen]);

  // Authentication function - redirect to Firebase phone auth
  const startAuthentication = () => {
    window.location.href = "/verify-identity";
  };

  // Main navigation items
  const mainNavItems = [
    {
      name: language === 'is' ? 'Heim' : 'Home',
      href: '/dashboard/customer',
      icon: Home,
      active: true
    },
    {
      name: language === 'is' ? 'Mín verkefni' : 'My Projects',
      href: '/dashboard/customer/projects',
      icon: FolderOpen
    },
    {
      name: language === 'is' ? 'Setja inn verk' : 'Post a Project',
      href: '/post',
      icon: Plus
    },
    {
      name: language === 'is' ? 'Prófill' : 'Profile',
      href: '/dashboard/customer/profile',
      icon: User
    }
  ];

  // Category items
  const categoryItems = [
    {
      name: language === 'is' ? 'Rafvirki' : 'Electrician',
      href: '/post/electrical',
      icon: Zap
    },
    {
      name: language === 'is' ? 'Trésmíðameistari' : 'Carpenter',
      href: '/post/handcraft',
      icon: Hammer
    },
    {
      name: language === 'is' ? 'Pípulagningamaður' : 'Plumber',
      href: '/post/plumbing',
      icon: Wrench
    },
    {
      name: language === 'is' ? 'Verktaki' : 'Contractor',
      href: '/post/construction',
      icon: Building
    },
    {
      name: language === 'is' ? 'Þrif' : 'Cleaning',
      href: '/post/cleaning',
      icon: Sparkles
    },
    {
      name: language === 'is' ? 'Bílverkstæði' : 'Car Service',
      href: '/post/automotive',
      icon: Car
    },
    {
      name: language === 'is' ? 'Flutningar' : 'Moving',
      href: '/post/moving',
      icon: Truck
    },
    {
      name: language === 'is' ? 'Allir flokkar' : 'All Categories',
      href: '/all-categories',
      icon: Grid3X3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
        <div className="flex items-center justify-between h-full px-4">
          
          {/* Left Section - Logo */}
          <div className="flex items-center">
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
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
              >
                <Bell className="w-5 h-5" />
              </button>

              {/* Notification Dropdown - Mittanbud style */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Varslingar</h3>
                    <button 
                      onClick={() => setNotificationOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Bell className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Engar nýjar varslingar
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Hér var það tómt. Komdu aftur seinna.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Menu Button - Like hero section style with custom profile image */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-3 h-10 px-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer transition-colors"
            >
              {/* Hamburger Menu Icon */}
              <Menu className="h-5 w-5 text-gray-600" />
              
              {/* Custom Profile Image */}
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-gray-50">
                <img 
                  src="https://customer-assets.emergentagent.com/job_verkefni-hub/artifacts/14ma9nv6_smiling-emoticon-square-face.png" 
                  alt="Profile"
                  className="w-5 h-5 object-contain"
                />
              </div>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content - Full Width */}
      <div className="pt-16">
        <main className="py-8">
          <div className="max-w-6xl mx-auto px-6">
            {/* My Projects Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {language === 'is' ? 'Mín verkefni' : 'My Projects'}
                </h1>
                <Link 
                  href="/dashboard/customer/projects" 
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center border border-gray-300 px-4 py-2 rounded-lg"
                >
                  {language === 'is' ? 'Sýna öll' : 'Show all'}
                </Link>
              </div>
              
              {/* Empty State - exactly like mittanbud.no */}
              <div className="bg-gray-100 rounded-lg p-12 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'is' ? 'Engin virk verkefni' : 'No active projects'}
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  {language === 'is' 
                    ? 'Búðu til nýtt verkefni til að fá tilboð frá hæfum fyrirtækjum. Algjörlega óbindandi og ókeypis!'
                    : 'Create a new project to receive offers from qualified companies. Completely non-binding and free!'
                  }
                </p>
                <Link 
                  href="/post-job"
                  className="inline-flex items-center border border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  {language === 'is' ? 'Legg út verk' : 'Post a project'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Identity Verification Section - exactly like mittanbud.no */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {language === 'is' ? 'Staðfesta auðkenni á Verki' : 'Verify your identity on Verki'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'is'
                        ? 'Staðfestu að þú ert þú með rafrænu auðkenni. Þú virðist áreiðanlegri og eykur möguleikann á fleiri og betri svörum frá fyrirtækjum.'
                        : 'Confirm that you are you with electronic ID. You appear more reliable and increase the chance of more and better responses from companies.'
                      }
                    </p>
                  </div>
                </div>
                <button 
                  onClick={startAuthentication}
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors ml-4 whitespace-nowrap"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {language === 'is' ? 'Staðfesta með rafrænum skilríkjum' : 'Verify with Electronic ID'}
                </button>
              </div>
            </div>

            {/* Categories Section - Like hero section layout */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {language === 'is' 
                  ? 'Fá verkefnið gert af skikkeligum fagfólki' 
                  : 'Get the job done by proper professionals'
                }
              </h2>
              
              {/* Categories Grid - Same as hero section */}
              <div className="flex justify-center">
                <div className="inline-block bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-4 divide-x divide-gray-200">
                    {/* Row 1 */}
                    <Link
                      href="/post/electrical"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Zap className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Rafvirki' : 'Electrician'}
                      </span>
                    </Link>

                    <Link
                      href="/post/handcraft"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Hammer className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Trésmíðameistari' : 'Carpenter'}
                      </span>
                    </Link>

                    <Link
                      href="/post/plumbing"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Wrench className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Pípulagningamaður' : 'Plumber'}
                      </span>
                    </Link>

                    <Link
                      href="/post/handcraft"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <User className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Iðnaðarmenn' : 'Handyman'}
                      </span>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-4 divide-x divide-gray-200">
                    {/* Row 2 */}
                    <Link
                      href="/post/construction"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Building className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Verktaki' : 'Contractor'}
                      </span>
                    </Link>

                    <Link
                      href="/categories/house-garden"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Home className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Verandir' : 'Terrace'}
                      </span>
                    </Link>

                    <Link
                      href="/post/cleaning"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Sparkles className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Þrif' : 'Cleaning'}
                      </span>
                    </Link>

                    <Link
                      href="/post/automotive"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Car className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Bílverkstæði' : 'Car Service'}
                      </span>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-4 divide-x divide-gray-200">
                    {/* Row 3 */}
                    <Link
                      href="/post/moving"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Truck className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Flutningar' : 'Moving'}
                      </span>
                    </Link>

                    <Link
                      href="/post/bathroom"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" strokeWidth={1.5}>
                          <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                          <circle cx="10" cy="10" r="0.5"/>
                          <circle cx="12" cy="10" r="0.5"/>
                          <circle cx="14" cy="10" r="0.5"/>
                          <circle cx="9" cy="12" r="0.5"/>
                          <circle cx="11" cy="12" r="0.5"/>
                          <circle cx="13" cy="12" r="0.5"/>
                          <circle cx="15" cy="12" r="0.5"/>
                          <circle cx="10" cy="14" r="0.5"/>
                          <circle cx="12" cy="14" r="0.5"/>
                          <circle cx="14" cy="14" r="0.5"/>
                        </svg>
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Baðherbergi' : 'Bathroom'}
                      </span>
                    </Link>

                    <Link
                      href="/post/housing-associations"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Building className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Íbúðasamfélög' : 'Housing'}
                      </span>
                    </Link>

                    <Link
                      href="/all-categories"
                      className="group flex flex-col items-center justify-center p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-200 w-[140px] lg:w-[180px] h-[120px] lg:h-[140px]"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 text-blue-600 mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <Grid3X3 className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight h-8 lg:h-10 flex items-center justify-center">
                        {language === 'is' ? 'Allir flokkar' : 'All Categories'}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Right Slide-in Menu - Like mittanbud.no */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Menu Drawer - Slides in from RIGHT, wider like hero section */}
          <div className={`
            fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <div className="h-full overflow-y-auto">
              
              {/* Close button - top right */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Profile Section - Like mittanbud.no */}
              <div className="px-6 pb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex items-center justify-center bg-gray-50">
                    <img 
                      src="https://customer-assets.emergentagent.com/job_verkefni-hub/artifacts/14ma9nv6_smiling-emoticon-square-face.png" 
                      alt="Profile"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Róbert Spanó
                    </h3>
                    <p className="text-sm text-gray-500">
                      robertstefansson2404@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mx-6"></div>

              {/* Main Navigation */}
              <div className="px-6 py-4">
                <div className="space-y-2">
                  <Link
                    href="/dashboard/customer"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <Home className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">
                        {language === 'is' ? 'Heim' : 'Home'}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                  </Link>

                  <Link
                    href="/dashboard/customer/projects"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <FolderOpen className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">
                        {language === 'is' ? 'Mín verkefni' : 'My Projects'}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                  </Link>

                  <Link
                    href="/post"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <Plus className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">
                        {language === 'is' ? 'Setja inn verkefni' : 'Post Project'}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                  </Link>

                  <Link
                    href="/dashboard/customer/profile"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">
                        {language === 'is' ? 'Prófíll' : 'Profile'}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mx-6"></div>

              {/* Categories */}
              <div className="px-6 py-4">
                <div className="space-y-2">
                  <Link
                    href="/categories/handcraft"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <Hammer className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">
                        {language === 'is' ? 'Iðnaður' : 'Handcraft'}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                  </Link>

                  <Link
                    href="/categories/house-garden"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <Home className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">
                        {language === 'is' ? 'Hús og garður' : 'House & Garden'}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                  </Link>

                  <Link
                    href="/all-categories"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <Grid3X3 className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium">
                        {language === 'is' ? 'Allir flokkar' : 'All Categories'}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mx-6"></div>

              {/* Logout */}
              <div className="px-6 py-4">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    router.push('/');
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5 mr-3 text-red-400" />
                    <span className="font-medium">
                      {language === 'is' ? 'Skrá út' : 'Logout'}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-red-300" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}