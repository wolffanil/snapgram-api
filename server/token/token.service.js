const jwt = require("jsonwebtoken");
const Token = require("./token.model.js");
const { promisify } = require("util");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateAccessToken(token) {
    const userData = await promisify(jwt.verify)(
      token,
      process.env.JWT_ACCESS_SECRET
    );
    return userData;
  }

  async validateRefreshToken(token) {
    const userData = await promisify(jwt.verify)(
      token,
      process.env.JWT_REFRESH_SECRET
    );
    return userData;
  }

  async saveToken(userId, refreshToken, dataDevice, ip) {
    const { fingerprint, browser, device, type, brand, model } = dataDevice;

    const token = await Token.create({
      userId,
      refreshToken,
      fingerprint,
      browser,
      model,
      type,
      brand,

      device,
      ip,
    });

    const sessionData = this.returnSessionData(token);

    return sessionData;
  }

  async removeToken(refreshToken) {
    await Token.deleteOne({ refreshToken });
  }

  async findToken({ refreshToken, hash }) {
    const tokenData = await Token.findOne({ refreshToken, fingerprint: hash });
    return tokenData;
  }

  returnSessionData(session) {
    return {
      id: session._id,
    };
  }
}

module.exports = new TokenService();
