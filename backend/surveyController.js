// surveyController.js
const Survey = require("./surveyModel");

// Function to create a new survey
async function createSurvey(req, res) {
  try {
    // Extract survey data from the request body
    const { title, questions } = req.body;

    // Create a new survey
    const newSurvey = new Survey({
      title,
      questions,
    });

    // Save the survey to the database
    await newSurvey.save();

    res.status(201).json({ message: "Survey created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to get a list of surveys
async function listSurveys(req, res) {
  try {
    // Retrieve all surveys from the database
    const surveys = await Survey.find();

    res.status(200).json({ surveys });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to submit a survey response
async function submitSurvey(req, res) {
  try {
    const surveyId = req.params.surveyId;
    // Extract survey response data from the request body
    const { answers } = req.body;

    // Find the survey by ID
    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    // Assuming you have a field in your survey model to store responses
    survey.responses.push({ answers });
    await survey.save();

    res.status(200).json({ message: "Survey response submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { createSurvey, listSurveys, submitSurvey };
