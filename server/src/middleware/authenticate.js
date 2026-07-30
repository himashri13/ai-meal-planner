import { verifyAccessToken } from '../utils/jwt.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

/**
 * Middleware to verify JWT token and protect routes
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED));
  }

  try {
    const decoded = verifyAccessToken(token);
    
    // Placeholder: Fetch user from DB and attach to req
    // req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
    
    req.user = { id: decoded.id }; // Temporary mock
    next();
  } catch (error) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED));
  }
});
