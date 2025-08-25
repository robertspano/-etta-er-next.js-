'use client';

import React from 'react';
import CleaningCategoryPicker from '../../../components/CleaningCategoryPicker';
import { useTranslations } from '../../../contexts/TranslationsContext';

export default function CleaningPostPage() {
  const { language, translations } = useTranslations();
  
  return (
    <CleaningCategoryPicker 
      translations={translations} 
      language={language}
    />
  );
}