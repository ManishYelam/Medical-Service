require('dotenv').config();
const express = require('express');

const { StartPharmacyServer } = require('./Api/Departments/Pharmacy/server.js');
const { StartLogisticsServer } = require('./Api/Departments/Logistics/server.js');
const { StartCustomerSupportServer } = require('./Api/Departments/Customer-Support/server.js');
const { StartSalesMarketingServer } = require('./Api/Departments/Sales-marketing/server.js');
const { StartFinanceAccountingServer } = require('./Api/Departments/Finance-Accounting/server.js');
const { StartComplianceLegalServer } = require('./Api/Departments/Compliance-Legal/server.js');
const { StartHealthCareServer } = require('./Api/Departments/Healthcare/server.js');
const { StartItDevelopmentServer } = require('./Api/Departments/IT-Development/server.js');
const { StartInventoryManagementServer } = require('./Api/Departments/Inventory-Management/server.js');
const { StartDataAnalyticServer } = require('./Api/Departments/data-Analytic/server.js');
const { StartHrServer } = require('./Api/Departments/HR/server.js');
const { StartPartnershipsServer } = require('./Api/Departments/Partnerships/server.js');

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

    console.log(`All department servers are running successfully at ${new Date().toLocaleString()}.`);
  } catch (error) {
    throw new Error('Error during department servers startup:', error.message);
  }
};

module.exports = { StartDeptServer };
