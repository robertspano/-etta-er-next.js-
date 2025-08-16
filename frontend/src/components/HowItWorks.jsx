import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { FileText, Users, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorks = ({ translations }) => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      icon: FileText,
      title: translations.step1Title,
      description: translations.step1Description,
      color: 'text-indigo-600 bg-gradient-to-br from-indigo-50 to-purple-50',
      badgeColor: 'from-indigo-500 to-purple-600'
    },
    {
      id: 2,
      icon: Users,
      title: translations.step2Title,
      description: translations.step2Description,
      color: 'text-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50',
      badgeColor: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      icon: CheckCircle,
      title: translations.step3Title,
      description: translations.step3Description,
      color: 'text-emerald-600 bg-gradient-to-br from-emerald-50 to-green-50',
      badgeColor: 'from-emerald-500 to-green-600'
    }
  ];

  const handlePostProject = () => {
    navigate('/post');
  };

  return (
    <section id="how-it-works" className="section-padding-lg bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-200/15 to-pink-200/15 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="heading-lg text-gray-900 mb-6 animate-fade-in-up text-shadow">
            {translations.howItWorksTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="relative">
                {/* Connection line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0" 
                       style={{ width: 'calc(100% - 4rem)' }}>
                  </div>
                )}
                
                <div className="text-center relative z-10 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  {/* Enhanced Step Number Badge */}
                  <div className="flex justify-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.badgeColor} text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl hover:scale-110 transition-all duration-300`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Enhanced Icon Container */}
                  <div className="flex justify-center mb-8">
                    <div className={`w-24 h-24 rounded-3xl ${step.color} border-2 border-white shadow-xl flex items-center justify-center hover:scale-105 transition-all duration-300`}>
                      <IconComponent className="h-12 w-12" />
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="max-w-sm mx-auto">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 leading-tight">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-white/50 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
            <p className="text-gray-600 mb-8 text-lg">Post your project and connect with trusted professionals today.</p>
            <Button 
              onClick={handlePostProject}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              {translations.postProject}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;