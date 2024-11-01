const crypto = require('crypto');

// Function to generate a unique ID with a given prefix
const generateUniqueID = (prefix) => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
    return `${prefix}${randomDigits}`;
};

// Meaningful prefixes for each department
const prefixes = {
    medicalService: 'MEDSRV',
    compliance: 'CMLAW',
    customerSupport: 'CUSTMR',
    dataAnalytics: 'DATAAN',
    financeAccounting: 'FINACC',
    healthcare: 'HLTHCR',
    humanResources: 'HRMNGT',
    inventoryManagement: 'INVMGT',
    itDevelopment: 'ITDEVT',
    logistics: 'LOGIST',
    partnership: 'PARTNR',
    pharmacy: 'PHARMY',
    salesMarketing: 'SALMKT',
};

// Generate unique IDs for each department
const uniqueIDs = Object.fromEntries(
    Object.entries(prefixes).map(([key, prefix]) => [key, generateUniqueID(prefix)])
);

// Log the unique IDs
console.log('Unique IDs:', uniqueIDs);

// Generate and log a specific Pharmacy ID
console.log('Generated Pharmacy ID:', generateUniqueID("PHARMY"));

// Export the function for use in other modules
module.exports = { generateUniqueID };
