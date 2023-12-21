import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import SurveyList from "./components/Survey/SurveyList.jsx";
import SurveyDetail from "./components/Survey/SurveyDetail.jsx";
import CreateSurvey from "./components/Survey/CreateSurvey.jsx";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<SurveyList />} />
        <Route path="/survey/:surveyId" element={<SurveyDetail />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
