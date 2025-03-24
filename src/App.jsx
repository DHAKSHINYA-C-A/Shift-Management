
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './index.css';
import ShiftTable from './pages/Dashboard';
import MDashboard from './pages/MDashboard';
import Reports from './pages/Report';
import PayslipGenerator from './pages/Payslip';
import Leave from './pages/Leave';
import Notes from './pages/Notes';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dash" element={<ShiftTable />} />
        <Route path="/mdash" element={<MDashboard />} />
        <Route path="/report" element={<Reports />} />
        <Route path="/pay" element={<PayslipGenerator />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
};

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
    </div>
  );
};

export default App;