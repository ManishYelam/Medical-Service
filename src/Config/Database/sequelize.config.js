const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const DB_HOST = isProduction ? process.env.P_DB_HOST : process.env.L_DB_HOST;
const DB_USER = isProduction ? process.env.P_DB_USER : process.env.L_DB_USER;
const DB_PASSWORD = isProduction ? process.env.P_DB_PASSWORD : process.env.L_DB_PASSWORD;
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
const DB_PORT = process.env.DB_PORT || 3306;

const { databases } = require('../Database/Data')

const DATABASES = databases.reduce((acc, key) => {
  acc[`${key}_DB_NAME`] = process.env[`${key}_DB_NAME`];
  return acc;
}, {});

const initDatabases = () => {
  const sequelizeInstances = {};
  for (const [key, dbName] of Object.entries(DATABASES)) {
    sequelizeInstances[key] = new Sequelize(dbName, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      dialect: DB_DIALECT,
      port: DB_PORT,
      logging: (msg) => console.log(msg),
      pool: {
        max: 15,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
    });
  }
  return sequelizeInstances;
};

const sequelize = initDatabases();

module.exports = sequelize; 

// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const isProduction = process.env.NODE_ENV === 'production';

// const DB_HOST = isProduction ? process.env.P_DB_HOST : process.env.L_DB_HOST;
// const DB_USER = isProduction ? process.env.P_DB_USER : process.env.L_DB_USER;
// const DB_PASSWORD = isProduction ? process.env.P_DB_PASSWORD : process.env.L_DB_PASSWORD;
// const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
// const DB_PORT = process.env.DB_PORT || 3306;

// const DATABASES = {
//   MAIN_DB_NAME: process.env.MAIN_DB_NAME,
//   COMPLIANCE_LEGAL_DB_NAME: process.env.COMPLIANCE_LEGAL_DB_NAME,
//   DATA_ANALYTIC_DB_NAME: process.env.DATA_ANALYTIC_DB_NAME,
//   FINANCE_ACCOUNTING_DB_NAME: process.env.FINANCE_ACCOUNTING_DB_NAME,
//   HEALTHCARE_DB_NAME: process.env.HEALTHCARE_DB_NAME,
//   HR_DB_NAME: process.env.HR_DB_NAME,
//   INVENTORY_MANAGEMENT_DB_NAME: process.env.INVENTORY_MANAGEMENT_DB_NAME,
//   IT_DEVELOPMENT_DB_NAME: process.env.IT_DEVELOPMENT_DB_NAME,
//   LOGISTIC_DB_NAME: process.env.LOGISTIC_DB_NAME,
//   PARTNERSHIP_DB_NAME: process.env.PARTNERSHIP_DB_NAME,
//   PHARMACY_DB_NAME: process.env.PHARMACY_DB_NAME,
//   SALES_MARKETING_DB_NAME: process.env.SALES_MARKETING_DB_NAME,
// };

// const initDatabases = () => {
//   const sequelizeInstances = {};
//   for (const [key, dbName] of Object.entries(DATABASES)) {
//     sequelizeInstances[key] = new Sequelize(dbName, DB_USER, DB_PASSWORD, {
//       host: DB_HOST,
//       dialect: DB_DIALECT,
//       port: DB_PORT,
//       logging: (msg) => console.log(msg),
//       pool: {
//         max: 15,
//         min: 0,
//         acquire: 60000,
//         idle: 10000,
//       },
//     });
//   }
//   return sequelizeInstances;
// };

// const sequelize = initDatabases();

// module.exports = sequelize; 