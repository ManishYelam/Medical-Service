const { Sequelize } = require('sequelize');
const config = require('./config/config'); // Assuming your config file is in the config folder

const environment = process.env.NODE_ENV || 'development';
const configEnv = config[environment];

// Initialize Sequelize for the current environment
const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  {
    host: configEnv.host,
    dialect: configEnv.dialect || 'mysql',  // Add other dialects like 'postgres', 'sqlite' as needed
    logging: configEnv.logging, // Enable query logging
    define: {
      timestamps: false // Disable automatic timestamp columns if not needed
    }
  }
);

// Export sequelize instance for usage in models and migrations
module.exports = sequelize;
