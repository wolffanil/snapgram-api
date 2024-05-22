const express = require("express");
const protect = require("../middlewares/auth.middleware");
const { getMy, createNotification } = require("./notification.controller.js");

const router = express.Router();

router.use(protect);

router.route("/get-my").get(getMy);

router.route("/").post(createNotification);

module.exports = router;
