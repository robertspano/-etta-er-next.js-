import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Mail, Lock } from 'lucide-react';

const LoginForm = ({ translations, language }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Clear any existing errors when component mounts and check for success message
  React.useEffect(() => {
    clearError();
    
    // Check if we have a success message from registration
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Pre-fill email if provided
      if (location.state.email) {
        setFormData(prev => ({ ...prev, email: location.state.email }));
      }
    }
  }, [clearError, location.state]);

  // Get return URL from query params
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate(returnUrl, { replace: true });
    } catch (err) {
      // Error is handled in context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {translations.login}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {translations.dontHaveAccount}{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {translations.signUp}
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">{translations.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={translations.email}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">{translations.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={translations.password}
                />
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {translations.forgotPassword}
            </Link>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !formData.email || !formData.password}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {translations.loginButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;