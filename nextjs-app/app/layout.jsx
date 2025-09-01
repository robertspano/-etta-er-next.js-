'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { TranslationsProvider } from '../contexts/TranslationsContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslations } from '../contexts/TranslationsContext';

function AppContent({ children }) {
  const { translations, language, setLanguage } = useTranslations();
  const pathname = usePathname();
  
  // Check if we're on a dashboard page (logged-in user)
  const isDashboardPage = pathname && pathname.startsWith('/dashboard');
  
  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);
  
  return (
    <>
      {/* Only show the public header if NOT on dashboard pages */}
      {!isDashboardPage && (
        <Header translations={translations} language={language} setLanguage={setLanguage} />
      )}
      <main className={isDashboardPage ? '' : ''}>
        {children}
      </main>
      {/* Always show footer */}
      <Footer translations={translations} language={language} />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="is"> {/* Default to Icelandic */}
      <body>
        <TranslationsProvider>
          <AuthProvider>
            <AppContent>
              {children}
            </AppContent>
          </AuthProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}