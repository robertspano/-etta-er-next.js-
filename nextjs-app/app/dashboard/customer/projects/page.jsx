'use client';

import React from 'react';
import LoggedInLayout from '../../../../components/LoggedInLayout';
import { useTranslations } from '../../../../contexts/TranslationsContext';
import { useAuth } from '../../../../contexts/AuthContext';
import Link from 'next/link';
import { Plus, FileText, Clock, CheckCircle } from 'lucide-react';

export default function ProjectsPage() {
  const { language, translations } = useTranslations();
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  // Mock projects data - replace with real data
  const projects = []; // Empty for now

  return (
    <LoggedInLayout language={language} translations={translations}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'is' ? 'Mín verkefni' : 'My Projects'}
          </h1>
          <Link 
            href="/post-job"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            {language === 'is' ? 'Nýtt verk' : 'New Project'}
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-blue-500 py-2 px-1 text-sm font-medium text-blue-600">
              {language === 'is' ? 'Öll verkefni' : 'All Projects'}
            </button>
            <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              {language === 'is' ? 'Virk' : 'Active'} (0)
            </button>
            <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              {language === 'is' ? 'Lokið' : 'Completed'} (0)
            </button>
          </nav>
        </div>

        {/* Empty State */}
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'is' ? 'Engin verkefni ennþá' : 'No projects yet'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {language === 'is'
                ? 'Þegar þú hefur búið til verkefni munu þau birtast hér. Byrjaðu með því að búa til þitt fyrsta verkefni.'
                : 'When you create projects, they will appear here. Start by creating your first project.'
              }
            </p>
            <Link 
              href="/post-job"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              {language === 'is' ? 'Búa til fyrsta verkefni' : 'Create First Project'}
            </Link>
          </div>
        ) : (
          /* Projects List - for future use */
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(project.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {project.offers_count || 0} {language === 'is' ? 'tilboð' : 'offers'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : project.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status === 'active' && <CheckCircle className="w-4 h-4 mr-1" />}
                      {project.status === 'active' 
                        ? (language === 'is' ? 'Virkt' : 'Active')
                        : project.status === 'completed'
                        ? (language === 'is' ? 'Lokið' : 'Completed')
                        : (language === 'is' ? 'Drög' : 'Draft')
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LoggedInLayout>
  );
}