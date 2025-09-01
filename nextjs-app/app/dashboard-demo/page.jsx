'use client';

import React, { useState } from 'react';
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
import { useTranslations } from '../../contexts/TranslationsContext';

export default function DashboardDemo() {
  const { language, translations } = useTranslations();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  // Main navigation items
  const mainNavItems = [
    {
      name: language === 'is' ? 'Heim' : 'Home',
      href: '/dashboard-demo',
      icon: Home,
      active: true
    },
    {
      name: language === 'is' ? 'Mín verkefni' : 'My Projects',
      href: '/dashboard-demo/projects',
      icon: FolderOpen
    },
    {
      name: language === 'is' ? 'Setja inn verk' : 'Post a Project',
      href: '/post-job',
      icon: Plus
    },
    {
      name: language === 'is' ? 'Prófill' : 'Profile',
      href: '/dashboard-demo/profile',
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
            <Link href="/dashboard-demo" className="flex items-center">
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
                  Róbert
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileOpen(false)}
                  />
                  
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <Link
                      href="/dashboard-demo/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      {language === 'is' ? 'Prófill' : 'Profile'}
                    </Link>
                    <Link
                      href="/dashboard-demo/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      {language === 'is' ? 'Stillingar' : 'Settings'}
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => router.push('/')}
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
      
      {/* Main Content */}
      <div className="flex pt-16">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0
        `}>
          <div className="h-full overflow-y-auto py-6">
            
            {/* Main Navigation */}
            <nav className="px-3">
              <div className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = item.active;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                        ${active 
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${active ? 'text-blue-700' : 'text-gray-500'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Divider */}
            <div className="my-6 px-3">
              <div className="border-t border-gray-200"></div>
            </div>

            {/* Categories */}
            <div className="px-3">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {language === 'is' ? 'Flokkar' : 'Categories'}
              </h3>
              <div className="space-y-1">
                {categoryItems.map((item) => {
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <Icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-500" />
                      <span className="flex-1 text-left">{item.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          <main className="py-8">
            <div className="max-w-6xl mx-auto px-6">
              {/* My Projects Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {language === 'is' ? 'Mín verkefni' : 'My Projects'}
                  </h1>
                  <Link 
                    href="/dashboard-demo/projects" 
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
                  <button className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors ml-4 whitespace-nowrap">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {language === 'is' ? 'Staðfesta með rafrænu auðkenni' : 'Verify with Electronic ID'}
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Post New Project Card */}
                <Link 
                  href="/post-job"
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Plus className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'is' ? 'Setja inn nýtt verk' : 'Post New Project'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'is' 
                      ? 'Fáðu tilboð frá hæfum fagmönnum í þínu svæði'
                      : 'Get quotes from qualified professionals in your area'
                    }
                  </p>
                </Link>

                {/* Browse Categories Card */}
                <Link 
                  href="/all-categories"
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Grid3X3 className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'is' ? 'Skoða flokka' : 'Browse Categories'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'is' 
                      ? 'Finndu rétta þjónustuna fyrir verkefnið þitt'
                      : 'Find the right service for your project'
                    }
                  </p>
                </Link>

                {/* Help & Support Card */}
                <Link 
                  href="/help"
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'is' ? 'Hjálp og stuðningur' : 'Help & Support'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'is' 
                      ? 'Fáðu aðstoð með spurningunum þínum'
                      : 'Get help with your questions'
                    }
                  </p>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}