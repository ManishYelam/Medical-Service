const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order'); // Assuming Order model is defined
const User = require('./User'); // Assuming User model is defined

class Delivery extends Model {}

Delivery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    delivery_person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    delivery_person_name: {
      type: DataTypes.STRING(100), // Name of the delivery person
      allowNull: false,
    },
    delivery_person_contact: {
      type: DataTypes.STRING(15), // Contact number of the delivery person
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    delivery_latitude: {
      type: DataTypes.DECIMAL(10, 8), // Latitude for geolocation tracking
      allowNull: true,
    },
    delivery_longitude: {
      type: DataTypes.DECIMAL(11, 8), // Longitude for geolocation tracking
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'in_progress',
        'delivered',
        'failed',
        're_attempt'
      ),
      defaultValue: 'pending', // More granular status including failed and re-attempt
      allowNull: false,
    },
    failure_reason: {
      type: DataTypes.STRING(255), // Reason for failed delivery, if applicable
      allowNull: true,
    },
    re_attempts: {
      type: DataTypes.INTEGER, // Number of re-attempts for failed deliveries
      defaultValue: 0,
      allowNull: false,
    },
    estimated_delivery_time: {
      type: DataTypes.DATE, // Initial estimated delivery time
      allowNull: true,
    },
    actual_delivery_time: {
      type: DataTypes.DATE, // Actual delivery time once the delivery is completed
      allowNull: true,
    },
    delivery_fee: {
      type: DataTypes.DECIMAL(10, 2), // The fee for the delivery service
      allowNull: true,
    },
    tip: {
      type: DataTypes.DECIMAL(10, 2), // Any additional tip provided to the delivery person
      allowNull: true,
    },
    delay_reason: {
      type: DataTypes.STRING(255), // Reason for delays, if applicable
      allowNull: true,
    },
    delivery_notes: {
      type: DataTypes.TEXT, // Notes or instructions for delivery (e.g., "Leave at the door")
      allowNull: true,
    },
    notification_log: {
      type: DataTypes.TEXT, // Log of any notifications sent to the customer or delivery person
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER, // Rating for the delivery service (1-5)
      validate: {
        min: 1,
        max: 5,
      },
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT, // Feedback from the customer about the delivery service
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Delivery',
    tableName: 'deliveries',
    timestamps: true,
    paranoid: true, // Soft delete enabled for better tracking and historical records
  }
);

module.exports = Delivery;
