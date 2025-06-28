// src/pages/Dashboard.jsx
import React, { useRef } from "react";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";
import Logout from "../components/Logout";
import UserProfileCard from "../components/UserProfileCard";
import TokenCountdown from "../components/TokenCountdown";
import Navbar from "../components/Navbar";

function getTokenRemainingTime() {
  const token = localStorage.getItem("token");
  if (!token) return 0;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp - now;
  } catch (err) {
    return 0;
  }
}

function Dashboard() {
  const scrollRef = useRef(null);
  return (
    <div
      ref={scrollRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #153677, #4e085f)",
        fontFamily: "sans-serif",
        color: "#fff",
        overflowX: "hidden",
        overflowY: "auto",
        margin: 0,
        padding: "30px",
        boxSizing: "border-box",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          marginTop: "30px",
          alignItems: "flex-start",
        }}
      >
        {/* cart1: Profil + AddTodo */}
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            maxWidth: "340px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "20px",
              color: "#000",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <UserProfileCard />
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              color: "#000",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <AddTodo />
          </div>
        </div>

        {/* cart2: TodoList */}
        <div style={{ flex: 3 }}>
          <TodoList scrollTargetRef={scrollRef} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
