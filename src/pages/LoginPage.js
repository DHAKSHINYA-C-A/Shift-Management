
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [eskoId, setEskoId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!eskoId) validationErrors.eskoId = 'Please enter a username';
    if (!password) validationErrors.password = 'Please enter a password';
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Navigate to the dashboard
      navigate('/dash');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="https://res.cloudinary.com/duj7wgdt8/image/upload/v1741064923/kiziq1kkhw0bdazvh797.jpg" alt="esko logo" className="logo-img" />
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="error-message">
            We found some errors. Please review the form and make corrections.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eskoId">Esko ID</label>
            <input
              type="text"
              id="eskoId"
              name="eskoId"
              value={eskoId}
              onChange={(e) => setEskoId(e.target.value)}
              className="form-control"
            />
            {errors.eskoId && <div className="error-text">{errors.eskoId}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>
          <div className="form-group remember-me">
            <input type="checkbox" id="rememberMe" name="rememberMe" className="form-check-input" />
            <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
        <div className="help-link">
          <a href="#" className="text-decoration-none">Need help signing in?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;