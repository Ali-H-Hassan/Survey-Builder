const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./userModel");

async function signup(req, res) {
  try {
    console.log("Received signup request:", req.body);

    const { username, email, password } = req.body;

    if (!password) {
      console.log("Password is required");
      return res.status(400).json({ message: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Additional log to check if saving to the database is successful
    const savedUser = await newUser.save();
    console.log("User saved to the database:", savedUser);

    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateProfile(req, res) {
  try {
    const { username } = req.body;

    const userId = req.user.userId;

    await User.findByIdAndUpdate(userId, { username });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Admin access required" });
  }
}

async function getSurveyResponses(req, res) {
  try {
    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { signup, login, updateProfile, isAdmin, getSurveyResponses };
