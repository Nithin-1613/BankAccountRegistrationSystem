// Login.js
import React, { useState, useEffect } from 'react';
import './Login.css';
function Login() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Set the fetched users in the state
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the provided email and password match any user in the fetched data
    if (users && users.length > 0) {
      const foundUser = users.find(user => user.email === email && user.password === password);

      if (foundUser) {
        console.log('Login successful');
        // After successful login, redirect to the dashboard page
        window.location.href = '/dashboard';
        setError('');
      } else {
        // Authentication failed, show an error message to the user.
        setError('Invalid email or password');
      }
    } else {
      // Handle the case where users data is not yet available
      setError('Loading user data...');
    }
  };

  return (
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card login-card">
          <div class="card-body">
            <h2 class="card-title text-center login-title">Log In</h2>
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label htmlFor="email" class="login-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="form-control login-input"
                  placeholder="Enter your email"
                />
              </div>
              <div class="form-group">
                <label htmlFor="password" class="login-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="form-control login-input"
                  placeholder="Enter your password"
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary btn-block login-button">Log In</button>
            </form>
            <p class="text-center mt-3">
              Don't have an account? <a href="/registration" class="registration-link">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Login;