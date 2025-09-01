'use client';

import React from 'react';
import LoggedInLayout from '../../../../components/LoggedInLayout';
import { useTranslations } from '../../../../contexts/TranslationsContext';
import { useAuth } from '../../../../contexts/AuthContext';

export default function ProfilePage() {
  const { language, translations } = useTranslations();
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return (
    <LoggedInLayout language={language} translations={translations}>
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {language === 'is' ? 'Prófill' : 'Profile'}
        </h1>
        
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-gray-600">
            {language === 'is' 
              ? 'Prófílsíða í þróun...'
              : 'Profile page under development...'
            }
          </p>
        </div>
      </div>
    </LoggedInLayout>
  );
}