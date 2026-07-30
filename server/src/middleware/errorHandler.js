import config from '../config/env.js';
import logger from '../utils/logger.js';

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  
  if (!statusCode) statusCode = 500;
  if (!message) message = 'Internal Server Error';

  // Log the error
  if (config.env === 'development') {
    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, err);
  } else if (statusCode === 500) {
    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }

  // Format response
  const response = {
    success: false,
    message,
    ...(config.env === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(response);
};

export default errorHandler;
