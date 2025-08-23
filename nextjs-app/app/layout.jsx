'use client';

import React from 'react';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { TranslationsProvider } from '../contexts/TranslationsContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TranslationsProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}