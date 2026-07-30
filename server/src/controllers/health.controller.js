import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import config from '../config/env.js';

/**
 * @desc    Check server health
 * @route   GET /api/health
 * @access  Public
 */
export const checkHealth = asyncHandler(async (req, res) => {
  const data = {
    environment: config.env,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };

  res.status(200).json({
    success: true,
    message: 'Server running successfully',
    ...data
  });
});
