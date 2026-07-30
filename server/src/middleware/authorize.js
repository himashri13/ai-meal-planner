import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/index.js';

/**
 * Role-Based Authorization Middleware
 * Designed to be used sequentially AFTER the authenticate middleware.
 * 
 * @param {...string} allowedRoles - A list of allowed roles (e.g., ROLE_ADMIN, ROLE_USER)
 * @returns {Function} Express middleware function
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Ensure user object exists (defend in depth, even if authenticate caught it)
    if (!req.user) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Access denied.'));
    }

    // 2. Ensure the user has a defined role
    if (!req.user.role) {
      return next(new ApiError(HTTP_STATUS.FORBIDDEN, 'Access denied.'));
    }

    // 3. Check if the user's role is strictly included in the allowed list
    const isAuthorized = allowedRoles.includes(req.user.role);
    
    // 4. Deny by default
    if (!isAuthorized) {
      return next(new ApiError(HTTP_STATUS.FORBIDDEN, 'Access denied.'));
    }

    // 5. Success
    next();
  };
};
