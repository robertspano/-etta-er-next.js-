'use client';

import React from 'react';
import CustomerDashboard from '../../components/CustomerDashboard';
import LoggedInLayout from '../../components/LoggedInLayout';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function TestDashboardPage() {
  const { language, translations } = useTranslations();
  
  return (
    <LoggedInLayout language={language} translations={translations}>
      <CustomerDashboard 
        translations={translations} 
        language={language}
      />
    </LoggedInLayout>
  );
}