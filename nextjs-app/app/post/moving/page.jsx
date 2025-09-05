'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import MovingCategoryPicker from '../../../components/MovingCategoryPicker';
import JobPostingWizard from '../../../components/JobPostingWizard';
import { useTranslations } from '../../../contexts/TranslationsContext';

export default function MovingPostPage() {
  const { language, translations } = useTranslations();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  
  // If step parameter exists, show JobPostingWizard
  if (step) {
    return (
      <JobPostingWizard 
        translations={translations} 
        language={language}
        category="moving"
      />
    );
  }
  
  // Otherwise show the category picker
  return (
    <MovingCategoryPicker 
      translations={translations} 
      language={language}
    />
  );
}