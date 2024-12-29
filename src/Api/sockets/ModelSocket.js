const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MessageAttribute = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sentAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

const NotificationAttribute = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notificationMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  notificationType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

const ScheduleTaskAttribute = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cronExpression: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  scheduledAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

const Message = sequelize.MAIN_DB_NAME.define('Message', MessageAttribute, {
  tableName: 'tbl_Message',
  timestamps: true,
});

const Notification = sequelize.MAIN_DB_NAME.define(
  'Notification',
  NotificationAttribute,
  {
    tableName: 'tbl_Notification',
    timestamps: true,
  }
);

const ScheduleTask = sequelize.MAIN_DB_NAME.define(
  'ScheduleTask',
  ScheduleTaskAttribute,
  {
    tableName: 'tbl_ScheduleTask',
    timestamps: true,
  }
);

module.exports = {
  Message,
  Notification,
  ScheduleTask,
};
