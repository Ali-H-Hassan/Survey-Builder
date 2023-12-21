const express = require("express");
const router = express.Router();
const {
  createSurvey,
  listSurveys,
  submitSurvey,
  resetSurvey,
  getSurveyResponses,
  getSurvey,
} = require("./surveyController");
const verifyToken = require("./authMiddleware");
const isAdmin = require("./authMiddleware");

router.post("/create", verifyToken, isAdmin, createSurvey);
router.get("/list", verifyToken, listSurveys);
router.post("/submit/:surveyId", verifyToken, submitSurvey);
router.post("/reset/:surveyId", verifyToken, resetSurvey);
router.get("/responses/:surveyId", verifyToken, isAdmin, getSurveyResponses);
router.get("/:surveyId", verifyToken, getSurvey);

module.exports = router;
