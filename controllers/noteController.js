const Note = require("../models/note");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.note_list = asyncHandler(async (req, res) => {
  const notes = await Note.find(
    { campaign_id: req.body.campaignId },
    "name date _id"
  ).exec();
  res.status(200).json(notes);
});

exports.note_detail_get = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404).json({ message: "Note couldn't be found" });
  }

  res.status(200).json(note);
});

exports.note_create_post = [
  body("name").trim().escape().isLength({ min: 1, max: 50 }),
  body("date")
    .trim()
    .escape()
    .optional({ values: "falsy" })
    .isISO8601()
    .isDate()
    .withMessage("Wrong date format"),

  asyncHandler(async (req, res) => {
    const error = validationResult();

    if (!error.isEmpty()) {
      res.status(400).json(error.array());
    }

    const note = new Note({
      name: req.body.name,
      date: req.body.date ? req.body.date : new Date(),
      text: req.body.text,
      campaign_id: req.params.campaignId,
    });

    note.save();
    res.status(200).json(note);
  }),
];

exports.note_update_post = [
  body("name").trim().escape().isLength({ min: 1, max: 50 }),
  body("date")
    .trim()
    .escape()
    .optional({ values: "falsy" })
    .isISO8601()
    .isDate()
    .withMessage("Wrong date format"),

  asyncHandler(async (req, res) => {
    const error = validationResult();

    if (!error.isEmpty()) {
      res.status(400).json(error.array());
    }

    const note = new Note({
      name: req.body.name,
      date: req.body.date ? req.body.date : new Date(),
      text: req.body.text,
      campaign_id: req.params.campaignId,
      _id: req.params.id,
    });

    await Note.findByIdAndUpdate(req.params.id, note);
    res.status(200).json(note);
  }),
];

exports.note_delete_post = asyncHandler(async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted note with id: " + req.params.id });
});
