
import React, { useRef } from "react";
import Sidebar from "../components/Sidebar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
 
// Data for Work Hours (Bar Chart)
const workHoursData = [
  { month: "This Month", hoursWorked: 160, overtime: 10 },
  { month: "Last Month", hoursWorked: 150, overtime: 15 },
];
 
// Data for Performance Metrics (Pie Chart)
const performanceData = [
  { name: "Average Hours", value: 160 },
  { name: "Overtime Hours", value: 20 },
];
 
const COLORS = ["#82ca9d", "#FFBB28"];
 
const Reports = () => {
  const reportRef = useRef(); // Reference for the report section
 
  // Function to generate and download PDF
  const downloadPDF = () => {
    const input = reportRef.current;
 
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
 
      pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
      pdf.save("Report.pdf");
    });
  };
 
  return (
    <div className="flex h-screen w-[1000px] overflow-hidden ml-40">
      <Sidebar className="w-[250px]" />
 
      {/* Report Section */}
      <div className="flex-1 bg-white p-6 overflow-auto" ref={reportRef}>
        <div className="bg-esko1 text-white text-xl font-bold p-4 text-center">
          User Profile
        </div>
 
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 flex-grow">
          {/* Row 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <h2 className="text-lg font-bold mb-2 text-limeGreen">Personal Information</h2>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Employee ID:</strong> 12345</p>
            <p><strong>Department:</strong> IT</p>
          </div>
 
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <h2 className="text-lg font-bold mb-2 text-limeGreen">Current Shift & Notifications</h2>
            <div className="bg-contrast text-white font-bold px-4 py-2 rounded w-fit ">
              Morning (9 AM - 5 PM)
            </div>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Upcoming Shift: 05/03/2025 Morning</li>
              <li>Leave Approved: 01/03/2025</li>
              <li>Company Meeting: 10/03/2025</li>
            </ul>
          </div>
 
          {/* Row 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <h2 className="text-lg font-bold mb-2 text-limeGreen">Leave and Comp Off</h2>
            <p><strong>Total Leaves Taken:</strong> 5</p>
            <p><strong>Total Comp Offs Taken:</strong> 2</p>
            <p><strong>Remaining Leave Balance:</strong> 10</p>
            <p><strong>Remaining Comp Off Balance:</strong> 3</p>
          </div>
 
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <h2 className="text-lg font-bold mb-2 text-limeGreen">Reports and Allowances</h2>
            <p><strong>Shift Allowance Details:</strong></p>
            <ul className="list-disc list-inside text-gray-700">
              <li>January: $200</li>
              <li>February: $220</li>
            </ul>
            <button onClick={downloadPDF} className="mt-2 bg-contrast text-white px-4 py-2 rounded">
              Download Report
            </button>
          </div>
 
          {/* Row 3 */}
          {/* <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2 text-limeGreen">Work Hours</h2>
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-700">[Work Hours Chart]</p>
            </div>
          </div> */}
          <div className="bg-white p-4 rounded-lg shadow-md">
  <h2 className="text-lg font-bold mb-2 text-limeGreen">Work Hours</h2>
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={workHoursData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="hoursWorked" fill="#82ca9d" name="Hours Worked" />
      <Bar dataKey="overtime" fill="#FFBB28" name="Overtime Hours" />
    </BarChart>
  </ResponsiveContainer>
</div>
 
          {/* <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2 text-limeGreen">Performance Metrics</h2>
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-700">[Performance Chart]</p>
            </div>
          </div> */}
          <div className="bg-white p-4 rounded-lg shadow-md">
  <h2 className="text-lg font-bold mb-2 text-limeGreen">Performance Metrics</h2>
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie data={performanceData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
        {performanceData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
 
        </div>
      </div>
    </div>
  );
};
 
export default Reports;
