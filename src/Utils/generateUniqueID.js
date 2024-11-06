const crypto = require('crypto');

const generateUniqueID = (prefix) => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
    return `${prefix}${randomDigits}`;
};

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

const generateUniqueIDForHealth = (department) => {
    const prefix = prefixes[department];
    if (!prefix) {
        throw new Error(`Invalid department name: ${department}`);
    }
    return generateUniqueID(prefix);
};

console.log('Generated Pharmacy ID:', generateUniqueIDForHealth("partnership"));

module.exports = { prefixes, generateUniqueID, generateUniqueIDForHealth };
