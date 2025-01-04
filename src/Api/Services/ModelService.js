const { fetchModelData, createModelData, updateModelData, deleteModelData } = require("../Models/ModelOperator/DataModel");

const modelMapping = {
  User: { type: 'User', key: 'User' },
  UserLog: { type: 'UserLog', key: 'UserLog' },
  Role: { type: 'Role', key: 'Role' },
  Permission: { type: 'Permission', key: 'Permission' },
  RolePermissions: { type: 'RolePermissions', key: 'RolePermissions' },
  Department: { type: 'Department', key: 'Department' },
};

const fetchAllRecords = async (health_id, page = 1, limit = 10, filters = {}) => {
  const results = {};
  for (const modelName in modelMapping) {
    const selectedModel = modelMapping[modelName];
    try {
      const { data, totalCount } = await fetchModelData(
        health_id,
        selectedModel.type,
        selectedModel.key,
        filters,
        page,
        limit
      );
      if (data.error) {
        results[modelName] = { error: data.error };
      } else {
        results[modelName] = { totalCount, data };
      }
    } catch (error) {
      results[modelName] = { error: error.message };
    }
  }
  return results;
};

const fetchSpecificModelRecords = async (health_id, modelName, page = 1, limit = 10, filters = {}) => {
  const selectedModel = modelMapping[modelName];
  if (!selectedModel) {
    throw new Error(`Model "${modelName}" not found in modelMapping.`);
  }

  try {
    const { data, totalCount } = await fetchModelData(
      health_id,
      selectedModel.type,
      selectedModel.key,
      filters,
      page,
      limit
    );

    if (data.error) {
      throw new Error(data.error);
    }

    return { model: modelName, totalCount, data };
  } catch (error) {
    throw new Error(`Error fetching records for model "${modelName}": ${error.message}`);
  }
};

const createRecord = async (health_id, modelName, data) => {
  const selectedModel = modelMapping[modelName];
  if (!selectedModel) {
    throw new Error(`Model "${modelName}" not found in modelMapping.`);
  }

  try {
    return await createModelData(
      health_id,
      selectedModel.type,
      selectedModel.key,
      data
    );
  } catch (error) {
    throw new Error(`Error creating record for model "${modelName}": ${error.message}`);
  }
};

const updateRecord = async (health_id, modelName, data, id) => {
  const selectedModel = modelMapping[modelName];
  if (!selectedModel) {
    throw new Error(`Model "${modelName}" not found in modelMapping.`);
  }

  try {
    return await updateModelData(
      health_id,
      selectedModel.type,
      selectedModel.key,
      data,
      id
    );
  } catch (error) {
    throw new Error(`Error updating record for model "${modelName}" with ID "${id}": ${error.message}`);
  }
};

const deleteRecord = async (health_id, modelName, id) => {
  const selectedModel = modelMapping[modelName];
  if (!selectedModel) {
    throw new Error(`Model "${modelName}" not found in modelMapping.`);
  }

  try {
    return await deleteModelData(
      health_id,
      selectedModel.type,
      selectedModel.key,
      id
    );
  } catch (error) {
    throw new Error(`Error deleting record for model "${modelName}" with ID "${id}": ${error.message}`);
  }
};

module.exports = {
  modelMapping,
  fetchAllRecords,
  fetchSpecificModelRecords,
  createRecord,
  updateRecord,
  deleteRecord,
};


// module.exports = {
//   UserModel: async (health_id) => await fetchModelData(health_id, 'User', 'User'),
//   UserLogModel: async (health_id) => await fetchModelData(health_id, 'UserLog', 'UserLog'),
//   RoleModel: async (health_id) => await fetchModelData(health_id, 'Role', 'Role'),
//   PermissionModel: async (health_id) => await fetchModelData(health_id, 'Permission', 'Permission'),
//   RolePermissionsModel: async (health_id) => await fetchModelData(health_id, 'RolePermissions', 'RolePermissions'),
//   DepartmentModel: async (health_id) => await fetchModelData(health_id, 'Department', 'Department')
// };

//------------------------------------------------------------------------------------------------

// Exporting functions for different models to perform CRUD operations
// module.exports = {
//     UserModel: async (health_id, operation, updateData) => await fetchModelData(health_id, 'User', 'User', operation, updateData),
//     UserLogModel: async (health_id, operation, updateData) => await fetchModelData(health_id, 'UserLog', 'UserLog', operation, updateData),
//     RoleModel: async (health_id, operation, updateData) => await fetchModelData(health_id, 'Role', 'Role', operation, updateData),
//     PermissionModel: async (health_id, operation, updateData) => await fetchModelData(health_id, 'Permission', 'Permission', operation, updateData),
//     RolePermissionsModel: async (health_id, operation, updateData) => await fetchModelData(health_id, 'RolePermissions', 'RolePermissions', operation, updateData),
//     DepartmentModel: async (health_id, operation, updateData) => await fetchModelData(health_id, 'Department', 'Department', operation, updateData)
// };













// const queries = require('./queries');

// class ModelService {
//     constructor() {
//         this.modelMapping = {
//             User: { model: require('../models/User'), key: 'User' },
//             UserLog: { model: require('../models/UserLog'), key: 'UserLog' },
//             Role: { model: require('../models/Role'), key: 'Role' },
//             Permission: { model: require('../models/Permission'), key: 'Permission' },
//             RolePermissions: { model: require('../models/RolePermissions'), key: 'RolePermissions' },
//             Department: { model: require('../models/Department'), key: 'Department' }
//         };
//     }

//     // Fetch all records from all models
//     async fetchAllRecords(health_id) {
//         const results = {};

//         for (const modelName in this.modelMapping) {
//             const selectedModel = this.modelMapping[modelName];
//             try {
//                 const records = await queries.findAll(selectedModel.model);
//                 if (records.error) {
//                     results[modelName] = { error: records.error };
//                 } else {
//                     results[modelName] = { count: records.data.length, data: records.data };
//                 }
//             } catch (error) {
//                 results[modelName] = { error: error.message };
//             }
//         }

//         return results;
//     }

//     // Fetch specific model records based on model name
//     async fetchSpecificModelRecords(health_id, modelName) {
//         const selectedModel = this.modelMapping[modelName];
//         if (!selectedModel) {
//             throw new Error(`Model "${modelName}" not found.`);
//         }

//         const records = await queries.findAll(selectedModel.model);
//         if (records.error) {
//             throw new Error(records.error);
//         }

//         return { model: modelName, count: records.data.length, data: records.data };
//     }

//     // Create a record for a specific model
//     async createRecord(modelName, data) {
//         const selectedModel = this.modelMapping[modelName];
//         if (!selectedModel) {
//             throw new Error(`Model "${modelName}" not found.`);
//         }

//         const result = await queries.create(selectedModel.model, data);
//         if (result.error) {
//             throw new Error(result.error);
//         }

//         return result.data;
//     }

//     // Update a record for a specific model by ID
//     async updateRecord(modelName, id, updateData) {
//         const selectedModel = this.modelMapping[modelName];
//         if (!selectedModel) {
//             throw new Error(`Model "${modelName}" not found.`);
//         }

//         const result = await queries.update(selectedModel.model, id, updateData);
//         if (result.error) {
//             throw new Error(result.error);
//         }

//         return result.data;
//     }

//     // Delete a record for a specific model by ID
//     async deleteRecord(modelName, id) {
//         const selectedModel = this.modelMapping[modelName];
//         if (!selectedModel) {
//             throw new Error(`Model "${modelName}" not found.`);
//         }

//         const result = await queries.remove(selectedModel.model, id);
//         if (result.error) {
//             throw new Error(result.error);
//         }

//         return result.data;
//     }
// }

// module.exports = new ModelService();

// // routes/modelRoutes.js

// const express = require('express');
// const router = express.Router();
// // const ModelController = require('../controllers/ModelController')

// // Middleware to authenticate the user (optional but recommended)
// const authMiddleware = require('../middleware/authMiddleware');

// // Fetch all records for all models or specific model
// router.get('/records', authMiddleware, ModelController.getRecords);

// // Create a new record (POST)
// router.post('/create', authMiddleware, ModelController.createRecord);

// // Update a record (PUT)
// router.put('/update', authMiddleware, ModelController.updateRecord);

// // Delete a record (DELETE)
// router.delete('/delete/:modelName/:id', authMiddleware, ModelController.deleteRecord);

// module.exports = router;
