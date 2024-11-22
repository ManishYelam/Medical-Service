// Load environment variables from .env file
require('dotenv').config();

module.exports = {
  MAIN: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql', // Specify dialect here (e.g., mysql)
    logging: console.log, // Optional: log queries
  },
  COMPLIANCE_LEGAL: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.COMPLIANCE_LEGAL_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  CUSTOMER_SUPPORT: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.CUSTOMER_SUPPORT_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  DATA_ANALYTIC: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.DATA_ANALYTIC_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  FINANCE_ACCOUNTING: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.FINANCE_ACCOUNTING_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  HEALTHCARE: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.HEALTHCARE_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  HR: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.HR_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  INVENTORY_MANAGEMENT: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.INVENTORY_MANAGEMENT_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  IT_DEVELOPMENT: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.IT_DEVELOPMENT_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  LOGISTIC: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.LOGISTIC_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  PARTNERSHIP: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.PARTNERSHIP_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  PHARMACY: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.PHARMACY_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
  SALES_MARKETING: {
    username: process.env.L_DB_USER,
    password: process.env.L_DB_PASSWORD,
    database: process.env.SALES_MARKETING_DB_NAME,
    host: process.env.L_DB_HOST,  
    dialect: 'mysql',
    logging: console.log,
  },
};