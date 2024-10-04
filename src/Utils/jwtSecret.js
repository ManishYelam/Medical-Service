const jwt = require('jsonwebtoken');
const { appLogger } = require('../Config/Setting/logger.config');
const { JWT_CONFIG } = require('./constants');
const redis = require('redis');
const util = require('util');

const redisClient = redis.createClient(JWT_CONFIG.REDIS_URL);
redisClient.get = util.promisify(redisClient.get);
redisClient.set = util.promisify(redisClient.set);

module.exports = {
  /**
   * Generates a JWT token.
   * @param {Object} payload - The data to include in the JWT.
   * @param {string} [secret=JWT_CONFIG.SECRET] - Optional secret for signing the token.
   * @param {Object} [options] - Additional JWT options (like expiration).
   * @returns {string} Signed JWT token.
   */
  generateToken: (payload, secret = JWT_CONFIG.SECRET, options = { expiresIn: JWT_CONFIG.EXPIRATION  , algorithm: 'HS256' }) => {
    try {
      const token = jwt.sign(payload, secret, {...options,});
      appLogger.info(`JWT generated`, {
        userId: payload.userId || 'unknown',
        token,
      });
      return token;
    } catch (error) {
      appLogger.error('Error generating JWT token', { error });
      throw new Error('Token generation failed');
    }
  },

  /**
   * Verifies a JWT token.
   * @param {string} token - The JWT token to verify.
   * @param {string} [secret=JWT_CONFIG.SECRET] - Optional secret for verification.
   * @returns {Object} Decoded token payload.
   */
  verifyToken: async (token, secret = JWT_CONFIG.SECRET) => {
    try {
      const isBlacklisted = await redisClient.get(token);
      if (isBlacklisted) {
        throw new Error('Token is blacklisted');
      }

      const decoded = jwt.verify(token, secret);
      appLogger.info(`JWT verified`, { userId: decoded.userId || 'unknown' });
      return decoded;
    } catch (error) {
      appLogger.error('Error verifying JWT token', { error });
      throw new Error('Token verification failed');
    }
  },

  /**
   * Decodes a JWT token without verification.
   * @param {string} token - The JWT token to decode.
   * @returns {Object} Decoded token payload.
   */
  decodeToken: (token) => {
    try {
      const decoded = jwt.decode(token);
      appLogger.info('JWT decoded without verification', { decoded });
      return decoded;
    } catch (error) {
      appLogger.error('Error decoding JWT token', { error });
      throw new Error('Token decoding failed');
    }
  },

  /**
   * Refreshes a JWT token.
   * @param {string} token - The expired or expiring JWT token.
   * @param {string} [secret=JWT_CONFIG.SECRET] - Optional secret for signing the refreshed token.
   * @returns {string} New JWT token.
   */
  refreshToken: async (token, secret = JWT_CONFIG.SECRET) => {
    try {
      const decoded = jwt.verify(token, secret, { ignoreExpiration: true });
      const newToken = generateToken({ userId: decoded.userId }, secret);
      await blacklistToken(token);
      appLogger.info(`JWT refreshed`, { userId: decoded.userId || 'unknown' });
      return newToken;
    } catch (error) {
      appLogger.error('Error refreshing JWT token', { error });
      throw new Error('Token refresh failed');
    }
  },

  /**
   * Blacklists a JWT token.
   * @param {string} token - The JWT token to blacklist.
   * @param {number} [ttl=JWT_CONFIG.EXPIRATION] - Time to live in seconds.
   */
  blacklistToken: async (token, ttl = JWT_CONFIG.EXPIRATION) => {
    try {
      await redisClient.set(token, 'blacklisted', 'EX', ttl);
      appLogger.info('JWT token blacklisted', { token });
    } catch (error) {
      appLogger.error('Error blacklisting JWT token', { error });
      throw new Error('Token blacklisting failed');
    }
  },

  /**
   * Checks if a JWT token is expired.
   * @param {string} token - The JWT token to check.
   * @returns {boolean} True if the token is expired, false otherwise.
   */
  isTokenExpired: (token) => {
    try {
      const decoded = jwt.decode(token);
      if (!decoded || !decoded.exp) {
        throw new Error('Invalid token format');
      }
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      appLogger.error('Error checking token expiration', { error });
      return true;
    }
  },
};
