import {
  isEmpty,
  isFunction,
  isString,
  conformsTo,
  isObject,
  has,
} from 'lodash';
import createReducer from '../reducers';

export const checkStore = (store) => {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    injectedReducers: isObject,
  };

  if (!conformsTo(store, shape)) {
    throw new Error('(app/utils...) injectors: Expected a valid redux store');
  }
};

export const injectReducerFactory = (store, isValid) => {
  return function injectReducer(key, reducer) {
    if (!isValid) {
      checkStore(store);
    }

    if (!isString(key) || isEmpty(key) || !isFunction(reducer)) {
      throw new Error('(app/utils...) injectReducer: Expected `key` (string) and `reducer` (function)');
    }

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) {
      return;
    }

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
};

export const destroyReducerFactory = (store, isValid) => {
  return function destroyReducer(key) {
    if (!isValid) {
      checkStore(store);
    }
    if (!isString(key) || isEmpty(key)) {
      throw new Error('(app/utils...) destroyReducer: Expected `key` (string)');
    }
    if (has(store.injectedReducers, key)) {
      const { [key]: removedReducer, ...rest } = store.injectedReducers; // eslint-disable-line
      store.replaceReducer(createReducer(rest));
    }
  };
};

const getInjectors = (store) => {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store, true),
    destroyReducer: destroyReducerFactory(store, true),
  };
};

export default getInjectors;
