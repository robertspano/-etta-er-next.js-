'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { translations } from '@/data/translations';
import apiService from '@/services/api';

const LoginWithPassword = ({ language = 'en', setLanguage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = translations[language];

  // Handle email from URL params or localStorage
  useEffect(() => {
    const emailFromUrl = searchParams.get('email') || localStorage.getItem('loginEmail') || '';
    setEmail(emailFromUrl);
  }, [searchParams]);

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!password.trim()) {
      newErrors.password = language === 'is' ? 'Lykilorð er nauðsynlegt' : 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      // Use auto-login API that creates user if not exists
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://verkefni-hub.preview.emergentagent.com';
      const response = await fetch(`${backendUrl}/api/auth/auto-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'LOGIN_FAILED');
      }

      const result = await response.json();
      
      if (result.success) {
        // Set user in localStorage for immediate access
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        
        // Redirect to customer dashboard (all auto-created users are customers)
        router.push('/dashboard/customer');
      } else {
        throw new Error('LOGIN_FAILED');
      }
      
    } catch (error) {
      console.error('Failed to auto-login:', error);
      console.error('Error details:', error.message);
      
      setErrors({ 
        submit: language === 'is' 
          ? `Innskráning mistókst: ${error.message}. Reyndu aftur.` 
          : `Login failed: ${error.message}. Please try again.`
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
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {language === 'is' ? 'Logg inn' : 'Log in'}
            </h1>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email - Pre-filled and disabled */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'is' ? 'E-post' : 'Email'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'is' ? 'Passord' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={language === 'is' ? 'Skriv inn passordet ditt' : 'Enter your password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-honolulu_blue focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
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

              {/* Submit Error */}
              {errors.submit && (
                <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg">
                  {errors.submit}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-honolulu_blue text-white rounded-lg hover:bg-federal_blue disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {loading 
                  ? (language === 'is' ? 'Logger inn...' : 'Logging in...') 
                  : (language === 'is' ? 'Logg inn' : 'Log in')
                }
              </button>
            </form>

            {/* Footer Links - Same as main login */}
            <div className="mt-6">
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col space-y-3 text-center">
                  <Link href="/forgot-password" className="text-honolulu_blue hover:text-federal_blue text-sm">
                    {language === 'is' ? 'Glemt passord?' : 'Forgot password?'}
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

export default LoginWithPassword;