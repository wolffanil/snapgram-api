const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { generateCode } = require("../utils/generateCode");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please tell us your name!"],
    },
    nick: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Plaase provide your email"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    imageUrl: {
      type: String,
      default: "upload/profile/default.svg",
    },
    password: {
      type: String,
      require: [true, "Please provide a password"],
      select: false,
    },
    bio: {
      type: String,
      maxLength: 1024,
    },
    isOnline: {
      type: Boolean,
      default: true,
    },
    verificationCode: String,
    codeExpiry: Date,
    passwordResetExpires: Date,
    passwordResetCode: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "creator",
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createCode = function () {
  const code = generateCode();

  this.verificationCode = crypto
    .createHash("sha256")
    .update(String(code))
    .digest("hex");

  this.codeExpiry = Date.now() + 10 * 60 * 1000;

  return code;
};

userSchema.statics.searchUsers = async function (searchTerm) {
  const reg = new RegExp(searchTerm, "i");

  return await this.find({
    $or: [
      { name: { $regex: reg } },
      { nick: { $regex: reg } },
      { email: { $regex: reg } },
    ],
  })
    .lean()
    .select("-password -bio -email");
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
