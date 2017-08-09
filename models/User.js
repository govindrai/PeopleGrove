const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  facebookId: String
});

module.exports = mongoose.model("User", userSchema);
