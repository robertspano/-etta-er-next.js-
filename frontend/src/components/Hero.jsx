import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Star, Users, CheckCircle } from 'lucide-react';
import apiService from '../services/api';

const Hero = ({ translations }) => {
  const [projectType, setProjectType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!projectType || !location || !description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const projectData = {
        title: `${translations.services_[projectType]} Project`,
        description: description,
        serviceType: projectType,
        location: location,
        urgency: 'flexible'
      };

      const response = await apiService.submitProject(projectData);
      
      if (response.success) {
        alert(`${translations.projectSubmitted}\n\nProject ID: ${response.projectId}\nExpected quotes: ${response.estimatedQuotes}\nResponse time: ${response.expectedResponseTime}`);
        
        // Reset form
        setProjectType('');
        setLocation('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {translations.heroTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {translations.heroSubtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">15,000+</div>
                <div className="text-sm text-gray-600">{translations.professionals}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">50,000+</div>
                <div className="text-sm text-gray-600">{translations.completedProjects}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">4.8</div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  {translations.rating}
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                {translations.verified}
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                {translations.insured}
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                {translations.guaranteed}
              </div>
            </div>
          </div>

          {/* Right Content - Project Form */}
          <div>
            <Card className="p-8 shadow-xl bg-white">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {translations.getQuotes}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.projectType} *
                  </label>
                  <Select value={projectType} onValueChange={setProjectType} required>
                    <SelectTrigger>
                      <SelectValue placeholder={translations.selectService} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">{translations.services_plumbing}</SelectItem>
                      <SelectItem value="electrical">{translations.services_electrical}</SelectItem>
                      <SelectItem value="carpentry">{translations.services_carpentry}</SelectItem>
                      <SelectItem value="painting">{translations.services_painting}</SelectItem>
                      <SelectItem value="roofing">{translations.services_roofing}</SelectItem>
                      <SelectItem value="heating">{translations.services_heating}</SelectItem>
                      <SelectItem value="renovation">{translations.services_renovation}</SelectItem>
                      <SelectItem value="landscaping">{translations.services_landscaping}</SelectItem>
                      <SelectItem value="construction">{translations.services_construction}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.location} *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={translations.enterLocation}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.projectDescription} *
                  </label>
                  <Textarea
                    placeholder={translations.describeProject}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : translations.getQuotes}
                </Button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                {translations.freeService}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;