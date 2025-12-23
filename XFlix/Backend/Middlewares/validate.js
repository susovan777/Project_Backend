/**
 * Validation middleware for creating videos
 * Runs BEFORE the controller
 */

import Joi from 'joi';
import ApiError from '../Utils/ApiError.js';

/**
 * Generic validation middleware
 * Validates req.params, req.query, and req.body based on schema
 *
 * How it works:
 * 1. Takes a validation schema (from video.validations.js)
 * 2. Returns a middleware function
 * 3. Middleware validates the request against schema
 * 4. If valid → calls next() to proceed to controller
 * 5. If invalid → throws ApiError with validation message
 *
 * Usage in routes:
 * router.get('/', validate(videoValidation.getVideos), getVideos);
 */
export const validate = (schema) => (req, res, next) => {
  // Build object to validate from request
  // Only include properties that are defined in the schema
  const objectToValidate = {};

  // Extract parts of request based on schema
  if (schema.params && req.params) {
    objectToValidate.params = req.params;
  }
  if (schema.query && req.query) {
    objectToValidate.query = req.query;
  }
  if (schema.body && req.body) {
    objectToValidate.body = req.body;
  }

  // Create Joi schema for validation
  const joiSchema = Joi.object(schema);

  // Validate the data
  const { value, error } = joiSchema.validate(objectToValidate, {
    abortEarly: false, // Collect all errors, not just first one
    stripUnknown: true, // Remove unknown fields
  });

  // If validation fails, throw error
  if (error) {
    // console.log('❌ Validation error details:', error.details);

    // Extract all error messages
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');

    throw new ApiError(400, errorMessage);
  }

  // Note: We can't reassign req.query/params/body directly (they're read-only)
  // Update properties using Object.assign (not reassignment)
  if (value.params) Object.assign(req.params, value.params);
  if (value.query) Object.assign(req.query, value.query);
  if (value.body) Object.assign(req.body, value.body);

  // Proceed to next middleware/controller
  next();
};

/**
 * Example validation flow:
 *
 * Request: GET /v1/videos?genres=Cooking
 *       ↓
 * validate(getAllVideos) middleware runs
 *       ↓
 * Schema structure: { query: Joi.object().keys({ genres: ... }) }
 *       ↓
 * Object to validate: { query: { genres: 'Cooking' } }
 *       ↓
 * Joi validates: query.genres against validateGenres()
 *       ↓
 * validateGenres() checks: 'Cooking' in validGenres array? ❌
 *       ↓
 * Returns helpers.message("genres must be one of [Education, Sports...]")
 *       ↓
 * Throws ApiError(400, "genres must be one of...")
 *       ↓
 * Error middleware catches it
 *       ↓
 * Sends response: { success: false, message: "..." }
 *
 *---------------------------------------------------------------------
 *
 * Request: POST /v1/videos
 * Body: { "videoLink": "invalid", "title": "Test" }
 *       ↓
 * validate(postVideo) middleware runs
 *       ↓
 * Joi validates against postVideo schema
 *       ↓
 * Finds errors: videoLink format invalid, genre missing, etc.
 *       ↓
 * Throws ApiError(400, "videoLink must be in format youtube.com/embed/..., genre is required")
 *       ↓
 * Error middleware catches it
 *       ↓
 * Sends response: { success: false, message: "..." }
 */
