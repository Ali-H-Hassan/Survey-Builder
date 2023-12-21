import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import SurveyList from "./components/Survey/SurveyList.jsx";
import SurveyDetail from "./components/Survey/SurveyDetail.jsx";
import SurveyForm from "./components/Survey/SurveyForm.jsx";
import Profile from "./components/User/Profile.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<SurveyList />} />
        <Route path="/survey/:surveyId" element={<SurveyDetail />} />
        <Route path="/create-survey" element={<SurveyForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
