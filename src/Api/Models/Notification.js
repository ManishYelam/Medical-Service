const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import your database configuration

const Notification = sequelize.MAIN_DB_NAME.define('Notification', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('email', 'in-app'),
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Notification;
