'use client';

import React from 'react';
import PasswordlessConfirm from '../../components/PasswordlessConfirm';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function PasswordlessConfirmPage() {
  const { language, setLanguage } = useTranslations();
  
  return (
    <PasswordlessConfirm language={language} setLanguage={setLanguage} />
  );
}