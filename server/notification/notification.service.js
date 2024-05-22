const Notification = require("./notification.model");

class NotificationService {
  async getMy({ userId }) {
    const notifications = await Notification.find({ to: userId })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    return notifications;
  }

  async createNotification({ userId, body }) {
    const { to, type, postId } = body;

    const notification = await Notification.create({
      user: userId,
      to,
      type,
      postId,
    });

    return notification;
  }
}

module.exports = new NotificationService();
