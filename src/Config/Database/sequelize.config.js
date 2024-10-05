const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  isProduction ? process.env.P_DB_NAME : process.env.L_DB_NAME, 
  isProduction ? process.env.P_DB_USER : process.env.L_DB_USER, 
  isProduction ? process.env.P_DB_PASSWORD : process.env.L_DB_PASSWORD, 
  {
    host: isProduction ? process.env.P_DB_HOST : process.env.L_DB_HOST,
    dialect: process.env.P_DB_DIALECT,
    port: isProduction ? process.env.P_DB_PORT : process.env.L_DB_PORT,
    logging: (msg) => console.log(msg),        
    pool: {
      max: 10,                     // Max connections in pool
      min: 0,                      // Min connections in pool
      acquire: 60000,              // Max time in ms to acquire a connection
      idle: 10000,                 // Time in ms to release idle connections
    }, 
  }
);

module.exports = sequelize;
