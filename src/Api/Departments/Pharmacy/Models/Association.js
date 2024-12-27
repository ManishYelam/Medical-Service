const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const RolePermissions = require('./RolePermissions');
const Medicine = require('./Medicine');

// User-Role Relationship (Many Users to One Role)
User.belongsTo(Role, { through: 'UserRoles', foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' }); // One Role has Many Users

// Role-Permission Relationship (Many-to-Many through RolePermissions)
Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'role_id', otherKey: 'permission_id', });

Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permission_id', otherKey: 'role_id', });

User.hasMany(Medicine, { foreignKey: 'user_id' }); // One User can manage many Medicines
Medicine.belongsTo(User, { foreignKey: 'user_id' }); // Each Medicine is associated with one User

module.exports = { User, Role, Permission, RolePermissions };
