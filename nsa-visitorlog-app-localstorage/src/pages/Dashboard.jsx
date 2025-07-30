// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [visitorList, setVisitorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const pieRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("visitorList");
    if (stored) {
      setVisitorList(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusCount = (status) =>
    visitorList.filter((v) => v.status === status && !v.archived).length;

  const getTodayVisitors = () => {
    const today = new Date().toISOString().slice(0, 10);
    return visitorList.filter((v) => v.date === today && !v.archived);
  };

  const getFacilitatorStats = () => {
    const map = {};
    visitorList.forEach((v) => {
      if (!v.archived) {
        map[v.facilitator] = (map[v.facilitator] || 0) + 1;
      }
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const getVisitorHistory = () => {
    const matches = visitorList.filter((v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const visitsByName = {};
    matches.forEach((v) => {
      if (!visitsByName[v.name]) visitsByName[v.name] = [];
      visitsByName[v.name].push(v.date);
    });
    return visitsByName;
  };

  const getMonthlyStats = () => {
    if (!dateRange.start || !dateRange.end) return [];
    return visitorList.filter((v) => {
      const visitDate = new Date(v.date);
      return (
        visitDate >= new Date(dateRange.start) &&
        visitDate <= new Date(dateRange.end) &&
        !v.archived
      );
    });
  };

  const chartData = {
    labels: ["Pending", "Notified", "Completed"],
    datasets: [
      {
        label: "Visitor Status",
        data: [
          getStatusCount("Pending"),
          getStatusCount("Notified"),
          getStatusCount("Completed"),
        ],
        backgroundColor: ["#ffc107", "#007bff", "#28a745"],
        borderWidth: 1,
      },
    ],
  };

  const getWeeklyBreakdown = () => {
    const breakdown = Array(7).fill(0);
    const today = new Date();
    visitorList.forEach((v) => {
      if (!v.archived) {
        const visitDate = new Date(v.date);
        const diff = Math.floor((today - visitDate) / (1000 * 60 * 60 * 24));
        if (diff >= 0 && diff < 7) {
          breakdown[6 - diff] += 1;
        }
      }
    });

    const labels = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });

    return {
      labels,
      datasets: [
        {
          label: "Visits",
          data: breakdown,
          backgroundColor: "#2d4d2a",
        },
      ],
    };
  };

  const exportToPDF = async () => {
    const input = document.getElementById("dashboard-charts");
    const canvas = await html2canvas(input);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(img, "PNG", 10, 10, 270, 160);
    pdf.save("visitor-dashboard.pdf");
  };

  const exportToCSV = () => {
    const rows = [["Name", "Phone", "Facilitator", "Date", "Status"]];
    visitorList.forEach((v) => {
      if (!v.archived) {
        rows.push([v.name, v.phone, v.facilitator, v.date, v.status]);
      }
    });
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "visitor_list.csv";
    a.click();
  };

  const sectionStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
  };

  const sectionStyle2 = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "25px",
    backgroundColor: "#f9f9f9",
  };

  const ButtonStyle = {
    backgroundColor: "#008000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const thtd = {
    border: "1px solid #ccc",
    padding: "8px",
    fontSize: "14px",
    textAlign: "left",
  };

  return (
    <PageLayout role={user?.role} onLogout={handleLogout}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#2d4d2a" }}>
        Dashboard
      </h2>
      <p style={{ fontSize: "16px", color: "#444" }}>
        Summary View for: <strong>{user?.username}</strong>
      </p>
      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
      <p style={{ fontSize: "13px", color: "#444" }}>
        <strong>FIlter Dates For Stats:</strong>
      </p>
        <input style={{padding:"7px", border:"1px", borderRadius:"5px"}}
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, start: e.target.value }))
          }
        />
        <input style={{padding:"7px", border:"1px", borderRadius:"5px"}}
          type="date"
          value={dateRange.end}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, end: e.target.value }))
          }
        />
        
        <button style={ButtonStyle} onClick={exportToPDF}>Export Charts to PDF</button>
        <button style={ButtonStyle} onClick={exportToCSV}>Export Table to CSV</button>
      </div>

      <div id="dashboard-charts" style={grid}>
        <div style={sectionStyle}>
          <h4>Status Distribution</h4>
          <Pie data={chartData} />
        </div>
        <div style={sectionStyle}>
          <h4>Weekly Visitor Count</h4>
          <Bar data={getWeeklyBreakdown()} />
        </div>
        <div style={sectionStyle2}>
          <u><h4>Visitor Stats</h4></u>
          <p>Pending: {getStatusCount("Pending")}</p>
          <p>Notified: {getStatusCount("Notified")}</p>
          <p>Completed: {getStatusCount("Completed")}</p>
          <p>Today's Visitors: {getTodayVisitors().length}</p>
        </div>
   
      </div>

      {/* Filtered Table by Status */}
      <div style={{ ...grid, marginTop: "40px" }}>
        {["Pending", "Notified", "Completed"].map((status) => (
          <div style={sectionStyle} key={status}>
            <h4>{status} Visitors</h4>
            <table style={table}>
              <thead>
                <tr>
                  <th style={thtd}>Name</th>
                  <th style={thtd}>Phone</th>
                  <th style={thtd}>Facilitator</th>
                  <th style={thtd}>Date</th>
                </tr>
              </thead>
              <tbody>
                {visitorList
                  .filter((v) => v.status === status && !v.archived)
                  .map((v) => (
                    <tr key={v.id}>
                      <td style={thtd}>{v.name}</td>
                      <td style={thtd}>{v.phone}</td>
                      <td style={thtd}>{v.facilitator}</td>
                      <td style={thtd}>{v.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Visitor History (Moved to bottom) */}
        <div style={sectionStyle}>
          <h4>Visitor History</h4>
          <input
            placeholder="Search visitor name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
          />
          {searchTerm &&
            Object.entries(getVisitorHistory()).map(([name, dates]) => (
              <div key={name} style={{ marginBottom: "10px" }}>
                <strong>{name}</strong> – {dates.length} visit(s)
                <ul>
                  {dates.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* Archived Visitors */}
        <div style={sectionStyle}>
          <h4>Archived Visitors</h4>
          <table style={table}>
            <thead>
              <tr>
                <th style={thtd}>Name</th>
                <th style={thtd}>Phone</th>
                <th style={thtd}>Facilitator</th>
                <th style={thtd}>Date</th>
              </tr>
            </thead>
            <tbody>
              {visitorList
                .filter((v) => v.archived)
                .map((v) => (
                  <tr key={v.id}>
                    <td style={thtd}>{v.name}</td>
                    <td style={thtd}>{v.phone}</td>
                    <td style={thtd}>{v.facilitator}</td>
                    <td style={thtd}>{v.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={sectionStyle2}>
        <u><h4>Top Facilitators</h4></u>
          <ul>
            {getFacilitatorStats().map(([facilitator, count], idx) => (
               <li key={idx}> 
               <strong>{facilitator || "Unspecified"} : {count} </strong>  Facilitation(s) made.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
  
};

export default Dashboard;
