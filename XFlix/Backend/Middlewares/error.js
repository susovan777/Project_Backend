/**
 * Global Error Handler Middleware
 * This catches ALL errors in your application
 * Must have 4 parameters (err, req, res, next) for Express to recognize it as error middleware
 */

const errorHandler = (err, req, res, next) => {
  // Default to 500 server error if no status code is set
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Handle specific MongoDB errors //

  // 1. Duplicate key error (E11000) :: Happens when trying to insert duplicate unique field
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
  }

  // 2. Validation error :: Mongoose validation failed
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(', ');
  }

  // 3. Cast error (invalid ObjectId format)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err);
  }

  res.status(statusCode).json({
    status: 'fail',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    // Include stack trace only in development
  });
};

/**
 * 404 Not Found Handler
 * For routes that don't exist
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

export { errorHandler, notFound };
