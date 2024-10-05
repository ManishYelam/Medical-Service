const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
      },
    },
    role: {
      type: DataTypes.ENUM(
        'customer',
        'pharmacy',
        'delivery',
        'admin',
        'super_admin'
      ),
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active',
    },
    aadhaar_number: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [12, 12],
      },
    },
    pan_card_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        len: [10, 10],
        isAlphanumeric: true,
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [5, 10],
      },
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'India',
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true,
    },
    privacy_consent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    aadhaar_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pan_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

module.exports = User;
