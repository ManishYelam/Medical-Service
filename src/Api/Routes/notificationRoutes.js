const express = require('express');
const notificationController = require('../Controllers/NotificationController');
const authMiddleware = require('../middleware/authMiddleware');  // Assuming you have authentication middleware

const router = express.Router();

// Get user notifications
router.get('/notifications/:userId', authMiddleware, notificationController.getUserNotifications);

// Mark notification as read
router.put('/notifications/:notificationId/read', authMiddleware, notificationController.markNotificationAsRead);

// Create notification (used internally, but can be exposed as needed)
router.post('/notifications', authMiddleware, notificationController.createNotification);

// Delete a notification
router.delete('/notifications/:notificationId', authMiddleware, notificationController.deleteNotification);

module.exports = router;





// 5. Usage Example: Creating Notifications
// You can trigger notifications from different parts of your system, for example when a user completes an action, receives a message, or as part of a scheduled job.

// Example: Sending a Notification When a User Registers
// In your authController.js (or wherever user registration is handled):

// javascript
// Copy code
// const notificationService = require('../services/notificationService');

// // After user registration
// await notificationService.createNotification(
//     user.id,  // The user ID
//     'Welcome to the platform! Your account has been successfully created.',
//     'in-app'  // Type can be 'email' or 'in-app'
// );
// 6. Email Integration for Notifications
// If you need to send email notifications as part of the process, you can integrate with the EmailService:

// javascript
// Copy code
// // When a user receives a notification, also send an email
// await emailService.sendEmail(
//     user.email,
//     'New Notification',
//     'You have a new notification: Welcome to the platform!'
// );