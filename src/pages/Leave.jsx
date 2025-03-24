import React from 'react';
import LeaveDetailsComponent from '../components/LeaveDetailsComponent';
import CompOffLeave1 from '../components/CompoffLeave1';
import Calendar1 from '../components/Calender1';
import Sidebar from '../components/Sidebar'
const Leave = () => {
  return (
    <div className="container  p-2 ml-[100px] ">
      <Sidebar/>
      <div className="mb-4">
        <LeaveDetailsComponent />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-40">
        <div className="md:col-span-1 flex justify-center items-center">
          <CompOffLeave1 />
        </div>
        <div className="md:col-span-1 mr-3">
          <Calendar1 />
        </div>
      </div>
    </div>
  );
};

export default Leave;