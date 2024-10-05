const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your database configuration

class RolePermission extends Model {}

RolePermission.init({
    
}, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'role_permissions',
    timestamps: true, // Track creation and update times
});

module.exports = RolePermission;
