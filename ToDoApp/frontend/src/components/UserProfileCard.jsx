import React, { useState, useEffect } from "react";
import axios from "axios";
import TokenCountdown from "./TokenCountdown";

const API_URL = process.env.REACT_APP_API_URL;

function UserProfileCard() {
  const [imageUrl, setImageUrl] = useState(null);
  const [userData, setUserData] = useState({});

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/users/get_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;
      setUserData(user);

      if (user.photo_url) {
        const fullUrl = `${API_URL}${user.photo_url}`;
        setImageUrl(fullUrl);
        localStorage.setItem("profilePicUrl", fullUrl);
      } else {
        setImageUrl(null);
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}/users/upload_profile_photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const photoUrl = `${API_URL}${response.data.photo_url}`;
      setImageUrl(photoUrl);
      localStorage.setItem("profilePicUrl", photoUrl);
    } catch (err) {
      console.error("Fotoğraf yüklenirken hata oluştu:", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={imageUrl || "https://placehold.co/100x100"}
        alt="Profile"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          marginBottom: "10px",
          objectFit: "cover",
        }}
      />
      <h3 style={{ marginBottom: "5px" }}>
        {userData.first_name || ""} {userData.last_name || ""}
      </h3>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        {userData.email || ""}
      </p>
      <p style={{ fontSize: "0.85rem", color: "#999", fontStyle: "italic" }}>
        {userData.role?.toUpperCase() || ""}
      </p>

      <label
        htmlFor="upload-photo"
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#153677",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          display: "inline-block",
        }}
      >
        Fotoğraf Yükle
        <input
          type="file"
          accept="image/*"
          id="upload-photo"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </label>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <TokenCountdown />
      </div>
    </div>
  );
}

export default UserProfileCard;
