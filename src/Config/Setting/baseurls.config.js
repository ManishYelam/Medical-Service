require('dotenv').config();

const envPrefix = process.env.NODE_ENV === 'production' ? 'P_' : 'L_';

const services = [
  'MAIN_SERVER',
  'PHARMACY',
  'LOGISTICS',
  'CUSTOMER_SUPPORT',
  'SALES_MARKETING',
  'FINANCE_ACCOUNTING',
  'COMPLIANCE_LEGAL',
  'HEALTHCARE',
  'IT_DEVELOPMENT',
  'INVENTORY_MANAGEMENT',
  'DATA_ANALYTICS',
  'HR',
  'PARTNERSHIPS',
];

const baseUrls = Object.fromEntries(
  services.map(service => [`${service}_URL`, process.env[`${envPrefix}${service}_URL`]])
);

module.exports = baseUrls;








// const baseUrls = require('./baseUrls');

// console.log("Main Server URL:", baseUrls.MAIN_SERVER_URL);

// // Example API call using the URLs
// const axios = require('axios');

// axios.get(`${baseUrls.PHARMACY_URL}/api/medications`)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error("Error fetching medications:", error);
//   });









// const express = require('express');
// const axios = require('axios');
// const baseUrls = require('./baseUrls'); // Import the base URLs

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Helper function to fetch data from the respective service
// const fetchData = async (serviceUrl, endpoint) => {
//   try {
//     const response = await axios.get(`${serviceUrl}${endpoint}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching data from ${serviceUrl}:`, error.message);
//     throw new Error('Error fetching data from the service');
//   }
// };

// // Example route to get data from all services
// app.get('/api/all-services', async (req, res) => {
//   try {
//     const responses = await Promise.all([
//       fetchData(baseUrls.MAIN_SERVER_URL, '/api/data'),
//       fetchData(baseUrls.PHARMACY_URL, '/api/medications'),
//       fetchData(baseUrls.LOGISTICS_URL, '/api/logistics'),
//       fetchData(baseUrls.CUSTOMER_SUPPORT_URL, '/api/support'),
//       fetchData(baseUrls.SALES_MARKETING_URL, '/api/sales'),
//       fetchData(baseUrls.FINANCE_ACCOUNTING_URL, '/api/finance'),
//       fetchData(baseUrls.COMPLIANCE_LEGAL_URL, '/api/compliance'),
//       fetchData(baseUrls.HEALTHCARE_URL, '/api/healthcare'),
//       fetchData(baseUrls.IT_DEVELOPMENT_URL, '/api/development'),
//       fetchData(baseUrls.INVENTORY_MANAGEMENT_URL, '/api/inventory'),
//       fetchData(baseUrls.DATA_ANALYTICS_URL, '/api/analytics'),
//       fetchData(baseUrls.HR_URL, '/api/hr'),
//       fetchData(baseUrls.PARTNERSHIPS_URL, '/api/partnerships'),
//     ]);

//     res.json({
//       mainServer: responses[0],
//       pharmacy: responses[1],
//       logistics: responses[2],
//       customerSupport: responses[3],
//       salesMarketing: responses[4],
//       financeAccounting: responses[5],
//       complianceLegal: responses[6],
//       healthcare: responses[7],
//       itDevelopment: responses[8],
//       inventoryManagement: responses[9],
//       dataAnalytics: responses[10],
//       hr: responses[11],
//       partnerships: responses[12],
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Define individual routes for specific services
// app.get('/api/pharmacy', async (req, res) => {
//   try {
//     const data = await fetchData(baseUrls.PHARMACY_URL, '/api/medications');
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Define similar routes for other services...

// // Start the server
// app.listen(PORT, () => {
//   console.log(`API Gateway is running on port ${PORT}`);
// });
