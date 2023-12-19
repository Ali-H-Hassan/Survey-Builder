import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:3001/user/profile", {
        username,
      });

      // Handle successful profile update (redirect, show success message, etc.)
    } catch (error) {
      console.error("Error updating profile", error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
