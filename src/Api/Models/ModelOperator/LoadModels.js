const { DatabaseOperator } = require("../../../Config/Database/DatabaseOperator");

let globalModels = {};

async function loadModels(health_id) {
  if (!globalModels[health_id]) {
    const tbl = await DatabaseOperator(health_id)
       
    globalModels[health_id] = {
        User:tbl.User.deptModel.User,
        UserLog:tbl.UserLog.deptModel.UserLog,
        Role:tbl.Role.deptModel.Role,
        Permission:tbl.Permission.deptModel.Permission,
        RolePermissions:tbl.RolePermissions.deptModel.RolePermissions,
        Department:tbl.Department.deptModel.Department,
    };
  }
  return globalModels[health_id];
}

module.exports = { loadModels };
