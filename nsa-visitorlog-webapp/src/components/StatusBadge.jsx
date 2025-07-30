// src/components/StatusBadge.jsx
import React from "react";

const badgeStyles = {
  base: {
    display: "inline-block",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "20px",
    color: "#fff",
    minWidth: "80px",
    textAlign: "center",
  },
  Pending: { backgroundColor: "#e6c200" },   // Yellow
  Notified: { backgroundColor: "#007bff" },  // Blue
  Completed: { backgroundColor: "#28a745" }, // Green
};

const StatusBadge = ({ status }) => {
  const style = {
    ...badgeStyles.base,
    ...badgeStyles[status] || { backgroundColor: "#888" }, // default gray
  };

  return <span style={style}>{status}</span>;
};

export default StatusBadge;
