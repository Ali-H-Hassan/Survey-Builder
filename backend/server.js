const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

require("./connection");
const authenticateToken = require("./authMiddleware");
const userRoutes = require("./userRoutes");
const surveyRoutes = require("./surveyRoutes");

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.use("/public", express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/survey", surveyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
