'use client';

import React from 'react';
import Login from '../../components/Login';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function LoginPage() {
  const { language, setLanguage } = useTranslations();
  
  return (
    <Login language={language} setLanguage={setLanguage} />
  );
}