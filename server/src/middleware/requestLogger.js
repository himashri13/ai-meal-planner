import logger from '../utils/logger.js';

/**
 * Middleware to log incoming requests
 */
const requestLogger = (req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
};

export default requestLogger;
