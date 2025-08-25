'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

const JobPostingWizard = ({ translations, language, category }) => {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data
  const [formData, setFormData] = useState({
    category: category || '',
    title: '',
    description: '',
    licensePlate: '',  // For automotive category
    plateCountry: 'IS',  // Default to Iceland
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    postcode: '',
    contactPreference: 'platform_and_phone'
  });

  const categoryNames = {
    handcraft: language === 'is' ? 'Handverk' : 'Håndverker',
    bathroom: language === 'is' ? 'Baðherbergi' : 'Baderom',
    automotive: language === 'is' ? 'Bílar' : 'Biler',
    majorProjects: language === 'is' ? 'Stór verkefni' : 'Store prosjekter',
    cleaning: language === 'is' ? 'Þrif' : 'Rengjøring',
    housingAssociations: language === 'is' ? 'Íbúðasamfélög' : 'Borettslag',
    moving: language === 'is' ? 'Flutningar' : 'Flytting',
    electrical: language === 'is' ? 'Rafmagn' : 'Elektrikere',
    plumbing: language === 'is' ? 'Pípulagnir' : 'Rørlegger'
  };

  const steps = [
    { 
      number: 1, 
      title: translations.jobStep1Title || (language === 'is' ? 'Um verkefnið' : 'About the job'),
      subtitle: translations.jobStep1Subtitle || (language === 'is' ? 'Lýstu verkefninu' : 'Describe the job')
    },
    { 
      number: 2, 
      title: translations.jobStep2Title || (language === 'is' ? 'Tengiliðaupplýsingar' : 'Contact info'),
      subtitle: translations.jobStep2Subtitle || (language === 'is' ? 'Hvernig á að hafa samband' : 'How to contact you')
    },
    { 
      number: 3, 
      title: translations.jobStep3Title || (language === 'is' ? 'Lokið' : 'Complete'),
      subtitle: translations.jobStep3Subtitle || (language === 'is' ? 'Farðu yfir og sendu inn' : 'Review and submit')
    }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep1 = () => {
    // For automotive category, validate license plate instead of title/description
    if (formData.category === 'automotive') {
      if (!formData.licensePlate || formData.licensePlate.length < 2 || formData.licensePlate.length > 8) {
        setError(translations.jobPlateValidationError || (language === 'is' ? 'Númeraplata verður að vera 2-8 stafir' : 'License plate must be 2-8 characters'));
        return false;
      }
      return true;
    }

    if (!formData.title || formData.title.length < 10) {
      setError(translations.jobTitleValidationError || (language === 'is' ? 'Titill verður að vera að minnsta kosti 10 stafir' : 'Title must be at least 10 characters'));
      return false;
    }
    if (!formData.description || formData.description.length < 30) {
      setError(translations.jobDescriptionValidationError || (language === 'is' ? 'Lýsing verður að vera að minnsta kosti 30 stafir' : 'Description must be at least 30 characters'));
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.email || !formData.email.includes('@')) {
      setError(translations.jobEmailValidationError || (language === 'is' ? 'Gilt netfang er áskilið' : 'Valid email address is required'));
      return false;
    }
    if (!formData.phone || formData.phone.length < 7) {
      setError(translations.jobPhoneValidationError || (language === 'is' ? 'Gilt símanúmer er áskilið' : 'Valid phone number is required'));
      return false;
    }
    if (!formData.firstName || formData.firstName.length < 2) {
      setError(translations.jobFirstNameValidationError || (language === 'is' ? 'Fornafn er áskilið' : 'First name is required'));
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
        setCurrentStep(2);
      } else if (currentStep === 2) {
        if (!validateStep2()) {
          setLoading(false);
          return;
        }
        setCurrentStep(3);
      }
    } catch (err) {
      setError(translations.jobStepError || (language === 'is' ? 'Villa kom upp. Reyndu aftur.' : 'An error occurred. Please try again.'));
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
      // Here you would normally submit to the backend
      // For now, just show success message
      setSuccess(language === 'is' ? 'Verkefni sent inn!' : 'Jobb sendt inn!');
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError(translations.jobSubmissionError || (language === 'is' ? 'Villa við innsendingu. Reyndu aftur.' : 'Submission error. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const renderProgressBar = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step.number <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {step.number < currentStep ? <Check className="h-4 w-4" /> : step.number}
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`w-20 h-1 mx-2 ${
                step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} 
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStepTitle = () => {
    const currentStepInfo = steps[currentStep - 1];
    return (
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentStepInfo.title}
        </h2>
        <p className="text-gray-600">
          {currentStepInfo.subtitle}
        </p>
      </div>
    );
  };

  const renderStep1 = () => {
    if (formData.category === 'automotive') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.jobLicensePlateLabel || (language === 'is' ? 'Númeraplata' : 'License Plate')}
            </label>
            <input
              type="text"
              value={formData.licensePlate}
              onChange={(e) => updateFormData('licensePlate', e.target.value.toUpperCase())}
              placeholder={translations.jobLicensePlatePlaceholder || (language === 'is' ? 'T.d. ABC123' : 'e.g. ABC123')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={8}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.jobWhatNeedHelpWith || (language === 'is' ? 'Hvað þarftu hjálp við?' : 'What do you need help with?')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder={translations.jobDescribeProblemPlaceholder || (language === 'is' ? 'Lýstu því sem þarf að gera við bílinn...' : 'Describe what needs to be done with the car...')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={6}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.length}/30 {translations.jobCharactersMinimum || (language === 'is' ? 'stafir (lágmark)' : 'characters (minimum)')}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.jobWhatNeedHelpWith || (language === 'is' ? 'Hvað þarftu hjálp við?' : 'What do you need help with?')}
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            placeholder={translations.jobTitlePlaceholder || (language === 'is' ? 'Stutt útskýring á verkefninu' : 'Brief description of the job')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.title.length}/10 {translations.jobCharactersMinimum || (language === 'is' ? 'stafir (lágmark)' : 'characters (minimum)')}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.jobDescriptionLabel || (language === 'is' ? 'Lýsing' : 'Description')}
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder={translations.jobDescriptionPlaceholder || (language === 'is' ? 'Lýstu verkefninu nánar...' : 'Describe the job in more detail...')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={6}
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.description.length}/30 {translations.jobCharactersMinimum || (language === 'is' ? 'stafir (lágmark)' : 'characters (minimum)')}
          </p>
        </div>
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.jobFirstNameLabel || (language === 'is' ? 'Fornafn' : 'First Name')}
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.jobLastNameLabel || (language === 'is' ? 'Eftirnafn' : 'Last Name')}
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {translations.jobEmailLabel || (language === 'is' ? 'Netfang' : 'Email')}
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {translations.jobPhoneLabel || (language === 'is' ? 'Símanúmer' : 'Phone Number')}
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {translations.jobPostcodeLabel || (language === 'is' ? 'Póstnúmer' : 'Postcode')}
        </label>
        <input
          type="text"
          value={formData.postcode}
          onChange={(e) => updateFormData('postcode', e.target.value)}
          placeholder={translations.jobPostcodePlaceholder || (language === 'is' ? 'T.d. 101' : 'e.g. 101')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          {translations.jobSummaryTitle || (language === 'is' ? 'Yfirlit verkefnis' : 'Job Summary')}
        </h3>
        
        <div className="space-y-3">
          <div>
            <span className="font-medium">{translations.jobCategoryLabel || (language === 'is' ? 'Flokkur:' : 'Category:')}</span>
            <span className="ml-2">{categoryNames[formData.category]}</span>
          </div>
          
          {formData.category === 'automotive' ? (
            <div>
              <span className="font-medium">{translations.jobLicensePlateLabel || (language === 'is' ? 'Númeraplata:' : 'License Plate:')}</span>
              <span className="ml-2">{formData.licensePlate}</span>
            </div>
          ) : (
            <div>
              <span className="font-medium">{translations.jobTitleLabel || (language === 'is' ? 'Titill:' : 'Title:')}</span>
              <span className="ml-2">{formData.title}</span>
            </div>
          )}
          
          <div>
            <span className="font-medium">{translations.jobDescriptionLabel || (language === 'is' ? 'Lýsing:' : 'Description:')}</span>
            <p className="mt-1 text-sm text-gray-600">{formData.description}</p>
          </div>
          
          <div>
            <span className="font-medium">{translations.jobContactPersonLabel || (language === 'is' ? 'Tengiliður:' : 'Contact Person:')}</span>
            <span className="ml-2">{formData.firstName} {formData.lastName}</span>
          </div>
          
          <div>
            <span className="font-medium">{translations.jobEmailLabel || (language === 'is' ? 'Netfang:' : 'Email:')}</span>
            <span className="ml-2">{formData.email}</span>
          </div>
          
          <div>
            <span className="font-medium">{translations.jobPhoneLabel || (language === 'is' ? 'Símanúmer:' : 'Phone:')}</span>
            <span className="ml-2">{formData.phone}</span>
          </div>
        </div>
      </div>
      
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700">{success}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4" />
              {translations.jobBackToHome || (language === 'is' ? 'Til baka' : 'Back')}
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {translations.jobPostProjectTitle || (language === 'is' ? 'Leggja inn verkefni' : 'Post Project')}
              </h1>
              <p className="text-sm text-gray-600">
                {categoryNames[formData.category]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {renderProgressBar()}
        {renderStepTitle()}
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={handleBack}
              disabled={currentStep === 1 || loading}
              className="px-6 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {translations.jobBackButton || (language === 'is' ? 'Til baka' : 'Back')}
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (translations.jobLoadingText || (language === 'is' ? 'Hleður...' : 'Loading...')) : (translations.jobNextButton || (language === 'is' ? 'Næsta' : 'Next'))}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || success}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (translations.jobSubmittingText || (language === 'is' ? 'Sendir...' : 'Submitting...')) : (translations.jobSubmitButton || (language === 'is' ? 'Senda inn' : 'Submit'))}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingWizard;