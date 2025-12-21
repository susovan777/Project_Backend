/**
 * Validation middleware for creating videos
 * Runs BEFORE the controller
 */
import ApiError from '../Utils/ApiError.js';

const validateVideo = (req, res, next) => {
  const { videoLink, title, genre, contentRating, releaseDate } =
    req.body;

  // Check required fields
  const requiredFields = {
    videoLink: 'Video Link',
    title: 'Title',
    genre: 'Genre',
    contentRating: 'Content Rating',
    releaseDate: 'Release Date',
  };

  // Check each required field
  for (const [field, label] of Object.entries(requiredFields)) {
    if (!req.body[field]) {
      throw new ApiError(400, `${label} is required`);
    }
  }

  // YouTube Link Validation (Regex)
  const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-){11})(?:\S+)?$/;
  
  if (!youtubeRegex.test(videoLink)) {
    throw new ApiError(400, 'Video Link must be a valid YouTube URL');
  }

  // Validate genre
  const validGenres = [
    'Education',
    'Sports',
    'Movies',
    'Comedy',
    'Lifestyle',
    'All',
  ];
  if (!validGenres.includes(genre)) {
    throw new ApiError(400, `Genre must be one of: ${validGenres.join(', ')}`);
  }

  // Validate content rating
  const validRatings = ['Anyone', '7+', '12+', '16+', '18+'];
  if (!validRatings.includes(contentRating)) {
    throw new ApiError(
      400,
      `Content rating must be one of: ${validRatings.join(', ')}`
    );
  }

  // Validate release date format
  const date = new Date(releaseDate);
  if (isNaN(date.getTime())) {
    throw new ApiError(400, 'Invalid release date format');
  }

  // If all validations pass, proceed to next middleware/controller
  next();
};

export default validateVideo;
