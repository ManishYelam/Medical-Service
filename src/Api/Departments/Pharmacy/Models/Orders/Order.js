const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../Employees/User'); // Assuming User model is defined
const Pharmacy = require('../Pharmacy/Pharmacy'); // Assuming Pharmacy model is defined

class Order extends Model {}

Order.init(
  {
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
    pharmacy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pharmacy,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    order_description: {
      type: DataTypes.TEXT, // Allow a detailed description of the order items or instructions
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'confirmed',
        'packed',
        'shipped',
        'out_for_delivery',
        'delivered',
        'cancelled'
      ),
      defaultValue: 'pending', // Added more granular delivery statuses
      allowNull: false,
    },
    cancellation_reason: {
      type: DataTypes.STRING(255), // Reason for cancellation, if applicable
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.ENUM('paid', 'unpaid', 'failed', 'refunded'), // Enhanced to track various payment statuses
      defaultValue: 'unpaid',
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM(
        'credit_card',
        'debit_card',
        'cash_on_delivery',
        'upi',
        'net_banking'
      ),
      defaultValue: 'cash_on_delivery',
    },
    payment_gateway: {
      type: DataTypes.STRING(100), // Added for tracking the gateway used (e.g., Stripe, PayPal, etc.)
      allowNull: true,
    },
    transaction_id: {
      type: DataTypes.STRING(100), // Store the transaction ID for payment reconciliation
      allowNull: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.STRING(255), // Optional delivery address in case it's different from the user’s address
      allowNull: true,
    },
    delivery_notes: {
      type: DataTypes.TEXT, // Special instructions or delivery notes
      allowNull: true,
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estimated_delivery_time: {
      type: DataTypes.STRING(100), // Example: "2-3 business days"
      allowNull: true,
    },
    delivery_partner: {
      type: DataTypes.STRING(100), // Name of the delivery partner, if applicable
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER, // Allows the user to rate the order/delivery (1-5 stars)
      validate: {
        min: 1,
        max: 5,
      },
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT, // Optional feedback or comments from the user after order completion
      allowNull: true,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE, // Soft delete for cancelled or removed orders
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    paranoid: true, // Enables soft delete to track cancelled or removed orders without losing data
  }
);

module.exports = Order;
