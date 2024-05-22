const express = require("express");
const {
  getAllMessages,
  createNewMessage,
  editMessage,
  deleteMessage,
} = require("./message.contoller.js");
const protect = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.use(protect);

router.route("/:chatId").get(getAllMessages);

router.route("/").post(createNewMessage);

router.route("/:messageId").patch(editMessage);

router.route("/delete-message").delete(deleteMessage);

module.exports = router;
