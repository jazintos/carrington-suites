// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleLogin = () => {
    const result = login(username, password, role);

    if (result.success) {
      if (result.role === "admin") navigate("/admin");
      else if (result.role === "nsa") navigate("/nsa");
      else if (result.role === "gate") navigate("/security");
    } else {
      alert("Invalid username or password");
    }
  };

  const styles = {
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#ffffff",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      backgroundColor: "#f5f5f5",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      width: "1650px",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
    },

    loginBox: {
        backgroundColor: "#f9f9f9",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "720px",
      },

    logo: {
      width: "100px",
      height: "auto",
      marginBottom: "20px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "green",
      marginBottom: "20px",
    },
    input: {
      padding: "12px",
      margin: "10px 0",
      width: "100%",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    select: {
      padding: "12px",
      margin: "8px 0",
      width: "100%",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      padding: "12px",
      width: "100%",
      backgroundColor: "green",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
      <div style={styles.loginBox}>
        <img src={logo} alt="NSA Logo" style={styles.logo} />
        <h1 style={styles.title}>NSA Visitor Log App</h1>

        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.select}
        >
          <option value="admin">Admin</option>
          <option value="nsa">NSA</option>
          <option value="gate">Gate/Security</option>
        </select>

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
    </div>
  );
};

export default Login;
