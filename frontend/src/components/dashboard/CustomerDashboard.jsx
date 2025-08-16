import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  PlusCircle, 
  FileText, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Eye, 
  Edit, 
  Calendar, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import apiService from '../../services/api';

const CustomerDashboard = ({ translations, language, user }) => {
  const [jobRequests, setJobRequests] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    pendingQuotes: 0,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter state
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    search: ''
  });

  useEffect(() => {
    loadDashboardData(currentPage);
  }, [currentPage, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const loadDashboardData = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      
      // Prepare filters
      const requestFilters = { 
        customer_only: true,
        page: page,
        limit: itemsPerPage
      };
      
      if (filters.status) requestFilters.status = filters.status;
      if (filters.category) requestFilters.category = filters.category;
      if (filters.search) requestFilters.search = filters.search;
      
      // Load customer's job requests with pagination
      const jobsResponse = await apiService.getJobRequests(requestFilters);
      setJobRequests(jobsResponse?.items || jobsResponse || []);
      
      // Update pagination info
      if (jobsResponse?.total) {
        setTotalPages(Math.ceil(jobsResponse.total / itemsPerPage));
      } else {
        setTotalPages(1);
      }
      
      // Load quotes for customer's jobs
      const quotesData = await apiService.getQuotes({ my_quotes: true });
      setQuotes(quotesData || []);

      // Load conversations
      const conversationsData = await apiService.getConversations();
      setConversations(conversationsData || []);
      
      // Calculate stats
      const jobsData = jobsResponse?.items || jobsResponse || [];
      const active = jobsData.filter(j => ['open', 'quoted', 'accepted', 'in_progress'].includes(j.status)).length;
      const completed = jobsData.filter(j => j.status === 'completed').length;
      const pending = quotesData?.filter(q => q.status === 'pending').length || 0;
      
      setStats({
        totalJobs: jobsData.length,
        activeJobs: active,
        completedJobs: completed,
        pendingQuotes: pending,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'completed': return 'default';
      case 'accepted': 
      case 'in_progress': return 'secondary';
      case 'quoted': return 'outline';
      case 'open': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getQuoteStatusBadgeVariant = (status) => {
    switch (status) {
      case 'accepted': return 'default';
      case 'pending': return 'secondary';
      case 'declined': return 'destructive';
      case 'withdrawn': return 'outline';
      case 'expired': return 'destructive';
      default: return 'outline';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(language === 'is' ? 'is-IS' : 'en-US');
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat(language === 'is' ? 'is-IS' : 'en-US', {
      style: 'currency',
      currency: 'ISK',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const acceptQuote = async (quoteId) => {
    if (!window.confirm(translations.confirmAcceptQuote || 'Are you sure you want to accept this quote?')) {
      return;
    }
    
    try {
      await apiService.acceptQuote(quoteId);
      setSuccess(translations.quoteAcceptedMsg || 'Quote accepted successfully!');
      // Refresh data
      loadDashboardData(currentPage);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Failed to accept quote:', error);
      setError(error.message || translations.acceptQuoteError || 'Failed to accept quote');
      setTimeout(() => setError(''), 5000);
    }
  };

  const declineQuote = async (quoteId) => {
    if (!window.confirm(translations.confirmDeclineQuote || 'Are you sure you want to decline this quote?')) {
      return;
    }
    
    try {
      await apiService.declineQuote(quoteId);
      setSuccess(translations.quoteDeclinedMsg || 'Quote declined successfully!');
      // Refresh data
      loadDashboardData(currentPage);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Failed to decline quote:', error);
      setError(error.message || translations.declineQuoteError || 'Failed to decline quote');
      setTimeout(() => setError(''), 5000);
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
            {translations.myDashboard}
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.profile?.first_name || user.email}!
          </p>
        </div>
        <Link to="/create-job">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="h-4 w-4" />
            {translations.createJobRequest}
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.myRequests}</p>
              <p className="text-2xl font-bold">{stats.totalJobs}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.activeRequests}</p>
              <p className="text-2xl font-bold">{stats.activeJobs}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.completedRequests}</p>
              <p className="text-2xl font-bold">{stats.completedJobs}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <MessageCircle className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{translations.pendingQuotes}</p>
              <p className="text-2xl font-bold">{stats.pendingQuotes}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="border-green-200 bg-green-50 mb-6">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requests">{translations.myRequests}</TabsTrigger>
          <TabsTrigger value="quotes">{translations.receivedQuotes}</TabsTrigger>
          <TabsTrigger value="messages">{translations.messages}</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{translations.myRequests}</CardTitle>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={translations.search + '...'}
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="w-48"
                    />
                  </div>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder={translations.filter + ' status'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="open">{translations.open}</SelectItem>
                      <SelectItem value="quoted">{translations.quoted}</SelectItem>
                      <SelectItem value="accepted">{translations.accepted}</SelectItem>
                      <SelectItem value="in_progress">{translations.inProgress}</SelectItem>
                      <SelectItem value="completed">{translations.completed}</SelectItem>
                      <SelectItem value="cancelled">{translations.cancelled}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {jobRequests.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {loading ? 'Loading your job requests...' : 'No job requests found. Create your first job request to get started!'}
                  </p>
                  {!loading && (
                    <Link to="/create-job">
                      <Button className="mt-4">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {translations.createJobRequest}
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {jobRequests.map((job) => (
                      <div
                        key={job.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-sm text-gray-600 capitalize">{job.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusBadgeVariant(job.status)}>
                              {translations[job.status] || job.status}
                            </Badge>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {job.views_count || 0}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            📍 {job.postcode}
                          </span>
                          <span>{job.quotes_count || 0} quotes</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(job.posted_at)}
                          </span>
                          {(job.budget_min || job.budget_max) && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {job.budget_min && job.budget_max ? 
                                `${formatCurrency(job.budget_min)} - ${formatCurrency(job.budget_max)}` :
                                formatCurrency(job.budget_min || job.budget_max)
                              }
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/job/${job.id}`}>
                            <Button size="sm" variant="outline">
                              {translations.view}
                            </Button>
                          </Link>
                          {['open', 'quoted'].includes(job.status) && (
                            <Link to={`/job/${job.id}/edit`}>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3 mr-1" />
                                {translations.edit}
                              </Button>
                            </Link>
                          )}
                          {job.quotes_count > 0 && (
                            <Link to={`/job/${job.id}#quotes`}>
                              <Button size="sm" variant="secondary">
                                View {job.quotes_count} Quote{job.quotes_count !== 1 ? 's' : ''}
                              </Button>
                            </Link>
                          )}
                          {job.status === 'accepted' || job.status === 'in_progress' && (
                            <Link to={`/job/${job.id}/messages`}>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {translations.messages}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{translations.receivedQuotes}</CardTitle>
            </CardHeader>
            <CardContent>
              {quotes.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No quotes received yet. Create job requests to receive quotes from professionals!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {quote.professional_name}
                            {quote.professional_company && (
                              <span className="text-sm text-gray-600 font-normal"> - {quote.professional_company}</span>
                            )}
                          </h3>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(quote.amount)}</p>
                        </div>
                        <Badge variant={getQuoteStatusBadgeVariant(quote.status)}>
                          {translations[`quote${quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}`] || quote.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{quote.message}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                        <span>{translations.estimatedDuration}: {quote.estimated_duration || 'N/A'}</span>
                        <span>{translations.expiresAt}: {formatDate(quote.expires_at)}</span>
                        <span>{translations.materialsIncluded}: {quote.includes_materials ? translations.yes : translations.no}</span>
                        <span>{translations.submitted}: {formatDate(quote.submitted_at)}</span>
                      </div>
                      {quote.status === 'pending' && new Date() < new Date(quote.expires_at) && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => acceptQuote(quote.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {translations.acceptQuote}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => declineQuote(quote.id)}
                          >
                            {translations.declineQuote}
                          </Button>
                          <Link to={`/job/${quote.job_request_id}/messages`}>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              {translations.sendMessage}
                            </Button>
                          </Link>
                        </div>
                      )}
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
              <CardTitle>{translations.messages}</CardTitle>
            </CardHeader>
            <CardContent>
              {conversations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No conversations yet. Messages will appear here when you start communicating with professionals.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {conversations.map((conversation) => (
                    <Link 
                      key={conversation.job_id}
                      to={`/job/${conversation.job_id}/messages`}
                      className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{conversation.job_title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusBadgeVariant(conversation.job_status)}>
                            {translations[conversation.job_status] || conversation.job_status}
                          </Badge>
                          {conversation.unread_count > 0 && (
                            <Badge className="bg-red-500 text-white">
                              {conversation.unread_count}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {conversation.latest_message && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {conversation.latest_message.content}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDate(conversation.updated_at)}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;