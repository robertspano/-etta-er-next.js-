'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const FindCompanySection = ({ translations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/bedriftsok?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Decorative elements like Mittanbud */}
      <div className="absolute top-10 right-10 opacity-20">
        <svg width="120" height="80" viewBox="0 0 120 80" className="text-green-400">
          <path d="M10 40 Q 60 10 110 40 Q 60 70 10 40" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-10 opacity-15">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-blue-400">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Find the right company for your project!
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Search for companies and craftsmen in your area, get in touch and get a quote.
              </p>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-6 pr-16 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm bg-white transition-all duration-200"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-2 top-2 h-10 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/bedriftsok')}
                  className="inline-flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Find Company
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Right content - Decorative arrow pointing to search */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Blue arrow decoration */}
              <svg 
                width="200" 
                height="120" 
                viewBox="0 0 200 120" 
                className="text-blue-600 opacity-80"
              >
                <path 
                  d="M20 60 Q 100 20 180 60" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                    fill="currentColor"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" />
                  </marker>
                </defs>
              </svg>
              
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-50 -z-10"></div>
            </div>
          </div>
        </div>

        {/* Bottom stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-1">8,500+</div>
            <div className="text-sm text-gray-600">Verified Companies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 mb-1">45,000+</div>
            <div className="text-sm text-gray-600">Completed Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 mb-1">4.8/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
            <div className="text-sm text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindCompanySection;