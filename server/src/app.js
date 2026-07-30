import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import config from './config/env.js';
import corsOptions from './config/cors.js';
import routes from './routes/index.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import requestLogger from './middleware/requestLogger.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors(corsOptions));

// Request Logging
app.use(requestLogger);

// Morgan Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Body Parsers & Cookie Parser
app.use(express.json({ limit: '10kb' })); // Mitigate Denial of Service
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(compression());

// Future: Rate Limiting & Request Sanitization middlewares can be injected here

// API Routes
app.use('/api', routes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
