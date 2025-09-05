'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, User, MapPin, MessageSquare } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { translations } from '@/data/translations';

const ContactInfo = ({ language = 'en', setLanguage }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    contactPreference: 'platform_and_phone' // platform_and_phone or platform_only
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const t = translations[language];

  const validateForm = () => {
    const newErrors = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = language === 'is' ? 'Fornafn er nauðsynlegt' : 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = language === 'is' ? 'Fornafn verður að vera að minnsta kosti 2 stafir' : 'First name must be at least 2 characters';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = language === 'is' ? 'Eftirnafn er nauðsynlegt' : 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = language === 'is' ? 'Eftirnafn verður að vera að minnsta kosti 2 stafir' : 'Last name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = language === 'is' ? 'Netfang er nauðsynlegt' : 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = language === 'is' ? 'Vinsamlegast sláðu inn gilt netfang' : 'Please enter a valid email address';
    }
    
    // Phone validation (Iceland format)
    const phoneClean = formData.phone.replace(/[\s\-]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'is' ? 'Símanúmer er nauðsynlegt' : 'Phone number is required';
    } else if (!/^\+?354?\d{7}$/.test(phoneClean) && !/^\d{7}$/.test(phoneClean)) {
      newErrors.phone = language === 'is' ? 'Vinsamlegast sláðu inn gilt íslenskt símanúmer' : 'Please enter a valid Icelandic phone number';
    }
    
    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = language === 'is' ? 'Heimilisfang er nauðsynlegt' : 'Address is required';
    }
    
    // Postal code validation (Iceland format)
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = language === 'is' ? 'Póstnúmer er nauðsynlegt' : 'Postal code is required';
    } else if (!/^\d{3}$/.test(formData.postalCode)) {
      newErrors.postalCode = language === 'is' ? 'Póstnúmer verður að vera 3 tölustafir' : 'Postal code must be 3 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Here you would normally save the contact info
      console.log('Contact info submitted:', formData);
      
      // For now, just show success and redirect
      alert(language === 'is' ? 'Tengiliðaupplýsingar mótteknar!' : 'Contact information received!');
      router.push('/');
      
    } catch (error) {
      console.error('Failed to submit contact info:', error);
      setErrors({ 
        submit: error.message || (language === 'is' ? 'Villa kom upp. Vinsamlegast reyndu aftur.' : 'An error occurred. Please try again.')
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    if (setLanguage) {
      setLanguage(language === 'en' ? 'is' : 'en');
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url('https://customer-assets.emergentagent.com/job_craft-connect-11/artifacts/czdu1dn3_pexels-freestockpro-12932486.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Main Content */}
      <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-2xl w-full">
          {/* Header with Back Button */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">
                {language === 'is' ? 'Til baka' : 'Back'}
              </span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {language === 'is' ? 'Tengiliðaupplýsingar' : 'Contact Information'}
              </h1>
              <p className="text-gray-600 mt-1">
                {language === 'is' 
                  ? 'Hvernig á að hafa samband' 
                  : 'How should we contact you?'}
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 mr-2" />
                    {language === 'is' ? 'Fornafn' : 'First Name'} *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={language === 'is' ? 'Sláðu inn fornafn' : 'Enter first name'}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`h-12 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 mr-2" />
                    {language === 'is' ? 'Eftirnafn' : 'Last Name'} *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder={language === 'is' ? 'Sláðu inn eftirnafn' : 'Enter last name'}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`h-12 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 mr-2" />
                  {language === 'is' ? 'Netfang' : 'Email'} *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={language === 'is' ? 'Sláðu inn netfang' : 'Enter email address'}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`h-12 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {language === 'is' 
                    ? 'Netfangið þitt verður notað til að senda þér tilboð og samskipti.' 
                    : 'Your email will be used to send you quotes and communications.'}
                </p>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  {language === 'is' ? 'Símanúmer' : 'Phone Number'} *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    +354
                  </span>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={language === 'is' ? '7877887' : '7877887'}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`h-12 pl-16 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {language === 'is' ? 'Heimilisfang' : 'Address'} *
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder={language === 'is' ? 'Sláðu inn heimilisfang' : 'Enter your address'}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`h-12 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postalCode" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {language === 'is' ? 'Póstnúmer' : 'Postal Code'} *
                </label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder={language === 'is' ? '101' : '101'}
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className={`h-12 max-w-32 ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                  maxLength={3}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                )}
              </div>

              {/* Contact Preference */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {language === 'is' ? 'Hvernig óskaru eftir að fyrirtækið hafi samband?' : 'How would you like companies to contact you?'}
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="platform_and_phone"
                      checked={formData.contactPreference === 'platform_and_phone'}
                      onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                      className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500"
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
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="platform_only"
                      checked={formData.contactPreference === 'platform_only'}
                      onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                      className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500"
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

              {/* Submit Error */}
              {errors.submit && (
                <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg">
                  {errors.submit}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  onClick={() => router.back()}
                  variant="outline"
                  className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {language === 'is' ? 'Til baka' : 'Back'}
                </Button>
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                  {loading 
                    ? (language === 'is' ? 'Sendir...' : 'Submitting...') 
                    : (language === 'is' ? 'Næsta' : 'Next')
                  }
                </Button>
              </div>
            </form>

            {/* Footer Note */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                {language === 'is' 
                  ? 'Með því að halda áfram samþykkir þú notkunarskilmála okkar fyrir verki. Þú getur lesið meira um meðferð persónuupplýsinga í persónuverndarstefnu okkar.' 
                  : 'By continuing, you agree to our terms of use for verki. You can read more about the handling of personal information in our privacy policy.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;