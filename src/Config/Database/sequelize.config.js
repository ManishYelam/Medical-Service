const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const DB_HOST = isProduction ? process.env.P_DB_HOST : process.env.L_DB_HOST;
const DB_USER = isProduction ? process.env.P_DB_USER : process.env.L_DB_USER;
const DB_PASSWORD = isProduction ? process.env.P_DB_PASSWORD : process.env.L_DB_PASSWORD;
const DB_DIALECT = process.env.DB_DIALECT;
const DB_PORT = process.env.DB_PORT;
const MAIN_DB_NAME = process.env.MAIN_DB_NAME;

const DATABASES = {
  MAIN_DB_NAME: process.env.MAIN_DB_NAME || 'medical_service',
  COMPLIANCE_LEGAL_DB_NAME: process.env.COMPLIANCE_LEGAL_DB_NAME || 'compliance_legal',
  CUSTOMER_SUPPORT_DB_NAME: process.env.CUSTOMER_SUPPORT_DB_NAME || 'customer_support',
  DATA_ANALYTIC_DB_NAME: process.env.DATA_ANALYTIC_DB_NAME || 'data_analytic',
  FINANCE_ACCOUNTING_DB_NAME: process.env.FINANCE_ACCOUNTING_DB_NAME || 'finance_accounting',
  HEALTHCARE_DB_NAME: process.env.HEALTHCARE_DB_NAME || 'healthcare',
  HR_DB_NAME: process.env.HR_DB_NAME || 'hr',
  INVENTORY_MANAGEMENT_DB_NAME: process.env.INVENTORY_MANAGEMENT_DB_NAME || 'inventory_management',
  IT_DEVELOPMENT_DB_NAME: process.env.IT_DEVELOPMENT_DB_NAME || 'it_development',
  LOGISTIC_DB_NAME: process.env.LOGISTIC_DB_NAME || 'logistic',
  PARTNERSHIP_DB_NAME: process.env.PARTNERSHIP_DB_NAME || 'partnership',
  PHARMACY_DB_NAME: process.env.PHARMACY_DB_NAME || 'pharmacy',
  SALES_MARKETING_DB_NAME: process.env.SALES_MARKETING_DB_NAME || 'sales_marketing',
};


const sequelize = new Sequelize(MAIN_DB_NAME, DB_USER, DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
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
