// const { log } = require('winston');
// const { DatabaseOperator } = require('../../../Config/Database/DatabaseOperator');

// // Utility function to handle data retrieval from a model using health_id from session
// async function fetchModelData(req, modelType, modelKey) {
//   try {
//     // Retrieve health_id from the session
//     const health_id = req;
//     console.log(".................", health_id);
    
//     if (!health_id) {
//       throw new Error('health_id not found in session');
//     }

//     const data = await DatabaseOperator(health_id);
//     if (data.error) { return `Error in ${modelType}: ${data.error}`; }

//     const userModel = data[modelKey];
//     const deptKey = userModel.deptKey;
//     const deptModel = userModel.deptModel;
//     const Model = deptModel[modelKey];

//     console.log(`Fetching ${modelType}...`);
//     console.log("Department Key:", deptKey);
//     console.log("Department Model:", deptModel);
//     console.log(`Type of ${modelType}:`, typeof Model);
//     console.log(`${modelType} Content:`, Model);

//     const modelData = await Model.findAll();
//     // console.log(`${modelType} Data:`, modelData);
//     return modelData;

//   } catch (error) {
//     console.error(`Error fetching data from ${modelType}:`, error.message);
//   }
// }

// module.exports = {
//   UserModel: async (req) => await fetchModelData(req, 'User', 'User'),
//   UserLogModel: async (req) => await fetchModelData(req, 'UserLog', 'UserLog'),
//   RoleModel: async (req) => await fetchModelData(req, 'Role', 'Role'),
//   PermissionModel: async (req) => await fetchModelData(req, 'Permission', 'Permission'),
//   RolePermissionsModel: async (req) => await fetchModelData(req, 'RolePermissions', 'RolePermissions'),
//   DepartmentModel: async (req) => await fetchModelData(req, 'Department', 'Department')
// };

//------------------------------------------------------------------------------------

const { DatabaseOperator } = require('../../../Config/Database/DatabaseOperator');

module.exports = {
 fetchModelData : async(req, modelType, modelKey, operation = 'findAll', updateData = null) =>{
  try {
    const health_id = req;
    console.log(`✨ ${health_id} ✨`);
    
    const data = await DatabaseOperator(health_id);
    if (data.error) {
      return `Error in ${modelType}: ${data.error}`;
    }

    const userModel = data[modelKey];
    const deptKey = userModel.deptKey;
    const deptModel = userModel.deptModel;
    const Model = deptModel[modelKey];
 
    console.log(`✨ Performing ${operation} on ${modelType}...✨ `);
    console.log(`✨ Department Key: ✨`, deptKey);
    console.log(`✨ Department Model: ✨`, deptModel);
    console.log(`✨ Type of ${modelType}: ✨`, typeof Model);
    console.log(`✨ ${modelType} Content: ✨`, Model);

    let modelData;

    switch (operation) {
      case 'findAll':
        // Retrieve all records for the given model
        modelData = await Model.findAll();
        break;
      case 'findOne':
        // Retrieve a single record by primary key or conditions
        if (!updateData || !updateData.id) throw new Error('No ID provided for findOne');
        modelData = await Model.findOne({ where: { id: updateData.id } });
        break;
      case 'create':
        // Create a new record in the model
        if (!updateData) throw new Error('No data provided for create');
        modelData = await Model.create(updateData);
        break;
      case 'update':
        // Update an existing record
        if (!updateData || !updateData.id) throw new Error('No data or ID provided for update');
        modelData = await Model.update(updateData, { where: { id: updateData.id } });
        break;
      case 'destroy':
        // Delete a record by ID
        if (!updateData || !updateData.id) throw new Error('No ID provided for delete');
        modelData = await Model.destroy({ where: { id: updateData.id } });
        break;
      case 'bulkCreate':
        // Create multiple records at once
        if (!updateData || !Array.isArray(updateData)) throw new Error('No data provided for bulkCreate');
        modelData = await Model.bulkCreate(updateData);
        break;
      case 'upsert':
        // Upsert a record (insert or update)
        if (!updateData || !updateData.id) throw new Error('No data or ID provided for upsert');
        modelData = await Model.upsert(updateData);
        break;
      case 'findOrCreate':
        // Find a record or create one if it doesn't exist
        if (!updateData || !updateData.email) throw new Error('No email provided for findOrCreate');
        modelData = await Model.findOrCreate({
          where: { email: updateData.email },
          defaults: updateData,
        });
        break;
      case 'transaction':
        // Handle transactions (for multiple operations in a single transaction)
        const t = await deptModel.sequelize.transaction();
        try {
          const record = await Model.create(updateData, { transaction: t });
          await t.commit();
          modelData = record;
        } catch (error) {
          await t.rollback();
          throw new Error('Transaction failed: ' + error.message);
        }
        break;
      case 'aggregate':
        // Example: Aggregate operations like count, avg, etc.
        modelData = await Model.aggregate('age', 'AVG');
        break;
      default:
        throw new Error('Unsupported operation');
    }

    // console.log(`✨ ${modelType} Data: ✨`, modelData);
    return modelData;

  } catch (error) {
    console.error(`Error performing ${operation} on ${modelType}:`, error.message);
    return { error: error.message };
  }
}
}
// Exporting functions for different models to perform CRUD operations
// module.exports = {
//   UserModel: async (req, operation, updateData) => await fetchModelData(req, 'User', 'User', operation, updateData),
//   UserLogModel: async (req, operation, updateData) => await fetchModelData(req, 'UserLog', 'UserLog', operation, updateData),
//   RoleModel: async (req, operation, updateData) => await fetchModelData(req, 'Role', 'Role', operation, updateData),
//   PermissionModel: async (req, operation, updateData) => await fetchModelData(req, 'Permission', 'Permission', operation, updateData),
//   RolePermissionsModel: async (req, operation, updateData) => await fetchModelData(req, 'RolePermissions', 'RolePermissions', operation, updateData),
//   DepartmentModel: async (req, operation, updateData) => await fetchModelData(req, 'Department', 'Department', operation, updateData)
// };

//---------------------------------------------------------------------------------------

// const { DatabaseOperator } = require('../../../Config/Database/DatabaseOperator');

// module.exports = {
//     UserModel: async health_id => {
//         try {
//             console.log("........", health_id, data);
//             const data = await DatabaseOperator("MEDSRV578672");
//             if (data.error) {
//                 console.log('Error:', data.error);
//                 return;
//             }
//             const userModel = data.User;
//             const deptKey = userModel.deptKey;
//             const deptModel = userModel.deptModel;

//             const User = deptModel.User;
//             console.log("....", deptKey, "....", deptModel, "....type", typeof User, "....User Content:", User);

//             const UserData = await User.findAll();
//             console.log('User Data:', UserData);
//         } catch (error) {
//             console.error('Error fetching data from User model:', error.message);
//         }
//     },

//     UserLogModel: async health_id => {
//         try {
//             const data = await DatabaseOperator(health_id);
//             if (data.error) {
//                 console.log('Error:', data.error);
//                 return;
//             }
//             const userModel = data.UserLog;
//             const deptKey = userModel.deptKey;
//             const deptModel = userModel.deptModel;

//             const UserLog = deptModel.UserLog;
//             console.log("....", deptKey,);
//             console.log("....", deptModel,);
//             console.log("....", typeof UserLog,);
//             console.log("....", UserLog,);

//             return UserLog
//         } catch (error) {
//             console.error('Error fetching data:', error.message);
//         }
//     },
    
//     RoleModel: async health_id => {
//         try {
//             const data = await DatabaseOperator(health_id);
//             if (data.error) {
//                 console.log('Error:', data.error);
//                 return;
//             }
//             const userModel = data.Role;
//             const deptKey = userModel.deptKey;
//             const deptModel = userModel.deptModel;

//             const Role = deptModel.Role;
//             console.log("....", deptKey, "....", deptModel, "....type", typeof Role, "....User Content:", Role);

//             const RoleData = await Role.findAll();
//             console.log('User Data:', RoleData);
//         } catch (error) {
//             console.error('Error fetching data from User model:', error.message);
//         }
//     },

//     PermissionModel: async health_id => {
//         try {
//             const data = await DatabaseOperator(health_id);
//             if (data.error) {
//                 console.log('Error:', data.error);
//                 return;
//             }
//             const userModel = data.Permission;
//             const deptKey = userModel.deptKey;
//             const deptModel = userModel.deptModel;

//             const Permission = deptModel.Permission;
//             console.log("....", deptKey, "....", deptModel, "....type", typeof Permission, "....User Content:", Permission);

//             const PermissionData = await Permission.findAll();
//             console.log('User Data:', PermissionData);
//         } catch (error) {
//             console.error('Error fetching data from User model:', error.message);
//         }
//     },

//     RolePermissionsModel: async health_id => {
//         try {
//             const data = await DatabaseOperator('PHARMA437293');
//             if (data.error) {
//                 console.log('Error:', data.error);
//                 return;
//             }
//             const userModel = data.RolePermissions;
//             const deptKey = userModel.deptKey;
//             const deptModel = userModel.deptModel;

//             const RolePermissions = deptModel.RolePermissions;
//             console.log("....", deptKey, "....", deptModel, "....type", typeof RolePermissions, "....User Content:", RolePermissions);

//             const RolePermissionsData = await RolePermissions.findAll();
//             console.log('User Data:', RolePermissionsData);
//         } catch (error) {
//             console.error('Error fetching data from User model:', error.message);
//         }
//     },

//     DepartmentModel: async health_id => {
//         try {
//             const data = await DatabaseOperator('PHARMA437293');
//             if (data.error) {
//                 console.log('Error:', data.error);
//                 return;
//             }
//             const userModel = data.Department;
//             const deptKey = userModel.deptKey;
//             const deptModel = userModel.deptModel;

//             const RolePermissions = deptModel.Department;
//             console.log("....", deptKey, "....", deptModel, "....type", typeof Department, "....User Content:", RolePermissions);

//             const DepartmentData = await RolePermissions.findAll();
//             console.log('User Data:', DepartmentData);
//         } catch (error) {
//             console.error('Error fetching data from User model:', error.message);
//         }
//     },

// }

// const UserLogModel = async health_id => {
//     try {
//         const data = await DatabaseOperator("MEDSRV718079");
//         if (data.error) {
//             console.log('Error:', data.error);
//             return;
//         }
//         const userModel = data.UserLog;
//         const deptKey = userModel.deptKey;
//         const deptModel = userModel.deptModel;

//         const UserLog = deptModel.UserLog;
//         console.log("....", deptKey,);
//         console.log("....", deptModel,);
//         console.log("....", typeof UserLog,);
//         console.log("....", UserLog,);

//         return UserLog
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//     }
// }
// module.exports = { UserLogModel }