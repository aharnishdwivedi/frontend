import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          throw new Error(data.message || 'Invalid request data');
        case 404:
          throw new Error('Resource not found');
        case 500:
          throw new Error('Internal server error');
        default:
          throw new Error(data.message || `HTTP ${status} error`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error - please check your connection');
    } else {
      // Other error
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

export const incidentService = {
  /**
   * Get all incidents
   * @returns {Promise<Array>} Array of incidents
   */
  async getAllIncidents() {
    try {
      const response = await apiClient.get('/incidents');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching incidents:', error);
      throw error;
    }
  },

  /**
   * Get incident by ID
   * @param {number|string} id - Incident ID
   * @returns {Promise<Object>} Incident object
   */
  async getIncidentById(id) {
    try {
      const response = await apiClient.get(`/incidents/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Error fetching incident ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new incident
   * @param {Object} incidentData - Incident data
   * @returns {Promise<Object>} Created incident
   */
  async createIncident(incidentData) {
    try {
      const response = await apiClient.post('/incidents', incidentData);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating incident:', error);
      throw error;
    }
  },

  /**
   * Update incident
   * @param {number|string} id - Incident ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Updated incident
   */
  async updateIncident(id, updateData) {
    try {
      const response = await apiClient.put(`/incidents/${id}`, updateData);
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Error updating incident ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete incident
   * @param {number|string} id - Incident ID
   * @returns {Promise<void>}
   */
  async deleteIncident(id) {
    try {
      await apiClient.delete(`/incidents/${id}`);
    } catch (error) {
      console.error(`Error deleting incident ${id}:`, error);
      throw error;
    }
  },

  /**
   * Health check
   * @returns {Promise<Object>} Health status
   */
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },
};

export default incidentService;
