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
import { toastr } from 'react-redux-toastr';
import instance from '../config/axios';


export const fetching = () => ({
  type: IS_FETCHING
});

export const fetchSuccess = questions => ({
  type: FETCHED,
  payload: questions
});

export const fetchSingleQuestion = question => ({
  type: SINGLE_QUESTION,
  payload: question
});

export const fetchFailure = error => ({
  type: FETCHING_ERROR,
  payload: error
});

export const replySuccess = reply => ({
  type: REPLY_QUESTION,
  payload: reply
});

export const fetchByTag = questions => ({
  type: FETCH_BY_TAG,
  payload: questions
});

export const fetchUsers = users => ({
  type: FETCH_USERS,
  payload: users
});

export const fetchRepliesSuccess = id => ({
  type: GET_ALL_REPLIES,
  payload: id
});

export const fetchSingleUser = user => ({
  type: FETCH_USER,
  payload: user
});

export const fetchQuestions = () => async (dispatch) => {
  try {
    dispatch(fetching());

    const response = await instance.get('/questions');
    dispatch(fetchSuccess(response.data.payload.rows));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};

export const fetchReplies = (id) => async (dispatch) => {
  try {
    dispatch(fetching());

    const response = await instance.get(`/questions/${id}/replies`);
    dispatch(fetchRepliesSuccess(response.data.payload.rows));
  } catch (error) {
    dispatch(fetchFailure(error.response.data));
  }
};

export const editQuestion = (id, question, history) => async (dispatch) => {
  try {
    dispatch(fetching());

    await instance.post(`/questions/${id}`, question);
    history.push(`/question/${id}`);
    toastr.success('Success', 'Edit successful');
  } catch (error) {
    dispatch(fetchFailure(error.response.data.errors));
  }
};

export const reply = (id, reply, history) => async (dispatch) => {
  try {
    dispatch(fetching());

    const response = await instance.post(`/questions/${id}/replies`, reply);
    history.push(`/question/${id}`);
    toastr.success('Success', 'Reply logged');
    dispatch(replySuccess(response.data.payload));
  } catch (error) {
    dispatch(fetchFailure(error.response.data.errors));
  }
};

export const newQuestion = question => ({
  type: NEW_QUESTION,
  payload: question
});

export const fetchQuestion = (id) => async (dispatch) => {
  try {
    dispatch(fetching());

    const response = await instance.get(`/questions/${id}/question`);
    dispatch(fetchSingleQuestion(response.data.payload));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};

export const getQuestionsByTag = (tag) => async (dispatch) => {
try {
  dispatch(fetching());

  const response = await instance.get(`/questions/${tag}`);
  dispatch(fetchByTag(response.data.payload.rows));
} catch (error) {
  dispatch(fetchFailure(error));
}
};

export const addQuestion = (question) => async (dispatch) => {
  try {
    dispatch(fetching());
    
    const response = await instance.post('/questions', question);  
    dispatch(newQuestion(response.data));
    toastr.success('Success', 'Question added successfully');
  } catch (error) {
    dispatch(fetchFailure(error.response.data.errors));
  }
};


export const getUsers = () => async (dispatch) => {
  try {
    dispatch(fetching());
    
    const response = await instance.get('/users');
    dispatch(fetchUsers(response.data.payload.rows));
  } catch (error) {
    dispatch(fetchFailure(error.response.data.errors));
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch(fetching());

    const response = await instance.get(`/profiles/${id}`);
    dispatch(fetchSingleUser(response.data.payload));
  } catch (error) {
    dispatch(fetchFailure(error.response.data.errors));
  }
};
