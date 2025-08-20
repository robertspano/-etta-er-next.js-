'use client';

import { useState, useEffect } from 'react';
import apiService from '@/services/api';

export const useReviews = (filters = {}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For now, we'll use mock data since the API might not be ready
        // In production, uncomment the line below:
        // const data = await apiService.getReviews(filters);
        
        // Mock data for development
        const mockReviews = [
          {
            id: '1',
            company: {
              id: 'byggmeistari-reykjavik',
              name: 'Byggmeistari Reykjavík',
              logoUrl: null
            },
            rating: 5,
            excerpt: 'Frábær þjónusta og fagleg vinnubrögð. Verkið var klárað á réttum tíma og innan fjárhagsramma.',
            reviewer: {
              name: 'Sigurdur E.',
              initial: 'S',
              location: 'Reykjavík'
            },
            date: '2025-01-10T00:00:00.000Z',
            url: '#'
          },
          {
            id: '2',
            company: {
              id: 'husasmidi-og-vidgerdir',
              name: 'Húsasmíði & Viðgerðir',
              logoUrl: null
            },
            rating: 5,
            excerpt: 'Mjög áhugasamir og hjálplegir starfsmenn. Góð samskipti í gegnum allt ferlið.',
            reviewer: {
              name: 'Anna K.',
              initial: 'A',
              location: 'Kópavogur'
            },
            date: '2025-01-05T00:00:00.000Z',
            url: '#'
          },
          {
            id: '3',
            company: {
              id: 'handverksfyrirtaeki-islands',
              name: 'Handverksfyrirtæki Íslands',
              logoUrl: null
            },
            rating: 5,
            excerpt: 'Ótrúlega vandvirkir og nákvæmir í sinni vinnu. Verkið var gert hratt og vel.',
            reviewer: {
              name: 'Gunnar Þ.',
              initial: 'G',
              location: 'Hafnarfjörður'
            },
            date: '2024-12-28T00:00:00.000Z',
            url: '#'
          }
        ];
        
        setReviews(mockReviews);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [filters]);

  return { reviews, loading, error, refetch: () => fetchReviews() };
};