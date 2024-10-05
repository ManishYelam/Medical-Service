const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = {
  sendEmail: async (to, subject, text) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}`, error);
    }
  },
};

const emailHelper = require('./emailHelper');

// Send a simple email
emailHelper.sendEmail('recipient@example.com', 'Hello!', 'This is a test email');

// Send an email with an HTML template
const template = '<h1>Welcome</h1><p>Thanks for joining!</p>';
emailHelper.sendEmailWithTemplate('recipient@example.com', 'Welcome!', template);

const emailHelper = require('./emailHelper');

// Send a simple email
emailHelper.sendEmail('recipient@example.com', 'Hello!', 'This is a test email');

// Send an email with an HTML template
const template = '<h1>Welcome</h1><p>Thanks for joining!</p>';
emailHelper.sendEmailWithTemplate('recipient@example.com', 'Welcome!', template);

