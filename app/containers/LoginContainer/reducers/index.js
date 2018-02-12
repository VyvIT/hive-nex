import { combineReducers } from 'redux-immutable';


const stateBranchName = 'Login';

const test = (state, action) => {
  return state;
};

export const reducer = combineReducers({
  test,
});

const reducerConfig = {
  key: stateBranchName,
  reducer,
};

export default reducerConfig;
