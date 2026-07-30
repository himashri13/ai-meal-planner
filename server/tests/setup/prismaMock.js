import { jest } from '@jest/globals';
import { mockDeep, mockReset } from 'jest-mock-extended';

// Create a deep mock of PrismaClient
export const prismaMock = mockDeep();

// Mock the database configuration
jest.unstable_mockModule('../../src/config/database.js', () => {
  return {
    default: prismaMock,
  };
});
