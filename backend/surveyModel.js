const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      type: String,
      text: String,
      options: [String],
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Survey", surveySchema);
