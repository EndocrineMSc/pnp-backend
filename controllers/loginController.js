const RefreshToken = require("../models/refreshToken");

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.login_user = asyncHandler(async (req, res) => {
  const { _id, username } = req.user;
  const user = { _id, username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: "10m",
  });

  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);

  const rToken = new RefreshToken({
    refreshToken: refreshToken,
  });

  if (!(await RefreshToken.findOne({ refreshToken: refreshToken }))) {
    await rToken.save();
  }

  res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
});
