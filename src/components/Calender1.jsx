import React from 'react';

const Calendar1 = () => {
  const leaveDays = [2, 5, 12, 18, 25]; 

  const renderDays = () => {
    const daysInMonth = 31;
    const firstDayOfMonth = 1; 
    const days = [];

    for (let i = 1; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isLeaveDay = leaveDays.includes(i);
      days.push(
        <div
          key={i}
          className={`p-2 border rounded text-center ${isLeaveDay ? 'bg-esko1' : ''}`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-4 bg-white rounded shadow w-[95%]">
      <h2 className="text-xl font-bold mb-4 text-limeGreen">Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        <div className="font-bold">Mon</div>
        <div className="font-bold">Tue</div>
        <div className="font-bold">Wed</div>
        <div className="font-bold">Thu</div>
        <div className="font-bold">Fri</div>
        <div className="font-bold">Sat</div>
        <div className="font-bold">Sun</div>
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar1;