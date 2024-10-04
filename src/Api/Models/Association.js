const User = require('./User');
const Role = require('./Role');
const Department = require('./Department');
const Permission = require('./Permission');

User.belongsTo(Role, { foreignKey: 'role_id' });
User.belongsTo(Department, { foreignKey: 'department_id' });

Role.hasMany(User, { foreignKey: 'role_id' });
Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'role_id' });

Department.hasMany(User, { foreignKey: 'department_id' });

Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permission_id' });

module.exports = { User, Role, Department, Permission };
