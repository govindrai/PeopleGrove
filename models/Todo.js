const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: {} }
);

todoSchema.statics.getTodos = () => {
  return Todo.find().populate("user");
};

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
