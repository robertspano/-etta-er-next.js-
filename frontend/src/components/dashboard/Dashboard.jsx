import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CustomerDashboard from './CustomerDashboard';
import ProfessionalDashboard from './ProfessionalDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = ({ translations, language }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // ProtectedRoute will handle redirect
  }

  switch (user.role) {
    case 'customer':
      return <CustomerDashboard translations={translations} language={language} user={user} />;
    case 'professional':
      return <ProfessionalDashboard translations={translations} language={language} user={user} />;
    case 'admin':
      return <AdminDashboard translations={translations} language={language} user={user} />;
    default:
      return <CustomerDashboard translations={translations} language={language} user={user} />;
  }
};

export default Dashboard;