/**
 * Route Structure:
 * router.METHOD(path, validate(schema), controller)
 *
 * Flow:
 * Request → validate() → controller → service → response
 *
 * If validation fails:
 * Request → validate() → throws ApiError → error middleware → error response
 */

import express from 'express';
import {
  createVideo,
  getAllVideos,
  getVideo,
  updateViews,
  updateVotes,
} from '../../Controllers/video.controller.js';
import { validate } from '../../Middlewares/validate.js';
import videoValidation from '../../Validations/video.validations.js';

const router = express.Router();

/**
 * GET /v1/videos?title=top&genres=Education&sortBy=releaseDate
 * Validates query parameters before reaching controller
 */
router.get(
  '/',
  validate(videoValidation.getAllVideos), // Validate query params
  getAllVideos // Controller
);

/**
 * GET /v1/videos/:videoId - Get single video
 * Validates videoId is a valid MongoDB ObjectId
 */
router.get(
  '/:videoId',
  validate(videoValidation.getVideo), // Validate body
  getVideo
);

/**
 * POST /v1/videos - Post new video
 * Validates all required fields in request body
 *
 * Example body:
 * {
 *   "videoLink": "youtube.com/embed/dQw4w9WgXcQ",
 *   "title": "Amazing Video",
 *   "genre": "Education",
 *   "contentRating": "12+",
 *   "releaseDate": "2024-01-15",
 *   "previewImage": "https://example.com/image.jpg"
 * }
 */
router.post(
  '/',
  validate(videoValidation.postVideo), // Validate body
  createVideo
);

/**
 * PATCH /v1/videos/:videoId/votes - Update votes
 * Validates both URL params and request body
 *
 * Example body:
 * {
 *   "vote": "upVote",
 *   "change": "increase"
 * }
 */
router.patch(
  '/:videoId/votes',
  validate(videoValidation.patchVotes), // Validate params + body
  updateVotes
);

/**
 * PATCH /v1/videos/:videoId/views - Update view count
 * Validates only URL params (no body needed)
 */
router.patch(
  '/:videoId/views',
  validate(videoValidation.patchViews), // Validate params
  updateViews
);

export default router;

/**
 * Why use validation middleware?
 *
 * WITHOUT validation:
 * - Controller has to check every field manually
 * - Inconsistent error messages
 * - Harder to maintain
 * - Security risks (malicious data can reach database)
 *
 * WITH validation:
 * - Clean separation of concerns
 * - Consistent error format
 * - Fail fast (bad data rejected immediately)
 * - Easy to update validation rules
 * - Controllers focus on business logic only
 */
