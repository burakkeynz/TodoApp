import React from "react";
import { useNavigate } from "react-router-dom";
import todoImage from "../images/todo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        background: "linear-gradient(135deg, #153677, #4e085f)",
        fontFamily: "sans-serif",
        padding: "40px",
        boxSizing: "border-box",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          maxWidth: "960px",
          width: "100%",
          overflow: "hidden",
          flexDirection: "row",
        }}
      >
        {/* Sol taraf: Görsel + açıklama */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(180deg, #4e085f, #153677)",
            color: "#fff",
            padding: "50px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "20px",
              fontWeight: "700",
              color: "#F9FAFB",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Welcome to the Todo App
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.6",
              color: "#D1D5DB",
              maxWidth: "380px",
              marginBottom: "30px",
            }}
          >
            Organize your tasks, boost your productivity, and stay on track
            every day with our simple and powerful todo manager.
          </p>

          <img
            src={require("../images/todo.png")}
            alt="Task Illustration"
            style={{
              width: "180px",
              height: "auto",
              marginTop: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        {/* Sağ taraf: Login/Register kartı */}
        <div
          style={{
            flex: 1,
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "30px", color: "#333" }}>
            Start Managing Your Tasks
          </h2>

          <button onClick={() => navigate("/login")} style={buttonStyleBlue}>
            Giriş Yap
          </button>

          <button
            onClick={() => navigate("/register")}
            style={buttonStyleGreen}
          >
            Kayıt Ol
          </button>
        </div>
      </div>
    </div>
  );
}

const buttonStyleBlue = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  backgroundColor: "#153677",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const buttonStyleGreen = {
  ...buttonStyleBlue,
  backgroundColor: "#4CAF50",
};

export default Home;
