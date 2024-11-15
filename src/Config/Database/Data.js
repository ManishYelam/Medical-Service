const databases = [
    'MAIN',
    'COMPLIANCE_LEGAL',
    'CUSTOMER_SUPPORT',
    'DATA_ANALYTIC',
    'FINANCE_ACCOUNTING',
    'HEALTHCARE',
    'HR',
    'INVENTORY_MANAGEMENT',
    'IT_DEVELOPMENT',
    'LOGISTIC',
    'PARTNERSHIP',
    'PHARMACY',
    'SALES_MARKETING',
];

const prefixes = {
    medicalService: 'MEDSRV',
    compliance: 'COMPLG',
    customerSupport: 'CUSTSP',
    dataAnalytics: 'DATANA',
    financeAccounting: 'FINACC',
    healthcare: 'HEALTH',
    humanResources: 'HRDEPT',
    inventoryManagement: 'INVMNT',
    itDevelopment: 'ITDEVP',
    logistics: 'LOGIST',
    partnership: 'PARTNR',
    pharmacy: 'PHARMA',
    salesMarketing: 'SALESM',
};

const departmentMapping = {
    'MEDSRV': "MAIN",
    'COMPLG': "COMPLIANCE_LEGAL",
    'CUSTSP': "CUSTOMER_SUPPORT",
    'DATANA': "DATA_ANALYTIC",
    'FINACC': "FINANCE_ACCOUNTING",
    'HEALTH': "HEALTHCARE",
    'HRDEPT': "HR",
    'INVMNT': "INVENTORY_MANAGEMENT",
    'ITDEVP': "IT_DEVELOPMENT",
    'LOGIST': "LOGISTIC",
    'PARTNR': "PARTNERSHIP",
    'PHARMA': "PHARMACY",
    'SALESM': "SALES_MARKETING",
};

const DEPARTMENTS = {
    MAIN: 'Main',
    COMPLIANCE_LEGAL: 'Compliance Legal',
    CUSTOMER_SUPPORT: 'Customer Support',
    DATA_ANALYTIC: 'Data Analytic',
    FINANCE_ACCOUNTING: 'Finance & Accounting',
    HEALTHCARE: 'Healthcare',
    HR: 'HR',
    INVENTORY_MANAGEMENT: 'Inventory Management',
    IT_DEVELOPMENT: 'IT Development',
    LOGISTIC: 'Logistic',
    PARTNERSHIP: 'Partnership',
    PHARMACY: 'Pharmacy',
    SALES_MARKETING: 'Sales & Marketing',
};

const paths = {
    MAIN: '../../Api/Models/Association',
    COMPLIANCE_LEGAL: '../../Api/Departments/Compliance-Legal/Models/Association',
    CUSTOMER_SUPPORT: '../../Api/Departments/Customer-Support/Models/Association',
    DATA_ANALYTIC: '../../Api/Departments/data-Analytic/Models/Association',
    FINANCE_ACCOUNTING: '../../Api/Departments/Finance-Accounting/Models/Association',
    HEALTHCARE: '../../Api/Departments/Healthcare/Models/Association',
    HR: '../../Api/Departments/HR/Models/Association',
    INVENTORY_MANAGEMENT: '../../Api/Departments/Inventory-Management/Models/Association',
    IT_DEVELOPMENT: '../../Api/Departments/IT-Development/Models/Association',
    LOGISTIC: '../../Api/Departments/Logistics/Models/Association',
    PARTNERSHIP: '../../Api/Departments/Partnerships/Models/Association',
    PHARMACY: '../../Api/Departments/Pharmacy/Models/Association',
    SALES_MARKETING: '../../Api/Departments/Sales-marketing/Models/Association'
};

module.exports = {
    databases,
    prefixes,
    departmentMapping,
    DEPARTMENTS,
    paths
}


// const models = {
//     MAIN: require('../../Api/Models/Association'),
//     COMPLIANCE_LEGAL: require('../../Api/Departments/Compliance-Legal/Models/Association'),
//     CUSTOMER_SUPPORT: require('../../Api/Departments/Customer-Support/Models/Association'),
//     DATA_ANALYTIC: require('../../Api/Departments/data-Analytic/Models/Association'),
//     FINANCE_ACCOUNTING: require('../../Api/Departments/Finance-Accounting/Models/Association'),
//     HEALTHCARE: require('../../Api/Departments/Healthcare/Models/Association'),
//     HR: require('../../Api/Departments/HR/Models/Association'),
//     INVENTORY_MANAGEMENT: require('../../Api/Departments/Inventory-Management/Models/Association'),
//     IT_DEVELOPMENT: require('../../Api/Departments/IT-Development/Models/Association'),
//     LOGISTIC: require('../../Api/Departments/Logistics/Models/Association'),
//     PARTNERSHIP: require('../../Api/Departments/Partnerships/Models/Association'),
//     PHARMACY: require('../../Api/Departments/Pharmacy/Models/Association'),
//     SALES_MARKETING: require('../../Api/Departments/Sales-marketing/Models/Association'),
// };