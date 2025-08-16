import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute, { CustomerRoute, ProfessionalRoute, AdminRoute } from './components/ProtectedRoute';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import PopularProjects from './components/PopularProjects';
import FindCompanySection from './components/FindCompanySection';
import ReviewsSection from './components/ReviewsSection';
import TrustSection from './components/TrustSection';
import ProSignupSection from './components/ProSignupSection';
import Footer from './components/Footer';

// Auth Components
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Profile from './components/auth/Profile';

// Dashboard Components
import Dashboard from './components/dashboard/Dashboard';

// Marketplace Components
import JobRequestForm from './components/marketplace/JobRequestForm';
import JobRequestDetail from './components/marketplace/JobRequestDetail';
import JobMessaging from './components/marketplace/JobMessaging';
import ProfessionalJobDetail from './components/marketplace/ProfessionalJobDetail';
import QuoteSubmissionForm from './components/marketplace/QuoteSubmissionForm';
import JobPostingWizard from './components/marketplace/JobPostingWizard';
import CategorySelection from './components/CategorySelection';
import AllCategoriesOverview from './components/AllCategoriesOverview';
import ProRegistrationLanding from './components/ProRegistrationLanding';

// XL Components
import XLLanding from './components/xl/XLLanding';
import XLStart from './components/xl/XLStart';

// Utility Components
import Unauthorized from './components/Unauthorized';
import LoadingSpinner from './components/LoadingSpinner';

// Hooks
import { useReviews } from './hooks/useReviews';

import { translations } from './data/translations';
import "./App.css";

const HomePage = ({ language, setLanguage, currentTranslations }) => {
  // Get reviews data (currently empty, ready for real data)
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews(12, language);
  
  return (
    <div className="min-h-screen bg-white">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        translations={currentTranslations} 
      />
      <Hero translations={currentTranslations} />
      <HowItWorks translations={currentTranslations} />
      <PopularProjects translations={currentTranslations} />
      <FindCompanySection translations={currentTranslations} language={language} />
      <ReviewsSection 
        reviews={reviews} 
        translations={currentTranslations} 
        language={language} 
        loading={reviewsLoading}
        error={reviewsError}
      />
      <TrustSection translations={currentTranslations} />
      <ProSignupSection translations={currentTranslations} />
      <Footer translations={currentTranslations} />
    </div>
  );
};

const AuthLayout = ({ children, language, setLanguage, currentTranslations }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        translations={currentTranslations} 
      />
      {children}
    </div>
  );
};

const DashboardLayout = ({ children, language, setLanguage, currentTranslations }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        translations={currentTranslations} 
      />
      {children}
    </div>
  );
};

function App() {
  const [language, setLanguage] = useState('en');
  const currentTranslations = translations[language];

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
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
            
            {/* Category Selection Route - Public */}
            <Route 
              path="/categories" 
              element={
                <AuthLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <CategorySelection 
                    translations={currentTranslations} 
                  />
                </AuthLayout>
              } 
            />
            
            {/* All Categories Overview Route - Public */}
            <Route 
              path="/all-categories" 
              element={
                <AuthLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <AllCategoriesOverview 
                    translations={currentTranslations} 
                  />
                </AuthLayout>
              } 
            />
            
            {/* Professional Registration Landing - Public - No Header */}
            <Route 
              path="/register-company" 
              element={
                <ProRegistrationLanding 
                  translations={currentTranslations} 
                  language={language}
                  setLanguage={setLanguage}
                />
              } 
            />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <AuthLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <LoginForm 
                    translations={currentTranslations} 
                    language={language} 
                  />
                </AuthLayout>
              } 
            />
            
            <Route 
              path="/register" 
              element={
                <AuthLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <RegisterForm 
                    translations={currentTranslations} 
                    language={language} 
                  />
                </AuthLayout>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <Dashboard 
                      translations={currentTranslations} 
                      language={language} 
                    />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <Profile 
                      translations={currentTranslations} 
                      language={language}
                      setLanguage={setLanguage} 
                    />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />

            {/* Public Job Posting Wizard Routes */}
            <Route 
              path="/post/:category" 
              element={
                <DashboardLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <JobPostingWizard 
                    translations={currentTranslations} 
                    language={language} 
                  />
                </DashboardLayout>
              } 
            />
            
            <Route 
              path="/post" 
              element={
                <DashboardLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <JobPostingWizard 
                    translations={currentTranslations} 
                    language={language} 
                  />
                </DashboardLayout>
              } 
            />
            
            {/* XL Major Projects Routes */}
            <Route 
              path="/xl" 
              element={
                <DashboardLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <XLLanding 
                    translations={currentTranslations} 
                    language={language} 
                  />
                </DashboardLayout>
              } 
            />
            
            <Route 
              path="/xl/start" 
              element={
                <DashboardLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <XLStart 
                    translations={currentTranslations} 
                    language={language} 
                  />
                </DashboardLayout>
              } 
            />

            {/* Customer Only Routes */}
            <Route 
              path="/create-job" 
              element={
                <CustomerRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <JobRequestForm 
                      translations={currentTranslations} 
                      language={language} 
                    />
                  </DashboardLayout>
                </CustomerRoute>
              } 
            />

            <Route 
              path="/job/:jobId" 
              element={
                <CustomerRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <JobRequestDetail 
                      translations={currentTranslations} 
                      language={language} 
                    />
                  </DashboardLayout>
                </CustomerRoute>
              } 
            />

            <Route 
              path="/job/:jobId/edit" 
              element={
                <CustomerRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <JobRequestForm 
                      translations={currentTranslations} 
                      language={language} 
                      editMode={true}
                    />
                  </DashboardLayout>
                </CustomerRoute>
              } 
            />

            <Route 
              path="/job/:jobId/messages" 
              element={
                <ProtectedRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <JobMessaging 
                      translations={currentTranslations} 
                      language={language} 
                    />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/my-projects" 
              element={
                <CustomerRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <div className="container mx-auto px-4 py-8">
                      <h1 className="text-3xl font-bold">My Projects</h1>
                      <p className="text-gray-600 mt-2">Customer projects view coming soon</p>
                    </div>
                  </DashboardLayout>
                </CustomerRoute>
              } 
            />

            {/* Professional Only Routes */}
            <Route 
              path="/professional/job/:jobId" 
              element={
                <ProfessionalRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <ProfessionalJobDetail 
                      translations={currentTranslations} 
                      language={language} 
                    />
                  </DashboardLayout>
                </ProfessionalRoute>
              } 
            />

            <Route 
              path="/professional/quote/:jobId" 
              element={
                <ProfessionalRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <QuoteSubmissionForm 
                      translations={currentTranslations} 
                      language={language} 
                    />
                  </DashboardLayout>
                </ProfessionalRoute>
              } 
            />

            {/* Admin Only Routes */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <DashboardLayout 
                    language={language} 
                    setLanguage={setLanguage} 
                    currentTranslations={currentTranslations}
                  >
                    <div className="container mx-auto px-4 py-8">
                      <h1 className="text-3xl font-bold">Admin Panel</h1>
                      <p className="text-gray-600 mt-2">Admin features coming soon</p>
                    </div>
                  </DashboardLayout>
                </AdminRoute>
              } 
            />

            {/* Error Routes */}
            <Route 
              path="/unauthorized" 
              element={
                <AuthLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <Unauthorized translations={currentTranslations} />
                </AuthLayout>
              } 
            />

            {/* Catch all route for 404 */}
            <Route 
              path="*" 
              element={
                <AuthLayout 
                  language={language} 
                  setLanguage={setLanguage} 
                  currentTranslations={currentTranslations}
                >
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                      <p className="text-gray-600 mb-4">Page not found</p>
                      <a href="/" className="text-blue-600 hover:text-blue-700">
                        Go back home
                      </a>
                    </div>
                  </div>
                </AuthLayout>
              } 
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;