import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  redirectTo = '/login',
  fallback = null 
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login with return url
    return <Navigate to={`${redirectTo}?returnUrl=${encodeURIComponent(location.pathname)}`} replace />;
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
      return <Navigate to="/unauthorized" replace />;
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