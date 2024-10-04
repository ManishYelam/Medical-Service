const util = require('util');
const moment = require('moment');
const config = require('./mysql.config');
const sequelize = require('./sequelize.config');
const mysql = require('mysql2/promise');
const { appLogger, errorLogger } = require('../Setting/logger.config');
const client = require('./redis.config');

// Create MySQL connection pool
const pool = mysql.createPool(config);

const TestMySQLConnection = async () => {
  try {
    const connection = await pool.getConnection();
    appLogger.info(`Connected to MySQL database successfully at Host: ${config.host}, Port: ${config.port}, Database: ${config.database}.`);
    connection.release();
  } catch (error) {
    errorLogger.error(`Error connecting to MySQL database: ${error.message}`, { stack: error.stack });
  }
};

const TestSequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    appLogger.info(`Sequelize connection established successfully at Host: ${config.host}, Port: ${config.port}, Database: ${config.database}.`);
    console.log(`Sequelize connection established successfully at Host: ${config.host}, Port: ${config.port}, Database: ${config.database}.`);
  } catch (error) {
    errorLogger.error(`Unable to connect to Sequelize database: ${error.message}`, { stack: error.stack });
    console.log(`Unable to connect to Sequelize database: ${error.message}`, { stack: error.stack });
    
  }
};

// Promisify Redis methods for better async/await support
['get', 'set', 'del', 'exists', 'quit'].forEach(method => {
  client[method] = util.promisify(client[method]).bind(client);
});

// Handle Redis connection errors
client.on('error', (err) => {
  errorLogger.error('Redis connection error:', { error: err.message, stack: err.stack });
});

// Handle Redis connection end
client.on('end', () => {
  appLogger.info('Redis connection closed.');
});

// Connect to Redis
const ConnectRedis = async () => {
  try {
    await client.connect();
    appLogger.info(`Redis connected on port 13742 at ${moment().format('llll')}.`);
  } catch (error) {
    errorLogger.error('Failed to connect to Redis:', { error: error.message, stack: error.stack });
  }
};

// Graceful shutdown on process exit
process.on('exit', async () => {
  try {
    await client.quit();
    appLogger.info('Redis connection closed on process exit.');
  } catch (error) {
    errorLogger.error('Error closing Redis connection on process exit:', { error: error.message, stack: error.stack });
  }
});

// Graceful shutdown on SIGINT (Ctrl+C)
process.on('SIGINT', async () => {
  try {
    await client.quit();
    console.log('Redis client disconnected due to app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing Redis connection on SIGINT:', error);
    process.exit(1);
  }
});

module.exports = {
  pool,
  sequelize,
  TestMySQLConnection,
  TestSequelizeConnection,
  ConnectRedis
};
