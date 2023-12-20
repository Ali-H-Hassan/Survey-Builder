import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/user/signup", {
        username,
        email,
        password,
      });
    } catch (error) {
      console.error("Signup failed", error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />

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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
