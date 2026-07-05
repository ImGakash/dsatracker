const mongoose = require("mongoose");

const connectDB = async () => {
  // 1. The Safeguard: Check if the variable exists BEFORE trying to connect
  if (!process.env.MONGO_URI) {
    console.error("CRITICAL ERROR: MONGO_URI environment variable is missing!");
    process.exit(1); 
  }

  // 2. The Connection
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
