import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Briefcase, 
  FileText, 
  Calendar, 
  MessageCircle, 
  Clock, 
  DollarSign,
  TrendingUp,
  Users,
  User,
  AlertCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import apiService from '../../services/api';
import JobBidding from '../marketplace/JobBidding';

const ProfessionalDashboard = ({ translations, language, user }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    availableJobs: 0,
    activeQuotes: 0,
    completedProjects: 0,
    monthlyEarnings: 0,
  });

  // My Quotes state
  const [myQuotes, setMyQuotes] = useState([]);
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [quotesError, setQuotesError] = useState('');
  const [quotesPagination, setQuotesPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Messages state
  const [conversations, setConversations] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState('');

  useEffect(() => {
    loadDashboardData();
    loadMyQuotes();
    loadConversations();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load available jobs count
      const jobsResponse = await apiService.getJobRequests({ 
        status: 'open', 
        limit: 1, 
        page: 1 
      });
      
      // Load active quotes
      const quotesResponse = await apiService.getQuotes({ 
        professional_id: user.id,
        status: 'submitted',
        limit: 1,
        page: 1
      });
      
      setStats({
        availableJobs: jobsResponse.total || 0,
        activeQuotes: quotesResponse.total || 0,
        completedProjects: 12, // TODO: Add API endpoint for completed projects
        monthlyEarnings: 2450000, // TODO: Add API endpoint for earnings
      });
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const loadMyQuotes = async () => {
    try {
      setQuotesLoading(true);
      setQuotesError('');
      
      const response = await apiService.getQuotes({
        professional_id: user.id,
        page: quotesPagination.page,
        limit: quotesPagination.limit
      });
      
      setMyQuotes(response.quotes || []);
      setQuotesPagination(prev => ({
        ...prev,
        total: response.total || 0,
        totalPages: Math.ceil((response.total || 0) / prev.limit)
      }));
      
    } catch (error) {
      console.error('Failed to load quotes:', error);
      setQuotesError(error.message || 'Failed to load quotes');
    } finally {
      setQuotesLoading(false);
    }
  };

  const loadConversations = async () => {
    try {
      setMessagesLoading(true);
      setMessagesError('');
      
      const response = await apiService.getConversations();
      setConversations(response.conversations || []);
      
    } catch (error) {
      console.error('Failed to load conversations:', error);
      setMessagesError(error.message || 'Failed to load conversations');
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleWithdrawQuote = async (quoteId) => {
    try {
      await apiService.withdrawQuote(quoteId);
      loadMyQuotes(); // Refresh quotes
      loadDashboardData(); // Refresh stats
    } catch (error) {
      console.error('Failed to withdraw quote:', error);
      setQuotesError(error.message || 'Failed to withdraw quote');
    }
  };

  const formatCurrency = (amount) => {
    if (language === 'is') {
      return new Intl.NumberFormat('is-IS', {
        style: 'currency',
        currency: 'ISK',
        minimumFractionDigits: 0,
      }).format(amount);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ISK',
        minimumFractionDigits: 0,
      }).format(amount);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(language === 'is' ? 'is-IS' : 'en-US');
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'new': return 'secondary';
      case 'pending': return 'outline';
      case 'accepted': return 'default';
      case 'completed': return 'default';
      default: return 'outline';
    }
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
            {translations.professionalDashboard}
          </h1>
          <p className="text-gray-600 mt-2">
            {user.profile?.company_name || `${user.profile?.first_name}'s Business`}
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          View Analytics
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.jobRequests}</p>
              <p className="text-2xl font-bold">{stats.totalRequests}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <FileText className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.activeQuotes}</p>
              <p className="text-2xl font-bold">{stats.activeQuotes}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.completedProjects}</p>
              <p className="text-2xl font-bold">{stats.completedProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <DollarSign className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.earnings}</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.monthlyEarnings)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requests">{translations.jobRequestsTitle}</TabsTrigger>
          <TabsTrigger value="quotes">{translations.quotesTitle}</TabsTrigger>
          <TabsTrigger value="calendar">{translations.calendarTitle}</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{translations.jobRequestsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {jobRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">{translations.noJobRequests}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobRequests.map((request) => (
                    <div
                      key={request.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{request.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusBadgeVariant(request.status)}>
                            {request.status}
                          </Badge>
                          <Button size="sm">Submit Quote</Button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{request.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
                        <span><strong>Location:</strong> {request.location}</span>
                        <span><strong>Budget:</strong> {request.budget}</span>
                        <span><strong>Posted:</strong> {formatDate(request.postedDate)}</span>
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
              <CardTitle>{translations.quotesTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {activeQuotes.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">{translations.noActiveQuotes}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeQuotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{quote.projectTitle}</h3>
                        <Badge variant={getStatusBadgeVariant(quote.status)}>
                          {quote.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <span><strong>Quote Amount:</strong> {quote.quotedAmount}</span>
                        <span><strong>Submitted:</strong> {formatDate(quote.submittedDate)}</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Edit Quote</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{translations.calendarTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">{translations.upcomingAppointments}</h3>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">{translations.noUpcomingAppointments}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{appointment.title}</h4>
                            <p className="text-gray-600">{appointment.client}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {formatDate(appointment.date)} at {appointment.time}
                            </div>
                            <div className="mt-1">{appointment.location}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t">
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Full Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalDashboard;