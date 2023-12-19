import React, { useState } from "react";
import axios from "axios";

const SurveyForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleCreateSurvey = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/survey/create", {
        title,
        questions,
      });

      // Handle successful survey creation (redirect, show success message, etc.)
    } catch (error) {
      console.error("Error creating survey", error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Create Survey</h2>
      <form onSubmit={handleCreateSurvey}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />

        <label>Questions:</label>
        {questions.map((question, index) => (
          <input
            key={index}
            type="text"
            value={question}
            onChange={(e) => handleQuestionChange(e, index)}
            required
          />
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};

export default SurveyForm;
