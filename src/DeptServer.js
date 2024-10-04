require('dotenv').config();
const express = require('express');

const { StartPharmacyServer } = require('./api/Departments/Pharmacy/server.js');
const { StartLogisticsServer } = require('./api/Departments/Logistics/server.js');
const { StartCustomerSupportServer } = require('./api/Departments/Customer-Support/server.js');
const { StartSalesMarketingServer } = require('./api/Departments/Sales-marketing/server.js');
const { StartFinanceAccountingServer } = require('./api/Departments/Finance-Accounting/server.js');
const { StartComplianceLegalServer } = require('./api/Departments/Compliance-Legal/server.js');
const { StartHealthCareServer } = require('./api/Departments/Healthcare/server.js');
const { StartItDevelopmentServer } = require('./api/Departments/IT-Development/server.js');
const { StartInventoryManagementServer } = require('./api/Departments/Inventory-Management/server.js');
const { StartDataAnalyticServer } = require('./api/Departments/data-Analytic/server.js');
const { StartHrServer } = require('./api/Departments/HR/server.js');
const { StartPartnershipsServer } = require('./api/Departments/Partnerships/server.js');
const { appLogger, errorLogger } = require('./config/Setting/logger.config.js');

const app = express();

const DefineDeptMiddlewares = () => {
  
};

const DefineDeptRoutes = () => {
  app.get('/data', async (req, res) => {
    res.send('Hello from the server!');
  });
};

const StartDeptServer = async () => {
  console.log('Initializing Department Servers...');

  DefineDeptMiddlewares();

  DefineDeptRoutes();

  const DeptServers = [ StartPharmacyServer, StartLogisticsServer, StartCustomerSupportServer, StartSalesMarketingServer, StartFinanceAccountingServer, StartComplianceLegalServer, StartHealthCareServer, StartItDevelopmentServer, StartInventoryManagementServer, StartDataAnalyticServer, StartHrServer, StartPartnershipsServer, ];

  // const DeptMiddlewares = [ PharmacyMiddlewares, LogisticsMiddlewares, CustomerSupportMiddlewares, SalesMarketingMiddlewares, FinanceAccountingMiddlewares, ComplianceLegalMiddlewares, HealthcareMiddlewares, ItDevelopmentMiddlewares, InventoryManagementMiddlewares, DataAnalyticsMiddlewares, HRMiddlewares, PartnershipsMiddlewares, ];

  // const DeptRoutes = [ PharmacyRoutes, LogisticsRoutes, CustomerSupportRoutes, SalesMarketingRoutes, FinanceAccountingRoutes, ComplianceLegalRoutes, HealthcareRoutes, ItDevelopmentRoutes, InventoryManagementRoutes, DataAnalyticsRoutes, HRRoutes, PartnershipsRoutes, ];


  try {
    await Promise.all(DeptServers.map(server => server()));
    // await Promise.all(DeptMiddlewares.map(middleware => middleware()));
    // await Promise.all(DeptRoutes.map(route => route()));

    appLogger.info(`All department servers are running successfully at ${new Date().toLocaleString()}.`)
    console.log(`All department servers are running successfully at ${new Date().toLocaleString()}.`);
  } catch (error) {
    errorLogger.info('Error during department servers startup:', error.message);
    errorLogger.info('Stack Trace:', error.stack);
    console.error('Error during department servers startup:', error.message);
    console.error('Stack Trace:', error.stack);
  }
};

module.exports = { StartDeptServer };
