"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from '../../../../contexts/TranslationsContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { 
  Bell, 
  Menu, 
  X, 
  Plus,
  Home,
  FolderOpen,
  User,
  ChevronRight,
  Hammer,
  Wrench,
  Building,
  Sparkles,
  Car,
  Truck,
  Grid3X3
} from 'lucide-react';

export default function CustomerProjectsPage() {
  const { t, language } = useTranslations();
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  useEffect(() => {
    // Fetch user's projects from API
    const fetchProjects = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // Fetch user's job requests from backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/api/job-requests`, {
          credentials: 'include', // Include cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Backend returns array directly, not wrapped in jobs object
          setProjects(Array.isArray(data) ? data : []);
        } else {
          console.error('Failed to fetch projects:', response.status);
          setProjects([]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'open' || p.status === 'in_progress');
  const finishedProjects = projects.filter(p => p.status === 'completed' || p.status === 'cancelled');

  const currentProjects = activeTab === 'active' ? activeProjects : finishedProjects;

  // Main navigation items
  const mainNavItems = [
    {
      name: language === 'is' ? 'Heim' : 'Home',
      href: '/dashboard/customer',
      icon: Home,
      active: false
    },
    {
      name: language === 'is' ? 'Mín verkefni' : 'My Projects',
      href: '/dashboard/customer/projects',
      icon: FolderOpen,
      active: true
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
      name: language === 'is' ? 'Handverk' : 'Handcraft',
      href: '/post/handcraft',
      icon: Hammer
    },
    {
      name: language === 'is' ? 'Baðherbergi' : 'Bathroom',
      href: '/post/bathroom',
      icon: Wrench
    },
    {
      name: language === 'is' ? 'Stórt verkefni' : 'Major Projects',
      href: '/post/major-projects',
      icon: Building
    },
    {
      name: language === 'is' ? 'Þrif' : 'Cleaning',
      href: '/post/cleaning',
      icon: Sparkles
    },
    {
      name: language === 'is' ? 'Bifreiðar' : 'Automotive',
      href: '/post/automotive',
      icon: Car
    },
    {
      name: language === 'is' ? 'Flutningar' : 'Moving',
      href: '/post/moving',
      icon: Truck
    },
    {
      name: language === 'is' ? 'Öll verkefni' : 'All Categories',
      href: '/all-categories',
      icon: Grid3X3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mittanbud style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
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
            <div className="flex items-center gap-3">
              {/* New Project Button */}
              <button 
                onClick={() => router.push('/post')}
                className="hidden sm:inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nýtt verk
              </button>

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

              {/* Menu Button - Like dashboard style with custom profile image */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-3 h-10 px-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer transition-colors"
              >
                {/* Hamburger Menu Icon */}
                <Menu className="h-5 w-5 text-gray-600" />
                
                {/* Profile Image */}
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
        </div>
      </div>

      {/* Main Content - Mittanbud layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Page Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Mín verk</h1>
          </div>

          {/* Tabs - Mittanbud style */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'active'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Virk
              </button>
              <button
                onClick={() => setActiveTab('finished')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'finished'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Lokið
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : currentProjects.length === 0 ? (
              // Empty State - matching Mittanbud exactly
              <div className="text-center py-16">
                <div className="bg-gray-50 rounded-lg p-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === 'active' ? 'Engin virk verk' : 'Engin lokið verk'}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {activeTab === 'active' 
                      ? 'Búðu til nýtt verk til að fá tilboð frá hæfum fagfyrirtækjum. Algjörlega óbindandi og ókeypis!'
                      : 'Þú hefur ekki lokið neinum verkum ennþá.'
                    }
                  </p>
                  {activeTab === 'active' && (
                    <button
                      onClick={() => router.push('/post')}
                      className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md font-medium"
                    >
                      Legg út verk
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              // Project List - Mittanbud style
              <div className="space-y-4">
                {currentProjects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {project.title || `${project.category} verkefni` || 'Verkefni'}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              project.status === 'open' 
                                ? 'bg-orange-100 text-orange-800' 
                                : project.status === 'draft'
                                ? 'bg-gray-100 text-gray-800'
                                : project.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {project.status === 'open' 
                                ? (language === 'is' ? 'Væntar samþykktar' : 'Awaiting approval')
                                : project.status === 'draft'
                                ? (language === 'is' ? 'Drög' : 'Draft')
                                : project.status === 'completed'
                                ? (language === 'is' ? 'Lokið' : 'Completed')
                                : (language === 'is' ? 'Virkt' : 'Active')
                              }
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(project.posted_at).toLocaleDateString('is-IS')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {project.description?.substring(0, 100)}
                            {project.description?.length > 100 ? '...' : ''}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <span className="flex items-center">
                              📄 {project.quotes_count || 0} {language === 'is' ? 'tilboð' : 'quotes'}
                            </span>
                            {project.postcode && (
                              <span>📍 {project.postcode}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <Link
                          href={`/dashboard/customer/projects/${project.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          {language === 'is' ? 'Opna' : 'Open'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Slide-in Menu */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={() => setSidebarOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
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

              {/* Navigation Content */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="px-6">
                  {/* Main Navigation */}
                  <nav className="space-y-2">
                    {mainNavItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
                            item.active 
                              ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                              : 'text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <Icon className={`w-5 h-5 mr-3 ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Categories Section */}
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                      {language === 'is' ? 'Flokkar' : 'Categories'}
                    </h4>
                    <nav className="space-y-2">
                      {categoryItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                          >
                            <div className="flex items-center">
                              <Icon className="w-5 h-5 mr-3 text-gray-400" />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}