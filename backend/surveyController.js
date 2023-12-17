const Survey = require("./surveyModel");

async function createSurvey(req, res) {
  try {
    const { title, questions } = req.body;

    const newSurvey = new Survey({
      title,
      questions,
    });

    await newSurvey.save();

    res.status(201).json({ message: "Survey created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function listSurveys(req, res) {
  try {
    const surveys = await Survey.find();

    res.status(200).json({ surveys });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function submitSurvey(req, res) {
  try {
    const surveyId = req.params.surveyId;
    const { answers } = req.body;

    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.responses.push({ answers });
    await survey.save();

    res.status(200).json({ message: "Survey response submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { createSurvey, listSurveys, submitSurvey };
