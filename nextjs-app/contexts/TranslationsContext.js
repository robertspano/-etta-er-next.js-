'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationsContext = createContext();

export function TranslationsProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  // Initialize language from localStorage on component mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('buildconnect_language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'is')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('buildconnect_language', language);
    }
  }, [language]);

  useEffect(() => {
    // Load translations based on language
    const loadTranslations = async () => {
      try {
        // Import the translations data
        const { translations: translationsData } = await import('../data/translations');
        // Set the translations for the current language
        setTranslations(translationsData[language] || translationsData.en);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to empty object
        setTranslations({});
      }
    };

    loadTranslations();
  }, [language]);

  const value = {
    language,
    setLanguage,
    translations,
    t: (key) => {
      return translations[key] || key;
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