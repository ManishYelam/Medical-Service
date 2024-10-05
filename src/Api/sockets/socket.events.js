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
