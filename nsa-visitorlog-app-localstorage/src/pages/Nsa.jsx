// src/pages/Nsa.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { CheckCircle } from "lucide-react";

const Nsa = () => {
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

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Update localStorage whenever changes happen
  useEffect(() => {
    localStorage.setItem("visitorList", JSON.stringify(visitorList));
  }, [visitorList]);

  // Filter by NSA visibility
  const visibleVisitors = visitorList.filter((v) => v.inNSAView);

  // Apply search & status filters
  const filteredVisitors = visibleVisitors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.facilitator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.date.includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleMarkNotified = (id) => {
    const updated = visitorList.map((v) =>
      v.id === id ? { ...v, status: "Notified" } : v
    );
    setVisitorList(updated);
  };

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
    filterBar: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    input: {
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      flex: "1",
      minWidth: "180px",
    },
    filterBtn: (active) => ({
      backgroundColor: active ? "#008000" : "#eee",
      color: active ? "white" : "#333",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    }),
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
    notifyBtn: {
      backgroundColor: "#008000",
      color: "white",
      padding: "6px 10px",
      border: "none",
      borderRadius: "5px",
      fontSize: "13px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
  };

  return (
    <PageLayout role={user?.role} onLogout={handleLogout}>
      <h2 style={styles.header}>NSA VIEW - </h2>
      <p style={styles.text}> Welcome Sir ..</p>
      <p style={styles.subtext}>
        Logged in as: <strong>{user?.username}</strong>
      </p>

      {/* 🔍 Filters */}
      <div style={styles.filterBar}>
        <input
          style={styles.input}
          placeholder="Search by name, facilitator, or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {["All", "Pending", "Notified", "Completed"].map((status) => (
          <button
            key={status}
            style={styles.filterBtn(statusFilter === status)}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* 📋 Visitor Table */}
      {filteredVisitors.length === 0 ? (
        <p>No matching visitors found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Facilitator</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
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
                <td style={styles.td}>
                  {v.status === "Pending" && (
                    <button
                      onClick={() => handleMarkNotified(v.id)}
                      style={styles.notifyBtn}
                    >
                      <CheckCircle size={14} />
                      Mark Notified
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageLayout>
  );
};

export default Nsa;
