'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function PostJobPage() {
  const { language } = useTranslations();
  const router = useRouter();

  // Redirect to category selection or home
  React.useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          {language === 'is' ? 'Vísar þér áfrám...' : 'Omdirigerer...'}
        </p>
      </div>
    </div>
  );
}