const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Verify Token
exports.verifyToken = asyncHandler(async (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token == null) return res.sendStatus(403);

  jwt.verify(
    token,
    "GUC5npe&J&SFbT5nL4@ZpW!fzGpKxR%hM@R7vT6qi^6n5$ELz^VpHWRe",
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
});
