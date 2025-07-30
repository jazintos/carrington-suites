// src/pages/Nsa.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { CheckCircle } from "lucide-react";
import StatusBadge from "../components/StatusBadge"; // If you want to show badge + text
import { toast } from "react-toastify";

const Nsa = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const API = "http://localhost:5000";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [visitorList, setVisitorList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [enableAlerts, setEnableAlerts] = useState(() => {
    return localStorage.getItem("enableAlerts") === "true";
  });

  const toggleAlerts = () => {
    const newValue = !enableAlerts;
    setEnableAlerts(newValue);
    localStorage.setItem("enableAlerts", newValue.toString());
  };

  useEffect(() => {
    fetch(`${API}/visitors/view/nsa`)
      .then((res) => res.json())
      .then((data) => setVisitorList(data))
      .catch((err) => console.error("Failed to fetch NSA visitors:", err));
  }, []);

  useEffect(() => {
    let lastSeenIds = [];

    const pollVisitors = async () => {
      if (!enableAlerts) return;

      try {
        const res = await fetch(`${API}/visitors/view/nsa`);
        const data = await res.json();

        const currentIds = data.map((v) => v.id);
        const newVisitor = data.find((v) => !lastSeenIds.includes(v.id));

        if (newVisitor) {
          toast.info(`🔔 New Visitor Alert: ${newVisitor.name}`, {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
          });

          const audio = new Audio("/alert.mp3");
          audio.play().catch((err) => console.error("Sound error:", err));
        }

        lastSeenIds = currentIds;
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    const interval = setInterval(pollVisitors, 10000);
    return () => clearInterval(interval);
  }, [enableAlerts]);

  const handleMarkNotified = (id) => {
    fetch(`${API}/visitors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Notified", archived: 0 }),
    })
      .then((res) => res.json())
      .then(() => {
        setVisitorList((prev) =>
          prev.map((v) => (v.id === id ? { ...v, status: "Notified" } : v))
        );
      })
      .catch((err) => console.error("Failed to update status:", err));
  };

  // Apply filters
  const filteredVisitors = visitorList.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.facilitator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.date.includes(searchTerm);

    const matchesStatus = statusFilter === "All" || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);
  const paginatedVisitors = filteredVisitors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    pagination: {
      marginTop: "20px",
      display: "flex",
      gap: "10px",
      justifyContent: "center",
    },
    pageBtn: (active) => ({
      padding: "6px 12px",
      fontSize: "14px",
      borderRadius: "5px",
      backgroundColor: active ? "#008000" : "#ddd",
      color: active ? "white" : "#333",
      cursor: "pointer",
      border: "none",
    }),
  };

  return (
    <PageLayout role={user?.role} onLogout={handleLogout}>
      <h2 style={styles.header}>NSA VIEW -</h2>
      <p style={styles.subtext}>Welcome Sir. Logged in as: <strong>{user?.username}</strong></p>

      <div style={{ marginBottom: "20px" }}>
        <label>
          <input type="checkbox" checked={enableAlerts} onChange={toggleAlerts} />
          &nbsp; Enable Entry Alerts 🔔
        </label>
      </div>

      {/* Filters */}
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
            onClick={() => {
              setStatusFilter(status);
              setCurrentPage(1); // reset to first page on filter
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Visitor Table */}
      {paginatedVisitors.length === 0 ? (
        <p>No matching visitors found.</p>
      ) : (
        <>
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
              {paginatedVisitors.map((v) => (
                <tr key={v.id}>
                  <td style={styles.td}>{v.name}</td>
                  <td style={styles.td}>{v.phone}</td>
                  <td style={styles.td}>{v.facilitator}</td>
                  <td style={styles.td}>{v.date}</td>
                  <td style={styles.td}>
                    <StatusBadge status={v.status} />
                  </td>
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

          {/* Pagination */}
          <div style={styles.pagination}>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={styles.pageBtn(currentPage === i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default Nsa;
