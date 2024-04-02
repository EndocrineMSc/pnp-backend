const GameItem = require("../models/item");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_list = asyncHandler(async (req, res) => {
  const items = await GameItem.find(
    { campaign_id: req.params.campaignId },
    "name _id"
  ).exec();

  res.status(200).json(items);
});

exports.item_detail_get = asyncHandler(async (req, res) => {
  const item = await GameItem.findById(req.params.id).exec();

  if (!item) {
    res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(item);
});

exports.item_create_post = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be defined and shorter than 50 characters."),
  body("short_description")
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage("Short description must not be longer than 500 characters"),
  body("long_description").trim().escape(),

  asyncHandler(async (req, res) => {
    const error = validationResult(req);

    if (!error) {
      res.status(400).json(error.array());
    }

    const item = new GameItem({
      name: req.body.name,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      campaign_id: req.params.campaignId,
    });

    await item.save();
    res.status(200).json(item);
  }),
];

exports.item_update_post = [
  body("name").trim().escape().isLength({ min: 1 }),
  body("short_description").trim().escape(),
  body("long_description").trim().escape(),

  asyncHandler(async (req, res) => {
    const error = validationResult(req);

    if (!error) {
      res.status(400).json(error.array());
    }

    const item = new GameItem({
      name: req.body.name,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      campaign_id: req.params.campaignId,
      _id: req.params.id,
    });

    await GameItem.findByIdAndUpdate(req.params.id);
    res.status(200).json(item);
  }),
];

exports.item_delete_post = asyncHandler(async (req, res) => {
  GameItem.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted item with id: " + req.params.id });
});
