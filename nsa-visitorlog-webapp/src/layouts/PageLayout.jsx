import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const PageLayout = ({ role, onLogout, children }) => {
  const styles = {
    wrapper: {
      display: "flex",
      height: "100vh",
    },
    main: {
      flex: 1,
      padding: "20px",
      overflowY: "auto",
      backgroundColor: "#f7f7f7",
    },
  };

  return (
    <div>
      <Topbar />
      <div style={styles.wrapper}>
        <Sidebar role={role} onLogout={onLogout} />
        <div style={styles.main}>{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
