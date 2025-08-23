'use client';

import { useTranslations } from '../../../contexts/TranslationsContext';
import InteriorRenovationCategoryPage from '../../../components/InteriorRenovationCategoryPage';

export default function InteriorRenovationPage() {
  const { translations, language } = useTranslations();
  
  return <InteriorRenovationCategoryPage translations={translations} language={language} />;
}