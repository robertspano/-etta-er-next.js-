'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { MessageSquare, FileText, CheckCircle2 } from 'lucide-react';

const HowItWorks = ({ translations }) => {
  const router = useRouter();

  const steps = [
    {
      id: 1,
      icon: MessageSquare,
      title: translations.step1Title || 'Describe your job',
      description: translations.step1Description || 'Tell us what you need done and we\'ll connect you with professionals.'
    },
    {
      id: 2,
      icon: FileText,
      title: translations.step2Title || 'Get quotes',
      description: translations.step2Description || 'Receive quotes from qualified professionals in your area.'
    },
    {
      id: 3,
      icon: CheckCircle2,
      title: translations.step3Title || 'Choose & hire',
      description: translations.step3Description || 'Compare profiles and reviews, then hire the right professional.'
    }
  ];

  const handlePostProject = () => {
    router.push('/post-job');
  };

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-federal_blue mb-4">
            {translations.howItWorksTitle || 'How it works'}
          </h2>
        </div>

        {/* Steps Grid - Force side-by-side on larger screens - exactly like React original */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 mb-12 lg:mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="text-center max-w-sm mx-auto md:max-w-none">
                {/* Icon with Number Badge - Smaller size - exactly like React original */}
                <div className="relative inline-block mb-4">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-federal_blue" strokeWidth={1.5} />
                  {/* Number badge positioned inside top-left of icon */}
                  <div className="absolute -top-1 -left-1 w-5 h-5 md:w-6 md:h-6 bg-honolulu_blue text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                    {step.id}
                  </div>
                </div>
                
                {/* Title - More compact and single line */}
                <h3 className="text-base md:text-lg font-bold text-prussian_blue mb-2 md:mb-3 leading-tight whitespace-nowrap">
                  {step.title}
                </h3>
                
                {/* Description - More compact */}
                <p className="text-sm md:text-base text-prussian_blue-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button - exactly like React original */}
        <div className="text-center">
          <Button 
            onClick={handlePostProject}
            className="bg-honolulu_blue hover:bg-federal_blue text-white px-12 py-5 text-xl font-semibold rounded-lg transition-all duration-300"
          >
            {translations.postProject || 'Post a Job'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;