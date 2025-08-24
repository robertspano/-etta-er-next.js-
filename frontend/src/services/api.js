import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://craftlink-3.preview.emergentagent.com';
// Ensure HTTPS is used
const SECURE_BACKEND_URL = BACKEND_URL.replace(/^http:/, 'https:');
const API_BASE = `${SECURE_BACKEND_URL}/api`;

console.log('API Service initialized with:', { BACKEND_URL, SECURE_BACKEND_URL, API_BASE });

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

  // Professional Lead endpoints
  async createProLead(leadData) {
    try {
      const response = await this.publicClient.post('/public/pro/leads', leadData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create professional lead');
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

  async updateJobRequest(jobId, updateData) {
    try {
      const response = await this.client.put(`/job-requests/${jobId}`, updateData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update job request');
    }
  }

  async updateJobStatus(jobId, newStatus) {
    try {
      const response = await this.client.put(`/job-requests/${jobId}/status`, { new_status: newStatus });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update job status');
    }
  }

  async uploadJobPhoto(jobId, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await this.client.post(`/job-requests/${jobId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to upload photo');
    }
  }

  // Quote endpoints
  async getQuotes(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await this.client.get(`/quotes?${params}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get quotes');
    }
  }

  async createQuote(quoteData) {
    try {
      const response = await this.client.post('/quotes/', quoteData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create quote');
    }
  }

  async getQuote(quoteId) {
    try {
      const response = await this.client.get(`/quotes/${quoteId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get quote');
    }
  }

  async updateQuote(quoteId, updateData) {
    try {
      const response = await this.client.put(`/quotes/${quoteId}`, updateData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update quote');
    }
  }

  async acceptQuote(quoteId) {
    try {
      const response = await this.client.post(`/quotes/${quoteId}/accept`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to accept quote');
    }
  }

  async declineQuote(quoteId) {
    try {
      const response = await this.client.post(`/quotes/${quoteId}/decline`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to decline quote');
    }
  }

  async withdrawQuote(quoteId) {
    try {
      const response = await this.client.post(`/quotes/${quoteId}/withdraw`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to withdraw quote');
    }
  }

  // Messaging endpoints
  async sendMessage(messageData) {
    try {
      const response = await this.client.post('/messages/', messageData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to send message');
    }
  }

  async getJobMessages(jobId, page = 1, limit = 50) {
    try {
      const response = await this.client.get(`/messages/job/${jobId}?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get messages');
    }
  }

  async getConversations() {
    try {
      const response = await this.client.get('/messages/conversations');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get conversations');
    }
  }

  async uploadMessageAttachment(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await this.client.post('/messages/upload-attachment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to upload attachment');
    }
  }

  // Notification endpoints
  async getNotifications(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value);
      });
      
      const response = await this.client.get(`/notifications?${params}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get notifications');
    }
  }

  async markNotificationRead(notificationId) {
    try {
      const response = await this.client.put(`/notifications/${notificationId}/read`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to mark notification as read');
    }
  }

  async markAllNotificationsRead() {
    try {
      const response = await this.client.put('/notifications/mark-all-read');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to mark all notifications as read');
    }
  }

  async getNotificationStats() {
    try {
      const response = await this.client.get('/notifications/stats');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get notification stats');
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

  async getReview(reviewId) {
    try {
      const response = await this.client.get(`/reviews/${reviewId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get review');
    }
  }

  async createReview(reviewData) {
    try {
      const response = await this.client.post('/reviews/create', reviewData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create review');
    }
  }

  async getProfessionalReviews(professionalId, filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value);
      });
      
      const response = await this.client.get(`/reviews/professional/${professionalId}?${params}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get professional reviews');
    }
  }

  async moderateReview(reviewId, status) {
    try {
      const response = await this.client.put(`/reviews/${reviewId}/moderate`, { status });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to moderate review');
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