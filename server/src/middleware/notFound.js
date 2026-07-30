import ApiError from '../utils/ApiError.js';

/**
 * Handle requests to non-existent routes
 */
const notFound = (req, res, next) => {
  next(new ApiError(404, `Route Not Found: ${req.originalUrl}`));
};

export default notFound;
