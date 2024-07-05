const GameCharacter = require("../models/character");
const Location = require("../models/location");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.character_list = asyncHandler(async (req, res) => {
  const characters = await GameCharacter.find(
    { campaign_id: req.params.campaignId },
    "name _id image"
  ).exec();

  res.status(200).json(characters);
});

exports.character_detail_get = asyncHandler(async (req, res) => {
  const character = await GameCharacter.findById(req.params.id)
    .populate("location")
    .exec();

  if (!character) {
    return res.status(404).json({ message: "Character not found" });
  }

  res.status(200).json(character);
});

exports.character_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified"),
  body("occupation").trim().escape(),
  body("short_despcription").trim().escape(),
  body("long_description").trim().escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    let newLocation = null;

    if (!errors.isEmpty()) {
      res.status(403).json(errors.array());
    }

    if (req.body.location && req.body.location !== "n.a.") {
      newLocation = await Location.findById(req.body.location).exec();
      if (newLocation === null) {
        console.warn("location not found");
      }
    }

    const character = new GameCharacter({
      name: req.body.name,
      occupation: req.body.occupation,
      location: newLocation,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      campaign_id: req.params.campaignId,
      image: req.body.image,
    });

    try {
      console.log(character);
      await character.save();
      res.status(200).json(character);
    } catch (err) {
      console.error("Error saving a character:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }),
];

exports.character_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified"),
  body("occupation").trim().escape(),
  body("short_despcription").trim().escape(),
  body("long_description").trim().escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    let newLocation = null;

    if (!errors.isEmpty()) {
      res.status(403).json(errors.array());
    }

    console.log(req.body.location);

    if (req.body.location && req.body.location !== "n.a.") {
      newLocation = await Location.findById(req.body.location).exec();
    }

    const character = new GameCharacter({
      name: req.body.name,
      occupation: req.body.occupation,
      location: newLocation,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      campaign_id: req.params.campaignId,
      image: req.body.image,
      _id: req.params.id,
    });

    const updatedCharacter = await GameCharacter.findByIdAndUpdate(
      req.params.id,
      character,
      {}
    );

    const newCharacter = await GameCharacter.findById(req.params.id)
      .populate("location")
      .exec();

    console.log(updatedCharacter);
    console.log(newCharacter);

    res.status(200).json(newCharacter);
  }),
];

exports.character_delete_post = asyncHandler(async (req, res) => {
  await GameCharacter.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ message: "Deleted character with id: " + req.params.id });
});
