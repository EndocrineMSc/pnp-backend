const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String },
  location: { type: Schema.Types.ObjectId },
  location_path: { type: String },
  short_description: { type: String, maxLength: 500 },
  long_description: { type: String },
  campaign_id: { type: Schema.Types.ObjectId, ref: "Campaign", required: true },
  image: { type: String },
});

module.exports = mongoose.model("GameCharacter", CharacterSchema);
