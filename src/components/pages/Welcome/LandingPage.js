import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className="container home">
      <div className="d-flex">
        <div className="flex">
          <Link to="/" className="logo">
            <h3>MentorMe</h3>
          </Link>
        </div>
        <div className="flex">
          <div className="align-item">
            <Link to="/auth/signup" className="btn">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
