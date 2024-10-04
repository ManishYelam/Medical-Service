const { socketLogger } = require('../../Config/Setting/logger.config');

module.exports = (socket) => {
  // Handle messages
  socket.on('message', (message) => {
    try {
      socketLogger.info('Received message', { id: socket.id, message });
      socket.emit('message', `Echo: ${message}`);
    } catch (error) {
      socketLogger.error('Error handling message', { id: socket.id, error: error.message });
    }
  });

  // Broadcast example
  socket.on('broadcast', (message) => {
    try {
      socketLogger.info('Broadcasting message', { id: socket.id, message });
      socket.broadcast.emit('message', message);
    } catch (error) {
      socketLogger.error('Error broadcasting message', { id: socket.id, error: error.message });
    }
  });

  // Typing indicator example
  socket.on('typing', (room) => {
    socket.to(room).emit('typing', { id: socket.id });
    socketLogger.info('User typing', { id: socket.id, room });
  });

  // Room example
  socket.on('joinRoom', (room) => {
    try {
      socket.join(room);
      socketLogger.info('Client joined room', { id: socket.id, room });
    } catch (error) {
      socketLogger.error('Error joining room', { id: socket.id, room, error: error.message });
    }
  });

  socket.on('leaveRoom', (room) => {
    try {
      socket.leave(room);
      socketLogger.info('Client left room', { id: socket.id, room });
    } catch (error) {
      socketLogger.error('Error leaving room', { id: socket.id, room, error: error.message });
    }
  });

  socket.on('messageInRoom', (room, message) => {
    try {
      socketLogger.info('Sending message to room', { id: socket.id, room, message });
      socket.to(room).emit('message', message);
    } catch (error) {
      socketLogger.error('Error sending message to room', { id: socket.id, room, error: error.message });
    }
  });
};
