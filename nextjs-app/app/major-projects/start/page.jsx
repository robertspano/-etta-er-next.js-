'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from '../../../contexts/TranslationsContext';

const MajorProjectsStartPage = () => {
  const { translations, language } = useTranslations();
  const [searchParams] = useSearchParams();
  const router = useRouter();
  const category = searchParams?.get('category') || '';
  
  const [formData, setFormData] = useState({
    category: category,
    projectTitle: '',
    description: '',
    location: '',
    name: '',
    email: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Category translations map
  const categoryTranslations = {
    fullRenovation: translations.xlFullRenovation,
    windowsDoors: translations.xlWindowsDoors,
    facade: translations.xlFacade,
    extensions: translations.xlExtensions,
    bathroom: translations.xlBathroom,
    loft: translations.xlLoft,
    partialRenovation: translations.xlPartialRenovation,
    roof: translations.xlRoof,
    housingAssociations: translations.xlHousingAssociations,
    basement: translations.xlBasement,
    garage: translations.xlGarage,
    otherCategories: translations.xlOtherCategories
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // For now, just simulate success (since we don't have the backend endpoint)
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
      }, 1500);
      
      // Later implement: Submit to backend API
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/xl/leads`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     language: language
      //   })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to submit project');
      // }
      
    } catch (err) {
      console.error('Error submitting XL lead:', err);
      setError('Failed to submit project. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {translations.xlSuccessTitle}
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {translations.xlSuccessMessage}
            </p>
            
            <button
              onClick={() => router.push('/major-projects')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {translations.xlBackToXL}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 max-w-3xl py-16">
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/major-projects')}
              className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 19l-7-7 7-7" />
              </svg>
              {translations.xlBackToXL}
            </button>
            
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {translations.xlLeadFormTitle}
            </h1>
            
            {category && (
              <p className="text-lg text-blue-600 font-medium">
                {categoryTranslations[category] || category}
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div>
              <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.xlProjectTitle} <span className="text-gray-400">({translations.optional})</span>
              </label>
              <input
                type="text"
                id="projectTitle"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleInputChange}
                placeholder={translations.xlProjectTitlePlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.xlProjectDescription} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={translations.xlProjectDescriptionPlaceholder}
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.xlLocation} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={translations.xlLocationPlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {translations.contactInfoTitle}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.xlContactName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.xlContactPhone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.xlContactEmail} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? 'Submitting...' : translations.xlSubmitLead}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MajorProjectsStartPage;