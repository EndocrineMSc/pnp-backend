const RefreshToken = require("../models/refreshToken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login_user = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).json({ message: "user does not exist" });
  }

  const correctPw = await bcrypt.compare(req.body.password, user.password);

  if (!correctPw) {
    return res.status(400).json({ message: "incorrect password" });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "10m",
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN);

  const rToken = new RefreshToken({
    refreshToken: refreshToken,
  });

  if (!(await RefreshToken.findOne({ refreshToken: refreshToken }))) {
    await rToken.save();
  }

  res.status(200).json({
    message: "user logged in",
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user._id,
  });
});
