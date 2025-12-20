/**
 *  Video Service - All database operations for videos
 *  Separating this from controllers keeps code clean and reusable
 */

import Video from '../Model/video';

class VideoService {
  /**
   * Get all videos with optional filters
   * @param {Object} filter - Mongo filters - { title, genre, contentRating, sortBy }
   * @returns {Promise<Array>} Array of videos
   */
  async getAllVideos(filters = {}) {
    const { title, genres, contentRating, sortBy } = filters;

    // Build query object dynamically
    const query = {};

    // Filter by title (case-insensitive search)
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // 'i' = case insensitive
    }

    // Filter by genre (can be multiple genres separated by comma)
    if (genres) {
      const genreArray = genres.split(',').map((g) => g.trim());
      query.genre = { $in: genreArray }; // $in = matches any value in array
    }

    // Filter by content rating (can be multiple ratings)
    if (contentRating) {
      const ratingArray = contentRating.split(',').map((r) => r.trim());
      query.contentRating = { $in: ratingArray };
    }

    // Build sort object
    let sortOption = {};
    if (sortBy === 'releaseDate') {
      sortOption = { releaseDate: -1 }; // -1 = descending (newest first)
    } else if (sortBy === 'viewCount') {
      sortOption = { viewCount: -1 };
    }

    // Execute query
    const videos = await Video.find(query).sort(sortOption);
    return videos;
  }

  /**
   * Get single video by videoId
   * @param {String} videoId - Video ID
   * @returns {Promise<Object>} Video object
   */
  async getVideoById(videoId) {
    const video = await Video.findOne({ videoId });
    return video;
  }

  /**
   * Create new video
   * @param {Object} videoData - Video details
   * @returns {Promise<Object>} Created video
   */
  async createVideo(videoData) {
    const video = await Video.create(videoData);
    return video;
  }

  /**
   * Update video votes (upVote or downVote)
   * @param {String} videoId - Video ID
   * @param {String} vote - 'upVote' or 'downVote'
   * @param {String} change - 'increase' or 'decrease'
   * @returns {Promise<Object>} Updated video
   */
  async updateVotes(videoId, vote, change) {
    const video = await Video.findOne({ videoId });

    if (!video) return null;

    // Update vote based on the action
    if (vote === 'upVote') {
      if (change === 'increase') {
        video.votes.upVotes += 1;
      } else if (change === 'decrease') {
        video.votes.upVotes = Math.max(0, video.votes.upVotes - 1);
      }
    } else if (vote === 'downVote') {
      if (change === 'increase') {
        video.votes.downVotes += 1;
      } else if (change === 'decrease') {
        video.votes.downVotes = Math.max(0, video.votes.downVotes - 1);
      }
    }

    await video.save();
    return video;
  }

  /**
   * Update video view count
   * @param {String} videoId - Video ID
   * @returns {Promise<Object>} Updated video
   */
  async updateViewCount(videoId) {
    const video = await Video.findOneAndUpdate(
      { videoId },
      { $inc: { viewCount: 1 } }, // $inc = increment by 1
      { new: true } // Return updated document
    );

    return video;
  }
}

// Export single instance (Singleton pattern)
export default new VideoService();
