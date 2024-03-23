const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.signup_user = [
  body("username")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Username must not be empty"),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 8, max: 60 })
    .withMessage(
      "Password must be longer than 8 and shorter than 60 characters"
    ),

  asyncHandler(async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(400).json(error.array());
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ user });
  }),
];
