const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshToken");

const asyncHandler = require("express-async-handler");

exports.refresh_token = asyncHandler(async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) res.sendStatus(401);
  if (!(await RefreshToken.findOne({ refreshToken: refreshToken })))
    res.sendStatus(403);

  jwt.verify(
    refreshToken,
    "J7b33B3BE9@n&aX#gLzWrbk$X38Q8*xv9%*ebT97Ke8U@5%WGYH4f$UP",
    (err, user) => {
      if (err) res.sendStatus(403);

      const { _id, username } = user;
      const truncUser = { _id, username };

      const accessToken = jwt.sign(
        truncUser,
        "GUC5npe&J&SFbT5nL4@ZpW!fzGpKxR%hM@R7vT6qi^6n5$ELz^VpHWRe",
        { expiresIn: "1d" }
      );
      res.json(accessToken);
    }
  );
});
