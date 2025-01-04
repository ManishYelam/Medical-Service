const User = require('./User');
const UserLog = require('./user_logs');
const Role = require('./Role');
const Permission = require('./Permission');
const RolePermissions = require('./RolePermissions');
const Department = require('./Department');
const Organization = require('./Organization');

// User-Role Relationship (Many Users to One Role)
User.belongsTo(Role, { through: 'UserRoles', foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' }); // One Role has Many Users

// User-UserLog Relationship (One User has Many Logs)
User.hasMany(UserLog, { foreignKey: 'user_id' }); // Use 'user_id' as FK, to match the column definition
UserLog.belongsTo(User, { foreignKey: 'user_id' }); // 'user_id' FK to match the column definition in UserLog

// Role-Permission Relationship (Many-to-Many through RolePermissions)
Role.belongsToMany(Permission, {
  through: 'RolePermissions',
  foreignKey: 'role_id',
  otherKey: 'permission_id',
});

Permission.belongsToMany(Role, {
  through: 'RolePermissions',
  foreignKey: 'permission_id',
  otherKey: 'role_id',
});

Department.hasMany(User, { foreignKey: 'dept_id' });
User.belongsTo(Department, { foreignKey: 'dept_id' });

// Organization-User Relationship (One Organization has Many Users)
Organization.hasMany(User, { foreignKey: 'id' });
User.belongsTo(Organization, { foreignKey: 'id' });

// Organization-Department Relationship (One Organization has Many Departments)
Organization.hasMany(Department, { foreignKey: 'id' });
Department.belongsTo(Organization, { foreignKey: 'id' });

// Organization-Role Relationship (One Organization has Many Roles)
Organization.hasMany(Role, { foreignKey: 'id' });
Role.belongsTo(Organization, { foreignKey: 'id' });

module.exports = {
  User,
  UserLog,
  Role,
  Permission,
  RolePermissions,
  Department,
  Organization
};
