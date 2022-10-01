const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const TodoModel = mongoose.model("tododb", TodoSchema);
module.exports = TodoModel;
