// src/components/TodoItem.jsx
import React from "react";

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <div style={container}>
      <div>
        <h3 style={title}>{todo.title}</h3>
        <p style={desc}>{todo.description}</p>
        <p style={meta}>
          <strong>Öncelik:</strong> {todo.priority} &nbsp;|&nbsp;
          <strong>Durum:</strong>{" "}
          <span style={todo.complete ? statusDone : statusWaiting}>
            {todo.complete ? "Tamamlandı" : "Bekliyor"}
          </span>
        </p>
      </div>
      <div style={buttonGroup}>
        <button
          onClick={() => onToggleComplete(todo)}
          style={todo.complete ? btnUndo : btnPrimary}
        >
          {todo.complete ? "Geri Al" : "Tamamla"}
        </button>
        <button onClick={() => onDelete(todo)} style={btnDanger}>
          Sil
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

// 🎨 STİL AYARLARI
const container = {
  background: "#ffffff",
  padding: "24px", // içeriden boşluk
  marginBottom: "24px", // diğer todo'lardan ayrılma
  borderRadius: "14px",
  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontFamily: "'Segoe UI', sans-serif",
};

const title = {
  fontSize: "20px",
  fontWeight: 600,
  marginBottom: "10px",
  color: "#222",
};

const desc = {
  fontSize: "15px",
  color: "#555",
  marginBottom: "12px",
};

const meta = {
  fontSize: "14px",
  color: "#666",
};

const statusDone = {
  color: "#2ecc71",
  fontWeight: "bold",
};

const statusWaiting = {
  color: "#e74c3c",
  fontWeight: "bold",
};

const buttonGroup = {
  display: "flex",
  gap: "12px",
  marginTop: "20px",
};

const btnBase = {
  flex: 1,
  padding: "10px",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const btnPrimary = {
  ...btnBase,
  backgroundColor: "#27ae60",
};

const btnUndo = {
  ...btnBase,
  backgroundColor: "#f39c12",
};

const btnDanger = {
  ...btnBase,
  backgroundColor: "#c0392b",
};
