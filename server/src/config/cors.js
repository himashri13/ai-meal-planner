import config from './env.js';
import ApiError from '../utils/ApiError.js';

/**
 * CORS Configuration
 */
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [config.clientUrl];
    
    // Allow requests with no origin (like mobile apps or curl requests) in development
    if (!origin && config.env === 'development') {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1 || config.env === 'development') {
      callback(null, true);
    } else {
      callback(new ApiError(403, 'Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

export default corsOptions;
