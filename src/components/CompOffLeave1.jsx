import React from 'react';

const CompOffLeave1 = () => {
  return (
    <div className="p-3 bg-white rounded shadow mb-4 h-full w-[96%]">
      <h2 className="text-xl font-bold mb-3 text-limeGreen">Comp-Off Leave</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-2">
          <label className="block text-gray-700 font-bold">Leave Type</label>
          <select className="mt-1 block w-full border border-gray-300 rounded py-2 px-3">
            <option>Select Leave Type</option>
            <option>Privilege Leave</option>
            <option>Comp-Off</option>
            <option>Optional Holiday</option>
            <option>Emergency Leave</option>
          </select>
        </div>
        <div className="mb-[1px]">
          <label className="block text-gray-700 font-bold">Date</label>
          <input type="date" className="mt-0 block w-full border border-gray-300 rounded py-2 px-3" />
        </div>
        <div className="mt-[-20px]">
          <label className="block text-gray-700 font-bold">Hours</label>
          <input type="number" className="mt-0 block w-full border border-gray-300 rounded py-2 px-3" />
        </div>
        <div className="mt-[-20px]">
          <label className="block text-gray-700 font-bold">Available Balance</label>
          <select className="mt-0 block w-full border border-gray-300 rounded py-2 px-3">
            <option>Select Balance</option>
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
        </div>
        <div className="mt-[-20px]">
          <label className="block text-gray-700 font-bold">From Time</label>
          <select className="mt-0 block w-full border border-gray-300 rounded py-2 px-3">
            <option>Select Time</option>
            <option>09:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
          </select>
        </div>
        <div className="mt-[-20px]">
          <label className="block text-gray-700 font-bold">Remarks</label>
          <input type='text' className="mt-1 block w-full border border-gray-300 rounded py-2 px-3"></input>
        </div>
        <div className="col-span-2">
          <button type="submit" className="mt-0 bg-esko1 text-white py-2 px-4 rounded w-half ml-40">APPLY</button>
        </div>
      </form>
    </div>
  );
};

export default CompOffLeave1;
