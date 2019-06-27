import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import Home from '../Home';

const Welcome = ({ isAuthenticated }) => {
  return (
    <Fragment>
      {isAuthenticated ? <Home /> : <LandingPage />}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Welcome);
