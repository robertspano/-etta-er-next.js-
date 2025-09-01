'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '@/services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
    
    // Listen for auth errors from API interceptors
    const handleAuthError = () => {
      setUser(null);
      setError('Session expired. Please login again.');
    };
    
    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, []);

  const checkAuthStatus = async () => {
    try {
      // First check localStorage for immediate user data
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } catch (e) {
            localStorage.removeItem('currentUser');
          }
        }
      }

      // Then verify with server
      const userData = await apiService.getCurrentUser();
      setUser(userData);
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(userData));
      }
      
      setError(null);
    } catch (error) {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser');
      }
      // Don't set error on initial load if user is simply not logged in
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.login(email, password);
      
      // After successful login, get user data
      const userData = await apiService.getCurrentUser();
      setUser(userData);
      
      return userData;
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const newUser = await apiService.register(userData);
      
      // After successful registration, login the user
      await apiService.login(userData.email, userData.password);
      const userWithProfile = await apiService.getCurrentUser();
      setUser(userWithProfile);
      
      return newUser;
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await apiService.logout();
      setUser(null);
      setError(null);
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear user data even if logout request fails
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.updateProfile(profileData);
      
      // Refresh user data
      const updatedUser = await apiService.getCurrentUser();
      setUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const switchRole = async (newRole) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.switchRole(newRole);
      
      // Refresh user data
      const updatedUser = await apiService.getCurrentUser();
      setUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      const errorMessage = error.message || 'Role switch failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Helper functions for role checking
  const isCustomer = () => user?.role === 'customer' || user?.role === 'admin';
  const isProfessional = () => user?.role === 'professional' || user?.role === 'admin';
  const isAdmin = () => user?.role === 'admin';
  const isAuthenticated = () => !!user;

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    switchRole,
    clearError,
    checkAuthStatus,
    isCustomer,
    isProfessional,
    isAdmin,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hooks for specific role checks
export const useRequireAuth = (redirectTo = '/login') => {
  const { isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, loading, redirectTo]);
  
  return { isAuthenticated, loading };
};

export const useRequireRole = (requiredRole, redirectTo = '/') => {
  const { user, loading } = useAuth();
  
  const hasRequiredRole = () => {
    if (!user) return false;
    if (user.role === 'admin') return true; // Admin has access to everything
    return user.role === requiredRole;
  };
  
  useEffect(() => {
    if (!loading && !hasRequiredRole()) {
      window.location.href = redirectTo;
    }
  }, [user, loading, requiredRole, redirectTo]);
  
  return { hasRequiredRole, loading };
};