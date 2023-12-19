import React, { useState, useEffect } from "react";
import axios from "axios";

const SurveyDetail = ({ match }) => {
  const [survey, setSurvey] = useState(null);
  const surveyId = match.params.id;

  useEffect(() => {
    const fetchSurveyDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/survey/${surveyId}`
        );
        setSurvey(response.data.survey);
      } catch (error) {
        console.error(
          "Error fetching survey detail",
          error.response.data.message
        );
      }
    };

    fetchSurveyDetail();
  }, [surveyId]);

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{survey.title}</h2>
      <p>{/* Render survey details here */}</p>
    </div>
  );
};

export default SurveyDetail;
