import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../shared/Sidebar';

const NotFound = () => {
  return (
    <Fragment>
      <Sidebar />

      <div className="relative">
        <div className="not-found">
          <div className="center-wrap text-center">
            <h1 className="text-6xl text-indigo-700 mb-5">Page Not Found</h1>
            <Link to="/" className="btn">Go Home</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
