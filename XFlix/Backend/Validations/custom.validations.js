import mongoose from 'mongoose';

// Valid options for validation
const validGenres = [
  'Education',
  'Sports',
  'Movies',
  'Comedy',
  'Lifestyle',
  'All',
];
const validRatings = ['Anyone', '7+', '12+', '16+', '18+'];
const validSortByOptions = ['viewCount', 'releaseDate'];

/**
 * Custom validation for videoLink
 * Format: youtube.com/embed/<video-id>
 * Example: youtube.com/embed/dQw4w9WgXcQ
 *
 * Why custom validation?
 * - Joi's built-in .uri() is too generic
 * - We need to enforce specific YouTube embed format
 * - Prevents invalid URLs from being stored
 */
export const validateVideoLink = (value, helpers) => {
  // Regex breakdown:
  // ^youtube\.com        → Must start with "youtube.com"
  // \/embed\/            → Must have "/embed/"
  // [a-zA-Z0-9_-]+       → Video ID (letters, numbers, underscore, hyphen)
  // $                    → Must end here (no extra characters)
  const regex =
    /^(https:\/\/www\.youtube\.com|youtube\.com)\/embed\/[a-zA-Z0-9_-]+$/;

  if (!regex.test(value)) {
    return helpers.message(
      '"videoLink" must be in the format: "https://youtu.be/<video-id>" or "https://www.youtube.com/embed/<video-id>"'
    );
  }

  return value; // Validation passed
};

/**
 * Validate genres (can be comma-separated)
 * Examples:
 * - "Education" ✅
 * - "Education,Sports" ✅
 * - "Education, Sports, Comedy" ✅
 * - "InvalidGenre" ❌
 *
 * Why this validation?
 * - Users might send multiple genres: ?genres=Education,Sports
 * - We need to validate each genre individually
 * - Prevents typos and invalid data
 */
export const validateGenres = (value, helpers) => {
  // Split by comma and trim spaces
  const genreList = value.split(',').map((g) => g.trim());

  // Find invalid genres
  const invalidGenres = genreList.filter(
    (genre) => !validGenres.includes(genre)
  );

  if (invalidGenres.length > 0) {
    return helpers.message(
      `"genres" must be one of [${validGenres.join(
        ', '
      )}]. Invalid: ${invalidGenres.join(', ')}`
    );
  }

  return value;
};

/**
 * Validate content rating
 * Example: "12+", "18+", "Anyone"
 *
 * Why this validation?
 * - Ensures consistent rating values
 * - Prevents invalid ratings like "10+" or "Mature"
 */
export const validateContentRating = (value, helpers) => {
  if (!validRatings.includes(value)) {
    return helpers.message(
      `"contentRating" must be one of [${validRatings.join(', ')}]`
    );
  }

  return value;
};

/**
 * Validate sortBy parameter
 * Example: "releaseDate", "viewCount"
 *
 * Why this validation?
 * - Only these fields support sorting
 * - Prevents sorting by non-existent or sensitive fields
 */
export const validateSortBy = (value, helpers) => {
  if (!validSortByOptions.includes(value)) {
    return helpers.message(
      `"sortBy" must be one of [${validSortByOptions.join(', ')}]`
    );
  }

  return value;
};

/**
 * Validate MongoDB ObjectId
 * Example: "507f1f77bcf86cd799439011" ✅
 * Example: "invalid-id" ❌
 *
 * Why this validation?
 * - MongoDB _id must be valid ObjectId format (24 hex characters)
 * - Prevents database errors from invalid IDs
 * - Returns clear error message to user
 */
export const validateVideoId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('"videoId" must be a valid MongoDB ObjectId');
  }

  return value;
};

// Export all validation functions
export default {
  validateVideoLink,
  validateGenres,
  validateContentRating,
  validateSortBy,
  validateVideoId,
};
