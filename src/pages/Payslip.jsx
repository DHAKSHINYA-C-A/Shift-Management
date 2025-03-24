import { useState } from "react";
import Sidebar from "../components/Sidebar";
 
const PayslipGenerator = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    cityPincode: "",
    companyAddress: "",
    country: "",
    employeeName: "",
    employeeID: "",
    designation: "",
    dateOfJoining: "",
    pfNumber: "",
    payPeriod: "",
    payDate: "",
    lop: "",
    paidDays: "",
    earnings: "",
    deductions: "",
    netPayable: "",
    bankAccount: "",
    email: "",
    authorizedName: "",
    authorizedDesignation: "",
    signature: null,
  });
 
  const [selectedMonth, setSelectedMonth] = useState("October");
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
    }
  };
 
  const handleGeneratePayslip = () => {
    window.print();
  };
 
  const renderInput = (name, placeholder) => (
    <input
      name={name}
      value={formData[name]}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded"
    />
  );
 
  const numberToWords = (num) => {
    if (!num) return "Zero";
    const words = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    return num
      .toString()
      .split("")
      .map((digit) => words[parseInt(digit)])
      .join(" ");
  };
 
  return (
    <div className="flex items-center justify-center min-h-screen  p-6 w-[125%]">
      <Sidebar/>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
       
        {/* Esko Logo and Payslip Month Dropdown - Modified */}
        <div className="flex flex-col items-center mb-4">
          <img src="https://res.cloudinary.com/duj7wgdt8/image/upload/v1741064923/kiziq1kkhw0bdazvh797.jpg" alt="Company Logo" className="h-16 mb-2" />
          <div className="text-gray-600">
            Payslip for the Month
            <select
              className="ml-2 border p-1 rounded"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
 
        {/* Company Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {renderInput("companyName", "Company Name")}
          {renderInput("cityPincode", "City, Pincode")}
          {renderInput("companyAddress", "Company Address")}
          {renderInput("country", "Country")}
        </div>
 
        <h2 className="text-lg font-semibold mb-4">Employee Pay Summary *</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {renderInput("employeeName", "Employee Name")}
          {renderInput("employeeID", "Employee ID")}
          {renderInput("designation", "Designation")}
          {renderInput("dateOfJoining", "Date of Joining")}
          {renderInput("pfNumber", "PF A/c Number")}
          {renderInput("payPeriod", "Pay Period")}
          {renderInput("payDate", "Pay Date")}
          {renderInput("lop", "LOP")}
          {renderInput("paidDays", "Paid Days")}
          {renderInput("bankAccount", "Bank A/c Number")}
          {renderInput("email", "Email")}
        </div>
 
        <h2 className="text-lg font-semibold mb-4">Income Details *</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {renderInput("earnings", "Earnings")}
          {renderInput("deductions", "Deductions")}
        </div>
 
        <h2 className="text-lg font-semibold mb-4">Net Payable Amount *</h2>
        <div className="mb-6 p-4 border rounded-xl flex justify-between items-center bg-green-100">
          <div>
            <div className="font-bold text-lg">Total Net Payable</div>
            <div className="text-gray-500">Gross Earnings - Total Deductions</div>
          </div>
          <div className="p-4 rounded-lg flex items-center justify-center bg-green-200 w-40">
            <span className="text-2xl font-bold">₹ {formData.netPayable || "0"}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Amount in words: <span className="font-bold">Indian Rupee {numberToWords(formData.netPayable) || "Zero"} Only</span>
        </div>
 
        <h2 className="text-lg font-semibold mb-4 mt-6">Authorized Signature *</h2>
        <div className="mb-6">
          <input type="file" onChange={(e) => handleFileChange(e, "signature")} className="mb-4" />
          {renderInput("authorizedName", "Authorized Name")}
          {renderInput("authorizedDesignation", "Designation")}
        </div>
 
        <button onClick={handleGeneratePayslip} className="bg-red-500 text-white p-3 rounded w-full">
          Generate Payslip
        </button>
 
      </div>
    </div>
  );
};
 
export default PayslipGenerator;