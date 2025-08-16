import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { TrendingUp, Users, Star, Award } from 'lucide-react';
import apiService from '../services/api';

const Stats = ({ translations }) => {
  const [stats, setStats] = useState({
    totalProjects: 50000,
    verifiedProfessionals: 15000,
    customerSatisfaction: 4.8,
    completionRate: 98
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.getPlatformStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep default mock stats if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      id: 1,
      icon: TrendingUp,
      number: `${stats.totalProjects?.toLocaleString()}+`,
      label: translations.projectsCompleted,
      color: 'text-blue-600'
    },
    {
      id: 2,
      icon: Users,
      number: `${stats.verifiedProfessionals?.toLocaleString()}+`,
      label: translations.verifiedProfessionals,
      color: 'text-blue-600'
    },
    {
      id: 3,
      icon: Star,
      number: `${stats.customerSatisfaction}/5`,
      label: translations.customerSatisfaction,
      color: 'text-blue-600'
    },
    {
      id: 4,
      icon: Award,
      number: `${stats.completionRate}%`,
      label: translations.completedProjects,
      color: 'text-blue-600'
    }
  ];

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {translations.statsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="animate-pulse">
                  <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {translations.statsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-base md:text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;