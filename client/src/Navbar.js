import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "15px 30px",
        background: darkMode
          ? "#222"
          : "linear-gradient(90deg, #007bff, #00b4d8)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        marginBottom: "25px",
      }}
    >
      {/* Logo */}
      <h2 style={{ margin: 0 }}>Department Resource Portal</h2>

      {/* Navigation */}
      <div>
        <Link
          to="/upload"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px",
            fontSize: "18px",
          }}
        >
          Upload
        </Link>

        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px",
            fontSize: "18px",
          }}
        >
          Dashboard
        </Link>

        {/* Dark Mode Button */}
        <button
          onClick={toggleDarkMode}
          style={{
            padding: "8px 15px",
            marginRight: "15px",
            background: "#333",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            padding: "8px 15px",
            background: "#ff4757",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;