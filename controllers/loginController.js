const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.login_user = asyncHandler(async (req, res) => {
  jwt.sign(req.body.user, "secretkey", (err, token) => {
    res.status(200).json({ token });
  });
});
