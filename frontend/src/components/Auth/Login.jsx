import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend login endpoint
      const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });

      // Assuming your backend sends a token upon successful login
      const token = response.data.token;

      // Store the token in localStorage or a state management system (Redux, Context API)
      localStorage.setItem("token", token);

      // Redirect or perform other actions upon successful login
      // For example, redirecting to the survey list page
      // history.push('/surveys');
    } catch (error) {
      // Handle login error (display error message, etc.)
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
    </div>
  );
};

export default Login;
