// API hook for reviews (ready for future implementation)
import { useState, useEffect } from 'react';
import api from '../services/api';

export const useReviews = (limit = 12, locale = 'en') => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Call the real backend API
        const response = await api.getReviews({ limit, locale });
        setReviews(response.data);
        
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message || 'Failed to load reviews');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [limit, locale]);

  return { reviews, loading, error };
};

// Sample review data structure for reference
export const sampleReview = {
  id: "review-123",
  company: {
    id: "company-456",
    name: "Nordic Construction AS",
    logoUrl: "https://example.com/logo.jpg"
  },
  rating: 5,
  excerpt: "Excellent work on our bathroom renovation. Professional, clean, and completed on time. Highly recommended for any construction project.",
  reviewer: {
    name: "Sigríður Jónsdóttir",
    initial: "S",
    location: "Reykjavík"
  },
  date: "2024-08-15T10:30:00.000Z",
  url: "/company/company-456/reviews/review-123"
};

export default useReviews;