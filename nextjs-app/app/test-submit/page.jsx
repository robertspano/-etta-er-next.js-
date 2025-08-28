'use client';

import React from 'react';
import Link from 'next/link';

export default function TestSubmitPage() {
  const handleDirectSubmit = () => {
    // Simulate job submission
    localStorage.setItem('submittedJobEmail', 'test@example.is');
    window.location.href = '/job-submitted?email=test@example.is';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Test Job Submission</h1>
        
        <div className="space-y-4">
          <button
            onClick={handleDirectSubmit}
            className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Direct Submit → Success Page
          </button>
          
          <Link
            href="/job-submitted?email=test@example.is"
            className="block w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            Direct Link to Success Page
          </Link>
          
          <Link
            href="/post/handcraft"
            className="block w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
          >
            Go to Job Wizard
          </Link>
        </div>
      </div>
    </div>
  );
}