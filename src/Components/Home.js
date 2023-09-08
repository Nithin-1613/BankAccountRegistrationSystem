

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom' for navigation
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
        <img src={require('./banklogo.jpeg')} />
        </div>
        <br />
        <h1>Welcome to Natwest</h1>

        <div className="btn-group">
          <Link to="/Login" className="btn btn-primary btn-lg">Login</Link>
          <Link to="/Register" className="btn btn-success btn-lg">Registration</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;