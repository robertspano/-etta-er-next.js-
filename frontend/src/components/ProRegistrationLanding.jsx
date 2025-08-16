import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Globe, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import apiService from '../services/api';

const ProRegistrationLanding = ({ translations, language, setLanguage }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
      // Submit the professional lead
      await apiService.createProLead({
        company_name: formData.companyName,
        email: formData.email
      });
      
      // Navigate to success page or next step
      navigate('/pro/welcome');
      
    } catch (error) {
      console.error('Failed to submit pro registration:', error);
      setErrors({ 
        submit: 'Failed to submit registration. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.companyName.trim() && 
                     formData.email.trim() && 
                     validateEmail(formData.email);

  return (
    <section className="min-h-screen bg-[#0e2a47] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left Column - Content & Form */}
          <div className="space-y-8">
            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                {translations.proRegistrationTitle}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                {translations.proRegistrationSubtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  {translations.proCompanyNameLabel}
                </label>
                <Input
                  type="text"
                  placeholder={translations.proCompanyNamePlaceholder}
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="h-12 bg-white text-gray-900 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-300">{errors.companyName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  {translations.proEmailLabel}
                </label>
                <Input
                  type="email"
                  placeholder={translations.proEmailPlaceholder}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 bg-white text-gray-900 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-300">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300"
              >
                {loading ? 'Loading...' : translations.proCtaButton}
              </Button>

              {/* Submit Error */}
              {errors.submit && (
                <p className="text-sm text-red-300">{errors.submit}</p>
              )}

              {/* Terms Text */}
              <p className="text-sm text-blue-200 leading-relaxed">
                {translations.proTermsText}
              </p>
            </form>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6 order-first md:order-last">
            {/* Top Image - Professional with phone */}
            <div className="relative">
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-md flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <p className="text-blue-800 font-semibold">Professional Connection</p>
                </div>
              </div>
            </div>

            {/* Bottom Image - Craftsman working */}
            <div className="relative">
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl shadow-md flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                    </svg>
                  </div>
                  <p className="text-orange-800 font-semibold">Skilled Craftsman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProRegistrationLanding;