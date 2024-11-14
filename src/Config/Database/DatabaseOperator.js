const { getInstanceByKey } = require('./departmentMapping');
const models = require('./centralModelLoader');

const DatabaseOperator = async (health_id, tableName) => {
    const deptKey = getInstanceByKey(health_id);
    // console.log('Extracted department key:', deptKey);
    if (!deptKey) {
        return `Invalid department code.`;
    }

    const deptModel = models[deptKey];
    // console.log('Retrieved department model:', deptModel);
    if (!deptModel) {
        return `No model found for the specified department.`;
    }

    const deptModelTable = deptModel[tableName];
    // console.log(deptModelTable);
    if (!deptModelTable) {
        return `${tableName} model not found in department model.`;
    }

    // try {
    //     console.log(`Accessing ${tableName} model for department: ${deptKey}`);

    //     // Example query: Fetch all records from the specified table
    //     const result = await deptModelTable.findAll();
    //     console.log(`${tableName} data for ${deptKey}:`, result); 
    // } catch (error) {
    //     console.error(`Error accessing the ${tableName} model for department ${deptKey}:`, error.message);
    // }
};

DatabaseOperator('MEDSRV437293', 'User');

module.exports = { DatabaseOperator }