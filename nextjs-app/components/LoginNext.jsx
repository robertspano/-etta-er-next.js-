'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Check } from 'lucide-react';
import { translations } from '@/data/translations';

const LoginNext = ({ language = 'en', setLanguage }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = translations[language];

  useEffect(() => {
    // Get email from URL params or localStorage
    const emailFromUrl = searchParams.get('email') || localStorage.getItem('loginEmail') || '';
    setEmail(emailFromUrl);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For now, just redirect to dashboard
      // In a real app, you'd verify the email/token here
      router.push('/dashboard/customer');
    } catch (error) {
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
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    {language === 'is' 
                      ? `Innskráningartengill hefur verið sendur á ${email}` 
                      : `Login link has been sent to ${email}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-center text-gray-900 mb-6">
              {language === 'is' ? 'Athugaðu pósthólfið þitt' : 'Check your email'}
            </h1>

            {/* Description */}
            <p className="text-center text-gray-600 mb-8">
              {language === 'is' 
                ? 'Við höfum sent þér innskráningartengil. Smelltu á tengilinn í tölvupóstinum til að skrá þig inn.'
                : 'We have sent you a login link. Click the link in the email to sign in.'}
            </p>

            {/* Continue Button (for demo purposes) */}
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {loading 
                  ? (language === 'is' ? 'Hleður...' : 'Loading...') 
                  : (language === 'is' ? 'Halda áfram' : 'Continue')
                }
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center space-y-3">
              <p className="text-sm text-gray-600">
                {language === 'is' ? 'Fékkstu ekki tölvupóst?' : "Didn't receive an email?"}
              </p>
              
              <Link 
                href="/login-passwordless" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                {language === 'is' ? 'Senda aftur' : 'Resend'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNext;