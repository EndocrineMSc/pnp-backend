const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  refreshToken: { type: String },
});

module.exports = mongoose.model("RefreshToken", TokenSchema);
