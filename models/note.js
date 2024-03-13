const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  date: { type: Date, required: true },
  text: { type: String },
  campaign_id: { type: Schema.Types.ObjectId, ref: "Campaign" },
});

module.exports = mongoose.model("Note", NoteSchema);
