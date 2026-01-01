/**
 * Video Service
 * All API calls related to videos
 */

import api from './api.js';

/**
 * Get all videos with optional filters
 * @param {Object} params - { title, genres, contentRating, sortBy }
 * @returns {Promise<Array>} Array of videos
 */
export const getAllVideos = async (params = {}) => {
  try {
    const response = await api.get('/videos', { params });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get single video by ID
 * @param {String} id - Video MongoDB _id
 * @returns {Promise<Object>} Video object
 */
export const getVideoById = async (id) => {
  try {
    const response = await api.get(`/videos/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new video
 * @param {Object} videoData - {videoLink, title, genre, contentRating, releaseDate}
 * @returns {Promise<Object>} Created video
 */
export const postVideo = async (videoData) => {
  try {
    const response = await api.post('/videos', videoData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update video votes
 * @param {String} id - Video mongoDB _id
 * @param {String} vote - 'upVote' or 'downVote'
 * @param {String} change - 'increase' or 'decrease'
 * @returns {Promise<Object>} Updated video
 */
export const updateVotes = async (id, vote, change) => {
  try {
    const response = await api.patch(`/videos/${id}/votes`, { vote, change });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Increment video view count
 * @param {String} id - Video MongoDB _id
 * @returns {Promise<Object>} Updated video
 */
export const incrementViews = async (id) => {
  try {
    const response = await api.patch(`/videos/${id}/views`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Helper: Upload video with toast notifications
 * @param {Object} videoData - Video form data
 * @param {Function} toast - react-hot-toast instance
 * @returns {Promise<Object>} Created video
 */
export const uploadVideoWithToast = async (videoData, toast) => {
  const loadingToast = toast.loading('Uploading video...');

  try {
    const video = await createVideo(videoData);
    toast.success('Video uploaded successfully!', { id: loadingToast });
    return video;
  } catch (error) {
    toast.error(error.message || 'Failed to upload video', {
      id: loadingToast,
    });
    throw error;
  }
};
