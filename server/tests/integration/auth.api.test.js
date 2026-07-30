import { jest } from '@jest/globals';
import request from 'supertest';

// Mock Prisma client to bypass driver errors during CI/integration if DB is missing
jest.unstable_mockModule('../../src/config/database.js', () => {
  return {
    default: {
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      // In a real environment, integration tests hit the real DB.
      // We mock it minimally here just to allow the tests to compile and route correctly.
    },
  };
});

const appModule = await import('../../src/app.js');
const app = appModule.default;

describe('Auth API Integration Tests', () => {
  describe('POST /api/auth/register', () => {
    it('should fail with missing fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({});
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Validation Error');
    });

    it('should fail with weak password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test',
          email: 'test@example.com',
          password: 'weak'
        });
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should fail if email is not provided', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'Password123!' });
      
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/auth/me', () => {
    it('should reject requests without a token', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401); // Unauthorized
    });
  });
});
