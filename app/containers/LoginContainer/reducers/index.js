import { combineReducers } from 'redux-immutable';
import { LOGIN } from '../constants/index';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

const initialState = {
  currentUser: undefined,
};

const data = (state = fromJS(initialState), action) => {
  switch (action.type) {
    case LOGIN.SUCCESS: {
      return state.merge({
        currentUser: action.payload.username,
      });
    }
    default:
      return state;
  }
};

const loader = (state = fromJS({ isLoading: false }), action) => {
  switch (action.type) {
    case LOGIN.PENDING: {
      return state.merge({
        isLoading: true,
      });
    }
    case LOGIN.SUCCESS:
    case LOGIN.FAIL: {
      return state.merge({
        isLoading: false,
      });
    }
    default:
      return state;
  }
};

export default combineReducers({
  data,
  loader,
});

const stateBranchName = 'Login';

export const selectCurrentUser = createSelector((state) => state.get('data'), (state) => state.get('currentUser'));
export const selectIsLoading = createSelector((state) => state.get('loader'), (state) => state.get('isLoading'));