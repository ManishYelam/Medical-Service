const { sendMessageToUser, saveMessage, sendNotificationToUser, scheduleTask, cancelTask, } = require('../services/onemessageService');

const messageController = {
    sendMessage: async (req, res) => {
        try {
            const { recipientId, message } = req.body;
            const data = { recipientId, message };

            const messageSaved = await saveMessage(data);
            if (messageSaved) {
                await sendMessageToUser(req.socket, data);
                res.status(200).json({ message: 'Message sent successfully' });
            } else {
                res.status(500).json({ message: 'Failed to save message' });
            }
        } catch (error) {
            console.error('Error in sendMessage:', error);
            res
                .status(500)
                .json({ message: 'Failed to send message', error: error.message });
        }
    },
};

const notificationController = {
    sendNotification: async (req, res) => {
        try {
            const { recipientId, notificationMessage } = req.body;
            const data = { recipientId, notificationMessage };

            await sendNotificationToUser(req.socket, data);
            res.status(200).json({ message: 'Notification sent successfully' });
        } catch (error) {
            console.error('Error in sendNotification:', error);
            res
                .status(500)
                .json({ message: 'Failed to send notification', error: error.message });
        }
    },

    scheduleTask: async (req, res) => {
        try {
            const { taskName, cronExpression, userId } = req.body;
            const data = { taskName, cronExpression, userId };

            await scheduleTask(data);
            res
                .status(200)
                .json({ message: `Task "${taskName}" scheduled successfully` });
        } catch (error) {
            console.error('Error in scheduleTask:', error);
            res
                .status(500)
                .json({ message: 'Failed to schedule task', error: error.message });
        }
    },

    cancelTask: async (req, res) => {
        try {
            const { taskName } = req.body;
            const data = { taskName };

            await cancelTask(data);
            res
                .status(200)
                .json({ message: `Task "${taskName}" cancelled successfully` });
        } catch (error) {
            console.error('Error in cancelTask:', error);
            res
                .status(500)
                .json({ message: 'Failed to cancel task', error: error.message });
        }
    },
};

module.exports = { messageController, notificationController };
