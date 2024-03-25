const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshToken");

const asyncHandler = require("express-async-handler");

exports.refresh_token = asyncHandler(async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) res.sendStatus(401);
  if (!(await RefreshToken.findOne({ refreshToken: refreshToken })))
    res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) res.sendStatus(403);

    const { _id, username } = user;
    const truncUser = { _id, username };

    const accessToken = jwt.sign(truncUser, process.env.ACCESS_TOKEN, {
      expiresIn: "10m",
    });
    res.json(accessToken);
  });
});

exports.quick_refresh = asyncHandler(async (refreshToken) => {
  if (!refreshToken) return null;
  if (!(await RefreshToken.findOne({ refreshToken: refreshToken })))
    return null;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return null;

    const { _id, username } = user;
    const truncUser = { _id, username };

    const accessToken = jwt.sign(truncUser, process.env.ACCESS_TOKEN, {
      expiresIn: "10m",
    });
    return accessToken;
  });
});
