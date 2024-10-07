const Notification = require('../Models');
const emailService = require('./emailService');  // Reuse the email service

class NotificationService {
    // Create a new notification (email or in-app)
    async createNotification(userId, message, type) {
        try {
            const notification = await Notification.create({
                userId,
                message,
                type,
            });

            // Send email notification if the type is email
            if (type === 'email') {
                const user = await User.findByPk(userId);  // Assuming User model exists
                if (user) {
                    await emailService.sendEmail(
                        user.email,
                        'New Notification',
                        message
                    );
                }
            }

            return notification;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw new Error('Could not create notification');
        }
    }

    // Get all notifications for a user
    async getUserNotifications(userId) {
        try {
            const notifications = await Notification.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']],
            });
            return notifications;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw new Error('Could not fetch notifications');
        }
    }

    // Mark a notification as read
    async markAsRead(notificationId) {
        try {
            const notification = await Notification.findByPk(notificationId);
            if (!notification) {
                throw new Error('Notification not found');
            }

            notification.isRead = true;
            await notification.save();

            return notification;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw new Error('Could not mark notification as read');
        }
    }

    // Delete a notification
    async deleteNotification(notificationId) {
        try {
            const result = await Notification.destroy({
                where: { id: notificationId }
            });
            return result;
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw new Error('Could not delete notification');
        }
    }
}

module.exports = new NotificationService();





















const Notification = require('../models/notification');
const emailService = require('./emailService');  // Reuse email service for email notifications

class NotificationService {
    // Create a notification and emit via WebSocket if needed
    async createNotification(userId, message, type) {
        try {
            const notification = await Notification.create({
                userId,
                message,
                type,
            });

            // Optionally send email notification
            if (type === 'email') {
                const user = await User.findByPk(userId);
                if (user) {
                    await emailService.sendEmail(user.email, 'New Notification', message);
                }
            }

            return notification;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw new Error('Could not create notification');
        }
    }

    // Retrieve all notifications for a user
    async getUserNotifications(userId) {
        try {
            const notifications = await Notification.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']],
            });
            return notifications;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw new Error('Could not fetch notifications');
        }
    }
}

module.exports = new NotificationService();
....................................





















import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  // Your server URL

const App = () => {
    const [messages, setMessages] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Listen for new messages
        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Listen for new notifications
        socket.on('newNotification', (notification) => {
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });

        return () => {
            socket.off('newMessage');
            socket.off('newNotification');
        };
    }, []);

    const sendMessage = (userId, receiverId, message) => {
        socket.emit('sendMessage', { userId, receiverId, message });
    };

    const sendNotification = (userId, message) => {
        socket.emit('sendNotification', { userId, message });
    };

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.message}</li>
                ))}
            </ul>

            <h2>Notifications</h2>
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index}>{notif.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;





io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    // Validate JWT token here
    if (isValidToken(token)) {
        return next();
    }
    return next(new Error('Authentication error'));
});





const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const chatService = require('./services/chatService');
const notificationService = require('./services/notificationService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Allow any origin for development; restrict in production
    },
});

// Secret for JWT verification
const JWT_SECRET = 'your_jwt_secret';

// Middleware to authenticate WebSocket connections
io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Authentication error'));
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Authentication error'));
        }

        // Attach the decoded user information to the socket
        socket.user = decoded;
        next();
    });
});

// WebSocket connection handler after successful authentication
io.on('connection', (socket) => {
    console.log('User connected:', socket.user.username);  // Now socket.user contains the decoded user

    // Handle incoming chat messages
    socket.on('sendMessage', async ({ receiverId, message }) => {
        try {
            const chatMessage = await chatService.createMessage(socket.user.id, receiverId, message);
            io.to(receiverId).emit('newMessage', chatMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Handle notifications
    socket.on('sendNotification', async ({ message }) => {
        try {
            const notification = await notificationService.createNotification(socket.user.id, message, 'in-app');
            io.to(socket.user.id).emit('newNotification', notification);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.user.username);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
