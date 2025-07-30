// src/pages/Security.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

const Security = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [visitorList, setVisitorList] = useState(() => {
    const stored = localStorage.getItem("visitorList");
    return stored ? JSON.parse(stored) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  const visibleVisitors = visitorList.filter((v) => v.inGateView);

  const filteredVisitors = visibleVisitors.filter((v) => {
    const term = searchTerm.toLowerCase();
    return (
      v.name.toLowerCase().includes(term) ||
      v.facilitator.toLowerCase().includes(term) ||
      v.date.includes(term)
    );
  });

  const styles = {
    header: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#2d4d2a",
      marginBottom: "10px",
    },
    subtext: {
      fontSize: "16px",
      color: "#444",
      marginBottom: "30px",
    },
    input: {
      padding: "10px",
      fontSize: "14px",
      width: "100%",
      maxWidth: "300px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
    },
    th: {
      backgroundColor: "#2d4d2a",
      color: "white",
      padding: "10px",
      border: "1px solid #ccc",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
  };

  return (
    <PageLayout role={user?.role} onLogout={handleLogout}>
      <h2 style={styles.header}>Gate View</h2>
      <p style={styles.subtext}>
        Logged in as: <strong>{user?.username}</strong>
      </p>

      <input
        type="text"
        style={styles.input}
        placeholder="Search by name, facilitator, or date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredVisitors.length === 0 ? (
        <p>No visitors found for Gate View.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Facilitator</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map((v) => (
              <tr key={v.id}>
                <td style={styles.td}>{v.name}</td>
                <td style={styles.td}>{v.phone}</td>
                <td style={styles.td}>{v.facilitator}</td>
                <td style={styles.td}>{v.date}</td>
                <td style={styles.td}>{v.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageLayout>
  );
};

export default Security;
