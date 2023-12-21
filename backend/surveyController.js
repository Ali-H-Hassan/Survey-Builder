const Survey = require("./surveyModel");

async function createSurvey(req, res) {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
  }

  try {
    const { title, questions } = req.body;
    const newSurvey = new Survey({ title, questions });
    await newSurvey.save();
    res.status(201).json({ message: "Survey created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function listSurveys(req, res) {
  console.log("Attempting to list surveys");
  try {
    const surveys = await Survey.find();
    console.log("Surveys found", surveys);
    res.status(200).json({ surveys });
  } catch (error) {
    console.error("Error listing surveys", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function submitSurvey(req, res) {
  try {
    const { surveyId } = req.params;
    const { answers } = req.body;
    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.responses.push({ userId: req.user._id, answers });
    await survey.save();
    res.status(200).json({ message: "Survey submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function resetSurvey(req, res) {
  try {
    const { surveyId } = req.params;
    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.responses = survey.responses.filter(
      (response) => response.userId.toString() !== req.user._id.toString()
    );
    await survey.save();
    res.status(200).json({ message: "Survey answers reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getSurveyResponses(req, res) {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
  }

  try {
    const { surveyId } = req.params;
    const survey = await Survey.findById(surveyId).select("responses");

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    res.status(200).json({ responses: survey.responses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getSurvey(req, res) {
  try {
    const surveyId = req.params.surveyId;
    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).send("Survey not found");
    }
    res.json(survey);
  } catch (error) {
    res.status(500).send("Server error");
  }
}

module.exports = {
  createSurvey,
  listSurveys,
  getSurvey,
  submitSurvey,
  resetSurvey,
  getSurveyResponses,
};
