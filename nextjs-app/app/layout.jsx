'use client';

import React from 'react';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { TranslationsProvider } from '../contexts/TranslationsContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslations } from '../contexts/TranslationsContext';

function AppContent({ children }) {
  const { translations, language } = useTranslations();
  
  return (
    <>
      <Header translations={translations} language={language} />
      <main>
        {children}
      </main>
      <Footer translations={translations} language={language} />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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