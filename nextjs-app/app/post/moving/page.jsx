'use client';

import { useTranslations } from '../../../contexts/TranslationsContext';
import MovingCategoryPicker from '../../../components/MovingCategoryPicker';

export default function MovingPage() {
  const { translations, language } = useTranslations();
  
  return <MovingCategoryPicker translations={translations} language={language} />;
}