import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

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

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        
        // Handle authentication errors
        if (error.response?.status === 401) {
          // Redirect to login or trigger auth context logout
          window.dispatchEvent(new CustomEvent('auth-error', { detail: 'unauthorized' }));
        }
        
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

  async login(email, password) {
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await axios.post(`${API_BASE}/auth/cookie/login`, formData, {
        withCredentials: true,
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

  async requestPasswordReset(email) {
    try {
      const response = await this.client.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to request password reset');
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const response = await this.client.post('/auth/reset-password', {
        token,
        password: newPassword
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to reset password');
    }
  }

  // Role-specific test endpoints
  async testCustomerAccess() {
    try {
      const response = await this.client.get('/auth/customer-only');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Access denied');
    }
  }

  async testProfessionalAccess() {
    try {
      const response = await this.client.get('/auth/professional-only');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Access denied');
    }
  }

  async testAdminAccess() {
    try {
      const response = await this.client.get('/auth/admin-only');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Access denied');
    }
  }

  // Project endpoints (updated to work with authentication)
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