const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const RefreshToken = require("./models/refreshToken");

// Verify Token
exports.verifyToken = asyncHandler(async (req, res, next) => {
  // Get auth header value
  const accessHeader = req.headers["authorization"];
  const refreshHeader = req.headers["refresh"];
  const accessToken = accessHeader && accessHeader.split(" ")[1];
  const refreshToken = refreshHeader && refreshHeader.split(" ")[1];

  if (!accessToken) return res.sendStatus(403);

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err) {
      if (!refreshToken) return null;

      if (!(await RefreshToken.findOne({ refreshToken: refreshToken })))
        return null;

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return null;

        const { _id, username } = user;
        const truncUser = { _id, username };

        const newAccessToken = jwt.sign(truncUser, process.env.ACCESS_TOKEN, {
          expiresIn: "10m",
        });

        res.status(401).json(newAccessToken);
      });
    } else {
      req.user = user;
      next();
    }
  });
});
