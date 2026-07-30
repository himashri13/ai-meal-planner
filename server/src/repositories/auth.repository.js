import prisma from '../config/database.js';

class AuthRepository {
  /**
   * Find a user by their email address
   */
  async findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  /**
   * Find a user by their ID
   */
  async findUserById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  /**
   * Creates a user, user profile, and user settings within a transaction.
   */
  async createUserWithDefaults(userData) {
    return prisma.$transaction(async (tx) => {
      // Create the user
      const user = await tx.user.create({
        data: {
          email: userData.email,
          username: userData.name, // using name as username for now or we can store name in profile
          password: userData.password,
          role: 'USER',
        }
      });

      // Create an empty profile for the user
      await tx.userProfile.create({
        data: {
          userId: user.id,
          firstName: userData.name.split(' ')[0],
          lastName: userData.name.split(' ').slice(1).join(' ') || null,
        }
      });

      // Create default settings for the user
      await tx.userSettings.create({
        data: {
          userId: user.id,
        }
      });

      return user;
    });
  }

  /**
   * Placeholder for updating a user
   */
  async updateUser(id, updateData) {
    return prisma.user.update({ where: { id }, data: updateData });
  }

  /**
   * Find a refresh token by the token string
   */
  async findRefreshToken(token) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true }
    });
  }

  /**
   * Atomically revoke an old refresh token and create a new one
   */
  async rotateRefreshToken(oldToken, newTokenData) {
    return prisma.$transaction(async (tx) => {
      // Revoke the old token
      await tx.refreshToken.update({
        where: { token: oldToken },
        data: { isRevoked: true }
      });

      // Create the new token
      return tx.refreshToken.create({
        data: newTokenData
      });
    });
  }

  /**
   * Revoke a refresh token by marking it as revoked
   */
  async revokeRefreshToken(token) {
    return prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true }
    });
  }

  /**
   * Update a user's password and revoke all active refresh tokens in a transaction
   */
  async changePassword(userId, newPasswordHash) {
    return prisma.$transaction(async (tx) => {
      // 1. Revoke all active refresh tokens for the user
      await tx.refreshToken.updateMany({
        where: { userId, isRevoked: false },
        data: { isRevoked: true }
      });

      // 2. Update the user's password
      // Note: If a passwordChangedAt field is added later, update it here.
      return tx.user.update({
        where: { id: userId },
        data: { password: newPasswordHash }
      });
    });
  }

  /**
   * Invalidates all active password reset tokens for a given user
   */
  async invalidateResetTokens(userId) {
    return prisma.passwordResetToken.deleteMany({
      where: { userId }
    });
  }

  /**
   * Creates a new password reset token
   */
  async createPasswordResetToken(tokenHash, userId, expiresAt) {
    return prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt
      }
    });
  }

  /**
   * Find a password reset token by its hash
   */
  async findPasswordResetTokenByHash(tokenHash) {
    return prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true }
    });
  }

  /**
   * Execute password reset transaction: update password, delete token, revoke refresh tokens
   */
  async executePasswordReset(userId, newPasswordHash, tokenId) {
    return prisma.$transaction(async (tx) => {
      // 1. Update user's password
      await tx.user.update({
        where: { id: userId },
        data: { password: newPasswordHash }
      });

      // 2. Delete the used reset token (so it cannot be reused)
      await tx.passwordResetToken.delete({
        where: { id: tokenId }
      });

      // 3. Revoke all active refresh tokens to terminate existing sessions
      await tx.refreshToken.updateMany({
        where: { userId, isRevoked: false },
        data: { isRevoked: true }
      });
    });
  }
  /**
   * Find a sanitized user profile (excluding sensitive fields)
   */
  async findSanitizedUserById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
        settings: true
      }
    });
  }
}

export default new AuthRepository();
