import { jest } from '@jest/globals';
import { HTTP_STATUS } from '../../../../src/constants/index.js';
import ApiError from '../../../../src/utils/ApiError.js';

// Mock dependencies BEFORE importing the service
jest.unstable_mockModule('../../../../src/repositories/auth.repository.js', () => {
  return {
    default: {
      findUserByEmail: jest.fn(),
      findUserById: jest.fn(),
      createUserWithDefaults: jest.fn(),
      createRefreshToken: jest.fn(),
      findRefreshToken: jest.fn(),
      revokeRefreshToken: jest.fn(),
      revokeAllUserRefreshTokens: jest.fn(),
      findSanitizedUserById: jest.fn(),
    }
  };
});

// Since we are mocking ES modules, we need to dynamically import the module under test
const authServiceModule = await import('../../../../src/services/auth.service.js');
const authService = authServiceModule.default;
const authRepositoryModule = await import('../../../../src/repositories/auth.repository.js');
const authRepository = authRepositoryModule.default;

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const mockUserData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!'
    };

    it('should throw an error if user already exists', async () => {
      authRepository.findUserByEmail.mockResolvedValueOnce({ id: '123' });

      await expect(authService.register(mockUserData))
        .rejects.toThrow(new ApiError(HTTP_STATUS.CONFLICT, 'User with this email already exists'));
    });

    it('should successfully register a new user', async () => {
      authRepository.findUserByEmail.mockResolvedValueOnce(null);
      authRepository.createUserWithDefaults.mockResolvedValueOnce({
        id: '123',
        email: mockUserData.email,
        name: mockUserData.name,
        role: 'USER'
      });

      const result = await authService.register(mockUserData);
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('tokens');
      expect(result.tokens).toHaveProperty('accessToken');
      expect(result.tokens).toHaveProperty('refreshToken');
    });
  });
});
