// src/components/AddTodo.jsx
import React, { useState } from "react";
import api from "../api";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/todos/todo",
        {
          title,
          description,
          priority,
          complete: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setPriority(1);
      window.location.reload(); // geçici çözüm, pagination'da güncellenecek
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "100%", boxSizing: "border-box" }}
    >
      <h3 style={{ marginBottom: "16px", color: "#333", fontWeight: "600" }}>
        Yeni Todo Ekle
      </h3>

      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={inputStyle}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        style={inputStyle}
      >
        <option value={1}>1 (En Düşük)</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5 (En Yüksek)</option>
      </select>

      <button type="submit" style={buttonStyle}>
        Ekle
      </button>
    </form>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#4CAF50",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s ease",
};

export default AddTodo;
