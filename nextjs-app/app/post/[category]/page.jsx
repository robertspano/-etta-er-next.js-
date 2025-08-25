'use client';

import React from 'react';
import JobPostingWizard from '../../../components/JobPostingWizard';
import { useTranslations } from '../../../contexts/TranslationsContext';
import { useParams } from 'next/navigation';

export default function JobPostingPage() {
  const { language, translations } = useTranslations();
  const params = useParams();
  const category = params.category;
  
  return (
    <JobPostingWizard 
      translations={translations} 
      language={language}
      category={category}
    />
  );
}