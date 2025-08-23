'use client';

import { useTranslations } from '../../../contexts/TranslationsContext';
import BuildNewCategoryPage from '../../../components/BuildNewCategoryPage';

export default function BuildNewPage() {
  const { translations, language } = useTranslations();
  
  return <BuildNewCategoryPage translations={translations} language={language} />;
}