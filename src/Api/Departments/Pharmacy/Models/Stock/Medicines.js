const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medicine = sequelize.define('Pharmacy', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pharmacy_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pharmacies',
            key: 'id',
        },
    },
    medicine_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    generic_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    manufacturer: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiry_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    side_effects: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    contraindications: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    dosage: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    health_issues: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Array to store health issues
        allowNull: true,
    },
    diseases_treated: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Array to store diseases treated
        allowNull: true,
    },
    barcode: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
    },
    import_source: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    regulatory_approvals: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    storage_conditions: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    available_in_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize,
    modelName: 'Medicine',
    tableName: 'medicines',
    timestamps: true,
});

module.exports = Medicine;
