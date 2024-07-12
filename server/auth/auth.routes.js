const express = require("express");
const {
  register,
  refresh,
  login,
  logout,
  resetCode,
} = require("./auth.controller.js");
const protect = require("../middlewares/auth.middleware.js");
const session = require("../middlewares/session.middleware.js");
const verifyCode = require("../middlewares/verifyCode.middleware.js");

const router = express.Router();

router.use(session);

router.route("/register").post(verifyCode, register);

router.route("/login").post(verifyCode, login);

router.route("/logout").post(protect, logout);

router.route("/reset-code").post(resetCode);

router.route("/refresh").post(refresh);

module.exports = router;
