import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Eye, 
  Edit, 
  MessageCircle, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Building,
  Phone,
  Mail
} from 'lucide-react';
import apiService from '../../services/api';

const JobRequestDetail = ({ translations, language }) => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [jobRequest, setJobRequest] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadJobDetails();
  }, [jobId, isAuthenticated, navigate]);

  const loadJobDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load job request details
      const jobData = await apiService.getJobRequest(jobId);
      setJobRequest(jobData);
      
      // Load quotes for this job
      const quotesData = await apiService.getQuotes({ job_request_id: jobId });
      setQuotes(quotesData || []);
      
    } catch (error) {
      console.error('Failed to load job details:', error);
      setError(error.message || 'Failed to load job details');
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

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString(language === 'is' ? 'is-IS' : 'en-US');
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat(language === 'is' ? 'is-IS' : 'en-US', {
      style: 'currency',
      currency: 'ISK',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAcceptQuote = async (quoteId) => {
    if (!window.confirm(translations.confirmAcceptQuote || 'Are you sure you want to accept this quote?')) {
      return;
    }

    try {
      setActionLoading(quoteId);
      await apiService.acceptQuote(quoteId);
      setSuccess(translations.quoteAcceptedMsg || 'Quote accepted successfully!');
      loadJobDetails(); // Refresh data
    } catch (error) {
      setError(error.message || translations.acceptQuoteError || 'Failed to accept quote');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeclineQuote = async (quoteId) => {
    if (!window.confirm(translations.confirmDeclineQuote || 'Are you sure you want to decline this quote?')) {
      return;
    }

    try {
      setActionLoading(quoteId);
      await apiService.declineQuote(quoteId);
      setSuccess(translations.quoteDeclinedMsg || 'Quote declined successfully!');
      loadJobDetails(); // Refresh data
    } catch (error) {
      setError(error.message || translations.declineQuoteError || 'Failed to decline quote');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelJob = async () => {
    if (!window.confirm(translations.confirmCancelJob || 'Are you sure you want to cancel this job request?')) {
      return;
    }

    try {
      setActionLoading('cancel');
      await apiService.updateJobStatus(jobId, 'cancelled');
      setSuccess(translations.jobCancelledMsg || 'Job request cancelled');
      loadJobDetails(); // Refresh data
    } catch (error) {
      setError(error.message || 'Failed to cancel job request');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!jobRequest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Request Not Found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const canEdit = ['open', 'quoted'].includes(jobRequest.status);
  const canCancel = ['open', 'quoted'].includes(jobRequest.status);
  const pendingQuotes = quotes.filter(q => q.status === 'pending' && new Date() < new Date(q.expires_at));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {translations.backToDashboard || 'Back to Dashboard'}
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{jobRequest.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant={getStatusBadgeVariant(jobRequest.status)}>
              {translations[jobRequest.status] || jobRequest.status}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {jobRequest.views_count || 0} views
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {quotes.length} quotes
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {canEdit && (
            <Link to={`/job/${jobId}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                {translations.edit}
              </Button>
            </Link>
          )}
          {canCancel && (
            <Button 
              variant="destructive" 
              onClick={handleCancelJob}
              disabled={actionLoading === 'cancel'}
            >
              {actionLoading === 'cancel' ? 'Cancelling...' : (translations.cancel || 'Cancel')}
            </Button>
          )}
        </div>
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

      {/* Main Content */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">{translations.jobDetails || 'Job Details'}</TabsTrigger>
          <TabsTrigger value="quotes">
            {translations.quotes} ({quotes.length})
          </TabsTrigger>
          <TabsTrigger value="messages">{translations.messages}</TabsTrigger>
        </TabsList>

        {/* Job Details Tab */}
        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.jobDescription || 'Job Description'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{jobRequest.description}</p>
                  
                  {jobRequest.photos && jobRequest.photos.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">{translations.photos}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {jobRequest.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Job photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:opacity-90"
                            onClick={() => window.open(photo, '_blank')}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{translations.jobDetails || 'Job Details'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium capitalize">{translations.category}:</span>
                    <span className="text-gray-600 capitalize">{jobRequest.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{translations.location}:</span>
                    <span className="text-gray-600">{jobRequest.postcode}</span>
                  </div>
                  
                  {jobRequest.address && (
                    <div className="flex items-start gap-2 text-sm">
                      <span className="font-medium">{translations.address}:</span>
                      <span className="text-gray-600">{jobRequest.address}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{translations.posted || 'Posted'}:</span>
                    <span className="text-gray-600">{formatDate(jobRequest.posted_at)}</span>
                  </div>
                  
                  {(jobRequest.budget_min || jobRequest.budget_max) && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{translations.budget}:</span>
                      <span className="text-gray-600">
                        {jobRequest.budget_min && jobRequest.budget_max ? 
                          `${formatCurrency(jobRequest.budget_min)} - ${formatCurrency(jobRequest.budget_max)}` :
                          formatCurrency(jobRequest.budget_min || jobRequest.budget_max)
                        }
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{translations.priority}:</span>
                    <span className="text-gray-600 capitalize">{translations[jobRequest.priority] || jobRequest.priority}</span>
                  </div>
                  
                  {jobRequest.deadline && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{translations.deadline}:</span>
                      <span className="text-gray-600">{formatDateTime(jobRequest.deadline)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Quotes Tab */}
        <TabsContent value="quotes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {translations.receivedQuotes || 'Received Quotes'} ({quotes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quotes.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {translations.noQuotesYet || 'No quotes received yet. Professionals will send quotes for your job request.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="border rounded-lg p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <h3 className="font-semibold text-lg">{quote.professional_name}</h3>
                            </div>
                            {quote.professional_company && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Building className="h-3 w-3" />
                                {quote.professional_company}
                              </div>
                            )}
                          </div>
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            {formatCurrency(quote.amount)}
                          </div>
                        </div>
                        <Badge variant={getQuoteStatusBadgeVariant(quote.status)}>
                          {translations[`quote${quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}`] || quote.status}
                        </Badge>
                      </div>
                      
                      {quote.message && (
                        <div className="mb-4">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">{translations.message || 'Message'}:</h4>
                          <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{quote.message}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                        <div>
                          <span className="font-medium text-gray-700">{translations.estimatedDuration}:</span>
                          <br />
                          <span>{quote.estimated_duration || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">{translations.materialsIncluded}:</span>
                          <br />
                          <span>{quote.includes_materials ? translations.yes : translations.no}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">{translations.expiresAt}:</span>
                          <br />
                          <span>{formatDate(quote.expires_at)}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">{translations.submitted}:</span>
                          <br />
                          <span>{formatDate(quote.submitted_at)}</span>
                        </div>
                      </div>
                      
                      {quote.status === 'pending' && new Date() < new Date(quote.expires_at) && (
                        <div className="flex gap-3 pt-4 border-t">
                          <Button 
                            onClick={() => handleAcceptQuote(quote.id)}
                            disabled={actionLoading === quote.id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {actionLoading === quote.id ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                {translations.accepting || 'Accepting...'}
                              </div>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {translations.acceptQuote}
                              </>
                            )}
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleDeclineQuote(quote.id)}
                            disabled={actionLoading === quote.id}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            {translations.declineQuote}
                          </Button>
                          <Link to={`/job/${jobId}/messages`}>
                            <Button variant="outline">
                              <MessageCircle className="h-4 w-4 mr-2" />
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

        {/* Messages Tab */}
        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{translations.jobConversation || 'Job Conversation'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  {translations.messagingInterfaceComingSoon || 'Messaging interface will be implemented next.'}
                </p>
                <Link to={`/job/${jobId}/messages`}>
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {translations.openMessaging || 'Open Messaging'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobRequestDetail;