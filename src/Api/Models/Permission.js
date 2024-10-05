const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/Database/db.config');

const Permission = sequelize.define(
  'Permission',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = Permission;
