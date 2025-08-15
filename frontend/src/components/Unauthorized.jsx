import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, ArrowLeft } from 'lucide-react';

const Unauthorized = ({ translations }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">
            {translations?.accessDenied || 
             "You don't have permission to view this page. Please contact support if you believe this is an error."
            }
          </p>
        </div>
        
        <div className="space-y-3">
          <Link to="/">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;