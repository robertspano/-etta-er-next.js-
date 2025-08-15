import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PlusCircle, FileText, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import apiService from '../../services/api';

const CustomerDashboard = ({ translations, language, user }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingQuotes: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const projectsData = await apiService.getProjects();
      setProjects(projectsData || []);
      
      // Calculate stats
      const active = projectsData?.filter(p => p.status === 'active').length || 0;
      const completed = projectsData?.filter(p => p.status === 'completed').length || 0;
      
      setStats({
        totalProjects: projectsData?.length || 0,
        activeProjects: active,
        completedProjects: completed,
        pendingQuotes: projectsData?.filter(p => p.status === 'pending').length || 0,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'completed': return 'default';
      case 'active': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(language === 'is' ? 'is-IS' : 'en-US');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {translations.myDashboard}
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.profile?.first_name || user.email}!
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          {translations.postProject}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.myProjects}</p>
              <p className="text-2xl font-bold">{stats.totalProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold">{stats.activeProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.completedProjects}</p>
              <p className="text-2xl font-bold">{stats.completedProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <MessageCircle className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Quotes</p>
              <p className="text-2xl font-bold">{stats.pendingQuotes}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">{translations.myProjects}</TabsTrigger>
          <TabsTrigger value="quotes">{translations.myQuotes}</TabsTrigger>
          <TabsTrigger value="messages">{translations.myMessages}</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{translations.myProjects}</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No projects yet. Post your first project to get started!</p>
                  <Button className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    {translations.postProject}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{project.service || 'General Project'}</h3>
                        <Badge variant={getStatusBadgeVariant(project.status)}>
                          {project.status || 'pending'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{project.location}</span>
                        <span>{formatDate(project.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{translations.myQuotes}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No quotes received yet. Post a project to receive quotes from professionals!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{translations.myMessages}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No messages yet. Messages will appear here when you start communicating with professionals.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;