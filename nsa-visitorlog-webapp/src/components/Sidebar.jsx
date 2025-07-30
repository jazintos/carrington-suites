// src/components/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  UserCheck,
  User,
  LogOut,
  Menu,
  X,
  Users,
} from "lucide-react";

const Sidebar = ({ role, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => setCollapsed(!collapsed);

  const styles = {
    sidebar: {
      width: collapsed ? "60px" : "220px",
      height: "100vh",
      backgroundColor: "#2d4d2a",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "width 0.3s ease",
    },
    top: {
      display: "flex",
      justifyContent: collapsed ? "center" : "space-between",
      alignItems: "center",
      padding: "10px 20px",
    },
    toggleBtn: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "18px",
      cursor: "pointer",
    },
    navSection: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      padding: "10px 20px",
    },
    sectionLabel: {
      fontSize: "14px",
      fontWeight: "bold",
      margin: "10px 0 10px",
      color: "#FFF",
    },
    navItem: (isActive) => ({
      backgroundColor: isActive ? "#416d3c" : "transparent",
      color: isActive ? "#fff" : "white",
      border: "none",
      textAlign: "left",
      padding: "10px",
      fontSize: "15px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      borderRadius: "4px",
      transition: "background 0.2s ease",
      ...(collapsed && { justifyContent: "center" }),
    }),
    logoutButton: {
      backgroundColor: "#008000",
      border: "none",
      padding: "10px",
      fontSize: "15px",
      color: "white",
      cursor: "pointer",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
    },
  };

  const getNavItems = () => {
    const common = {
      dashboard: {
        label: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
      admin: {
        label: "Admin View",
        path: "/admin",
        icon: <UserCheck size={18} />,
      },
      nsa: {
        label: "NSA View",
        path: "/nsa",
        icon: <ShieldCheck size={18} />,
      },
      gate: {
        label: "Gate View",
        path: "/security",
        icon: <User size={18} />,
      },
      users: {
        label: "Manage Users",
        path: "/admin/users",
        icon: <Users size={18} />,
      },
    };

    if (role === "admin") return [common.dashboard, common.admin, common.nsa, common.gate, common.users];
    if (role === "nsa") return [common.nsa, common.dashboard];
    if (role === "gate") return [common.gate];
    return [];
  };

  const navItems = getNavItems();

  return (
    <div style={styles.sidebar}>
      <div>
        <div style={styles.top}>
          {!collapsed && <h3 style={styles.sectionLabel}>VIEWS</h3>}
          <button onClick={handleToggle} style={styles.toggleBtn}>
            {collapsed ? <Menu /> : <X />}
          </button>
        </div>

        <div style={styles.navSection}>
          {navItems.map(({ label, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                style={styles.navItem(isActive)}
                onClick={() => navigate(path)}
                title={collapsed ? label : null}
              >
                {icon}
                {!collapsed && label}
              </button>
            );
          })}

          <div
            style={{
              borderTop: "1px solid #444",
              marginTop: "20px",
              paddingTop: "15px",
            }}
          >
            <button
              style={styles.logoutButton}
              onClick={onLogout}
              title="Logout"
            >
              <LogOut size={18} />
              {!collapsed && "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
