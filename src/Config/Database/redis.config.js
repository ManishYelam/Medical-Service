const redis = require('redis');

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'redis-13742.c274.us-east-1-3.ec2.redns.redis-cloud.com'}:${process.env.REDIS_PORT || 13742}`,
  legacyMode: true,
});

module.exports = client;
