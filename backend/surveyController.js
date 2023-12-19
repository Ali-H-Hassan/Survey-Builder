const Survey = require("./surveyModel");

async function createSurvey(req, res) {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

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
    const userId = req.user.userId;
    const surveyId = req.params.surveyId;
    const answers = req.body.answers;

    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.responses.push({ userId, answers });
    await survey.save();

    res.status(200).json({ message: "Survey submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function resetSurvey(req, res) {
  try {
    const userId = req.user.userId;
    const surveyId = req.params.surveyId;

    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.responses = survey.responses.filter(
      (response) => response.userId !== userId
    );

    await survey.save();

    res.status(200).json({ message: "Survey answers reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getSurveyResponses(req, res) {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    const surveyId = req.params.surveyId;

    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    const responses = survey.responses;

    res.status(200).json({ responses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createSurvey,
  listSurveys,
  submitSurvey,
  resetSurvey,
  getSurveyResponses,
};
