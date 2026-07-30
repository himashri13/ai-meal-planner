import logger from '../utils/logger.js';

class EmailService {
  /**
   * Placeholder implementation for sending a password reset email.
   * Logs the reset link to the console for development.
   */
  async sendPasswordResetEmail(email, rawToken) {
    const resetUrl = `https://your-domain.com/reset-password?token=${rawToken}`;
    
    // In production, integrate with SendGrid, Resend, SES, or Nodemailer here.
    logger.info(`[EmailService] Password reset requested for: ${email}`);
    logger.info(`[EmailService] Reset Link: ${resetUrl}`);
    
    return true;
  }
}

export default new EmailService();
