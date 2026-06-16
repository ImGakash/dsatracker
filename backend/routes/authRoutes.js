const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");


const JWT_SECRET = process.env.JWT_SECRET;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!user.password) {
      return res.status(400).json({
        message: "This account uses Google login. Please sign in with Google."
      });
    }


    // 2. compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. create token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      userId: user._id
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    // verify token
    const verification = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = verification.getPayload();

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        avatar: payload.picture
      });
    } else {
      if (!user.googleId) user.googleId = payload.sub;
      if (!user.avatar) user.avatar = payload.picture;
      await user.save();
    }

    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token: jwtToken,
      userId: user._id
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;