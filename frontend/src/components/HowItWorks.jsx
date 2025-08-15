import React from 'react';
import { Card, CardContent } from './ui/card';
import { FileText, Users, CheckCircle } from 'lucide-react';

const HowItWorks = ({ translations }) => {
  const steps = [
    {
      id: 1,
      icon: FileText,
      title: translations.step1Title,
      description: translations.step1Description,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      icon: Users,
      title: translations.step2Title,
      description: translations.step2Description,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 3,
      icon: CheckCircle,
      title: translations.step3Title,
      description: translations.step3Description,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {translations.howItWorksTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {translations.howItWorksDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="relative">
                <Card className="text-center h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-6`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.id}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;