const { io } = require('../../Config/Setting/socket.config');

io.on('connection', (socket) => {
  socketLogger.info('Client connected', { id: socket.id });

  // Authentication (replace with actual logic)
  const authenticated = true; // Replace with actual authentication logic
  if (!authenticated) {
    socket.disconnect();
    socketLogger.warn('Client disconnected due to failed authentication', { id: socket.id });
    return;
  }

  // Event handlers
  require('./messageSocket')(socket); // Import message-related event handlers

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected', { id: socket.id });
  });
});

module.exports = io;













// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const notificationService = require('./services/notificationService');
// const chatService = require('./services/chatService');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: '*',  // Allow any origin for development; restrict in production
//     },
// });

// const PORT = process.env.PORT || 5000;

// // WebSocket Connection Handler
// io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id);

//     // Handle incoming chat messages
//     socket.on('sendMessage', async ({ userId, receiverId, message }) => {
//         try {
//             const chatMessage = await chatService.createMessage(userId, receiverId, message);
//             io.to(receiverId).emit('newMessage', chatMessage);  // Emit to the receiver
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     });

//     // Handle incoming notifications
//     socket.on('sendNotification', async ({ userId, message }) => {
//         try {
//             const notification = await notificationService.createNotification(userId, message, 'in-app');
//             io.to(userId).emit('newNotification', notification);  // Emit notification to the user
//         } catch (error) {
//             console.error('Error sending notification:', error);
//         }
//     });

//     // Handle client disconnect
//     socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.id);
//     });
// });

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// // });

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const jwt = require('jsonwebtoken');
// const chatService = require('./services/chatService');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: '*', // Allow any origin in development
//     },
// });

// // JWT Secret (for token validation)
// const JWT_SECRET = 'your_jwt_secret';

// // Middleware to verify JWT before establishing WebSocket connection
// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;  // Extract token sent during WebSocket connection

//     if (!token) {
//         return next(new Error('Authentication error: No token provided'));
//     }

//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return next(new Error('Authentication error: Invalid token'));
//         }

//         // Attach the decoded user info to the socket object
//         socket.user = decoded;
//         next();
//     });
// });

// // Handle WebSocket connections
// io.on('connection', (socket) => {
//     console.log(`User ${socket.user.username} connected`);

//     // Send message only if sender is authenticated
//     socket.on('sendMessage', async ({ receiverId, message }) => {
//         if (socket.user) {
//             try {
//                 const chatMessage = await chatService.createMessage(socket.user.id, receiverId, message);
//                 io.to(receiverId).emit('newMessage', chatMessage);  // Notify receiver about new message
//             } catch (error) {
//                 console.error('Error sending message:', error);
//             }
//         }
//     });

//     // Disconnect handler
//     socket.on('disconnect', () => {
//         console.log(`User ${socket.user.username} disconnected`);
//     });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
