import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(to right, #2A2A2A, #1E1E1E)",
        display: "flex",
        justifyContent: "center",
        top: 0,
        zIndex: 199,
        padding: "10px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <nav
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          fontFamily: "Segoe UI, sans-serif",
          color: "#fff",
        }}
      >
        {/* Sol: Emoji + Yazı */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "8px" }}>📋</span>
            TodoApp
          </span>
        </div>

        {/* Orta: Slogan */}
        <div
          style={{
            fontSize: "1rem",
            opacity: 0.9,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Planla. Uygula. Tamamla.
        </div>

        {/* Sağ: Logout */}
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.2s",
            whiteSpace: "nowrap",
            maxWidth: "150px",
            textAlign: "center",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e60000")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
