import { combineReducers } from 'redux-immutable';
import session, { selectCurrentUser, selectIsLoading } from '../containers/LoginContainer/reducers';
import { createSelector } from 'reselect';

export default combineReducers({
  session,
});

export const selectAppUser = createSelector((state) => state.get('app').get('session'), selectCurrentUser);
export const selectAppUserIsLoading = createSelector((state) => state.get('app').get('session'), selectIsLoading);