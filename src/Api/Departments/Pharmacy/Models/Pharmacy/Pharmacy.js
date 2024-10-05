const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Assuming you have a configured sequelize instance

const Pharmacy = sequelize.define(
  'Pharmacy',
  {
    pharmacyId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true, // Ensures unique pharmacy IDs
    },
    name: {
      type: DataTypes.STRING(150), // Increased length for more descriptive names
      allowNull: false,
    },
    address: {
      type: DataTypes.JSONB, // Structured address data
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING(15), // Limit length for phone numbers
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true, // Validate email format
      },
    },
    licenseNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true, // Ensures unique license numbers
    },
    panNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true, // Ensures unique PAN numbers
    },
    gstNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true, // Ensures unique GST numbers
    },
    establishmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    operationalHours: {
      type: DataTypes.JSONB, // e.g., { openingTime: "09:00 AM", closingTime: "09:00 PM" }
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true, // Can be null if rank is not assigned
    },
    turnover: {
      type: DataTypes.FLOAT,
      allowNull: true, // Turnover can be null if not recorded yet
    },
    rating: {
      type: DataTypes.JSONB, // Store average rating and total reviews
      allowNull: true,
    },
    specialties: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Array of specialties
      allowNull: true,
    },
    totalEmployees: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    branches: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    onlineOrdersAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deliveryServiceAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    turnoverHistory: {
      type: DataTypes.JSONB, // Historical turnover data
      allowNull: true,
    },
    rankHistory: {
      type: DataTypes.JSONB, // Historical rank data
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'), // Pharmacy status
      defaultValue: 'active',
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    paranoid: true, // Enable soft deletes using a deletedAt field
  }
);

// Soft delete configuration
Pharmacy.addHook('beforeDestroy', (pharmacy) => {
  pharmacy.deletedAt = new Date();
});

module.exports = Pharmacy;
