const Campaign = require("../models/campaign");
const GameCharacter = require("../models/character");
const GameItem = require("../models/item");
const Location = require("../models/location");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.campaign_list = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find(
    { user_id: req.params.user_id },
    "name _id"
  )
    .sort({ name: 1 })
    .exec();

  console.log(campaigns);
  res.status(200).json(campaigns);
});

exports.campaign_detail_get = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).exec();

  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  res.status(200);
  res.json(campaign);
});

exports.campaign_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .escape()
    .withMessage("Name must be specified and shorter than 50 characters"),
  body("description").trim().escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const campaign = new Campaign({
      name: req.body.name,
      description: req.body.description,
      user_id: req.params.user_id,
    });

    if (!errors.isEmpty()) {
      console.log(errors.array());
      res.status(400).json(errors.array());
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
  body("description").trim().escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const campaign = new Campaign({
      name: req.body.name,
      user_id: req.params.user_id,
      description: req.body.description,
      _id: req.params.campaignId,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      await Campaign.findByIdAndUpdate(req.params.campaignId, campaign, {});
      res.status(200).json(campaign);
    }
  }),
];

exports.campaign_delete_post = asyncHandler(async (req, res) => {
  await Promise.all([
    Campaign.findByIdAndDelete(req.params.campaignId),
    GameCharacter.deleteMany({ campaign_id: req.params.campaignId }),
    GameItem.deleteMany({ campaign_id: req.params.campaignId }),
    Location.deleteMany({ campaign_id: req.params.campaignId }),
  ]);

  res.status(200).json({
    message:
      "Deleted campaign with id: " +
      req.params.campaignId +
      ", as well as all entries referencing it",
  });
});
