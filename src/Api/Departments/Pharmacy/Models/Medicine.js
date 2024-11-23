const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../Config/Database/db.config');

const medicineAttributes = {
    pharmacyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medicineName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genericName: {
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
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    sideEffects: {
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
    healthIssues: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    diseasesTreated: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    importSource: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    regulatoryApprovals: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storageConditions: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    availableInStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
};

// Define the Medicine model
const Medicine = sequelize.PHARMACY_DB_NAME.define('Medicine', medicineAttributes, {
    tableName: 'tbl_medicine',  // Table name in the database
    timestamps: false,          // Disable automatic timestamps
    underscored: true,          // Use snake_case in column names
});

module.exports = Medicine;
