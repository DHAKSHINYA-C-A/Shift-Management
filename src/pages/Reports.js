import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Chart } from 'chart.js/auto';
import '../styles/Reports.css';
import Sidebar from '../components/sidebar';
const Report = () => {
    const workHoursChartRef = useRef(null);
    const performanceChartRef = useRef(null);

    useEffect(() => {
        const ctx = workHoursChartRef.current.getContext('2d');
        const workHoursChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['This Month', 'Last Month'],
                datasets: [{
                    label: 'Hours Worked',
                    data: [80, 75],
                    backgroundColor: ['#007bff', '#28a745']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const ctx2 = performanceChartRef.current.getContext('2d');
        const performanceChart = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Average Hours', 'Overtime Hours'],
                datasets: [{
                    data: [8, 10],
                    backgroundColor: ['#007bff', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        return () => {
            workHoursChart.destroy();
            performanceChart.destroy();
        };
    }, []);

    return (
        <div className="main-container">
            <Sidebar />
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h2>User Profile</h2>
                </div>
                <div className="card-body">
                    <div className="row spaced-section">
                        <div className="col-md-6">
                            <h5 className="section-title">Personal Information</h5>
                            <p><strong>Name:</strong> John Doe</p>
                            <p><strong>Email:</strong> john.doe@example.com</p>
                            <p><strong>Employee ID:</strong> 12345</p>
                            <p><strong>Department:</strong> IT</p>
                        </div>
                        <div className="col-md-6">
                            <h5 className="section-title">Current Shift & Notifications</h5>
                            <div className="shift-box">Morning (9 AM - 5 PM)</div>
                            <ul className="mt-3">
                                <li>Upcoming Shift: 05/03/2025 Morning</li>
                                <li>Leave Approved: 01/03/2025</li>
                                <li>Company Meeting: 10/03/2025</li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="row spaced-section">
                        <div className="col-md-6">
                            <h5 className="section-title">Leave and Comp Off</h5>
                            <p><strong>Total Leaves Taken:</strong> 5</p>
                            <p><strong>Total Comp Offs Taken:</strong> 2</p>
                            <p><strong>Remaining Leave Balance:</strong> 10</p>
                            <p><strong>Remaining Comp Off Balance:</strong> 3</p>
                        </div>
                        <div className="col-md-6">
                            <h5 className="section-title">Reports and Allowances</h5>
                            <p><strong>Shift Allowance Details:</strong></p>
                            <ul>
                                <li>January: $200</li>
                                <li>February: $220</li>
                            </ul>
                            <button className="btn btn-primary">Download Report</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row spaced-section">
                        <div className="col-md-6 chart-container">
                            <h5 className="section-title">Work Hours</h5>
                            <canvas id="workHoursChart" ref={workHoursChartRef}></canvas>
                        </div>
                        <div className="col-md-6 chart-container">
                            <h5 className="section-title">Performance Metrics</h5>
                            <canvas id="performanceChart" ref={performanceChartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Report;