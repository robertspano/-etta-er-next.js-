'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import apiService from '@/services/api';
import { translations } from '@/data/translations';

const Login = ({ language = 'en', setLanguage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = translations[language];

  // Handle success message from registration
  useEffect(() => {
    const message = searchParams.get('message');
    const email = searchParams.get('email');
    
    if (message) {
      setSuccessMessage(decodeURIComponent(message));
    }
    
    if (email) {
      setFormData(prev => ({ ...prev, email: decodeURIComponent(email) }));
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {};
    
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
    setErrors({});
    
    try {
      console.log('Attempting login with:', formData.email);
      
      const loginResponse = await apiService.login(formData.email, formData.password);
      console.log('Login response:', loginResponse);
      
      // Wait a moment for cookie to be set
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try to get user info to determine redirect
      try {
        const userInfo = await apiService.getCurrentUser();
        console.log('User info:', userInfo);
        
        // Redirect based on user role
        if (userInfo.role === 'professional') {
          router.push('/dashboard/professional');
        } else if (userInfo.role === 'admin') {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard/customer');
        }
      } catch (userError) {
        console.error('Failed to get user info after login:', userError);
        // Still consider login successful, redirect to professional dashboard (default for company registration)
        router.push('/dashboard/professional');
      }
      
    } catch (error) {
      console.error('Failed to login:', error);
      setErrors({ 
        submit: error.message || (language === 'is' ? 'Innskráning mistókst. Vinsamlegast athugaðu netfang og lykilorð.' : 'Login failed. Please check your email and password.')
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <LogIn className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'is' ? 'Skrá inn' : 'Sign In'}
            </h1>
            <p className="text-sm text-gray-600">
              {language === 'is' 
                ? 'Skráðu þig inn í þinn BuildConnect reikning' 
                : 'Sign in to your BuildConnect account'}
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'is' ? 'Netfang' : 'Email'} *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={language === 'is' ? 'Sláðu inn netfang' : 'Enter your email'}
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
                {language === 'is' ? 'Lykilorð' : 'Password'} *
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={language === 'is' ? 'Sláðu inn lykilorð' : 'Enter your password'}
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

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.submit}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              {loading 
                ? (language === 'is' ? 'Skrái inn...' : 'Signing in...') 
                : (language === 'is' ? 'Skrá inn' : 'Sign In')
              }
            </Button>
          </form>

          {/* Footer Links */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              {language === 'is' ? 'Ert þú ekki með reikning?' : "Don't have an account?"}{' '}
              <Link href="/register-company" className="text-blue-500 hover:text-blue-600 font-medium">
                {language === 'is' ? 'Skrá fyrirtæki' : 'Register as Company'}
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              <Link href="/forgot-password" className="text-blue-500 hover:text-blue-600">
                {language === 'is' ? 'Gleymdirðu lykilorðið?' : 'Forgot your password?'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;