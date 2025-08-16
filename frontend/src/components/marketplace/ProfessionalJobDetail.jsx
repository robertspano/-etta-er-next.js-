import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  ArrowLeft,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  User,
  FileText,
  Users,
  AlertCircle,
  Star,
  Quote
} from 'lucide-react';
import apiService from '../../services/api';

const ProfessionalJobDetail = ({ translations, language }) => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [jobRequest, setJobRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [hasExistingQuote, setHasExistingQuote] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadJobDetails();
    loadJobQuotes();
  }, [jobId, isAuthenticated, navigate]);

  const loadJobDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      const jobData = await apiService.getJobRequest(jobId);
      setJobRequest(jobData);
      
    } catch (error) {
      console.error('Failed to load job details:', error);
      setError(error.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const loadJobQuotes = async () => {
    try {
      setQuotesLoading(true);
      
      const response = await apiService.getQuotes({ job_request_id: jobId });
      setQuotes(response.quotes || []);
      
      // Check if current user already has a quote for this job
      const userQuote = response.quotes?.find(quote => quote.professional_id === user.id);
      setHasExistingQuote(!!userQuote);
      
    } catch (error) {
      console.error('Failed to load quotes:', error);
    } finally {
      setQuotesLoading(false);
    }
  };

  const handleSubmitQuote = () => {
    navigate(`/professional/quote/${jobId}`);
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat(language === 'is' ? 'is-IS' : 'en-US', {
      style: 'currency',
      currency: 'ISK',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(language === 'is' ? 'is-IS' : 'en-US');
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'open': return 'default';
      case 'quoted': return 'secondary';
      case 'accepted': return 'outline';
      case 'in_progress': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {translations.backToDashboard}
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{jobRequest.title}</h1>
            <Badge variant={getStatusBadgeVariant(jobRequest.status)}>
              {translations[jobRequest.status] || jobRequest.status}
            </Badge>
            <Badge variant={getPriorityBadgeVariant(jobRequest.priority)}>
              {translations[jobRequest.priority] || jobRequest.priority}
            </Badge>
          </div>
          <p className="text-gray-600">{translations.category}: {translations[`services_${jobRequest.category}`] || jobRequest.category}</p>
        </div>
        {!hasExistingQuote && jobRequest.status === 'open' && (
          <Button onClick={handleSubmitQuote} className="bg-blue-600 hover:bg-blue-700">
            <Quote className="h-4 w-4 mr-2" />
            {translations.submitQuote}
          </Button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {hasExistingQuote && (
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            {translations.alreadyQuoted || 'You have already submitted a quote for this job.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Job Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>{translations.jobDetails}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{translations.description}</h4>
                <p className="text-gray-700 leading-relaxed">{jobRequest.description}</p>
              </div>

              {jobRequest.photos && jobRequest.photos.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">{translations.photos}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {jobRequest.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Job photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => window.open(photo, '_blank')}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span><strong>{translations.posted}:</strong> {formatDate(jobRequest.created_at)}</span>
                </div>
                {jobRequest.deadline && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span><strong>{translations.deadline}:</strong> {formatDate(jobRequest.deadline)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Competition Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {translations.competition || 'Competition'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quotesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {quotes.length} {translations.quotesSubmitted || 'quotes submitted'}
                    </span>
                    {quotes.length > 0 && (
                      <div className="text-sm text-gray-600">
                        {translations.averageQuote || 'Average'}: {formatCurrency(
                          quotes.reduce((sum, quote) => sum + quote.amount, 0) / quotes.length
                        )}
                      </div>
                    )}
                  </div>
                  
                  {quotes.length === 0 ? (
                    <div className="text-center py-6">
                      <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">{translations.noQuotesYet}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {translations.beFirstToQuote || 'Be the first to submit a quote!'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {quotes.map((quote, index) => (
                        <div key={quote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium">
                                {quote.professional_id === user.id ? 
                                  translations.yourQuote || 'Your Quote' : 
                                  `${translations.professional || 'Professional'} ${index + 1}`
                                }
                              </div>
                              <div className="text-sm text-gray-600">
                                {formatDate(quote.created_at)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {formatCurrency(quote.amount)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {quote.estimated_duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Summary */}
          <Card>
            <CardHeader>
              <CardTitle>{translations.jobSummary || 'Job Summary'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-semibold">{translations.location}</div>
                  <div className="text-sm text-gray-600">
                    {jobRequest.postcode}
                    {jobRequest.address && <div>{jobRequest.address}</div>}
                  </div>
                </div>
              </div>

              {(jobRequest.budget_min || jobRequest.budget_max) && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-semibold">{translations.budget}</div>
                    <div className="text-sm text-gray-600">
                      {jobRequest.budget_min && jobRequest.budget_max ? 
                        `${formatCurrency(jobRequest.budget_min)} - ${formatCurrency(jobRequest.budget_max)}` :
                        formatCurrency(jobRequest.budget_min || jobRequest.budget_max)
                      }
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-semibold">{translations.customer}</div>
                  <div className="text-sm text-gray-600">
                    {jobRequest.customer?.profile?.first_name} {jobRequest.customer?.profile?.last_name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-semibold">{translations.priority}</div>
                  <div className="text-sm text-gray-600 capitalize">
                    {translations[jobRequest.priority] || jobRequest.priority}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Card */}
          {!hasExistingQuote && jobRequest.status === 'open' && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {translations.readyToQuote || 'Ready to Quote?'}
                  </h3>
                  <p className="text-sm text-blue-700 mb-4">
                    {translations.quoteOpportunity || 'This looks like a great opportunity. Submit your quote now!'}
                  </p>
                  <Button onClick={handleSubmitQuote} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Quote className="h-4 w-4 mr-2" />
                    {translations.submitQuote}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    {translations.professionalTips || 'Professional Tips'}
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• {translations.tipRespond || 'Respond quickly to stand out'}</li>
                    <li>• {translations.tipDetailed || 'Provide detailed quotes'}</li>
                    <li>• {translations.tipCompetitive || 'Be competitive but fair'}</li>
                    <li>• {translations.tipShowcase || 'Showcase your experience'}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalJobDetail;