/**
 * Video Controller - Handles HTTP requests and responses
 * Uses service layer for business logic
 */

import videoService from '../Services/video.service.js';
import catchAsync from '../Utils/catchAsync.js';
import ApiError from '../Utils/ApiError.js';

/**
 * GET /v1/videos
 * Get all videos with optional filters
 * Query params: title, genres, contentRating, sortBy
 */
const getAllVideos = catchAsync(async (req, res) => {
  // Extract query parameters from request
  const { title, genres, contentRating, sortBy } = req.query;

  // Call service to get videos
  const videos = await videoService.getAllVideos({
    title,
    genres,
    contentRating,
    sortBy,
  });

  // Send success response
  res.status(200).json({
    status: 'success',
    count: videos.length,
    data: videos,
  });
});

/**
 * GET /v1/videos/:videoId
 * Get single video by ID
 */
const getVideo = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const video = await videoService.getVideoById(videoId);

  // If video not found, throw error
  if (!video) {
    throw new ApiError(404, `Video with ID ${videoId} not found`);
  }

  res.status(200).json({
    status: 'success',
    data: video,
  });
});

/**
 * POST /v1/videos
 * Create new video
 * Body: { videoLink, title, genre, contentRating, releaseDate, previewUrl }
 */
const createVideo = catchAsync(async (req, res) => {
  const videoData = req.body;

  // Check if video with same videoId already exists
  const existingVideo = await videoService.createVideo(videoData.videoLink);
  if (existingVideo) {
    throw new ApiError(
      400,
      `Video with link ${videoData.videoLink} already exists`
    );
  }

  const video = await videoService.createVideo(videoData);

  res.status(200).json({
    status: 'success',
    message: 'Video created successfully',
    data: video,
  });
});

/**
 * PATCH /v1/videos/:videoId/votes
 * Update video votes (upVote or downVote)
 * Body: { vote: 'upVote' | 'downVote', change: 'increase' | 'decrease' }
 */
const updateVotes = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { vote, change } = req.body;

  const video = await videoService.updateVotes(videoId, vote, change);

  // If video not found, throw error
  if (!video) {
    throw new ApiError(404, `Video with ID ${videoId} not found`);
  }

  res.status(200).json({
    status: 'success',
    message: 'Votes updated successfully',
    data: video,
  });
});

/**
 * PATCH /v1/videos/:videoId/views
 * Increment video view count
 */
const updateViews = catchAsync(async (req, res) => {
  const { videoId } = req.params;

  const video = await videoService.updateViewCount(videoId);

  // If video not found, throw error
  if (!video) {
    throw new ApiError(404, `Video with ID ${videoId} not found`);
  }

  res.status(200).json({
    status: 'success',
    message: 'View count updated successfully',
    data: video,
  });
});

export { getAllVideos, getVideo, createVideo, updateVotes, updateViews };
