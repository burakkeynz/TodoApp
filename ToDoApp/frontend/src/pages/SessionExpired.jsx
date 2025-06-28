// src/pages/SessionExpired.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function SessionExpired() {
  const navigate = useNavigate();

  const handleBack = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #153677, #4e085f)",
        fontFamily: "Segoe UI, sans-serif",
        margin: 0,
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "#153677", marginBottom: "20px" }}>
          Oturum Süresi Doldu
        </h1>
        <p style={{ color: "#555", marginBottom: "30px" }}>
          Güvenliğiniz için otomatik çıkış yapıldı. Lütfen tekrar giriş yapın.
        </p>
        <button
          onClick={handleBack}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#153677",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0f2a5c")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#153677")}
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

export default SessionExpired;
