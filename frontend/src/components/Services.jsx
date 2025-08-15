import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
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

const Services = ({ translations }) => {
  const services = [
    {
      id: 'plumbing',
      icon: Droplets,
      name: translations.services_plumbing,
      description: translations.services_plumbing_desc,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'electrical',
      icon: Zap,
      name: translations.services_electrical,
      description: translations.services_electrical_desc,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 'carpentry',
      icon: Hammer,
      name: translations.services_carpentry,
      description: translations.services_carpentry_desc,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 'painting',
      icon: Paintbrush,
      name: translations.services_painting,
      description: translations.services_painting_desc,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'roofing',
      icon: Home,
      name: translations.services_roofing,
      description: translations.services_roofing_desc,
      color: 'text-red-600 bg-red-50'
    },
    {
      id: 'heating',
      icon: Thermometer,
      name: translations.services_heating,
      description: translations.services_heating_desc,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 'renovation',
      icon: Settings,
      name: translations.services_renovation,
      description: translations.services_renovation_desc,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'landscaping',
      icon: TreePine,
      name: translations.services_landscaping,
      description: translations.services_landscaping_desc,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'construction',
      icon: Building,
      name: translations.services_construction,
      description: translations.services_construction_desc,
      color: 'text-gray-600 bg-gray-50'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {translations.ourServices}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {translations.servicesDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-blue-200">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                  >
                    {translations.getQuotes}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            {translations.viewAllServices}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;