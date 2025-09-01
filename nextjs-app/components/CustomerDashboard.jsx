'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const CustomerDashboard = ({ translations, language }) => {
  const router = useRouter();

  return (
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
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14-7l-7 7-7-7"/>
              </svg>
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
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
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
  );
};

export default CustomerDashboard;