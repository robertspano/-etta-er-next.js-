"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../../../contexts/TranslationsContext';
import { Bell, Menu, X, Plus } from 'lucide-react';

export default function CustomerProjectsPage() {
  const { t, language } = useTranslations();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('active');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching projects - replace with actual API call
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API response
        setProjects([
          // Example finished project (uncomment to test)
          // {
          //   id: 1,
          //   title: 'Baðherbergisverkefni',
          //   status: 'completed',
          //   company: 'Nordic Construction AS',
          //   lastContact: '6 dagar síðan',
          //   description: 'Engin bedrifter har tatt kontakt - Lagt ut 6 dagar síðan',
          //   type: 'bathroom'
          // }
        ]);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'open' || p.status === 'in_progress');
  const finishedProjects = projects.filter(p => p.status === 'completed' || p.status === 'cancelled');

  const currentProjects = activeTab === 'active' ? activeProjects : finishedProjects;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mittanbud style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/dashboard/customer')}
                className="flex-shrink-0"
              >
                <span className="text-2xl font-bold text-blue-900">verki</span>
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/post')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Nýtt verk
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">😊</span>
                </div>
              </div>
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
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                          <p className="text-sm text-gray-600">{project.description}</p>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Opna
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}