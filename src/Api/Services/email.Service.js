const sendMail = require('../../config/setting/nodemailer.config');
const {
  registrationTemplate,
  passwordChangeTemplate,
  performanceTrackingTemplate,
  systemLogsTemplate,
  notificationTemplate,
} = require('../EmailTemplets/templates');
const { User } = require('../models');

module.exports = {
  // Send registration email
  sendRegistrationEmail: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const subject = 'Welcome to [Your App Name] - Verify Your Email';
    const html = registrationTemplate(
      user.name,
      'http://example.com/verify?token=abc123'
    );
    await sendMail(user.email, subject, html);
  },
  // Send password change email
  sendPasswordChangeEmail: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const subject = 'Password Change Confirmation';
    const html = passwordChangeTemplate(user.name);
    await sendMail(user.email, subject, html);
  },
  // Send performance tracking email
  sendPerformanceTrackingEmail: async (userId, data) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const subject = 'Performance Tracking Report';
    const html = performanceTrackingTemplate(data);
    await sendMail(user.email, subject, html);
  },
  // Send system logs email
  sendSystemLogsEmail: async (userId, logData) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const subject = 'System Logs Report';
    const html = systemLogsTemplate(logData);
    await sendMail(user.email, subject, html);
  },
  // Send generic notification email
  sendNotificationEmail: async (userId, title, content) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const subject = title;
    const html = notificationTemplate(title, content);
    await sendMail(user.email, subject, html);
  },
};
