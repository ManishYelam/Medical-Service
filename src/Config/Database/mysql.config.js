require('dotenv').config();

const sqlConfigProd = {
  host: process.env.P_DB_HOST,
  user: process.env.P_DB_USER,
  password: process.env.P_DB_PASSWORD,
  database: process.env.P_DB_NAME,
  port: process.env.P_DB_PORT,
  connectionLimit: 10,
  multipleStatements: true,
};

const sqlConfigLocal = {
  host: process.env.L_DB_HOST,
  user: process.env.L_DB_USER,
  password: process.env.L_DB_PASSWORD,
  database: process.env.L_DB_NAME,
  port: process.env.L_DB_PORT,
  connectionLimit: 10,
  multipleStatements: true,
};

// Export configuration based on the current environment
const sqlConfig =
  process.env.NODE_ENV === 'production' ? sqlConfigProd : sqlConfigLocal;

module.exports = sqlConfig;
