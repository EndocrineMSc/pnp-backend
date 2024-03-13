const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
});

module.exports = mongoose.model("Campaign", CampaignSchema);
