// src/pages/Admin.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { Plus, Archive, ShieldCheck, User, Edit, Trash2 } from "lucide-react";
import StatusBadge from "../components/StatusBadge";

const Admin = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const API = "http://localhost:5000";

  const [visitor, setVisitor] = useState({
    name: "",
    phone: "",
    facilitator: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [visitorList, setVisitorList] = useState([]);
  const [selectedVisitors, setSelectedVisitors] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetch(`${API}/visitors`)
      .then((res) => res.json())
      .then((data) => setVisitorList(data))
      .catch((err) => {
        console.error("❌ Failed to fetch from backend. Using localStorage...", err);
        const stored = localStorage.getItem("visitorList");
        if (stored) setVisitorList(JSON.parse(stored));
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("visitorList", JSON.stringify(visitorList)); // ⬅️ Local storage backup
  }, [visitorList]);

  const handleChange = (e) => {
    setVisitor({ ...visitor, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setVisitor({
      name: "",
      phone: "",
      facilitator: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const handleAddVisitor = () => {
    if (!visitor.name || !visitor.phone) return alert("Name and Phone required.");

    if (editMode) {
      fetch(`${API}/visitors/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...visitor, status: "Pending", archived: 0 }),
      }).then(() => {
        setVisitorList((prev) =>
          prev.map((v) => (v.id === editId ? { ...v, ...visitor } : v))
        );
        setEditMode(false);
        setEditId(null);
        setEditingRowId(null);
        resetForm();
      });
    } else {
      fetch(`${API}/visitors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitor),
      })
        .then((res) => res.json())
        .then((data) => {
          const newVisitor = {
            ...visitor,
            id: data.id,
            status: "Pending",
            archived: 0,
            inNSAView: false,
            inGateView: false,
          };
          setVisitorList((prev) => [newVisitor, ...prev]);
          resetForm();
        });
    }
  };

  const handleEdit = (v) => {
    setVisitor({
      name: v.name,
      phone: v.phone,
      facilitator: v.facilitator,
      date: v.date,
      status: v.status || "Pending",
    });
    setEditMode(true);
    setEditId(v.id);
    setEditingRowId(v.id);
  };

  const handleCheckboxChange = (id) => {
    setSelectedVisitors((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const visibleIds = paginatedVisitors.map((v) => v.id);
    const allSelected = visibleIds.every((id) => selectedVisitors.includes(id));
    setSelectedVisitors(allSelected ? [] : visibleIds);
  };

  const handleBulkArchive = () => {
    selectedVisitors.forEach((id) => {
      fetch(`${API}/visitors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Pending", archived: 1 }),
      });
    });

    setVisitorList((prev) =>
      prev.map((v) =>
        selectedVisitors.includes(v.id)
          ? { ...v, archived: 1, inGateView: 0, inNSAView: 0 }
          : v
      )
    );
    setSelectedVisitors([]);
  };

  const handleBulkAddToNSA = () => {
    selectedVisitors.forEach((id) => {
      fetch(`${API}/visitors/${id}/view`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inNsaView: 1, inGateView: 0 }),
      });
    });

    setVisitorList((prev) =>
      prev.map((v) =>
        selectedVisitors.includes(v.id) ? { ...v, inNSAView: true } : v
      )
    );
    setSelectedVisitors([]);
  };

  const handleBulkAddToGate = () => {
    selectedVisitors.forEach((id) => {
      fetch(`${API}/visitors/${id}/view`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inGateView: 1, inNsaView: 0 }),
      });
    });

    setVisitorList((prev) =>
      prev.map((v) =>
        selectedVisitors.includes(v.id) ? { ...v, inGateView: true } : v
      )
    );
    setSelectedVisitors([]);
  };

  const handleStatusChange = (id, newStatus) => {
    fetch(`${API}/visitors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, archived: 0 }),
    });

    setVisitorList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this visitor?")) {
      fetch(`${API}/visitors/${id}`, { method: "DELETE" });
      setVisitorList((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleBulkDelete = () => {
    selectedVisitors.forEach((id) =>
      fetch(`${API}/visitors/${id}`, { method: "DELETE" })
    );
    setVisitorList((prev) => prev.filter((v) => !selectedVisitors.includes(v.id)));
    setSelectedVisitors([]);
  };

  const filteredVisitors = visitorList.filter((v) => {
    const matchArchive = showArchived ? true : !v.archived;
    const matchStatus = statusFilter ? v.status === statusFilter : true;
    const matchSearch = searchTerm
      ? v.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchArchive && matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);
  const paginatedVisitors = filteredVisitors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const styles = {
    header: { fontSize: "28px", fontWeight: "bold", color: "#2d4d2a", marginBottom: "10px" },
    subtext: { fontSize: "16px", color: "#444", marginBottom: "30px" },
    form: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },
    input: { padding: "10px", fontSize: "14px" },
    input2: { padding: "10px", fontSize: "14px" },
    addButton: {
      padding: "12px 18px",
      fontSize: "14px",
      backgroundColor: "#008000",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#2d4d2a",
      color: "white",
      padding: "10px",
      border: "1px solid #ccc",
      textAlign: "left",
    },
    td: { padding: "10px", border: "1px solid #ccc", fontSize: "14px" },
    toggleBtn: {
      backgroundColor: "#008000",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "5px",
      fontSize: "14px",
      cursor: "pointer",
      marginBottom: "10px",
    },
    bulkBar: { display: "flex", gap: "12px", marginBottom: "15px" },
    actionBtn: {
      backgroundColor: "#008000",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "8px 12px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
  };

  return (
    <PageLayout role={user?.role} onLogout={handleLogout}>
      <h2 style={styles.header}>Welcome to Admin View</h2>
      <p style={styles.subtext}>Logged in as: <strong>{user?.username}</strong></p>

      {/* Visitor Form */}
      <div>
        <h3 style={{ color: "#2d4d2a", marginBottom: "10px" }}>
          {editMode ? "Update Visitor" : "Add New Visitor"}
        </h3>
        <div style={styles.form}>
          <input style={styles.input} name="name" value={visitor.name} onChange={handleChange} placeholder="Full Name" />
          <input style={styles.input} name="phone" value={visitor.phone} onChange={handleChange} placeholder="Phone Number" />
          <input style={styles.input} name="facilitator" value={visitor.facilitator} onChange={handleChange} placeholder="Facilitator" />
          <input style={styles.input} name="date" type="date" value={visitor.date} onChange={handleChange} />
          <button style={styles.addButton} onClick={handleAddVisitor}>
            <Plus size={16} /> {editMode ? "Update" : "Add Visitor"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <input
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ ...styles.input, maxWidth: "250px", marginBottom: "10px" }}
      /> &nbsp;
      <select style={styles.input2} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">Filter by Status</option>
        <option value="Pending">Pending</option>
        <option value="Notified">Notified</option>
        <option value="Completed">Completed</option>
      </select> &nbsp;
      <button style={styles.toggleBtn} onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? "Hide Archived" : "Show Archived"}
      </button>

      {/* Bulk Actions */}
      {selectedVisitors.length > 0 && (
        <div style={styles.bulkBar}>
          <button onClick={handleBulkArchive} style={styles.actionBtn}><Archive size={14} /> Archive Selected</button>
          <button onClick={handleBulkAddToNSA} style={styles.actionBtn}><ShieldCheck size={14} /> Add to NSA</button>
          <button onClick={handleBulkAddToGate} style={styles.actionBtn}><User size={14} /> Add to Gate</button>
          <button onClick={handleBulkDelete} style={styles.actionBtn}><Trash2 size={14} /> Delete Selected</button>
        </div>
      )}

      <div style={{ margin: "10px 0", fontSize: "14px", fontWeight: "bold" }}>
        Status Legend:
        <span style={{ color: "#e6c200", marginLeft: "12px" }}>🟡 Pending</span>
        <span style={{ color: "#007bff", marginLeft: "12px" }}>🔵 Notified</span>
        <span style={{ color: "#28a745", marginLeft: "12px" }}>🟢 Completed</span>
      </div>

      {/* Visitor Table */}
      <div>
        {paginatedVisitors.length === 0 ? (
          <p>No visitors found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  <input type="checkbox" checked={selectedVisitors.length === paginatedVisitors.length} onChange={handleSelectAll} />
                </th>
                <th style={styles.th}>Full Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Facilitator</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
                {showArchived && <th style={styles.th}>Archived</th>}
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVisitors.map((v) => (
                <tr key={v.id}>
                  <td style={styles.td}>
                    <input type="checkbox" checked={selectedVisitors.includes(v.id)} onChange={() => handleCheckboxChange(v.id)} />
                  </td>
                  <td style={styles.td}>{v.name}</td>
                  <td style={styles.td}>{v.phone}</td>
                  <td style={styles.td}>{v.facilitator}</td>
                  <td style={styles.td}>{v.date}</td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {editingRowId === v.id ? (
                        <select
                          value={v.status}
                          onChange={(e) => handleStatusChange(v.id, e.target.value)}
                          style={{ ...styles.input, maxWidth: "120px" }}
                        >
                          <option>Pending</option>
                          <option>Notified</option>
                          <option>Completed</option>
                        </select>
                      ) : (
                        <StatusBadge status={v.status} />
                      )}
                    </div>
                  </td>
                  {showArchived && <td style={styles.td}>{v.archived ? "Yes" : "No"}</td>}
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button style={styles.actionBtn} onClick={() => handleEdit(v)}><Edit size={14} /> Edit</button>
                      <button style={styles.actionBtn} onClick={() => handleDelete(v.id)}><Trash2 size={14} /> Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ⬅️ Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next ➡️
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Admin;
