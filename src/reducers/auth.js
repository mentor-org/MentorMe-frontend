import { 
  AUTHENTICATING,
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  CLEAR_AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "../constant/actionTypes";

const initialState = {
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  errors: {},
  user: {},
  loading: false,
  working: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATING:
      return { 
          ...state,
          loading: true
      };
  case AUTHENTICATED:
  case SIGNIN_SUCCESS:
  case SIGNUP_SUCCESS:
      return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          errors: {},
          loading: false
      };
  case UNAUTHENTICATED:
  case CLEAR_AUTH_ERROR:
      return {
          ...state,
          isAuthenticated: false,
          errors: {},
          loading: false
      };
  case AUTHENTICATION_ERROR:
  case SIGNIN_ERROR:
  case SIGNUP_ERROR:
      return {
          ...state,
          isAuthenticated: false,
          user: {},
          errors: action.payload,
          loading: false
      };
  default:
      return state;
  }
};