const sendMail = require('../../Config/Setting/nodemailer.config');
const { registrationTemplate, passwordChangeTemplate, performanceTrackingTemplate, systemLogsTemplate, notificationTemplate, } = require('../EmailTemplets/Templates');
const { UserModel } = require('../Models/ModelOperator/DataModel');
// const models = require('../../Config/Database/centralModelLoader');

// const User = models.MAIN.User;

module.exports = {
  sendLaunchCodeEmail: async (userId, userName, userEmail, verificationUrl, otp) => {
    const user_Email = userEmail;
    const subject = 'Your Medical Service Launch Code';
    const template_Name = 'medicalLaunchCodeTemplate';
    const template_Data = {
      userId: userId, userName: userName, launchCode: otp, verificationUrl: verificationUrl
    };
    await sendMail(user_Email, subject, template_Name, template_Data);
  },

  sendVerificationEmail: async (userName, userEmail) => {
    const user_Email = userEmail;
    const subject = 'Email Verification Successful';
    const template_Name = 'verificationTemplate';
    const template_Data = { userName: userName };
    await sendMail(user_Email, subject, template_Name, template_Data);
  },

  sendResetPasswordCodeEmail: async (userId, userName, userEmail, verificationUrl, resetLink, otp) => {
    const user_Email = userEmail;
    const subject = 'Reset Your Password';
    const template_Name = 'sendResetPasswordTemplate';
    const template_Data = { userId, userName, launchCode: otp, verificationUrl, resetLink, };
    await sendMail(user_Email, subject, template_Name, template_Data);
  },

  sendPasswordChangeEmail: async (userId, userEmail, userName) => {
    const user_Email = userEmail;
    const subject = 'Your Password has been Changed';
    const template_Name = 'passwordChangeTemplate';
    const template_Data = { userId: userId, userName: userName };
    await sendMail(user_Email, subject, template_Name, template_Data);
  },

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

  uploadDocument: async (file, userId, uploadPath = 'uploads') => {
    const allowedFileTypes = ['pdf', 'docx', 'zip'];
    const fileExtension = path
      .extname(file.originalname)
      .toLowerCase()
      .substring(1);

    if (!allowedFileTypes.includes(fileExtension)) {
      throw new Error(
        'Invalid file type. Only PDF, DOCX, and ZIP files are allowed.'
      );
    }

    const fileName = `${userId}_${Date.now()}_${file.originalname}`;
    const fullPath = path.join(uploadPath, fileName);

    fs.writeFileSync(fullPath, file.buffer);

    const userEmail = user.email;
    const uploadLink = `${process.env.BASE_URL}/uploads/${fileName}`;
    const emailContent = `
    Hi there, your document has been successfully uploaded. 
    You can access it here: <a href="${uploadLink}">${uploadLink}</a>.
  `;
    await sendMail(userEmail, 'Document Uploaded Successfully', emailContent);

    return { fileName, uploadLink };
  },
};
