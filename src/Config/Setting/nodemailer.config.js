const nodemailer = require('nodemailer');
const emailTemplates = require('../../Api/EmailTemplets/Templates');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, templateName, templateData, attachments = []) => {
  try {
    const html = await emailTemplates[templateName](...templateData);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html, 
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} with subject "${subject}". Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Failed to send email to ${to} with subject "${subject}". Error: ${error.message}`);
    throw error; 
  }
};

module.exports = sendMail;
