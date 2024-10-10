const util = require('util');
const moment = require('moment');
const config = require('./mysql.config');
const sequelize = require('./sequelize.config');
const client = require('./redis.config');
const connectionPools = require('./mysql.config');

const pool = connectionPools;

const TestMySQLConnection = async () => {
  try {
    for (const [dbName, pool] of Object.entries(connectionPools)) {
      const connection = await pool.getConnection(); 
      console.log(`Connected to MySQL database (${dbName}) successfully.`);
      connection.release(); 
    }
  } catch (error) {
    console.error(`Error connecting to MySQL database: ${error.message}`, { stack: error.stack });
  }
};

const TestSequelizeConnection = async () => {
  try {
    for (const key in sequelize) {
      await sequelize[key].authenticate();
      console.log(`Sequelize connection established successfully for database: ${key}`);
    }
  } catch (error) {
    console.error(`Unable to connect to Sequelize database: ${error.message}`, { stack: error.stack });
  }
};

['get', 'set', 'del', 'exists', 'quit'].forEach(method => {
  client[method] = util.promisify(client[method]).bind(client);
});

client.on('error', (err) => {
  console.error('Redis connection error:', { error: err.message, stack: err.stack });
});

client.on('end', () => {
  console.log('Redis connection closed.');
});

const ConnectRedis = async () => {
  try {
    await client.connect();
    console.log(`Redis connected on port 13742 at ${moment().format('llll')}.`);
  } catch (error) {
    console.error('Failed to connect to Redis:', { error: error.message, stack: error.stack });
  }
};

process.on('exit', async () => {
  try {
    await client.quit();
    console.log('Redis connection closed on process exit.');
  } catch (error) {
    console.error('Error closing Redis connection on process exit:', { error: error.message, stack: error.stack });
  }
});

module.exports = { pool, sequelize, TestMySQLConnection, TestSequelizeConnection, ConnectRedis };
