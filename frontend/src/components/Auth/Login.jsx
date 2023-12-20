import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });

      console.log("Login Response:", response);

      const token = response.data.token;

      console.log("Token:", token);

      localStorage.setItem("token", token);

      navigate("/dashboard");

      // Fetch and set the list of surveys upon successful login
      // try {
      //   const surveysResponse = await axios.get(
      //     "http://localhost:3001/survey/list",
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );

      //   console.log("Surveys Response:", surveysResponse.data);

      //   setSurveys(surveysResponse.data.surveys);
      // } catch (surveysError) {
      //   console.error("Error fetching surveys:", surveysError);
      // }
    } catch (error) {
      console.error("Login failed", error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      {surveys.length > 0 && (
        <div>
          <h3>List of Surveys:</h3>
          <ul>
            {surveys.map((survey) => (
              <li key={survey._id}>{survey.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
