import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://byggja-verki.preview.emergentagent.com';
// Check if we're in local development mode
const IS_LOCAL_DEV = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const SECURE_BACKEND_URL = IS_LOCAL_DEV ? 'http://localhost:8001' : BACKEND_URL.replace(/^http:/, 'https:');
const API_BASE = `${SECURE_BACKEND_URL}/api`;

console.log('API Service initialized with:', { BACKEND_URL, SECURE_BACKEND_URL, API_BASE, IS_LOCAL_DEV });

class ApiService {
  constructor() {
    // Create axios instance with default config for session-based auth
    this.client = axios.create({
      baseURL: API_BASE,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Enable cookies for session-based auth
    });

    // Create separate client for public APIs (no credentials needed)
    this.publicClient = axios.create({
      baseURL: API_BASE,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false, // No credentials for public endpoints
    });

    // Add response interceptor for error handling (authenticated client)
    this.client.interceptors.response.use(
      (response) => {
        // Handle 204 No Content responses (like login success)
        if (response.status === 204) {
          return { success: true, status: response.status };
        }
        return response.data;
      },
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        
        // Handle authentication errors
        if (error.response?.status === 401) {
          // Dispatch custom event for auth context
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('auth-error', { detail: 'unauthorized' }));
          }
        }
        
        return Promise.reject(error);
      }
    );

    // Add response interceptor for public client
    this.publicClient.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('Public API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Authentication endpoints
  async register(userData) {
    try {
      const response = await this.client.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to register user');
    }
  }

  // Company registration endpoint
  async registerCompany(companyData) {
    try {
      const response = await this.publicClient.post('/auth/register-company', companyData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to register company');
    }
  }

  async sendLoginLink(email) {
    try {
      const response = await this.client.post('/auth/send-login-link', { email });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to send login link');
    }
  }

  async verifyLoginCode(email, code) {
    try {
      const response = await this.client.post('/auth/verify-login-code', { email, code });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to verify code');
    }
  }

  async login(email, password) {
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await this.client.post('/auth/cookie/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to login');
    }
  }

  async logout() {
    try {
      const response = await this.client.post('/auth/cookie/logout');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to logout');
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.client.get('/auth/me');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get current user');
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await this.client.put('/auth/profile', profileData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update profile');
    }
  }

  async switchRole(newRole) {
    try {
      const response = await this.client.post('/auth/switch-role', { new_role: newRole });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to switch role');
    }
  }

  // Public Job Request endpoints (no authentication required)
  async createDraftJobRequest(jobData) {
    try {
      const response = await this.publicClient.post('/public/job-requests/draft', jobData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create draft job request');
    }
  }

  async updateDraftJobRequest(draftId, updateData) {
    try {
      const response = await this.publicClient.patch(`/public/job-requests/${draftId}`, updateData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update draft job request');
    }
  }

  async submitDraftJobRequest(draftId) {
    try {
      const response = await this.publicClient.post(`/public/job-requests/${draftId}/submit`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to submit job request');
    }
  }

  // Reviews endpoints
  async getReviews(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value);
      });
      
      const response = await this.client.get(`/reviews?${params}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get reviews');
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return response;
    } catch (error) {
      throw new Error('API health check failed');
    }
  }

  // Job Request endpoints
  async getJobRequests(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await this.client.get(`/job-requests?${params}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get job requests');
    }
  }

  async createJobRequest(jobData) {
    try {
      const response = await this.client.post('/job-requests/', jobData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create job request');
    }
  }

  async getJobRequest(jobId) {
    try {
      const response = await this.client.get(`/job-requests/${jobId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get job request');
    }
  }

  // Professional Lead endpoints
  async createProLead(leadData) {
    try {
      const response = await this.publicClient.post('/public/pro/leads', leadData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create professional lead');
    }
  }

  // Generic post method for custom endpoints
  async post(endpoint, data) {
    try {
      const response = await this.client.post(endpoint, data);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'API request failed');
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;