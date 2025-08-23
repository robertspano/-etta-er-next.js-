'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { redirect, usePathname } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  redirectTo = '/login',
  fallback = null 
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" message="Checking authentication..." />
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login with return url
    redirect(`${redirectTo}?returnUrl=${encodeURIComponent(pathname)}`);
  }

  // Check role requirements
  if (requiredRole) {
    const hasRequiredRole = () => {
      if (!user) return false;
      if (user.role === 'admin') return true; // Admin has access to everything
      if (Array.isArray(requiredRole)) {
        return requiredRole.includes(user.role);
      }
      return user.role === requiredRole;
    };

    if (!hasRequiredRole()) {
      // Show fallback component or redirect
      if (fallback) {
        return fallback;
      }
      redirect('/unauthorized');
    }
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;

// Convenience components for specific roles
export const CustomerRoute = ({ children, ...props }) => (
  <ProtectedRoute requiredRole={['customer', 'admin']} {...props}>
    {children}
  </ProtectedRoute>
);

export const ProfessionalRoute = ({ children, ...props }) => (
  <ProtectedRoute requiredRole={['professional', 'admin']} {...props}>
    {children}
  </ProtectedRoute>
);

export const AdminRoute = ({ children, ...props }) => (
  <ProtectedRoute requiredRole="admin" {...props}>
    {children}
  </ProtectedRoute>
);