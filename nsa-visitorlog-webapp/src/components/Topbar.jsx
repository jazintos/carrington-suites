// src/components/Topbar.jsx
import React from "react";
import logo from "../assets/logo.jpeg";

const Topbar = () => {
  const styles = {
    topbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "#2d4d2a",
      borderBottom: "1px solid #ddd",
      padding: "10px 20px",
      height: "60px",

      // ✅ NEW: Make it sticky to top
      position: "sticky",
      top: 0,
      zIndex: 1000, // Keeps it above other content
    },
    logo: {
      height: "40px",
      width: "auto",
      objectFit: "contain",
      marginRight: "12px",
      background: "transparent",
      border: "none",
      borderRadius: "10px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#fff",
    },
  };

  return (
    <div style={styles.topbar}>
      <img src={logo} alt="NSA Logo" style={styles.logo} />
      <div style={styles.title}>NSA VISITORS LOG & WAITING LIST APP</div>
    </div>
  );
};

export default Topbar;
