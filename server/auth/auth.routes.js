const express = require("express");
const { signup, login, logout, isLogged } = require("./auth.controller.js");
const protect = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.use(protect);

router.route("/register").post(signup);

router.route("/login").post(login);

router.route("/logout").post(protect, logout);

router.route("/check").post(isLogged);

module.exports = router;
