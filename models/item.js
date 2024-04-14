const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  short_description: { type: String, maxLength: 500 },
  long_description: { type: String },
  campaign_id: { type: Schema.Types.ObjectId, ref: "Campaign", required: true },
  image: { type: String },
});

module.exports = mongoose.model("GameItem", ItemSchema);
