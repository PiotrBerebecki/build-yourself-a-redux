// *****************************************************
// createStore - holds the state tree
// *****************************************************
export function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let currentReducer = reducer;
  let currentState = preloadedState;
  let listeners = [];
  let isDispatching = false;

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    listeners.slice().forEach(listener => listener());

    return action;
  }

  function subscribe(listener) {
    let isSubscribed = true;
    listeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function replaceReducer(nextReducer) {
    currentReducer = nextReducer;
    dispatch({ type: '@@redux/INIT' });
  }

  dispatch({ type: '@@redux/INIT' });

  return { getState, dispatch, subscribe, replaceReducer };
}

// *****************************************************
// combineReducers - convert reducers object into function
// *****************************************************
export function combineReducers(reducers) {
  return (state = {}, action) => {
    return mapValues(reducers, (reducer, key) => {
      return reducer(state[key], action);
    });
  };
}

// export function combineReducers(reducers) {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce((nextState, key) => {
//       nextState[key] = reducers[key](state[key], action);
//       return nextState;
//     }, {});
//   };
// }

// *****************************************************
// bindActionCreator - wrap a call to individual action creator in a call to dispatch
// *****************************************************
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => {
    return dispatch(actionCreator(...args));
  };
}

// *****************************************************
// take an object with action creators and wrap each of them
// in a call to dispatch
// *****************************************************
export function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  return mapValues(actionCreators, actionCreator => {
    return bindActionCreator(actionCreator, dispatch);
  });
}

// export function bindActionCreators(actionCreators, dispatch) {
//   if (typeof actionCreators === 'function') {
//     return bindActionCreator(actionCreators, dispatch);
//   }
//
//   return Object.keys(actionCreators).reduce((obj, key) => {
//     obj[key] = bindActionCreator(actionCreators[key], dispatch);
//     return obj;
//   }, {});
// }

// *****************************************************
// mapValues - utlitity wrapping object values in function calls
// *****************************************************
function mapValues(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}
