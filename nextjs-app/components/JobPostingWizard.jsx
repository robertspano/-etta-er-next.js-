'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const JobPostingWizard = ({ translations, language, category }) => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Authentication check - users must be logged in to post jobs (like Mittanbud)
  useEffect(() => {
    if (!authLoading && !user) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?returnUrl=${returnUrl}`;
      return;
    }
  }, [authLoading, user]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3 text-gray-600">
          {language === 'is' ? 'Athuga innskráningu...' : 'Checking authentication...'}
        </p>
      </div>
    );
  }

  // Don't render if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

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
    contactPreference: 'platform_and_phone',
    // Step 3 additional fields
    attachments: [],
    customerType: 'private', // private, business, housing_association, organization
    projectDescription: '',
    areaSize: '',
    materialsHandling: 'company', // company, customer, undecided
    documentationRequired: null, // true, false, null
    startDate: 'anytime' // anytime, specific_date
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
    if (!formData.phone || formData.phone.length < 7 || !/^\d+$/.test(formData.phone)) {
      setError(translations.jobPhoneValidationError || (language === 'is' ? 'Gilt símanúmer er áskilið (7 tölustafir)' : 'Valid phone number is required (7 digits)'));
      return false;
    }
    if (!formData.firstName || formData.firstName.length < 2) {
      setError(translations.jobFirstNameValidationError || (language === 'is' ? 'Fornafn er áskilið' : 'First name is required'));
      return false;
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      setError(translations.jobLastNameValidationError || (language === 'is' ? 'Eftirnafn er áskilið' : 'Last name is required'));
      return false;
    }
    if (!formData.address || formData.address.length < 5) {
      setError(translations.jobAddressValidationError || (language === 'is' ? 'Heimilisfang er áskilið' : 'Address is required'));
      return false;
    }
    if (!formData.postcode) {
      setError(translations.jobPostcodeValidationError || (language === 'is' ? 'Póstnúmer er áskilið' : 'Postal code is required'));
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
      // Prepare job data for backend
      const jobData = {
        category: formData.category,
        title: formData.title || null,
        description: formData.description || formData.projectDescription || null,
        postcode: formData.postcode,
        address: formData.address || null,
        license_plate: formData.licensePlate || null,
        plate_country: formData.plateCountry || null,
        priority: 'medium' // Default priority
      };

      // Submit job to backend (authenticated users only)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/api/job-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(jobData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit job');
      }

      const jobResult = await response.json();
      console.log('Job created successfully:', jobResult);

      // Store email for success page
      localStorage.setItem('submittedJobEmail', formData.email);
      localStorage.setItem('submittedJobId', jobResult.id);
      
      // Show success message briefly
      setSuccess(language === 'is' ? 'Verkefni sent inn! Fer í þín verkefni...' : 'Job submitted! Going to your dashboard...');
      
      // Redirect to dashboard to see the posted job
      setTimeout(() => {
        window.location.href = `/dashboard/customer`;
      }, 1500);
      
    } catch (err) {
      console.error('Job submission error:', err);
      setError(err.message || (translations.jobSubmissionError || (language === 'is' ? 'Villa við innsendingu. Reyndu aftur.' : 'Submission error. Please try again.')));
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
                ? 'bg-honolulu_blue text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {step.number < currentStep ? <Check className="h-4 w-4" /> : step.number}
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`w-20 h-1 mx-2 ${
                step.number < currentStep ? 'bg-honolulu_blue' : 'bg-gray-200'
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
      {/* Why do we need this section */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          {language === 'is' ? 'Hvers vegna þurfum við þetta?' : 'Why do we need this?'}
        </h3>
        <p className="text-sm text-blue-800">
          {language === 'is' 
            ? 'Netfangið þitt verður notað til að senda þér tilboð frá Mittanbud og viðeigandi upplýsingar fyrir verkefnið þitt, og það verður einnig sýnilegt fyrirtækjum sem velja.' 
            : 'Your email address will be used to send you quotes from Mittanbud and relevant information for your job, and it will also be visible to companies you choose.'}
        </p>
      </div>

      {/* Email field with validation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'is' ? 'Netfang' : 'Email'}
        </label>
        <div className="relative">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formData.email && formData.email.includes('@') 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300'
            }`}
            placeholder={language === 'is' ? 'Sláðu inn netfang' : 'Enter email address'}
          />
          {formData.email && formData.email.includes('@') && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phone field with validation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'is' ? 'Símanúmer' : 'Phone Number'}
        </label>
        <div className="flex">
          <select 
            className="px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-700"
            value="+354"
            readOnly
          >
            <option>+354</option>
          </select>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formData.phone && (formData.phone.length < 7 || !/^\d+$/.test(formData.phone))
                ? 'border-red-500' 
                : 'border-gray-300'
            }`}
            placeholder={language === 'is' ? 'Símanúmer' : 'Phone number'}
          />
        </div>
        {formData.phone && (formData.phone.length < 7 || !/^\d+$/.test(formData.phone)) && (
          <p className="text-sm text-red-600 mt-1">
            {language === 'is' ? 'Ógilt símanúmer' : 'Invalid phone number'}
          </p>
        )}
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'is' ? 'Fornafn' : 'First Name'}
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formData.firstName && formData.firstName.length >= 2 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300'
            }`}
            placeholder={language === 'is' ? 'Sláðu inn fornafn' : 'Enter first name'}
          />
          {formData.firstName && formData.firstName.length >= 2 && (
            <div className="absolute right-3 top-11">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'is' ? 'Eftirnafn' : 'Last Name'}
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                formData.lastName && formData.lastName.length >= 2 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300'
              }`}
              placeholder={language === 'is' ? 'Sláðu inn eftirnafn' : 'Enter last name'}
            />
            {formData.lastName && formData.lastName.length >= 2 && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'is' ? 'Verkefnisheimilisfang' : 'Project Address'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formData.address && formData.address.length >= 5 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300'
            }`}
            placeholder={language === 'is' ? 'Sláðu inn heimilisfang' : 'Enter address'}
          />
          {formData.address && formData.address.length >= 5 && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Postal code field */}
      <div className="w-48">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'is' ? 'Póstnúmer' : 'Postal Code'}
        </label>
        <input
          type="text"
          value={formData.postcode}
          onChange={(e) => updateFormData('postcode', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            !formData.postcode ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={language === 'is' ? 'T.d. 101' : 'e.g. 101'}
          maxLength={3}
        />
        {!formData.postcode && (
          <p className="text-sm text-red-600 mt-1">
            {language === 'is' ? 'Reiturinn er áskilinn' : 'Field is required'}
          </p>
        )}
      </div>

      {/* Contact preference */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {language === 'is' ? 'Hvernig óskaru eftir að fyrirtækið hafi samband?' : 'How would you like companies to contact you?'}
        </h3>
        <div className="space-y-3">
          <label className="flex items-start">
            <input
              type="radio"
              name="contactPreference"
              value="platform_and_phone"
              checked={formData.contactPreference === 'platform_and_phone'}
              onChange={(e) => updateFormData('contactPreference', e.target.value)}
              className="mt-1 mr-3 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <div>
              <div className="font-medium text-gray-900">
                {language === 'is' ? 'Í gegnum verki og síma' : 'Through verki and phone'}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'is' 
                  ? 'Fyrirtæki geta haft samband við þig bæði í gegnum vettvanginn og í síma' 
                  : 'Companies can contact you both through the platform and by phone'}
              </div>
            </div>
          </label>
          <label className="flex items-start">
            <input
              type="radio"
              name="contactPreference"
              value="platform_only"
              checked={formData.contactPreference === 'platform_only'}
              onChange={(e) => updateFormData('contactPreference', e.target.value)}
              className="mt-1 mr-3 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <div>
              <div className="font-medium text-gray-900">
                {language === 'is' ? 'Bara í gegnum verki' : 'Only through verki'}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'is' 
                  ? 'Fyrirtæki geta aðeins haft samband við þig í gegnum vettvanginn' 
                  : 'Companies can only contact you through the platform'}
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      {/* Success message at the top */}
      {success && (
        <div className="bg-pacific_cyan text-white rounded-lg p-4 mb-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Check className="w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold">
              {language === 'is' ? 'Verkefnið hefur verið sent til samþykktar' : 'The job has been submitted for approval'}
            </h3>
          </div>
          <p className="text-non_photo_blue">
            {language === 'is' 
              ? 'Þú munt fá tilboð frá fyrirtækjum innan skamms' 
              : 'You will receive quotes from companies shortly'}
          </p>
        </div>
      )}

      {/* Want more and better answers section */}
      <div className="bg-light_cyan rounded-lg p-6">
        <h3 className="text-lg font-semibold text-federal_blue mb-2">
          {language === 'is' ? 'Vilt þú fleiri og betri svör?' : 'Do you want more and better answers?'}
        </h3>
        <p className="text-honolulu_blue text-sm">
          {language === 'is' 
            ? 'Fylltu út spurningarnar hér að neðan, það er valfrjálst'
            : 'Fill out the questions below, it is optional'}
        </p>
      </div>

      {/* File upload section */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-3">
          {language === 'is' ? 'Myndir eða viðhengi fyrir verkefnið' : 'Pictures or attachments for the job'}
        </h4>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <div className="space-y-2">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <button
                type="button"
                className="text-honolulu_blue hover:text-federal_blue font-medium"
                onClick={() => {
                  // Handle file upload
                  console.log('File upload clicked');
                }}
              >
                {language === 'is' ? 'Hlaða upp mynd eða viðhengi' : 'Upload image or attachment'}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              {language === 'is' ? 'Dragðu skrár hingað eða smelltu til að velja' : 'Drag files here or click to select'}
            </p>
          </div>
        </div>
      </div>

      {/* Customer type */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          {language === 'is' ? 'Hver ertu sem viðskiptavinur?' : 'Who are you as a customer?'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="customerType"
              value="private"
              checked={formData.customerType === 'private'}
              onChange={(e) => updateFormData('customerType', e.target.value)}
              className="mr-3 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <span className="font-medium text-gray-900">
              {language === 'is' ? 'Einkaaðili' : 'Private person'}
            </span>
          </label>
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="customerType"
              value="business"
              checked={formData.customerType === 'business'}
              onChange={(e) => updateFormData('customerType', e.target.value)}
              className="mr-3 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <span className="font-medium text-gray-900">
              {language === 'is' ? 'Fyrirtæki' : 'Business'}
            </span>
          </label>
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="customerType"
              value="housing_association"
              checked={formData.customerType === 'housing_association'}
              onChange={(e) => updateFormData('customerType', e.target.value)}
              className="mr-3 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <span className="font-medium text-gray-900">
              {language === 'is' ? 'Íbúðasamfélag/Húsfélög' : 'Housing association'}
            </span>
          </label>
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="customerType"
              value="organization"
              checked={formData.customerType === 'organization'}
              onChange={(e) => updateFormData('customerType', e.target.value)}
              className="mr-3 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <span className="font-medium text-gray-900">
              {language === 'is' ? 'Félag' : 'Organization'}
            </span>
          </label>
        </div>
      </div>

      {/* Project description */}
      <div>
        <label className="block text-lg font-medium text-gray-900 mb-3">
          {language === 'is' 
            ? 'Getur þú gefið stutta lýsingu á því hvað verkefnið felur í sér?' 
            : 'Can you give a short description of what the project involves?'}
        </label>
        <textarea
          value={formData.projectDescription}
          onChange={(e) => updateFormData('projectDescription', e.target.value)}
          placeholder={language === 'is' 
            ? 'Lýstu verkefninu nánar hér...' 
            : 'Describe the project in more detail here...'}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
        />
      </div>

      {/* Area size */}
      <div>
        <label className="block text-lg font-medium text-gray-900 mb-3">
          {language === 'is' 
            ? 'Hversu stórt er svæðið sem á að meðhöndla? Getur þú gefið upp fermetrafjölda?' 
            : 'How big is the area to be treated? Can you specify square meters?'}
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={formData.areaSize}
            onChange={(e) => updateFormData('areaSize', e.target.value)}
            placeholder="0"
            className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-gray-700">
            {language === 'is' ? 'fermetrar' : 'square meters'}
          </span>
        </div>
      </div>

      {/* Materials handling */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          {language === 'is' 
            ? 'Á fyrirtækið að sjá um efnin, eða hefur þú þegar keypt þau?' 
            : 'Should the company arrange materials, or have you already bought them?'}
        </h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="materialsHandling"
              value="company"
              checked={formData.materialsHandling === 'company'}
              onChange={(e) => updateFormData('materialsHandling', e.target.value)}
              className="mr-3 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <span className="text-gray-900">
              {language === 'is' 
                ? 'Fyrirtækið á að sjá um efnin' 
                : 'The company should arrange materials'}
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="materialsHandling"
              value="customer"
              checked={formData.materialsHandling === 'customer'}
              onChange={(e) => updateFormData('materialsHandling', e.target.value)}
              className="mr-3 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <span className="text-gray-900">
              {language === 'is' 
                ? 'Ég hef þegar keypt efnin' 
                : 'I have already bought the materials'}
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="materialsHandling"
              value="undecided"
              checked={formData.materialsHandling === 'undecided'}
              onChange={(e) => updateFormData('materialsHandling', e.target.value)}
              className="mr-3 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <span className="text-gray-900">
              {language === 'is' 
                ? 'Óviss/á eftir að ákveða' 
                : 'Undecided/to be decided'}
            </span>
          </label>
        </div>
      </div>

      {/* Documentation requirement */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          {language === 'is' 
            ? 'Vilt þú skjölun í Húsgögnum?' 
            : 'Do you want documentation in the Housing folder?'}
        </h4>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="documentationRequired"
              value="true"
              checked={formData.documentationRequired === true}
              onChange={(e) => updateFormData('documentationRequired', true)}
              className="mr-2 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <span className="text-gray-900">
              {language === 'is' ? 'Já' : 'Yes'}
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="documentationRequired"
              value="false"
              checked={formData.documentationRequired === false}
              onChange={(e) => updateFormData('documentationRequired', false)}
              className="mr-2 h-4 w-4 text-honolulu_blue focus:ring-honolulu_blue"
            />
            <span className="text-gray-900">
              {language === 'is' ? 'Nei' : 'No'}
            </span>
          </label>
        </div>
      </div>

      {/* Start date */}
      <div>
        <label className="block text-lg font-medium text-gray-900 mb-3">
          {language === 'is' 
            ? 'Hvenær vilt þú að verkefnið eigi að byrja?' 
            : 'When do you want the job to start?'}
        </label>
        <select
          value={formData.startDate}
          onChange={(e) => updateFormData('startDate', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="anytime">
            {language === 'is' ? 'Hvenær sem er' : 'Anytime'}
          </option>
          <option value="asap">
            {language === 'is' ? 'Eins fljótt og auðið er' : 'As soon as possible'}
          </option>
          <option value="within_week">
            {language === 'is' ? 'Innan viku' : 'Within a week'}
          </option>
          <option value="within_month">
            {language === 'is' ? 'Innan mánaðar' : 'Within a month'}
          </option>
          <option value="specific_date">
            {language === 'is' ? 'Ákveðin dagsetning' : 'Specific date'}
          </option>
        </select>
      </div>

      {/* Summary section - REMOVED */}
    </div>
  );

  return (
    <div className="min-h-screen bg-light_cyan pt-20">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
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
                className="px-8 py-3 bg-honolulu_blue text-white rounded-lg hover:bg-federal_blue disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (translations.jobLoadingText || (language === 'is' ? 'Hleður...' : 'Loading...')) : (translations.jobNextButton || (language === 'is' ? 'Næsta' : 'Next'))}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || success}
                className="px-12 py-3 bg-honolulu_blue text-white rounded-lg hover:bg-federal_blue disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
              >
                {loading ? (translations.jobSubmittingText || (language === 'is' ? 'Sendir...' : 'Submitting...')) : (translations.jobSubmitButton || (language === 'is' ? 'Fullfør' : 'Complete'))}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingWizard;