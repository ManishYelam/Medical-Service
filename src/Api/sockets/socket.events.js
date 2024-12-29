const { authenticateSocket } = require('../../middleware/authMiddleware');
const { saveMessage, sendMessageToUser, } = require('../../services/messageService');
const { sendNotificationToUser, } = require('../../services/notificationService');
const { scheduleTask, cancelTask } = require('../../services/scheduleService');

const connectionHandler = async (socket) => {
  try {
    const token = socket.handshake.query.token;
    const isAuthenticated = await authenticateSocket(token);

    if (!isAuthenticated) {
      socket.emit('unauthorized', 'Unauthorized connection');
      socket.disconnect();
      console.log('Socket connection rejected: Unauthorized');
      return;
    }

    console.log('Socket connected successfully');

    socket.on('message', (data) => messageHandler(socket, data));
    socket.on('notification', (data) => notificationHandler(socket, data));
    socket.on('scheduleTask', (data) => scheduleTaskHandler(socket, data));
    socket.on('disconnect', (reason) => disconnectionHandler(socket, reason));
  } catch (error) {
    socket.emit('error', { message: 'Failed to establish socket connection' });
    console.error('Error during socket connection:', error);
  }
};

const messageHandler = async (socket, data) => {
  try {
    switch (data.type) {
      case 'sendMessage':
        await saveMessage(data);
        sendMessageToUser(socket, data);
        break;
      default:
        socket.emit('error', { message: 'Unknown message type' });
        break;
    }
  } catch (error) {
    socket.emit('error', { message: 'Failed to process message' });
    console.error('Error handling message:', error);
  }
};

const notificationHandler = async (socket, data) => {
  try {
    if (data.type === 'sendNotification') {
      await sendNotificationToUser(socket, data);
    } else {
      socket.emit('error', { message: 'Unknown notification type' });
    }
  } catch (error) {
    socket.emit('error', { message: 'Failed to send notification' });
    console.error('Error sending notification:', error);
  }
};

const scheduleTaskHandler = async (socket, data) => {
  try {
    switch (data.action) {
      case 'schedule':
        await scheduleTask(data);
        socket.emit('taskScheduled', {
          message: 'Task scheduled successfully',
        });
        break;
      case 'cancel':
        await cancelTask(data);
        socket.emit('taskCancelled', {
          message: 'Task cancelled successfully',
        });
        break;
      default:
        socket.emit('error', { message: 'Unknown schedule action' });
        break;
    }
  } catch (error) {
    socket.emit('error', { message: 'Failed to handle scheduled task' });
    console.error('Error handling scheduled task:', error);
  }
};

const disconnectionHandler = (socket, reason) => {
  console.log(`Socket disconnected due to: ${reason}`);
};

module.exports = { connectionHandler };
