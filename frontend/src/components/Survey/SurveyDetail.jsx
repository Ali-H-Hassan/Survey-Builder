// SurveyDetail.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SurveyDetail.css";

const SurveyDetail = () => {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const { surveyId } = useParams();

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/survey/${surveyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSurvey(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching survey details"
        );
      }
    };

    fetchSurveyDetails();
  }, [surveyId]);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleInputChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "radio":
        return (
          <div>
            <p>{question.text}</p>
            {question.options.map((option, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name={question._id}
                  value={option}
                  onChange={() => handleOptionChange(question._id, option)}
                  checked={answers[question._id] === option}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div>
            <p>{question.text}</p>
            {question.options.map((option, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  name={question._id}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(question._id, {
                      ...answers[question._id],
                      [option]: e.target.checked,
                    })
                  }
                  checked={answers[question._id]?.[option] || false}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case "text":
        return (
          <div>
            <p>{question.text}</p>
            <input
              type="text"
              onChange={(e) => handleInputChange(question._id, e.target.value)}
              value={answers[question._id] || ""}
            />
          </div>
        );
      case "scale":
        return (
          <div>
            <p>{question.text}</p>
            <input
              type="range"
              min="1"
              max="5"
              onChange={(e) => handleInputChange(question._id, e.target.value)}
              value={answers[question._id] || "3"}
            />
          </div>
        );
      case "multiple-choice":
        return (
          <div>
            <p>{question.text}</p>
            <select
              onChange={(e) => handleInputChange(question._id, e.target.value)}
              value={answers[question._id] || ""}
            >
              {question.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      // Add other question types as needed
      default:
        return <p>Unsupported question type: {question.type}</p>;
    }
  };

  // Render the component or a loading message
  if (!survey) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form
      className="survey-detail-container"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2>{survey.title}</h2>
      <ul className="survey-questions-list">
        {survey.questions.map((question, index) => (
          <li key={index} className="survey-question">
            {renderQuestion(question)}
          </li>
        ))}
      </ul>
      <button type="submit">Submit Answers</button>
    </form>
  );
};

export default SurveyDetail;
