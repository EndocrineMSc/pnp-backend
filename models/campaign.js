const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String },
  user_id: { type: String, required: true },
});

module.exports = mongoose.model("Campaign", CampaignSchema);
