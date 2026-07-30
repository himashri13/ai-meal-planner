import config from '../config/env.js';

const getTimestamp = () => new Date().toISOString();

/**
 * Custom application logger.
 */
const logger = {
  info: (message) => {
    console.log(`\x1b[36m[INFO]\x1b[0m ${getTimestamp()} - ${message}`);
  },
  warn: (message) => {
    console.warn(`\x1b[33m[WARN]\x1b[0m ${getTimestamp()} - ${message}`);
  },
  error: (message, error) => {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${getTimestamp()} - ${message}`);
    if (error && error.stack) {
      console.error(error.stack);
    }
  },
  debug: (message) => {
    if (config.env === 'development') {
      console.debug(`\x1b[34m[DEBUG]\x1b[0m ${getTimestamp()} - ${message}`);
    }
  }
};

export default logger;
