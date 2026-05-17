const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema
const questionSchema = new mongoose.Schema({
  text: String,
  isDone: Boolean,
  note: String,
  difficulty: String,
});

// Model
const Question = mongoose.model("Question", questionSchema);

// GET all questions
app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new question
app.post("/questions", async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH update question
app.patch("/questions/:id", async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
  req.params.id,
  req.body,
  { returnDocument: "after" }
);

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE question
app.delete("/questions/:id", async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET
    );

    // 4. Send token
    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});