const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const paymentRoutes = require("./routes/payment.routes");



// Connect DB first
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");

// Mount routes
app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});
app.use("/api/payment", paymentRoutes);
// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});