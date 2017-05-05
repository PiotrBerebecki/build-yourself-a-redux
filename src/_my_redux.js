export function createStore(reducer, initialState) {
  let currentReducer = reducer;
  let currentState = initialState;
  let listeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action);
    listeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  dispatch({ type: 'init redux' });

  return { getState, dispatch, subscribe };
}

// convert reducers object into function
export function combineReducers(reducers) {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}
