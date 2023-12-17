const express = require("express");
const router = express.Router();
const {
  createSurvey,
  listSurveys,
  submitSurvey,
} = require("./surveyController");
const verifyToken = require("./authMiddleware");

router.post("/create", verifyToken, createSurvey);
router.get("/list", verifyToken, listSurveys);
router.post("/submit/:surveyId", verifyToken, submitSurvey);

module.exports = router;
