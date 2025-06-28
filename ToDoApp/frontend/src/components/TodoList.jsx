// src/components/TodoList.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import TodoItem from "./TodoItem";

// ✅ ScrollTargetRef prop'u Dashboard üzerinden gelecek
const TodoList = ({ scrollTargetRef }) => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 4;

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/todos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  // 🔥 Scrollable container'a scroll at
  const handleScrollToTop = () => {
    if (scrollTargetRef && scrollTargetRef.current) {
      scrollTargetRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log("✅ Scroll edildi:", scrollTargetRef.current);
    } else {
      console.warn("⚠️ scrollTargetRef tanımlı değil.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {currentTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={async (t) => {
            const token = localStorage.getItem("token");
            await api.put(
              `/todos/todo/${t.id}`,
              {
                title: t.title,
                description: t.description,
                priority: t.priority,
                complete: !t.complete,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTodos();
          }}
          onDelete={async (t) => {
            const token = localStorage.getItem("token");
            await api.delete(`/todos/todo/${t.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            fetchTodos();
          }}
        />
      ))}

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "24px",
        }}
      >
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentPage(idx + 1);
              handleScrollToTop();
            }}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: currentPage === idx + 1 ? "#4CAF50" : "#e0e0e0",
              color: currentPage === idx + 1 ? "#fff" : "#333",
              fontWeight: "500",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
