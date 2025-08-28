'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { translations } from '@/data/translations';
import apiService from '@/services/api';

const Login = ({ language = 'en', setLanguage }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = translations[language];

  // Handle email from URL params or localStorage
  useEffect(() => {
    const emailFromUrl = searchParams.get('email') || localStorage.getItem('loginEmail') || '';
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setErrors({ email: language === 'is' ? 'Netfang er nauðsynlegt' : 'Email is required' });
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors({ email: language === 'is' ? 'Ugyldig e-postadresse' : 'Invalid email address' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (errors.email) {
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    setLoading(true);
    
    try {
      // Use the passwordless login API
      await apiService.sendLoginLink(email);
      
      // Store email for next step
      localStorage.setItem('loginEmail', email);
      
      // Redirect to confirmation page
      router.push(`/login-passwordless-confirm?email=${encodeURIComponent(email)}`);
      
    } catch (error) {
      console.error('Failed to send login link:', error);
      setErrors({ 
        submit: error.message || (language === 'is' ? 'Villa kom upp. Reyndu aftur.' : 'An error occurred. Please try again.')
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
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Main Content */}
      <div className="flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full">
          {/* Login Card - Like mittanbud */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {language === 'is' ? 'Logg inn' : 'Log in'}
            </h1>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email - Like mittanbud */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'is' ? 'E-post' : 'Email'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="din@epost.no"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-honolulu_blue focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg">
                  {errors.submit}
                </div>
              )}

              {/* Next Button - Like mittanbud */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-honolulu_blue text-white rounded-lg hover:bg-federal_blue disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {loading 
                  ? (language === 'is' ? 'Sendir...' : 'Sending...') 
                  : (language === 'is' ? 'Neste' : 'Next')
                }
              </button>
            </form>

            {/* Footer Links - Like mittanbud - All together without "Or" */}
            <div className="mt-6">
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col space-y-3 text-center">
                  <Link href="/forgot-email" className="text-honolulu_blue hover:text-federal_blue text-sm">
                    {language === 'is' ? 'Glemt e-post?' : 'Forgot email?'}
                  </Link>
                  
                  <Link 
                    href={`/login-with-password?email=${encodeURIComponent(email)}`}
                    className="text-honolulu_blue hover:text-federal_blue text-sm"
                  >
                    {language === 'is' ? 'Logg inn med passord' : 'Login with password'}
                  </Link>
                  
                  <Link 
                    href="/register-company" 
                    className="text-honolulu_blue hover:text-federal_blue text-sm font-medium"
                  >
                    {language === 'is' ? 'Registrer ny bedrift' : 'Register new company'}
                  </Link>
                  
                  <Link 
                    href="/post-job" 
                    className="text-honolulu_blue hover:text-federal_blue text-sm font-medium"
                  >
                    {language === 'is' ? 'Legg ut jobb' : 'Post job'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;