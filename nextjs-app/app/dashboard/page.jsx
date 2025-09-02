"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardIndex() {
  const router = useRouter();  
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/login');
        return;
      }

      // Redirect based on user role
      if (user.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (user.role === 'professional') {
        router.push('/dashboard/professional');
      } else {
        // Default to customer dashboard
        router.push('/dashboard/customer');
      }
    }
  }, [user, loading, router]);

  // Show loading while checking authentication or redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Hleður dashboard...</p>
      </div>
    </div>
  );
}