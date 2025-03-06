import React, { useState } from "react";
import "../styles/sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = () => {
  const [selectedTeam, setSelectedTeam] = useState("TechOps");
  const [theme, setTheme] = useState("Light");
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="sidebar">
      <img
        src="https://res.cloudinary.com/duj7wgdt8/image/upload/v1741064923/kiziq1kkhw0bdazvh797.jpg"
        alt="ESKO logo"
        className="logo1"
      />

      <nav className="nav">
        <a
          href="/dash"
          className={`nav-item ${activeItem === "Dashboard" ? "active" : ""}`}
          onClick={() => setActiveItem("Dashboard")}
        >
          <i className="fas fa-th-large"></i> Dashboard
        </a>
        <a
          href="/shifts"
          className={`nav-item ${activeItem === "Shifts" ? "active" : ""}`}
          onClick={() => setActiveItem("Shifts")}
        >
          <i className="fas fa-calendar-alt"></i> Shifts
        </a>
        <a
          href="/employees"
          className={`nav-item ${activeItem === "Employees" ? "active" : ""}`}
          onClick={() => setActiveItem("Employees")}
        >
          <i className="fas fa-users"></i> Employees
        </a>
        <a
          href="/report"
          className={`nav-item ${activeItem === "Reports" ? "active" : ""}`}
          onClick={() => setActiveItem("Reports")}
        >
          <i className="fas fa-chart-bar"></i> Reports
        </a>

        {/* Team Selection */}
        <div className="radio-group">
          <strong>Team</strong>
          <label>
            <input
              type="radio"
              name="team"
              checked={selectedTeam === "TechOps"}
              onChange={() => setSelectedTeam("TechOps")}
            />
            TechOps
          </label>
          <label>
            <input
              type="radio"
              name="team"
              checked={selectedTeam === "DevOps"}
              onChange={() => setSelectedTeam("DevOps")}
            />
            DevOps
          </label>
        </div>

        <a
          href="/leave-tracker"
          className={`nav-item ${activeItem === "Leave Tracker" ? "active" : ""}`}
          onClick={() => setActiveItem("Leave Tracker")}
        >
          <i className="fas fa-user-clock"></i> Leave Tracker
        </a>
        <a
          href="/shift-allowance"
          className={`nav-item ${activeItem === "Shift Allowance" ? "active" : ""}`}
          onClick={() => setActiveItem("Shift Allowance")}
        >
          <i className="fas fa-hand-holding-usd"></i> Shift Allowance
        </a>
        <a
          href="/notes"
          className={`nav-item ${activeItem === "Notes" ? "active" : ""}`}
          onClick={() => setActiveItem("Notes")}
        >
          <i className="fas fa-sticky-note"></i> Notes
        </a>

        {/* Theme Selection */}
        <div className="radio-group">
          <strong>Theme</strong>
          <label>
            <input
              type="radio"
              name="theme"
              checked={theme === "Light"}
              onChange={() => setTheme("Light")}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              checked={theme === "Dark"}
              onChange={() => setTheme("Dark")}
            />
            Dark
          </label>
        </div>

        <a
          href="/settings"
          className={`nav-item ${activeItem === "Settings" ? "active" : ""}`}
          onClick={() => setActiveItem("Settings")}
        >
          <i className="fas fa-cog"></i> Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
