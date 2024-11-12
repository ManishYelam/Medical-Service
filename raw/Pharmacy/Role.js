const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 50],
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    can_view_prescriptions: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    can_dispense_medications: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    can_manage_inventory: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    can_manage_finances: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    can_manage_users: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    can_audit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    hierarchy_level: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
    },
}, {
    tableName: 'roles',
    timestamps: true,
});

module.exports = Role;
