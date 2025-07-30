// src/pages/Admin.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { Plus, Archive, ShieldCheck, User, Edit, Trash2 } from "lucide-react";

const Admin = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ✅ Visitor form state
  const [visitor, setVisitor] = useState({
    name: "",
    phone: "",
    facilitator: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [visitorList, setVisitorList] = useState(() => {
    const stored = localStorage.getItem("visitorList");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("visitorList", JSON.stringify(visitorList));
  }, [visitorList]);

  const [selectedVisitors, setSelectedVisitors] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleChange = (e) => {
    setVisitor({ ...visitor, [e.target.name]: e.target.value });
  };

  const handleAddVisitor = () => {
    if (!visitor.name || !visitor.phone) {
      alert("Name and Phone are required.");
      return;
    }

    if (editMode) {
      const updated = visitorList.map((v) =>
        v.id === editId ? { ...v, ...visitor } : v
      );
      setVisitorList(updated);
      setEditMode(false);
      setEditId(null);
    } else {
      const newVisitor = {
        ...visitor,
        id: Date.now(),
        status: "Pending",
        inNSAView: false,
        inGateView: false,
        archived: false,
      };
      setVisitorList([...visitorList, newVisitor]);
    }

    setVisitor({
      name: "",
      phone: "",
      facilitator: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const handleEdit = (v) => {
    setVisitor({
      name: v.name,
      phone: v.phone,
      facilitator: v.facilitator,
      date: v.date,
    });
    setEditMode(true);
    setEditId(v.id);
  };

  const handleCheckboxChange = (id) => {
    setSelectedVisitors((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const visibleIds = filteredVisitors.map((v) => v.id);
    const allSelected = visibleIds.every((id) =>
      selectedVisitors.includes(id)
    );
    setSelectedVisitors(allSelected ? [] : visibleIds);
  };

  const handleBulkArchive = () => {
    const updated = visitorList.map((v) =>
      selectedVisitors.includes(v.id) ? {  ...v, archived: true, inNSAView: false, inGateView: false }
      : v
    );
    setVisitorList(updated);
    setSelectedVisitors([]);
  };

  const handleBulkAddToNSA = () => {
    const updated = visitorList.map((v) =>
      selectedVisitors.includes(v.id) && !v.inNSAView
        ? { ...v, inNSAView: true }
        : v
    );
    setVisitorList(updated);
    setSelectedVisitors([]);
  };

  const handleBulkAddToGate = () => {
    const updated = visitorList.map((v) =>
      selectedVisitors.includes(v.id) && !v.inGateView
        ? { ...v, inGateView: true }
        : v
    );
    setVisitorList(updated);
    setSelectedVisitors([]);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = visitorList.map((v) =>
      v.id === id ? { ...v, status: newStatus } : v
    );
    setVisitorList(updated);
  };
  const handleBulkDelete = () => {
    const updated = visitorList.filter((v) => !selectedVisitors.includes(v.id));
    setVisitorList(updated);
    setSelectedVisitors([]);
  };
  
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this visitor?");
    if (confirm) {
      setVisitorList((prev) => prev.filter((v) => v.id !== id));
    }
  };
  

  const filteredVisitors = visitorList.filter((v) => {
    const matchArchive = showArchived ? true : !v.archived;
    const matchStatus = statusFilter ? v.status === statusFilter : true;
    const matchSearch = searchTerm
      ? v.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchArchive && matchStatus && matchSearch;
  });

  // ✅ Styling
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
    form: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },
    input: {
      padding: "10px",
      fontSize: "14px",
    },
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
    td: {
      padding: "10px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
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
    bulkBar: {
      display: "flex",
      gap: "12px",
      marginBottom: "15px",
    },
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
      <p style={styles.subtext}>
        Logged in as: <strong>{user?.username}</strong>
      </p>

      {/* ✅ Visitor Form */}
      <div>
        <h3 style={{ color: "#2d4d2a", marginBottom: "10px" }}>
          {editMode ? "Update Visitor" : "Add New Visitor"}
        </h3>
        <div style={styles.form}>
          <input
            style={styles.input}
            name="name"
            value={visitor.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            style={styles.input}
            name="phone"
            value={visitor.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input
            style={styles.input}
            name="facilitator"
            value={visitor.facilitator}
            onChange={handleChange}
            placeholder="Facilitator"
          />
          <input
            style={styles.input}
            name="date"
            type="date"
            value={visitor.date}
            onChange={handleChange}
          />
          <button style={styles.addButton} onClick={handleAddVisitor}>
            <Plus size={16} />
            {editMode ? "Update" : "Add Visitor"}
          </button>
        </div>
      </div>

      {/* ✅ Filters & Toggles */}
      <input
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ ...styles.input, maxWidth: "250px", marginBottom: "10px" }}
      />

      <select
        style={styles.input}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Filter by Status</option>
        <option value="Pending">Pending</option>
        <option value="Notified">Notified</option>
        <option value="Completed">Completed</option>
      </select>

      <button style={styles.toggleBtn} onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? "Hide Archived" : "Show Archived"}
      </button>

      {/* ✅ Bulk Action Bar */}
      {selectedVisitors.length > 0 && (
        <div style={styles.bulkBar}>
          <button onClick={handleBulkArchive} style={styles.actionBtn}>
            <Archive size={14} /> Archive Selected
          </button>
          <button onClick={handleBulkAddToNSA} style={styles.actionBtn}>
            <ShieldCheck size={14} /> Add to NSA
          </button>
          <button onClick={handleBulkAddToGate} style={styles.actionBtn}>
            <User size={14} /> Add to Gate
          </button>
          <button onClick={handleBulkDelete} style={styles.actionBtn}>
            <Trash2 size={14} /> Delete Selected
          </button>
        </div>
      )}

      {/* ✅ Visitor Table */}
      <div>
        <h3 style={{ color: "#2d4d2a", marginTop: "20px" }}>Visitor List</h3>
        {filteredVisitors.length === 0 ? (
          <p>No visitors found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  <input
                    type="checkbox"
                    checked={
                      selectedVisitors.length === filteredVisitors.length &&
                      filteredVisitors.length > 0
                    }
                    onChange={handleSelectAll}
                  />
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
              {filteredVisitors.map((v) => (
                <tr key={v.id}>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={selectedVisitors.includes(v.id)}
                      onChange={() => handleCheckboxChange(v.id)}
                    />
                  </td>
                  <td style={styles.td}>{v.name}</td>
                  <td style={styles.td}>{v.phone}</td>
                  <td style={styles.td}>{v.facilitator}</td>
                  <td style={styles.td}>{v.date}</td>
                  <td style={styles.td}>
                    <select
                      value={v.status}
                      onChange={(e) => handleStatusChange(v.id, e.target.value)}
                      style={styles.input}
                    >
                      <option>Pending</option>
                      <option>Notified</option>
                      <option>Completed</option>
                    </select>
                  </td>
                  {showArchived && (
                    <td style={styles.td}>{v.archived ? "Yes" : "No"}</td>
                  )}
                  <td style={styles.td}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button style={styles.actionBtn} onClick={() => handleEdit(v)}>
                     <Edit size={14} /> Edit
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleDelete(v.id)}>
                     <Trash2 size={14} /> Del
                    </button>
                </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageLayout>
  );
};

export default Admin;
