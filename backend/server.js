// server.js or app.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

require("./connection");
const authenticateToken = require("./authMiddleware");
const userRoutes = require("./userRoutes");
const surveyRoutes = require("./surveyRoutes");
// Import the middleware

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use(express.json());
app.use(cors());

// Apply the middleware to the route
app.get("/survey/list", authenticateToken, (req, res) => {
  // Your existing code to fetch and send surveys
});

// Your existing user and survey routes
app.use("/user", userRoutes);
app.use("/survey", surveyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
