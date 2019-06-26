/* eslint-disable max-len */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer, { history } from '../reducers/rootReducer';

const enhancers = [];
const middlewares = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  
    if (typeof devToolsExtension === 'function') {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    }
}
  
const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers);
  
export default createStore(rootReducer, composedEnhancers);
