
// import React from 'react';
// import LoginPage from './pages/LoginPage.js';

// function App() {
//   return (
//     <div className="App">
//       <LoginPage />
     
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/sidebar';
import Report from './pages/Reports';
import ShiftCalender from './pages/Dashboard';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Sidebar />} />
          <Route path="/report" element={<Report />} />
          <Route path="/dash" element={<ShiftCalender />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;