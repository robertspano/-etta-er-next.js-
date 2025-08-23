'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationsContext = createContext();

export function TranslationsProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Load translations based on language
    const loadTranslations = async () => {
      try {
        // Import the translations data
        const { translations: translationsData } = await import('../data/translations');
        setTranslations(translationsData);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();
  }, [language]);

  const value = {
    language,
    setLanguage,
    translations,
    t: (key) => {
      return translations[key] && translations[key][language] ? translations[key][language] : key;
    }
  };

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }
  return context;
}