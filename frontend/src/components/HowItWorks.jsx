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
    navigate('/categories');
  };

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            {translations.howItWorksTitle}
          </h2>
        </div>

        {/* Steps Grid - Force side-by-side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 mb-12 lg:mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="text-center max-w-sm mx-auto md:max-w-none">
                {/* Icon with Number Badge - Smaller size */}
                <div className="relative inline-block mb-4">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-[#1B2B5B]" strokeWidth={1.5} />
                  {/* Number badge positioned inside top-left of icon */}
                  <div className="absolute -top-1 -left-1 w-5 h-5 md:w-6 md:h-6 bg-[#1B2B5B] text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                    {step.id}
                  </div>
                </div>
                
                {/* Title - More compact and single line */}
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3 leading-tight whitespace-nowrap">
                  {step.title}
                </h3>
                
                {/* Description - More compact */}
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={handlePostProject}
            className="bg-[#1B2B5B] hover:bg-white hover:text-[#1B2B5B] text-white border-2 border-[#1B2B5B] px-12 py-5 text-xl font-semibold rounded-lg transition-all duration-300"
          >
            {translations.postProject}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;