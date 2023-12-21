import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SurveyList.css";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view surveys.");
          return;
        }

        const response = await axios.get("http://localhost:3001/survey/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSurveys(response.data.surveys);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching surveys");
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="survey-list-container">
      <h2 className="survey-list-title">Survey List</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="survey-list">
        {surveys.length > 0 ? (
          surveys.map((survey) => (
            <li key={survey._id} className="survey-item">
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
