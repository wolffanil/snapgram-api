const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const messageService = require("./message.service");

class MessageController {
  getAllMessages = catchAsync(async (req, res, next) => {
    const params = req.params;

    const messages = await messageService.getAllMessages({ params });

    res.status(200).json(messages);
  });

  createNewMessage = catchAsync(async (req, res, next) => {
    const body = req.body;
    const user = req.user;

    const message = await messageService.createNewMessage({
      body,
      user,
      next,
    });

    res.status(201).json(message);
  });

  editMessage = catchAsync(async (req, res, next) => {
    const text = req.body.text;
    const messageId = req.params.messageId;

    const message = await messageService.editMessage({ messageId, text });

    res.status(200).json(message);
  });

  deleteMessage = catchAsync(async (req, res, next) => {
    const messageId = req.params.messageId;

    await messageService.deleteMesage(messageId);

    res.status(204).json({
      status: "success",
    });
  });

  readyMessages = catchAsync(async (req, res, next) => {
    const body = req.body;

    const response = await messageService.readMessages({ body });

    if (!response) return next(new AppError("something went wrong", 500));

    res.status(200).json({
      status: "success",
    });
  });
}

module.exports = new MessageController();
