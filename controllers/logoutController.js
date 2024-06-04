const RefreshToken = require("../models/refreshToken");

const asyncHandler = require("express-async-handler");

exports.log_out = asyncHandler(async (req, res) => {
  await RefreshToken.deleteMany({ refreshToken: req.body.token });
  res.sendStatus(200);
});
