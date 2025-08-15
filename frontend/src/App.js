import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { translations } from './data/translations';
import "./App.css";

const HomePage = ({ language, setLanguage, currentTranslations }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        translations={currentTranslations} 
      />
      <Hero translations={currentTranslations} />
      <Services translations={currentTranslations} />
      <HowItWorks translations={currentTranslations} />
      <Stats translations={currentTranslations} />
      <Testimonials translations={currentTranslations} />
      <Footer translations={currentTranslations} />
    </div>
  );
};

function App() {
  const [language, setLanguage] = useState('en');
  const currentTranslations = translations[language];

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                language={language} 
                setLanguage={setLanguage} 
                currentTranslations={currentTranslations} 
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;