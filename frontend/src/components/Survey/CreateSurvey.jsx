import React, { useState } from "react";
import axios from "axios";
import "./CreateSurvey.css";
import { useNavigate } from "react-router-dom";

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ text: "", type: "text" }]);
  const navigate = useNavigate();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((question, qIndex) => {
      if (index === qIndex) {
        return { ...question, [field]: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "text" }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, qIndex) => index !== qIndex));
  };

  const submitSurvey = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Submitting survey:", { title, questions });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/survey/create",
        {
          title,
          questions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Survey submitted successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error creating survey:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="create-survey-container">
      <input
        className="survey-title-input"
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Survey Title"
      />
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <select
            className="question-type-select"
            value={question.type}
            onChange={(e) =>
              handleQuestionChange(index, "type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="radio">Multiple Choice</option>
            <option value="checkbox">Checkbox</option>
            {/* Add more question types as needed */}
          </select>
          <input
            className="question-text-input"
            type="text"
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(index, "text", e.target.value)
            }
            placeholder="Question Text"
          />
          <button
            className="remove-question-button"
            onClick={() => removeQuestion(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button className="add-question-button" onClick={addQuestion}>
        Add Question
      </button>
      <button className="submit-survey-button" onClick={submitSurvey}>
        Submit Survey
      </button>
    </div>
  );
};

export default CreateSurvey;
