'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home,
  FolderOpen,
  Plus,
  User,
  Zap,
  Hammer,
  Wrench,
  Building,
  Sparkles,
  Car,
  Truck,
  Grid3X3,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ language, translations, isOpen, setIsOpen }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Main navigation items
  const mainNavItems = [
    {
      name: language === 'is' ? 'Heim' : 'Home',
      href: '/dashboard/customer',
      icon: Home
    },
    {
      name: language === 'is' ? 'Mín verkefni' : 'My Projects',
      href: '/dashboard/customer/projects',
      icon: FolderOpen
    },
    {
      name: language === 'is' ? 'Setja inn verk' : 'Post a Project',
      href: '/post-job',
      icon: Plus
    },
    {
      name: language === 'is' ? 'Prófill' : 'Profile',
      href: '/dashboard/customer/profile',
      icon: User
    }
  ];

  // Category items (same as before)
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

  const isActive = (href) => {
    if (href === '/dashboard/customer') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleNavClick = (href) => {
    router.push(href);
    // Close mobile sidebar
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
      `}>
        <div className="h-full overflow-y-auto py-6">
          
          {/* Main Navigation */}
          <nav className="px-3">
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
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
                  </button>
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
                const active = isActive(item.href);
                
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group
                      ${active 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 mr-3 ${active ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    <span className="flex-1 text-left">{item.name}</span>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-blue-700' : 'text-gray-300 group-hover:text-gray-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;