/**
 * Wrapper for async route handlers.
 * Eliminates the need for try/catch blocks in every controller by passing errors to the next middleware.
 * 
 * @param {Function} fn - Async controller function
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default asyncHandler;
