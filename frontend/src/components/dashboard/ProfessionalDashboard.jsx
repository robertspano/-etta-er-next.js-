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
              <p className="text-sm font-medium text-gray-600">{translations.availableJobs || 'Available Jobs'}</p>
              <p className="text-2xl font-bold">{stats.availableJobs}</p>
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

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="open-jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="open-jobs">{translations.availableJobs || 'Open Jobs'}</TabsTrigger>
          <TabsTrigger value="my-quotes">{translations.myQuotes}</TabsTrigger>
          <TabsTrigger value="messages">{translations.messages}</TabsTrigger>
          <TabsTrigger value="profile">{translations.profile}</TabsTrigger>
        </TabsList>

        <TabsContent value="open-jobs" className="mt-6">
          <JobBidding 
            translations={translations} 
            language={language} 
            user={user} 
          />
        </TabsContent>

        <TabsContent value="my-quotes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{translations.myQuotes}</span>
                <Badge variant="outline">
                  {myQuotes.length} {translations.quotes || 'quotes'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quotesError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{quotesError}</AlertDescription>
                </Alert>
              )}
              
              {quotesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : myQuotes.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">{translations.noActiveQuotes}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {translations.noQuotesDesc || 'Submit quotes on available jobs to see them here.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myQuotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">
                              {quote.job_request?.title || 'Job Request'}
                            </h3>
                            <Badge variant={getStatusBadgeVariant(quote.status)}>
                              {translations[quote.status] || quote.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {quote.message?.substring(0, 100)}...
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <span className="text-lg font-bold text-blue-600">
                            {formatCurrency(quote.amount)}
                          </span>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              {translations.view}
                            </Button>
                            {quote.status === 'submitted' && (
                              <>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4 mr-1" />
                                  {translations.edit}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleWithdrawQuote(quote.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  {translations.withdraw}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                        <span><strong>{translations.amount}:</strong> {formatCurrency(quote.amount)}</span>
                        <span><strong>{translations.submitted}:</strong> {formatDate(quote.created_at)}</span>
                        <span><strong>{translations.expires}:</strong> {formatDate(quote.expires_at)}</span>
                        <span><strong>{translations.duration}:</strong> {quote.estimated_duration || 'N/A'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                {translations.messages}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {messagesError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{messagesError}</AlertDescription>
                </Alert>
              )}
              
              {messagesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">{translations.noConversations || 'No conversations yet'}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {translations.noConversationsDesc || 'Start submitting quotes to begin conversations with customers.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{conversation.job_request?.title}</h4>
                          <p className="text-gray-600 text-sm">
                            {conversation.last_message?.content || 'No messages yet'}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>{formatDate(conversation.updated_at)}</div>
                          {conversation.unread_count > 0 && (
                            <Badge variant="default" className="mt-1">
                              {conversation.unread_count}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {translations.profile}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">{translations.personalInfo}</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>{translations.firstName}:</strong> {user.profile?.first_name || 'N/A'}</div>
                      <div><strong>{translations.lastName}:</strong> {user.profile?.last_name || 'N/A'}</div>
                      <div><strong>{translations.email}:</strong> {user.email}</div>
                      <div><strong>{translations.phone}:</strong> {user.profile?.phone || 'N/A'}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">{translations.companyInfo}</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>{translations.companyName}:</strong> {user.profile?.company_name || 'N/A'}</div>
                      <div><strong>{translations.companyId}:</strong> {user.profile?.company_id || 'N/A'}</div>
                      <div><strong>{translations.serviceAreas}:</strong> {user.profile?.service_areas || 'N/A'}</div>
                      <div><strong>{translations.tradeCertifications}:</strong> {user.profile?.trade_certifications || 'N/A'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button>
                    {translations.updateProfile}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalDashboard;