const express = require("express");
const { register, refresh, login, logout } = require("./auth.controller.js");
const protect = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(protect, logout);

router.route("/refresh").post(refresh);

module.exports = router;
