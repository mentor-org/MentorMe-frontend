import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { UNAUTHENTICATED } from '../constant/actionTypes';


export const history = createBrowserHistory();

const appReducer = combineReducers({
    router: routerReducer,
    toastr: toastrReducer
});

/**
 * Root Reducers that resets the store on logout
 * @param {object} state
 * @param {string} action
 * @return {func} appReducer function
 */
export default (state, action) => {
    if (action.type === UNAUTHENTICATED) {
        state = undefined;
    }
  
    return appReducer(state, action);
};
  

