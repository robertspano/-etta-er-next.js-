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
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 3,
      icon: CheckCircle,
      title: translations.step3Title,
      description: translations.step3Description,
      color: 'text-blue-600 bg-blue-50'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {translations.howItWorksTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {translations.howItWorksDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="relative text-center">
                {/* Step Number Circle */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                    {step.id}
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center`}>
                    <IconComponent className="h-10 w-10" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-base md:text-lg max-w-sm mx-auto">
                  {step.description}
                </p>

                {/* Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-6 lg:-right-12">
                    <svg className="w-12 h-6 text-blue-300" fill="currentColor" viewBox="0 0 24 12">
                      <path d="M18 6L14 2v3H2v2h12v3l4-4z"/>
                    </svg>
                  </div>
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