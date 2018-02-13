import fetch, { fixedEncodeURIComponent } from '../../../utils/fetch';
import { callApi } from '../../../utils/actions';
import sessionStorage from '../../../utils/sessionStorage';
import messages from '../messages';

import {
  LOCKED_ACCOUNT_CODE,
  SESSION_STORAGE_CHECKED,
  SESSION_STORAGE_KEY,
} from '../constants';
import { LOGIN } from '../constants/index';
import EncodeURIComponentString from '../../../utils/EncodeURIComponentString';

const LOGIN_ENDPOINT = '/login';

export const login = ({ username, password }) => {
  const data = [
    ['username', username],
    ['password', password],
  ];

  return callApi({
    endpoint: LOGIN_ENDPOINT,
    types: LOGIN,
    method: 'xform',
    payload: new EncodeURIComponentString(data).toString(),
  });
};

// return (dispatch) => {
//   const formData = [
//     ['username', data.username],
//     ['password', data.password],
//   ].map(createFormItem).join('&');
//
//   return fetch('/login', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//     },
//     body: formData,
//     credentials: 'same-origin',
//   });
/*.then(response => {
  if (response.status >= 400 && response.status !== 401) {
    const error = new Error(response.statusText);
    error.intMessage = messages.loginFail;
    throw error;
  }
  return response.json();
})
.then(response => {
  const error = new Error();
  if (response.status === 401) {
    error.intMessage = messages.loginFail;
    throw error;
  }
  if (response.isErrorMessage && response.codeNumber && response.codeNumber === LOCKED_ACCOUNT_CODE) {
    error.intMessage = messages.accountLocked;
    throw error;
  }
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      ...response,
      username: data.username,
    }));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { ...response, username: data.username },
    });
  } catch (e) {
    dispatch({
      type: LOGIN_FAILED,
      payload: messages.sessionStorageError,
    });
  }
})
.catch((error) => {
  dispatch({
    type: LOGIN_FAILED,
    payload: error.message || error.intMessage,
  });
});*/

/*
export function logout(options) {
  const message = (options && options.message) || undefined;
  return (dispatch) => {
    const promise = fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      credentials: 'same-origin',
    });
    dispatch({ type: LOGOUT_SUCCESS, payload: { message } });
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    return promise;
  };
}

export function checkSessionStorage() {
  return (dispatch) => {
    const session = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
    dispatch({
      type: SESSION_STORAGE_CHECKED,
      payload: { username: null, tenantId: null, roleList: null, ...session },
    });
  };
}

export const appRouteChanged = () => (dispatch, getState) => {
  if (!getState().getIn(['Auth', 'hasBackHistory'])) {
    dispatch({ type: APP_ROUTE_CHANGED });
  }
};
*/
