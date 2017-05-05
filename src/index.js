import React from 'react';
import ReactDOM from 'react-dom';

// createstore ************************************
import { createStore } from './_my_redux';
// import { createStore } from 'redux';

// Provider ***************************************
import { Provider } from './_my_react_redux.js';
// import { Provider } from 'react-redux';

import rootReducer from './05_reducerRoot.js';

import App from './App';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
