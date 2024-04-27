const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const RefreshToken = require("./models/refreshToken");

// Verify Token
exports.verifyToken = asyncHandler(async (req, res, next) => {
  // Get auth header value
  const accessHeader = req.headers["authorization"];
  const refreshToken = req.headers["refresh"];
  const accessToken = accessHeader && accessHeader.split(" ")[1];

  if (!accessToken) return res.sendStatus(403);

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err) {
      if (!refreshToken)
        return res
          .status(401)
          .json({ message: "no valid refresh token provided" });

      if (!(await RefreshToken.findOne({ refreshToken: refreshToken })))
        return res.status(401).json({ message: "refresh token not valid" });

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err)
          return res
            .status(401)
            .json({ message: "refresh token couldn't be verified" });

        const newAccessToken = jwt.sign(
          { id: user._id },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "10m",
          }
        );

        res.accessToken = newAccessToken;
      });
    }
    req.user = user;
    next();
  });
});
