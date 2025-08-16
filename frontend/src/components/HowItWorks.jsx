import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { MessageSquare, FileText, CheckCircle2 } from 'lucide-react';

const HowItWorks = ({ translations }) => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      icon: MessageSquare,
      title: translations.step1Title,
      description: translations.step1Description
    },
    {
      id: 2,
      icon: FileText,
      title: translations.step2Title,
      description: translations.step2Description
    },
    {
      id: 3,
      icon: CheckCircle2,
      title: translations.step3Title,
      description: translations.step3Description
    }
  ];

  const handlePostProject = () => {
    navigate('/post');
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {translations.howItWorksTitle}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={step.id} 
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Number Badge - top left */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#1B2B5B] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.id}
                </div>
                
                {/* Content */}
                <div className="pt-4">
                  {/* Icon */}
                  <div className="mb-6">
                    <IconComponent className="h-8 w-8 text-[#1B2B5B]" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={handlePostProject}
            className="bg-[#1B2B5B] hover:bg-white hover:text-[#1B2B5B] text-white border-2 border-[#1B2B5B] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            {translations.postProject}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;