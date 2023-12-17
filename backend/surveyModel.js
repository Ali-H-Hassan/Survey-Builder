const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: String,
  text: String,
  options: [String],
});

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
