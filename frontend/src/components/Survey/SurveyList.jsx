import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SurveyList.css";
const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/survey/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSurveys(response.data.surveys);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching surveys");
      }
    };

    fetchSurveys();
  }, []);

  const openSurvey = (surveyId) => {
    navigate(`/survey/${surveyId}`);
  };

  return (
    <div className="survey-list-container">
      <h1>Welcome {username}!</h1>
      <h2 className="survey-list-title">Survey List</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="survey-list">
        {surveys.length > 0 ? (
          surveys.map((survey) => (
            <li
              key={survey._id}
              className="survey-item"
              onClick={() => openSurvey(survey._id)}
            >
              {survey.title}
            </li>
          ))
        ) : (
          <p className="no-surveys">No surveys available to display.</p>
        )}
      </ul>
    </div>
  );
};

export default SurveyList;
