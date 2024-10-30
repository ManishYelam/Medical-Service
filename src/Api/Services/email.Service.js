const sendMail = require('../../Config/Setting/nodemailer.config');
const { registrationTemplate, passwordChangeTemplate, performanceTrackingTemplate, systemLogsTemplate, notificationTemplate, } = require('../EmailTemplets/Templates');
const { User } = require('../Models/Association');

module.exports = {
  // Send registration email
  sendRegistrationEmail: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    const subject = 'Welcome to [Your App Name] - Verify Your Email';
    const html = registrationTemplate(
      user.name,
      'http:/localhost:5000/verify?token=abc123'
    );
    await sendMail(user.email, subject, html);
  },

  sendResetPasswordEmail: async (user, token) => {
    const resetLink = `http://localhost:5000/reset-password?token=${token}`;
    return await sendMail(user.email, 'Reset Your Password', 'resetPasswordTemplate', { name: user.name, resetLink }
    );
  },

  sendVerificationEmail: async (userName, userEmail) => {
    const emailContent = await verificationTemplate(userName);
    await sendEmail(userEmail, 'Email Verification Successful', emailContent);
  },
  sendOtpEmail: async (userId, userName, userEmail, otp) => {
    const user_Email = userEmail;
    const subject = 'Your OTP Code';
    const template_Name = 'otpTemplate';
    const template_Data = { userId: userId, userName: userName };
    await sendMail(user_Email, subject, template_Name, template_Data);
  },
  sendPasswordChangeConfirmation: async (userName, userEmail) => {
    const emailContent = await passwordChangeTemplate(userName);
    await sendEmail(userEmail, 'Password Change Confirmation', emailContent);
  },

  sendPasswordChangeEmail: async (userId, userEmail, userName) => {
    const user_Email = userEmail;
    const subject = 'Your Password has been Changed';
    const template_Name = 'passwordChangeTemplate';
    const template_Data = { userId: userId, userName: userName };
    await sendMail(user_Email, subject, template_Name, template_Data);
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
