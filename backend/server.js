const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("./db");

const userRoutes = require("./userRoutes");
const surveyRoutes = require("./surveyRoutes");

app.use(express.json());
app.use("/user", userRoutes);
app.use("/survey", surveyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
