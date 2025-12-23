/**
 * Validation Schemas for Video Routes
 *
 * Structure of each schema:
 * {
 *   params: {...},  // Validates URL parameters (/videos/:videoId)
 *   query: {...},   // Validates query strings (?title=abc&genre=Sports)
 *   body: {...}     // Validates request body (POST/PATCH JSON data)
 * }
 */

import Joi from 'joi';
import {
  validateGenres,
  validateContentRating,
  validateSortBy,
  validateVideoId,
  validateVideoLink,
} from './custom.validations.js';

/**
 * GET /v1/videos?title=xyz&genres=Education,Sports&contentRating=12+&sortBy=releaseDate
 *
 * All parameters are optional because:
 * - User might want all videos (no filters)
 * - User might filter by title only
 * - User might combine multiple filters
 *
 * Example requests:
 * - GET /v1/videos → Get all videos ✅
 * - GET /v1/videos?title=top → Filter by title ✅
 * - GET /v1/videos?genres=Education&sortBy=viewCount → Filter + Sort ✅
 */
const getAllVideos = {
  query: Joi.object().keys({
    // Search videos by title (case-insensitive)
    title: Joi.string().optional(),

    // Filter by genres (comma-separated)
    // Example: "Education,Sports"
    genres: Joi.string().custom(validateGenres).optional(),

    // Filter by content rating
    // Example: "12+"
    contentRating: Joi.string().custom(validateContentRating).optional(),

    // Sort results by field
    // Options: "releaseDate" or "viewCount"
    sortBy: Joi.string().custom(validateSortBy).optional(),
  }),
};

/**
 * GET /v1/videos/:videoId
 *
 * videoId is REQUIRED in URL params
 * Must be a valid MongoDB ObjectId (24 hex characters)
 *
 * Example: GET /v1/videos/507f1f77bcf86cd799439011
 */
const getVideo = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(validateVideoId).required(),
  }),
};

/**
 * POST /v1/videos
 * Create new video - ALL fields required
 *
 * Request body example:
 * {
 *   "videoLink": "youtube.com/embed/dQw4w9WgXcQ",
 *   "title": "Top 10 Programming Tips",
 *   "genre": "Education",
 *   "contentRating": "12+",
 *   "releaseDate": "2024-01-15",
 *   "previewImage": "https://example.com/image.jpg"
 * }
 *
 * Why all required?
 * - Video is incomplete without these fields
 * - Database schema marks them as required
 * - Better to fail early with clear error message
 */
const postVideo = {
  body: Joi.object().keys({
    // Validate YouTube embed link format
    videoLink: Joi.string().custom(validateVideoLink).required(),

    // Video title (at least 1 character)
    title: Joi.string().required(),

    // Single genre (not comma-separated for creation)
    genre: Joi.string().custom(validateGenres).required(),

    // Content rating
    contentRating: Joi.string().custom(validateContentRating).required(),

    // Release date (any valid date string)
    // Examples: "2024-01-15", "2024-01-15T10:30:00Z"
    releaseDate: Joi.string().required(),

    // Preview image must be valid URI
    // .uri() validates: http://, https://, ftp://, etc.
    previewImage: Joi.string().uri().required(),
  }),
};

/**
 * PATCH /v1/videos/:videoId/votes
 * Update video votes (upVote or downVote)
 *
 * Request body example:
 * {
 *   "vote": "upVote",      // or "downVote"
 *   "change": "increase"   // or "decrease"
 * }
 *
 * Use cases:
 * - User clicks upvote → vote: "upVote", change: "increase"
 * - User removes upvote → vote: "upVote", change: "decrease"
 * - User clicks downvote → vote: "downVote", change: "increase"
 * - User removes downvote → vote: "downVote", change: "decrease"
 */
const patchVotes = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(validateVideoId).required(),
  }),
  body: Joi.object().keys({
    // Must be exactly "upVote" or "downVote" (case-sensitive)
    vote: Joi.string().valid('upVote', 'downVote').required(),

    // Must be exactly "increase" or "decrease" (case-sensitive)
    change: Joi.string().valid('increase', 'decrease').required(),
  }),
};

/**
 * PATCH /v1/videos/:videoId/views
 * Increment video view count
 *
 * No body needed - just increment views by 1
 *
 * Example: PATCH /v1/videos/507f1f77bcf86cd799439011/views
 */
const patchViews = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(validateVideoId).required(),
  }),
};

// Export all validation schemas
export default {
  getAllVideos,
  getVideo,
  postVideo,
  patchVotes,
  patchViews,
};
