const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Todo", todoSchema);
