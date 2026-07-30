import authRepository from '../repositories/auth.repository.js';
import ApiError from '../utils/ApiError.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import emailService from './email.service.js';
import crypto from 'crypto';
import { HTTP_STATUS } from '../constants/index.js';

class AuthService {
  async register(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ApiError(HTTP_STATUS.CONFLICT, 'User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user and default profile/settings via transaction
    const newUser = await authRepository.createUserWithDefaults({
      name,
      email,
      password: hashedPassword
    });

    // Strip password from the response
    const { password: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async login(credentials) {
    throw new ApiError(HTTP_STATUS.NOT_IMPLEMENTED, 'Login not implemented');
  }

  async logout(userId, token) {
    const existingToken = await authRepository.findRefreshToken(token);

    if (!existingToken) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid refresh token');
    }

    if (existingToken.userId !== userId) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid refresh token');
    }

    if (existingToken.isRevoked) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Refresh token already revoked');
    }

    if (existingToken.expiresAt < new Date()) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Refresh token has expired');
    }

    await authRepository.revokeRefreshToken(token);

    return null;
  }

  async refreshToken(token) {
    let decoded;
    try {
      // Verify JWT signature of the refresh token
      decoded = verifyRefreshToken(token);
    } catch (error) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired refresh token');
    }

    // Lookup token in the database
    const existingToken = await authRepository.findRefreshToken(token);
    
    if (!existingToken) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid refresh token');
    }

    if (existingToken.isRevoked) {
      // Security measure: Token reuse detected. In a full implementation, you would revoke all tokens for this user.
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid refresh token');
    }

    if (existingToken.expiresAt < new Date()) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Refresh token has expired');
    }

    const { user } = existingToken;

    // Generate brand new tokens
    const accessTokenPayload = { id: user.id, role: user.role };
    const newAccessToken = generateAccessToken(accessTokenPayload);
    
    const newRefreshTokenString = generateRefreshToken({ id: user.id });
    
    // Parse the expiry from the new JWT (alternatively calculate manually matching config)
    // A simplified robust approach is adding e.g., 7 days explicitly for the DB record
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Atomically revoke the old and store the new
    await authRepository.rotateRefreshToken(token, {
      token: newRefreshTokenString,
      userId: user.id,
      expiresAt
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenString
    };
  }

  async forgotPassword(email) {
    // 1. Fetch user by email
    const user = await authRepository.findUserByEmail(email);

    // 2. If user exists, process reset logic
    if (user) {
      // 3. Generate secure random token
      const rawToken = crypto.randomBytes(32).toString('hex');
      
      // 4. Hash the token
      const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
      
      // 5. Calculate expiry (15 minutes from now)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);

      // 6. Invalidate previous tokens
      await authRepository.invalidateResetTokens(user.id);

      // 7. Store the hashed token
      await authRepository.createPasswordResetToken(tokenHash, user.id, expiresAt);

      // 8. Send the email containing the raw token
      await emailService.sendPasswordResetEmail(email, rawToken);
    }

    // 9. Always return success to prevent user enumeration
    return null;
  }

  async resetPassword(token, newPassword) {
    // 1. Hash the incoming raw token
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // 2. Lookup the hashed token
    const resetTokenRecord = await authRepository.findPasswordResetTokenByHash(tokenHash);

    // 3. Prevent exposing reasons for failure; generic error
    if (!resetTokenRecord) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired password reset token');
    }

    // 4. Verify expiry
    if (resetTokenRecord.expiresAt < new Date()) {
      // Clean up expired token
      await authRepository.invalidateResetTokens(resetTokenRecord.userId);
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired password reset token');
    }

    const user = resetTokenRecord.user;
    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired password reset token');
    }

    // 5. Ensure password isn't reused (compare against current hash)
    const isSamePassword = await comparePassword(newPassword, user.password);
    if (isSamePassword) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'New password cannot be the same as the current password');
    }

    // 6. Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // 7. Execute transaction
    await authRepository.executePasswordReset(user.id, newPasswordHash, resetTokenRecord.id);

    return null;
  }

  async changePassword(userId, currentPassword, newPassword) {
    // 1. Fetch user to verify current password
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'User not found');
    }

    // 2. Compare current password hash
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Incorrect current password');
    }

    // 3. Ensure the new password is not the same as the old password
    const isSamePassword = await comparePassword(newPassword, user.password);
    if (isSamePassword) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'New password cannot be the same as the current password');
    }

    // 4. Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // 5. Run transaction to update password and revoke all tokens
    await authRepository.changePassword(userId, newPasswordHash);

    return null;
  }

  async getMe(userId) {
    const user = await authRepository.findSanitizedUserById(userId);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    if (!user.isActive) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'User account is disabled');
    }

    return user;
  }
}

export default new AuthService();
