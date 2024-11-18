const { getInstanceByKey } = require('./departmentMapping');
const models = require('./centralModelLoader');

module.exports = {
    DatabaseOperator: async health_id => {
        const data = {};

        const deptKey = getInstanceByKey(health_id);
        if (!deptKey) { return { error: 'Invalid department code.' }; }

        const deptModel = models[deptKey];
        if (!deptModel) { return { error: 'No model found for the specified department.' }; }

        const deptModelEntries = Object.entries(deptModel);

        if (deptModelEntries.length === 0) { return { error: 'No elements found in the department model.' }; }

        deptModelEntries.forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                data[key] = { deptKey, deptModel, table: value };
            } else {
                data[key] = { deptKey, deptModel, value };
            }
        });
        // console.log(data);
        return data;
    },
    
}
