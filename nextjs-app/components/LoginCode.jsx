'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { translations } from '@/data/translations';
import apiService from '@/services/api';

const LoginCode = ({ language = 'en', setLanguage }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = translations[language];
  const inputRefs = useRef([]);

  useEffect(() => {
    // Get email from URL params or localStorage
    const emailFromUrl = searchParams.get('email') || localStorage.getItem('loginEmail') || '';
    setEmail(emailFromUrl);
  }, [searchParams]);

  useEffect(() => {
    // Countdown timer
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Clear errors when user starts typing
      if (errors.code) {
        setErrors({});
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setErrors({ code: language === 'is' ? 'Vinsamlegast sláðu inn alla 6 tölustafina' : 'Please enter all 6 digits' });
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      // Verify code with backend
      await apiService.verifyLoginCode(email, fullCode);
      
      // Redirect to dashboard
      router.push('/dashboard/customer');
      
    } catch (error) {
      console.error('Failed to verify code:', error);
      setErrors({ 
        code: error.message || (language === 'is' ? 'Ógildur kóði. Reyndu aftur.' : 'Invalid code. Please try again.')
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

            {/* Email sent message */}
            <div className="text-center text-gray-700 mb-6 bg-green-50 p-4 rounded-lg">
              <p className="text-sm">
                {language === 'is' 
                  ? `Ein tölvupóstur er sendur til ${email} ef þú átt reikning hjá okkur.`
                  : `An email has been sent to ${email} if you have an account with us.`}
              </p>
            </div>

            {/* Code input instruction */}
            <h2 className="text-lg font-semibold text-center text-gray-900 mb-6">
              {language === 'is' ? 'Skrifaðu inn kóða úr tölvupósti' : 'Enter code from email'}
            </h2>

            {/* Code Input Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 6 Digit Code Input */}
              <div className="flex justify-center space-x-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-12 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.code ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-center text-sm text-gray-600">
                {timeLeft > 0 ? (
                  <p>
                    {language === 'is' ? 'Kóðinn rennur út eftir' : 'Code expires in'} {formatTime(timeLeft)} {language === 'is' ? 'mínútur' : 'minutes'}
                  </p>
                ) : (
                  <p className="text-red-600">
                    {language === 'is' ? 'Kóðinn er útrunninn' : 'Code has expired'}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {errors.code && (
                <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {errors.code}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || code.join('').length !== 6 || timeLeft <= 0}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg transition-colors"
              >
                {loading 
                  ? (language === 'is' ? 'Staðfestir...' : 'Verifying...') 
                  : (language === 'is' ? 'Skrá inn' : 'Login')
                }
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-3">
              <Link 
                href={`/login-passwordless-confirm?email=${encodeURIComponent(email)}`}
                className="block text-blue-600 hover:text-blue-700 text-sm"
              >
                {language === 'is' ? 'Senda nýjan kóða' : 'Send new code'}
              </Link>
              
              <Link 
                href={`/login?email=${encodeURIComponent(email)}`}
                className="block text-blue-600 hover:text-blue-700 text-sm"
              >
                {language === 'is' ? 'Skrá inn með lykilorði' : 'Login with password'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCode;