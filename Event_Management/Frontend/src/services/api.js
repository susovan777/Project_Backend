import axios from 'axios';
import { config } from '../config/endpoint.js';

const API_URL = config.endpoint;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s
});

// Request interceptor (optional - for adding auth tokens later)
/**
 * Request Interceptor:
        - Runs BEFORE every API call
        - Use case: Add authentication tokens
        - Example: If you add login later, you can inject JWT tokens here
 */
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here in the future
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for global error handling)
/**
 * Response Interceptor:
        - Runs AFTER every API response
        - Use case: Global error handling
        - Logs errors to console automatically
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // global error handling
    if (error.response) {
      console.error('API Error:', error.response.data); // server error
    } else if (error.request) {
      console.error('Network Error:', error.message); // request made but no response
    } else {
      console.error('Error:', error.message); // other error
    }

    return Promise.reject(error);
  }
);

export default api;
