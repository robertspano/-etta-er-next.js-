'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Mail, Lock } from 'lucide-react';
import { translations } from '../../data/translations';

const LoginForm = ({ language = 'en' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { login, error, clearError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = translations[language];

  // Clear any existing errors when component mounts
  useEffect(() => {
    clearError();
    
    // Check for success message in URL params (from registration)
    const message = searchParams.get('message');
    const email = searchParams.get('email');
    if (message) {
      setSuccessMessage(message);
    }
    if (email) {
      setFormData(prev => ({ ...prev, email }));
    }
  }, [clearError, searchParams]);

  // Get return URL from query params
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors and success message when user starts typing
    if (error) {
      clearError();
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    setIsLoading(true);
    try {
      // Use auto-login API that creates user if not exists
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://build-connect-9.preview.emergentagent.com';
      const response = await fetch(`${backendUrl}/api/auth/auto-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
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
        
        // Redirect to customer dashboard or specified returnUrl
        router.push(returnUrl === '/dashboard' ? '/dashboard/customer' : returnUrl);
      } else {
        throw new Error('LOGIN_FAILED');
      }
    } catch (err) {
      clearError();
      // Set error message for display
      console.error('Auto-login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t.login}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t.dontHaveAccount}{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t.signUp}
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">{t.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.email}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t.password}
                />
              </div>
            </div>
          </div>

          {successMessage && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {t.forgotPassword}
            </Link>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !formData.email || !formData.password}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.loginButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;