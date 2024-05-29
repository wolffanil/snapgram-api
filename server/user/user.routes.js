const express = require("express");
const {
  getUserById,
  getUserLikedPosts,
  updateUser,
  getUsers,
  deleteToken,
  getMyTokens,
} = require("./user.controller.js");

const saveRouter = require("../save/save.routes.js");
const protect = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.use(protect);

router.use("/:userId/saves", saveRouter);

router.route("/search").get(getUsers);

router.route("/liked-posts").get(getUserLikedPosts);

router.route("/update-profile").patch(updateUser);

router.route("/:userId").get(getUserById);

router.route("/").get(getUsers);

router.route("/deleteMyToken/:tokenId").delete(deleteToken);

router.route("/my-tokens").get(getMyTokens);

module.exports = router;
