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
      color: 'text-green-600'
    },
    {
      id: 3,
      icon: Star,
      number: `${stats.customerSatisfaction}/5`,
      label: translations.customerSatisfaction,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      icon: Award,
      number: `${stats.completionRate}%`,
      label: translations.completedProjects,
      color: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {translations.statsTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                <CardContent className="p-8">
                  <div className="animate-pulse">
                    <div className="h-8 w-8 bg-white/20 rounded mx-auto mb-4"></div>
                    <div className="h-8 bg-white/20 rounded mb-2"></div>
                    <div className="h-4 bg-white/20 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {translations.statsTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.id} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <IconComponent className={`h-8 w-8 ${stat.color} text-white`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;