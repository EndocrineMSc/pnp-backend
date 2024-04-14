const Location = require("../models/location");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.location_list = asyncHandler(async (req, res) => {
  const locations = await Location.find(
    { campaign_id: req.params.campaignId },
    "name _id"
  );
  res.status(200).json(locations);
});

exports.location_detail_get = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    res.status(404).json({ message: "Location couldn't be found" });
  }

  res.status(200).json(location);
});

exports.location_create_post = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be defined and shorter than 50 characters."),
  body("short_description")
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage("Short description must be shorter than 500 characters"),
  body("long_description").trim().escape(),

  asyncHandler(async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(400).json(error.array());
    }

    const location = new Location({
      name: req.body.name,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      campaign_id: req.params.campaignId,
      image: req.body.image,
    });

    await location.save();
    res.status(200).json(location);
  }),
];

exports.location_update_post = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be defined and shorter than 50 characters."),
  body("short_description")
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage("Short description must be shorter than 500 characters"),
  body("long_description").trim().escape(),

  asyncHandler(async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(400).json(error.array());
    }

    const location = new Location({
      name: req.body.name,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      campaign_id: req.params.campaignId,
      image: req.body.image,
      _id: req.params.id,
    });

    await Location.findByIdAndUpdate(req.params.id, location);
    res.status(200).json(location);
  }),
];

exports.location_delete_post = asyncHandler(async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ message: "Deleted Location with id: " + req.params.id });
});
