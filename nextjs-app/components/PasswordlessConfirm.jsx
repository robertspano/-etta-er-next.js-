'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { translations } from '@/data/translations';
import apiService from '@/services/api';

const PasswordlessConfirm = ({ language = 'en', setLanguage }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = translations[language];

  useEffect(() => {
    // Get email from URL params or localStorage
    const emailFromUrl = searchParams.get('email') || localStorage.getItem('loginEmail') || '';
    setEmail(emailFromUrl);
    
    // Check if email was recently sent for this session
    const lastSentTime = localStorage.getItem(`emailSent_${emailFromUrl}`);
    if (lastSentTime && Date.now() - parseInt(lastSentTime) < 60000) { // 60 seconds
      setEmailSent(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setErrors({ email: language === 'is' ? 'Netfang er nauðsynlegt' : 'Email is required' });
      return;
    }

    // Prevent double submission
    if (loading || emailSent) {
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      // Send passwordless login request to backend
      await apiService.sendLoginLink(email);
      
      // Mark email as sent
      setEmailSent(true);
      
      // Store email and redirect to code entry page
      localStorage.setItem('loginEmail', email);
      
      // Small delay to show loading state, then redirect
      setTimeout(() => {
        router.push(`/login-code?email=${encodeURIComponent(email)}`);
      }, 1000);
      
    } catch (error) {
      console.error('Failed to send login link:', error);
      setErrors({ 
        submit: error.message || (language === 'is' ? 'Villa kom upp. Reyndu aftur.' : 'An error occurred. Please try again.')
      });
      setEmailSent(false);
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
    <div className="min-h-screen bg-gray-50 pt-16">

      {/* Main Content */}
      <div className="flex items-center justify-center py-20 px-4">
        <div className="max-w-lg w-full">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg p-12">
            {/* Email Icon with Lock - exactly like mittanbud */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Mail envelope */}
                <div className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Mail className="h-12 w-12 text-gray-500" />
                </div>
                {/* Blue lock overlay */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Title - exactly like mittanbud */}
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {language === 'is' ? 'Innskráning án lykilorðs' : 'Login without password'}
            </h1>

            {/* Description with user's email - exactly like mittanbud */}
            <div className="text-center text-gray-700 mb-8 leading-relaxed">
              <p>
                {language === 'is' 
                  ? `Á verki þarftu ekki að muna lykilorðið þitt. Smelltu á hnappinn til að fá innskráningartengil sendann á netfangið `
                  : `On verki you don't need to remember your password. Click the button to receive a login link to the email `}
                <span className="font-medium">{email}</span>.
              </p>
            </div>

            {/* Submit Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Submit Button - exactly like mittanbud */}
              <button
                type="submit"
                disabled={loading || emailSent}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg transition-colors"
              >
                {emailSent 
                  ? (language === 'is' ? 'Tölvupóstur sendur!' : 'Email sent!')
                  : loading 
                    ? (language === 'is' ? 'Sendir...' : 'Sending...') 
                    : (language === 'is' ? 'Senda mér innskráningartengil' : 'Send me login link')
                }
              </button>
            </form>

            {/* Error Message */}
            {errors.submit && (
              <div className="mt-4 text-center text-sm text-red-600">
                {errors.submit}
              </div>
            )}

            {/* Footer Link - exactly like mittanbud */}
            <div className="mt-8 text-center">
              <Link 
                href={`/login-with-password?email=${encodeURIComponent(email)}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {language === 'is' ? 'Innskráning með lykilorði' : 'Login with password'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordlessConfirm;