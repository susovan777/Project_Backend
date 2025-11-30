import api from './api.js';

/**
 * Profile API Service
 * Handles all profile-related API calls
 */

const profileAPI = {
  /**
   * Get all profiles
   * @returns {Promise} Response with array of profiles
   */
  getAll: async () => {
    const response = await api.get('/profiles');
    return response.data;
  },

  /**
   * Create a new profile
   * @param {Object} profileData - { name, timezone }
   * @returns {Promise} Response with created profile
   */
  create: async (profileData) => {
    const response = await api.post('/profiles', profileData);
    return response.data;
  },

  /**
   * Update profile timezone
   * @param {string} id - Profile ID
   * @param {Object} profileData - { timezone }
   * @returns {Promise} Response with updated profile
   */
  update: async (id, profileData) => {
    const response = await api.put(`/profiles/${id}`, profileData);
    return response.data;
  },
};

export default profileAPI;
