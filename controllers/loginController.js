const RefreshToken = require("../models/refreshToken");

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.login_user = asyncHandler(async (req, res) => {
  const { _id, username } = req.user;
  const user = { _id, username };

  const accessToken = jwt.sign(
    user,
    "GUC5npe&J&SFbT5nL4@ZpW!fzGpKxR%hM@R7vT6qi^6n5$ELz^VpHWRe",
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    user,
    "J7b33B3BE9@n&aX#gLzWrbk$X38Q8*xv9%*ebT97Ke8U@5%WGYH4f$UP"
  );

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
