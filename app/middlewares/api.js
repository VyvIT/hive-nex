import { isObject } from 'lodash';
import {
  CALL_API,
  API_ERROR,
  HANDLE_KNOWN_ERROR,
  NO_DATA,
} from '../App/constants';

// A middleware that handles CALL_API action to initiate sigle API request.
export default api => store => next => action => {
  const callAPI = action[CALL_API];
  if (!callAPI) {
    return next(action);
  }
  let { endpoint } = callAPI;
  const {
    types,
    payload,
    correlationData,
    method = 'get',
    headers,
    promise,
    responseHandler, // if resonse handler was passed, all handling should be implemented manually
  } = callAPI;

  if (!promise) {
    // if endpoint needs to be created based on current state
    if (typeof endpoint === 'function') {
      endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.');
    }
  }

  if ((!Array.isArray(types) || types.length < 3) && (!isObject(types) || Object.keys(types).length < 3)) {
    throw new Error('Expected an array of at least three action types.');
  }

  if (Array.isArray(types) && !types.every(type => typeof type === 'string') ||
    !Object.values(types).every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  let pendingType;
  let successType;
  let failureType;
  let noDataType;

  if (Array.isArray(types)) {
    [pendingType, successType, failureType, noDataType] = types;
  } else if (isObject(types)) {
    pendingType = types.PENDING;
    successType = types.SUCCESS;
    failureType = types.FAIL;
    noDataType = types.NO_DATA;
  } else {
    throw new Error('Expected `types` to be array or object.');
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  next(actionWith({ type: pendingType, payload, correlationData }));

  let request;
  if (promise) {
    request = promise;
  } else if (method === 'get') {
    request = api[method](endpoint, headers);
  } else {
    request = api[method](endpoint, payload);
  }
  // issues signle API request
  return request.then(res => {
    if (responseHandler) {
      return responseHandler(null, res, next, correlationData);
    }
    next(actionWith({ payload: res, type: successType, correlationData }));
    return Promise.resolve(res);
  }).catch(error => {
    if (responseHandler) {
      return responseHandler(error, null, next, correlationData);
    }
    const failure = { type: failureType, payload, error: error.message || 'Something bad happened', correlationData };
    // if it's a known API error
    if (error.codeNumber) {
      // if 'no data' was returned by the API
      if (error.codeNumber === NO_DATA && noDataType) {
        // trigger 'no data' type action
        next(actionWith({ type: noDataType, correlationData }));
        return Promise.resolve();
      }
      // send error to knownErrorHandler middleware to determine what to do with this codeNumber
      next(actionWith({ type: HANDLE_KNOWN_ERROR, payload: error }));
      // trigger failure type action
      next(actionWith(failure));
    } else {
      next(actionWith(failure));
      next(actionWith({ type: API_ERROR, error }));
    }
    return Promise.reject(error);
  });
};
