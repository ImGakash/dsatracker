const express = require("express");
const router = express.Router();

const Question = require("../models/Question");
const auth = require("../middleware/auth");

// Get all questions for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const questions = await Question.find({
      userId: req.user.userId,
    });

    return res.json(questions);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Create a new question
router.post("/", auth, async (req, res) => {
  try {
    const { text, difficulty, note, isDone } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Question text is required" });
    }

    const newQuestion = await Question.create({
      text,
      difficulty: difficulty || "easy",
      note: note || "",
      isDone: isDone || false,
      userId: req.user.userId
    });

    return res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Update a question (text, difficulty, note, isDone)
router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, isDone, note, difficulty } = req.body;

    // Find the question and verify ownership
    const question = await Question.findOne({ _id: id, userId: req.user.userId });
    if (!question) {
      return res.status(404).json({ message: "Question not found or unauthorized" });
    }

    if (text !== undefined) question.text = text;
    if (isDone !== undefined) question.isDone = isDone;
    if (note !== undefined) question.note = note;
    if (difficulty !== undefined) question.difficulty = difficulty;

    const updatedQuestion = await question.save();
    return res.json(updatedQuestion);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Delete a question
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Question.deleteOne({ _id: id, userId: req.user.userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Question not found or unauthorized" });
    }

    return res.json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;