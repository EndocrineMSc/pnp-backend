const Location = require("../models/Location");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.location_list = asyncHandler(async (req, res) => {
  //ToDo
});
