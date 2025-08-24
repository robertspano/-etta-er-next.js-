'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { 
  Wrench, 
  Zap, 
  Hammer, 
  Paintbrush, 
  Home, 
  Thermometer,
  Droplets,
  Shield,
  Settings,
  TreePine,
  Building,
  Car
} from 'lucide-react';

const Services = ({ translations = {} }) => {
  const services = [
    {
      id: 'plumbing',
      icon: Droplets,
      name: translations.services_plumbing || 'Plumbing',
      description: translations.services_plumbing_desc || 'Professional plumbing services for all your needs',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'electrical',
      icon: Zap,
      name: translations.services_electrical || 'Electrical',
      description: translations.services_electrical_desc || 'Licensed electrician services',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 'carpentry',
      icon: Hammer,
      name: translations.services_carpentry || 'Carpentry',
      description: translations.services_carpentry_desc || 'Expert woodworking and carpentry',
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 'painting',
      icon: Paintbrush,
      name: translations.services_painting || 'Painting',
      description: translations.services_painting_desc || 'Professional painting services',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'roofing',
      icon: Home,
      name: translations.services_roofing || 'Roofing',
      description: translations.services_roofing_desc || 'Roof repairs and installations',
      color: 'text-red-600 bg-red-50'
    },
    {
      id: 'heating',
      icon: Thermometer,
      name: translations.services_heating || 'Heating',
      description: translations.services_heating_desc || 'Heating system services',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 'renovation',
      icon: Settings,
      name: translations.services_renovation || 'Renovation',
      description: translations.services_renovation_desc || 'Complete renovation services',
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'landscaping',
      icon: TreePine,
      name: translations.services_landscaping || 'Landscaping',
      description: translations.services_landscaping_desc || 'Garden and landscaping services',
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'construction',
      icon: Building,
      name: translations.services_construction || 'Construction',
      description: translations.services_construction_desc || 'Construction and building services',
      color: 'text-gray-600 bg-gray-50'
    }
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {translations.ourServices || 'Our Services'}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {translations.servicesDescription || 'Find qualified professionals for all your construction and service needs.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-200 hover:border-blue-200 rounded-2xl h-full">
                <CardHeader className="pb-4 pt-8 px-8">
                  <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-gray-600 mb-6 leading-relaxed text-base">
                    {service.description}
                  </p>
                  <Link href={`/post?category=${service.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 rounded-xl font-medium"
                    >
                      {translations.getQuotes || 'Get Quotes'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/all-categories">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              {translations.viewAllServices || 'View All Services'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;