const Chat = require("../chat/chat.model");
const AppError = require("../utils/AppError");
const Message = require("./message.model");

class MessageService {
  async getAllMessages({ params }) {
    const { chatId } = params;

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "_id imageUrl name")
      .lean();

    return messages;
  }

  async createNewMessage({ body, user, next }) {
    const { chat, content } = body;

    if (!content || !chat) return next(new AppError("Неверные данные", 400));

    const message = await Message.create({
      sender: user.id,
      content,
      chat,
    });

    await Chat.findByIdAndUpdate(chat, { latestMessage: message });

    return message;
  }

  async deleteMesage({ messageId }) {
    await Message.findByIdAndDelete(messageId);

    return;
  }

  async editMessage({ messageId, text }) {
    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        text,
      },
      { new: true }
    );

    return message;
  }
}

module.exports = new MessageService();
