import app from './app.js';
import config from './config/env.js';
import logger from './utils/logger.js';

// Handle uncaught exceptions gracefully
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err);
  process.exit(1);
});

// Start Server
const server = app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port} in ${config.env} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown on SIGTERM (e.g. from Docker/Heroku)
process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully...');
  server.close(() => {
    logger.info('💥 Process terminated.');
  });
});
