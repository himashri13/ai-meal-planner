import {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '../../../src/utils/jwt.js';
import config from '../../../src/config/env.js';
import jwt from 'jsonwebtoken';

describe('JWT Utilities', () => {
  const mockPayload = { id: 'user-123', role: 'USER' };

  it('should generate a valid access token', () => {
    const token = generateAccessToken(mockPayload);
    expect(typeof token).toBe('string');
    const decoded = jwt.verify(token, config.jwt.secret);
    expect(decoded.id).toBe(mockPayload.id);
    expect(decoded.role).toBe(mockPayload.role);
  });

  it('should verify a valid access token', () => {
    const token = jwt.sign(mockPayload, config.jwt.secret, { expiresIn: '15m' });
    const decoded = verifyAccessToken(token);
    expect(decoded.id).toBe(mockPayload.id);
  });

  it('should fail to verify an invalid access token', () => {
    expect(() => verifyAccessToken('invalid-token')).toThrow();
  });

  it('should generate a valid refresh token', () => {
    const token = generateRefreshToken(mockPayload);
    expect(typeof token).toBe('string');
    const decoded = verifyRefreshToken(token);
    expect(decoded.id).toBe(mockPayload.id);
  });
});
