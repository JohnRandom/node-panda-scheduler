import React from 'react';
import App from './App.js';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import coreReducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { getTeachers } from './actions';


const loggerMiddleware = createLogger();

const store = createStore(
  coreReducers,
  applyMiddleware( thunkMiddleware, loggerMiddleware )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(getTeachers());
