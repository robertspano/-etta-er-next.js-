import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Mail, Lock, User, Phone, Building } from 'lucide-react';

const RegisterForm = ({ translations, language }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    first_name: '',
    last_name: '',
    phone: '',
    company_name: '',
    company_id: '',
    language: language,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth errors when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.first_name.trim()) {
      errors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      errors.last_name = 'Last name is required';
    }

    if (formData.role === 'professional' && !formData.company_name.trim()) {
      errors.company_name = 'Company name is required for professionals';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Clean up form data before sending
      const registerData = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        phone: formData.phone.trim() || null,
        language: formData.language,
      };

      if (formData.role === 'professional') {
        registerData.company_name = formData.company_name.trim();
        registerData.company_id = formData.company_id.trim() || null;
      }

      await register(registerData);
      navigate('/dashboard', { replace: true });
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
            {translations.register}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {translations.alreadyHaveAccount}{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {translations.signIn}
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
              {validationErrors.email && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">{translations.firstName}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    className="pl-10"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder={translations.firstName}
                  />
                </div>
                {validationErrors.first_name && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.first_name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="last_name">{translations.lastName}</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder={translations.lastName}
                />
                {validationErrors.last_name && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.last_name}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="phone">{translations.phone}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="pl-10"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+354-555-0123"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="role">{translations.role}</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">{translations.customer}</SelectItem>
                  <SelectItem value="professional">{translations.professional}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === 'professional' && (
              <>
                <div>
                  <Label htmlFor="company_name">{translations.companyName}</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="company_name"
                      name="company_name"
                      type="text"
                      className="pl-10"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      placeholder={translations.companyName}
                    />
                  </div>
                  {validationErrors.company_name && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.company_name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="company_id">{translations.companyId}</Label>
                  <Input
                    id="company_id"
                    name="company_id"
                    type="text"
                    value={formData.company_id}
                    onChange={handleInputChange}
                    placeholder="KT-123456789"
                  />
                </div>
              </>
            )}

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
              {validationErrors.password && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.password}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">{translations.confirmPassword}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={translations.confirmPassword}
                />
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {translations.registerButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;