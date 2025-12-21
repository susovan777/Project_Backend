/**
 * Route definitions
 * Format: router.method(path, [middleware], controller)
 */

import express from 'express';
import {
  createVideo,
  getAllVideos,
  getVideo,
  updateViews,
  updateVotes,
} from '../../Controllers/video.controller.js';
import validateVideo from '../../Middlewares/validate.js';

const router = express.Router();

// GET /v1/videos - Get all videos with filters
router.get('/', getAllVideos);

// GET /v1/videos/:videoId - Get single video
router.get('/:videoId', getVideo);

// POST /v1/videos - Create new video
router.post('/', validateVideo, createVideo);

// PATCH /v1/videos/:videoId/votes - Update votes
router.patch('/:videoId/votes', updateVotes);

// PATCH /v1/videos/:videoId/views - Update view count
router.patch('/:videoId/views', updateViews);

export default router;
