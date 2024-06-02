const Like = require("../like/like.model");
const Token = require("../token/token.model");
const AppError = require("../utils/AppError");
const User = require("./user.model");

class UserService {
  async getUserById({ userId }) {
    const user = await User.findById(userId).lean().populate("posts");

    return user;
  }

  async getUserLikedPosts({ userId }) {
    const likedPosts = await Like.find({
      userId,
      commentId: { $in: [null, undefined] },
    })
      .lean()
      .populate("postId")
      .exec();

    const posts = likedPosts?.map((item) => item.postId);

    return posts;
  }

  async updateUser({ userId, body, next }) {
    const { imageUrl, bio, name, nick } = body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        imageUrl,
        bio,
        name,
        nick,
      },
      {
        new: true,
      }
    );

    if (!user) return next(new AppError("пользователь не найден", 404));

    return user;
  }

  async getUsers({ query }) {
    const q = query.q;

    let users;

    if (q) {
      users = await User.searchUsers(q);
    } else {
      users = await User.find()
        .limit(10)
        .sort({ createdAt: "desc" })
        .lean()
        .select("-password -bio -email");
    }

    return users;
  }

  async getMyTokens({ userId }) {
    const tokens = await Token.find({ userId }).sort({ updatedAt: -1 }).lean();

    return tokens;
  }

  async deleteToken({ tokenId, userId, next }) {
    const token = await Token.findOneAndDelete({
      _id: tokenId,
      userId,
    }).lean();

    if (!token) return next(new AppError("Токен не был найден", 404));

    return;
  }
}

module.exports = new UserService();
