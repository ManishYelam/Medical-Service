const jwt = require('jsonwebtoken');
const { appLogger } = require('../Config/Setting/logger.config');
const { JWT_CONFIG } = require('./constants');
const redis = require('redis');
const util = require('util');

const redisClient = redis.createClient(JWT_CONFIG.REDIS_URL);
redisClient.get = util.promisify(redisClient.get);
redisClient.set = util.promisify(redisClient.set);

module.exports = {
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

  blacklistToken: async (token, ttl = JWT_CONFIG.EXPIRATION) => {
    try {
      await redisClient.set(token, 'blacklisted', 'EX', ttl);
      appLogger.info('JWT token blacklisted', { token });
    } catch (error) {
      appLogger.error('Error blacklisting JWT token', { error });
      throw new Error('Token blacklisting failed');
    }
  },
  
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











const generateToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role.name,
        permissions: user.role.permissions.map(p => p.name),
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;
