const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const tokenRefresh = require("./controllers/tokenRefreshController");

// Verify Token
exports.verifyToken = asyncHandler(async (req, res, next) => {
  // Get auth header value
  const accessHeader = req.headers["authorization"];
  const refreshHeader = req.headers["refresh"];
  const accessToken = accessHeader && accessHeader.split(" ")[1];
  const refreshToken = refreshHeader && refreshHeader.split(" ")[1];

  if (!accessToken) return res.sendStatus(403);

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return;
    req.user = user;
    next();
  });

  if (!refreshToken) return res.sendStatus(403);

  const newAccessToken = tokenRefresh.quick_refresh(refreshToken);

  if (!newAccessToken) return res.sendStatus(403);

  res.status(401).json(newAccessToken);
});
