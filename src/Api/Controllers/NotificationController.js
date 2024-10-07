const notificationService = require('../services/notificationService');

class NotificationController {
    // Get all notifications for a user
    async getUserNotifications(req, res) {
        const { userId } = req.params;
        try {
            const notifications = await notificationService.getUserNotifications(userId);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Mark notification as read
    async markNotificationAsRead(req, res) {
        const { notificationId } = req.params;
        try {
            const notification = await notificationService.markAsRead(notificationId);
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Create a new notification (for internal use, e.g., sending notifications)
    async createNotification(req, res) {
        const { userId, message, type } = req.body;
        try {
            const notification = await notificationService.createNotification(userId, message, type);
            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete a notification
    async deleteNotification(req, res) {
        const { notificationId } = req.params;
        try {
            const result = await notificationService.deleteNotification(notificationId);
            if (result) {
                res.status(200).json({ message: 'Notification deleted successfully' });
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new NotificationController();
