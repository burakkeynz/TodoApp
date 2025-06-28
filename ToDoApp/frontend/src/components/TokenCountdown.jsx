import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TokenCountdown() {
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      const initialRemaining = exp - now;

      if (initialRemaining <= 0) {
        navigate("/session-expired");
        return;
      }

      setRemainingTime(initialRemaining);

      // Yönlendirme tam süre bittiğinde olsun (0:00 gözüksün)
      const timeout = setTimeout(() => {
        navigate("/session-expired");
      }, initialRemaining * 1000);

      // Countdown
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } catch (err) {
      console.error("Token çözümlenemedi:", err);
    }
  }, [navigate]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div
      style={{
        marginTop: "15px",
        padding: "10px 16px",
        background: "linear-gradient(135deg, #ece9f1, #e8f0ff)",
        border: "1px solid #c9d6ff",
        borderRadius: "12px",
        fontSize: "0.9rem",
        color: "#222",
        fontWeight: "500",
        width: "fit-content",
        alignSelf: "center",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      ⏳ Oturum süresi: {minutes} dk {seconds < 10 ? `0${seconds}` : seconds} sn
    </div>
  );
}

export default TokenCountdown;
