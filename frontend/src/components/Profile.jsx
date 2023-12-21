import React, { useState } from "react";
import axios from "axios";
import "./Profile.css";
const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleProfilePicUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await axios.post("/user/upload-profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfilePicUrl(response.data.profilePicUrl);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {profilePicUrl && (
        <img src={profilePicUrl} alt="Profile" className="profile-pic" />
      )}
      <form onSubmit={handleProfilePicUpload} className="upload-form">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Profile;
