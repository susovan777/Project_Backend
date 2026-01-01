import axios from 'axios';
import { API_BASE_URL } from './../utils/constants.js';

/**
 * Axios instance with base configuration
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, //
});

/**
 * Request Interceptor
 * Runs before every request is sent
 */
api.interceptors.request.use(
  (config) => {
    // I can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log('📤 API Request:', config.method.toUpperCase(), config.url);
    return config;
  },

  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Runs after every response is received
 */
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', response.status, response.config.url);
    return response;
  },

  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      console.error(
        '❌ Response Error:',
        error.response.status,
        error.response.data
      );

      // Extract error message
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        'Something went wrong';

      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ Network Error: No response from server');
      return Promise.reject(
        new Error('Network error. Please check your connection.')
      );
    } else {
      // Something else happened
      console.error('❌ Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export default api;
