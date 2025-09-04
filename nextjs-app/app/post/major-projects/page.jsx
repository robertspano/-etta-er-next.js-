'use client';

import React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from '../../../contexts/TranslationsContext';
import JobPostingWizard from '../../../components/JobPostingWizard';

const MajorProjectsPostingWrapper = () => {
  const { translations, language } = useTranslations();
  const searchParams = useSearchParams();
  const subcategory = searchParams.get('subcategory');

  return (
    <JobPostingWizard 
      translations={translations} 
      language={language} 
      category="majorProjects"
      subcategory={subcategory}
    />
  );
};

const MajorProjectsPostingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MajorProjectsPostingWrapper />
    </Suspense>
  );
};

export default MajorProjectsPostingPage;