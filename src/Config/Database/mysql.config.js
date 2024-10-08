require('dotenv').config();

const sqlConfigProd = {
  host: process.env.P_DB_HOST,
  user: process.env.P_DB_USER,
  password: process.env.P_DB_PASSWORD,
  database: process.env.MAIN_DB_NAME,
  port: process.env.P_DB_PORT,
  connectionLimit: 10,
  multipleStatements: true,
};

const sqlConfigLocal = {
  host: process.env.L_DB_HOST,
  user: process.env.L_DB_USER,
  password: process.env.L_DB_PASSWORD,
  database: process.env.MAIN_DB_NAME,
  port: process.env.L_DB_PORT,
  connectionLimit: 10,
  multipleStatements: true,
};

// Export configuration based on the current environment
const sqlConfig = process.env.NODE_ENV === 'production' ? sqlConfigProd : sqlConfigLocal;

module.exports = sqlConfig;










// require('dotenv').config();
// const mysql = require('mysql2/promise');

// // Base database configuration
// const baseConfig = {
//   port: process.env.DB_PORT,
//   connectionLimit: 10,
//   multipleStatements: true,
// };

// // Function to create database configurations dynamically
// const createDbConfig = (dbName, env) => ({
//   host: env === 'production' ? process.env.P_DB_HOST : process.env.L_DB_HOST,
//   user: env === 'production' ? process.env.P_DB_USER : process.env.L_DB_USER,
//   password: env === 'production' ? process.env.P_DB_PASSWORD : process.env.L_DB_PASSWORD,
//   database: process.env[`${dbName}_DB_NAME`] || dbName.toLowerCase().replace(/_/g, '-') || dbName,
//   ...baseConfig,
// });

// // List of databases
// const databases = [
//   'MAIN',
//   'COMPLIANCE_LEGAL',
//   'CUSTOMER_SUPPORT',
//   'DATA_ANALYTIC',
//   'FINANCE_ACCOUNTING',
//   'HEALTHCARE',
//   'HR',
//   'INVENTORY_MANAGEMENT',
//   'IT_DEVELOPMENT',
//   'LOGISTIC',
//   'PARTNERSHIP',
//   'PHARMACY',
//   'SALES_MARKETING',
// ];

// // Generate database configurations
// const sqlConfig = databases.reduce((acc, dbName) => {
//   acc[`${dbName}_DB`] = createDbConfig(dbName, process.env.NODE_ENV);
//   return acc;
// }, {});

// // Function to create connection pools for all databases
// const createConnectionPools = () => {
//   const connectionPools = Object.entries(sqlConfig).reduce((pools, [dbName, config]) => {
//     pools[dbName] = mysql.createPool(config);
//     return pools;
//   }, {});

//   return connectionPools;
// };

// // Function to test connections for all databases
// const testConnections = async (connectionPools) => {
//   for (const [dbName, pool] of Object.entries(connectionPools)) {
//     try {
//       const connection = await pool.getConnection();
//       console.log(`Connected to database: ${dbName}`);
//       connection.release(); // Release the connection back to the pool
//     } catch (error) {
//       console.error(`Error connecting to database ${dbName}: ${error.message}`);
//     }
//   }
// };

// // Create the connection pools
// const connectionPools = createConnectionPools();

// // Test the connections
// testConnections(connectionPools);

// // Export the connection pools for use in other parts of the application
// module.exports = connectionPools;
