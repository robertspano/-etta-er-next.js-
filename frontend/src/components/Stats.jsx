import React from 'react';
import { Card, CardContent } from './ui/card';
import { TrendingUp, Users, Star, Award } from 'lucide-react';

const Stats = ({ translations }) => {
  const stats = [
    {
      id: 1,
      icon: TrendingUp,
      number: "50,000+",
      label: translations.projectsCompleted,
      color: 'text-blue-600'
    },
    {
      id: 2,
      icon: Users,
      number: "15,000+",
      label: translations.verifiedProfessionals,
      color: 'text-green-600'
    },
    {
      id: 3,
      icon: Star,
      number: "4.8/5",
      label: translations.customerSatisfaction,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      icon: Award,
      number: "98%",
      label: translations.completedProjects,
      color: 'text-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {translations.statsTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
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