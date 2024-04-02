const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String, required: true },
  short_description: { type: String, maxLength: 500 },
  long_description: { type: String },
  campaign_id: { type: Schema.Types.ObjectId, ref: "Campaign", required: true },
});

module.exports = mongoose.model("Location", LocationSchema);
