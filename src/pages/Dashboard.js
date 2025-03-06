import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/ShiftCalender.css"; // Import custom CSS
import Sidebar from "../components/sidebar";
const localizer = momentLocalizer(moment);

// Sample list of 20 employees
const users = [
  "Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Harry",
  "Ivy", "Jack", "Katie", "Liam", "Mia", "Noah", "Olivia", "Paul", "Quinn",
  "Rachel", "Sam", "Tom"
];

// Function to assign employees to shifts
const assignShifts = (date, userList) => {
  return [
    {
      title: `Morning Shift: ${userList.slice(0, 5).join(", ")}`,
      start: moment(date).set({ hour: 6 }).toDate(),
      end: moment(date).set({ hour: 14 }).toDate(),
      className: "rbc-event-1"
    },
    {
      title: `Afternoon Shift: ${userList.slice(5, 10).join(", ")}`,
      start: moment(date).set({ hour: 14 }).toDate(),
      end: moment(date).set({ hour: 23 }).toDate(),
      className: "rbc-event-2"
    },
    {
      title: `Night Shift: ${userList.slice(10, 15).join(", ")}`,
      start: moment(date).set({ hour: 0 }).toDate(),
      end: moment(date).set({ hour: 6 }).toDate(),
      className: "rbc-event-3"
    }
  ];
};

const ShiftCalendar = () => {
  const [events, setEvents] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("isoWeek"));
  const [userList, setUserList] = useState(users);

  // Function to generate schedule based on current state
  const generateSchedule = useCallback((weekStart, users) => {
    let newSchedule = [];
    for (let i = 0; i < 7; i++) {
      let day = weekStart.clone().add(i, "days");
      newSchedule = [...newSchedule, ...assignShifts(day, users)];
    }
    setEvents(newSchedule);
  }, []);

  // Update shifts when week or user list changes
  useEffect(() => {
    generateSchedule(currentWeek, userList);
  }, [currentWeek, userList, generateSchedule]);

  // Handle Next Button Click
  const handleNextWeek = () => {
    setCurrentWeek(prevWeek => prevWeek.clone().add(1, "week")); // Move to next week
    setUserList(prevUsers => [...prevUsers.slice(5), ...prevUsers.slice(0, 5)]); // Rotate users
  };

  // Handle Back Button Click
  const handlePreviousWeek = () => {
    setCurrentWeek(prevWeek => prevWeek.clone().subtract(1, "week")); // Move to previous week
    setUserList(prevUsers => [...prevUsers.slice(-5), ...prevUsers.slice(0, -5)]); // Rotate users
  };

  return (
    <div className="main-container1">
            <Sidebar />
    <div className="calendar-wrapper">
      <h2>Shift Management System</h2>
      <h3>Week of {currentWeek.format("MMMM Do YYYY")}</h3>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.WEEK}
          views={{ week: true }}
          style={{ height: 600, width: '100%' }} // Adjust width to 100%
          date={currentWeek.toDate()} // Update calendar's starting date
          onNavigate={(date, view, action) => {
            if (action === "NEXT") {
              handleNextWeek();
            } else if (action === "PREV") {
              handlePreviousWeek();
            }
          }}
        />
      </div>
    </div>
    </div>
  );
};

export default ShiftCalendar;