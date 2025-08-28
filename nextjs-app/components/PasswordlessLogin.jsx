'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { translations } from '@/data/translations';
import apiService from '@/services/api';

const PasswordlessLogin = ({ language = 'en', setLanguage }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const t = translations[language];

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setErrors({ email: language === 'is' ? 'Netfang er nauðsynlegt' : 'Email is required' });
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors({ email: language === 'is' ? 'Ógilt netfang' : 'Invalid email address' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    // Store email and redirect to confirmation page immediately
    localStorage.setItem('loginEmail', email);
    window.location.href = `/login-passwordless-confirm?email=${encodeURIComponent(email)}`;
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
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {language === 'is' ? 'Logg inn' : 'Login'}
            </h1>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'is' ? 'E-post' : 'Email'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({});
                  }}
                  placeholder="email@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {language === 'is' ? 'Ugyldig e-postadresse' : 'Invalid email address'}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {loading 
                  ? (language === 'is' ? 'Sender...' : 'Sending...') 
                  : (language === 'is' ? 'Neste' : 'Next')
                }
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-3">
              <Link href="/" className="block text-blue-600 hover:text-blue-700 text-sm">
                {language === 'is' ? 'Glemt e-post' : 'Forgot email'}
              </Link>
              
              <Link href="/register-company" className="block text-blue-600 hover:text-blue-700 text-sm">
                {language === 'is' ? 'Registrer ny bedrift' : 'Register new company'}
              </Link>
              
              <Link href="/post-job" className="block text-blue-600 hover:text-blue-700 text-sm">
                {language === 'is' ? 'Legg ut jobb' : 'Post job'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordlessLogin;