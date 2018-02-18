import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  error: false,
  currentUser: false,
});

function appReducer(state = initialState, action) {
  return state;
}

export default appReducer;
