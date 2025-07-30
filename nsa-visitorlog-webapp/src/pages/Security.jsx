// src/pages/Security.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

const Security = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [visitorList, setVisitorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 🔄 Fetch visitors from backend
  const fetchVisitors = async () => {
    try {
      const res = await fetch("http://localhost:5000/visitors");
      const data = await res.json();
      setVisitorList(data);
    } catch (err) {
      console.error("Failed to fetch visitors:", err);
    }
  };

  //alerts
  const [enableAlerts, setEnableAlerts] = useState(() => {
    return localStorage.getItem("enableAlerts") === "true";
  });
  
  const toggleAlerts = () => {
    const newValue = !enableAlerts;
    setEnableAlerts(newValue);
    localStorage.setItem("enableAlerts", newValue.toString());
  };
  

  useEffect(() => {
    fetchVisitors();
  }, []);

  // 👀 Only show visitors in Gate view and not archived
  const visibleVisitors = visitorList.filter((v) => v.inGateView && !v.archived);

  const filteredVisitors = visibleVisitors.filter((v) => {
    const term = searchTerm.toLowerCase();
    return (
      v.name.toLowerCase().includes(term) ||
      v.facilitator.toLowerCase().includes(term) ||
      v.date.includes(term)
    );
  });

  useEffect(() => {
    let lastSeenIds = [];
  
    const pollVisitors = async () => {
      if (!enableAlerts) return;
  
      try {
        const res = await fetch("http://localhost:5000/visitors/view/nsa");
        const data = await res.json();
  
        const currentIds = data.map((v) => v.id);
        const newVisitor = data.find((v) => !lastSeenIds.includes(v.id));
  
        if (newVisitor) {
          toast.info(`🔔 New Visitor Alert: ${newVisitor.name}`, {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
          });
  
          // Play sound
          const audio = new Audio("/alert.mp3");
          audio.play().catch((err) => console.error("Sound error:", err));
        }
  
        lastSeenIds = currentIds;
      } catch (err) {
        console.error("Polling error:", err);
      }
    };
  
    const interval = setInterval(pollVisitors, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, [enableAlerts]);
  

  // 💄 Styling
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

      <div style={{ marginBottom: "20px" }}>
       <label>
    <input type="checkbox" checked={enableAlerts} onChange={toggleAlerts} />
   &nbsp; Enable Entry Alerts 🔔
   </label>
    </div>

      {/* 🔍 Search Input */}
      <input
        type="text"
        style={styles.input}
        placeholder="Search by name or date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 📋 Visitor Table */}
      {filteredVisitors.length === 0 ? (
        <p>No visitors found for Gate View.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map((v) => (
              <tr key={v.id}>
                <td style={styles.td}>{v.name}</td>
                <td style={styles.td}>{v.phone}</td>
                <td style={styles.td}>{v.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageLayout>
  );
};

export default Security;
