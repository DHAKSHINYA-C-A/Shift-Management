import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faCalendarAlt, faUsers, faChartBar, faUserClock, faHandHoldingUsd, faStickyNote, faCog } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [selectedTeam, setSelectedTeam] = useState("TechOps");
  const [theme, setTheme] = useState("Light");
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="w-50% h-screen bg-white shadow-lg flex flex-col items-center pt-4 fixed left-0 top-0 p-6">
      <img
        src="https://res.cloudinary.com/duj7wgdt8/image/upload/v1741064923/kiziq1kkhw0bdazvh797.jpg"
        alt="ESKO logo"
        className="w-28 mb-6"
      />

      <nav className="w-full">
        <a
          href="/dash"
          className={`flex items-center p-2.5 text-gray-800 text-base transition-colors duration-300 rounded-lg w-full box-border no-underline ${
            activeItem === "Dashboard" ? "bg-gray-300" : "hover:bg-gray-200 "
          }`}
          onClick={() => setActiveItem("Dashboard")}
        >
          <FontAwesomeIcon icon={faThLarge} className="mr-3 text-xl " /> Dashboard
        </a>
        <a
          href="/shifts"
          className={`no-underline flex items-center p-2.5 text-gray-800 text-base transition-colors duration-300 rounded-lg w-full box-border ${
            activeItem === "Shifts" ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveItem("Shifts")}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-xl" /> Shifts
        </a>
        <a
          href="/employees"
          className={`no-underline flex items-center p-2.5 text-gray-800 text-base transition-colors duration-300 rounded-lg w-full box-border ${
            activeItem === "Employees" ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveItem("Employees")}
        >
          <FontAwesomeIcon icon={faUsers} className="mr-3 text-xl" /> Employees
        </a>
        <a
          href="/report"
          className={`no-underline flex items-center p-2.5 text-gray-800 text-base transition-colors duration-300 rounded-lg w-full box-border ${
            activeItem === "Reports" ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveItem("Reports")}
        >
          <FontAwesomeIcon icon={faChartBar} className="mr-3 text-xl" /> Reports
        </a>

        {/* Team Selection */}
        <div className="w-3/5 p-3">
          <strong className="block mb-2 text-sm">Team</strong>
          <label className="flex items-center mt-2 text-sm">
            <input
              type="radio"
              name="team"
              checked={selectedTeam === "TechOps"}
              onChange={() => setSelectedTeam("TechOps")}
              className="mr-2"
            />
            TechOps
          </label>
          <label className="flex items-center mt-2 text-sm">
            <input
              type="radio"
              name="team"
              checked={selectedTeam === "DevOps"}
              onChange={() => setSelectedTeam("DevOps")}
              className="mr-2"
            />
            DevOps
          </label>
        </div>

        <a
          href="/leave"
          className={`no-underline flex items-center p-2.5 text-gray-800 text-base transition-colors duration-300 rounded-lg w-full box-border ${
            activeItem === "Leave Tracker" ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveItem("Leave Tracker")}
        >
          <FontAwesomeIcon icon={faUserClock} className="mr-3 text-xl" /> Leave Tracker
        </a>
        <a
          href="/pay"
          className={`no-underline flex items-center p-2.5 text-gray-800 text-base transition-colors duration-300 rounded-lg w-full box-border ${
            activeItem === "Shift Allowance" ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveItem("Shift Allowance")}
        >
          <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-3 text-xl" /> Shift Allowance
        </a>
        <a
          href="/notes"
          className={`no-underline flex items-center p-2.5 text-gray-800 text-base transition-colors duration-300 rounded-lg w-full box-border ${
            activeItem === "Notes" ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveItem("Notes")}
        >
          <FontAwesomeIcon icon={faStickyNote} className="mr-3 text-xl" /> Notes
        </a>

        
        <div className="w-full p-1.5">
          <strong className="block mb-2 text-sm">Theme</strong>
          <label className="flex items-center mt-2 text-sm">
            <input
              type="radio"
              name="theme"
              checked={theme === "Light"}
              onChange={() => setTheme("Light")}
              className="mr-2"
            />
            Light
          </label>
          <label className="flex items-center mt-2 text-sm">
            <input
              type="radio"
              name="theme"
              checked={theme === "Dark"}
              onChange={() => setTheme("Dark")}
              className="mr-2"
            />
            Dark
          </label>
        </div>

        <a
          href="/settings"
          className={`no-underline flex items-center p-2.5 text-gray-800 text-base transition-colors duration-300 rounded-lg w-full box-border ${
            activeItem === "Settings" ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveItem("Settings")}
        >
          <FontAwesomeIcon icon={faCog} className="mr-3 text-xl" /> Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;