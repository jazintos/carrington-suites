// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("nsaUser");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username, password, role) => {
    const storedUsers = JSON.parse(localStorage.getItem("userList")) || [];

    // ✅ First check against dynamically stored users
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

    // ✅ Fallback to hardcoded credentials (fail-safe)
    const credentials = {
      admin: { username: "admin", password: "admin123" },
      nsa: { username: "nsa", password: "nsa123" },
      gate: { username: "gate", password: "gate123" },
    };

    if (
      credentials[role] &&
      credentials[role].username === username &&
      credentials[role].password === password
    ) {
      const loggedInUser = { username, role };
      setUser(loggedInUser);
      localStorage.setItem("nsaUser", JSON.stringify(loggedInUser));
      return { success: true, role };
    }

    // ❌ Login failed
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nsaUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
