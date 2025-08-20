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
  // Sample fake reviews data - always 3 reviews with 5 stars
  const sampleReviews = [
    {
      id: '1',
      company: {
        id: 'byggmeistari-reykjavik',
        name: language === 'is' ? 'Byggmeistari Reykjavík' : 'Reykjavik Construction',
        logoUrl: null
      },
      rating: 5,
      excerpt: language === 'is' 
        ? 'Frábær þjónusta og fagleg vinnubrögð. Verkið var klárað á réttum tíma og innan fjárhagsramma. Mæli eindregið með þessu fyrirtæki.'
        : 'Excellent service and professional workmanship. The project was completed on time and within budget. Highly recommend this company.',
      reviewer: {
        name: language === 'is' ? 'Sigurdur Einarsson' : 'John Peterson',
        initial: language === 'is' ? 'S' : 'J',
        location: language === 'is' ? 'Reykjavík' : 'Reykjavik'
      },
      date: '2025-01-10T00:00:00.000Z',
      url: '#'
    },
    {
      id: '2', 
      company: {
        id: 'husasmidi-og-vidgerdir',
        name: language === 'is' ? 'Húsasmíði & Viðgerðir' : 'Home Building & Repairs',
        logoUrl: null
      },
      rating: 5,
      excerpt: language === 'is'
        ? 'Mjög áhugasamir og hjálplegir starfsmenn. Góð samskipti í gegnum allt ferlið og útkoman var betri en ég bjóst við.'
        : 'Very dedicated and helpful staff. Great communication throughout the process and the outcome was better than expected.',
      reviewer: {
        name: language === 'is' ? 'Anna Kristjánsdóttir' : 'Sarah Mitchell',
        initial: language === 'is' ? 'A' : 'S',
        location: language === 'is' ? 'Kópavogur' : 'Kopavogur'
      },
      date: '2025-01-05T00:00:00.000Z',
      url: '#'
    },
    {
      id: '3',
      company: {
        id: 'handverksfyrirtaeki-islands',
        name: language === 'is' ? 'Handverksfyrirtæki Íslands' : 'Iceland Craftsmanship Co.',
        logoUrl: null
      },
      rating: 5,
      excerpt: language === 'is'
        ? 'Ótrúlega vandvirkir og nákvæmir í sinni vinnu. Verkið var gert hratt og vel. Mun nota þetta fyrirtæki aftur.'
        : 'Incredibly meticulous and precise in their work. The job was done quickly and well. Will use this company again.',
      reviewer: {
        name: language === 'is' ? 'Gunnar Þórsson' : 'Michael Thompson',
        initial: language === 'is' ? 'G' : 'M', 
        location: language === 'is' ? 'Hafnarfjörður' : 'Hafnarfjordur'
      },
      date: '2024-12-28T00:00:00.000Z',
      url: '#'
    }
  ];

  // Use sample reviews instead of passed reviews
  const displayReviews = sampleReviews;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {translations.latestReviewsTitle || "Latest Reviews"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {translations.latestReviewsSubtitle || "See what our customers say about the professionals they've worked with"}
          </p>
        </div>

        {/* Reviews Container - Show all 3 reviews side by side */}
        <div className="relative">
          {/* Reviews Grid - Always show all 3 reviews horizontally */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayReviews.map((review) => (
              <ReviewCard key={review.id} review={review} language={language} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;