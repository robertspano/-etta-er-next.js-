'use client';

import { useContext } from 'react';
import { useTranslations } from '../../../contexts/TranslationsContext';
import HandcraftCategoryPage from '../../../components/HandcraftCategoryPage';

export default function HandcraftPage() {
  const { translations, language } = useTranslations();
  
  return <HandcraftCategoryPage translations={translations} language={language} />;
}