import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import LoadingSpinner from '../LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { ArrowLeft, Check } from 'lucide-react';

const JobPostingWizard = ({ translations, language }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, requireAuth } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data
  const [formData, setFormData] = useState({
    category: searchParams.get('category') || '',
    title: '',
    description: '',
    email: user?.email || '',
    phone: '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    address: '',
    postcode: '',
    contactPreference: 'platform_and_phone'
  });

  // Draft job request ID for persistence
  const [draftJobId, setDraftJobId] = useState(null);

  useEffect(() => {
    if (!requireAuth()) {
      navigate('/login');
      return;
    }
  }, [user, navigate, requireAuth]);

  const categoryNames = {
    handcraft: translations.handcraft,
    bathroom: translations.bathroom,
    automotive: translations.automotive,
    majorProjects: translations.majorProjects,
    cleaning: translations.cleaning,
    housingAssociations: translations.housingAssociations,
    moving: translations.moving
  };

  const steps = [
    { number: 1, title: translations.stepOneTitle },
    { number: 2, title: translations.stepTwoTitle },
    { number: 3, title: translations.stepThreeTitle }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.title.trim() || formData.title.length < 10) {
      setError('Title must be at least 10 characters');
      return false;
    }
    if (!formData.description.trim() || formData.description.length < 30) {
      setError('Description must be at least 30 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setError('Valid email is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      return false;
    }
    if (!formData.postcode.trim()) {
      setError('Postcode is required');
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    setError('');
    setLoading(true);

    try {
      if (currentStep === 1) {
        if (!validateStep1()) {
          setLoading(false);
          return;
        }
        
        // Create or update draft job request
        const jobData = {
          category: formData.category,
          title: formData.title,
          description: formData.description,
          postcode: formData.postcode || '101', // Placeholder
          status: 'draft'
        };

        if (draftJobId) {
          await api.updateJobRequest(draftJobId, jobData);
        } else {
          const response = await api.createJobRequest(jobData);
          setDraftJobId(response.id);
        }
        
        setCurrentStep(2);
      } else if (currentStep === 2) {
        if (!validateStep2()) {
          setLoading(false);
          return;
        }
        
        // Update draft with contact info
        if (draftJobId) {
          await api.updateJobRequest(draftJobId, {
            postcode: formData.postcode,
            address: formData.address
          });
        }
        
        setCurrentStep(3);
      }
    } catch (err) {
      setError('Failed to save progress. Please try again.');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      if (draftJobId) {
        // Finalize the job request
        await api.updateJobRequest(draftJobId, {
          status: 'open'
        });
        
        setSuccess('Job request submitted successfully!');
        
        // Navigate to dashboard after short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError('Failed to submit job request. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderProgressBar = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step.number <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {step.number < currentStep ? <Check className="h-4 w-4" /> : step.number}
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`w-16 h-1 mx-2 ${
                step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} 
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        {translations.stepOneTitle}
      </h2>
      
      {formData.category && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">{translations.category}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <span className="text-blue-800 font-medium">
              {categoryNames[formData.category] || formData.category}
            </span>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {translations.jobTitleLabel} <span className="text-red-500">*</span>
        </label>
        <Input
          value={formData.title}
          onChange={(e) => updateFormData('title', e.target.value)}
          placeholder={translations.jobTitlePlaceholder}
          className="h-12"
          minLength={10}
          required
        />
        <p className="text-xs text-gray-500 mt-1">Minimum 10 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {translations.jobDescriptionLabel} <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          placeholder={translations.jobDescriptionPlaceholder}
          className="min-h-[120px] resize-none"
          minLength={30}
          required
        />
        <p className="text-xs text-gray-500 mt-1">Minimum 30 characters</p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        {translations.stepTwoTitle}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.email} <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="h-12"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.phoneWithCountryCode} <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <Select value="+354" onValueChange={() => {}}>
              <SelectTrigger className="w-20 h-12">
                <SelectValue placeholder="+354" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+354">+354</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              placeholder="555-1234"
              className="h-12 ml-2 flex-1"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.firstName} <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className="h-12"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.lastName} <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            className="h-12"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {translations.address} <span className="text-red-500">*</span>
        </label>
        <Input
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          className="h-12"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {translations.postcode} <span className="text-red-500">*</span>
        </label>
        <Input
          value={formData.postcode}
          onChange={(e) => updateFormData('postcode', e.target.value)}
          placeholder="101"
          className="h-12"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {translations.contactPreference}
        </label>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => updateFormData('contactPreference', 'platform_and_phone')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              formData.contactPreference === 'platform_and_phone'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {translations.throughPlatformAndPhone}
          </button>
          <button
            type="button"
            onClick={() => updateFormData('contactPreference', 'platform_only')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              formData.contactPreference === 'platform_only'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {translations.platformOnly}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        {translations.stepThreeTitle}
      </h2>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {translations.summary}
        </h3>

        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-600">{translations.category}:</span>
            <p className="text-gray-900">{categoryNames[formData.category] || formData.category}</p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-600">{translations.jobTitleLabel}:</span>
            <p className="text-gray-900">{formData.title}</p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-600">{translations.jobDescriptionLabel}:</span>
            <p className="text-gray-900">{formData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600">{translations.email}:</span>
              <p className="text-gray-900">{formData.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">{translations.phone}:</span>
              <p className="text-gray-900">+354 {formData.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600">{translations.firstName}:</span>
              <p className="text-gray-900">{formData.firstName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">{translations.lastName}:</span>
              <p className="text-gray-900">{formData.lastName}</p>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-600">{translations.location}:</span>
            <p className="text-gray-900">{formData.address}, {formData.postcode}</p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-600">{translations.contactPreference}:</span>
            <p className="text-gray-900">
              {formData.contactPreference === 'platform_and_phone' 
                ? translations.throughPlatformAndPhone 
                : translations.platformOnly}
            </p>
          </div>
        </div>

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );

  const renderButtons = () => (
    <div className="flex justify-between pt-8">
      <div>
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {translations.back}
          </Button>
        )}
      </div>

      <div>
        {currentStep < 3 ? (
          <Button
            onClick={handleNext}
            disabled={loading || (currentStep === 1 && (!formData.title.trim() || !formData.description.trim()))}
            className="px-8"
          >
            {loading ? <LoadingSpinner size="sm" /> : translations.next}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={loading || success}
            className="px-8"
          >
            {loading ? <LoadingSpinner size="sm" /> : translations.finish}
          </Button>
        )}
      </div>
    </div>
  );

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderProgressBar()}
          
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default JobPostingWizard;