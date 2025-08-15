import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Users, Briefcase, TrendingUp, Shield } from 'lucide-react';

const AdminDashboard = ({ translations, language, user }) => {
  const stats = {
    totalUsers: 1250,
    totalProfessionals: 340,
    totalProjects: 2150,
    platformRevenue: 4500000, // ISK
  };

  const formatCurrency = (amount) => {
    if (language === 'is') {
      return new Intl.NumberFormat('is-IS', {
        style: 'currency',
        currency: 'ISK',
        minimumFractionDigits: 0,
      }).format(amount);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ISK',
        minimumFractionDigits: 0,
      }).format(amount);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Platform management and analytics
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Shield className="h-4 w-4 mr-2" />
          Admin
        </Badge>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Shield className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Professionals</p>
              <p className="text-2xl font-bold">{stats.totalProfessionals}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Briefcase className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold">{stats.totalProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.platformRevenue)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-12">
        <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">
          Advanced admin features will be implemented here including user management,
          platform analytics, and system administration tools.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;