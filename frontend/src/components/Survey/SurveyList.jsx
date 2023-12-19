import React, { useState, useEffect } from "react";
import axios from "axios";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:3001/survey/list");
        setSurveys(response.data.surveys);
      } catch (error) {
        console.error("Error fetching surveys", error.response.data.message);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div>
      <h2>Survey List</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey._id}>{survey.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;
