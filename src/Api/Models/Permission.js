// models/Permission.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/Database/db.config');

const Permission = sequelize.MAIN_DB_NAME.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, { tableName: 'tbl_permission',timestamps: true });

module.exports = Permission;
