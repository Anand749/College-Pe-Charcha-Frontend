import axios, { AxiosInstance, AxiosError } from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cpc-admin-page-backend.vercel.app';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available (for future authenticated requests)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };

// Legacy export for backward compatibility
export const API_ENDPOINTS = {
  CORE_APPLICATIONS: `${API_BASE_URL}/api/core-applications`,
};