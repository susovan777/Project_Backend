// import { config } from '../config/endpoint';

import api from './api';

// const API_URL = `${config.endpoint}/api/events`;

// const createEvent = async (eventData) => {
//   const response = await axios.post(API_URL, eventData);
//   return response.data;
// };

// const getAllEvents = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

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
      params: timezone,
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
    const response = await api.get(`/events/profiles/${profileId}`, {
      params: timezone,
    });
    return response.data;
  },

  /**
   * Create a new event
   * @param {Object} eventData - { title, profiles, startDate, endDate, timezone }
   * @returns {Promise} Response with created event
   */
  create: async (eventData) => {
    const response = await api.post('/events');
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
    const response = api.delete(`/events/${id}`);
    return response.data;
  },
};

// export default { getAllEvents, createEvent };
export default eventAPI;
