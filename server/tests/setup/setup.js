import { jest } from '@jest/globals';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

// Global setup
beforeAll(() => {
  // Set consistent timezone for tests
  process.env.TZ = 'UTC';
});

afterEach(() => {
  jest.clearAllMocks();
});
