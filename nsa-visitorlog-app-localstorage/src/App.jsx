// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Nsa from "./pages/Nsa";
import Security from "./pages/Security";
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/nsa" element={<Nsa />} />
          <Route path="/security" element={<Security />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/admin/users" element={<UserManagement />} />
 

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
