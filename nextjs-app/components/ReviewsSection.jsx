'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from './ui/button';

// Review data type definition
export const ReviewType = {
  id: '',
  company: {
    id: '',
    name: '',
    logoUrl: ''
  },
  rating: 0, // 1-5
  excerpt: '',
  reviewer: {
    name: '',
    initial: '',
    location: ''
  },
  date: '', // ISO string
  url: '' // link to full review or company page
};

const ReviewCard = ({ review, language }) => {
  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Format date to match Mittanbud style
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('is-IS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 h-full flex flex-col max-h-80">
      {/* Company Header - Smaller and more compact */}
      <div className="flex items-center gap-2 mb-3">
        {/* Company Logo - Smaller like Mittanbud */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex-shrink-0 flex items-center justify-center overflow-hidden">
          {review.company.logoUrl ? (
            <img
              src={review.company.logoUrl}
              alt={review.company.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-white text-lg font-bold">
              {review.company.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Company Name - Smaller font */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base text-blue-600 hover:text-blue-700 transition-colors block truncate">
            {review.company.name}
          </h3>
        </div>
      </div>

      {/* Star Rating - Smaller stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Project Type - Smaller font */}
      <div className="mb-2">
        <p className="text-gray-900 font-semibold text-xs">
          {language === 'is' 
            ? ['Baðherbergi endurnýjun', 'Eldhús endurbætur', 'Þak viðgerðir'][Math.floor(Math.random() * 3)]
            : ['Bathroom Renovation', 'Kitchen Upgrade', 'Roof Repairs'][Math.floor(Math.random() * 3)]
          }
        </p>
      </div>

      {/* Review Excerpt - Smaller and limited lines */}
      <div className="flex-1 mb-3 overflow-hidden">
        <p className="text-gray-700 text-xs leading-relaxed line-clamp-3">
          {review.excerpt}
        </p>
      </div>

      {/* Read More Link - Smaller */}
      <div className="mb-3">
        <a
          href={review.url}
          className="text-blue-600 hover:text-blue-700 text-xs font-medium"
        >
          {language === 'is' ? 'Les meira' : 'Read more'}
        </a>
      </div>

      {/* Reviewer Info - Smaller and more compact */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        {/* Reviewer Avatar - Smaller */}
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-bold text-xs">
            {review.reviewer.initial}
          </span>
        </div>
        
        {/* Reviewer Details - Smaller font */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-xs truncate">
            {review.reviewer.name}
          </p>
          <p className="text-gray-500 text-xs">
            {review.reviewer.location && `${review.reviewer.location}, `}
            {formatDate(review.date)}
          </p>
        </div>
      </div>
    </div>
  );
};

const ReviewsSection = ({ reviews = [], translations, language, loading = false, error = null }) => {
  // Sample reviews with more realistic Mittanbud-style data
  const sampleReviews = [
    {
      id: '1',
      company: {
        id: 'nordic-electric-services',
        name: 'NORDIC ELECTRIC SERVICES',
        logoUrl: null
      },
      rating: 5,
      projectType: 'Install EV charger',
      excerpt: 'Could complete the job quickly, friendly people, and very professional work. Highly recommend!',
      reviewer: {
        name: 'Lisa',
        initial: 'L',
        location: 'Reykjavik',
        verified: true
      },
      date: '2025-01-22T00:00:00.000Z',
      url: '#'
    },
    {
      id: '2', 
      company: {
        id: 'premium-moving-services',
        name: 'PREMIUM MOVING SERVICES',
        logoUrl: null
      },
      rating: 5,
      projectType: 'Moving Company - From Downtown to Suburbs',
      excerpt: 'Reliable, professional, made a completely smooth job! Outstanding service from start to finish.',
      reviewer: {
        name: 'Mark',
        initial: 'M',
        location: 'Kopavogur',
        verified: true
      },
      date: '2025-01-22T00:00:00.000Z',
      url: '#'
    },
    {
      id: '3',
      company: {
        id: 'expert-cleaning-solutions',
        name: 'EXPERT CLEANING SOLUTIONS',
        logoUrl: null
      },
      rating: 5,
      projectType: 'Moving cleaning - 58m2 - Before 21.01.2025',
      excerpt: 'We are very satisfied with the cleaning of our apartment. Both professional and thorough work.',
      reviewer: {
        name: 'Sarah',
        initial: 'S',
        location: 'Hafnarfjordur',
        verified: true
      },
      date: '2025-01-22T00:00:00.000Z',
      url: '#'
    }
  ];

  // Use sample reviews
  const displayReviews = sampleReviews;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a202c] mb-4">
            Latest Reviews
          </h2>
          <p className="text-lg text-[#4a5568] max-w-3xl mx-auto">
            Latest reviews of completed jobs on BuildConnect
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              {/* Company Header */}
              <div className="flex items-center gap-3 mb-4">
                {/* Company Logo */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex-shrink-0 flex items-center justify-center">
                  <div className="text-white text-sm font-bold">
                    {review.company.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </div>
                </div>
                
                {/* Company Name */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-blue-600 hover:text-blue-700 transition-colors text-sm">
                    {review.company.name}
                  </h3>
                </div>
              </div>

              {/* Project Type */}
              <div className="mb-4">
                <p className="font-semibold text-gray-900 text-sm">
                  {review.projectType}
                </p>
              </div>

              {/* Review Excerpt */}
              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.excerpt}-
                  <a href={review.url} className="text-blue-600 hover:text-blue-700 font-medium">
                    Read more
                  </a>
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3">
                {/* Reviewer Avatar */}
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-xs">
                    {review.reviewer.initial}
                  </span>
                </div>
                
                {/* Reviewer Details */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {review.reviewer.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {review.reviewer.verified && (
                      <span className="text-green-600 font-medium">BankID-verified user</span>
                    )}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {review.reviewer.location}, {new Date(review.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;