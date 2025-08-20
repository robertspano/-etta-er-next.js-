'use client';

import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const [language, setLanguage] = useState('en');

  return <LoginForm language={language} />;
}