'use client';

import { useTranslations } from '../../../contexts/TranslationsContext';
import CleaningCategoryPicker from '../../../components/CleaningCategoryPicker';

export default function CleaningPage() {
  const { translations, language } = useTranslations();
  
  return <CleaningCategoryPicker translations={translations} language={language} />;
}