'use client';

import { useTranslations } from '../../contexts/TranslationsContext';
import JobCategorySelection from '../../components/JobCategorySelection';

export default function JobCategoriesPage() {
  const { translations, language } = useTranslations();
  
  return <JobCategorySelection translations={translations} language={language} />;
}