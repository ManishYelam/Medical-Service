const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/Database/db.config');
const Role = require('./Role');

const User = sequelize.MAIN_DB_NAME.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'banned'),
        defaultValue: 'active'
    },
    // pin: {
    //     type : DataTypes.STRING,
    //     allowNull: true,
    //     defaultValue: null
    // }
}, { tableName: 'tbl_user',timestamps: true });

module.exports = User;
