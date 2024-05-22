const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      required: true,
      enum: ["like", "save", "comment", "repost"],
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

module.exports = Notification;
