const Chat = require('../Models/Chat');

class ChatService {
    // Create a new chat message
    async createMessage(senderId, receiverId, message) {
        try {
            const chatMessage = await Chat.create({
                senderId,
                receiverId,
                message,
            });
            return chatMessage;
        } catch (error) {
            console.error('Error creating chat message:', error);
            throw new Error('Could not send message');
        }
    }

    // Get chat history between two users
    async getChatHistory(userId, receiverId) {
        try {
            const messages = await Chat.findAll({
                where: {
                    [Op.or]: [
                        { senderId: userId, receiverId },
                        { senderId: receiverId, receiverId: userId },
                    ],
                },
                order: [['createdAt', 'ASC']],
            });
            return messages;
        } catch (error) {
            console.error('Error fetching chat history:', error);
            throw new Error('Could not retrieve chat history');
        }
    }
}

module.exports = new ChatService();
