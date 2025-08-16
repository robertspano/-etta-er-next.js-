import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star } from 'lucide-react';
import apiService from '../services/api';

const Testimonials = ({ translations }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await apiService.getFeaturedTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback testimonials if API fails
        setTestimonials([
          {
            id: 1,
            clientName: "Sigríður Jónsdóttir",
            role: "Homeowner",
            rating: 5,
            text: "Excellent service! Found a reliable plumber within hours and the work was completed perfectly. Highly recommend this platform.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b64e5d6a?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: 2,
            clientName: "Gunnar Þórsson",
            role: "Business Owner",
            rating: 5,
            text: "Used this service for electrical work at my office. Professional, punctual, and fair pricing. Will definitely use again.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: 3,
            clientName: "Anna Kristinsdóttir",
            role: "Homeowner",
            rating: 5,
            text: "Amazing experience with our kitchen renovation. The contractor was skilled, clean, and finished on time. Thank you!",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {translations.testimonialsTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="rounded-2xl shadow-sm">
                <CardContent className="p-8">
                  <div className="animate-pulse">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="h-5 w-5 bg-gray-200 rounded mr-1"></div>
                      ))}
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {translations.testimonialsTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardContent className="p-8">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-8 leading-relaxed text-base font-medium">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <Avatar className="h-14 w-14 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.clientName} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-gray-900 text-base">{testimonial.clientName}</div>
                    <div className="text-sm text-gray-500 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;