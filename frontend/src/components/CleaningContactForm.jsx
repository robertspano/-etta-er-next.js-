import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { ArrowLeft } from 'lucide-react';

const CleaningContactForm = ({ translations, language }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Optional - user may be null for guests
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Get subcategory from localStorage
  const [selectedSubcategory] = useState(() => {
    return localStorage.getItem('bc_selected_subcategory') || null;
  });
  
  // Form data
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    address: '',
    postcode: '',
    contactPreference: 'platform_and_phone'
  });

  // Draft job request ID for persistence (stored in localStorage for guests)
  const [draftJobId, setDraftJobId] = useState(null);

  // Cleaning subcategory name mapping - Updated for Mittanbud's 4 categories
  const subcategoryNames = {
    facadeCleaning: translations.facadeCleaning || 'Facade Cleaning',
    cleaningServices: translations.cleaningServices || 'Cleaning Services',
    moveOutCleaning: translations.moveOutCleaning || 'Move-out Cleaning',
    otherCleaning: translations.otherCleaning || 'Other (Cleaning)'
  };

  // If no subcategory selected, redirect back
  useEffect(() => {
    if (!selectedSubcategory) {
      navigate('/post/cleaning');
    }
  }, [selectedSubcategory, navigate]);

  // Create initial draft when component loads
  useEffect(() => {
    if (selectedSubcategory && !draftJobId) {
      createCleaningDraft();
    }
  }, [selectedSubcategory]);

  const createCleaningDraft = async () => {
    try {
      setLoading(true);
      setError('');

      // Create a draft job request with cleaning category and subcategory
      const draftData = {
        category: 'cleaning',
        title: `${subcategoryNames[selectedSubcategory] || selectedSubcategory} Service`,
        description: `I need help with ${(subcategoryNames[selectedSubcategory] || selectedSubcategory).toLowerCase()}.`,
        subcategory: selectedSubcategory
      };

      const response = await api.createDraftJobRequest(draftData);
      setDraftJobId(response.id);
      localStorage.setItem('bc_draft_job_id', response.id);
      
    } catch (err) {
      setError('Failed to initialize job request. Please try again.');
      console.error('Draft creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.phone || !formData.firstName || !formData.lastName || !formData.address || !formData.postcode) {
      setError('Please fill in all required fields.');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    
    if (formData.phone.length < 7) {
      setError('Please enter a valid phone number.');
      return false;
    }
    
    if (formData.postcode.length !== 3) {
      setError('Please enter a valid 3-digit postcode.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setError('');
      
      if (draftJobId) {
        // Update the draft with contact info
        await api.updateDraftJobRequest(draftJobId, {
          ...formData,
          phone: `+354 ${formData.phone}` // Add Iceland country code
        });
        
        // Submit the draft job request
        await api.submitDraftJobRequest(draftJobId);
        
        setSuccess('Your cleaning request has been submitted successfully!');
        
        // Clean up localStorage
        localStorage.removeItem('bc_draft_job_id');
        localStorage.removeItem('bc_selected_category');
        localStorage.removeItem('bc_selected_subcategory');
        
        // Navigate to success page or homepage after short delay
        setTimeout(() => {
          if (user) {
            navigate('/dashboard');
          } else {
            navigate('/', { state: { jobSubmitted: true } });
          }
        }, 2000);
      }
    } catch (err) {
      setError('Failed to submit your request. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/post/cleaning');
  };

  if (loading && !draftJobId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-lg hover:bg-white/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 max-w-md">
              {/* Progress Steps */}
              <div className="text-sm text-gray-600 font-medium mb-2">
                {translations.cleaningStepHeader || "About the job • Contact info • Complete"}
              </div>
              {/* Progress Bar - Step 2 of 3 */}
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-600 h-1 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-12">
          
          {/* Selected Service Display */}
          {selectedSubcategory && (
            <div className="mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <span className="text-blue-800 font-medium">
                  {subcategoryNames[selectedSubcategory] || selectedSubcategory}
                </span>
              </div>
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
            {translations.contactInfoTitle}
          </h1>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/* Contact Form */}
          <div className="space-y-6">
            
            {/* Email & Phone Row */}
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

            {/* Name Row */}
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

            {/* Address & Postcode Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
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
                  className="h-12"
                  placeholder="101"
                  maxLength={3}
                  required
                />
              </div>
            </div>

            {/* Contact Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                {translations.contactPreference} <span className="text-red-500">*</span>
              </label>
              
              <div className="flex rounded-lg border border-gray-300 p-1 bg-gray-50">
                <button
                  type="button"
                  onClick={() => updateFormData('contactPreference', 'platform_and_phone')}
                  className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all ${
                    formData.contactPreference === 'platform_and_phone'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {translations.contactPreferenceBoth}
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData('contactPreference', 'platform_only')}
                  className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all ${
                    formData.contactPreference === 'platform_only'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {translations.contactPreferencePlatform}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner className="w-5 h-5 mr-2" />
                    {translations.submittingJob}
                  </div>
                ) : (
                  translations.submitCleaningRequest || 'Submit Cleaning Request'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleaningContactForm;