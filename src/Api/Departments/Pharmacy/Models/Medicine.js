const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../Config/Database/db.config');

const medicineAttributes = {
  pharmacy_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  medicine_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  generic_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  side_effects: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contraindications: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  health_issues: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  diseases_treated: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  import_source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regulatory_approvals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storage_conditions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  available_in_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

const Medicine = sequelize.PHARMACY_DB_NAME.define(
  'Medicine',
  medicineAttributes,
  {
    tableName: 'tbl_medicine',
    timestamps: false,
    underscored: true,
  }
);

module.exports = Medicine;
