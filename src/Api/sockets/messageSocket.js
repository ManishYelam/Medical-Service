
module.exports = (socket) => {
  // Handle messages
  socket.on('message', (message) => {
    try {
      console.log('Received message', { id: socket.id, message });
      socket.emit('message', `Echo: ${message}`);
    } catch (error) {
      console.error('Error handling message', { id: socket.id, error: error.message });
    }
  });

  // Broadcast example
  socket.on('broadcast', (message) => {
    try {
      console.log('Broadcasting message', { id: socket.id, message });
      socket.broadcast.emit('message', message);
    } catch (error) {
      console.error('Error broadcasting message', { id: socket.id, error: error.message });
    }
  });

  // Typing indicator example
  socket.on('typing', (room) => {
    socket.to(room).emit('typing', { id: socket.id });
    console.log('User typing', { id: socket.id, room });
  });

  // Room example
  socket.on('joinRoom', (room) => {
    try {
      socket.join(room);
      console.log('Client joined room', { id: socket.id, room });
    } catch (error) {
      console.error('Error joining room', { id: socket.id, room, error: error.message });
    }
  });

  socket.on('leaveRoom', (room) => {
    try {
      socket.leave(room);
      console.log('Client left room', { id: socket.id, room });
    } catch (error) {
      console.error('Error leaving room', { id: socket.id, room, error: error.message });
    }
  });

  socket.on('messageInRoom', (room, message) => {
    try {
      console.log('Sending message to room', { id: socket.id, room, message });
      socket.to(room).emit('message', message);
    } catch (error) {
      console.error('Error sending message to room', { id: socket.id, room, error: error.message });
    }
  });
};
