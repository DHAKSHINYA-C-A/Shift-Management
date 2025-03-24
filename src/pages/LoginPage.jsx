
// import React, { useState , useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';



// const LoginPage = () => {
//   const [eskoId, setEskoId] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   useEffect(() => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('eskoId')
    
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = {};
//     if (!eskoId) validationErrors.eskoId = 'Please enter a username';
//     if (!password) validationErrors.password = 'Please enter a password';
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//         try {
//             const response = await fetch('http://localhost:5000/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ eskoId, password })
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 alert(data.message);
//                 return;
//             }

//             localStorage.setItem('token', data.token);
//             localStorage.setItem('role', data.role);
//             localStorage.setItem('eskoId', data.eskoId);
//             // localStorage.setItem('eskoId', data.eskoId);
            

            


//             // Redirect based on role
//             if (data.role === 'Manager') {
//                 navigate('/mdash'); // Redirect Managers to /mdash
//             } else {
//                 navigate('/dash'); // Redirect regular users to /dash
//             }
//         } catch (error) {
//             console.error('Login failed:', error);
//             alert('Server error');
//         }
//     }
// };



//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-3xl p-16 bg-white border border-gray-300 rounded-lg shadow-lg items-center">
//         <div className="text-center mb-5">
//           <img src="https://res.cloudinary.com/duj7wgdt8/image/upload/v1741064923/kiziq1kkhw0bdazvh797.jpg" alt="esko logo" className="w-52 h-16 mx-auto" />
//         </div>
//         {Object.keys(errors).length > 0 && (
//           <div className="text-red-700 bg-red-100 border border-red-300 p-2 rounded mb-5 text-center">
//             We found some errors. Please review the form and make corrections.
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="eskoId" className="block mb-1 font-bold text-gray-800">Esko ID</label>
//             <input
//               type="text"
//               id="eskoId"
//               name="eskoId"
//               value={eskoId}
//               onChange={(e) => setEskoId(e.target.value)}
//               className="w-72 p-2 border border-gray-300 rounded"
//             />
//             {errors.eskoId && <div className="text-red-700 text-sm mt-1">{errors.eskoId}</div>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block mb-1 font-bold text-gray-800">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-72 p-2 border border-gray-300 rounded"
//             />
//             {errors.password && <div className="text-red-700 text-sm mt-1">{errors.password}</div>}
//           </div>
//           <div className="flex items-center mb-4">
//             <input type="checkbox" id="rememberMe" name="rememberMe" className="w-3 h-3 mr-2" />
//             <label htmlFor="rememberMe" className="text-gray-800">Remember me</label>
//           </div>
//           <button type="submit" className="w-full p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 ">Sign In</button>
//         </form>
//         <div className="text-center mt-4">
//           <a href="#" className="text-blue-600 hover:underline">Need help signing in?</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [eskoId, setEskoId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode(token);
  console.log(decoded.role, decoded.eskoId);
}
  // Clear previous session data when the page loads
  useEffect(() => {
    localStorage.removeItem('token');
   
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!eskoId) validationErrors.eskoId = 'Please enter your Esko ID';
    if (!password) validationErrors.password = 'Please enter your password';
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eskoId, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          alert(data.message);
          return;
        }
  
        localStorage.setItem('token', data.token); // ✅ only token stored
  
        // Decode and redirect based on role (not storing in localStorage)
        const decoded = jwtDecode(data.token);
        if (decoded.role === 'Manager') {
          navigate('/mdash');
        } else {
          navigate('/dash');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Server error. Please try again later.');
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-3xl p-16 bg-white border border-gray-300 rounded-lg shadow-lg items-center">
        <div className="text-center mb-5">
          <img
            src="https://res.cloudinary.com/duj7wgdt8/image/upload/v1741064923/kiziq1kkhw0bdazvh797.jpg"
            alt="esko logo"
            className="w-52 h-16 mx-auto"
          />
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="text-red-700 bg-red-100 border border-red-300 p-2 rounded mb-5 text-center">
            We found some errors. Please review the form and make corrections.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="eskoId" className="block mb-1 font-bold text-gray-800">
              Esko ID
            </label>
            <input
              type="text"
              id="eskoId"
              name="eskoId"
              value={eskoId}
              onChange={(e) => setEskoId(e.target.value)}
              className="w-72 p-2 border border-gray-300 rounded"
            />
            {errors.eskoId && (
              <div className="text-red-700 text-sm mt-1">{errors.eskoId}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-bold text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-72 p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <div className="text-red-700 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="rememberMe" name="rememberMe" className="w-3 h-3 mr-2" />
            <label htmlFor="rememberMe" className="text-gray-800">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-600 hover:underline">
            Need help signing in?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
