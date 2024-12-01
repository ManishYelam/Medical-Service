const { DatabaseOperator } = require('../../../Config/Database/DatabaseOperator');

module.exports = {
  fetchModelData: async (health_id, modelType, modelKey, filters = {}, page = 1, limit = 10) => {
    try {
      const data = await DatabaseOperator(health_id);
      if (data.error) {
        return { error: `Error in ${modelType}: ${data.error}` };
      }

      const userModel = data[modelKey];
      const deptModel = userModel.deptModel;
      const Model = deptModel[modelKey];

      page = parseInt(page, 10);
      limit = parseInt(limit, 10);

      const offset = (page - 1) * limit;

      const modelData = await Model.findAll({ where: filters, limit: limit, offset: offset });
      const totalCount = await Model.count({ where: filters });
      
      return { data: modelData, totalCount: totalCount };
    } catch (error) {
      return { error: error.message };
    }
  },

  UserModel: async (health_id, filters = {}, page = 1, limit = 10) => {
    return await module.exports.fetchModelData(health_id, 'User', 'User', filters, page, limit);
  },

  UserLogModel: async (health_id, filters = {}, page = 1, limit = 10) => {
    return await module.exports.fetchModelData(health_id, 'UserLog', 'UserLog', filters, page, limit);
  },

  RoleModel: async (health_id, filters = {}, page = 1, limit = 10) => {
    return await module.exports.fetchModelData(health_id, 'Role', 'Role', filters, page, limit);
  },

  PermissionModel: async (health_id, filters = {}, page = 1, limit = 10) => {
    return await module.exports.fetchModelData(health_id, 'Permission', 'Permission', filters, page, limit);
  },

  RolePermissionsModel: async (health_id, filters = {}, page = 1, limit = 10) => {
    return await module.exports.fetchModelData(health_id, 'RolePermissions', 'RolePermissions', filters, page, limit);
  },

  DepartmentModel: async (health_id, filters = {}, page = 1, limit = 10) => {
    return await module.exports.fetchModelData(health_id, 'Department', 'Department', filters, page, limit);
  },
  
};
