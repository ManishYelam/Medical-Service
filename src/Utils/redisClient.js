// redisClient.js
const redis = require('redis');
const util = require('util');
const { JWT_CONFIG } = require('./constants');

// Create Redis client
const redisClient = redis.createClient({
  url: JWT_CONFIG.REDIS_URL
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Promisify Redis methods for ease of use with async/await
redisClient.get = util.promisify(redisClient.get).bind(redisClient);
redisClient.set = util.promisify(redisClient.set).bind(redisClient);
redisClient.del = util.promisify(redisClient.del).bind(redisClient);

module.exports = {
  redisClient
};
