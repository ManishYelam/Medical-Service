const { getInstanceByKey } = require('./departmentMapping');
const models = require('./centralModelLoader');

const DatabaseOperator = async (health_id, tableName) => {
    const data = {};

    const deptKey = getInstanceByKey(health_id);
    if (!deptKey) { return { error: 'Invalid department code.' }; }

    const deptModel = models[deptKey];
    if (!deptModel) { return { error: 'No model found for the specified department.' }; }

    const deptModelTable = deptModel[tableName];
    if (!deptModelTable) { return { error: `${tableName} model not found in department model.` }; }

    data[tableName] = { deptKey, deptModel, deptModelTable, };

    return data && console.log(data.User);
};

DatabaseOperator('PHARMA437293', 'User');

module.exports = { DatabaseOperator };

















//  // Loop through each table name provided and access the model dynamically
//  const deptModelTables = {};
//  const tableNames = deptModelTable;
//  for (const tableName of tableNames) {
//      const deptModelTable = deptModel[tableName];
//      if (!deptModelTable) {
//          return { error: `${tableName} model not found in department model.` };
//      }
//      deptModelTables[tableName] = deptModelTable;
//  }

//  // Store the retrieved models information
//  data[deptKey] = deptModelTables;