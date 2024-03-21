const Note = require("../models/Note");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.note_list = asyncHandler(async (req, res) => {
  //ToDo
});
