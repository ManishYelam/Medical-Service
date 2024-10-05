const { User } = require('../models/Roles/index.role');
const {
  generateToken,
  verifyToken,
  blacklistToken,
  refreshToken,
} = require('../../utils/jwtSecret');
const { hashPassword, comparePassword } = require('../helpers/hashPassword');
const { appLogger } = require('../../config/setting/logger.config');

module.exports = {
  register: async (
    user_name,
    role,
    user_email,
    user_password,
    user_contact
  ) => {
    try {
      const hashedPassword = await hashPassword(user_password);
      const user = await User.create({
        user_name,
        role,
        user_email,
        user_password: hashedPassword,
        user_contact,
      });
      appLogger.info('User registered', {
        user_name,
        role,
        userId: user.user_id,
      });
      return user;
    } catch (error) {
      appLogger.error('Error registering user', { error });
      throw new Error(error.message || 'User registration failed');
    }
  },

  login: async (user_email, user_password) => {
    try {
      const user = await User.findOne({ where: { user_email } });
      if (!user) throw new Error('User not found');

      const isPasswordValid = await comparePassword(
        user_password,
        user.user_password
      );
      if (!isPasswordValid) throw new Error('Invalid password');

      const token = generateToken({ userId: user.user_id, role: user.role });
      appLogger.info(`User ${user.user_name} logged in`, {
        userId: user.user_id,
      });
      return { token, role: user.role };
    } catch (error) {
      appLogger.error('Error during login', { error });
      throw new Error(error.message || 'Login failed');
    }
  },

  logout: async (token) => {
    try {
      await blacklistToken(token);
      appLogger.info('User logged out', { token });
    } catch (error) {
      appLogger.error('Error during logout', { error });
      throw new Error('Logout failed');
    }
  },

  forgotPassword: async (user_email) => {
    try {
      const user = await User.findOne({ where: { user_email } });
      if (!user) throw new Error('User not found');

      const resetToken = generateToken(
        { userId: user.user_id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      appLogger.info(
        `Password reset token generated for user ${user.user_name}`,
        { resetToken }
      );
      return resetToken;
    } catch (error) {
      appLogger.error('Error generating password reset token', { error });
      throw new Error(error.message || 'Password reset request failed');
    }
  },

  resetPassword: async (resetToken, newPassword) => {
    try {
      const decoded = await verifyToken(resetToken);
      const user = await User.findByPk(decoded.userId);
      if (!user) throw new Error('User not found');

      user.user_password = await hashPassword(newPassword);
      await user.save();
      appLogger.info(`Password reset for user ${user.user_name}`);
    } catch (error) {
      appLogger.error('Error resetting password', { error });
      throw new Error(error.message || 'Password reset failed');
    }
  },

  refreshToken: async (oldToken) => {
    try {
      const newToken = await refreshToken(oldToken);
      appLogger.info("User's token refreshed successfully");
      return newToken;
    } catch (error) {
      appLogger.error('Error refreshing user token', { error });
      throw new Error('Token refresh failed');
    }
  },
};
