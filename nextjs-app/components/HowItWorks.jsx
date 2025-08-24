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
      title: "Describe the project",
      description: "Tell us what you need help with, and we'll send it to relevant businesses."
    },
    {
      id: 2,
      icon: FileText,
      title: "Receive offers",
      description: "You'll quickly get non-binding quotes from pros who want to help."
    },
    {
      id: 3,
      icon: CheckCircle2,
      title: "Get started!",
      description: "Review the offers and choose the right company. After the job, you can leave a review."
    }
  ];

  const handlePostProject = () => {
    router.push('/job-categories');
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
        </div>

        {/* Steps Grid - Clean layout like Mittanbud */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="text-center">
                {/* Step Number - Large and prominent */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-6">
                  {step.id}
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
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={handlePostProject}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200"
          >
            Post a Job
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;