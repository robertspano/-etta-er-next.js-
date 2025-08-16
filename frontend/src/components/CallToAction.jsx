import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Users, Building } from 'lucide-react';

const CallToAction = ({ translations }) => {
  return (
    <section className="py-16 lg:py-24 bg-blue-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {translations.ctaTitle || "Ready to Get Started?"}
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
            {translations.ctaSubtitle || "Join thousands of satisfied customers and trusted professionals on our platform"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Customer CTA */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {translations.customerCta || "Need Work Done?"}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {translations.customerCtaDesc || "Post your project and get quotes from verified professionals in your area"}
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              {translations.postProject || "Post Project"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Professional CTA */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {translations.professionalCta || "Are You a Professional?"}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {translations.professionalCtaDesc || "Join our network and connect with customers looking for your services"}
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              {translations.registerCompany || "Register Company"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;