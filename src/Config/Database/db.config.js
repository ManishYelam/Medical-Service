const util = require('util');
const moment = require('moment');
const config = require('./mysql.config');
const sequelize = require('./sequelize.config');
const mysql = require('mysql2/promise');
const client = require('./redis.config');

// Create MySQL connection pool
const pool = mysql.createPool(config);

const TestMySQLConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`Connected to MySQL database successfully at Host: ${config.host}, Port: ${config.port}, Database: ${config.database}.`);
    connection.release();
  } catch (error) {
    console.error(`Error connecting to MySQL database: ${error.message}`, { stack: error.stack });
  }
};

const TestSequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Sequelize connection established successfully at Host: ${config.host}, Port: ${config.port}, Database: ${config.database}.`);
  } catch (error) {
    console.error(`Unable to connect to Sequelize database: ${error.message}`, { stack: error.stack });
    console.log(`Unable to connect to Sequelize database: ${error.message}`, { stack: error.stack });
    
  }
};

// Promisify Redis methods for better async/await support
['get', 'set', 'del', 'exists', 'quit'].forEach(method => {
  client[method] = util.promisify(client[method]).bind(client);
});

// Handle Redis connection errors
client.on('error', (err) => {
  console.error('Redis connection error:', { error: err.message, stack: err.stack });
});

// Handle Redis connection end
client.on('end', () => {
  console.log('Redis connection closed.');
});

// Connect to Redis
const ConnectRedis = async () => {
  try {
    await client.connect();
    console.log(`Redis connected on port 13742 at ${moment().format('llll')}.`);
  } catch (error) {
    console.error('Failed to connect to Redis:', { error: error.message, stack: error.stack });
  }
};

// Graceful shutdown on process exit
process.on('exit', async () => {
  try {
    await client.quit();
    console.log('Redis connection closed on process exit.');
  } catch (error) {
    console.error('Error closing Redis connection on process exit:', { error: error.message, stack: error.stack });
  }
});

module.exports = {
  pool,
  sequelize,
  TestMySQLConnection,
  TestSequelizeConnection,
  ConnectRedis
};
