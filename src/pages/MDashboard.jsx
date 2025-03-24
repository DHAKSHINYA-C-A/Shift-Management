import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../components/Sidebar";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const shifts = [
  { id: 1, time: "10am-7pm" },
  { id: 2, time: "4pm-12am" },
  { id: 3, time: "7pm-4am" },
  { id: 4, time: "4am-1pm" },
];

const MDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shiftData, setShiftData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editShift, setEditShift] = useState(null);
  const [newShiftTime, setNewShiftTime] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchShiftDetails = async (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-shifts-by-date?shift_date=${formattedDate}`
      );
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

    const matchesSelectedShift =
      selectedShift === "" || shift.shift_time === selectedShift;

    return matchesSearchTerm && matchesSelectedShift;
  });

  useEffect(() => {
    fetchShiftDetails(selectedDate);
  }, [selectedDate]);

  const openEditModal = (shift) => {
    setEditShift(shift);
    setNewShiftTime(shift.shift_time);
    setEditModalOpen(true);
  };

  const handleShiftUpdate = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/update-shift", {
        id: editShift.id,
        shift_time: newShiftTime,
      });
      toast.success("✅ Shift updated successfully!");
      setEditModalOpen(false);
      fetchShiftDetails(selectedDate);
    } catch (error) {
      console.error("Error updating shift:", error);
      toast.error("❌ Failed to update shift. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 ml-64 mr-24">
        <h2 className="text-2xl font-bold mb-4">Shift Schedule</h2>
        <div className="flex space-x-48 mb-4">
          <div className="flex flex-col items-start">
            <span className="block mb-2 font-semibold text-esko">Select Date:</span>
            <DatePicker
              className="border p-1"
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
              <th className="py-2 text-center text-limeGreen">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredShiftData.map((shift, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-center font-semibold">{shift.id}</td>
                <td className="border px-4 py-2 text-center font-semibold">{shift.eskoId}</td>
                <td className="border px-4 py-2 text-center font-semibold">{shift.contact}</td>
                <td className="border px-4 py-2 text-center font-semibold">
                  {shift.employee_status}
                </td>
                <td className="border px-4 py-2 text-center font-semibold">
                  {shift.shift_time}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button onClick={() => openEditModal(shift)}>
                    <FiEdit className="text-blue-500 cursor-pointer hover:scale-110" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-limegreen">Edit Shift Time</h3>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Select New Shift:</label>
                <select
                  value={newShiftTime}
                  onChange={(e) => setNewShiftTime(e.target.value)}
                  className="border p-2 w-full"
                >
                  {shifts.map((shift) => (
                    <option key={shift.id} value={shift.time}>
                      {shift.time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="bg-contrast text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShiftUpdate}
                  className="bg-esko1 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default MDashboard;
