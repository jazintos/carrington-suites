// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("nsaUser");
    return stored ? JSON.parse(stored) : null;
  });

  const AUTO_LOGOUT_MS = 30 * 60 * 1000; // 30 minutes

  const resetTimer = useCallback(() => {
    clearTimeout(window.autoLogoutTimer);
    if (user) {
      window.autoLogoutTimer = setTimeout(() => {
        toast.info("⏰ Session expired. You have been logged out.", {
          theme: "dark",
        });
        logout(true);
      }, AUTO_LOGOUT_MS);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      resetTimer();
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
      window.addEventListener("click", resetTimer);
    }

    return () => {
      clearTimeout(window.autoLogoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [user, resetTimer]);

  const login = async (username, password, role) => {
    const storedUsers = JSON.parse(localStorage.getItem("userList")) || [];
    const matched = storedUsers.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password &&
        u.role === role
    );
    if (matched) {
      setUser(matched);
      localStorage.setItem("nsaUser", JSON.stringify(matched));
      return { success: true, role: matched.role };
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await res.json();

      if (data.success) {
        const backendUser = {
          username: data.username || username,
          role: data.role,
        };
        setUser(backendUser);
        localStorage.setItem("nsaUser", JSON.stringify(backendUser));
        return { success: true, role: data.role };
      }
    } catch (err) {
      console.error("Backend login error:", err);
    }

    const credentials = {
      admin: { username: "admin", password: "admin123" },
      nsa: { username: "nsa", password: "nsa123" },
      gate: { username: "gate", password: "gate123" },
    };

    const fallback = credentials[role];
    if (
      fallback &&
      fallback.username === username &&
      fallback.password === password
    ) {
      const fallbackUser = { username, role };
      setUser(fallbackUser);
      localStorage.setItem("nsaUser", JSON.stringify(fallbackUser));
      return { success: true, role };
    }

    return { success: false };
  };

  const logout = (auto = false) => {
    setUser(null);
    localStorage.removeItem("nsaUser");
    clearTimeout(window.autoLogoutTimer);

    if (auto) {
      setTimeout(() => {
        window.location.href = "/"; // ⛔ not useNavigate() — works outside Router
      }, 3000);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
