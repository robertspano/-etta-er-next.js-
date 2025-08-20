'use client';

import { useState } from 'react';
import CompanyRegistration from '@/components/CompanyRegistration';

export default function CompanyRegistrationPage() {
  const [language, setLanguage] = useState('en');

  return <CompanyRegistration language={language} setLanguage={setLanguage} />;
}