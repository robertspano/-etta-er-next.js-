import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

class ApiService {
  constructor() {
    // Create axios instance with default config
    this.client = axios.create({
      baseURL: API_BASE,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token when available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Project endpoints
  async submitProject(projectData) {
    try {
      const response = await this.client.post('/projects', projectData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to submit project');
    }
  }

  async getProjects(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await this.client.get(`/projects?${params}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get projects');
    }
  }

  async getProject(projectId) {
    try {
      const response = await this.client.get(`/projects/${projectId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get project');
    }
  }

  // Service endpoints
  async getServices(language = 'en') {
    try {
      const response = await this.client.get(`/services?language=${language}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get services');
    }
  }

  async getService(serviceId, language = 'en') {
    try {
      const response = await this.client.get(`/services/${serviceId}?language=${language}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get service');
    }
  }

  // Stats endpoints
  async getPlatformStats() {
    try {
      const response = await this.client.get('/stats');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get platform stats');
    }
  }

  // Testimonials endpoints
  async getTestimonials(limit = 6) {
    try {
      const response = await this.client.get(`/testimonials?limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get testimonials');
    }
  }

  async getFeaturedTestimonials() {
    try {
      const response = await this.client.get('/testimonials/featured');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get featured testimonials');
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

  // Legacy endpoints (for backward compatibility)
  async createStatusCheck(clientName) {
    try {
      const response = await this.client.post('/status', { client_name: clientName });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create status check');
    }
  }

  async getStatusChecks() {
    try {
      const response = await this.client.get('/status');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get status checks');
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;