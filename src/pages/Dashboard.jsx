// import axios from "axios";
// import { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Sidebar from "../components/Sidebar";

// const shifts = [
//   { id: 1, time: "10am-7pm" },
//   { id: 2, time: "4pm-12am" },
//   { id: 3, time: "7pm-4am" },
//   { id: 4, time: "4am-1pm" },
// ];

// const ShiftTable = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [shiftData, setShiftData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedShift, setSelectedShift] = useState("");
//   const [userEskoId, setUserEskoId] = useState("");

//   useEffect(() => {
//   const eskoIdFromStorage = localStorage.getItem("eskoId");
//   setUserEskoId(eskoIdFromStorage);
//     }, []);
//   const fetchShiftDetails = async (date) => {
//     const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
//     try {
//       const response = await axios.get(`http://localhost:5000/api/get-shifts-by-date?shift_date=${formattedDate}`);
//       setShiftData(response.data);
//     } catch (error) {
//       console.error("Error fetching shift details:", error);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleShiftChange = (e) => {
//     setSelectedShift(e.target.value);
//   };

//   const filteredShiftData = shiftData.filter((shift) => {
//     const matchesSearchTerm =
//       shift.eskoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       shift.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       shift.employee_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       shift.shift_time.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesSelectedShift = selectedShift === "" || shift.shift_time === selectedShift;

//     return matchesSearchTerm && matchesSelectedShift;
//   });

//   useEffect(() => {
//     fetchShiftDetails(selectedDate);
//   }, [selectedDate]);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-4 ml-64 mr-24">
//         <h2 className="text-2xl font-bold mb-4">Shift Schedule</h2>
//         <h1>Hello, {userEskoId} 👋</h1>


//         <div className="flex space-x-48 mb-4">
//           <div className="flex flex-col items-start">
//             <span className="block mb-2 font-semibold text-esko">Select Date:</span>
//             <DatePicker  className="border p-1"
//               selected={selectedDate}
//               onChange={(date) => {
//                 setSelectedDate(date);
//                 fetchShiftDetails(date);
//               }}
//               dateFormat="yyyy-MM-dd"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-semibold text-esko">Search Employee:</label>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="border p-1"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-semibold text-esko">Filter by Shift:</label>
//             <select
//               value={selectedShift}
//               onChange={handleShiftChange}
//               className="border p-1 w-40"
//             >
//               <option value="">All Shifts</option>
//               {shifts.map((shift) => (
//                 <option key={shift.id} value={shift.time}>
//                   {shift.time}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//                   <th className="py-2 text-center text-limeGreen">Employee ID</th>
//               <th className="py-2 text-center text-limeGreen">Employee Name</th>
//                <th className="py-2 text-center text-limeGreen">Contact</th>
//                <th className="py-2 text-limeGreen text-center">Employee Status</th>
//                <th className="py-2 text-center text-limeGreen">Shift Timings</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {filteredShiftData.map((shift, index) => (
//               <tr key={index}>
//                 <td className="border px-4 py-2 text-center font-semibold">{shift.id}</td>
//                 <td className="border px-4 py-2 text-center font-semibold">{shift.eskoId}</td>
//                 <td className="border px-4 py-2 text-center font-semibold">{shift.contact}</td>
//                 <td className="border px-4 py-2 text-center font-semibold">{shift.employee_status}</td>
//                 <td className="border px-4 py-2 text-center font-semibold">{shift.shift_time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ShiftTable;
import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../components/Sidebar";
import { jwtDecode } from 'jwt-decode';

const shifts = [
  { id: 1, time: "10am-7pm" },
  { id: 2, time: "4pm-12am" },
  { id: 3, time: "7pm-4am" },
  { id: 4, time: "4am-1pm" },
];

const ShiftTable = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shiftData, setShiftData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [userEskoId, setUserEskoId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      setUserEskoId(decoded.eskoId);
    }
  }, []);

  const fetchShiftDetails = async (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
    try {
      const response = await axios.get(`http://localhost:5000/api/get-shifts-by-date?shift_date=${formattedDate}`);
      setShiftData(response.data);
    } catch (error) {
      console.error("Error fetching shift details:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShiftChange = (e) => {
    setSelectedShift(e.target.value);
  };

  const filteredShiftData = shiftData.filter((shift) => {
    const matchesSearchTerm =
      shift.eskoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.employee_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.shift_time.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSelectedShift = selectedShift === "" || shift.shift_time === selectedShift;

    return matchesSearchTerm && matchesSelectedShift;
  });

  useEffect(() => {
    fetchShiftDetails(selectedDate);
  }, [selectedDate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 ml-64 mr-24">
        <h2 className="text-2xl font-bold mb-4">Shift Schedule</h2>
        <h1>Hello, {userEskoId} 👋</h1>


        <div className="flex space-x-48 mb-4">
          <div className="flex flex-col items-start">
            <span className="block mb-2 font-semibold text-esko">Select Date:</span>
            <DatePicker  className="border p-1"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                fetchShiftDetails(date);
              }}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-esko">Search Employee:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-1"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-esko">Filter by Shift:</label>
            <select
              value={selectedShift}
              onChange={handleShiftChange}
              className="border p-1 w-40"
            >
              <option value="">All Shifts</option>
              {shifts.map((shift) => (
                <option key={shift.id} value={shift.time}>
                  {shift.time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
                  <th className="py-2 text-center text-limeGreen">Employee ID</th>
              <th className="py-2 text-center text-limeGreen">Employee Name</th>
               <th className="py-2 text-center text-limeGreen">Contact</th>
               <th className="py-2 text-limeGreen text-center">Employee Status</th>
               <th className="py-2 text-center text-limeGreen">Shift Timings</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredShiftData.map((shift, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-center font-semibold">{shift.id}</td>
                <td className="border px-4 py-2 text-center font-semibold">{shift.eskoId}</td>
                <td className="border px-4 py-2 text-center font-semibold">{shift.contact}</td>
                <td className="border px-4 py-2 text-center font-semibold">{shift.employee_status}</td>
                <td className="border px-4 py-2 text-center font-semibold">{shift.shift_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftTable;




