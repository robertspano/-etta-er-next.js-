'use client';

import React from 'react';
import LoginCode from '../../components/LoginCode';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function LoginCodePage() {
  const { language, setLanguage } = useTranslations();
  
  return (
    <LoginCode language={language} setLanguage={setLanguage} />
  );
}