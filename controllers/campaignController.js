const Campaign = require("../models/campaign");
const User = require("../models/user");
const Character = require("../models/character");
const Item = require("../models/item");
const Location = require("../models/location");
const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.campaign_list = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find(
    { user_id: req.params.user_id },
    "name _id"
  )
    .sort({ name: 1 })
    .exec();

  res.status(200).json(campaigns);
});

exports.campaign_detail_get = asyncHandler(async (req, res) => {
  const campaign = await Campaign.FindById(req.params.id).exec();

  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  res.status(200);
  res.send(campaign.json());
});

exports.campaign_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .escape()
    .withMessage("Name must be specified and shorter than 50 characters"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (mongoose.isValidObjectId(req.params.user_id)) {
      const user = await User.findById(req.params.user_id);
      if (!user) {
        res
          .status(404)
          .json({ message: "User not found, couldn't create campaign." });
      }
    } else {
      res.status(400).json({ message: "Invalid user id" });
    }

    const campaign = new Campaign({
      name: req.body.name,
      user_id: req.params.user_id,
    });

    if (!errors.isEmpty()) {
      res.status(403).json(errors.array());
    } else {
      await campaign.save();
      res.status(200).json(campaign);
    }
  }),
];

exports.campaign_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .escape()
    .withMessage("Name must be specified and shorter than 50 characters"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (mongoose.isValidObjectId(req.params.user_id)) {
      const user = await User.findById(req.params.user_id);
      if (!user) {
        res
          .status(404)
          .json({ message: "User not found, couldn't create campaign." });
      }
    } else {
      res.status(400).json({ message: "Invalid user id" });
    }

    const campaign = new Campaign({
      name: req.body.name,
      user_id: req.params.user_id,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.status(403).json(errors.array());
    }

    await Campaign.findByIdAndUpdate(req.params.id, campaign, {});
    res.status(200).json(campaign);
  }),
];

exports.campaign_delete_post = asyncHandler(async (req, res) => {
  await Promise.all([
    Campaign.findByIdAndDelete(req.params.campaignId),
    Character.deleteMany({ campaign_id: req.params.campaignId }),
    Item.deleteMany({ campaign_id: req.params.campaignId }),
    Location.deleteMany({ campaign_id: req.params.campaignId }),
  ]);

  res.status(200).json({
    message:
      "Deleted campaign with id: " +
      req.params.campaignId +
      ", as well as all entries referencing it",
  });
});
