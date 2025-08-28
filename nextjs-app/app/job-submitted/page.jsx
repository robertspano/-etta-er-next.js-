'use client';

import React from 'react';
import JobSubmittedSuccess from '../../components/JobSubmittedSuccess';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function JobSubmittedPage() {
  const { language, setLanguage } = useTranslations();
  
  return (
    <JobSubmittedSuccess language={language} setLanguage={setLanguage} />
  );
}