/**
 * Wraps an asynchronous function (route handler) and catches any errors.
 * The caught errors are passed to Express's error handling middleware via next().
 * Eliminates need for try-catch in every controller
 *
 * @param {Function} fn An asynchronous route handler function (req, res, next).
 * @returns {Function} A new function that executes the async function and catches errors.
 */

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;
