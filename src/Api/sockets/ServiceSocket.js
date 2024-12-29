const { User } = require('../models');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const sendMessageToUser = async (socket, data) => {
  try {
    const { recipientId, message } = data;
    const recipient = await User.findByPk(recipientId);

    if (!recipient) {
      socket.emit('error', { message: 'Recipient not found' });
      return;
    }

    // Here, you can save the message to the database if needed
    socket.emit('messageReceived', { recipientId, message });
    recipient.socket.emit('newMessage', { senderId: socket.userId, message });
  } catch (error) {
    socket.emit('error', { message: 'Failed to send message' });
    console.error('Error sending message:', error);
  }
};

const saveMessage = async (data) => {
  try {
    // Save message logic in database if required
    // Example: Message.create({ userId: data.senderId, recipientId: data.recipientId, message: data.message });

    return true; // Return true after saving message
  } catch (error) {
    console.error('Error saving message:', error);
    return false;
  }
};

const sendNotificationToUser = async (socket, data) => {
  try {
    const { recipientId, notificationMessage } = data;
    const recipient = await User.findByPk(recipientId);

    if (!recipient) {
      socket.emit('error', { message: 'Recipient not found for notification' });
      return;
    }

    // Sending a notification (email example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: recipient.email,
      subject: 'New Notification',
      text: notificationMessage,
    };

    await transporter.sendMail(mailOptions);
    socket.emit('notificationSent', { recipientId, notificationMessage });
    console.log('Notification sent to user', recipientId);
  } catch (error) {
    socket.emit('error', { message: 'Failed to send notification' });
    console.error('Error sending notification:', error);
  }
};

const scheduleTask = async (data) => {
  try {
    const { taskName, cronExpression, userId } = data;

    // Schedule task using node-cron
    cron.schedule(cronExpression, () => {
      console.log(`Scheduled task "${taskName}" triggered for user: ${userId}`);
      // Handle task logic here (e.g., sending message, email, etc.)
    });

    console.log(
      `Task "${taskName}" scheduled with cron expression: ${cronExpression}`
    );
  } catch (error) {
    console.error('Error scheduling task:', error);
  }
};

const cancelTask = async (data) => {
  try {
    const { taskName } = data;

    // If you save task schedules in a database, you can cancel the task by checking taskName
    console.log(`Task "${taskName}" has been cancelled`);
  } catch (error) {
    console.error('Error cancelling task:', error);
  }
};

module.exports = {
  sendMessageToUser,
  saveMessage,
  sendNotificationToUser,
  scheduleTask,
  cancelTask,
};
