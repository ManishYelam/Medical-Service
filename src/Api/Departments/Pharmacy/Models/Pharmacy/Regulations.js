const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');
const User = require('./User');

const Regulation = sequelize.define(
  'Regulation',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    regulation_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    approved_by: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: true,
    },
    approval_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    effective_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    modified_by: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: true,
    },
    modification_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    regulation_scope: {
      type: DataTypes.ENUM('global', 'department', 'region'),
      defaultValue: 'global',
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attachments: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'regulations',
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Regulation;
