'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Building2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import apiService from '@/services/api';
import { translations } from '@/data/translations';

const CompanyRegistration = ({ language = 'en', setLanguage }) => {
  const [formData, setFormData] = useState({
    companyId: '',
    electronicId: '',
    name: '',
    email: 'glaesithreinsunn@gmail.com', // Pre-filled as shown in screenshot
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const t = translations[language];

  const validateForm = () => {
    const newErrors = {};
    
    // Company ID validation (Icelandic kennitala format: 10 digits)
    if (!formData.companyId.trim()) {
      newErrors.companyId = language === 'is' ? 'Kennitala er nauðsynleg' : 'Company ID is required';
    } else if (!/^\d{10}$/.test(formData.companyId.replace(/[-\s]/g, ''))) {
      newErrors.companyId = language === 'is' ? 'Kennitala verður að vera 10 tölustafir' : 'Company ID must be 10 digits';
    }
    
    // Electronic ID/Phone validation
    if (!formData.electronicId.trim()) {
      newErrors.electronicId = language === 'is' ? 'Rafræn auðkenning er nauðsynleg' : 'Electronic ID is required';
    } else if (!/^\d{7,8}$/.test(formData.electronicId.replace(/[-\s]/g, ''))) {
      newErrors.electronicId = language === 'is' ? 'Símanúmer verður að vera 7-8 tölustafir' : 'Phone number must be 7-8 digits';
    }
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = language === 'is' ? 'Nafn er nauðsynlegt' : 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = language === 'is' ? 'Nafn verður að vera að minnsta kosti 2 stafir' : 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = language === 'is' ? 'Netfang er nauðsynlegt' : 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = language === 'is' ? 'Vinsamlegast sláðu inn gilt netfang' : 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = language === 'is' ? 'Lykilorð er nauðsynlegt' : 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = language === 'is' ? 'Lykilorð verður að vera að minnsta kosti 8 stafir' : 'Password must be at least 8 characters';
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
      // Call the company registration API
      const response = await apiService.registerCompany({
        company_id: formData.companyId,
        electronic_id: formData.electronicId,
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Navigate to login page with success message
      router.push(`/login?message=${encodeURIComponent(
        language === 'is' 
          ? 'Fyrirtæki skráð með góðum árangri! Vinsamlegast skráðu þig inn.' 
          : 'Company registered successfully! Please log in.'
      )}&email=${encodeURIComponent(formData.email)}`);
      
    } catch (error) {
      console.error('Failed to register company:', error);
      setErrors({ 
        submit: error.message || (language === 'is' ? 'Villa kom upp við skráningu. Vinsamlegast reyndu aftur.' : 'Registration failed. Please try again.')
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              {t.siteName}
            </Link>
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <span className="text-sm font-medium">
                  {language === 'en' ? 'EN' : 'IS'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t.companyRegistrationTitle}
            </h1>
            <p className="text-sm text-gray-600">
              {language === 'is' 
                ? 'Settu inn samband við prókúruhafa fyrirtækisins til að auðkenna framleiðslu rafræn.' 
                : 'Enter contact information for company representative for electronic authentication.'}
            </p>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Company ID */}
            <div>
              <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-1">
                {t.companyIdLabel} *
              </label>
              <Input
                id="companyId"
                name="companyId"
                type="text"
                placeholder={t.companyIdPlaceholder}
                value={formData.companyId}
                onChange={(e) => handleInputChange('companyId', e.target.value)}
                className={`h-12 ${errors.companyId ? 'border-red-500' : 'border-gray-300'}`}
                maxLength={12} // Allow for formatting
              />
              {errors.companyId && (
                <p className="mt-1 text-sm text-red-600">{errors.companyId}</p>
              )}
            </div>

            {/* Electronic ID/Phone */}
            <div>
              <label htmlFor="electronicId" className="block text-sm font-medium text-gray-700 mb-1">
                {t.electronicIdLabel} *
              </label>
              <Input
                id="electronicId"
                name="electronicId"
                type="tel"
                placeholder={t.electronicIdPlaceholder}
                value={formData.electronicId}
                onChange={(e) => handleInputChange('electronicId', e.target.value)}
                className={`h-12 ${errors.electronicId ? 'border-red-500' : 'border-gray-300'}`}
                maxLength={10} // Allow for formatting
              />
              {errors.electronicId && (
                <p className="mt-1 text-sm text-red-600">{errors.electronicId}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t.nameLabel} *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`h-12 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.emailLabel} *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`h-12 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t.passwordLabel} *
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t.passwordPlaceholder}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`h-12 pr-12 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreement"
                  name="agreement"
                  type="checkbox"
                  required
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreement" className="text-gray-600">
                  {t.companyRegistrationAgreement}
                </label>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-sm text-red-600 text-center">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              {loading 
                ? (language === 'is' ? 'Skrái...' : 'Registering...') 
                : t.registerButton
              }
            </Button>
          </form>

          {/* Footer Links */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              {language === 'is' ? 'Ert þú með reikning?' : 'Already have an account?'}{' '}
              <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                {language === 'is' ? 'Skrá inn' : 'Sign in'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;