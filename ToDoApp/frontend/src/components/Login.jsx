// src/components/Login.jsx
import React, { useState } from "react";
import api from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const postData = new URLSearchParams();
    postData.append("username", username);
    postData.append("password", password);

    try {
      const response = await api.post("/auth/token", postData);
      localStorage.setItem("token", response.data.access_token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Giriş başarısız. Bilgilerinizi kontrol edin.");
      console.error("Login error:", error.response?.data);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #153677, #4e085f)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#153677" }}>Giriş Yap</h2>

        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Giriş Yap
        </button>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#666" }}>
          Hesabın yok mu?{" "}
          <a href="/register" style={{ color: "#4e085f" }}>
            Kayıt Ol
          </a>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#153677",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
  fontWeight: "bold",
  boxSizing: "border-box",
};

export default Login;
