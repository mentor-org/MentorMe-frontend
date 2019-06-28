import {
  IS_FETCHING,
  FETCHED,
  FETCHING_ERROR,
  NEW_QUESTION,
  SINGLE_QUESTION,
  FETCH_BY_TAG,
  REPLY_QUESTION,
  GET_ALL_REPLIES,
  FETCH_USERS,
  FETCH_USER
} from '../constant/actionTypes';

const initialState = {
  isFetching: false,
  users: [],
  user: [],
  errors: {},
  question: {},
  questions: [],
  toggle: false,
  reply: {},
  replies: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return { 
          ...state,
          isFetching: true
      };
    case FETCHING_ERROR:
      return {
        ...state,
        errors: action.payload,
        isFetching: false,
      };
    case NEW_QUESTION:
      return {
        ...state,
        isFetching: false,
        toggle: false
      };
    case FETCHED:
    case FETCH_BY_TAG:
      return {
        ...state,
        isFetching: false,
        questions: action.payload,
      };
    case SINGLE_QUESTION:
      return {
        ...state,
        isFetching: false,
        question: action.payload
      };
    case REPLY_QUESTION:
      return {
        ...state,
        isFetching: false,
        reply: action.payload
      };
    case GET_ALL_REPLIES:
      return {
        ...state,
        isFetching: false,
        replies: action.payload
      };
    case FETCH_USERS:
      return {
        ...state,
        isFetching: false,
        users: action.payload
      };
    case FETCH_USER:
      return {
        ...state,
        isFetching: false,
        user: action.payload
      };
    default:
      return state;
    }
};