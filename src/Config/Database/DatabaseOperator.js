const { getInstanceByKey } = require('./departmentMapping');
const models = require('./centralModelLoader');

const DatabaseOperator = async (health_id) => {
    const data = {};

    // Retrieve department key based on health_id
    const deptKey = getInstanceByKey(health_id);
    if (!deptKey) {
        return { error: 'Invalid department code.' };
    }

    // Retrieve department model using deptKey
    const deptModel = models[deptKey];
    if (!deptModel) {
        return { error: 'No model found for the specified department.' };
    }

    // Dynamically use all elements of deptModel (tables, properties, methods, etc.)
    const deptModelEntries = Object.entries(deptModel);

    if (deptModelEntries.length === 0) {
        return { error: 'No elements found in the department model.' };
    }

    // Iterate over all elements of deptModel
    deptModelEntries.forEach(([key, value]) => {
        // If the value is a table, handle it as such
        if (typeof value === 'object' && value !== null) {
            // Assuming this is a table (object), add it to the data object
            data[key] = { deptKey, deptModel, table: value };
        } else {
            // Otherwise, it's a property or method, add it dynamically
            data[key] = { deptKey, deptModel, value };
        }
    });

    // Log data for debugging
    console.log(data);

    return data;
};

DatabaseOperator('MEDSRV437293')
    .then(result => console.log(result))
    .catch(error => console.log(error));

module.exports = { DatabaseOperator };
