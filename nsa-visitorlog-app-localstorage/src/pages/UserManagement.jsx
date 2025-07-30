// src/pages/UserManagement.jsx
import React, { useState, useEffect, useContext } from "react";
import PageLayout from "../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import { AuthContext } from "../context/AuthContext";

const DEFAULT_ADMIN = {
  name: "System Admin",
  username: "admin",
  password: "admin123",
  role: "admin",
};

const UserManagement = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [editData, setEditData] = useState({});
  const [showPasswords, setShowPasswords] = useState({});
  const usersPerPage = 5;

  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const stored = localStorage.getItem("userList");
    let parsed = stored ? JSON.parse(stored) : [];

    const hasAdmin = parsed.some((u) => u.username === "admin");
    if (!hasAdmin) {
      parsed = [DEFAULT_ADMIN, ...parsed];
      localStorage.setItem("userList", JSON.stringify(parsed));
    }

    setUsers(parsed);
  }, []);

  const saveUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem("userList", JSON.stringify(updated));
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const deleteUser = (username) => {
    if (username === "admin") return alert("❌ Cannot delete default admin.");
    const confirm = window.confirm(`Delete user "${username}"?`);
    if (!confirm) return;
    const updated = users.filter((u) => u.username !== username);
    saveUsers(updated);
  };

  const exportToCSV = () => {
    const csv = [
      ["Name", "Username", "Role"],
      ...filteredUsers.map((u) => [u.name, u.username, u.role]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "user_list.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("User List", 14, 16);
    doc.autoTable({
      startY: 20,
      head: [["Name", "Username", "Role"]],
      body: filteredUsers.map((u) => [u.name, u.username, u.role]),
    });
    doc.save("user_list.pdf");
  };

  const getRoleCount = (role) => users.filter((u) => u.role === role).length;

  const handleEdit = (username) => {
    const target = users.find((u) => u.username === username);
    setEditUser(username);
    setEditData({ ...target });
  };

  const handleSave = () => {
    if (!editData.name || !editData.password || !editData.role) {
      alert("All fields required");
      return;
    }
    const updated = users.map((u) =>
      u.username === editUser ? { ...editData } : u
    );
    saveUsers(updated);
    setEditUser(null);
  };

  const togglePasswordVisibility = (username) => {
    setShowPasswords((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  return (
    <PageLayout role="admin" onLogout={() => navigate("/")}>
      <h2 style={styles.header}>User Management</h2>

      {/* Create New User */}
      <div style={{ ...styles.section, marginBottom: "20px" }}>
        <h4>Create New User</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const name = form.name.value.trim();
            const username = form.username.value.trim();
            const password = form.password.value.trim();
            const role = form.role.value;

            if (!name || !username || !password) {
              alert("All fields are required");
              return;
            }

            if (username === "admin") {
              alert("❌ Cannot create user with username 'admin'");
              return;
            }

            if (users.some((u) => u.username === username)) {
              alert("❌ Username already exists");
              return;
            }

            const newUser = { name, username, password, role };
            const updated = [...users, newUser];
            saveUsers(updated);
            form.reset();
            alert(`✅ User "${username}" created successfully.`);
          }}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input name="name" placeholder="Full Name" style={styles.input} />
            <input name="username" placeholder="Username" style={styles.input} />
            <input name="password" type="password" placeholder="Password" style={styles.input} />
            <select name="role" defaultValue="nsa" style={styles.input}>
              <option value="admin">Admin</option>
              <option value="nsa">NSA</option>
              <option value="gate">Gate</option>
            </select>
            <button type="submit" style={styles.button}>Create User</button>
          </div>
        </form>
      </div>

      {/* Summary + Export */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        {["Total Users", "admin", "nsa", "gate"].map((r, i) => (
          <div key={i} style={{ ...styles.section, flex: 1 }}>
            <h4>{r === "Total Users" ? r : `${r.toUpperCase()}s`}</h4>
            <p>{r === "Total Users" ? users.length : getRoleCount(r)}</p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
        <input
          placeholder="Search by username or name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={styles.input}
        />
        <button style={styles.button} onClick={exportToCSV}>Export CSV</button>
        <button style={styles.button} onClick={exportToPDF}>Export PDF</button>
      </div>

      {/* Users Table */}
      <div style={styles.section}>
        <h4>All Users</h4>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.cell}>Name</th>
              <th style={styles.cell}>Username</th>
              <th style={styles.cell}>Role</th>
              <th style={styles.cell}>Password</th>
              <th style={styles.cell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 && (
              <tr><td colSpan="5" style={styles.cell}>No users found.</td></tr>
            )}
            {currentUsers.map((u) => (
              <tr key={u.username}>
                <td style={styles.cell}>
                  {editUser === u.username ? (
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      style={{ padding: "4px", width: "90%" }}
                    />
                  ) : u.name || "—"}
                </td>
                <td style={styles.cell}>{u.username}</td>
                <td style={styles.cell}>
                  {u.username === "admin" ? (
                    "admin"
                  ) : editUser === u.username ? (
                    <select
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    >
                      <option value="admin">admin</option>
                      <option value="nsa">nsa</option>
                      <option value="gate">gate</option>
                    </select>
                  ) : u.role}
                </td>
                <td style={styles.cell}>
                  {editUser === u.username ? (
                    <input
                      type={showPasswords[u.username] ? "text" : "password"}
                      value={editData.password}
                      onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                      style={{ padding: "4px", width: "90%" }}
                    />
                  ) : (
                    <>
                      <span>{showPasswords[u.username] ? u.password : "••••••"}</span>{" "}
                      <button
                        onClick={() => togglePasswordVisibility(u.username)}
                        style={{
                          marginLeft: "5px",
                          fontSize: "12px",
                          padding: "2px 6px",
                          backgroundColor: "#ccc",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        {showPasswords[u.username] ? "Hide" : "Show"}
                      </button>
                    </>
                  )}
                </td>
                <td style={styles.cell}>
                  {u.username !== "admin" ? (
                    editUser === u.username ? (
                      <>
                        <button style={styles.button} onClick={handleSave}>Save</button>
                        <button style={{ ...styles.button, backgroundColor: "#888" }} onClick={() => setEditUser(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button style={styles.button} onClick={() => handleEdit(u.username)}>Edit</button>
                        <button style={{ ...styles.button, backgroundColor: "#8B0000" }} onClick={() => deleteUser(u.username)}>Delete</button>
                      </>
                    )
                  ) : <i>Protected</i>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  ...styles.button,
                  backgroundColor: i + 1 === currentPage ? "#416d3c" : "#ccc",
                  color: i + 1 === currentPage ? "white" : "#333",
                  marginRight: "5px",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

const styles = {
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2d4d2a",
  },
  section: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
  },
  input: {
    padding: "8px",
    flex: "1",
    minWidth: "160px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  cell: {
    border: "1px solid #ccc",
    padding: "8px",
    fontSize: "14px",
    textAlign: "left",
  },
  button: {
    marginRight: "8px",
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#2d4d2a",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

export default UserManagement;
