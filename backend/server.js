// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Database connection
require("./db");

// Routes
const userRoutes = require("./userRoutes"); // Ensure correct path
const surveyRoutes = require("./surveyRoutes"); // Ensure correct path

app.use(express.json());
app.use("/user", userRoutes);
app.use("/survey", surveyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
