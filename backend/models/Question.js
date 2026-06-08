const mongoose = require("mongoose");

// Schema
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  note: { type: String, default: "" },
  difficulty: { type: String, default: "easy" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Model
const Question = mongoose.model("Question", questionSchema);

// Export the model
module.exports = Question;
