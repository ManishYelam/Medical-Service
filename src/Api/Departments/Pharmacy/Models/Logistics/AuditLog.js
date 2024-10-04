const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../Employees/User');  // Assuming User model is defined

class AuditLog extends Model {}

AuditLog.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    action_type: {
        type: DataTypes.ENUM('income', 'expense', 'donation', 'tax', 'profit', 'loss', 'user_action', 'other'),
        allowNull: false,
        defaultValue: 'user_action',  // Default is generic user action, can be specific like 'income', 'donation', etc.
    },
    action: {
        type: DataTypes.STRING(255),
        allowNull: false,  // Description of the action, e.g., "User logged in", "Donation made", "Tax filed"
    },
    financial_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,  // The financial value, e.g., donation amount, tax paid, profit amount, etc.
    },
    tax_applied: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,  // Track taxes involved in the transaction, if applicable
    },
    reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,  // Optional field to reference related entities (donation campaigns, invoices, etc.)
    },
    reference_type: {
        type: DataTypes.STRING(50),
        allowNull: true,  // Type of reference entity, e.g., 'DonationCampaign', 'Invoice', 'TaxFiling'
    },
    details: {
        type: DataTypes.TEXT,  // Additional details about the action, for logging extra information
        allowNull: true,
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true,  // Store the IP address from which the action was made
    },
    device_info: {
        type: DataTypes.STRING(255),
        allowNull: true,  // Device or browser information (optional but useful for audits)
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: true,  // Location data, such as city or country (optional)
    },
    occurred_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Timestamp of when the event actually occurred
    },
}, {
    sequelize,
    modelName: 'AuditLog',
    tableName: 'audit_logs',
    timestamps: true,  // Includes createdAt and updatedAt for log tracking
    paranoid: true,    // Enable soft deletes for logs (records can be "deleted" but retained for audits)
});

module.exports = AuditLog;
