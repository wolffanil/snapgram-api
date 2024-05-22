const catchAsync = require("../utils/catchAsync");
const notificationService = require("./notification.service");

class NotificationController {
  getMy = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const notifications = await notificationService.getMy({ userId });

    res.status(200).json({
      notifications,
    });
  });

  createNotification = catchAsync(async (req, res, next) => {
    const userId = rqe.user.id;
    const notification = await notificationService.createNotification({
      userId,
      body: req.body,
    });

    res.status(201).json({
      notification,
    });
  });
}

module.exports = new NotificationController();
