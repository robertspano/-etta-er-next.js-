'use client';

import React from 'react';
import CompanyRegistration from '../../components/CompanyRegistration';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function CompanyRegistrationPage() {
  const { language, setLanguage } = useTranslations();
  
  return (
    <CompanyRegistration language={language} setLanguage={setLanguage} />
  );
}