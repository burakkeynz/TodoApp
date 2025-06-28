// src/components/Register.jsx
import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    role: "user",
    phone_number: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/", formData);
      alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      navigate("/login");
    } catch (error) {
      console.error("Kayıt başarısız:", error.response?.data || error.message);
      alert("Kayıt başarısız oldu.");
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
        overflowY: "auto",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "40px 30px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          boxSizing: "border-box",
          margin: "auto", // form içeriğini ortala
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#153677",
            textAlign: "center",
          }}
        >
          Kayıt Ol
        </h2>

        <input
          name="username"
          placeholder="Kullanıcı Adı"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="email"
          placeholder="E-posta"
          type="email"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="first_name"
          placeholder="Ad"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="last_name"
          placeholder="Soyad"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="password"
          placeholder="Şifre"
          type="password"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="phone_number"
          placeholder="Telefon"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <select
          name="role"
          onChange={handleChange}
          value={formData.role}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={buttonStyle}>
          Kayıt Ol
        </button>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#666" }}>
          Hesabın var mı?{" "}
          <Link to="/login" style={{ color: "#4e085f", fontWeight: "bold" }}>
            Giriş Yap
          </Link>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
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

export default Register;
