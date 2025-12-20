/**
 * Custom Error class for API errors
 * Extends JavaScript's built-in Error class
 */

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message); // Call parent constructor (Error)
    this.statusCode = statusCode;
    this.isOPerational = true; // Marks this as operational error (not programming error)

    // Captures stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage example:
// throw new ApiError(404, 'Video not found');

export default ApiError;
