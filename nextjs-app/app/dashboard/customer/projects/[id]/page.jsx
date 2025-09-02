"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from '../../../../../contexts/TranslationsContext';
import { useAuth } from '../../../../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ProjectDetailPage() {
  const { language } = useTranslations();
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchProject = async () => {
      if (!user || !params.id) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/api/job-requests/${params.id}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        } else {
          console.error('Failed to fetch project:', response.status);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [user, params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {language === 'is' ? 'Verkefni fannst ekki' : 'Project not found'}
          </h2>
          <Link 
            href="/dashboard/customer/projects"
            className="text-blue-600 hover:text-blue-700"
          >
            {language === 'is' ? 'Til baka í verkefni' : 'Back to projects'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <Link 
                href="/post"
                className="hidden sm:inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Nýtt verk
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/dashboard/customer/projects"
            className="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'is' ? 'Til baka í verkefni' : 'Back to projects'}
          </Link>
        </div>

        {/* Project Header */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {project.title || `${project.category} verkefni`}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(project.posted_at).toLocaleDateString('is-IS')}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.postcode}
                  </span>
                </div>
              </div>
              <div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
              </div>
            </div>

            {/* Status Info */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-sm text-orange-800">
                  {language === 'is' 
                    ? 'Verkefnið væntar samþykktar frá stjórnendum. Það verður birt opinberlega eftir samþykkt.'
                    : 'The project is awaiting approval from administrators. It will be published publicly after approval.'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {language === 'is' ? 'Verkefnið' : 'The Job'}
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'messages'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-2 inline" />
                {language === 'is' ? 'Skilaboð' : 'Messages'}
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'details' ? (
              <div className="space-y-6">
                {/* Job Description */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {language === 'is' ? 'Lýsing' : 'Description'}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {project.description || (language === 'is' ? 'Engin lýsing gefin.' : 'No description provided.')}
                  </p>
                </div>

                {/* Address */}
                {project.address && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      {language === 'is' ? 'Staðsetning' : 'Location'}
                    </h3>
                    <p className="text-gray-700">
                      {project.address}, {project.postcode}
                    </p>
                  </div>
                )}

                {/* Category */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {language === 'is' ? 'Flokkur' : 'Category'}
                  </h3>
                  <p className="text-gray-700 capitalize">
                    {project.category}
                  </p>
                </div>

                {/* Quotes */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {language === 'is' ? 'Tilboð' : 'Quotes'}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {project.quotes_count || 0} {language === 'is' ? 'tilboð móttekin' : 'quotes received'}
                      </span>
                    </div>
                    {project.quotes_count === 0 && (
                      <p className="text-sm text-gray-500 mt-2">
                        {language === 'is' 
                          ? 'Engin tilboð ennþá. Tilboð munu birtast hér þegar verkefnið hefur verið samþykkt.'
                          : 'No quotes yet. Quotes will appear here once the project has been approved.'
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Messages Tab */
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'is' ? 'Engin skilaboð' : 'No messages'}
                </h3>
                <p className="text-gray-600">
                  {language === 'is' 
                    ? 'Skilaboð frá fagfólki munu birtast hér þegar þú færð tilboð.'
                    : 'Messages from professionals will appear here when you receive quotes.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}