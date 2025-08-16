import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  ArrowLeft,
  DollarSign,
  Clock,
  Calendar,
  FileText,
  Calculator,
  Info
} from 'lucide-react';
import apiService from '../../services/api';

const QuoteSubmissionForm = ({ translations, language }) => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [jobRequest, setJobRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    amount: '',
    message: '',
    estimated_duration: '',
    estimated_start_date: '',
    includes_materials: false,
    materials_cost: '',
    labor_cost: '',
    expires_at: '',
    notes: ''
  });

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
      
      const jobData = await apiService.getJobRequest(jobId);
      setJobRequest(jobData);
      
      // Set default expiry date (7 days from now)
      const defaultExpiry = new Date();
      defaultExpiry.setDate(defaultExpiry.getDate() + 7);
      setFormData(prev => ({
        ...prev,
        expires_at: defaultExpiry.toISOString().slice(0, 16)
      }));
      
    } catch (error) {
      console.error('Failed to load job details:', error);
      setError(error.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const calculateTotalAmount = () => {
    const materialsTotal = parseFloat(formData.materials_cost) || 0;
    const laborTotal = parseFloat(formData.labor_cost) || 0;
    const total = materialsTotal + laborTotal;
    
    if (total > 0) {
      setFormData(prev => ({ ...prev, amount: total.toString() }));
    }
  };

  const validateForm = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid quote amount');
      return false;
    }
    
    if (!formData.message.trim()) {
      setError('Please provide a message or description for your quote');
      return false;
    }
    
    if (!formData.estimated_duration.trim()) {
      setError('Please provide an estimated completion time');
      return false;
    }
    
    if (!formData.expires_at) {
      setError('Please set an expiry date for your quote');
      return false;
    }
    
    // Check if expiry date is in the future
    if (new Date(formData.expires_at) <= new Date()) {
      setError('Quote expiry date must be in the future');
      return false;
    }
    
    return true;
  };

  const submitQuote = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      setError('');
      
      const quoteData = {
        job_request_id: jobId,
        amount: parseFloat(formData.amount),
        message: formData.message.trim(),
        estimated_duration: formData.estimated_duration.trim(),
        includes_materials: formData.includes_materials,
        expires_at: new Date(formData.expires_at).toISOString()
      };
      
      // Add optional data if provided
      if (formData.estimated_start_date) {
        quoteData.estimated_start_date = new Date(formData.estimated_start_date).toISOString();
      }
      
      if (formData.materials_cost) {
        quoteData.materials_cost = parseFloat(formData.materials_cost);
      }
      
      if (formData.labor_cost) {
        quoteData.labor_cost = parseFloat(formData.labor_cost);
      }
      
      if (formData.notes.trim()) {
        quoteData.additional_notes = formData.notes.trim();
      }
      
      await apiService.createQuote(quoteData);
      
      setSuccess(translations.quoteSubmitted || 'Quote submitted successfully!');
      
      // Redirect after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setError(error.message || translations.submitQuoteError || 'Failed to submit quote');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat(language === 'is' ? 'is-IS' : 'en-US', {
      style: 'currency',
      currency: 'ISK',
      minimumFractionDigits: 0,
    }).format(amount);
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
          <Button onClick={() => navigate('/browse-jobs')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Job Browse
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate('/browse-jobs')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {translations.backToJobs || 'Back to Jobs'}
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{translations.submitQuote || 'Submit Quote'}</h1>
          <p className="text-gray-600">{jobRequest.title}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quote Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {translations.quoteDetails || 'Quote Details'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitQuote} className="space-y-6">
                {/* Quote Amount */}
                <div>
                  <Label htmlFor="amount" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {translations.quoteAmount || 'Quote Amount'} *
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="1"
                    min="1"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount in ISK"
                    required
                    className="mt-2"
                  />
                  {parseFloat(formData.amount) > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      {formatCurrency(parseFloat(formData.amount))}
                    </p>
                  )}
                </div>

                {/* Cost Breakdown (Optional) */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator className="h-4 w-4" />
                    <Label className="text-sm font-medium">
                      {translations.costBreakdown || 'Cost Breakdown'} ({translations.optional})
                    </Label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="materials_cost" className="text-sm">
                        {translations.materialsCost || 'Materials Cost'}
                      </Label>
                      <Input
                        id="materials_cost"
                        name="materials_cost"
                        type="number"
                        step="1"
                        min="0"
                        value={formData.materials_cost}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="labor_cost" className="text-sm">
                        {translations.laborCost || 'Labor Cost'}
                      </Label>
                      <Input
                        id="labor_cost"
                        name="labor_cost"
                        type="number"
                        step="1"
                        min="0"
                        value={formData.labor_cost}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  {(formData.materials_cost || formData.labor_cost) && (
                    <div className="mt-3 pt-3 border-t">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={calculateTotalAmount}
                      >
                        {translations.calculateTotal || 'Calculate Total'}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Materials Included */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includes_materials"
                    name="includes_materials"
                    checked={formData.includes_materials}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, includes_materials: checked }))
                    }
                  />
                  <Label htmlFor="includes_materials" className="text-sm">
                    {translations.includesMaterials || 'This quote includes materials'}
                  </Label>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">
                    {translations.quoteMessage || 'Message'} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={translations.describeApproach || 'Describe your approach, experience, and what is included...'}
                    rows={4}
                    required
                    className="mt-2"
                  />
                </div>

                {/* Timing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estimated_duration" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {translations.estimatedDuration || 'Estimated Duration'} *
                    </Label>
                    <Input
                      id="estimated_duration"
                      name="estimated_duration"
                      value={formData.estimated_duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 2-3 days, 1 week"
                      required
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="estimated_start_date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {translations.estimatedStartDate || 'Earliest Start Date'}
                    </Label>
                    <Input
                      id="estimated_start_date"
                      name="estimated_start_date"
                      type="date"
                      value={formData.estimated_start_date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Quote Expiry */}
                <div>
                  <Label htmlFor="expires_at">
                    {translations.quoteExpiry || 'Quote Valid Until'} *
                  </Label>
                  <Input
                    id="expires_at"
                    name="expires_at"
                    type="datetime-local"
                    value={formData.expires_at}
                    onChange={handleInputChange}
                    min={new Date().toISOString().slice(0, 16)}
                    required
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    {translations.quoteExpiryHint || 'Set when this quote expires (recommended: 7-14 days)'}
                  </p>
                </div>

                {/* Additional Notes */}
                <div>
                  <Label htmlFor="notes">
                    {translations.additionalNotes || 'Additional Notes'}
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder={translations.additionalNotesPlaceholder || 'Any additional information, terms, or conditions...'}
                    rows={3}
                    className="mt-2"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/browse-jobs')}
                    disabled={submitting}
                  >
                    {translations.cancel}
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {translations.submitting || 'Submitting...'}
                      </div>
                    ) : (
                      translations.submitQuote || 'Submit Quote'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Job Details Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{translations.jobDetails || 'Job Details'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">
                  {translations.category}
                </h4>
                <p className="text-sm capitalize">{jobRequest.category}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">
                  {translations.location}
                </h4>
                <p className="text-sm">{jobRequest.postcode}</p>
                {jobRequest.address && (
                  <p className="text-sm text-gray-600">{jobRequest.address}</p>
                )}
              </div>
              
              {(jobRequest.budget_min || jobRequest.budget_max) && (
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">
                    {translations.budget}
                  </h4>
                  <p className="text-sm">
                    {jobRequest.budget_min && jobRequest.budget_max ? 
                      `${formatCurrency(jobRequest.budget_min)} - ${formatCurrency(jobRequest.budget_max)}` :
                      formatCurrency(jobRequest.budget_min || jobRequest.budget_max)
                    }
                  </p>
                </div>
              )}
              
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">
                  {translations.priority}
                </h4>
                <p className="text-sm capitalize">{translations[jobRequest.priority] || jobRequest.priority}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">
                  {translations.description}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{jobRequest.description}</p>
              </div>
              
              {jobRequest.photos && jobRequest.photos.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    {translations.photos}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {jobRequest.photos.slice(0, 4).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Job photo ${index + 1}`}
                        className="w-full h-20 object-cover rounded border cursor-pointer"
                        onClick={() => window.open(photo, '_blank')}
                      />
                    ))}
                  </div>
                  {jobRequest.photos.length > 4 && (
                    <p className="text-xs text-gray-500 mt-1">
                      +{jobRequest.photos.length - 4} more photos
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    {translations.quoteTips || 'Quote Tips'}
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• {translations.tip1 || 'Be specific about what\'s included'}</li>
                    <li>• {translations.tip2 || 'Mention your experience and credentials'}</li>
                    <li>• {translations.tip3 || 'Set realistic timelines'}</li>
                    <li>• {translations.tip4 || 'Consider materials and labor costs'}</li>
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

export default QuoteSubmissionForm;