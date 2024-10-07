// services/serviceAPI.js
const axios = require('axios');
const baseUrls = require('../../Config/Setting/baseurls.config'); // Import base URLs

// Function to fetch data from a specific service
const fetchData = async (serviceUrl, endpoint) => {
  try {
    const { data } = await axios.get(`${serviceUrl}${endpoint}`);
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${serviceUrl}${endpoint}:`, error.message);
    throw new Error(`Failed to fetch data from ${serviceUrl}`); // More descriptive error message
  }
};

// Function to fetch data from all services
const fetchAllServicesData = async () => {
  const services = {
    mainServer: '/api/data',
    pharmacy: '/api/medications',
    logistics: '/api/logistics',
    customerSupport: '/api/support',
    salesMarketing: '/api/sales',
    financeAccounting: '/api/finance',
    complianceLegal: '/api/compliance',
    healthcare: '/api/healthcare',
    itDevelopment: '/api/development',
    inventoryManagement: '/api/inventory',
    dataAnalytics: '/api/analytics',
    hr: '/api/hr',
    partnerships: '/api/partnerships',
  };

  const fetchPromises = Object.entries(services).map(async ([serviceName, endpoint]) => {
    const serviceUrl = baseUrls[`${serviceName.toUpperCase()}_URL`];
    return fetchData(serviceUrl, endpoint);
  });

  try {
    const responses = await Promise.all(fetchPromises);
    return Object.fromEntries(Object.keys(services).map((key, index) => [key, responses[index]]));
  } catch (error) {
    console.error('Error fetching data from one or more services:', error.message);
    throw new Error('Failed to fetch data from one or more services');
  }
};

// Export the functions
module.exports = {
  fetchAllServicesData,
  fetchData, // Optional, in case you want to fetch individual service data
};
