import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

/**
 * Placeholder middleware for request validation using express-validator
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract first error message
    const errorMessage = errors.array().map(err => `${err.path}: ${err.msg}`).join(', ');
    return next(new ApiError(400, `Validation Error: ${errorMessage}`));
  }
  next();
};

export default validate;
