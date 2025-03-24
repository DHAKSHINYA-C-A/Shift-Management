import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const LeaveDetailsComponent = () => {
  const data = {
    labels: ['Privilege Leave', 'Comp-Off', 'Optional Holiday', 'Emergency Leave'],
    datasets: [
      {
        data: [30, 15, 20, 10],
        backgroundColor: ['#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9'],
        hoverBackgroundColor: ['#4caf50', '#66bb6a', '#81c784', '#a5d6a7'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-3 bg-white rounded shadow mb-4 w-[80%] ml-44 mt-2">
      <h2 className="text-xl font-bold mb-4  mr-44 text-limeGreen">Leave Details</h2>
      <div className="flex justify-center items-center h-40">
        <div className="w-[400px] transform -translate-x-10 flex items-center">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LeaveDetailsComponent;