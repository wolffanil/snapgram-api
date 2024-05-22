const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    imageUrl: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    repostText: String,
  },
  {
    timestamps: true,
  }
);

messageSchema.pre(/^find/, function (next) {
  this.where({ post: { $exist: true, $ne: null } }).populate("post");

  next();
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

module.exports = Message;
