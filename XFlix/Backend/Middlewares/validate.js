/**
 * Validation middleware for creating videos
 * Runs BEFORE the controller
 */
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
  // Pick only the parts of req that need validation
  const validSchema = Object.keys(schema).reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});

  // Compile schema into Joi validator
  const compiledSchema = Joi.compile(schema);
  
  // Validate request data
  const { value, error } = compiledSchema.validate(validSchema, {
    abortEarly: false, // Collect all errors, not just first one
    stripUnknown: true // Remove unknown fields from request
  });

  // If validation fails, throw error
  if (error) {
    // Extract all error messages
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    
    throw new ApiError(400, errorMessage);
  }

  // Replace request data with validated values
  Object.assign(req, value);
  
  // Proceed to next middleware/controller
  next();
};

/**
 * Example validation flow:
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