const { fetchModelData } = require("../Models/ModelOperator/DataModel");

// module.exports = {
//   UserModel: async (req) => await fetchModelData(req, 'User', 'User'),
//   UserLogModel: async (req) => await fetchModelData(req, 'UserLog', 'UserLog'),
//   RoleModel: async (req) => await fetchModelData(req, 'Role', 'Role'),
//   PermissionModel: async (req) => await fetchModelData(req, 'Permission', 'Permission'),
//   RolePermissionsModel: async (req) => await fetchModelData(req, 'RolePermissions', 'RolePermissions'),
//   DepartmentModel: async (req) => await fetchModelData(req, 'Department', 'Department')
// };

//------------------------------------------------------------------------------------------------

// Exporting functions for different models to perform CRUD operations
module.exports = {
    UserModel: async (req, operation, updateData) => await fetchModelData(req, 'User', 'User', operation, updateData),
    UserLogModel: async (req, operation, updateData) => await fetchModelData(req, 'UserLog', 'UserLog', operation, updateData),
    RoleModel: async (req, operation, updateData) => await fetchModelData(req, 'Role', 'Role', operation, updateData),
    PermissionModel: async (req, operation, updateData) => await fetchModelData(req, 'Permission', 'Permission', operation, updateData),
    RolePermissionsModel: async (req, operation, updateData) => await fetchModelData(req, 'RolePermissions', 'RolePermissions', operation, updateData),
    DepartmentModel: async (req, operation, updateData) => await fetchModelData(req, 'Department', 'Department', operation, updateData)
  };
