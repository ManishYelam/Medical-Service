const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 

const Employee = sequelize.define('Employee', {
  employeeId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  pharmacyId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Pharmacies', // Reference to the Pharmacy model
      key: 'pharmacyId'
    }
  },
  dateOfJoining: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

module.exports = Employee;
