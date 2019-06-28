import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Preloader from '../shared/Preloader/Preloader';

/**
 * @function Authenticator
 * @param {object} props
 * @return {JSX} - MyComponent|Preloader|Redirect
 */
const Authenticator = (props) => {
  const {
    MyComponent,
    authenticating,
    isAuthenticated,
    location
  } = props;

  return (
    <Fragment>
      {authenticating && <Preloader />}
      {!authenticating && isAuthenticated && <MyComponent {...props} />}
      {!authenticating && !isAuthenticated && <Redirect
        to={{
          pathname: '/auth/login',
          state: { from: location }
        }}
      />}
    </Fragment>
  );
};

Authenticator.propTypes = {
  isAuthenticated: PropTypes.bool,
  // MyComponent: PropTypes.func
};

export default Authenticator;