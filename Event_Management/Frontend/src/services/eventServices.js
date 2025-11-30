import api from './api';

/**
 * Event API Service
 * Handles all event-related API calls
 */
const eventAPI = {
  /**
   * Get all events (with timezone conversion)
   * @param {string} timezone - Timezone for date conversion
   * @returns {Promise} Response with array of events
   */
  getAll: async (timezone) => {
    const response = await api.get('/events', {
      params: { timezone },
    });
    return response.data;
  },

  /**
   * Get events for a specific profile
   * @param {string} profileId - Profile ID
   * @param {string} timezone - Timezone for date conversion
   * @returns {Promise} Response with filtered events
   */
  getByProfile: async (profileId, timezone) => {
    const response = await api.get(`/events/profile/${profileId}`, {
      params: { timezone },
    });
    return response.data;
  },

  /**
   * Create a new event
   * @param {Object} eventData - { title, profiles, startDate, endDate, timezone }
   * @returns {Promise} Response with created event
   */
  create: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  /**
   * Update an existing event
   * @param {string} id - Event ID
   * @param {Object} eventData - { title, profiles, startDate, endDate, timezone, userTimezone }
   * @returns {Promise} Response with updated event
   */
  update: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  /**
   * Delete an event
   * @param {string} id - Event ID
   * @returns {Promise} Response with success message
   */
  delete: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
};

export default eventAPI;
