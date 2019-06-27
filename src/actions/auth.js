import { toastr } from 'react-redux-toastr';
import errorHandler from '../helpers/errorHandler';
import authAPI from '../utils/api/authAPI';
import jwt_decode from 'jwt-decode';
import {
    AUTHENTICATING,
    AUTHENTICATED,
    IS_AUTHENTICATED,
    UNAUTHENTICATED,
    AUTHENTICATION_ERROR,
    CLEAR_AUTH_ERROR,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    GET_CURRENT_USER,
} from "../constant/actionTypes";

export const authenticating = () => ({
    type: AUTHENTICATING
});

export const isAuthenticated = () => ({
    type: IS_AUTHENTICATED
});

export const getCurrentUser = user => ({
    type: GET_CURRENT_USER,
    payload: user
});

export const authenticationSuccess = user => ({
  type: AUTHENTICATED,
  payload: user
});

export const authenticationFailure = error => ({
  type: AUTHENTICATION_ERROR,
  error
});

export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR
});

export const signinSuccess = user => ({
  type: SIGNIN_SUCCESS,
  payload: user
});

export const signinFailure = error => ({
  type: SIGNIN_ERROR,
  payload: error
});

export const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: user
});

export const signupFailure = error => ({
  type: SIGNUP_ERROR,
  payload: error
});

export const resetUser = () => ({
  type: UNAUTHENTICATED
});

export const auth = (type, user, history) => async (dispatch) => {
  try {

      dispatch(authenticating());
      const response = await authAPI(type, user);
      localStorage.setItem('jwtToken', response.data.user.token);

      const dispatchType = type === 'signup' ? signupSuccess : signinSuccess;
      dispatch(dispatchType(response.data.user));
      if (type === 'signup') {
          toastr.success('Success', 'Successfully registered');
      }
      history.push('/');
  } catch (error) {
      const errorResponse = errorHandler(error);
      const dispatchType = type === 'signup' ? signupFailure : signinFailure;

      dispatch(dispatchType(errorResponse.response));
  }
};

export const authenticateUser = () => async (dispatch) => {
  try {
      dispatch(authenticating());
  
      const res = jwt_decode(localStorage.getItem('jwtToken'));
  
      dispatch(authenticationSuccess(res));
  } catch (error) {
      const errorResponse = errorHandler(error);
  
      localStorage.removeItem('jwtToken');
  
      dispatch(authenticationFailure(errorResponse.response));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch(resetUser());
};
